import assert from 'node:assert/strict';
import path from 'node:path';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import { chromium } from 'playwright';
import { loadBuild, output, unique, reportRoot, writeJson, clock, safe, manifest } from './build-portfolio.mjs';
import { startServer } from './serve-portfolio.mjs';
const require=createRequire(import.meta.url),core=path.dirname(require.resolve('playwright-core/package.json'));
const directory=unique(reportRoot,'browser'),report={started_utc:clock(),status:'RUNNING',cases:[],screenshots:[],events:[],servers:[],contexts:[],browserLaunchAttempts:0,installerInvocations:0,scope:'LOCAL emitted artifacts and isolated tests only; provider Q7 and accessibility certification excluded'};
const widths=[320,390,768,1024,1440],apps=[];let browser;
function prerequisites() {
  const registry=JSON.parse(readFileSync(path.join(core,'browsers.json'),'utf8'));
  const mac=os.platform()==='darwin',version=mac?execFileSync('/usr/bin/sw_vers',['-productVersion'],{encoding:'utf8'}).trim():os.release();
  const full=chromium.executablePath(),shell=path.join(process.env.PLAYWRIGHT_BROWSERS_PATH??path.join(os.homedir(),'Library/Caches/ms-playwright'),'chromium_headless_shell-1217','chrome-headless-shell-mac-x64','chrome-headless-shell');
  const compatible=mac&&Number(version.split('.')[0])>=14;
  return {platform:os.platform(),architecture:os.arch(),version,playwright:require('playwright/package.json').version,registry:registry.browsers.filter(x=>['chromium','chromium-headless-shell','ffmpeg'].includes(x.name)),node:process.version,browserCache:process.env.PLAYWRIGHT_BROWSERS_PATH??null,fullExecutable:full,fullExecutableExists:existsSync(full),headlessExecutableCandidate:shell,headlessExecutableExists:existsSync(shell),compatibility:compatible?'SUPPORTED MACOS VERSION':'BLOCKED',requirementsSource:'https://raw.githubusercontent.com/microsoft/playwright/v1.59.1/docs/src/intro-js.md',requirements:'macOS 14 or later; other hosts require separate compatibility validation',installation:'NOT ATTEMPTED by this verifier'};
}
async function staticServer(root,label) {
  safe(root);assert(path.isAbsolute(root));assert(statSync(root).isDirectory());const files=manifest(root);let requests=0;
  const server=createServer((req,res)=>{
    requests++;let name;
    try {const raw=req.url.split('?')[0];assert(!/%2f|%5c|%2e/i.test(raw));name=decodeURIComponent(raw);assert(!name.includes('\\')&&!name.split('/').includes('..'));name=name==='/'?'/index.html':name;assert(files.some(f=>'/'+f.path===name));assert(['GET','HEAD'].includes(req.method));const file=path.resolve(root,'.'+name);assert(file.startsWith(root+path.sep));safe(file);const ext=path.extname(file),mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2'}[ext]??'application/octet-stream';res.writeHead(200,{'Content-Type':mime});res.end(req.method==='HEAD'?undefined:readFileSync(file));}
    catch {res.writeHead(404);res.end('Not found');}
  });
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
  const app={origin:`http://127.0.0.1:${server.address().port}`,requests:()=>requests,close:()=>new Promise((resolve,reject)=>{server.close(e=>e?reject(e):resolve());server.closeAllConnections();})};apps.push(app);report.servers.push({label,root,origin:app.origin,started_utc:clock(),files});return app;
}
async function contextCase(label,width,javaScriptEnabled,fn) {
  const context=await browser.newContext({javaScriptEnabled,viewport:{width,height:900}}),record={label,width,javaScriptEnabled,started_utc:clock(),events:[],expectedEvents:[]};report.contexts.push(record);
  const expectedResources=new Map(),origins=new Set(apps.map(a=>a.origin));let expectedRender=false;
  try {
    await context.route('**/*',route=>{const url=new URL(route.request().url());if(origins.has(url.origin)) return route.continue();record.events.push({category:'external-request',url:url.href});return route.abort();});
    const page=await context.newPage();page.setDefaultTimeout(10000);
    page.on('response',response=>{if(response.status()>=400) {const url=response.url(),expected=expectedResources.get(url);const event={category:'http',url,status:response.status()};(expected===response.status()?record.expectedEvents:record.events).push(event);}});
    page.on('requestfailed',request=>{const event={category:'requestfailed',url:request.url(),error:request.failure()?.errorText};(expectedResources.get(request.url())==='abort'&&event.error==='net::ERR_FAILED'?record.expectedEvents:record.events).push(event);});
    page.on('pageerror',error=>record.events.push({category:'pageerror',message:String(error)}));
    page.on('console',message=>{if(message.type()!=='error') return;const location=message.location(),text=message.text(),event={category:'console',text,location};
      const resource=expectedResources.get(location.url),resourceMatch=resource&&/^Failed to load resource:/.test(text)&&((resource==='abort'&&/net::ERR_FAILED/.test(text))||(typeof resource==='number'&&text.includes(String(resource))));
      const renderMatch=expectedRender&&origins.has(new URL(location.url||'https://invalid.test').origin)&&text.includes('Controlled portfolio render regression')&&!text.includes('PRIVATE-MARKER');
      (resourceMatch||renderMatch?record.expectedEvents:record.events).push(event);
    });
    await fn({page,context,expectedResources,expectRender:()=>{expectedRender=true;},record});
    assert.deepEqual(record.events,[],`Unexpected events in ${label}`);record.status='PASS';report.cases.push({label,width,javaScriptEnabled,status:'PASS'});
  } finally {await context.close();Object.assign(record,{closed:true,completed_utc:clock()});}
}
async function stableNavigate(page,url,status=200) {
  let release;const barrier=new Promise(resolve=>{release=resolve;});
  const handler=async route=>{await barrier;await route.continue();};await page.route('**/assets/*.js',handler);
  try {
    const response=await page.goto(url,{waitUntil:'commit'});assert.equal(response.status(),status);await page.locator('#main-content').waitFor();
    await page.evaluate(()=>{const main=document.getElementById('main-content');window.__verificationSSR=main;main.setAttribute('data-verification-ssr','retained');});release();
    await page.locator('#portfolio-root[data-hydrated="true"]').waitFor();assert(await page.evaluate(()=>window.__verificationSSR===document.getElementById('main-content')),'Valid SSR node was replaced');
    assert.equal(await page.locator('[data-hydration-error],[data-failure]').count(),0);
  } finally {release();await page.unroute('**/assets/*.js',handler);}
}
async function visibleText(page) {
  assert.equal(await page.locator('h1').count(),1);assert((await page.locator('main').innerText()).trim());
  const result=await page.evaluate(()=>{
    const failures=[];if(document.documentElement.scrollWidth>innerWidth+1) failures.push('document horizontal overflow');
    const nodes=[...document.querySelectorAll('main h1,main h2,main h3,main p,nav a,main button')].filter(e=>e.textContent.trim());
    for(const e of nodes) {const r=e.getBoundingClientRect(),s=getComputedStyle(e);if(r.width<=0||r.height<=0||s.visibility==='hidden'||s.display==='none') failures.push('hidden required text');if(r.left< -1||r.right>innerWidth+1) failures.push('clipped required text');if((s.overflow==='hidden'||s.overflow==='clip')&&(e.scrollHeight>e.clientHeight+1||e.scrollWidth>e.clientWidth+1)) failures.push('hidden overflow');}
    const headings=[...document.querySelectorAll('main h1,main h2,main h3')];for(const h of headings) {const next=h.nextElementSibling;if(next&&!h.contains(next)&&h.getBoundingClientRect().bottom>next.getBoundingClientRect().top+1) failures.push('heading overlaps next content');}
    return {failures,checked:nodes.length,fontSize:getComputedStyle(document.documentElement).fontSize};
  });assert.deepEqual(result.failures,[]);assert(result.checked>0);return result;
}
async function media(page,origin) {
  for(const img of await page.locator('main img').all()) {await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());assert(await img.evaluate(el=>el.naturalWidth>0));assert.notEqual(await img.getAttribute('alt'),null);}
  for(const link of await page.locator('a[type="application/pdf"]').all()) {assert((await link.innerText()).trim());const href=await link.getAttribute('href');assert(href.startsWith('/assets/'));assert.equal((await page.request.get(origin+href)).status(),200);}
}
async function screenshot(page,name,details) {await page.screenshot({path:path.join(directory,name),fullPage:true});report.screenshots.push({name,...details,browser:report.browserVersion,taken_utc:clock()});}
try {
  report.prerequisite=prerequisites();assert.equal(report.prerequisite.playwright,'1.59.1');
  const build=await loadBuild();report.buildManifest=build.latest;report.requiredMatrix={canonicalDocuments:13,generic404:1,widths,javaScriptModes:[false,true],states:['READY','EMPTY work','EMPTY projects','EMPTY writing','EMPTY tools','ERROR','MISSING'],consumers:['gallery','HomePreview','18 original portfolio stories','2 boundary regression stories']};
  if(report.prerequisite.compatibility==='BLOCKED') {report.status='BLOCKED';report.reason='Pinned Playwright 1.59.1 requires macOS 14+. Actual host is '+report.prerequisite.version+'. No install or launch is authorized on this unsupported host.';process.exitCode=2;}
  else {
    assert(process.env.PLAYWRIGHT_BROWSERS_PATH&&path.isAbsolute(process.env.PLAYWRIGHT_BROWSERS_PATH),'Explicit isolated browser cache is required');
    report.browserLaunchAttempts++;browser=await chromium.launch({headless:true,chromiumSandbox:true});report.browserVersion=browser.version();
    const app=await startServer(output);apps.push(app);report.servers.push({label:'portfolio',origin:app.origin,root:output,started_utc:clock()});
    const inputs=build.server.verificationInputs(),client=build.client;
    for(const javaScriptEnabled of [false,true]) for(const width of widths) {
      for(const route of [...build.latest.paths,'/projects/unknown-private-slug']) await contextCase(`route ${route}`,width,javaScriptEnabled,async({page,expectedResources,record})=>{
        const status=route.includes('unknown-private')?404:200;if(status===404) expectedResources.set(app.origin+route,404);
        if(javaScriptEnabled) await stableNavigate(page,app.origin+route,status);else assert.equal((await page.goto(app.origin+route)).status(),status);
        record.content=await visibleText(page);await media(page,app.origin);
        const before=await page.locator('main').innerText();assert.equal((await page.reload()).status(),status);if(javaScriptEnabled) await page.locator('[data-hydrated="true"]').waitFor();assert.equal(await page.locator('main').innerText(),before);
        await page.addStyleTag({content:'html {font-size:200% !important}'});record.text200=await visibleText(page);assert.equal(record.text200.fontSize,'32px');record.textMethod='200% root font-size, computed 32px; visibility, bounds, hidden overflow and heading overlap checks';
        if(route==='/about'&&javaScriptEnabled&&[390,1440].includes(width)) await screenshot(page,`about-${width}-text200.png`,{route,width,javaScriptEnabled,textSize:'200%',state:'READY'});
      });
      await contextCase('native navigation, keyboard, skip focus and history',width,javaScriptEnabled,async({page})=>{
        await page.goto(app.origin+'/');if(javaScriptEnabled) await page.locator('[data-hydrated="true"]').waitFor();await page.keyboard.press('Tab');assert.equal(await page.locator(':focus').innerText(),'Skip to content');await page.keyboard.press('Enter');assert.equal(await page.locator(':focus').getAttribute('id'),'main-content');
        await page.getByRole('navigation',{name:'Primary',exact:true}).getByRole('link',{name:'About',exact:true}).click();assert.equal(new URL(page.url()).pathname,'/about');await page.goBack();assert.equal(new URL(page.url()).pathname,'/');await page.goForward();assert.equal(new URL(page.url()).pathname,'/about');
      });
      for(const p of [...Object.values(inputs.emptyResults),{state:'ERROR'}]) await contextCase(`isolated ${p.state} ${p.route??''}`,width,javaScriptEnabled,async({page})=>{
        const html=p.state==='ERROR'?build.server.isolatedErrorDocument(build.template,client):build.server.render(p,build.template,client);
        await page.route(app.origin+'/',r=>r.fulfill({status:200,contentType:'text/html',body:html}));await page.goto(app.origin+'/');await visibleText(page);
        if(p.state==='ERROR') {assert.equal(await page.locator('h1').innerText(),'Content unavailable');assert.equal(await page.locator('[data-hydrated]').count(),0);} else {await page.getByText('No eligible items are available.',{exact:true}).waitFor();if(javaScriptEnabled) await page.locator('[data-hydrated="true"]').waitFor();}
      });
    }
    const good={version:1,identifierPrefix:'portfolio-v1-',page:inputs.fixtureResults.home},baseHtml=build.server.render(good.page,build.template,client);
    const badCases=[['malformed JSON',()=>'{'],['wrong version',b=>{b.version=2;}],['wrong prefix',b=>{b.identifierPrefix='bad';}],['wrong audience',b=>{b.page.audience='TRUSTED_PREVIEW';}],['wrong state',b=>{b.page.state='DRAFT_PREVIEW';}],['wrong route',b=>{b.page.route='contact';}],['unknown envelope',b=>{b.secret='PRIVATE-MARKER';}],['channel kind',b=>{b.page.data.contact.channels='PRIVATE-MARKER';}],['navigation null',b=>{b.page.chrome.primaryNavigation=[null];}],['missing name',b=>{delete b.page.data.profile.name;}],['bad nested array',b=>{b.page.data.projects=[null];}],['bad Rich Text',b=>{b.page=JSON.parse(JSON.stringify(inputs.fixtureResults.about));b.page.data.profile.longBio={policy:'profile-long',blocks:[{kind:'raw',fields:{secret:'PRIVATE-MARKER'}}]};}],['bad image',b=>{b.page.data.profile.profileImage.accessibility={kind:'raw',alt:'PRIVATE-MARKER'};}],['bad document',b=>{b.page.data.contact.resume.bytes=-1;}],['nested private',b=>{b.page.data.profile.sys={secret:'PRIVATE-MARKER'};}],['bad URL',b=>{b.page.data.profile.profileImage.src='javascript:alert(1)';}]];
    for(const [name,change] of badCases) await contextCase(`initialization rejects ${name}`,390,true,async({page,record})=>{
      const value=JSON.parse(JSON.stringify(good)),raw=change(value),encoded=typeof raw==='string'?raw:build.server.safeJson(value),html=baseHtml.replace(/(<script id="portfolio-data" type="application\/json">).*?(<\/script>)/s,(_m,a,b)=>a+encoded+b);
      await page.route(app.origin+'/',r=>r.fulfill({status:200,contentType:'text/html',body:html}));await page.goto(app.origin+'/');await page.locator('[data-failure="initialization"] [role="alert"]').waitFor();assert.equal(await page.locator('[data-hydrated]').count(),0);assert(!(await page.locator('#portfolio-root').innerText()).includes('PRIVATE-MARKER'));record.outcome='visible initialization failure; no successful hydration';
    });
    for(const token of ['$$','$&',"$'",'$`','</script><script>PRIVATE-MARKER</script>','\u2028\u2029','<!--portfolio-bootstrap-->']) await contextCase('literal DOM token '+JSON.stringify(token),390,true,async({page})=>{
      const p=JSON.parse(JSON.stringify(good.page));p.metadata.title='Title '+token;p.metadata.description='Description '+token;p.data.profile.name='Name '+token;p.data.profile.shortBio='Body '+token;
      const html=build.server.render(p,build.template,client);await page.route(app.origin+'/',r=>r.fulfill({status:200,contentType:'text/html',body:html}));await stableNavigate(page,app.origin+'/');assert.equal(await page.title(),p.metadata.title);assert.equal(await page.locator('meta[name="description"]').getAttribute('content'),p.metadata.description);assert.equal(await page.locator('h1').innerText(),p.data.profile.name);assert.equal(await page.getByText(p.data.profile.shortBio,{exact:true}).textContent(),p.data.profile.shortBio);
    });
    await contextCase('intentional broken image fallback',390,true,async({page,expectedResources})=>{
      const src=inputs.fixtureResults.about.data.profile.profileImage.src,url=app.origin+src;expectedResources.set(url,'abort');await page.route(url,r=>r.abort('failed'));await page.goto(app.origin+'/about');await page.getByText(/^Image unavailable:/).waitFor();assert.equal(await page.getByRole('img',{name:inputs.fixtureResults.about.data.profile.profileImage.accessibility.alt}).count(),1);
    });
    const consumerFile=process.env.PORTFOLIO_CONSUMER_REPORT;assert(consumerFile,'Bound consumer outputs required');safe(consumerFile);const consumers=JSON.parse(readFileSync(consumerFile,'utf8'));
    for(const name of ['gallery','storybook']) {assert.deepEqual(manifest(consumers[name].root),consumers[name].manifest);}
    const gallery=await staticServer(consumers.gallery.root,'gallery'),storybook=await staticServer(consumers.storybook.root,'storybook');
    await contextCase('preserved actual gallery',390,true,async({page})=>{await page.goto(gallery.origin+'/');await page.locator('#root').waitFor();assert((await page.locator('#root').innerText()).includes('Gallery'));assert(await page.getByRole('link').count()>0);});
    const index=JSON.parse(readFileSync(path.join(consumers.storybook.root,'index.json'),'utf8')),ids=Object.keys(index.entries),original=consumers.originalIDs;assert(original.every(id=>ids.includes(id)));report.storyIDs={originalRetained:original.length,portfolio:ids.filter(id=>id.startsWith('portfolio-pages--')),total:ids.length};
    const smoke=ids.filter(id=>id.startsWith('portfolio-pages--')||/home-preview--default$/.test(id));assert.equal(smoke.filter(id=>id.startsWith('portfolio-pages--')).length,20);assert(smoke.some(id=>/home-preview--default$/.test(id)));
    for(const id of smoke) await contextCase(`story ${id}`,390,true,async({page,expectRender,record})=>{
      await page.goto(storybook.origin+`/iframe.html?id=${encodeURIComponent(id)}&viewMode=story`);const root=page.locator('#storybook-root');await root.waitFor();assert((await root.innerText()).trim());assert(!await page.locator('.sb-errordisplay').isVisible());
      if(id.endsWith('--render-failure')) {await page.getByRole('button',{name:'Trigger render failure'}).waitFor();expectRender();await page.getByRole('button',{name:'Trigger render failure'}).click();await page.getByRole('alert').waitFor();assert.equal(await page.getByRole('alert').innerText(),'This page could not be displayed. Please reload.');assert.equal(await page.locator('[data-hydrated]').count(),0);record.outcome='genuine post-parse child render exception; visible boundary fallback';await screenshot(page,'render-fallback-390.png',{width:390,javaScriptEnabled:true,textSize:'100%',state:'render failure'});}
      else if(id.endsWith('--rich-text-vocabulary')) for(const selector of ['strong','em','u','code','sup','sub','s','h2','h3','blockquote','ol','ul','figure','a[type="application/pdf"]']) assert(await root.locator(selector).count()>0);
      else {assert(await root.locator('h1').count()>0);if(id.endsWith('--render-boundary-control')) assert.equal(await root.locator('h1').innerText(),inputs.fixtureResults.home.data.profile.name);}
    });
    report.status='PASS';
  }
} catch(error) {report.status='FAIL';report.error=String(error);process.exitCode=1;}
finally {
  if(browser) {await browser.close();report.browserClosed=true;}
  for(const app of apps) {await app.close();Object.assign(report.servers.find(s=>s.origin===app.origin),{closed:true,stopped_utc:clock(),requests:app.requests()});}
  report.completed_utc=clock();report.executedBrowserCases=report.cases.length;writeJson(path.join(directory,'report.json'),report);console.log(JSON.stringify({status:report.status,report:path.join(directory,'report.json'),cases:report.cases.length,reason:report.reason,error:report.error}));
}

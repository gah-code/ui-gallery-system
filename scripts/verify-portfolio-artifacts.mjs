import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { loadBuild, output, manifest, unique, reportRoot, emitCandidate, writeJson, clock, policyValid } from './build-portfolio.mjs';
import { startServer, parseRules } from './serve-portfolio.mjs';
const directory=unique(reportRoot,'artifacts'),report={started_utc:clock(),status:'RUNNING',assertions:[],matrix:[],servers:[],negativeCases:[],scope:'LOCAL model only; Q7 provider proof remains deferred'};
function check(name,fn) {fn();report.assertions.push({name,status:'PASS'});}
function negative(name,fn) {assert.throws(fn);report.negativeCases.push({name,expected:'rejection',status:'PASS'});}
function payload(html) {const match=/<script id="portfolio-data" type="application\/json">(.*?)<\/script>/s.exec(html);assert(match);return JSON.parse(match[1]);}
const text=p=>readFileSync(p,'utf8');
const escape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#x27;');
try {
  const build=await loadBuild(),s=build.server,inputs=s.verificationInputs(),selected=s.representative(),before=manifest(output);
  const artifactHtml=p=>text(path.join(output,s.representativeIdentity(p)));
  check('independent nine-route fixture page payload parity',()=>{for(const p of Object.values(inputs.fixtureResults)) assert.deepEqual(payload(artifactHtml(p.routeInfo.path)).page,p);});
  for(const {path:route,page} of selected.pages) check(`content/head/current-page parity ${route}`,()=>{
    const html=artifactHtml(route);assert.deepEqual(payload(html).page,page);assert.equal((html.match(/<h1(?:\s|>)/g)??[]).length,1);assert.equal((html.match(/<title>/g)??[]).length,1);
    assert(html.includes(`<title>${escape(page.metadata.title)}</title>`));assert(html.includes(`name="description" content="${escape(page.metadata.description)}"`));
    const content=page.route==='project' ? [page.data.project.title,page.data.project.problem,page.data.project.approach,page.data.project.outcome] : page.route==='article' ? [page.data.article.title,page.data.article.author.name,page.data.article.publishDate] : [];
    for(const v of content) assert(html.slice(0,html.indexOf('<script id="portfolio-data"')).includes(escape(v)));
    assert(!/rel="canonical"|property="og:|assets\.example\.test|"sys":|"fields":|revisionFacts|sourceComparison|TRUSTED_PREVIEW/.test(html));
  });
  check('independent static route content and all six field-specific Rich Text values appear before bootstrap',()=>{
    const expectations={home:[inputs.fixtureResults.home.data.profile.name,inputs.fixtureResults.home.data.profile.positioningStatement,...inputs.fixtureResults.home.data.projects.map(p=>p.title)],about:[inputs.fixtureResults.about.data.profile.name],work:inputs.fixtureResults.work.data.experiences.flatMap(e=>[e.company,e.role,e.summary]),projects:inputs.fixtureResults.projects.data.projects.flatMap(p=>[p.title,p.summary,p.outcome]),writing:inputs.fixtureResults.writing.data.articles.flatMap(a=>[a.title,a.excerpt]),tools:inputs.fixtureResults.tools.data.tools.flatMap(t=>[t.name,t.usageContext]),contact:[inputs.fixtureResults.contact.data.contact.intro,...inputs.fixtureResults.contact.data.contact.channels.map(c=>c.label)]};
    for(const [route,values] of Object.entries(expectations)) {const html=artifactHtml(inputs.fixtureResults[route].routeInfo.path).split('<script id="portfolio-data"')[0];for(const value of values) assert(html.includes(escape(value)),`${route}: missing authored content`);}
    const texts=document=>{const values=[];function walk(v) {if(!v||typeof v!=='object') return;if(v.kind==='text' && v.text.trim()) values.push(v.text);Object.values(v).forEach(x=>Array.isArray(x) ? x.forEach(walk) : walk(x));}walk(document);return values;};
    const about=inputs.fixtureResults.about,work=inputs.fixtureResults.work,project=inputs.fixtureResults.project,article=inputs.fixtureResults.article;
    const fields=[['profile.longBio',about,about.data.profile.longBio],['profile.learningHighlights',about,about.data.profile.learningHighlights],...work.data.experiences.flatMap(e=>[['experience.responsibilities',work,e.responsibilities],['experience.achievements',work,e.achievements]]),['project.caseStudyBody',project,project.data.project.caseStudyBody],['article.body',article,article.data.article.body]];
    report.richTextFields=[];for(const [name,page,doc] of fields) {if(!doc) continue;const html=artifactHtml(page.routeInfo.path).split('<script id="portfolio-data"')[0];for(const value of texts(doc)) assert(html.includes(escape(value)),name);report.richTextFields.push({name,policy:doc.policy,result:'PASS'});}assert.equal(new Set(report.richTextFields.map(f=>f.name)).size,6);
  });
  const rules=parseRules(text(path.join(output,'_redirects'))),paths=selected.pages.map(p=>p.path);
  check('N-063-01 emitted 308 before 200; independent rule membership, source order, count',()=>{
    const expected=[];
    for(const p of paths) {const hex=Buffer.from(p,'ascii').toString('hex').match(/.{1,64}/g),internal='/_portfolio-docs/'+hex.map(h=>'d-'+h).join('/')+'/page';expected.push({from:p,to:internal,status:200});for(const from of p==='/' ? ['/index.html'] : [p+'/',p+'.html']) expected.push({from,to:p,status:308});for(const from of [internal,internal+'.html',internal+'/']) expected.push({from,to:p,status:308});}
    expected.sort((a,b)=>b.status-a.status || (a.from<b.from ? -1 : a.from>b.from ? 1 : 0));assert.deepEqual(rules,expected);assert.equal(rules.length,41+6*(paths.length-7));
  });
  check('capacity 326 details emits 1997 parsed lines',()=>assert.equal(parseRules(s.emitRules(inputs.atCapacity)).length,1997));
  negative('327 details',()=>s.emitRules([...inputs.atCapacity,'/projects/overflow']));negative('duplicate canonical',()=>s.emitRules([...paths,paths[0]]));negative('overlong declaration',()=>s.emitRules([...paths,'/projects/'+('a'.repeat(2000))]));
  negative('release config rejected',()=>policyValid({...build.policy,mode:'release'}));
  negative('public ERROR rejected',()=>s.render(inputs.error,build.template,build.client));negative('public preview rejected',()=>s.render(inputs.preview,build.template,build.client));
  negative('bad readiness rejected',()=>s.render({...inputs.fixtureResults.projects,data:{...inputs.fixtureResults.projects.data,projects:[]}},build.template,build.client));
  check('generic missing excludes attempted identity and data',()=>{const html=text(path.join(output,'404.html'));assert.deepEqual(payload(html).page,{state:'MISSING'});assert(!/seed05|slug|canonical|openGraph|routeInfo/.test(html));assert.equal(s.render({...inputs.missing,routeInfo:{route:'project',path:'/projects/private-title',slug:'private-title'}},build.template,build.client),html);});
  negative('enriched private-shaped page metadata rejected before public serialization',()=>s.render({...inputs.fixtureResults.home,metadata:{...inputs.fixtureResults.home.metadata,fields:{secret:'PRIVATE-MARKER'}}},build.template,build.client));
  check('script-closing metadata is escaped in initial head',()=>{const html=s.head({...inputs.fixtureResults.home.metadata,title:'</title><script>PRIVATE-MARKER</script>'});assert(!html.includes('<script>'));assert(html.includes('&lt;script&gt;'));});
  check('script-closing serialization round trip' ,()=>{const value={text:'</script><script>alert("x")</script>&\u2028\u2029'};const encoded=s.safeJson(value);assert(!/[<>&\u2028\u2029]/.test(encoded));assert.deepEqual(JSON.parse(encoded),value);});
  check('synthetic release head consumes projected metadata and preserves caller',()=>{assert(inputs.releaseHead.includes('https://example.test/'));assert(inputs.releaseHead.includes('property="og:image"'));assert(!/PRIVATE-MARKER|"sys"|"fields"/.test(inputs.releaseHead+JSON.stringify(inputs.releaseMetadata)));assert(inputs.releaseInputPreserved);});
  check('all Rich Text marks and structural vocabulary escaped and semantic',()=>{for(const tag of ['strong','em','u','code','sup','sub','s','h2','h3','blockquote','ol','ul','figure']) assert(inputs.richTextHtml.includes('<'+tag));assert(inputs.richTextHtml.includes('type="application/pdf"'));});
  for(const page of Object.values(inputs.emptyResults)) check(`isolated valid EMPTY ${page.route}`,()=>{const html=s.render(page,build.template,build.client);assert.deepEqual(payload(html).page,page);assert(html.includes('name="robots" content="noindex,follow"'));});
  check('all approved media resolved with unchanged exact source/output bytes',()=>{
    for(const descriptor of inputs.media) {const identity=inputs.mediaIdentities.find(i=>i.id===descriptor.id);assert(identity);const url=descriptor.src??descriptor.href,found=before.find(f=>f.path===url.slice(1));assert(found,`Missing ${url}`);assert.equal(found.sha256,identity.sha256);assert.equal(found.bytes,identity.bytes);}
  });
  check('no dataset/source/server modules in actual client bundle graph',()=>{for(const chunk of build.latest.clientGraph) {assert(chunk.modules.length>0);for(const module of chunk.modules) assert(!/src\/(?:data\/portfolio|content\/portfolio)|entry-server|source-fixtures|normalized-fixtures/.test(module));const js=text(path.join(output,chunk.file));assert(!/seed05-asset|portfolio-offline-snapshot|simulation-revision-|STRICT_WITH_EXACT_WHOI_TOOLS_EXCEPTION|sourceFixtureContextPolicy/.test(js));}});
  check('non-release empty sitemap, robots and document layout',()=>{assert(!text(path.join(output,'sitemap.xml')).includes('<url>'));assert.equal(text(path.join(output,'robots.txt')),'User-agent: *\nDisallow: /\n');assert(text(path.join(output,'_headers')).includes('X-Robots-Tag: noindex, nofollow'));assert.equal(before.filter(f=>f.path.endsWith('.html')).length,14);assert(!existsSync(path.join(output,'index.html')));});
  const baseOptions={server:s,template:build.template,client:build.client,assetDirectories:[path.join(build.run,'client/assets'),path.join(build.run,'server/assets')],policy:build.policy};
  // Correction-only assertions stay separate from the original 31 / 12 / 94 identities.
  report.correctionAssertions=[];report.correctionNegatives=[];
  const SourceFault=s.sourceFaultType();
  const correction=(name,fn)=>{fn();report.correctionAssertions.push({name,status:'PASS'});};
  const reject=(name,fn)=>{assert.throws(fn);report.correctionNegatives.push({name,status:'PASS',expected:'rejection'});};
  const copy=v=>JSON.parse(JSON.stringify(v));
  const envelope=page=>({version:1,identifierPrefix:'portfolio-v1-',page:copy(page)});
  const good=()=>envelope(inputs.fixtureResults.home);
  correction('SourceFault omitted optional own properties and Error inheritance',()=>{
    const e=new SourceFault('SOURCE_TYPE');assert(e instanceof Error);assert(e instanceof SourceFault);assert.equal(e.name,'Error');assert.equal(e.message,'SOURCE_TYPE');
    for(const [key,value] of Object.entries({code:'SOURCE_TYPE',entityId:undefined,fieldPath:undefined})) assert.deepEqual(Object.getOwnPropertyDescriptor(e,key),{value,writable:true,enumerable:true,configurable:true});
  });
  correction('SourceFault supplied optional arguments, throw/catch and exact message',()=>{
    const e=new SourceFault('REQUIRED_FIELD','sample-entity','fields.name');assert.equal(e.message,'REQUIRED_FIELD');assert.equal(e.code,'REQUIRED_FIELD');assert.equal(e.entityId,'sample-entity');assert.equal(e.fieldPath,'fields.name');assert.throws(()=>{throw e;},caught=>caught===e);
  });
  correction('SourceFault readonly explicit declarations; no parameter properties',()=>{
    const source=text(new URL('../src/content/portfolio/resolve.ts',import.meta.url));
    const body=source.split('export class SourceFault extends Error {')[1].split('\nexport function fail')[0];
    for(const name of ['code','entityId','fieldPath']) assert(new RegExp('readonly '+name+'[?:]').test(body));
    assert(!/constructor\(readonly/.test(body));assert.equal((body.match(/this\.(?:code|entityId|fieldPath) = /g)??[]).length,3);
  });
  for(const {page,path:route} of selected.pages) correction(`complete bootstrap accepts canonical ${route}`,()=>{const v=envelope(page),before=JSON.stringify(v);s.validateBootstrap(v);assert.equal(JSON.stringify(v),before);});
  for(const page of Object.values(inputs.emptyResults)) correction(`complete bootstrap accepts EMPTY ${page.route}`,()=>s.validateBootstrap(envelope(page)));
  for(const state of ['ERROR','MISSING']) correction(`minimal isolated ${state} payload`,()=>s.validateBootstrap(envelope({state})));
  const mutations=[
    ['wrong version',b=>b.version=2],['wrong identifier prefix',b=>b.identifierPrefix='other'],['unknown envelope field',b=>b.raw='PRIVATE-MARKER'],
    ['wrong route',b=>b.page.route='contact'],['wrong routeInfo',b=>b.page.routeInfo.path='/about'],['wrong audience',b=>b.page.audience='TRUSTED_PREVIEW'],['wrong state',b=>b.page.state='DRAFT_PREVIEW'],['wrong HTTP status',b=>b.page.httpStatus=500],['unknown page field',b=>b.page.fields={secret:'PRIVATE-MARKER'}],
    ['contact channel string',b=>b.page.data.contact.channels='bad'],['contact channel wrong kind',b=>b.page.data.contact.channels=[{kind:'telephone',label:'x',href:'tel:123'}]],['contact channel null',b=>b.page.data.contact.channels=[null]],['contact empty channels',b=>b.page.data.contact.channels=[]],
    ['navigation null',b=>b.page.chrome.primaryNavigation=[null]],['navigation string',b=>b.page.chrome.primaryNavigation=['x']],['navigation route mismatch',b=>b.page.chrome.primaryNavigation[0].href='/tools'],['navigation empty',b=>b.page.chrome.primaryNavigation=[]],
    ['profile name missing',b=>delete b.page.data.profile.name],['optional-present profile title null',b=>b.page.data.profile.secondaryTitle=null],['full tool proof wrong item',b=>b.page.data.tools[0].proof.projects=[null]],['full tool proof private field',b=>b.page.data.tools[0].proof.sys={secret:'PRIVATE-MARKER'}],['wrong project array',b=>b.page.data.projects={}],['wrong project item',b=>b.page.data.projects=[true]],['project detail identity mismatch',b=>b.page.data.projects[0].href='/projects/wrong'],['bad enum',b=>b.page.data.projects[0].projectType='raw'],
    ['bad image size',b=>b.page.data.profile.profileImage.width=0],['bad image MIME',b=>b.page.data.profile.profileImage.mime='text/html'],['missing image accessibility',b=>delete b.page.data.profile.profileImage.accessibility],['decorative image in meaningful position',b=>b.page.data.profile.profileImage.accessibility={kind:'decorative',alt:''}],['unknown accessibility field',b=>b.page.data.profile.profileImage.accessibility.fields={secret:'PRIVATE-MARKER'}],
    ['asset unsafe protocol',b=>b.page.data.profile.profileImage.src='javascript:alert(1)'],['asset traversal',b=>b.page.data.profile.profileImage.src='/assets/../private'],['asset backslash',b=>b.page.data.profile.profileImage.src='https://example.test/\\private'],
    ['document invalid bytes',b=>b.page.data.contact.resume.bytes=-1],['document bad MIME',b=>b.page.data.contact.resume.mime='text/html'],['document unknown raw field',b=>b.page.data.contact.resume.sys={secret:'PRIVATE-MARKER'}],
    ['nested private-shaped contamination',b=>b.page.data.projects[0].skills[0].sys={id:'PRIVATE-MARKER'}],['unknown arbitrary nested field',b=>b.page.data.profile.privateValue='PRIVATE-MARKER'],['metadata invalid breadcrumb item',b=>b.page.metadata.breadcrumbs=[null]],['metadata release mode',b=>b.page.metadata.mode='release'],['metadata raw openGraph',b=>b.page.metadata.openGraph={}],['diagnostic private message',b=>b.page.diagnostics=[{code:'CONTENT_UNAVAILABLE',message:'PRIVATE-MARKER'}]],['text control',b=>b.page.data.profile.name='private\u0000text'],
    ['date invalid calendar',b=>b.page.data.writing[0].publishDate='2026-02-30'],['month invalid',b=>b.page.data.experience[0].start.month=13],['nonfinite numeric value',b=>b.page.data.profile.profileImage.width=Infinity],['email mismatched href',b=>b.page.data.contact.channels=[{kind:'email',label:'Email',email:'a@example.test',href:'mailto:b@example.test'}]],['off-boundary public URL',b=>b.page.chrome.socialLinks[0].href='https://localhost/']
  ];
  for(const [name,change] of mutations) {const b=good();change(b);const snapshot=JSON.stringify(b);reject(`bootstrap ${name}`,()=>{try{s.validateBootstrap(b);}finally{assert.equal(JSON.stringify(b),snapshot);}});}
  reject('React SSR boundary does not turn a thrown child into successful output',()=>s.serverBoundaryFailure());
  reject('malformed JSON',()=>JSON.parse('{"version":'));
  for(const [name,value] of [['wrong nodes',{policy:'profile-long',blocks:[{kind:'raw',html:'PRIVATE-MARKER'}]}],['bad mark',{policy:'profile-long',blocks:[{kind:'paragraph',children:[{kind:'text',text:'x',marks:['script']}]}]}],['bad link',{policy:'profile-long',blocks:[{kind:'paragraph',children:[{kind:'link',href:'javascript:alert(1)',children:[]}]}]}],['wrong policy',{policy:'body',blocks:[]}],['null node',{policy:'profile-long',blocks:[null]}]]) reject(`Rich Text ${name}`,()=>{const b=envelope(inputs.fixtureResults.about);b.page.data.profile.longBio=value;s.validateBootstrap(b);});
  reject('Rich Text recursion bound',()=>{let node={kind:'paragraph',children:[]};for(let i=0;i<80;i++) node={kind:'list',ordered:false,items:[{blocks:[node]}]};const b=envelope(inputs.fixtureResults.about);b.page.data.profile.longBio={policy:'profile-long',blocks:[node]};s.validateBootstrap(b);});
  reject('simple policy rejects headings',()=>{const b=envelope(inputs.fixtureResults.work);b.page.data.experiences[0].responsibilities={policy:'simple',blocks:[{kind:'heading',level:2,children:[]}]};s.validateBootstrap(b);});
  reject('body policy rejects extra mark',()=>{const b=envelope(inputs.fixtureResults.article);b.page.data.article.body={policy:'body',blocks:[{kind:'paragraph',children:[{kind:'text',text:'x',marks:['underline']}]}]};s.validateBootstrap(b);});
  reject('detail route slug must match content',()=>{const b=envelope(inputs.fixtureResults.project);b.page.routeInfo={route:'project',slug:'other',path:'/projects/other'};s.validateBootstrap(b);});
  const tokens=['$$','$&',"$'",'$`','</script><script>PRIVATE-MARKER</script>','\u2028\u2029','<!--portfolio-bootstrap-->'];
  report.literalTemplateCases=[];
  for(const token of tokens) correction(`literal authored template token ${JSON.stringify(token)}`,()=>{
    const p=copy(inputs.fixtureResults.home);p.metadata.title='Title '+token;p.metadata.description='Description '+token;p.data.profile.name='Name '+token;p.data.profile.shortBio='Body '+token;
    const snapshot=JSON.stringify(p),html=s.render(p,build.template,build.client),b=payload(html);
    assert.deepEqual(b.page,p);assert.equal(JSON.stringify(p),snapshot);assert.equal((html.match(/<script id="portfolio-data"/g)??[]).length,1);
    assert.equal((html.match(/<script(?:\s|>)/g)??[]).length,2);assert.equal((html.match(/<html(?:\s|>)/g)??[]).length,1);
    assert(html.includes(`<title>${escape(p.metadata.title)}</title>`));assert(html.includes(`name="description" content="${escape(p.metadata.description)}"`));
    const body=html.slice(html.indexOf('<main'),html.indexOf('<script id="portfolio-data"'));assert(body.includes(escape(p.data.profile.name)));assert(body.includes(escape(p.data.profile.shortBio)));
    assert(html.indexOf('<title>')<html.indexOf('</head>'));assert(html.indexOf('<main')<html.indexOf('<script id="portfolio-data"'));assert(html.indexOf('</main>')<html.indexOf('<script id="portfolio-data"'));
    report.literalTemplateCases.push({token,expected:p,html,status:'PASS',DOMObservation:'Browser matrix required separately; these are emitted HTML and JSON assertions'});
  });
  for(const marker of ['<!--portfolio-head-->','<!--portfolio-body-->','<!--portfolio-bootstrap-->']) for(const kind of ['missing','duplicate']) {
    const template=build.template.replace(marker,()=>kind==='missing'?'':marker+marker);
    reject(`template ${kind} ${marker}`,()=>s.render(inputs.fixtureResults.home,template,build.client));
    reject(`emitter rejects ${kind} ${marker} before creating output`,()=>{const dir=path.join(build.run,`bad-template-${report.correctionNegatives.length}-${path.basename(directory)}`);try{emitCandidate({...baseOptions,template,pages:selected.pages,dir});}finally{assert(!existsSync(dir));assert.deepEqual(manifest(output),before);}});
  }
  reject('malformed nested bootstrap prevents emitter output',()=>{const pages=copy(selected.pages),dir=path.join(build.run,'invalid-bootstrap-'+path.basename(directory));pages[0].page.data.contact.channels='bad';try{emitCandidate({...baseOptions,pages,dir});}finally{assert(!existsSync(dir));assert.deepEqual(manifest(output),before);}});
  correction('safe ERROR presentation remains isolated; public render still fails closed',()=>{const html=s.isolatedErrorDocument(build.template,build.client);assert.deepEqual(payload(html).page,{state:'ERROR'});assert(html.includes('Content unavailable'));assert.throws(()=>s.render({state:'ERROR'},build.template,build.client));});
  negative('invalid config blocks actual emitter',()=>emitCandidate({...baseOptions,pages:selected.pages,policy:{...build.policy,mode:'release'},dir:path.join(build.run,'negative-config-'+path.basename(directory))}));
  negative('duplicate path blocks actual emitter',()=>emitCandidate({...baseOptions,pages:[...selected.pages,selected.pages[0]],dir:path.join(build.run,'negative-duplicate-'+path.basename(directory))}));
  negative('bad state blocks actual emitter',()=>emitCandidate({...baseOptions,pages:selected.pages.map((p,i)=>i===0 ? {...p,page:inputs.error} : p),dir:path.join(build.run,'negative-state-'+path.basename(directory))}));
  negative('missing local asset prevents candidate publication' ,()=>emitCandidate({...baseOptions,pages:selected.pages,client:{...build.client,js:'/assets/absent.js'},dir:path.join(build.run,'negative-missing-asset-'+path.basename(directory))}));
  const variants={selected:inputs.synthetic,absent:inputs.synthetic.filter(p=>!/^\/(projects|writing)\/(404|index)$/.test(p.path)),removed:inputs.synthetic.filter(p=>!/^\/(projects|writing)\/sample$/.test(p.path))};
  const apps={};
  try {
    for(const [label,pages] of Object.entries(variants)) {const dir=path.join(build.run,`synthetic-${label}-${path.basename(directory)}`);emitCandidate({...baseOptions,pages,dir});apps[label]=await startServer(dir);report.servers.push({label,origin:apps[label].origin,root:dir,started_utc:clock()});}
    for(const row of inputs.requestMatrix) {
      const label=row.scenario.includes('alternate manifest') ? 'absent' : 'selected',app=apps[label];
      const response=await fetch(app.origin+row.request,{redirect:'manual'}),body=await response.text();assert.equal(response.status,row.status_intent,row.id);assert.equal(response.headers.get('location'),row.location,row.id);
      if(response.status===404) assert.deepEqual(payload(body).page,{state:'MISSING'});
      if(response.status===200) {const p=payload(body).page;assert.equal(p.routeInfo.path,row.request);if(row.payload_owner==='ProjectPageData') assert.equal(p.route,'project');if(row.payload_owner==='ArticlePageData') assert.equal(p.route,'article');}
      if(response.status===308) {const target=await fetch(app.origin+row.location);assert.equal(target.status,200);}
      const head=await fetch(app.origin+row.request,{method:'HEAD',redirect:'manual'});assert.equal(head.status,row.status_intent);assert.equal(await head.text(),'');
      report.matrix.push({id:row.id,request:row.request,variant:label,status:response.status,location:response.headers.get('location'),head:head.status,result:'PASS'});
    }
    assert.equal(report.matrix.length,94);
    for(const type of ['projects','writing']) for(const suffix of ['','/','.html']) {const r=await fetch(apps.removed.origin+`/${type}/sample${suffix}`,{redirect:'manual'});assert.equal(r.status,404);}
    report.assertions.push({name:'subsequent selection removes sample documents and aliases in both types',status:'PASS'});
    for(const control of ['/_redirects','/_headers','/404.html','/_portfolio-docs/','/../package.json','/%2e%2e/package.json','/%2fetc/passwd']) {const r=await fetch(apps.selected.origin+control,{redirect:'manual'});assert.equal(r.status,404);}
    report.controlFileBehavior={_redirects:404,_headers:404,'404.html':404,robots:200,sitemap:200};
    for(const url of ['/robots.txt','/sitemap.xml']) assert.equal((await fetch(apps.selected.origin+url)).status,200);
    assert.equal((await fetch(apps.selected.origin+'/',{method:'POST'})).status,405);
  } finally {for(const [label,app] of Object.entries(apps)) {await app.close();Object.assign(report.servers.find(s=>s.label===label),{stopped_utc:clock(),requests:app.requests(),closed:true});}}
  check('negative cases preserve previous successful artifact tree',()=>assert.deepEqual(manifest(output),before));
  report.status='PASS';report.renderAssertions=report.assertions.length;report.expectedNegativeAssertions=report.negativeCases.length;report.vitestAssertions=0;report.emittedRules=rules;report.publicFiles=before;
} catch(error) {report.status='FAIL';report.error={message:String(error),stack:error.stack};process.exitCode=1;}
finally {report.completed_utc=clock();writeJson(path.join(directory,'report.json'),report);console.log(JSON.stringify({status:report.status,report:path.join(directory,'report.json'),assertions:report.assertions.length,matrix:report.matrix.length,error:report.error?.message}));}

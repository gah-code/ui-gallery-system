import { build } from 'vite';
import { readFileSync, writeFileSync, mkdirSync, existsSync, lstatSync, readdirSync, copyFileSync, renameSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash, randomUUID } from 'node:crypto';
import assert from 'node:assert/strict';
export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const buildRoot=path.join(root,'dist-portfolio-build');
export const output=path.join(root,'dist-portfolio');
export const reportRoot=path.join(root,'.validation/portfolio');
export const clock=() => new Date().toISOString();
export function safe(p) {let current=path.resolve(p);while(current !== path.dirname(current)) {if(existsSync(current)) assert(!lstatSync(current).isSymbolicLink(),`Symlink rejected: ${current}`);current=path.dirname(current);}return path.resolve(p);}
export function json(p) {return JSON.parse(readFileSync(safe(p),'utf8'));}
export function writeJson(p,v) {writeFileSync(safe(p),JSON.stringify(v,null,2)+'\n',{flag:'wx'});}
export function manifest(dir) {
  safe(dir);const rows=[];
  function walk(p) {for(const name of readdirSync(p).sort()) {const f=safe(path.join(p,name)),s=lstatSync(f);if(s.isDirectory()) walk(f);else {assert(s.isFile());const b=readFileSync(f);rows.push({path:path.relative(dir,f).split(path.sep).join('/'),bytes:b.length,sha256:createHash('sha256').update(b).digest('hex'),mode:s.mode & 0o777});}}}
  walk(dir);return rows;
}
export function unique(parent,label) {safe(parent);mkdirSync(parent,{recursive:true});const p=path.join(parent,`${label}-${clock().replace(/[:.]/g,'-')}-${randomUUID()}`);mkdirSync(p);return p;}
export function policyValid(policy) {assert.deepEqual(policy,{schemaVersion:1,mode:'offline-demo',documentStrategy:'R1-full-path-hex',maximumRules:2000,maximumRuleCharacters:1000,providerVerification:'DEFERRED-Q7'},'Unsupported or release hosting policy');}
export function validatePublic(dir) {
  const files=manifest(dir);for(const f of files) assert(/^(?:_portfolio-docs\/(?:d-[0-9a-f]{2,64}\/)+page\.html|404\.html|_redirects|_headers|robots\.txt|sitemap\.xml|assets\/[\w.-]+\.(?:js|css|png|jpe?g|svg|webp|avif|gif|pdf))$/.test(f.path),`Unexpected public file ${f.path}`);
  for(const f of files.filter(f=>f.path.endsWith('.html'))) {
    const html=readFileSync(path.join(dir,f.path),'utf8');
    for(const [,url] of html.matchAll(/(?:src|href)="(\/assets\/[^"?#]+)"/g)) assert(existsSync(safe(path.join(dir,url.slice(1)))),`Missing emitted asset ${url}`);
    assert(!/rel="canonical"|property="og:|sourceMappingURL|assets\.example\.test|DRAFT_PREVIEW/.test(html),'Non-release or transport boundary failure');
    assert(html.includes('name="robots" content="noindex,'));
  }return files;
}
export function emitCandidate({server,pages,dir,template,client,assetDirectories,policy}) {
  policyValid(policy);assert(!existsSync(dir),'Candidate output must be fresh');
  const paths=pages.map(p=>p.path);const rules=server.emitRules(paths); // validates completeness/collisions/capacity before any output
  const prepared=pages.map(p=>{assert.equal(p.page.routeInfo?.path,p.path,'Page and artifact route identity disagree');return {file:server.representativeIdentity(p.path),html:server.render(p.page,template,client)};});
  const missing=server.render({state:'MISSING'},template,client);
  safe(dir);mkdirSync(dir,{recursive:true});
  for(const assetDir of assetDirectories) {if(!existsSync(assetDir)) continue;for(const f of manifest(assetDir)) {assert(!f.path.includes('/'),'Unexpected nested asset');const dst=safe(path.join(dir,'assets',f.path));mkdirSync(path.dirname(dst),{recursive:true});if(existsSync(dst)) assert.equal(createHash('sha256').update(readFileSync(dst)).digest('hex'),f.sha256,'Asset collision');else copyFileSync(path.join(assetDir,f.path),dst);}}
  for(const p of prepared) {const target=safe(path.join(dir,p.file));assert(target.startsWith(dir+path.sep));mkdirSync(path.dirname(target),{recursive:true});writeFileSync(target,p.html,{flag:'wx'});}
  writeFileSync(path.join(dir,'404.html'),missing,{flag:'wx'});writeFileSync(path.join(dir,'_redirects'),rules,{flag:'wx'});
  writeFileSync(path.join(dir,'_headers'),'/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Cache-Control: no-store\n',{flag:'wx'});
  writeFileSync(path.join(dir,'robots.txt'),'User-agent: *\nDisallow: /\n',{flag:'wx'});
  writeFileSync(path.join(dir,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>\n',{flag:'wx'});
  return validatePublic(dir);
}
export async function loadBuild() {
  const latest=json(path.join(buildRoot,'latest.json'));assert(latest.schemaVersion===1 && latest.owner==='portfolio-06.4');
  const run=safe(path.join(buildRoot,latest.run));assert(path.dirname(run)===buildRoot);
  assert.deepEqual(manifest(output),latest.publicFiles,'Last successful output changed');
  const server=await import(pathToFileURL(path.join(run,'server/entry-server.js')).href);
  return {latest,run,server,template:readFileSync(path.join(root,'portfolio/index.html'),'utf8'),client:latest.client,policy:json(path.join(root,'portfolio/hosting-policy.json'))};
}
export async function main() {
  assert(process.argv.length===2,'Only the offline-demo build is authorized');
  policyValid(json(path.join(root,'portfolio/hosting-policy.json')));
  safe(buildRoot);safe(output);safe(reportRoot);
  if(existsSync(output)) {assert(existsSync(path.join(buildRoot,'latest.json')),'Unknown output ownership');assert.deepEqual(manifest(output),json(path.join(buildRoot,'latest.json')).publicFiles);}
  const run=unique(buildRoot,'run'), started=clock();
  try {
    const clientDir=path.join(run,'client'),serverDir=path.join(run,'server');
    await build({configFile:path.join(root,'vite.portfolio.config.ts'),configLoader:'runner',build:{outDir:clientDir}});
    await build({configFile:path.join(root,'vite.portfolio.config.ts'),configLoader:'runner',build:{ssr:'src/portfolio/entry-server.tsx',outDir:serverDir}});
    const m=json(path.join(clientDir,'.vite/manifest.json')),entry=m['src/portfolio/entry-client.tsx'];assert(entry?.isEntry);
    const client={js:'/'+entry.file,css:(entry.css??[]).map(p=>'/'+p)};
    const modules=json(path.join(clientDir,'boundary-manifest.json'));assert(modules.length>0);
    for(const chunk of modules) for(const id of chunk.modules) assert(!/src\/(?:data\/portfolio|content\/portfolio)|entry-server|source-fixtures|normalized-fixtures/.test(id),'Server data reached client graph');
    const server=await import(pathToFileURL(path.join(serverDir,'entry-server.js')).href);
    const selected=server.representative();assert.equal(selected.pages.length,13);
    const staging=path.join(run,'staging');
    const publicFiles=emitCandidate({server,pages:selected.pages,dir:staging,template:readFileSync(path.join(root,'portfolio/index.html'),'utf8'),client,assetDirectories:[path.join(clientDir,'assets'),path.join(serverDir,'assets')],policy:json(path.join(root,'portfolio/hosting-policy.json'))});
    const record={schemaVersion:1,owner:'portfolio-06.4',mode:'offline-demo',run:path.basename(run),started_utc:started,completed_utc:clock(),client,paths:selected.pages.map(p=>p.path),publicFiles,clientGraph:modules,status:'PASS'};
    writeJson(path.join(run,'build-report.json'),record);
    if(existsSync(output)) renameSync(output,path.join(run,'previous-successful-output'));
    renameSync(staging,output);
    if(existsSync(path.join(buildRoot,'latest.json'))) copyFileSync(path.join(buildRoot,'latest.json'),path.join(run,'previous-latest.json'));
    writeFileSync(path.join(buildRoot,'latest.json'),JSON.stringify(record,null,2)+'\n');
    console.log(JSON.stringify({status:'PASS',run,output,routes:record.paths,files:publicFiles.length,mode:record.mode}));
  } catch(error) {writeJson(path.join(run,'failure.json'),{started_utc:started,completed_utc:clock(),status:'FAIL',message:String(error),stack:error.stack});throw error;}
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) await main();

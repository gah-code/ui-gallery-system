import { createServer } from 'node:http';
import { readFileSync, existsSync, lstatSync, realpathSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';
const defaultRoot=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist-portfolio');
export function parseRules(text) {
  const rules=text.trimEnd().split('\n').map(line=>{const m=/^(\/\S*) (\/\S*) (200|308)$/.exec(line);assert(m && line.length<=1000,'Invalid emitted rule');return {from:m[1],to:m[2],status:Number(m[3])};});
  assert(rules.length<=2000 && new Set(rules.map(r=>r.from)).size===rules.length);
  let proxy=false,previous='';for(const rule of rules) {if(rule.status===200 && !proxy) {proxy=true;previous='';}assert(!(proxy && rule.status===308),'Aliases must precede proxies');assert(rule.from>previous,'Rule group must be source-sorted');previous=rule.from;}return rules;
}
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.txt':'text/plain; charset=utf-8','.xml':'application/xml; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.avif':'image/avif','.gif':'image/gif','.pdf':'application/pdf'};
export async function startServer(directory=defaultRoot) {
  const base=realpathSync(directory);assert(base===path.resolve(directory),'Symlink root rejected');
  const rules=parseRules(readFileSync(path.join(base,'_redirects'),'utf8'));
  const generic=readFileSync(path.join(base,'404.html'));let requests=0;
  function file(relative) {
    const target=path.resolve(base,relative);if(!target.startsWith(base+path.sep)) return null;
    let current=target;while(current!==base) {if(existsSync(current) && lstatSync(current).isSymbolicLink()) return null;current=path.dirname(current);}
    return existsSync(target) && lstatSync(target).isFile() ? readFileSync(target) : null;
  }
  const server=createServer((req,res)=>{
    requests++;res.setHeader('X-Robots-Tag','noindex, nofollow');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Cache-Control','no-store');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
    const send=(status,body,type='text/html; charset=utf-8')=>{res.statusCode=status;res.setHeader('Content-Type',type);res.setHeader('Content-Length',body.length);res.end(req.method==='HEAD' ? undefined : body);};
    if(!['GET','HEAD'].includes(req.method)) {res.setHeader('Allow','GET, HEAD');send(405,Buffer.from('Method not allowed'),'text/plain');return;}
    const raw=(req.url??'').split(/[?#]/,1)[0];let pathname;
    try {pathname=decodeURIComponent(raw);}catch {send(404,generic);return;}
    if(!pathname.startsWith('/') || /[\\\u0000-\u0020]/.test(pathname) || /%2f|%5c/i.test(raw) || pathname.split('/').some(s=>s==='..'||s==='.') || pathname.includes('//')) {send(404,generic);return;}
    const rule=rules.find(r=>r.from===pathname);
    if(rule?.status===308) {res.setHeader('Location',rule.to);send(308,Buffer.alloc(0));return;}
    // A 200 rule performs ONE internal file lookup, never recursive URL routing.
    if(rule?.status===200) {const body=file(rule.to.slice(1)+'.html');send(body ? 200 : 404,body??generic);return;}
    if(/^\/assets\/[\w.-]+$/.test(pathname) || ['/robots.txt','/sitemap.xml'].includes(pathname)) {const body=file(pathname.slice(1)),type=types[path.extname(pathname)];if(body && type) {send(200,body,type);return;}}
    // Control files, root 404 URL, unknown internal paths and directories are not public files.
    send(404,generic);
  });
  await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve);});
  const address=server.address();return {origin:`http://127.0.0.1:${address.port}`,requests:()=>requests,close:()=>new Promise((resolve,reject)=>server.close(e=>e ? reject(e) : resolve()))};
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  assert(process.argv.length===2,'No server overrides are supported');const app=await startServer();console.log(JSON.stringify({origin:app.origin,mode:'LOCAL-NON-RELEASE'}));
  for(const signal of ['SIGINT','SIGTERM']) process.once(signal,async()=>{await app.close();console.log('Portfolio server stopped');});
}

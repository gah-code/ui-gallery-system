import { hydrateRoot } from 'react-dom/client';
import { PageView, PortfolioErrorBoundary, type PageInput } from './PageView';
export const identifierPrefix = 'portfolio-v1-';
export type Bootstrap = {version:1;identifierPrefix:typeof identifierPrefix;page:PageInput};
function assert(condition:unknown):asserts condition {if (!condition) throw new Error('Invalid portfolio bootstrap');}
function record(v:unknown):Record<string,unknown> {assert(v !== null && typeof v === 'object' && !Array.isArray(v) && Object.getPrototypeOf(v) === Object.prototype);return v as Record<string,unknown>;}
const hasControl=(v:string,textWhitespace=false)=>Array.from(v).some(c=>{const n=c.charCodeAt(0);return n===127||(n<32&&!(textWhitespace&&[9,10,13].includes(n)));});
type Check=(value:unknown,depth:number)=>void;
const literal=(...values:readonly unknown[]):Check => v => assert(values.includes(v));
const string:Check=v=>assert(typeof v === 'string' && !hasControl(v,true));
const text:Check=v=>{string(v,0);assert(typeof v === 'string' && v.trim().length>0);};
const identity:Check=v=>{text(v,0);assert(typeof v==='string' && !hasControl(v));};
const integer:Check=v=>assert(typeof v==='number' && Number.isSafeInteger(v));
const positive:Check=v=>{integer(v,0);assert(typeof v==='number' && v>0);};
const nonnegative:Check=v=>{integer(v,0);assert(typeof v==='number' && v>=0);};
const list=(item:Check,min=0):Check=>(v,d)=>{assert(d<64 && Array.isArray(v) && v.length>=min);v.forEach(x=>item(x,d+1));};
const shape=(required:Record<string,Check>,optional:Record<string,Check>={}):Check=>(v,d)=>{
  assert(d<64);const r=record(v);
  for(const k of Object.keys(r)) assert(Object.hasOwn(required,k)||Object.hasOwn(optional,k));
  for(const [k,check] of Object.entries(required)) {assert(Object.hasOwn(r,k));check(r[k],d+1);}
  for(const [k,check] of Object.entries(optional)) if(Object.hasOwn(r,k)) check(r[k],d+1);
};
const https:Check=v=>{
  assert(typeof v==='string' && /^https:\/\/(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}(?::[0-9]+)?(?:\/[^\s]*)?$/.test(v) && !hasControl(v) && !v.includes('\\'));
  let u:URL;try {u=new URL(v);} catch {throw new Error('Invalid portfolio bootstrap');}
  const host=u.hostname.toLowerCase();assert(u.protocol==='https:' && !u.username && !u.password && !host.endsWith('.') && host.split('.').every(part=>/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(part)) && !/(?:^|\.)(?:localhost|local|internal|lan|home|invalid)$/.test(host));
};
const asset:Check=v=>{if(typeof v==='string' && /^\/assets\/[A-Za-z0-9_-][A-Za-z0-9_.-]*$/.test(v)) return;https(v,0);};
const email:Check=v=>assert(typeof v==='string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && !hasControl(v) && !/[?#%]/.test(v));
const slug:Check=v=>assert(typeof v==='string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v));
const paths:Readonly<Record<string,string>>={home:'/',about:'/about',work:'/work',projects:'/projects',writing:'/writing',tools:'/tools',contact:'/contact'};
const routePath:Check=v=>assert(typeof v==='string' && (Object.values(paths).includes(v)||/^\/(projects|writing)\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v)));
const date:Check=v=>{assert(typeof v==='string' && /^\d{4}-\d{2}-\d{2}$/.test(v));const n=Date.parse(v+'T00:00:00Z');assert(Number.isFinite(n)&&new Date(n).toISOString().slice(0,10)===v);};
const month=shape({year:integer,month:literal(1,2,3,4,5,6,7,8,9,10,11,12),precision:literal('month')});
const platform=literal('linkedin','github','personal-site','figma','medium','devto','substack','x','bluesky','mastodon','other');
const social=shape({id:identity,platform,label:text,href:https},{sortOrder:nonnegative});
const navigation:Check=(v,d)=>{shape({id:identity,label:text,routeKey:literal(...Object.keys(paths)),href:routePath},{description:text})(v,d);const r=record(v);assert(typeof r.routeKey==='string' && paths[r.routeKey]===r.href);};
const chrome=shape({id:identity,siteName:text,primaryNavigation:list(navigation,1),footerNavigation:list(navigation),socialLinks:list(social)},{siteDescription:text});
const image=(meaningful:boolean):Check=>shape({id:identity,src:asset,mime:literal('image/jpeg','image/png','image/webp','image/avif','image/gif','image/svg+xml'),width:positive,height:positive,accessibility:(v,d)=>{
  const r=record(v);if(r.kind==='meaningful') shape({kind:literal('meaningful'),alt:text})(v,d);else {assert(!meaningful);shape({kind:literal('decorative'),alt:literal('')})(v,d);}
}},{title:text,description:text});
const meaningful=image(true),documentLink=shape({id:identity,href:asset,mime:literal('application/pdf'),fileName:identity,bytes:positive,label:text},{downloadName:identity});
const seo=shape({},{title:text,description:text,socialImage:meaningful});
function rich(policy:'simple'|'profile-long'|'body'):Check {
  const marks=policy==='body' ? ['bold','italic','code'] : ['bold','italic','underline','code','superscript','subscript','strikethrough'];
  const run=shape({kind:literal('text'),text:string,marks:list(literal(...marks))});
  const inline:Check=(v,d)=>{if(record(v).kind==='text') run(v,d);else shape({kind:literal('link'),href:https,children:list(run)})(v,d);};
  const paragraph=shape({kind:literal('paragraph'),children:list(inline)});
  const listBlock:Check=(v,d)=>shape({kind:literal('list'),ordered:literal(true,false),items:list(shape({blocks:list((x,n)=>record(x).kind==='list' ? listBlock(x,n) : paragraph(x,n))}))})(v,d);
  const block:Check=(v,d)=>{
    const r=record(v);if(r.kind==='paragraph') return paragraph(v,d);if(r.kind==='list') return listBlock(v,d);
    assert(policy!=='simple');
    if(r.kind==='heading') return shape({kind:literal('heading'),level:literal(2,3),children:list(inline)})(v,d);
    if(r.kind==='quote') return shape({kind:literal('quote'),blocks:list(paragraph)})(v,d);
    assert(policy==='body');if(r.kind==='figure') return shape({kind:literal('figure'),image:meaningful})(v,d);
    shape({kind:literal('attachment'),document:documentLink})(v,d);
  };
  return shape({policy:literal(policy),blocks:list(block)});
}
const skill=shape({id:identity,name:text},{summary:text,proofSummary:text});
const group=shape({id:identity,name:text,skills:list(skill,1)},{description:text,sortOrder:nonnegative});
const toolFields={id:identity,name:text,category:literal('cms-platform','frontend-framework','language-runtime','design-qa','seo-analytics','deployment-devops','collaboration-workflow','automation-ai'),usageContext:text};
const toolOptions={externalUrl:https,logo:image(false)},tool=shape(toolFields,toolOptions);
const profileFields={id:identity,name:text,primaryTitle:text,positioningStatement:text,shortBio:text,profileImage:meaningful};
const profileOptions={secondaryTitle:text,location:text};
const profileSummary=shape(profileFields,profileOptions);
const profile=shape({...profileFields,longBio:rich('profile-long'),socialLinks:list(social)},{...profileOptions,publicEmail:email,availabilityStatus:text,workPreference:text,contactIntro:text,resume:documentLink,learningHighlights:rich('simple')});
const author=shape({id:identity,name:text,primaryTitle:text,profileImage:meaningful});
const experienceFields={id:identity,company:text,role:text,start:month,summary:text},experienceOptions={end:month,currentRole:literal(true,false)};
const experience=shape(experienceFields,experienceOptions);
const projectFields={id:identity,slug,href:routePath,title:text,summary:text,projectType:literal('case-study','cms-architecture','content-modeling','migration-replatforming','frontend-integration','content-operations','workflow-automation'),role:text,outcome:text,heroImage:meaningful,tags:list(text),skills:list(skill),tools:list(tool)};
const projectOptions={projectStatus:literal('completed','ongoing','in-progress','archived'),contextSummary:text};
const articleFields={id:identity,slug,href:routePath,title:text,excerpt:text,publishDate:date,tags:list(text),author};
const articleOptions={updatedDate:date,contentPillar:literal('cms-architecture','frontend-implementation','content-operations','migration-strategy','seo-accessibility-content-quality','ai-assisted-workflows'),category:literal('technical-guide','field-note','strategy-note','case-study-note','reflection'),heroImage:meaningful};
const identified=(base:Check,prefix:string):Check=>(v,d)=>{base(v,d);const r=record(v);assert(r.href===prefix+String(r.slug));};
const project=identified(shape(projectFields,projectOptions),'/projects/'),article=identified(shape(articleFields,articleOptions),'/writing/');
const projectDetail=identified(shape({...projectFields,problem:text,approach:text,galleryImages:list(meaningful),seo,relatedProjects:list(project),relatedArticles:list(article)},{...projectOptions,caseStudyBody:rich('body'),metrics:text,liveUrl:https,repositoryUrl:https,relatedExperience:experience}),'/projects/');
const articleDetail=identified(shape({...articleFields,body:rich('body'),seo,relatedProjects:list(project),relatedArticles:list(article),skills:list(skill),tools:list(tool)},articleOptions),'/writing/');
const experienceView=shape({...experienceFields,responsibilities:rich('simple'),achievements:rich('simple'),skills:list(skill),tools:list(tool),relatedArticles:list(article),relatedProjects:list(project)},{...experienceOptions,location:text,employmentType:literal('full-time','contract','consulting','freelance','part-time','internship','volunteer'),companyUrl:https,companyLogo:image(false),metrics:text,contextSummary:text});
const toolView=shape({...toolFields,skills:list(skill),proof:shape({projects:list(project),experience:list(experience),articles:list(article)})},toolOptions);
const channel:Check=(v,d)=>{
  const r=record(v);if(r.kind==='social') shape({kind:literal('social'),platform,label:text,href:https})(v,d);
  else {shape({kind:literal('email'),label:text,email,href:identity})(v,d);assert(typeof r.email==='string' && r.href==='mailto:'+encodeURIComponent(r.email).replace('%40','@'));}
};
const contact=shape({intro:text,channels:list(channel,1)},{resume:documentLink,availability:text,workPreference:text,location:text});
// Frozen Home/About fixtures carry complete ToolView values in their ToolSummary slots.
// Accept either normalized shape and validate every present proof field.
const toolInSummarySlot:Check=(v,d)=>{const r=record(v);(Object.hasOwn(r,'proof')||Object.hasOwn(r,'skills') ? toolView : tool)(v,d);};
const dataChecks:Readonly<Record<string,Check>>={
  home:shape({profile:profileSummary,projects:list(project),writing:list(article),experience:list(experience),skillGroups:list(group),tools:list(toolInSummarySlot),contact}),
  about:shape({profile,skillGroups:list(group),experience:list(experience),tools:list(toolInSummarySlot),contact}),
  work:shape({experiences:list(experienceView),contact}),projects:shape({projects:list(project),contact}),project:shape({project:projectDetail,contact}),
  writing:shape({articles:list(article),contact}),article:shape({article:articleDetail,contact}),tools:shape({tools:list(toolView),skillGroups:list(group),contact}),contact:shape({profile:profileSummary,contact})
};
const messages:Readonly<Record<string,string>>={COLLECTION_EMPTY:'No eligible items are available.',ROUTE_NOT_FOUND:'This page could not be found.',CONTENT_UNAVAILABLE:'Content is unavailable.',MEDIA_UNAVAILABLE:'This media is unavailable.'};
const diagnostic:Check=(v,d)=>{shape({code:literal(...Object.keys(messages)),message:text})(v,d);const r=record(v);assert(typeof r.code==='string' && messages[r.code]===r.message);};
export function validateBootstrap(value:unknown):asserts value is Bootstrap {
  const envelope=record(value);shape({version:literal(1),identifierPrefix:literal(identifierPrefix),page:()=>{}})(value,0);
  const p=record(envelope.page);
  if(p.state==='MISSING'||p.state==='ERROR') {shape({state:literal('MISSING','ERROR')})(p,0);return;}
  shape({state:literal('READY','EMPTY'),audience:literal('PUBLIC'),httpStatus:literal(200),route:literal(...Object.keys(dataChecks)),routeInfo:()=>{},chrome,metadata:()=>{},diagnostics:list(diagnostic),data:()=>{}})(p,0);
  assert(typeof p.route==='string');const route=record(p.routeInfo),data=record(p.data),meta=record(p.metadata);
  if(p.route==='project'||p.route==='article') {
    shape({route:literal(p.route),path:routePath,slug})(route,0);
    assert(route.path===`/${p.route==='project'?'projects':'writing'}/${String(route.slug)}`);
  } else shape({route:literal(p.route),path:literal(paths[p.route])})(route,0);
  shape({title:text,description:text,robots:literal(p.state==='EMPTY'?'noindex,follow':'noindex,nofollow'),sitemapEligible:literal(false),breadcrumbs:list(shape({label:text,href:routePath})),...(p.state==='READY'?{mode:literal('offline-demo')}:{})})(meta,0);
  const check=dataChecks[p.route];assert(check);check(data,0);
  const collections:Readonly<Record<string,string>>={work:'experiences',projects:'projects',writing:'articles',tools:'tools'},key=collections[p.route];
  if(p.state==='EMPTY') {assert(key);const items=data[key];assert(Array.isArray(items)&&items.length===0);}
  else if(key) {const items=data[key];assert(Array.isArray(items)&&items.length>0);}
  if(p.route==='home') assert(['projects','writing','experience'].some(k=>Array.isArray(data[k])&&data[k].length>0));
  if(p.route==='project'||p.route==='article') {const detail=record(data[p.route]);assert(detail.slug===route.slug&&detail.href===route.path);}
}
function initializationFailure(root:HTMLElement,kind:'initialization'|'render'):void {
  delete root.dataset.hydrated;root.dataset.hydrationError='true';root.dataset.failure=kind;
  const message=document.createElement('p');message.setAttribute('role','alert');message.textContent='This page could not be displayed. Please reload.';root.replaceChildren(message);
}
if(typeof document!=='undefined') {
  const root=document.getElementById('portfolio-root');if(root) {
    try {
      const el=document.getElementById('portfolio-data');if(!el||el.getAttribute('type')!=='application/json') throw new Error('Invalid portfolio bootstrap');
      const bootstrap:unknown=JSON.parse(el.textContent??'');validateBootstrap(bootstrap);
      hydrateRoot(root,<PortfolioErrorBoundary><PageView page={bootstrap.page}/></PortfolioErrorBoundary>,{identifierPrefix:bootstrap.identifierPrefix,
        onRecoverableError:()=>{delete root.dataset.hydrated;root.dataset.hydrationError='true';console.error('Portfolio hydration failed');},
        onCaughtError:()=>{delete root.dataset.hydrated;root.dataset.failure='render';},
        onUncaughtError:()=>initializationFailure(root,'render')});
    } catch {initializationFailure(root,'initialization');}
  }
}

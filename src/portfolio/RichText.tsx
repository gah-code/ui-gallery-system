import { useState, type ReactNode } from 'react';
import type { RichTextDocument, RichTextPolicy, Block, Inline, TextRun } from '../content/portfolio/contracts/rich-text';
import type { ImageView, DocumentLink } from '../content/portfolio/contracts/media';
import { Image } from '../components/ui/Image/Image';
export function PortfolioImage({image}:{image:ImageView}) {
  const [failed,setFailed] = useState(false);
  return failed ? <span role={image.accessibility.kind === 'meaningful' ? 'img' : undefined} aria-label={image.accessibility.kind === 'meaningful' ? image.accessibility.alt : undefined}>Image unavailable{image.accessibility.kind === 'meaningful' ? `: ${image.accessibility.alt}` : ''}</span> :
    <Image src={image.src} alt={image.accessibility.alt} decorative={image.accessibility.kind === 'decorative'} width={image.width} height={image.height} fit="contain" onError={() => setFailed(true)} />;
}
export function DocumentLinkView({document}:{document:DocumentLink}) {return <a href={document.href} type={document.mime} download={document.downloadName}>{document.label}</a>;}
function TextSpan({run}:{run:TextRun}) {
  let child:ReactNode = run.text;
  for (const mark of run.marks) {
    switch(mark) {case 'bold':child=<strong>{child}</strong>;break;case 'italic':child=<em>{child}</em>;break;case 'underline':child=<u>{child}</u>;break;case 'code':child=<code>{child}</code>;break;case 'superscript':child=<sup>{child}</sup>;break;case 'subscript':child=<sub>{child}</sub>;break;case 'strikethrough':child=<s>{child}</s>;break;}
  }
  return <>{child}</>;
}
function Inlines({items}:{items:readonly Inline[]}) {return <>{items.map((n,i) => n.kind === 'text' ? <TextSpan key={i} run={n}/> : <a key={i} href={n.href}>{n.children.map((r,j) => <TextSpan key={j} run={r}/>)}</a>)}</>;}
function Blocks({blocks}:{blocks:readonly Block[]}) {return <>{blocks.map((b,i) => {
  switch(b.kind) {
    case 'paragraph':return <p key={i}><Inlines items={b.children}/></p>;
    case 'heading':return b.level === 2 ? <h2 key={i}><Inlines items={b.children}/></h2> : <h3 key={i}><Inlines items={b.children}/></h3>;
    case 'quote':return <blockquote key={i}><Blocks blocks={b.blocks}/></blockquote>;
    case 'figure':return <figure key={i}><PortfolioImage image={b.image}/></figure>;
    case 'attachment':return <p key={i}><DocumentLinkView document={b.document}/></p>;
    case 'list':{const List=b.ordered ? 'ol' : 'ul';return <List key={i}>{b.items.map((item,j) => <li key={j}><Blocks blocks={item.blocks}/></li>)}</List>;}
  }
})}</>;}
export function RichText({document}:{document:RichTextDocument<RichTextPolicy>}) {return <div data-rich-text-policy={document.policy}><Blocks blocks={document.blocks}/></div>;}

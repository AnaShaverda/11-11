import '../ribbon-sketch/fonts.css';
import '../../styles/pop-disco.css';
export default function PopDiscoPoster({sample,language,presentation,className='',ariaLabel}){
 const ka=language==='ka';
 return <div lang={language} className={`pd-poster ${presentation==='portrait'?'pd-poster-portrait':''} ${className}`} role="img" aria-label={ariaLabel||sample.title} style={{containerType:'inline-size'}}><p>{ka?'მოწვეული ხარ':'You’re invited'}</p><h3><span>{sample.name}</span><span>{ka?`ხდება ${sample.age??33}.`:`turns ${sample.age??33}.`}</span></h3><small>{sample.date}<br/>{sample.time}<br/>{sample.location}</small><img src="/images/birthday/disco-scrapbook/pop-disco/mirrorball.webp" alt=""/><span className="pd-poster-hand">{ka?'უფრო დიდი\nოცნებები.':'Same dance floor,\nwilder dreams.'}</span></div>;
}

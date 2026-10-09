import '../../styles/checkerboard-cheers.css';
export default function CheckerboardCheersPoster({sample,language,presentation,className='',ariaLabel}){
 const ka=language==='ka';
 return <div className={`cc-poster cc-poster-grand ${presentation==='portrait'?'cc-poster--portrait':''} ${className}`} lang={language} role="img" aria-label={ariaLabel||sample.title} style={{containerType:'inline-size'}}><div className="cc-poster-paper"><h3>{ka?'კარგი დრო ახლა იწყება.':'Let the good times flow.'}</h3><p>{ka?`${sample.name} ${sample.age??28} წლის ხდება`:`${sample.name} turns ${sample.age??28}`}</p><small>{sample.date} · {sample.time} · {sample.location}</small></div><img className="cc-poster-glass cc-poster-martini" src="/images/birthday/checkerboard-cheers/painted-olive-martini.webp" alt=""/><img className="cc-poster-glass cc-poster-spritz" src="/images/components/separated/checkerboard-spritz.webp" alt=""/></div>;
}

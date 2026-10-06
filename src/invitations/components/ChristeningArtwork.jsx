function ArtworkPiece({ kind, tone = 'blue', className = '' }) {
  return <img className={`christening-piece christening-${kind} ${className}`} src={`/images/christening/${tone}-${kind}.png`} alt="" aria-hidden="true" decoding="async" />;
}

export function ChristeningWatercolorWash({ tone = 'blue' }) {
  return <img className="christening-watercolor-wash" src={`/images/christening/${tone}-wash.png`} alt="" aria-hidden="true" decoding="async" />;
}

export function ChristeningDove(props) { return <ArtworkPiece {...props} kind="dove" />; }
export function ChristeningCandle(props) { return <ArtworkPiece {...props} kind="candle" />; }
export function ChristeningFlowers(props) { return <ArtworkPiece {...props} kind="flowers" />; }

export default function ChristeningArtwork({ tone = 'blue', adaptive = false }) {
  return <div className={`wedding-artwork christening-artwork tone-${tone}${adaptive ? ' is-adaptive' : ''}`} aria-hidden="true">
    <ChristeningWatercolorWash tone={tone} />
    {adaptive && <span className="christening-inner-border" />}
    {!adaptive && <>
      <ChristeningDove tone={tone} />
      <ChristeningCandle tone={tone} />
      <ChristeningFlowers tone={tone} />
    </>}
  </div>;
}

export function ChristeningClassicArtwork({ layout, adaptive = false }) {
  const tone = layout === 'cascade' ? 'pink' : 'blue';
  return <div className={`wedding-artwork christening-artwork christening-layout-${layout}${adaptive ? ' is-adaptive' : ''}`} aria-hidden="true">
    {adaptive ? <>{layout !== 'wreath' && <ChristeningWatercolorWash tone={tone} />}<span className="christening-inner-border" /></> : <>
      <img className={`christening-classic-layer christening-${layout}`} src={`/images/christening/${{ sky: 'blue-sky', wreath: 'olive-wreath', cascade: 'blush-cascade' }[layout]}.png`} alt="" decoding="async" />
      {layout === 'sky' && <><ChristeningDove tone="blue" /><ChristeningFlowers tone="blue" /></>}
      {layout === 'cascade' && <ChristeningCandle tone="pink" />}
    </>}
  </div>;
}

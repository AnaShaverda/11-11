import BirthdayIllustrations from "./BirthdayIllustrations.jsx";

function BoardHeading({ number, title, description, id }) {
  return <div className="design-board-heading"><span>{number} / THE DESIGN LANGUAGE</span><div><h2 id={id}>{title}</h2><p>{description}</p></div></div>;
}

function TypographyBoard({ template, sample }) {
  const { design } = template;
  const showGeneratedDecor = template.slug !== "birthday-coquette";
  return (
    <section className="design-board-section" aria-labelledby="design-type-heading">
      <BoardHeading number="01" id="design-type-heading" title="Type with a point of view" description="The lettering sets the mood before the celebration begins." />
      <div className="design-type-board design-board-surface">
        <span className="design-board-kicker">11:11 / {template.category.toUpperCase()}</span>
        {showGeneratedDecor && <strong className="design-type-mark" aria-hidden="true">{sample.mark}</strong>}
        <BirthdayIllustrations assets={template.visualAssets?.typography} slot="typography" />
        <div className="design-type-words"><span>YOU’RE INVITED</span><h3>{design.specimen}</h3><p>{design.phrase}</p></div>
        {showGeneratedDecor && <span className="design-type-glyph" aria-hidden="true">{design.motif}</span>}
        <div className="design-type-bottom"><span>{sample.date}</span><span>{sample.location}</span><span>GOOD DAYS ARE MEANT TO BE SHARED</span></div>
      </div>
    </section>
  );
}

function ElementsBoard({ template, sample }) {
  const { design } = template;
  const showGeneratedDecor = template.slug !== "birthday-coquette";
  return (
    <section className="design-board-section" aria-labelledby="design-elements-heading">
      <BoardHeading number="02" id="design-elements-heading" title="The little details" description="Color, pattern, and small marks carry the same feeling throughout." />
      <div className="design-elements-board">
        <div className="design-palette-panel design-board-surface"><span className="design-board-kicker">THE PALETTE</span><h3>Four colors.<br />One feeling.</h3><div className="design-palette-swatches">{design.palette.map((color, index) => <div key={color} className="design-palette-swatch"><span style={{ backgroundColor: color }} /><small>{String(index + 1).padStart(2, "0")} · {color.toUpperCase()}</small></div>)}</div></div>
        <div className="design-pattern-panel design-board-surface"><span className="design-board-kicker">MARKS & PATTERN</span>{showGeneratedDecor && <strong aria-hidden="true">{design.motif}</strong>}<BirthdayIllustrations assets={template.visualAssets?.pattern} slot="pattern" /><p>{template.style}</p></div>
        <div className="design-ticket-panel design-board-surface"><span>11:11 / THE OCCASION</span><strong>{sample.date}</strong><span>{sample.location} · {sample.title}</span>{showGeneratedDecor && <i aria-hidden="true">{design.motif}</i>}</div>
      </div>
    </section>
  );
}

function SupportingCards({ template, sample }) {
  const { design } = template;
  const showGeneratedDecor = template.slug !== "birthday-coquette";
  const cards = [
    { label: "SAVE THE DATE", main: sample.date, sub: sample.title },
    { label: "EVENT DETAILS", main: sample.location, sub: sample.line },
    { label: design.accentCard, main: design.accentCopy, sub: template.style },
    { label: "A LITTLE NOTE", main: design.finish, sub: "11:11 · MADE FOR THE MOMENT" },
  ];
  return (
    <section className="design-board-section design-support-section" aria-labelledby="design-support-heading">
      <BoardHeading number="03" id="design-support-heading" title="Beyond the invitation" description="A few visual pieces from the wider event world this design could create." />
      <div className="design-support-grid">{cards.map((card, index) => <article className={`design-support-card design-support-${index + 1}`} key={card.label}><span>{card.label}</span><strong>{card.main}</strong><small>{card.sub}</small>{showGeneratedDecor && <i aria-hidden="true">{design.motif}</i>}<BirthdayIllustrations assets={template.visualAssets?.supportCards?.[index] ?? (index === 2 ? template.visualAssets?.support : null)} slot="support" /></article>)}</div>
      <p className="design-sample-note">These are design samples. Interactive event features belong to the future created experience.</p>
    </section>
  );
}

export default function InvitationMoodBoards({ template, sample }) {
  return <><TypographyBoard template={template} sample={sample} /><ElementsBoard template={template} sample={sample} /><SupportingCards template={template} sample={sample} /></>;
}

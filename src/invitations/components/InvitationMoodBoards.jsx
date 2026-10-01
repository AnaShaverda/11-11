import BirthdayIllustrations from "./BirthdayIllustrations.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

function BoardHeading({ number, title, description, id }) {
  const { t } = useLanguage();
  return <div className="design-board-heading"><span>{number} / {t("moodboard.language")}</span><div><h2 id={id}>{title}</h2><p>{description}</p></div></div>;
}

function TypographyBoard({ template, sample }) {
  const { t } = useLanguage();
  const { design } = template;
  const showGeneratedDecor = !["birthday-coquette", "birthday-floral-affair", "birthday-beer-party"].includes(template.slug);
  return (
    <section className="design-board-section" aria-labelledby="design-type-heading">
      <BoardHeading number="01" id="design-type-heading" title={t("moodboard.type.title")} description={t("moodboard.type.description")} />
      <div className="design-type-board design-board-surface">
        <span className="design-board-kicker">11:11 / {t(`common.${template.category.toLowerCase()}`)}</span>
        {showGeneratedDecor && <strong className="design-type-mark" aria-hidden="true">{sample.mark}</strong>}
        <BirthdayIllustrations assets={template.visualAssets?.typography} slot="typography" />
        <div className="design-type-words"><span>{t("invitations.invited")}</span><h3>{design.specimen}</h3><p>{design.phrase}</p></div>
        {showGeneratedDecor && <span className="design-type-glyph" aria-hidden="true">{design.motif}</span>}
        <div className="design-type-bottom"><span>{sample.date}</span><span>{sample.location}</span><span>{t("moodboard.shared")}</span></div>
      </div>
    </section>
  );
}

function ElementsBoard({ template, sample }) {
  const { t } = useLanguage();
  const { design } = template;
  const showGeneratedDecor = !["birthday-coquette", "birthday-floral-affair", "birthday-beer-party"].includes(template.slug);
  return (
    <section className="design-board-section" aria-labelledby="design-elements-heading">
      <BoardHeading number="02" id="design-elements-heading" title={t("moodboard.details.title")} description={t("moodboard.details.description")} />
      <div className="design-elements-board">
        <div className="design-palette-panel design-board-surface"><span className="design-board-kicker">{t("moodboard.palette")}</span><h3>{t("moodboard.palette.title")}</h3><div className="design-palette-swatches">{design.palette.map((color, index) => <div key={color} className="design-palette-swatch"><span style={{ backgroundColor: color }} /><small>{String(index + 1).padStart(2, "0")} · {color.toUpperCase()}</small></div>)}</div></div>
        <div className="design-pattern-panel design-board-surface"><span className="design-board-kicker">{t("moodboard.pattern")}</span>{showGeneratedDecor && <strong aria-hidden="true">{design.motif}</strong>}<BirthdayIllustrations assets={template.visualAssets?.pattern} slot="pattern" /><p>{t(`themes.${template.id}.style`)}</p></div>
        <div className="design-ticket-panel design-board-surface"><span>11:11 / {t("moodboard.occasion")}</span><strong>{sample.date}</strong><span>{sample.location} · {sample.title}</span>{showGeneratedDecor && <i aria-hidden="true">{design.motif}</i>}</div>
      </div>
    </section>
  );
}

function SupportingCards({ template, sample }) {
  const { t } = useLanguage();
  const { design } = template;
  const showGeneratedDecor = !["birthday-coquette", "birthday-floral-affair", "birthday-beer-party"].includes(template.slug);
  const cards = [
    { label: t("moodboard.saveDate"), main: sample.date, sub: sample.title },
    { label: t("moodboard.details"), main: sample.location, sub: sample.line },
    { label: design.accentCard, main: design.accentCopy, sub: t(`themes.${template.id}.style`) },
    { label: t("moodboard.note"), main: design.finish, sub: t("moodboard.made") },
  ];
  return (
    <section className="design-board-section design-support-section" aria-labelledby="design-support-heading">
      <BoardHeading number="03" id="design-support-heading" title={t("moodboard.support.title")} description={t("moodboard.support.description")} />
      <div className="design-support-grid">{cards.map((card, index) => <article className={`design-support-card design-support-${index + 1}`} key={card.label}><span>{card.label}</span><strong>{card.main}</strong><small>{card.sub}</small>{showGeneratedDecor && <i aria-hidden="true">{design.motif}</i>}<BirthdayIllustrations assets={template.visualAssets?.supportCards?.[index] ?? (index === 2 ? template.visualAssets?.support : null)} slot="support" /></article>)}</div>
      <p className="design-sample-note">{t("moodboard.disclaimer")}</p>
    </section>
  );
}

export default function InvitationMoodBoards({ template, sample }) {
  return <><TypographyBoard template={template} sample={sample} /><ElementsBoard template={template} sample={sample} /><SupportingCards template={template} sample={sample} /></>;
}

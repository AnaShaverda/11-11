import { localizeCardRecord } from "../../localization/cardCopy.js";
import { getDesignFont, getDesignTypography } from "../data/cardTypography.js";
import BirthdayIllustrations from "./BirthdayIllustrations.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

function BoardHeading({ number, title, description, id }) {
  const { t } = useLanguage();
  return <div className="design-board-heading"><span>{number} / {t("moodboard.language")}</span><div><h2 id={id}>{title}</h2><p>{description}</p></div></div>;
}

export function ElementsBoard({ template, sample }) {
  const { t } = useLanguage();
  const design = localizeCardRecord("designs", template.slug, template.design, t);
  const showGeneratedDecor = !template.visualAssets?.lineArt && !["birthday-coquette", "birthday-floral-affair", "birthday-beer-party"].includes(template.slug);
  return (
    <section className="design-board-section design-elements-compact" aria-labelledby="design-elements-heading">
      <BoardHeading number="01" id="design-elements-heading" title={t("moodboard.details.title")} description={t("moodboard.details.description")} />
      <div className="design-elements-board">
        <div className="design-palette-panel design-board-surface"><span className="design-board-kicker">{t("moodboard.palette")}</span><h3>{t(design.paletteTitleKey ?? "moodboard.palette.title")}</h3><div className="design-palette-swatches">{design.palette.map((color) => <div key={color} className="design-palette-swatch"><span style={{ backgroundColor: color }} /><small>{color.toUpperCase()}</small></div>)}</div></div>
        <div className="design-pattern-panel design-board-surface"><span className="design-board-kicker">{t("moodboard.pattern")}</span>{showGeneratedDecor && design.motif && <strong aria-hidden="true">{design.motif}</strong>}<BirthdayIllustrations assets={template.visualAssets?.pattern} slot="pattern" /><p>{t(`themes.${template.id}.style`)}</p></div>
        <div className="design-ticket-panel design-board-surface"><span>11:11 / {t("moodboard.occasion")}</span><strong>{sample.date}</strong><span>{sample.location} · {sample.title}</span>{showGeneratedDecor && design.motif && <i aria-hidden="true">{design.motif}</i>}</div>
      </div>
    </section>
  );
}

function SupportingCards({ template, sample }) {
  const { t, language } = useLanguage();
  const design = localizeCardRecord("designs", template.slug, template.design, t);
  const typography = getDesignTypography(template);
  const showGeneratedDecor = !template.visualAssets?.lineArt && !["birthday-coquette", "birthday-floral-affair", "birthday-beer-party"].includes(template.slug);
  const cards = [
    { label: t("moodboard.saveDate"), main: sample.date, sub: sample.title },
    { label: t("moodboard.details"), main: sample.location, sub: sample.line },
    { label: design.accentCard, main: design.accentCopy, sub: t(`themes.${template.id}.style`) },
    { label: t("moodboard.note"), main: design.finish, sub: t("moodboard.made") },
  ];
  return (
    <section className="design-board-section design-support-section" aria-labelledby="design-support-heading">
      <BoardHeading number="02" id="design-support-heading" title={t("moodboard.support.title")} description={t("moodboard.support.description")} />
      {(design.specimen || design.phrase) && <div className="design-support-message">{design.specimen && <h3 className="design-font-sample" style={getDesignFont(typography.display, language).style}>{design.specimen}</h3>}{design.phrase && <p className="design-font-sample" style={getDesignFont(typography.accent ?? typography.details, language).style}>{design.phrase}</p>}</div>}
      <div className="design-support-grid">{cards.map((card, index) => <article className={`design-support-card design-support-${index + 1}`} key={card.label}><span className="design-font-sample" style={getDesignFont(typography.opening, language).style}>{card.label}</span><strong className="design-font-sample" style={getDesignFont(index === 0 ? typography.details : typography.display, language).style}>{card.main}</strong><small className="design-font-sample" style={getDesignFont(typography.details, language).style}>{card.sub}</small>{showGeneratedDecor && design.motif && <i aria-hidden="true">{design.motif}</i>}<BirthdayIllustrations assets={template.visualAssets?.supportCards?.[index] ?? (index === 2 ? template.visualAssets?.support : null)} slot="support" /></article>)}</div>
      <p className="design-sample-note">{t("moodboard.disclaimer")}</p>
    </section>
  );
}

export default function InvitationMoodBoards({ template, sample }) {
  return <SupportingCards template={template} sample={sample} />;
}

import { localizeCardRecord } from "../../localization/cardCopy.js";
import { getDesignFont, getDesignTypography } from "../data/cardTypography.js";
import BirthdayIllustrations from "./BirthdayIllustrations.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export default function InvitationMoodBoards({ template, sample }) {
  const { t, language } = useLanguage();
  const design = localizeCardRecord("designs", template.slug, template.design, t);
  const displayFont = getDesignFont(getDesignTypography(template).display, language);
  const showGeneratedDecor = !template.visualAssets?.lineArt;

  return (
    <section className="design-board-section design-elements-compact" aria-label={t("moodboard.language")}>
      <div className="design-elements-board">
        <div className="design-palette-panel design-board-surface"><span className="design-board-kicker">{t("moodboard.palette")}</span><h3>{t(design.paletteTitleKey ?? "moodboard.palette.title")}</h3><div className="design-palette-swatches">{design.palette.map((color) => <div key={color} className="design-palette-swatch"><span style={{ backgroundColor: color }} /><small>{color.toUpperCase()}</small></div>)}</div></div>
        <div className="design-pattern-panel design-board-surface"><span className="design-board-kicker">{t("moodboard.pattern")}</span>{showGeneratedDecor && design.motif && <strong aria-hidden="true">{design.motif}</strong>}<BirthdayIllustrations assets={template.visualAssets?.pattern} slot="pattern" /><div className="design-pattern-typography"><span>{t("moodboard.typography")}</span><em className="design-font-sample" style={displayFont.style}>{design.specimen || sample.headline || sample.title}</em></div><p>{t(`themes.${template.id}.style`)}</p></div>
        <div className="design-ticket-panel design-board-surface"><span>11:11 / {t("moodboard.occasion")}</span><strong>{sample.date}</strong><span>{sample.location} · {sample.title}</span>{showGeneratedDecor && design.motif && <i aria-hidden="true">{design.motif}</i>}</div>
      </div>
    </section>
  );
}

import { useLanguage } from "../../localization/LanguageContext.jsx";

const headingVariants = new Set(["bear-hug", "up-in-the-air", "special-delivery", "little-wonder", "pink-or-blue"]);

export default function GenderRevealPoster({ title, line, date, time, location, variant }) {
  const { language, t } = useLanguage();
  const heading = headingVariants.has(variant) ? variant : "default";
  return <div lang={language} className={`reveal-poster-copy reveal-poster-${variant}`}>
    <span className="reveal-heading">{t(`cards.reveal.${heading}`)}</span>
    <span className="reveal-message">{line}</span>
    <span className="reveal-invited">{t("cards.reveal.invited")}</span>
    <strong className="reveal-name">{title}</strong>
    <span className="reveal-details">{date}{time && <> · {time}</>}<br />{location}</span>
    <span className="reveal-closing">{t("cards.reveal.closing")}</span>
  </div>;
}

import { useEffect, useRef, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { getCustomTemplate } from "../data/customTemplates.js";
import { getCustomThemes } from "../data/customClassicalThemes.js";
import { WeddingThemePreview } from "../components/WeddingThemeDecoration.jsx";

function ExperiencePhone({ category, theme, language }) {
  const display = useRef(null);
  const [scale, setScale] = useState(.7);
  useEffect(() => {
    const element = display.current;
    if (!element) return;
    const update = () => setScale(element.clientWidth / 390);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div className="custom-design-phone">
    <div className="custom-design-phone-screen">
      <span className="custom-design-phone-button custom-design-phone-action" aria-hidden="true" />
      <span className="custom-design-phone-button custom-design-phone-volume" aria-hidden="true" />
      <span className="custom-design-phone-button custom-design-phone-power" aria-hidden="true" />
      <div className="custom-design-phone-display" ref={display}>
        <iframe key={theme.id} className="custom-design-experience-frame" title={`${theme.name[language] ?? theme.name.en} — ${language === "ka" ? "მოსაწვევის სრული გამოცდილება" : "full invitation experience"}`} src={`/invitations/create/${category}/demo/${theme.id}`} style={{ transform: `scale(${scale})` }} />
      </div>
    </div>
  </div>;
}

export default function CustomDesignGalleryPage() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { language, t } = useLanguage();
  const template = getCustomTemplate(category);
  const occasion = category === "christening" || category === "baby-kids" ? "christening" : category === "all" ? (searchParams.get("occasion") === "christening" ? "christening" : "wedding") : "wedding";
  const themes = getCustomThemes(occasion);
  const defaultIndex = Math.max(0, themes.findIndex(theme => theme.id === "pressedRose"));
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  useEffect(() => { setSelectedIndex(defaultIndex); }, [occasion, defaultIndex]);
  const theme = themes[selectedIndex] ?? themes[0];
  const copy = language === "ka" ? {
    eyebrow: "შენი დიზაინი", title: "ნახე მთელი მოსაწვევი", intro: "აირჩიე დიზაინი და ნახე მოსაწვევი ამავე მობილურზე.", wedding: "ქორწილი", christening: "ნათლობა", choose: "ამ დიზაინის არჩევა", back: "კოლექციაში დაბრუნება", full: "სრული ეკრანი", select: "დიზაინის არჩევა", preview: "მოსაწვევი",
  } : {
    eyebrow: "Create your own", title: "Experience the whole invitation", intro: "Choose a design and see the invitation in the same phone.", wedding: "Wedding", christening: "Christening", choose: "Choose this design", back: "Back to collection", full: "Full screen", select: "Choose a design", preview: "Invitation",
  };
  if (!template) return <main className="inner-page copy-page"><h1>{t("invitations.notFound.title")}</h1><Link to="/invitations">{t("invitations.allInvitations")}</Link></main>;

  return <div className="custom-design-gallery-page"><div className="custom-design-gallery-inner">
    <div className="custom-design-gallery-toolbar">
    {category === "all" && <div className="custom-design-gallery-tabs" role="group" aria-label={language === "ka" ? "ღონისძიების ტიპი" : "Event type"}>
      {["wedding", "christening"].map(type => <button key={type} type="button" aria-pressed={occasion === type} onClick={() => setSearchParams({ occasion: type })}>{copy[type]}</button>)}
    </div>}
    </div>
    <div className="custom-design-workspace">
    <section className="custom-design-picker" aria-label={copy.select}>
      <h2>{copy.select}</h2>
      <div className="custom-design-picker-track">
        {themes.map((item, index) => <button type="button" key={item.id} aria-label={item.name[language] ?? item.name.en} aria-pressed={selectedIndex === index} onClick={() => setSelectedIndex(index)}>
          <WeddingThemePreview theme={item} label={copy.preview} />
          <span className="custom-design-theme-title">{item.name[language] ?? item.name.en}</span>
        </button>)}
      </div>
    </section>
    <section className="custom-design-featured" aria-label={theme.name[language] ?? theme.name.en}>
      <ExperiencePhone category={category} theme={theme} language={language} />
      <div className="custom-design-featured-info">
        <div className="custom-design-featured-actions"><Link to={`/invitations/create/${category}/demo/${theme.id}`}>{copy.full} ↗</Link></div>
        <Link className="custom-design-gallery-choose" to={`/invitations/create/${category}?occasion=${encodeURIComponent(occasion)}&theme=${encodeURIComponent(theme.id)}`}>{copy.choose} <span aria-hidden="true">→</span></Link>
      </div>
    </section>
    </div>
  </div></div>;
}

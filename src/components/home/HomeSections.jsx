import Icon from "../ui/Icon.jsx";
import { Link } from "react-router-dom";
import InvitationGallery from "../../invitations/components/InvitationGallery.jsx";
import { invitationTemplates } from "../../invitations/data/templates.js";
import HomeSurpriseSection from "../../surprises/components/HomeSurpriseSection.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

const possibilities = [
  { icon: "mail", id: "invitations" }, { icon: "sparkle", id: "birthday" },
  { icon: "sparkle", id: "wedding" }, { icon: "heart", id: "diary" },
  { icon: "image", id: "memories" }, { icon: "help-circle", id: "games" },
];

const interactive = [
  { number: "01", id: "diary", to: "/modules/friendship-diary" },
  { number: "02", id: "wishes", to: "/projects/birthday" },
  { number: "03", id: "memories", to: "/projects/birthday#optional-modules" },
];

export default function HomeSections() {
  const { t } = useLanguage();
  return (
    <div className="home-more">
      <section className="home-possibilities">
        <div className="home-section-intro"><span className="home-section-index">{t("home.possibilities.index")}</span><h2>{t("home.possibilities.title")}</h2><p>{t("home.possibilities.description")}</p></div>
        <div className="possibility-list">{possibilities.map((item) => <div className="possibility-row" key={item.id}><span aria-hidden="true"><Icon name={item.icon} size={24} /></span><div><strong>{t(`home.possibility.${item.id}.title`)}</strong><small>{t(`home.possibility.${item.id}.detail`)}</small></div></div>)}</div>
      </section>
      <HomeSurpriseSection />
      <section className="home-invitations">
        <div className="home-section-top"><div><span className="home-section-index">{t("home.invitations.index")}</span><h2>{t("home.invitations.title")}</h2><p>{t("home.invitations.description")}</p></div><Link className="section-text-link" to="/invitations">{t("common.exploreInvitations")} <Icon name="arrow-up-right" size={18} /></Link></div>
        <InvitationGallery templates={["birthday-retro-pop", "birthday-painted-summer", "birthday-pink-glam"].map((slug) => invitationTemplates.find((template) => template.slug === slug))} />
      </section>
      <section className="home-interactive">
        <div className="home-section-intro"><span className="home-section-index">{t("home.interactive.index")}</span><h2>{t("home.interactive.title")}</h2><p>{t("home.interactive.description")}</p></div>
        <div className="interactive-list">{interactive.map((item) => <Link to={item.to} className="interactive-row" key={item.number}><span>{item.number}</span><div><h3>{item.id === "diary" ? t("home.possibility.diary.title") : t(`home.interactive.${item.id}.title`)}</h3><p>{t(`home.interactive.${item.id}.description`)}</p></div><Icon name="arrow-up-right" size={18} /></Link>)}</div>
      </section>
      <section className="home-final"><h2>{t("home.final.title")}</h2><p>{t("home.final.description")}</p><Link className="primary-link" to="/#projects">{t("common.exploreEvents")} <Icon name="arrow-up-right" size={18} /></Link></section>
    </div>
  );
}

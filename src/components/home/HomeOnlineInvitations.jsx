import { captionValue } from "../../localization/captionValues.js";
import { Link } from "react-router-dom";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import { getCustomThemes } from "../../invitations/data/customClassicalThemes.js";
import { WeddingThemePreview } from "../../invitations/components/WeddingThemeDecoration.jsx";
import InvitationArtwork from "../../invitations/components/InvitationArtwork.jsx";

const previews = ["somethingBlue", "pressedRose", "lilacWhisper"].map(id => getCustomThemes("wedding").find(theme => theme.id === id));

export default function HomeOnlineInvitations() {
  const { language } = useLanguage();
  const copy = { title: captionValue("ui.components.home.HomeOnlineInvitations.anInvitationThatFeelsLikeYou", language), description: captionValue("ui.components.home.HomeOnlineInvitations.chooseADesignAddYourDetailsAnd", language), action: captionValue("ui.components.home.HomeOnlineInvitations.chooseYourDesign", language), occasions: captionValue("ui.components.home.HomeOnlineInvitations.weddingChristening", language), invitation: captionValue("ui.components.home.HomeOnlineInvitations.invitation", language) };
  return <section className="home-online-invitations" aria-labelledby="home-online-title">
    <div className="home-online-copy">
      <h2 id="home-online-title">{copy.title}</h2>
      <p>{copy.description}</p>
      <Link className="home-online-action" to="/order-online">{copy.action}<InvitationArtwork name="arrow-right" size={22} /></Link>
      <span className="home-online-occasions">{copy.occasions}</span>
    </div>
    <div className="home-online-artwork">
      {previews.map(theme => <Link key={theme.id} className="home-online-card" to={`/order-online?theme=${theme.id}`} aria-label={`${copy.action}: ${theme.name[language] ?? theme.name.en}`}>
        <WeddingThemePreview theme={theme} label={copy.invitation} />
      </Link>)}
    </div>
  </section>;
}

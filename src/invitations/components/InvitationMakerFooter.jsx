import { captionValue } from "../../localization/captionValues.js";
import { Link } from 'react-router-dom';
import { useLanguage } from '../../localization/LanguageContext.jsx';
import '../../styles/invitation-maker-footer.css';

export default function InvitationMakerFooter({ palette = 'cherry', embedded = false }) {
  const { language } = useLanguage();
  const Tag = embedded ? 'div' : 'footer';
  return <Tag className={`invitation-maker-footer maker-${palette}`}>
    <span>{captionValue("invitations.components.InvitationMakerFooter.caption1", language)}</span>
    <Link to="/" aria-label={captionValue("invitations.components.InvitationMakerFooter.caption2", language)}>
      {palette === 'guest' ? <span className="maker-adaptive-logo" role="img" aria-label="11:11" /> : <img src={`/logos/logo-${palette}.svg`} alt="11:11" width="1330" height="1112" />}
    </Link>
  </Tag>;
}

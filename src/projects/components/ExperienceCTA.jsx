import Icon from "../../components/ui/Icon.jsx";
import { Link } from "react-router-dom";

export default function ExperienceCTA({ title, text, to, action, className = "" }) {
  return <section className={`experience-cta ${className}`}><span className="cta-star" aria-hidden="true">✦</span><h2>{title}</h2><p>{text}</p><Link className="primary-link" to={to}>{action} <Icon name="arrow-up-right" size={18} /></Link></section>;
}

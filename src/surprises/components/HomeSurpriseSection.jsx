import { Link } from "react-router-dom";
import SurprisePhonePreview from "./SurprisePhonePreview.jsx";

export default function HomeSurpriseSection() {
  return <section className="home-surprise" aria-labelledby="home-surprise-title"><div className="home-surprise-copy"><span className="home-section-index">03 / DIGITAL SURPRISE</span><h2 id="home-surprise-title">Can’t be there in person? <em>Make them something they’ll remember.</em></h2><p>Photos, memories, wishes, and interactive little moments. All made for one person to open, wherever they are.</p><Link className="primary-link" to="/surprises">Explore Digital Surprise <span aria-hidden="true">↗</span></Link><small>More than a message. A whole little world made for them.</small></div><div className="home-surprise-preview"><span className="home-surprise-orbit" aria-hidden="true">✦</span><SurprisePhonePreview /></div></section>;
}

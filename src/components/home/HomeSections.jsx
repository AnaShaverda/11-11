import { Link } from "react-router-dom";
import InvitationGallery from "../../invitations/components/InvitationGallery.jsx";
import { invitationTemplates } from "../../invitations/data/templates.js";
import HomeSurpriseSection from "../../surprises/components/HomeSurpriseSection.jsx";

const possibilities = [
  { symbol: "✉", title: "Digital invitations", detail: "Set the feeling before the day begins." },
  { symbol: "✳", title: "Birthday experiences", detail: "Celebrate their story, not just the date." },
  { symbol: "✧", title: "Wedding pages", detail: "A place for your people and your plans." },
  { symbol: "♡", title: "Friendship Diary module", detail: "Keep the stories your friends tell." },
  { symbol: "▧", title: "Guest memories", detail: "Collect words and moments worth saving." },
  { symbol: "?", title: "Games & quizzes", detail: "Bring everyone into the fun." },
];

const interactive = [
  { number: "01", title: "Friendship Diary module", description: "See a friendship through the eyes of the people in it.", to: "/modules/friendship-diary" },
  { number: "02", title: "Birthday Wishes", description: "Make a collection of kind words they can return to.", to: "/projects/birthday" },
  { number: "03", title: "Memories", description: "Turn little stories into something that lasts.", to: "/projects/birthday#optional-modules" },
];

export default function HomeSections() {
  return (
    <div className="home-more">
      <section className="home-possibilities">
        <div className="home-section-intro"><span className="home-section-index">02 / POSSIBILITIES</span><h2>What can you create?</h2><p>Start with an invitation. Add the stories, smiles, and people that make it yours.</p></div>
        <div className="possibility-list">{possibilities.map((item) => <div className="possibility-row" key={item.title}><span aria-hidden="true">{item.symbol}</span><div><strong>{item.title}</strong><small>{item.detail}</small></div></div>)}</div>
      </section>
      <HomeSurpriseSection />
      <section className="home-invitations">
        <div className="home-section-top"><div><span className="home-section-index">04 / INVITATIONS</span><h2>Make a first impression.</h2><p>Different designs for different kinds of magic.</p></div><Link className="section-text-link" to="/invitations">Explore invitations <span aria-hidden="true">↗</span></Link></div>
        <InvitationGallery templates={invitationTemplates.slice(0, 3)} />
      </section>
      <section className="home-interactive">
        <div className="home-section-intro"><span className="home-section-index">05 / THE GOOD STUFF</span><h2>Everyone becomes part of the story.</h2><p>11:11 goes beyond the invite with ideas that bring your people closer.</p></div>
        <div className="interactive-list">{interactive.map((item) => <Link to={item.to} className="interactive-row" key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><span aria-hidden="true">↗</span></Link>)}</div>
      </section>
      <section className="home-final"><span aria-hidden="true" className="home-final-star">✳</span><h2>Make your moment count.</h2><p>Whatever the reason, make it feel like yours.</p><Link className="primary-link" to="/projects">Explore experiences <span aria-hidden="true">↗</span></Link></section>
    </div>
  );
}

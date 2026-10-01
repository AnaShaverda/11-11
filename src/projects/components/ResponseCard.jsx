import Icon from "../../components/ui/Icon.jsx";

export default function ResponseCard({ response }) {
  return (
    <article className="response-card">
      <div className="response-author"><span className="response-avatar" aria-hidden="true">{response.initial}</span><strong>{response.name}</strong><span className="response-reaction" aria-hidden="true"><Icon name={response.reaction} size={20} /></span></div>
      <p>“{response.message}”</p>
    </article>
  );
}

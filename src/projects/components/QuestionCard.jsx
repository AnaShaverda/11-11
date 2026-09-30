export default function QuestionCard({ prompt }) {
  return <article className="question-card"><span>{prompt.number}</span><h3>{prompt.title}</h3><p>{prompt.hint}</p></article>;
}

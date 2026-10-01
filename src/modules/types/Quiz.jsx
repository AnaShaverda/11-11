import { useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export function isQuizReady(interaction) {
  const questions = interaction.config.questions;
  return questions.length > 0 && questions.every((question) => question.question.trim() && question.options.every((option) => option.trim()));
}

export function QuizEditor({ interaction, onChange }) {
  const { t } = useLanguage();
  const questions = interaction.config.questions;
  function changeQuestion(index, update) { onChange({ config: { questions: questions.map((question, i) => i === index ? { ...question, ...update } : question) } }); }
  return <><label>{t("interactions.prompt")}<textarea aria-label={t("interactions.prompt")} rows={2} maxLength={240} value={interaction.description} onChange={(event) => onChange({ description: event.target.value })} /></label>{questions.map((question, index) => <fieldset className="interaction-quiz-editor" key={question.id}><legend>{t("interactions.quiz.question", { number: index + 1 })}</legend><label>{t("interactions.questionPrompt")}<input maxLength={180} value={question.question} onChange={(event) => changeQuestion(index, { question: event.target.value })} /></label>{question.options.map((option, optionIndex) => <label key={optionIndex}>{t("interactions.quiz.option", { number: optionIndex + 1 })}<input maxLength={100} value={option} onChange={(event) => changeQuestion(index, { options: question.options.map((answer, i) => i === optionIndex ? event.target.value : answer) })} /></label>)}<label>{t("interactions.quiz.correctAnswer")}<select aria-label={t("interactions.quiz.correctAnswer")} value={question.correctAnswer} onChange={(event) => changeQuestion(index, { correctAnswer: Number(event.target.value) })}>{question.options.map((option, optionIndex) => <option value={optionIndex} key={optionIndex}>{option || t("interactions.quiz.option", { number: optionIndex + 1 })}</option>)}</select></label>{questions.length > 1 ? <button className="event-text-button" type="button" onClick={() => onChange({ config: { questions: questions.filter((_, i) => i !== index) } })}>{t("interactions.quiz.removeQuestion")}</button> : null}</fieldset>)}{questions.length < 3 ? <button className="event-secondary-button" type="button" onClick={() => onChange({ config: { questions: [...questions, { id: `q${questions.length + 1}`, question: "", options: ["", "", ""], correctAnswer: 0 }] } })}>{t("interactions.quiz.addQuestion")}</button> : null}{!isQuizReady(interaction) ? <p role="status">{t("interactions.invalidQuiz")}</p> : null}</>;
}

export default function Quiz({ interaction }) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const questions = interaction.config.questions;
  if (!isQuizReady(interaction)) return <p>{t("interactions.quiz.incomplete")}</p>;
  if (finished) return <div className="interaction-quiz-result"><span aria-hidden="true">✳</span><p role="status">{t("interactions.quiz.score", { score: answers.filter((answer, i) => answer === questions[i].correctAnswer).length, total: questions.length })}</p><button className="interaction-button" onClick={() => { setIndex(0); setAnswers([]); setFinished(false); }}>{t("interactions.quiz.restart")}</button></div>;
  const question = questions[index];
  const answered = answers[index] !== undefined;
  return <div className="interaction-quiz"><small>{t("interactions.quiz.progress", { number: index + 1, total: questions.length })}</small><h3>{question.question}</h3><div className="interaction-quiz-options">{question.options.map((option, optionIndex) => <button type="button" key={optionIndex} disabled={answered} className={answered && optionIndex === question.correctAnswer ? "is-correct" : answers[index] === optionIndex ? "is-chosen" : ""} onClick={() => setAnswers((current) => [...current, optionIndex])}><span>{String.fromCharCode(65 + optionIndex)}</span>{option}</button>)}</div>{answered ? <><p role="status">{t(answers[index] === question.correctAnswer ? "interactions.quiz.correct" : "interactions.quiz.incorrect", { answer: question.options[question.correctAnswer] })}</p><button className="interaction-button" onClick={() => index === questions.length - 1 ? setFinished(true) : setIndex(index + 1)}>{t(index === questions.length - 1 ? "interactions.quiz.finish" : "interactions.quiz.next")}</button></> : null}</div>;
}

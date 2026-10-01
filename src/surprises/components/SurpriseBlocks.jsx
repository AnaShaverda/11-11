import { useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";

export function PhotoTile({ photo, label, className = "" }) {
  return <div className={`surprise-photo surprise-photo-${photo} ${className}`} role="img" aria-label={label} />;
}

export function MainMessage({ surprise }) {
  const { t } = useLanguage();
  return <section className="surprise-section surprise-message-section" id="surprise-message" aria-labelledby="message-title"><span className="surprise-section-number">{t("surprise.message.label")}</span><div className="surprise-letter-card"><span aria-hidden="true">♡</span><h2 id="message-title">{t("surprise.message.title", { name: surprise.recipientName })}</h2><p>{surprise.content.personalMessage}</p><strong>{t("surprise.message.sign", { name: surprise.creatorName })}</strong></div></section>;
}

export function LoveNotes({ notes }) {
  const { t } = useLanguage();
  return <section className="surprise-section surprise-notes-section" aria-labelledby="notes-title"><div className="surprise-section-copy"><span className="surprise-section-number">{t("surprise.notes.label")}</span><h2 id="notes-title">{t("surprise.notes.title")}</h2></div><div className="surprise-note-stack">{notes.map((note, index) => <article className="surprise-note" key={note}><span aria-hidden="true">{index % 2 ? "✦" : "♡"}</span><p>{note}</p></article>)}</div></section>;
}

export function Memories({ memories }) {
  const { t } = useLanguage();
  return <section className="surprise-section surprise-memories-section" aria-labelledby="memories-title"><div className="surprise-section-copy"><span className="surprise-section-number">{t("surprise.memories.label")}</span><h2 id="memories-title">{t("surprise.memories.title")}</h2></div><div className="surprise-memory-layout">{memories.map((memory) => <article className="surprise-memory" key={memory.title}><PhotoTile photo={memory.photo} label={memory.title} /><div><small>{memory.date}</small><h3>{memory.title}</h3><p>{memory.story}</p></div></article>)}</div></section>;
}

export function SurpriseGallery({ photos }) {
  const { t } = useLanguage();
  return <section className="surprise-section surprise-gallery-section" aria-labelledby="gallery-title"><div className="surprise-section-copy"><span className="surprise-section-number">{t("surprise.gallery.label")}</span><h2 id="gallery-title">{t("surprise.gallery.title")}</h2><p>{t("surprise.gallery.description")}</p></div><div className="surprise-gallery-photos">{photos.map((photo) => <PhotoTile key={photo.photo} photo={photo.photo} label={photo.label} />)}</div></section>;
}

export function StoryTimeline({ moments }) {
  const { t } = useLanguage();
  return <section className="surprise-section surprise-timeline-section" aria-labelledby="timeline-title"><div className="surprise-section-copy"><span className="surprise-section-number">{t("surprise.timeline.label")}</span><h2 id="timeline-title">{t("surprise.timeline.title")}</h2></div><ol className="surprise-timeline">{moments.map((moment) => <li key={moment.year}><span>{moment.year}</span><div><h3>{moment.title}</h3><p>{moment.detail}</p></div></li>)}</ol></section>;
}

export function MiniQuiz({ quiz }) {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(null);
  return <section className="surprise-section surprise-quiz-section" aria-labelledby="quiz-title"><div className="surprise-section-copy"><span className="surprise-section-number">{t("surprise.quiz.label")}</span><h2 id="quiz-title">{t("surprise.quiz.title")}</h2><p>{quiz.question}</p></div><div className="surprise-quiz-options">{quiz.options.map((option, index) => <button key={option} type="button" className={selected === index ? "is-selected" : ""} aria-pressed={selected === index} onClick={() => setSelected(index)}>{option}</button>)}</div><p className="surprise-quiz-result" aria-live="polite">{selected === null ? t("surprise.quiz.choose") : selected === quiz.answerIndex ? t("surprise.quiz.correct") : t("surprise.quiz.wrong")}</p></section>;
}

export function Wishes({ wishes }) {
  const { t } = useLanguage();
  return <section className="surprise-section surprise-wishes-section" aria-labelledby="wishes-title"><div className="surprise-section-copy"><span className="surprise-section-number">{t("surprise.wishes.label")}</span><h2 id="wishes-title">{t("surprise.wishes.title")}</h2></div><div className="surprise-wishes-grid">{wishes.map((wish, index) => <article key={wish}><span aria-hidden="true">{["♡", "✦", "✿", "☀"][index % 4]}</span><p>{wish}</p></article>)}</div></section>;
}

export function MusicConcept() {
  const { t } = useLanguage();
  return <section className="surprise-section surprise-music-section" aria-labelledby="music-title"><div><span className="surprise-section-number">{t("surprise.music.label")}</span><h2 id="music-title">{t("surprise.music.title")}</h2><p>{t("surprise.music.description")}</p></div><span aria-hidden="true">♫</span></section>;
}

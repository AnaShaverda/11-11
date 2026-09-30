import { useState } from "react";

export function PhotoTile({ photo, label, className = "" }) {
  return <div className={`surprise-photo surprise-photo-${photo} ${className}`} role="img" aria-label={label} />;
}

export function MainMessage({ surprise }) {
  return <section className="surprise-section surprise-message-section" id="surprise-message" aria-labelledby="message-title"><span className="surprise-section-number">01 / FROM THE HEART</span><div className="surprise-letter-card"><span aria-hidden="true">♡</span><h2 id="message-title">Happy birthday, {surprise.recipientName}.</h2><p>{surprise.content.personalMessage}</p><strong>With all my love, {surprise.creatorName}</strong></div></section>;
}

export function LoveNotes({ notes }) {
  return <section className="surprise-section surprise-notes-section" aria-labelledby="notes-title"><div className="surprise-section-copy"><span className="surprise-section-number">03 / THE LITTLE THINGS</span><h2 id="notes-title">The little things I love about you.</h2></div><div className="surprise-note-stack">{notes.map((note, index) => <article className="surprise-note" key={note}><span aria-hidden="true">{index % 2 ? "✦" : "♡"}</span><p>{note}</p></article>)}</div></section>;
}

export function Memories({ memories }) {
  return <section className="surprise-section surprise-memories-section" aria-labelledby="memories-title"><div className="surprise-section-copy"><span className="surprise-section-number">04 / REMEMBER WHEN</span><h2 id="memories-title">The days I keep coming back to.</h2></div><div className="surprise-memory-layout">{memories.map((memory) => <article className="surprise-memory" key={memory.title}><PhotoTile photo={memory.photo} label={memory.title} /><div><small>{memory.date}</small><h3>{memory.title}</h3><p>{memory.story}</p></div></article>)}</div></section>;
}

export function SurpriseGallery({ photos }) {
  return <section className="surprise-section surprise-gallery-section" aria-labelledby="gallery-title"><div className="surprise-section-copy"><span className="surprise-section-number">05 / OUR CAMERA ROLL</span><h2 id="gallery-title">More moments together.</h2><p>Different places, same favorite person.</p></div><div className="surprise-gallery-photos">{photos.map((photo) => <PhotoTile key={photo.photo} photo={photo.photo} label={photo.label} />)}</div></section>;
}

export function StoryTimeline({ moments }) {
  return <section className="surprise-section surprise-timeline-section" aria-labelledby="timeline-title"><div className="surprise-section-copy"><span className="surprise-section-number">06 / OUR STORY</span><h2 id="timeline-title">Look how far we’ve come.</h2></div><ol className="surprise-timeline">{moments.map((moment) => <li key={moment.year}><span>{moment.year}</span><div><h3>{moment.title}</h3><p>{moment.detail}</p></div></li>)}</ol></section>;
}

export function MiniQuiz({ quiz }) {
  const [selected, setSelected] = useState(null);
  return <section className="surprise-section surprise-quiz-section" aria-labelledby="quiz-title"><div className="surprise-section-copy"><span className="surprise-section-number">07 / DO YOU REMEMBER?</span><h2 id="quiz-title">A little question for you.</h2><p>{quiz.question}</p></div><div className="surprise-quiz-options">{quiz.options.map((option, index) => <button key={option} type="button" className={selected === index ? "is-selected" : ""} aria-pressed={selected === index} onClick={() => setSelected(index)}>{option}</button>)}</div><p className="surprise-quiz-result" aria-live="polite">{selected === null ? "Choose an answer to reveal the memory." : selected === quiz.answerIndex ? "You remember! We still talk about that day. ✨" : "Not quite. The coast was where the adventure began. ♡"}</p></section>;
}

export function Wishes({ wishes }) {
  return <section className="surprise-section surprise-wishes-section" aria-labelledby="wishes-title"><div className="surprise-section-copy"><span className="surprise-section-number">08 / FOR THE YEAR AHEAD</span><h2 id="wishes-title">My wishes for you.</h2></div><div className="surprise-wishes-grid">{wishes.map((wish, index) => <article key={wish}><span aria-hidden="true">{["♡", "✦", "✿", "☀"][index % 4]}</span><p>{wish}</p></article>)}</div></section>;
}

export function MusicConcept() {
  return <section className="surprise-section surprise-music-section" aria-labelledby="music-title"><div><span className="surprise-section-number">OPTIONAL / OUR SONG</span><h2 id="music-title">A song for this little world.</h2><p>Music can be part of your surprise. This example has no audio attached.</p></div><span aria-hidden="true">♫</span></section>;
}

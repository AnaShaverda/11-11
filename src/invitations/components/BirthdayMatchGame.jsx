import {
  captionValue,
  createCaptionCopy,
} from "../../localization/captionValues.js";
import { useEffect, useRef, useState } from "react";
import FullscreenChapter from "./FullscreenChapter.jsx";
import InvitationArtwork from "./InvitationArtwork.jsx";

const items = ["cake", "slice", "cherries", "present", "bow", "cupcake"];
const names = createCaptionCopy([
  "invitations.components.BirthdayMatchGame.copy1.0",
  "invitations.components.BirthdayMatchGame.copy1.1",
  "invitations.components.BirthdayMatchGame.copy1.2",
  "invitations.components.BirthdayMatchGame.copy1.3",
  "invitations.components.BirthdayMatchGame.copy1.4",
  "invitations.components.BirthdayMatchGame.copy1.5",
]);
function newDeck() {
  const deck = items.flatMap((type) =>
    [0, 1].map((copy) => ({ id: `${type}-${copy}`, type }))
  );
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
export default function BirthdayMatchGame({ language, motion, onComplete }) {
  const ka = language === "ka";
  const [deck, setDeck] = useState(newDeck);
  const [revealed, setRevealed] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [notice, setNotice] = useState("ready");
  const pending = useRef(null);
  const locked = useRef(false);
  const first = useRef(null);
  useEffect(() => () => clearTimeout(pending.current), []);
  function pick(card) {
    if (
      locked.current ||
      matched.includes(card.type) ||
      revealed.includes(card.id)
    )
      return;
    if (!first.current) {
      first.current = card;
      setRevealed([card.id]);
      setNotice("pick");
      return;
    }
    const previous = first.current;
    first.current = null;
    setMoves((value) => value + 1);
    setRevealed([previous.id, card.id]);
    if (previous.type === card.type) {
      const next = [...matched, card.type];
      setMatched(next);
      setRevealed([]);
      setNotice(next.length === items.length ? "complete" : "match");
      if (next.length === items.length) onComplete?.();
    } else {
      locked.current = true;
      setNotice("miss");
      pending.current = setTimeout(
        () => {
          setRevealed([]);
          locked.current = false;
          setNotice("ready");
        },
        motion ? 1100 : 900
      );
    }
  }
  function reset() {
    clearTimeout(pending.current);
    locked.current = false;
    first.current = null;
    setDeck(newDeck());
    setRevealed([]);
    setMatched([]);
    setMoves(0);
    setNotice("ready");
  }
  const status = {
    ready: captionValue(
      "ui.invitations.components.BirthdayMatchGame.turnTwoCardsFindAMatchingPair",
      language
    ),
    pick: captionValue(
      "ui.invitations.components.BirthdayMatchGame.nowFindItsMatchingPartner",
      language
    ),
    match: captionValue(
      "ui.invitations.components.BirthdayMatchGame.aSweetLittleMatch",
      language
    ),
    miss: captionValue(
      "ui.invitations.components.BirthdayMatchGame.notQuiteRememberTheseTwo",
      language
    ),
    complete: captionValue(
      "ui.invitations.components.BirthdayMatchGame.allSixPairsASweetLittleVictory",
      language
    ),
  };
  return (
    <FullscreenChapter
      id="playground-game"
      className="playground-game-screen"
      contentClassName="playground-game-layout"
      aria-labelledby="playground-game-title">
      <div className="playground-game-copy">
        <h2 id="playground-game-title">
          {captionValue(
            "ui.invitations.components.BirthdayMatchGame.aLittlePieceOfCake",
            language
          )}
        </h2>
        <img
          className="playground-game-divider"
          src="/images/birthday/playground/match-bow.webp"
          alt=""
        />
        <p>
          {captionValue(
            "ui.invitations.components.BirthdayMatchGame.findTheMatchingPairsSixSweetLittle",
            language
          )}
        </p>
        <dl className="playground-game-score">
          <div>
            <dt>
              {captionValue(
                "ui.invitations.components.BirthdayMatchGame.moves",
                language
              )}
            </dt>
            <dd>{moves}</dd>
          </div>
          <div>
            <dt>
              {captionValue(
                "ui.invitations.components.BirthdayMatchGame.pairs",
                language
              )}
            </dt>
            <dd>
              {matched.length}
              <small> / 6</small>
            </dd>
          </div>
        </dl>
        <button className="playground-game-reset" onClick={reset}>
          {captionValue(
            "ui.invitations.components.BirthdayMatchGame.shufflePlayAgain",
            language
          )}
        </button>
      </div>
      <div className="playground-game-table">
        <div
          className="playground-match-grid"
          aria-label={captionValue(
            "ui.invitations.components.BirthdayMatchGame.birthdayMatchingPairs",
            language
          )}>
          {deck.map((card, index) => {
            const found = matched.includes(card.type);
            const faceUp = found || revealed.includes(card.id);
            const name = names[ka ? "ka" : "en"][items.indexOf(card.type)];
            return (
              <button
                key={card.id}
                className={`playground-match-card ${
                  faceUp ? "is-revealed" : ""
                } ${found ? "is-matched" : ""}`}
                aria-label={
                  faceUp
                    ? `${index + 1}. ${name}${
                        found
                          ? captionValue(
                              "ui.invitations.components.BirthdayMatchGame.matched",
                              language
                            )
                          : ""
                      }`
                    : `${captionValue(
                        "ui.invitations.components.BirthdayMatchGame.revealCard",
                        language
                      )} ${index + 1}`
                }
                aria-disabled={found}
                aria-pressed={faceUp}
                onClick={() => pick(card)}>
                <span className="playground-match-inner">
                  <span className="playground-match-back" aria-hidden="true">
                    <img
                      src="/images/birthday/playground/match-bow.webp"
                      alt=""
                    />
                  </span>
                  <span className="playground-match-front" aria-hidden="true">
                    <img
                      src={`/images/birthday/playground/match-${card.type}.webp`}
                      alt=""
                      draggable="false"
                    />
                    {found && (
                      <span className="playground-match-seal">
                        <InvitationArtwork name="check" size={16} />
                      </span>
                    )}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <p
          className={`playground-game-status ${
            notice === "complete" ? "is-complete" : ""
          }`}
          role="status"
          aria-live="polite">
          {status[notice]}
        </p>
      </div>
    </FullscreenChapter>
  );
}

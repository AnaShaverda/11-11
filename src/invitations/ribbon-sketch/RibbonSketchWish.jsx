const imgSatinRibbonBow = "/images/birthday/ribbon-sketch/figma/17e8daca4eb47f8e.png";
const imgCheck = "/images/birthday/ribbon-sketch/figma/94a7fd68d9832e94.svg";
const imgHandwrittenNoteRuling = "/images/birthday/ribbon-sketch/figma/9eda104e95f16c2b.svg";
const imgPencil = "/images/birthday/ribbon-sketch/figma/c65528479597b0c6.svg";
export default function RibbonSketchWish({
  actions,
  state
}) {
  return <div data-node-id="7:40592" data-name="Wish submitted · Handwritten keepsake" className="rs-layer-618 rs-reference rs-reference-wish">
      <div className="rs-layer-6" data-node-id="7:40593" data-name="Wish sent indicator">
        <div className="rs-layer-231" data-node-id="7:40792" data-name="check">
          <img alt="" className="rs-layer-3" src={imgCheck} draggable={false} decoding="async" loading="eager" />
        </div>
        <p className="rs-layer-12" data-node-id="7:40595" data-name="Editorial label">
          YOUR LITTLE LOVE NOTE IS SENT
        </p>
      </div>
      <h2 className="rs-layer-619" data-node-id="7:40596" data-name="Wish confirmation title">
        a wish worth keeping.
      </h2>
      <div className="rs-layer-620" data-node-id="7:40597" data-name="Submitted note and ribbon">
        <div className="rs-layer-621" data-node-id="7:40609" data-name="Ribbon holding the wish">
          <div className="rs-layer-622" data-node-id="7:40610" data-name="Satin ribbon bow">
            <img alt="" className="rs-layer-19" src={imgSatinRibbonBow} draggable={false} decoding="async" loading="eager" />
          </div>
        </div>
        <div className="rs-layer-623" data-node-id="7:40598">
          <div className="rs-layer-567">
            <div className="rs-layer-624" data-name="Personal wish keepsake">
              <div className="rs-layer-455" data-node-id="7:40599" data-name="Ribbon held handwritten wish">
                <div className="rs-layer-456" data-node-id="7:40600" data-name="Handwritten note ruling">
                  <img alt="" className="rs-layer-3" src={imgHandwrittenNoteRuling} draggable={false} decoding="async" loading="eager" />
                </div>
                <div className="rs-layer-253" data-node-id="7:40602" data-name="Wish heading and edit">
                  <p className="rs-layer-254" data-node-id="7:40603" data-name="Wish greeting">
                    Dear Mia,
                  </p>
                  <button className="rs-layer-255" data-node-id="7:40604" data-name="Edit wish affordance" type="button" onClick={actions.editWish} aria-label="Edit wish">
                    <div className="rs-layer-256" data-node-id="7:40795" data-name="pencil">
                      <img alt="" className="rs-layer-3" src={imgPencil} draggable={false} decoding="async" loading="eager" />
                    </div>
                    <p className="rs-layer-8" data-node-id="7:40606" data-name="Edit wish label">
                      Edit
                    </p>
                  </button>
                </div>
                <div className="rs-layer-257" data-node-id="7:40607" data-name="Handwritten birthday message">{state.wish?.message ?? "Here’s to more late nights, big dreams & little moments. Happy birthday, beautiful!"}</div>
                <p className="rs-layer-258" data-node-id="7:40608" data-name="Wish signature">{state.wish ? "with love, " + state.wish.name + " ♡" : "with love, Ana ♡"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rs-layer-625" data-node-id="7:40611" data-name="Edit instruction">
        <p className="rs-layer-626">Your words are safe here.</p>
        <p className="rs-layer-627">Use Edit on your note to make it yours again.</p>
      </div>
      <button className="rs-layer-628" data-node-id="7:40612" data-name="Guest action" type="button" onClick={actions.close}>
        <p className="rs-layer-198" data-node-id="7:40613" data-name="Action label">
          Back to the party
        </p>
      </button>
    </div>;
}

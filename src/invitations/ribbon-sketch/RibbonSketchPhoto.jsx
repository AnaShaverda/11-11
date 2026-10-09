import { celebrationArtwork } from "./celebrationArtwork.js";
const imgInstantPhotograph = celebrationArtwork[0].src;
const imgX = "/images/birthday/ribbon-sketch/figma/b97805ef06466a56.svg";
const imgArrowLeft = "/images/birthday/ribbon-sketch/figma/fd6c1c60840bec42.svg";
const imgArrowRight = "/images/birthday/ribbon-sketch/figma/22d5ab45fa5494a9.svg";
export default function RibbonSketchPhoto({
  actions,
  state
}) {
  return <div data-node-id="7:40535" data-name="Selected Polaroid · Enlarged" className="rs-layer-574 rs-reference rs-reference-photo">
      <div className="rs-layer-253" data-node-id="7:40536" data-name="Photo overlay header">
        <p className="rs-layer-575" data-node-id="7:40537" data-name="Editorial label">{"A LITTLE MOMENT / " + String(state.viewerIndex + 1).padStart(2, "0") + " OF " + String(state.totalPhotos).padStart(2, "0")}</p>
        <button className="rs-layer-576" data-node-id="7:40765" data-name="x" type="button" onClick={actions.close} aria-label="Close photo">
          <img alt="" className="rs-layer-3" src={imgX} draggable={false} decoding="async" loading="eager" />
        </button>
      </div>
      <div className="rs-layer-577" data-node-id="7:40539" data-name="Enlarged instant photograph">
        <div className="rs-layer-578" data-node-id="7:40540">
          <div className="rs-layer-16">
            <button data-name="Captured Polaroid" type="button" onClick={() => actions.photo(imgInstantPhotograph)} aria-label="View photo" className="rs-layer-579 rs-polaroid">
              <p className="rs-layer-580" data-node-id="7:40542" data-name="Photo inscription">{state.viewerCaption}</p>
              <div className="rs-layer-581" data-node-id="7:40541" data-name="Instant photograph">
                <img alt="" className="rs-layer-19" src={state.viewerPhoto} draggable={false} decoding="async" loading="eager" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="rs-layer-253" data-node-id="7:40543" data-name="Selected photo navigation">
        <button className="rs-layer-576" data-node-id="7:40768" data-name="arrow-left" type="button" onClick={actions.viewerPrevious} aria-label="Previous photo">
          <img alt="" className="rs-layer-3" src={imgArrowLeft} draggable={false} decoding="async" loading="eager" />
        </button>
        <p className="rs-layer-582" data-node-id="7:40545" data-name="Photo date">
          23 MAY 2027 · MIA’S DIARY
        </p>
        <button className="rs-layer-576" data-node-id="7:40771" data-name="arrow-right" type="button" onClick={actions.viewerNext} aria-label="Next photo">
          <img alt="" className="rs-layer-3" src={imgArrowRight} draggable={false} decoding="async" loading="eager" />
        </button>
      </div>
      <p className="rs-layer-583" data-node-id="7:40547" data-name="Photo keepsake note">
        a memory worth keeping.
      </p>
    </div>;
}

const imgOpenPhysicalPinkEnvelope = "/images/birthday/ribbon-sketch/figma/94b2776dc9145f06.png";
const imgDottedStationery = "/images/birthday/ribbon-sketch/figma/f82adf30f307cbc1.svg";
const imgPause = "/images/birthday/ribbon-sketch/figma/4ce518b56c835a57.svg";
const imgArrowDown = "/images/birthday/ribbon-sketch/figma/3c7822572993507a.svg";
export default function RibbonSketchOpen({
  actions,
  state
}) {
  return <div data-node-id="7:40515" data-name="Open envelope · Card emerging" className="rs-layer-561 rs-reference rs-reference-open">
      <div className="rs-layer-562" data-node-id="7:40516" data-name="Dotted stationery">
        <img alt="" className="rs-layer-3" src={imgDottedStationery} draggable={false} decoding="async" loading="eager" />
      </div>
      <div className="rs-layer-290" data-node-id="7:40518" data-name="Invitation signature and motion">
        <p className="rs-layer-5" data-node-id="7:40519" data-name="11:11 signature">
          11:11
        </p>
        <button data-node-id="7:40520" data-name="Motion control" type="button" onClick={actions.motion} aria-pressed={state.motion} aria-label="Toggle motion" className="rs-layer-6 rs-motion-control">
          <div className="rs-layer-7" data-node-id="7:40759" data-name="pause">
            <img alt="" className="rs-layer-3" src={imgPause} draggable={false} decoding="async" loading="eager" />
          </div>
          <p className="rs-layer-8" data-node-id="7:40522" data-name="Motion label">{state.motion ? "MOTION ON" : "MOTION OFF"}</p>
        </button>
      </div>
      <div className="rs-layer-563" data-node-id="7:40523" data-name="Opened invitation composition">
        <div className="rs-layer-564" data-node-id="7:40530" data-name="Read invitation action">
          <button className="rs-layer-565" data-node-id="7:40531" data-name="Guest action" type="button" onClick={actions.read}>
            <div className="rs-layer-138" data-node-id="7:40762" data-name="arrow-down">
              <img alt="" className="rs-layer-3" src={imgArrowDown} draggable={false} decoding="async" loading="eager" />
            </div>
            <p className="rs-layer-139" data-node-id="7:40533" data-name="Action label">
              Read your invitation
            </p>
          </button>
        </div>
        <div className="rs-layer-566" data-node-id="7:40525">
          <div className="rs-layer-567">
            <div className="rs-layer-568" data-name="Emerging invitation card">
              <p className="rs-layer-569" data-node-id="7:40526" data-name="Personal greeting">
                for you
              </p>
              <p className="rs-layer-570" data-node-id="7:40527" data-name="Invitation name">
                MIA’S
              </p>
              <p className="rs-layer-571" data-node-id="7:40528" data-name="Birthday invitation line">
                birthday girl era
              </p>
              <p className="rs-layer-572" data-node-id="7:40529" data-name="Party date">
                23 MAY 2027 · TBILISI
              </p>
            </div>
          </div>
        </div>
        <div className="rs-layer-573" data-node-id="7:40524" data-name="Open physical pink envelope">
          <img alt="" className="rs-layer-19" src={imgOpenPhysicalPinkEnvelope} draggable={false} decoding="async" loading="eager" />
        </div>
      </div>
    </div>;
}

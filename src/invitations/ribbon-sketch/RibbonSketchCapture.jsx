import { celebrationArtwork } from "./celebrationArtwork.js";
const imgRealisticCameraBody = "/images/birthday/ribbon-sketch/figma/57be54eb7240777e.png";
const imgLcdBirthdayPhotograph = celebrationArtwork[0].src;
const imgInstantPhotograph = celebrationArtwork[0].src;
const imgZap = "/images/birthday/ribbon-sketch/figma/b8ce1d201ac44d67.svg";
const imgBatteryFull = "/images/birthday/ribbon-sketch/figma/8535f7da6ac65aef.svg";
const imgEditableShutterButton = "/images/birthday/ribbon-sketch/figma/578e10b31db658e0.svg";
const imgEditableControlWheel = "/images/birthday/ribbon-sketch/figma/c64c603d08f6e06d.svg";
const imgSetControl = "/images/birthday/ribbon-sketch/figma/d16207df9da6f367.svg";
const imgCheck = "/images/birthday/ribbon-sketch/figma/5491ed62a9fb026f.svg";
const imgCamera = "/images/birthday/ribbon-sketch/figma/fc15fcf1bfaae8a1.svg";
export default function RibbonSketchCapture({
  actions,
  state
}) {
  return <div data-node-id="7:40549" data-name="Camera capture · New memory" className="rs-layer-584 rs-reference rs-reference-capture">
      <p className="rs-layer-12" data-node-id="7:40550" data-name="Editorial label">
        07 LITTLE MEMORIES COLLECTED
      </p>
      <p className="rs-layer-585" data-node-id="7:40551" data-name="Capture success title">
        a new little memory
      </p>
      <div className="rs-layer-586" data-node-id="7:40552" data-name="Champagne digital camera">
        <div className="rs-layer-587" data-node-id="7:40565" data-name="Realistic camera body">
          <img alt="" className="rs-layer-19" src={imgRealisticCameraBody} draggable={false} decoding="async" loading="eager" />
        </div>
        <div className="rs-layer-588" data-node-id="7:40558" data-name="Editable LCD bezel">
          <div className="rs-layer-589" data-node-id="7:40564" data-name="LCD birthday photograph">
            <img alt="" className="rs-layer-19" src={state.cameraPhoto ?? imgLcdBirthdayPhotograph} draggable={false} decoding="async" loading="eager" />
          </div>
          <p className="rs-layer-590" data-node-id="7:40563" data-name="Capture count">{String(state.captures).padStart(2, "0") + "/24"}</p>
          <p className="rs-layer-591" data-node-id="7:40562" data-name="Capture date">
            23/05/27
          </p>
          <div className="rs-layer-592" data-node-id="7:40777" data-name="zap">
            <img alt="" className="rs-layer-3" src={imgZap} draggable={false} decoding="async" loading="eager" />
          </div>
          <div className="rs-layer-593" data-node-id="7:40774" data-name="battery-full">
            <img alt="" className="rs-layer-3" src={imgBatteryFull} draggable={false} decoding="async" loading="eager" />
          </div>
          <p className="rs-layer-594" data-node-id="7:40559" data-name="Image file number">
            IMG_0007
          </p>
        </div>
        <button className="rs-layer-595" data-node-id="7:40557" data-name="Editable shutter button" type="button" onClick={actions.capture} aria-label="Take a photo">
          <img alt="" className="rs-layer-3" src={imgEditableShutterButton} draggable={false} decoding="async" loading="eager" />
        </button>
        <button className="rs-layer-596" data-node-id="7:40556" data-name="Editable control wheel" type="button" onClick={actions.next} aria-label="Next memory">
          <img alt="" className="rs-layer-3" src={imgEditableControlWheel} draggable={false} decoding="async" loading="eager" />
        </button>
        <div className="rs-layer-597" data-node-id="7:40555" data-name="Set control">
          <img alt="" className="rs-layer-3" src={imgSetControl} draggable={false} decoding="async" loading="eager" />
        </div>
        <p className="rs-layer-598" data-node-id="7:40554" data-name="Display control label">{`DISP.   MENU`}</p>
        <p className="rs-layer-599" data-node-id="7:40553" data-name="Set label">
          SET
        </p>
      </div>
      <div className="rs-layer-600" data-node-id="7:40566" data-name="Newly captured photograph">
        <div className="rs-layer-601" data-node-id="7:40571" data-name="Saved memory indicator">
          <div className="rs-layer-7" data-node-id="7:40780" data-name="check">
            <img alt="" className="rs-layer-3" src={imgCheck} draggable={false} decoding="async" loading="eager" />
          </div>
          <p className="rs-layer-602" data-node-id="7:40573" data-name="Saved memory status">
            Added to your collection
          </p>
        </div>
        <div className="rs-layer-603" data-node-id="7:40570" data-name="New photo annotation">
          <div className="rs-layer-84">
            <div className="rs-layer-604">
              <p className="rs-layer-81">fresh off</p>
              <p className="rs-layer-82">the camera!</p>
            </div>
          </div>
        </div>
        <div className="rs-layer-605" data-node-id="7:40567">
          <div className="rs-layer-249">
            <button data-name="Captured Polaroid" type="button" onClick={() => actions.photo(imgInstantPhotograph)} aria-label="View photo" className="rs-layer-606 rs-polaroid">
              <p className="rs-layer-607" data-node-id="7:40569" data-name="Photo inscription">
                cheers to us ♡
              </p>
              <div className="rs-layer-608" data-node-id="7:40568" data-name="Instant photograph">
                <img alt="" className="rs-layer-19" src={state.cameraPhoto ?? imgLcdBirthdayPhotograph} draggable={false} decoding="async" loading="eager" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <button className="rs-layer-609" data-node-id="7:40574" data-name="Guest action" type="button" onClick={actions.capture}>
        <div className="rs-layer-138" data-node-id="7:40783" data-name="camera">
          <img alt="" className="rs-layer-3" src={imgCamera} draggable={false} decoding="async" loading="eager" />
        </div>
        <p className="rs-layer-139" data-node-id="7:40576" data-name="Action label">
          Take another photo
        </p>
      </button>
    </div>;
}

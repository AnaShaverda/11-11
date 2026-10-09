const imgSatinRibbonBow = "/images/birthday/ribbon-sketch/figma/5cae11955cfcda22.png";
const imgCircleCheck = "/images/birthday/ribbon-sketch/figma/8bf61f61698733e5.svg";
const imgCalendarPlus = "/images/birthday/ribbon-sketch/figma/1c24fe12c6f5361c.svg";
export default function RibbonSketchRsvp({
  actions,
  state
}) {
  return <div data-node-id="7:40578" data-name="RSVP confirmation · You’re on the list" className="rs-layer-610 rs-reference rs-reference-rsvp">
      <p className="rs-layer-12" data-node-id="7:40579" data-name="Editorial label">
        YOUR RESPONSE IS SEALED WITH LOVE
      </p>
      <div className="rs-layer-611" data-node-id="7:40580" data-name="Confirmation ribbon">
        <div className="rs-layer-612" data-node-id="7:40581" data-name="Satin ribbon bow">
          <img alt="" className="rs-layer-19" src={imgSatinRibbonBow} draggable={false} decoding="async" loading="eager" />
        </div>
      </div>
      <div className="rs-layer-613" data-node-id="7:40582" data-name="RSVP confirmation card">
        <div className="rs-layer-614" data-node-id="7:40786" data-name="circle-check">
          <img alt="" className="rs-layer-3" src={imgCircleCheck} draggable={false} decoding="async" loading="eager" />
        </div>
        <h2 data-node-id="7:40584" data-name="Confirmation headline" className="rs-layer-615 rs-confirmation-headline">{(state.rsvp?.attending ? "you’re on the list, " : "we’ll miss you, ") + (state.rsvp?.name ?? "") + "!"}</h2>
        <div data-node-id="7:40585" data-name="Confirmation message" className="rs-layer-616 rs-confirmation-message">{state.rsvp?.attending ? "I’ll be there! · 23 MAY 2027 · 17:00 · TBILISI" : "Sending love from afar. You can change your response below."}</div>
        <p className="rs-layer-617" data-node-id="7:40586" data-name="Host response">{state.rsvp?.attending ? "the cake is waiting for you ♡" : "we’ll save a little love for you ♡"}</p>
      </div>
      <button className="rs-layer-609" data-node-id="7:40587" data-name="Guest action" type="button" onClick={actions.calendar}>
        <div className="rs-layer-138" data-node-id="7:40789" data-name="calendar-plus">
          <img alt="" className="rs-layer-3" src={imgCalendarPlus} draggable={false} decoding="async" loading="eager" />
        </div>
        <p className="rs-layer-139" data-node-id="7:40589" data-name="Action label">
          Add to calendar
        </p>
      </button>
      <button className="rs-layer-124" data-node-id="7:40590" data-name="Change RSVP affordance" type="button" onClick={actions.editRsvp}>
        Change my response
      </button>
    </div>;
}

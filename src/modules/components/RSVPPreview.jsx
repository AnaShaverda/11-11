import { useState } from "react";
import { useLanguage } from "../../localization/LanguageContext.jsx";

// Guest entitlement is separate from event and invitation design data.
export default function RSVPPreview({ guest }) {
  const { t } = useLanguage();
  const [attendance, setAttendance] = useState("going");
  const [plusOne, setPlusOne] = useState(false);
  const [reply, setReply] = useState(null);

  function submit(event) {
    event.preventDefault();
    setReply({ attendance, seats: attendance === "going" ? 1 + Number(guest.allowPlusOne && plusOne) : 0 });
  }

  return <div className="rsvp-preview">
    {reply ? <div role="status"><p>{t(`product.rsvp.${reply.attendance}.confirmation`, { count: reply.seats })}</p><button className="theme-world-button" type="button" onClick={() => setReply(null)}>{t("product.rsvp.edit")}</button></div> : <form onSubmit={submit}>
      <fieldset><legend>{t("product.rsvp.question")}</legend>{["going", "declined"].map((value) => <label key={value}><input type="radio" name="attendance" value={value} checked={attendance === value} onChange={() => setAttendance(value)} />{t(`product.rsvp.${value}`)}</label>)}</fieldset>
      {guest.allowPlusOne && attendance === "going" ? <label className="rsvp-plus-one"><input type="checkbox" checked={plusOne} onChange={(event) => setPlusOne(event.target.checked)} />{t("product.rsvp.plusOne")}</label> : null}
      <button className="theme-world-button" type="submit">{t("product.rsvp.submit")}</button>
    </form>}
    <small>{t("product.rsvp.demo")}</small>
  </div>;
}

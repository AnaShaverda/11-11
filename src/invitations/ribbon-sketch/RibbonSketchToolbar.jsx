
import { Link } from "react-router-dom";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import InvitationArtwork from "../components/InvitationArtwork.jsx";
export default function RibbonSketchToolbar({motion,onMotion}){
 const {language,setLanguage}=useLanguage(),ka=language==="ka";
 return <header className="rsb-toolbar"><Link to="/invitations" aria-label={ka?"მოსაწვევების კოლექცია":"Back to invitations"}><InvitationArtwork name="arrow-left" size={20}/><span>11:11</span></Link><div><button type="button" onClick={()=>setLanguage(ka?"en":"ka")} aria-label={ka?"Switch to English":"ქართულად"}>{ka?"EN":"KA"}</button><button type="button" className="rsb-motion-control" aria-pressed={motion} onClick={onMotion}>{ka?"მოძრაობა":"Motion"}<span aria-hidden="true" className="rsb-motion-switch"/></button></div></header>;
}

import Icon from "../../components/ui/Icon.jsx";
import InteractiveCake from "./InteractiveCake.jsx";
import GiftReveal from "./GiftReveal.jsx";
import LetterReveal from "./LetterReveal.jsx";
import { MainMessage, LoveNotes, Memories, SurpriseGallery, StoryTimeline, MiniQuiz, Wishes, MusicConcept } from "./SurpriseBlocks.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

const moduleRenderers = {
  "main-message": ({ surprise }) => <MainMessage surprise={surprise} />,
  cake: () => <InteractiveCake />,
  "love-notes": ({ surprise }) => <LoveNotes notes={surprise.content.loveNotes} />,
  memories: ({ surprise }) => <Memories memories={surprise.content.memories} />,
  gallery: ({ surprise }) => <SurpriseGallery photos={surprise.content.gallery} />,
  timeline: ({ surprise }) => <StoryTimeline moments={surprise.content.timeline} />,
  quiz: ({ surprise }) => <MiniQuiz quiz={surprise.content.quiz} />,
  wishes: ({ surprise }) => <Wishes wishes={surprise.content.wishes} />,
  gift: ({ surprise }) => <GiftReveal message={surprise.content.giftMessage} />,
  letter: ({ surprise }) => <LetterReveal letter={surprise.content.finalLetter} creatorName={surprise.creatorName} />,
  music: () => <MusicConcept />,
};

export default function SurpriseExperience({ surprise, theme, enabledModules = surprise.enabledModules }) {
  const { t } = useLanguage();
  return <article className={`theme-canvas theme-${theme.visual} surprise-experience`}><section className="surprise-cover">{theme.decor && <div className="surprise-cover-orbit" aria-hidden="true">{theme.decor}</div>}<span>{t("surprise.cover.fromTo", { from: surprise.creatorName, to: surprise.recipientName })}</span><h1>{surprise.title}</h1><p>{surprise.mainMessage}</p><a className="surprise-solid-button" href="#surprise-message">{t("surprise.cover.begin")} <Icon name="arrow-down-right" size={18} /></a><div className="surprise-cover-bottom"><span>11:11 </span><span>{t("surprise.cover.bottom")}</span></div></section><div className="surprise-content">{enabledModules.map((id) => { const render = moduleRenderers[id]; return render ? <div key={id}>{render({ surprise })}</div> : null; })}</div></article>;
}

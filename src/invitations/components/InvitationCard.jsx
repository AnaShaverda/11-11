import PopDiscoPoster from "./PopDiscoPoster.jsx";
import CheckerboardCheersPoster from "./CheckerboardCheersPoster.jsx";
import BirthdayPlaygroundPoster from "./BirthdayPlaygroundPoster.jsx";
import RibbonSketchCardArt from "./RibbonSketchCardArt.jsx";
import { useRef } from "react";
import useInvitationTextLayout from "../hooks/useInvitationTextLayout.js";
import SelectedBridalPoster from "./SelectedBridalPoster.jsx";
import CocktailBirthdayPoster from "./CocktailBirthdayPoster.jsx";
import ComicBirthdayPoster from "./ComicBirthdayPoster.jsx";
import PoolBirthdayPoster from "./PoolBirthdayPoster.jsx";
import PizzaBirthdayPoster from "./PizzaBirthdayPoster.jsx";
import LineBirthdayPoster from "./LineBirthdayPoster.jsx";
import ChristeningCardPoster from "./ChristeningCardPoster.jsx";
import RetroBridalPoster from "./RetroBridalPoster.jsx";
import { getCategoryCaptionKey } from "../../data/projects.js";
import BridalLinePoster from "./BridalLinePoster.jsx";
import GenderRevealPoster from "./GenderRevealPoster.jsx";
import { Link } from "react-router-dom";
import { getInvitationSample } from "../../localization/cardCopy.js";
import BirthdayIllustrations from "./BirthdayIllustrations.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";
import ReferenceSocialPoster from "./ReferenceSocialPoster.jsx";
import WeddingDayPoster from "./WeddingDayPoster.jsx";
import WeddingHeartPoster from "./WeddingHeartPoster.jsx";
import WeddingInkPoster from "./WeddingInkPoster.jsx";
import FullImageInvitationPoster from "./FullImageInvitationPoster.jsx";
import { recipientArtwork } from "../data/recipientArtwork.js";
import { recipientLayeredScenes } from "../data/recipientLayeredScenes.js";
import { recipientTableArtwork } from "../data/recipientTableArtwork.js";
import {
  separatedThemeAssets,
  getSeparatedComponents,
  getSeparatedBackground,
} from "../data/separatedThemeAssets.js";
import {
  formatCardOpening,
  getCardTypography,
} from "../data/cardTypography.js";

function RetroPoster({ sample, invitedLabel }) {
  return (
    <div className="retro-poster">
      <span className="retro-poster-kicker">{invitedLabel}</span>
      <strong className="retro-poster-title">
        <span>{sample.posterName}</span>
        <span>{sample.posterOccasion}</span>
      </strong>
      <span className="retro-poster-sun" />
      <span className="retro-poster-burst" />
      <span className="retro-poster-age">{sample.posterAge}</span>
      <span className="retro-poster-stripes" />
      <span className="retro-poster-details">
        <span>
          {sample.date} ·{" "}
          <span className="card-text-value">{sample.location}</span>
        </span>
        <span>{sample.line}</span>
      </span>
    </div>
  );
}

export function InvitationArtwork({
  template,
  large = false,
  presentation = "square",
  sample: sampleOverride,
  className = "",
  ariaLabel,
}) {
  const { t, language } = useLanguage();
  const sample = sampleOverride ?? getInvitationSample(template.slug, t);
  const typography = getCardTypography(template);
  const invitedLabel = formatCardOpening(
    t("invitations.invited"),
    language,
    typography.opening,
  );
  const artworkRoot = useRef(null);
  const defaults = getInvitationSample(template.slug, t);
  useInvitationTextLayout(
    artworkRoot,
    JSON.stringify([sample, language]),
    Object.entries(sample)
      .filter(
        ([key, value]) =>
          value !== defaults[key] &&
          ["string", "number"].includes(typeof value),
      )
      .map(([, value]) => String(value)),
  );
  if (template.slug === "birthday-disco-scrapbook")
    return <PopDiscoPoster sample={sample} language={language} presentation={presentation} className={className} ariaLabel={ariaLabel}/>;
  if (template.slug === "birthday-checkerboard-cheers")
    return <CheckerboardCheersPoster sample={sample} language={language} presentation={presentation} className={className} ariaLabel={ariaLabel}/>;
  if (template.slug === "birthday-playground")
    return <BirthdayPlaygroundPoster sample={sample} language={language} ariaLabel={ariaLabel} className={className}/>;
  if (template.slug === "birthday-ribbon-sketch")
    return <RibbonSketchCardArt />;
  const { design } = template;
  const layeredScene =
    presentation === "portrait" &&
    !separatedThemeAssets[template.slug] &&
    recipientLayeredScenes[template.slug];
  const separated = layeredScene
    ? undefined
    : separatedThemeAssets[template.slug];
  const separatedBackground =
    separated && getSeparatedBackground(separated, presentation);
  const coverImage =
    presentation === "portrait"
      ? layeredScene ||
        recipientTableArtwork[template.slug] ||
        recipientArtwork[template.slug] ||
        template.visualAssets?.coverImage
      : template.visualAssets?.coverImage;
  const showGeneratedDecor = ![



  ].includes(template.slug);
  return (
    <div
      ref={artworkRoot}
      lang={language}
      data-card-font={typography.display}
      data-card-accent={typography.accent}
      data-card-opening={typography.opening}
      className={`invitation-art invitation-preview-art theme-${
        template.visual
      } preview-${template.previewArt} preview-layout-${
        template.layout
      } preview-${template.category.toLowerCase()} design-pattern-${
        design.pattern
      }${
        !coverImage && template.visualAssets?.invitation?.length
          ? " has-birthday-illustrations"
          : ""
      }${
        coverImage ? " full-image-cover" : ""
      }${separated ? " invitation-art--separated" : ""}${
        large ? " is-large" : ""
      }${presentation === "portrait" ? " invitation-art--portrait" : ""}${
        layeredScene ? " invitation-art--layered" : ""
      } ${className}`}
      style={{
        "--showcase-paper": design.palette[0],
        "--showcase-ink": design.palette[1],
        "--showcase-accent": design.palette[2],
        "--showcase-secondary": design.palette[3],
        ...(coverImage ? { "--cover-image": `url("${coverImage}")` } : {}),
        ...(separated
          ? {
              "--separated-paper":
                separatedBackground.color ?? design.palette[0],
              "--separated-background": separatedBackground.image
                ? `url("${separatedBackground.image}")`
                : "none",
              "--separated-size": separatedBackground.size ?? "100% 100%",
            }
          : {}),
      }}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
    >
      {layeredScene ? (
        <div className="invitation-layered-copy">
          <InvitationArtwork
            template={template}
            large={large}
            sample={sample}
            presentation="square"
            ariaLabel={ariaLabel}
          />
        </div>
      ) : template.visualAssets?.selectedBridal ? (
        <SelectedBridalPoster
          sample={sample}
          slug={template.slug}
          large={large}
          assets={template.visualAssets.selectedBridal}
          components={
            separated?.container === "foreground"
              ? getSeparatedComponents(separated, presentation)
              : undefined
          }
        />
      ) : template.visualAssets?.comicBirthday ? (
        <ComicBirthdayPoster sample={sample} variant={template.visual} />
      ) : template.visualAssets?.paintedCocktail ? (
        <CocktailBirthdayPoster
          sample={sample}
          large={large}
          variant={template.visual}
          slug={template.slug}
          isBridal={template.subcategory === "bridal-party"}
          artwork={template.visualAssets.cocktailIllustration}
          components={
            separated?.container === "foreground"
              ? getSeparatedComponents(separated, presentation)
              : undefined
          }
        />
      ) : template.visualAssets?.pizzaChef ? (
        <PizzaBirthdayPoster
          sample={sample}
          large={large}
          separated={Boolean(separated)}
          variant={template.visual}
        />
      ) : template.visualAssets?.paintedPool ? (
        <PoolBirthdayPoster sample={sample} variant={template.visual} />
      ) : template.visualAssets?.lineArt ? (
        <LineBirthdayPoster sample={sample} variant={template.visual} />
      ) : template.visualAssets?.christeningCard ? (
        <ChristeningCardPoster {...sample} variant={template.visual} />
      ) : template.visualAssets?.retroBridal ? (
        <RetroBridalPoster
          {...sample}
          variant={template.visual}
          openingFont={typography.opening}
        />
      ) : coverImage &&
        ["cherry-toast", "little-yes", "blush-lift"].includes(
          template.visual,
        ) ? (
        <BridalLinePoster variant={template.visual} {...sample} />
      ) : coverImage && template.subcategory === "gender-reveal" ? (
        <GenderRevealPoster {...sample} variant={template.visual} />
      ) : coverImage && template.visual === "heartmarked" ? (
        <WeddingHeartPoster {...sample} />
      ) : coverImage &&
        ["wedding-day-notes", "date-and-dinner", "colorful-company"].includes(
          template.visual,
        ) ? (
        <WeddingDayPoster variant={template.visual} {...sample} />
      ) : coverImage &&
        [
          "ink-and-ivy",
          "garden-dance",
          "blue-pour",
          "heart-hideaway",
          "tipsy-together",
          "blue-clink",
          "wedding-day-notes",
          "celebration-table",
          "little-vows",
          "date-and-dinner",
          "our-people",
          "happily-away",
          "first-dance",
          "rose-letter",
          "sage-letter",
          "side-by-side",
          "come-rain-or-shine",
          "ribbon-revel",
          "ivory-vows",
          "garden-table",
          "linked-steps",
          "colorful-company",
          "heartmarked",
          "portrait-promise",
          "sweet-snapshot",
          "happy-table",
          "watercolor-banquet",
          "ring-and-spark",
          "golden-promise",
        ].includes(template.visual) ? (
        <WeddingInkPoster {...sample} />
      ) : coverImage &&
        ["cobalt-cheers"].includes(template.visual) ? (
        <ReferenceSocialPoster
          variant={template.visual}
          {...sample}
          openingFont={typography.opening}
        />
      ) : coverImage && template.slug === "birthday-y2k-party" ? (
        <div className="y2k-image-cover-copy">
          <span className="y2k-image-opening">{invitedLabel}</span>
          <span className="y2k-image-host">{sample.posterName}</span>
          <strong className="y2k-image-title">{t("cards.y2k")}</strong>
          <strong className="y2k-image-party">{t("cards.party")}</strong>
          <em>{sample.line}</em>
          <span className="y2k-image-details">
            {sample.date} ·{" "}
            <span className="card-text-value">{sample.location}</span>
          </span>
        </div>
      ) : coverImage && template.slug === "birthday-retro-pop" ? (
        <div className="retro-image-cover-copy">
          <span className="retro-image-opening">{invitedLabel}</span>
          <strong className="retro-image-title">
            <span>{sample.posterName}</span>
            <span>{sample.posterOccasion}</span>
          </strong>
          <strong className="retro-image-age">{sample.posterAge}</strong>
          <em>{sample.line}</em>
          <span className="retro-image-details">
            {sample.date} ·{" "}
            <span className="card-text-value">{sample.location}</span>
          </span>
        </div>
      ) : coverImage ? (
        <FullImageInvitationPoster
          handwrittenOpening={typography.opening === "birthday"}
          variant={template.visual}
          title={sample.title}
          line={sample.line}
          date={sample.date}
          location={sample.location}
        />
      ) : template.slug === "birthday-retro-pop" ? (
        <RetroPoster sample={sample} invitedLabel={invitedLabel} />
      ) : (
        <>
          <span className="invitation-preview-edge">
            11:11{" "}
            {t(getCategoryCaptionKey(template.category, template.subcategory))}
          </span>
          {showGeneratedDecor && (
            <>
              <span className="invitation-preview-shape shape-one" />
              <span className="invitation-preview-shape shape-two" />
              {design.motif && (
                <span className="invitation-preview-graphic">
                  <span>{design.motif}</span>
                </span>
              )}
            </>
          )}
          {showGeneratedDecor && (
            <>
              {template.decor && (
                <span className="invitation-preview-decor">
                  {template.decor}
                </span>
              )}
              {sample.mark && (
                <span className="invitation-preview-mark">{sample.mark}</span>
              )}
            </>
          )}
          <span className="invitation-preview-copy">
            <span>{invitedLabel}</span>
            <strong>{sample.title}</strong>
            <em>{sample.line}</em>
          </span>
          <span className="invitation-preview-foot">
            <span>
              {sample.date} ·{" "}
              <span className="card-text-value">{sample.location}</span>
            </span>
            <span>{t("invitations.invites")}</span>
          </span>
        </>
      )}
      {template.visualAssets?.paintedAttire && !separated && (
        <img
          className="ivory-vows-attire"
          src={template.visualAssets.paintedAttire}
          alt=""
          aria-hidden="true"
          loading={large ? "eager" : "lazy"}
          decoding="async"
          draggable="false"
        />
      )}
      {!separated &&
        (template.visualAssets?.comicBirthday ||
          template.visualAssets?.paintedPool) && (
          <img
            className={
              template.visualAssets.comicBirthday
                ? "comic-birthday-art"
                : "pool-birthday-art"
            }
            src={coverImage}
            alt=""
            aria-hidden="true"
            loading={large ? "eager" : "lazy"}
            decoding="async"
            draggable="false"
          />
        )}
      {separated &&
        !["foreground", "paper"].includes(separated.container) &&
        !layeredScene && (
          <BirthdayIllustrations
            assets={getSeparatedComponents(separated, presentation)}
            slot="component"
            eager={large}
          />
        )}
      {!coverImage && (
        <BirthdayIllustrations
          assets={template.visualAssets?.invitation}
          slot="invitation"
          eager={large}
        />
      )}
    </div>
  );
}

export default function InvitationCard({ template, animationIndex = 0 }) {
  const { t } = useLanguage();
  const sample = getInvitationSample(template.slug, t);
  return (
    <Link
      id={`design-${template.slug}`}
      className="invitation-card invitation-showcase-card invitation-card--glass"
      style={{
        "--catalog-card-delay": `${Math.min(animationIndex, 6) * 40}ms`,
      }}
      to={`/invitations/${template.slug}`}
      aria-label={`${t("common.exploreDesign")}: ${t(
        `themes.${template.id}.name`,
      )}: ${sample.title}`}
    >
      <div className="invitation-card-media">
        {template.category === "Birthday" ? (
          <div
            className="birthday-card-artwork"
            style={{ "--card-paper": template.design.palette[0] }}
          >
            <InvitationArtwork template={template} />
          </div>
        ) : (
          <InvitationArtwork template={template} />
        )}
      </div>
      <span className="invitation-card-bottom">
        <span>
          <strong>{t(`themes.${template.id}.name`)}</strong>
        </span>
      </span>
    </Link>
  );
}

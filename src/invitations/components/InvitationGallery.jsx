import { Fragment, useEffect, useRef, useState } from "react";
import InvitationCard from "./InvitationCard.jsx";
import CustomInvitationCard from "./CustomInvitationCard.jsx";
import { useLanguage } from "../../localization/LanguageContext.jsx";

const batchSize = 12;

export default function InvitationGallery({ templates, className = "", customCategory = null }) {
  const { t } = useLanguage();
  const sentinel = useRef(null);
  const storageKey = `1111-gallery:${templates.map((template) => template.id).join(",")}`;
  const [visibleCount, setVisibleCount] = useState(() => {
    let saved = batchSize;
    try { saved = Number(sessionStorage.getItem(storageKey)) || batchSize; } catch { /* Storage is optional. */ }
    const anchorIndex = templates.findIndex((template) => window.location.hash === `#design-${template.slug}`);
    return Math.min(templates.length, Math.max(batchSize, saved, anchorIndex + 1));
  });
  const hasMore = visibleCount < templates.length;

  useEffect(() => {
    try { sessionStorage.setItem(storageKey, String(visibleCount)); } catch { /* Storage is optional. */ }
  }, [storageKey, visibleCount]);

  useEffect(() => {
    if (!hasMore || !sentinel.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        setVisibleCount((count) => Math.min(count + batchSize, templates.length));
      }
    }, { rootMargin: "400px 0px" });
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, [hasMore, visibleCount, templates.length]);

  return <>
    <div className={`invitation-gallery ${className}`}>
      {templates.slice(0, visibleCount).map((template, index) => <Fragment key={template.id}>
        <InvitationCard template={template} animationIndex={index % batchSize} />
        {index === 0 && customCategory && <CustomInvitationCard category={customCategory} animationIndex={1} />}
      </Fragment>)}
      {!templates.length && customCategory && <CustomInvitationCard category={customCategory} />}
    </div>
    {hasMore ? <div ref={sentinel} className="collection-load-more"><button type="button" onClick={() => setVisibleCount((count) => Math.min(count + batchSize, templates.length))}><span className="collection-loader" aria-hidden="true" />{t("catalog.loadMore")}</button></div> : null}
  </>;
}

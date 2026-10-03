import { birthdayAssetStyle, normalizeBirthdayAsset } from "../data/assetPresentation.js";

export default function BirthdayIllustrations({ assets, slot, eager = false }) {
  const images = Array.isArray(assets) ? assets : assets ? [assets] : [];
  return images.map((asset, index) => {
    const normalized = normalizeBirthdayAsset(asset);
    if (!normalized) return null;
    const style = birthdayAssetStyle(asset);
    if (normalized.components) {
      const ratio = normalized.aspectRatio ?? 1;
      return <div key={normalized.id} className="birthday-component-group" data-component-id={normalized.id} style={style} aria-hidden="true">
        <div className="birthday-component-group-canvas" style={{ width: `min(100cqw, ${100 * ratio}cqh)`, height: `min(${100 / ratio}cqw, 100cqh)` }}>
          <BirthdayIllustrations assets={normalized.components} slot={slot} eager={eager} />
        </div>
      </div>;
    }
    return (
      <img
        key={`${normalized.image}-${index}`}
        className={`birthday-illustration birthday-illustration--${slot}-${index + 1}${style ? " birthday-illustration--configured" : ""}`}
        src={normalized.image}
        data-component-id={normalized.id}
        style={style}
        alt=""
        aria-hidden="true"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        draggable="false"
      />
    );
  });
}

import { birthdayAssetStyle, normalizeBirthdayAsset } from "../data/assetPresentation.js";

export default function BirthdayIllustrations({ assets, slot, eager = false }) {
  const images = Array.isArray(assets) ? assets : assets ? [assets] : [];
  return images.map((asset, index) => {
    const normalized = normalizeBirthdayAsset(asset);
    if (!normalized) return null;
    const style = birthdayAssetStyle(asset);
    return (
      <img
        key={`${normalized.image}-${index}`}
        className={`birthday-illustration birthday-illustration--${slot}-${index + 1}${style ? " birthday-illustration--configured" : ""}`}
        src={normalized.image}
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

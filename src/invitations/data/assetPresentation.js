// Strings retain legacy slot CSS. Objects opt into configuration-driven placement.
export function normalizeBirthdayAsset(asset) {
  const normalized = typeof asset === "string" ? { image: asset } : asset;
  return normalized && ((typeof normalized.image === "string" && normalized.image.length) || normalized.components?.length)
    ? normalized
    : null;
}

export function getBirthdayImageAssets(assets) {
  return assets.flatMap(asset => {
    const normalized = normalizeBirthdayAsset(asset);
    if (!normalized) return [];
    return normalized.components ? getBirthdayImageAssets(normalized.components) : [normalized];
  });
}

export function birthdayAssetStyle(asset) {
  if (typeof asset === "string" || !normalizeBirthdayAsset(asset)) return undefined;
  return {
    position: "absolute",
    top: asset.top ?? "auto",
    right: asset.right ?? (asset.left != null ? "auto" : 0),
    bottom: asset.bottom ?? (asset.top != null ? "auto" : 0),
    left: asset.left ?? "auto",
    width: asset.width ?? "35%",
    height: asset.height ?? "auto",
    maxWidth: "none",
    maxHeight: "none",
    transform: `rotate(${asset.rotation ?? 0}deg)${asset.flipX ? " scaleX(-1)" : ""}`,
    opacity: asset.opacity ?? 1,
    // Reserve layer 3 for text and controls, even if a theme requests a higher layer.
    zIndex: Math.min(2, Math.max(0, asset.zIndex ?? 0)),
    objectFit: asset.objectFit ?? "contain",
    filter: "none",
  };
}

export function photoCardStyle(photoCard) {
  if (!photoCard) return {};
  return {
    "--photo-card-background": `url("${photoCard.background}")`,
    "--world-photo": `url("${photoCard.background}")`,
    "--photo-card-position": photoCard.backgroundPosition ?? "center",
    "--photo-paper": photoCard.paper ?? "#eeeae1",
    "--photo-ink": photoCard.ink ?? "#182833",
  };
}

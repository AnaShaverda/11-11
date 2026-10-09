import { celebrationArtwork } from "./celebrationArtwork.js";

export const ribbonPhotos = celebrationArtwork.map(art => art.src);
export const ribbonPhotoCaptions = Object.fromEntries(celebrationArtwork.map(art => [art.src, art.caption]));

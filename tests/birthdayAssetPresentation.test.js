import assert from "node:assert/strict";
import test from "node:test";
import { birthdayAssetStyle, normalizeBirthdayAsset } from "../src/invitations/data/assetPresentation.js";

test("legacy paths keep their CSS; empty slots do not become image sources", () => {
  assert.deepEqual(normalizeBirthdayAsset("/balloon.webp"), { image: "/balloon.webp" });
  assert.equal(birthdayAssetStyle("/balloon.webp"), undefined);
  for (const asset of [null, undefined, false, "", {}, { image: null }]) {
    assert.equal(normalizeBirthdayAsset(asset), null);
  }
});

test("objects override inherited placement with complete, predictable defaults", () => {
  const style = birthdayAssetStyle({ image: "/balloon.webp" });
  assert.deepEqual(style, {
    position: "absolute", top: "auto", right: 0, bottom: 0, left: "auto",
    width: "35%", height: "auto", maxWidth: "none", maxHeight: "none",
    transform: "rotate(0deg)", opacity: 1, zIndex: 0, objectFit: "contain", filter: "none",
  });
  assert.ok(Object.values(style).every(value => value !== undefined));
});

test("top-left placement clears conflicting default bottom-right anchors and preserves zero", () => {
  const style = birthdayAssetStyle({ image: "/balloon.webp", top: 0, left: "-8%", width: "55%", height: "40%", rotation: -12, opacity: 0, zIndex: 1, objectFit: "cover" });
  assert.equal(style.right, "auto");
  assert.equal(style.bottom, "auto");
  assert.equal(style.top, 0);
  assert.equal(style.left, "-8%");
  assert.equal(style.width, "55%");
  assert.equal(style.height, "40%");
  assert.equal(style.opacity, 0);
  assert.equal(style.transform, "rotate(-12deg)");
  assert.equal(style.objectFit, "cover");
  assert.equal(style.zIndex, 1);
});

test("decorations cannot overtake the reserved content layer", () => {
  assert.equal(birthdayAssetStyle({ image: "/balloon.webp", zIndex: 99 }).zIndex, 2);
  assert.equal(birthdayAssetStyle({ image: "/balloon.webp", zIndex: -1 }).zIndex, 0);
});

import test from "node:test";
import assert from "node:assert/strict";
import { getEntranceTransition } from "../src/invitations/data/guestEntranceMotion.js";

test("door reveal pauses for continuation and celebrates before the invitation becomes interactive", () => {
  const doors = getEntranceTransition("doors", "opening", false);
  assert.equal(doors.next, "preview");
  assert.ok(doors.celebrationDelay > 0 && doors.celebrationDelay < doors.duration);
  assert.deepEqual(getEntranceTransition("doors", "preview", false), null);
  const finish = getEntranceTransition("doors", "finishing", false);
  assert.equal(finish.next, "opened");
  assert.ok(finish.duration > 0 && finish.duration < 1000);
  assert.equal(finish.celebrationDelay, null);
  assert.equal(getEntranceTransition("envelope", "opening", false).next, "opened");
  assert.equal(getEntranceTransition("immediate", "opened", false), null);
});

test("reduced motion skips reveal and dismissal delays without firing a celebration", () => {
  for (const entrance of ["doors", "envelope"]) {
    for (const phase of ["opening", "finishing"]) {
      const transition = getEntranceTransition(entrance, phase, true);
      assert.equal(transition.duration, 0);
      assert.equal(transition.celebrationDelay, null);
      assert.equal(transition.next, entrance === "doors" && phase === "opening" ? "preview" : "opened");
    }
  }
});

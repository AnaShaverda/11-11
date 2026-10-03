import test from "node:test";
import assert from "node:assert/strict";
import { normalizeGuestDayPlan, getDayPlanErrors, MAX_DAY_PLAN_ITEMS, MAX_DAY_PLAN_TITLE, MAX_DAY_PLAN_DETAILS } from "../src/invitations/data/guestDayPlan.js";

test("only planner-entered activities with valid times reach the guest plan", () => {
  for (const value of [null, {}, "plan", [], [{ time: "", title: "" }]]) assert.deepEqual(normalizeGuestDayPlan(value), []);
  const plan = [
    { time: "17:30", title: "  Welcome drinks  ", details: "  Garden terrace\nMeet the family  " },
    { time: "18:00", title: "ცერემონია" },
  ];
  const before = JSON.stringify(plan);
  assert.deepEqual(normalizeGuestDayPlan(plan), [
    { time: "17:30", title: "Welcome drinks", details: "Garden terrace\nMeet the family" },
    { time: "18:00", title: "ცერემონია", details: "" },
  ]);
  assert.equal(JSON.stringify(plan), before);
  assert.deepEqual(normalizeGuestDayPlan(JSON.parse(JSON.stringify(plan))), normalizeGuestDayPlan(plan));
});

test("corrupt or oversized saved schedule entries cannot appear in the guest view", () => {
  const valid = { time: "18:00", title: "Dinner", details: "Main hall" };
  for (const item of [null, {}, { ...valid, time: "24:00" }, { ...valid, time: "12:60" }, { ...valid, time: "8:00" },
    { ...valid, time: 1800 }, { ...valid, title: "   " }, { ...valid, title: 123 },
    { ...valid, title: "a".repeat(MAX_DAY_PLAN_TITLE + 1) }, { ...valid, details: {} },
    { ...valid, details: "a".repeat(MAX_DAY_PLAN_DETAILS + 1) }]) {
    assert.deepEqual(normalizeGuestDayPlan([item]), []);
  }
  assert.equal(normalizeGuestDayPlan(Array.from({ length: 30 }, () => valid)).length, MAX_DAY_PLAN_ITEMS);
});

test("plans preserve entered order across midnight and report unfinished rows without publishing them", () => {
  const rows = [{ time: "23:00", title: "Dancing" }, { time: "00:30", title: "Late-night bites" },
    { time: "", title: "", details: "" }, { time: "18:00", title: "" }, { time: "", title: "Dinner" }, { details: "Garden" }];
  assert.deepEqual(getDayPlanErrors(rows), [3, 4, 5]);
  assert.deepEqual(normalizeGuestDayPlan(rows).map(item => item.time), ["23:00", "00:30"]);
});

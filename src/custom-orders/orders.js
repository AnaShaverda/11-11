import { lazy } from "react";

// Add each fulfilled order here with a new cryptographically random ID.
export const aniOrderId = "a1cbe778fe47dc687ef50b9f24d4981d";
export const aniOrderPath = `/surprises/for/${aniOrderId}`;

export const customOrders = {
  [aniOrderId]: lazy(() => import("./ani/AniOrderPage.jsx")),
};

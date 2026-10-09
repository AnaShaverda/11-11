import { Suspense } from "react";
import SiteLoader from "../components/ui/SiteLoader.jsx";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { customOrders } from "./orders.js";

export default function CustomOrderRoute() {
  const { orderId } = useParams();
  const { pathname } = useLocation();
  const OrderPage = Object.hasOwn(customOrders, orderId)
    ? customOrders[orderId]
    : null;

  if (!OrderPage) {
    return (
      <main style={{ padding: "3rem", fontFamily: "sans-serif" }}>
        <h1>Surprise not found</h1>
        <p>Check the link you received.</p>
      </main>
    );
  }

  const orderPath = `/surprises/for/${orderId}`;
  if (pathname !== orderPath && pathname !== `${orderPath}/`) {
    return <Navigate to={orderPath} replace />;
  }

  return (
    <Suspense fallback={<SiteLoader pending />}>
      <OrderPage />
    </Suspense>
  );
}

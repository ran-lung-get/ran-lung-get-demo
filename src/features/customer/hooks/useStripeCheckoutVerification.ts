import { useState, useEffect } from "react";
import { verifyStripeSession } from "../../../lib/api/stripe.functions";
import type { CartLine, OrderType } from "../types";

export function useStripeCheckoutVerification({
  liffReady,
  setCart,
  setShowSuccess,
  setOverlay,
  setTab,
  saveOrderToHistory,
  tables,
}: {
  liffReady: boolean;
  setCart: React.Dispatch<React.SetStateAction<CartLine[]>>;
  setShowSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setOverlay: React.Dispatch<React.SetStateAction<any>>;
  setTab: React.Dispatch<React.SetStateAction<"home" | "status">>;
  saveOrderToHistory: (
    cart: CartLine[],
    orderType: OrderType | null,
    selectedTable: string | null,
    address: string,
    tables: any[]
  ) => boolean;
  tables: any[];
}) {
  const [stripeVerifying, setStripeVerifying] = useState(false);
  const [stripeError, setStripeError] = useState<string | null>(null);

  useEffect(() => {
    if (!liffReady || typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const isSuccess = params.get("payment_success") === "true";
    const sessionId = params.get("session_id");

    if (isSuccess && sessionId) {
      async function verifyAndSave() {
        setStripeVerifying(true);
        try {
          console.log("[Stripe Client] Verifying checkout session:", sessionId);
          const result = await verifyStripeSession({ data: { sessionId: sessionId as string } });

          if (result.success) {
            const pendingStr = localStorage.getItem("ran-lung-get-pending-stripe-order");
            if (pendingStr) {
              const pending = JSON.parse(pendingStr);
              console.log("[Stripe Client] Pending order restored:", pending);

              if (!pending.cart || pending.cart.length === 0) {
                setStripeError(
                  "ไม่พบรายการสินค้าในคำสั่งซื้อที่รอดำเนินการ (คุณอาจลบสินค้าออกจากตะกร้าแล้ว)"
                );
                localStorage.removeItem("ran-lung-get-pending-stripe-order");
                setOverlay(null);
                return;
              }

              const savedOk = saveOrderToHistory(
                pending.cart,
                pending.orderType,
                pending.selectedTable,
                pending.address,
                tables
              );

              if (savedOk) {
                setCart([]);
                localStorage.removeItem("ran-lung-get-pending-stripe-order");
                setShowSuccess(true);
                setOverlay(null);
                setTab("home");

                setTimeout(() => {
                  setShowSuccess(false);
                }, 2000);
              } else {
                setStripeError("ไม่สามารถทำรายการได้ สินค้าในตะกร้าถูกลบหรือไม่มีข้อมูล");
                localStorage.removeItem("ran-lung-get-pending-stripe-order");
              }
            } else {
              setStripeError(
                "ไม่พบข้อมูลคำสั่งซื้อที่รอดำเนินการ กรุณาตรวจสอบประวัติการสั่งซื้อของคุณ (Pending order details not found)"
              );
            }
          } else {
            setStripeError(
              result.message || "การชำระเงินไม่ผ่านการตรวจสอบความถูกต้อง (Stripe verification failed)"
            );
          }
        } catch (err: any) {
          console.error("[Stripe Client] Error verifying Stripe session:", err);
          setStripeError(err?.message || "ระบบไม่สามารถตรวจสอบความถูกต้องของการชำระเงินได้");
        } finally {
          setStripeVerifying(false);
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        }
      }
      verifyAndSave();
    } else if (params.get("payment_cancelled") === "true") {
      setStripeError("การชำระเงินผ่าน Stripe ถูกยกเลิก");
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }
  }, [liffReady, tables, saveOrderToHistory, setCart, setShowSuccess, setOverlay, setTab]);

  return {
    stripeVerifying,
    stripeError,
  };
}

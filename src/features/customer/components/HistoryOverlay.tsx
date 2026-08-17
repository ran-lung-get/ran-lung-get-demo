import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  Trash2,
  Package,
  Receipt,
  CheckCircle,
  Bike,
  ChefHat,
  Clock,
  AlertCircle,
  XCircle,
} from "lucide-react";
import type { OrderHistory } from "../types";
import { BRAND, GOLD, INK_MUTED } from "../constants/colors";
import { useLanguage } from "../../../lib/i18n";

export function HistoryOverlay({
  orderHistory,
  onBack,
  onClearHistory,
}: {
  orderHistory: OrderHistory[];
  onBack: () => void;
  onClearHistory: () => void;
}) {
  const { t, tMenu } = useLanguage();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleConfirmClear = () => {
    setShowConfirmModal(false);
    onClearHistory();
  };

  const getStatusBadge = (status: string) => {
    const s = String(status || "").trim().toLowerCase();

    if (s === "สำเร็จ" || s === "completed" || s === "เสร็จสิ้น") {
      return {
        bg: "#dcfce7",
        color: "#15803d",
        icon: <CheckCircle size={12} />,
      };
    }
    if (s === "กำลังจัดส่ง" || s === "out for delivery" || s === "delivering") {
      return {
        bg: "#dbeafe",
        color: "#1d4ed8",
        icon: <Bike size={12} />,
      };
    }
    if (s === "กำลังเตรียม" || s === "preparing" || s === "กำลังทำ") {
      return {
        bg: "#fef9c3",
        color: "#a16207",
        icon: <ChefHat size={12} />,
      };
    }
    if (s === "พร้อมเสิร์ฟ" || s === "ready" || s === "พร้อมรับอาหาร") {
      return {
        bg: "#e0e7ff",
        color: "#4338ca",
        icon: <Package size={12} />,
      };
    }
    if (s === "ขอคืนเงิน" || s === "refund requested" || s === "refunded") {
      return {
        bg: "#fef3c7",
        color: "#d97706",
        icon: <AlertCircle size={12} />,
      };
    }
    if (
      s === "ยกเลิก" ||
      s === "ยกเลิกแล้ว" ||
      s === "cancelled" ||
      s === "canceled" ||
      s === "cancel"
    ) {
      return {
        bg: "#fee2e2",
        color: "#dc2626",
        icon: <XCircle size={12} />,
      };
    }
    return {
      bg: "#f1f5f9",
      color: "#475569",
      icon: <Clock size={12} />,
    };
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="absolute inset-0 z-30 bg-[var(--surface)] flex flex-col"
    >
      {/* Header */}
      <div className="w-full" style={{ background: BRAND, color: "white" }}>
        <div className="max-w-2xl mx-auto px-5 pt-5 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onBack}
                aria-label={t("ย้อนกลับ")}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 border border-white/15 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft size={20} color={GOLD} />
              </button>
              <div>
                <h1 className="text-lg font-bold">{t("ประวัติการสั่งซื้อ")}</h1>
                <p className="text-xs text-white/60">{orderHistory.length} {t("รายการ")}</p>
              </div>
            </div>

            {orderHistory.length > 0 && (
              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30 transition active:scale-95 cursor-pointer"
                title={t("ล้างประวัติการสั่งซื้อ")}
              >
                <Trash2 size={14} />
                <span>{t("ล้างประวัติ")}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-4">
        <div className="max-w-2xl mx-auto space-y-3">
          {orderHistory.length === 0 ? (
            <div className="text-center py-16">
              <div
                className="grid h-16 w-16 place-items-center rounded-2xl mx-auto mb-3"
                style={{ background: "rgba(0,46,71,0.05)", color: BRAND }}
              >
                <Package size={28} />
              </div>
              <p className="text-sm font-medium" style={{ color: INK_MUTED }}>
                {t("ยังไม่มีประวัติการสั่งซื้อ")}
              </p>
              <p className="text-xs mt-1" style={{ color: INK_MUTED }}>
                {t("เริ่มสั่งอาหารเลย!")}
              </p>
            </div>
          ) : (
            <>
              {orderHistory.map((order, idx) => {
                const badge = getStatusBadge(order.status);
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className="bg-white rounded-2xl shadow-xs overflow-hidden border border-slate-100"
                  >
                    {/* Order header */}
                    <div
                      className="px-4 py-3 flex items-center justify-between"
                      style={{ background: "rgba(0,46,71,0.03)", borderBottom: "1px solid #f1ece4" }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="grid h-10 w-10 place-items-center rounded-xl"
                          style={{ background: BRAND, color: GOLD }}
                        >
                          <Receipt size={18} />
                        </div>
                        <div>
                          <p className="text-sm font-bold" style={{ color: BRAND }}>
                            {order.orderNumber}
                          </p>
                          <p className="text-[10px]" style={{ color: INK_MUTED }}>
                            {order.date}
                          </p>
                        </div>
                      </div>
                      <span
                        className="px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5"
                        style={{
                          background: badge.bg,
                          color: badge.color,
                        }}
                      >
                        {badge.icon}
                        {t(order.status) || order.status}
                      </span>
                    </div>

                    {/* Order items */}
                    <div className="px-4 py-3 space-y-2.5">
                      {order.items.map((item, itemIdx) => (
                        <div key={itemIdx} className="flex items-center gap-3">
                          <img
                            src={encodeURI(String(item.image))}
                            alt={tMenu(item.name)}
                            className="h-12 w-12 rounded-xl object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate" style={{ color: BRAND }}>
                              {tMenu(item.name)}
                            </p>
                            <p className="text-xs" style={{ color: INK_MUTED }}>
                              {t("จำนวน")}: {item.qty} · ฿{item.price} {t("/ชิ้น")}
                            </p>
                          </div>
                          <p className="text-sm font-bold" style={{ color: BRAND }}>
                            ฿{item.price * item.qty}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order footer */}
                    <div
                      className="px-4 py-2.5 flex items-center justify-between"
                      style={{ background: "#fafbfc", borderTop: "1px solid #f1ece4" }}
                    >
                      <div className="text-xs" style={{ color: INK_MUTED }}>
                        <span>{t("อาหาร")} ฿{order.subtotal}</span>
                        <span className="mx-1.5">·</span>
                        <span>{t("จัดส่ง")} ฿{order.delivery}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs" style={{ color: INK_MUTED }}>
                          {t("รวม")}
                        </span>
                        <span className="text-lg font-bold" style={{ color: BRAND }}>
                          ฿{order.total}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Bottom Clear History Action */}
              <div className="pt-4 pb-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition cursor-pointer active:scale-95 shadow-xs"
                >
                  <Trash2 size={15} />
                  <span>{t("ล้างประวัติการสั่งซื้อทั้งหมด")}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConfirmModal(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl z-10 text-center"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-50 text-red-600 mx-auto mb-4 border border-red-100">
                <Trash2 size={28} />
              </div>
              <h3 className="text-lg font-black text-[#002e47] mb-2">
                {t("ล้างประวัติการสั่งซื้อ?")}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                {t("คุณต้องการล้างประวัติการสั่งซื้อทั้งหมดใช่หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้")}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition cursor-pointer"
                >
                  {t("ยกเลิก")}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmClear}
                  className="flex-1 py-3 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition shadow-md shadow-red-200 cursor-pointer"
                >
                  {t("ยืนยันล้างข้อมูล")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

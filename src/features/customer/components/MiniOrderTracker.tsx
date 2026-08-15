import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ClipboardList, Check, ChefHat, PartyPopper, ShoppingBag, Bike } from "lucide-react";
import { useLanguage } from "../../../lib/i18n";
import type { OrderType } from "../types";
import { BRAND, INK_MUTED } from "../constants/colors";

export function MiniOrderTracker({
  orderNumber,
  onGoToStatus,
  orderType,
  status,
}: {
  orderNumber: string;
  onGoToStatus: () => void;
  orderType: OrderType;
  status?: string;
}) {
  const { t } = useLanguage();

  const isCompleted = status === "สำเร็จ" || status === "completed" || status === "เสร็จสิ้น";
  const isCooking   = status === "กำลังทำ" || status === "กำลังเตรียม" || status === "preparing";
  const isReady     = status === "พร้อมเสิร์ฟ" || status === "delivering" || status === "พร้อมรับอาหาร" || status === "กำลังจัดส่ง";
  const isReceived  = !isCooking && !isReady && !isCompleted;

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timerId: any = null;
    if (isCompleted) {
      timerId = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
    } else {
      setIsVisible(true);
    }
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [isCompleted]);

  if (!isVisible) return null;

  const steps = orderType === "dine-in"
    ? [
      { id: 1, label: t("รับออเดอร์"),      icon: Check,        done: isCooking || isReady || isCompleted, active: isReceived },
      { id: 2, label: t("กำลังทำอาหาร"),    icon: ChefHat,      done: isReady || isCompleted,              active: isCooking },
      { id: 3, label: t("เสร็จสิ้น"),       icon: PartyPopper,  done: false,                               active: isCompleted },
    ]
    : orderType === "takeaway"
      ? [
        { id: 1, label: t("รับออเดอร์"),       icon: Check,       done: isCooking || isReady || isCompleted, active: isReceived },
        { id: 2, label: t("กำลังเตรียมอาหาร"), icon: ChefHat,     done: isReady || isCompleted,              active: isCooking },
        { id: 3, label: t("พร้อมรับอาหาร"),    icon: ShoppingBag, done: false,                               active: isReady || isCompleted },
      ]
      : [
        { id: 1, label: t("รับออเดอร์"),               icon: Check,        done: isCooking || isReady || isCompleted, active: isReceived },
        { id: 2, label: t("กำลังเตรียมอาหาร"),         icon: ChefHat,      done: isReady || isCompleted,              active: isCooking },
        { id: 3, label: t("คนรับอาหาร/กำลังขับไป"),   icon: Bike,         done: isCompleted,                         active: isReady },
        { id: 4, label: t("เสร็จสิ้น"),                icon: PartyPopper,  done: false,                               active: isCompleted },
      ];

  const activeIndex = steps.findIndex((s) => s.active);
  const doneCount   = steps.filter((s) => s.done).length;

  const progressPercent = isCompleted
    ? 100
    : activeIndex !== -1
      ? ((activeIndex + 0.5) / steps.length) * 100
      : ((doneCount + 0.5) / steps.length) * 100;

  const lineFraction = isCompleted
    ? 1
    : activeIndex > 0
      ? activeIndex / (steps.length - 1)
      : 0;

  return (
    <div
      className="bg-white rounded-2xl p-3 shadow-xs border overflow-hidden"
      style={{ borderColor: "#ece4d6" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <div
            className="grid h-7 w-7 place-items-center rounded-lg"
            style={{ background: "rgba(255, 203, 68, 0.15)" }}
          >
            <ClipboardList size={14} style={{ color: "#ffcb44" }} />
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: BRAND }}>
              สถานะ Order ของคุณ
            </p>
            <p className="text-[10px]" style={{ color: INK_MUTED }}>
              {orderNumber}
            </p>
          </div>
        </div>
        <motion.span
          animate={!isCompleted ? { scale: [1, 1.03, 1] } : undefined}
          transition={!isCompleted ? { duration: 2, repeat: Infinity } : undefined}
          className="px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1"
          style={{
            background: isCompleted ? "rgba(16,185,129,0.08)" : "rgba(59,130,246,0.08)",
            color:      isCompleted ? "#10b981"               : "#2563eb",
          }}
        >
          <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isCompleted ? "bg-emerald-500" : "bg-blue-500"}`} />
          {isCompleted ? t("เสร็จสิ้น") : t("กำลังดำเนินการ")}
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="relative h-1.5 rounded-full bg-slate-100 mb-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: "#ffcb44" }}
        />
      </div>

      {/* Step icons row with connection line behind them */}
      <div className="relative flex items-center justify-between mb-3">
        <div
          className="absolute top-4 h-[2px] -translate-y-1/2"
          style={{ background: "#eef2f6", left: 16, right: 16 }}
        />
        <div
          className="absolute top-4 h-[2px] -translate-y-1/2 transition-all duration-700"
          style={{
            background: "#ffcb44",
            left: 16,
            width: `calc(${lineFraction} * (100% - 32px))`,
          }}
        />
        {steps.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.id} className="flex flex-col items-center gap-1 flex-1 relative z-10">
              <div className="relative">
                <div
                  className="grid h-8 w-8 place-items-center rounded-full transition-all relative z-10"
                  style={{
                    background: s.done ? BRAND : s.active ? "#ffcb44" : "#eef2f6",
                    color: s.done ? "#ffcb44" : s.active ? BRAND : INK_MUTED,
                    boxShadow: s.active ? "0 0 0 3px rgba(255, 203, 68, 0.3)" : "none",
                  }}
                >
                  <Icon size={14} />
                </div>
                {s.active && (
                  <motion.span
                    className="absolute inset-0 rounded-full z-0"
                    style={{ border: `2px solid #ffcb44` }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </div>
              <span
                className="text-[10px] font-semibold text-center leading-tight mt-1"
                style={{ color: s.done || s.active ? BRAND : INK_MUTED }}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Underlined text link to status screen */}
      <div className="text-center mt-2.5">
        <button
          type="button"
          onClick={onGoToStatus}
          className="text-xs font-semibold underline transition hover:opacity-80 cursor-pointer"
          style={{ color: BRAND }}
        >
          ดูรายละเอียดสถานะทั้งหมด
        </button>
      </div>
    </div>
  );
}

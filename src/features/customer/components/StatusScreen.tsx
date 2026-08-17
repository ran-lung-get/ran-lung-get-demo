import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, CheckCircle, Check, ChefHat, PartyPopper, ShoppingBag, Bike, Ticket } from "lucide-react";
import type { OrderHistory } from "../types";
import { BRAND, GOLD, INK_MUTED, SURFACE } from "../constants/colors";
import { useLanguage } from "../../../lib/i18n";

export function StatusScreen({
  onOpenSidebar,
  activeOrder,
  onOpenGacha,
}: {
  onOpenSidebar: () => void;
  activeOrder?: OrderHistory;
  onOpenGacha?: () => void;
}) {
  const { t, tMenu } = useLanguage();
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [promptPayNumber, setPromptPayNumber] = useState("");
  const [errorText, setErrorText] = useState("");

  const orderType = activeOrder?.orderType || "delivery";
  const currentStatus = activeOrder?.status || "รอรับออเดอร์";

  const isCancelled =
    currentStatus === "ยกเลิกแล้ว" ||
    currentStatus === "ยกเลิก" ||
    currentStatus === "cancelled" ||
    currentStatus === "canceled";
  const isRefunded = currentStatus === "ขอคืนเงิน" || currentStatus === "refunded";
  const isWaiting =
    currentStatus === "รอรับออเดอร์" || currentStatus === "รอดำเนินการ" || currentStatus === "pending";
  const isCooking =
    currentStatus === "กำลังเตรียม" || currentStatus === "กำลังทำ" || currentStatus === "preparing";
  const isReady =
    currentStatus === "พร้อมเสิร์ฟ" || currentStatus === "ready" || currentStatus === "พร้อมรับอาหาร";
  const isDelivering = currentStatus === "กำลังจัดส่ง" || currentStatus === "delivering";
  const isCompleted = currentStatus === "สำเร็จ" || currentStatus === "completed";

  const steps = orderType === "dine-in"
    ? [
      { id: 1, label: t("รับออเดอร์"), icon: Check, done: !isWaiting, active: isWaiting },
      { id: 2, label: t("กำลังทำอาหาร"), icon: ChefHat, done: isReady || isCompleted, active: isCooking },
      { id: 3, label: t("เสร็จสิ้น"), icon: PartyPopper, done: isCompleted, active: false },
    ]
    : orderType === "takeaway"
      ? [
        { id: 1, label: t("รับออเดอร์"), icon: Check, done: !isWaiting, active: isWaiting },
        { id: 2, label: t("กำลังเตรียมอาหาร"), icon: ChefHat, done: isReady || isCompleted, active: isCooking },
        { id: 3, label: t("พร้อมรับอาหาร"), icon: ShoppingBag, done: isCompleted, active: isReady },
      ]
      : [
        { id: 1, label: t("รับออเดอร์"), icon: Check, done: !isWaiting, active: isWaiting },
        { id: 2, label: t("กำลังเตรียมอาหาร"), icon: ChefHat, done: isReady || isDelivering || isCompleted, active: isCooking },
        { id: 3, label: t("คนรับอาหาร/กำลังขับไป"), icon: Bike, done: isCompleted, active: isReady || isDelivering },
        { id: 4, label: t("เสร็จสิ้น"), icon: PartyPopper, done: isCompleted, active: false },
      ];

  const orderItems = activeOrder
    ? activeOrder.items
    : ([
      { name: "Premium Wagyu Don", qty: 1, price: 420 },
      { name: "Matcha Latte", qty: 2, price: 120 },
    ] as { name: string; qty: number; price: number }[]);
  const total = activeOrder ? activeOrder.total : 420 + 240 + 40;

  // Dynamic status text & theme based on order state
  const statusTheme = useMemo(() => {
    if (isRefunded) {
      return {
        title: t("ยื่นขอคืนเงินแล้ว"),
        subtitle: t("ร้านค้ากำลังตรวจสอบและโอนเงินคืนตามพร้อมเพย์ที่ท่านระบุ"),
        color: "#f59e0b",
        bg: "rgba(245, 158, 11, 0.08)",
        iconColor: "#f59e0b"
      };
    }
    if (isCancelled) {
      return {
        title: t("ออเดอร์ถูกยกเลิกแล้ว"),
        subtitle: t("การคืนเงินสำเร็จหรือยกเลิกคำสั่งซื้อเรียบร้อยแล้ว"),
        color: "#ef4444",
        bg: "rgba(239, 68, 68, 0.08)",
        iconColor: "#ef4444"
      };
    }
    if (isWaiting) {
      return {
        title: t("กำลังรอรับออเดอร์"),
        subtitle: t("ร้านค้ากำลังตรวจสอบรายการและเตรียมเข้าครัว"),
        color: "#3b82f6",
        bg: "rgba(59, 130, 246, 0.08)",
        iconColor: "#3b82f6"
      };
    }
    if (isDelivering) {
      return {
        title: t("ไรเดอร์กำลังนำส่งอาหาร"),
        subtitle: t("อาหารปรุงเสร็จแล้ว ไรเดอร์กำลังเดินทางนำส่งให้คุณ"),
        color: "#2563eb",
        bg: "rgba(37, 99, 235, 0.08)",
        iconColor: "#2563eb"
      };
    }
    if (orderType === "delivery" && isReady) {
      return {
        title: t("อาหารเสร็จแล้ว · รอไรเดอร์มารับ"),
        subtitle: t("ทางร้านเตรียมอาหารเสร็จเรียบร้อยแล้ว กำลังรอไรเดอร์เข้ามารับ"),
        color: "#10b981",
        bg: "rgba(16, 185, 129, 0.08)",
        iconColor: "#10b981"
      };
    }
    return {
      title: isCompleted ? t("รายการสำเร็จ") : t("กำลังดำเนินการ"),
      subtitle: isCompleted
        ? ""
        : (orderType === "dine-in" ? t("รอเสิร์ฟอาหารในอีก 10 นาที") : t("รอรับอาหารในอีก 14 นาที")),
      color: "#10b981",
      bg: "rgba(16, 185, 129, 0.08)",
      iconColor: "#10b981"
    };
  }, [currentStatus, isWaiting, isDelivering, isReady, isCompleted, orderType, t]);

  const cancelReasonsList = [
    t("สั่งอาหารผิดเมนู / ลืมเพิ่มบางรายการ"),
    t("ต้องการเปลี่ยนที่อยู่จัดส่ง / วิธีรับอาหาร"),
    t("รอนานเกินไป / เปลี่ยนใจไม่ทานแล้ว"),
    t("อื่น ๆ (ระบุด้านล่าง)")
  ];

  const handleRequestCancel = () => {
    if (!selectedReason) {
      setErrorText(t("กรุณาเลือกเหตุผลในการยกเลิก"));
      return;
    }
    if (selectedReason === t("อื่น ๆ (ระบุด้านล่าง)") && !customReason.trim()) {
      setErrorText(t("กรุณาระบุรายละเอียดเหตุผลเพิ่มเติม"));
      return;
    }
    if (!promptPayNumber.trim()) {
      setErrorText(t("กรุณากรอกเบอร์พร้อมเพย์ หรือเลขบัญชีธนาคารสำหรับรับเงินคืน"));
      return;
    }

    const saved = localStorage.getItem("ran-lung-get-orders");
    if (saved && activeOrder) {
      try {
        const history: OrderHistory[] = JSON.parse(saved);
        const updated = history.map(o => {
          if (o.orderNumber === activeOrder.orderNumber) {
            return {
              ...o,
              status: "ขอคืนเงิน" as const,
              cancelReason: selectedReason,
              cancelNote: customReason,
              refundPromptPay: promptPayNumber
            };
          }
          return o;
        });
        localStorage.setItem("ran-lung-get-orders", JSON.stringify(updated));
        window.dispatchEvent(new StorageEvent("storage", {
          key: "ran-lung-get-orders",
          newValue: JSON.stringify(updated)
        }));
      } catch (e) {
        console.error("Cancel failed:", e);
      }
    }

    setShowCancelDialog(false);
    setErrorText("");
  };

  return (
    <div className="min-h-full pb-28 relative w-full" style={{ background: SURFACE }}>
      <div className="max-w-2xl mx-auto w-full">
        {isRefunded && (
          <div className="mx-5 mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col gap-1.5 shadow-xs">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
              <span className="animate-pulse">●</span>
              <span>{t("กำลังดำเนินการคืนเงิน")}</span>
            </div>
            <p className="text-xs text-amber-700 leading-relaxed font-medium">
              {t("ทางครัวกำลังดำเนินการโอนเงินคืนไปยัง:")} <strong className="text-amber-900">{activeOrder?.refundPromptPay}</strong>
            </p>
          </div>
        )}

        {isCancelled && (
          <div className="mx-5 mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 flex flex-col gap-1 shadow-xs">
            <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
              <span>●</span>
              <span>{t("ยกเลิกออเดอร์สำเร็จ")}</span>
            </div>
            <p className="text-xs text-red-700 font-medium">
              {t("ออเดอร์นี้ได้ทำการยกเลิกและคืนเงินเรียบร้อยแล้ว")}
            </p>
          </div>
        )}

        <div className="px-5 py-4 bg-white border-b flex items-center gap-3" style={{ borderColor: "#eef2f6" }}>
          <button
            type="button"
            onClick={onOpenSidebar}
            className="grid h-10 w-10 place-items-center rounded-full cursor-pointer hover:bg-slate-100 transition"
            style={{ background: SURFACE, color: BRAND }}
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-bold" style={{ color: BRAND }}>
            {t("สถานะการสั่งซื้อ")}
          </h1>
        </div>

        <div className="flex flex-col items-center pt-8 pb-6 px-5 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="grid h-20 w-20 place-items-center rounded-full shadow-lg mb-4"
            style={{ background: statusTheme.bg, color: statusTheme.iconColor }}
          >
            <StatusIcon size={38} className="stroke-[2.5]" />
          </motion.div>
          <h2 className="text-xl font-bold mb-1" style={{ color: BRAND }}>
            {statusTheme.title}
          </h2>
          {statusTheme.subtitle && (
            <p className="mt-1 text-xs max-w-xs mx-auto leading-relaxed" style={{ color: INK_MUTED }}>
              {statusTheme.subtitle}
            </p>
          )}

          {activeOrder?.orderType === "takeaway" && activeOrder?.queueNumber && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 px-6 py-2.5 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center bg-purple-50 border-purple-200 w-[90%] mx-auto"
            >
              <span className="text-[10px] uppercase font-black tracking-widest text-purple-600">
                {t("คิวรับอาหารกลับบ้าน")} (Takeaway Queue)
              </span>
              <span className="text-3xl font-black mt-0.5" style={{ color: BRAND }}>
                {activeOrder.queueNumber}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 text-center leading-normal font-bold">
                {t("* โปรดแสดงหมายเลขคิวนี้ต่อพนักงานที่เคาน์เตอร์เพื่อรับอาหาร")}
              </span>
            </motion.div>
          )}
        </div>

        <div className="px-5 space-y-4">
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs" style={{ color: INK_MUTED }}>
                {t("หมายเลขออเดอร์")}
              </p>
              <p className="text-sm font-bold" style={{ color: BRAND }}>
                {activeOrder ? activeOrder.orderNumber : "#AK-2847"}
              </p>
            </div>
            <div className="space-y-2">
              {orderItems.map((o, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span style={{ color: BRAND }}>
                    {tMenu(o.name)} <span style={{ color: INK_MUTED }}>× {o.qty}</span>
                  </span>
                  <span className="font-medium" style={{ color: BRAND }}>
                    ฿{o.price * o.qty}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: "#f1ece4" }}>
              <span className="text-sm" style={{ color: INK_MUTED }}>
                {t("รวมทั้งหมด")}
              </span>
              <span className="text-lg font-bold" style={{ color: BRAND }}>
                ฿{total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Dynamic Tracking Status Block */}
          {currentStatus !== "ขอคืนเงิน" && currentStatus !== "ยกเลิกแล้ว" && (
            <div className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100">
              <h3 className="font-bold mb-4" style={{ color: BRAND }}>
                {t("ติดตามสถานะ")}
              </h3>
              <div className="relative">
                <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-[#eef2f6]" />
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: orderType === "dine-in" ? "50%" : "66%" }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="absolute left-[19px] top-2 w-0.5"
                  style={{ background: BRAND }}
                />
                <div className="space-y-5">
                  {steps.map((s) => {
                    const Icon = s.icon;
                    const isCurrent = s.active;
                    const isDone = s.done;
                    return (
                      <div key={s.id} className="relative flex items-center gap-3">
                        <div
                          className="relative z-10 grid h-10 w-10 place-items-center rounded-full"
                          style={{
                            background: isDone ? BRAND : isCurrent ? GOLD : "#eef2f6",
                            color: isDone ? GOLD : isCurrent ? BRAND : INK_MUTED,
                          }}
                        >
                          <Icon size={18} />
                          {isCurrent && (
                            <motion.span
                              className="absolute inset-0 rounded-full"
                              style={{ background: GOLD }}
                              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                              transition={{ duration: 1.8, repeat: Infinity }}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <p
                            className="text-sm font-semibold"
                            style={{ color: isDone || isCurrent ? BRAND : INK_MUTED }}
                          >
                            {s.label}
                          </p>
                          <p className="text-xs" style={{ color: INK_MUTED }}>
                            {isDone ? t("เสร็จสมบูรณ์") : isCurrent ? t("กำลังดำเนินการ") : t("รอดำเนินการ")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Gacha Wish & Cards Reward Banner */}
          {onOpenGacha && (
            <div className="mt-4 rounded-2xl p-4 bg-linear-to-r from-slate-950 via-indigo-950 to-slate-950 border border-amber-400/30 text-white shadow-lg flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow-md">
                  <Ticket size={20} />
                </div>
                <div>
                  <p className="text-xs font-black text-amber-300">
                    {t("ได้รับตั๋วสุ่มกาชาจากออเดอร์นี้!")}
                  </p>
                  <p className="text-[11px] text-slate-300">
                    {t("นำตั๋วไปสุ่มลุ้นรับส่วนลด 50% และสะสมการ์ดลุงเกตุ")}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onOpenGacha}
                className="px-3.5 py-2 rounded-xl bg-linear-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs shadow-md shrink-0 cursor-pointer active:scale-95 transition-all"
              >
                {t("หมุนกาชาเลย")}
              </button>
            </div>
          )}

          {/* Cancellation Actions */}
          <div className="mt-6 space-y-3">
            {currentStatus === "รอรับออเดอร์" && (
              <button
                type="button"
                onClick={() => setShowCancelDialog(true)}
                className="w-full py-3.5 rounded-full font-bold text-sm transition-all hover:bg-red-50 border border-red-200 text-red-500 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{t("ยกเลิกและขอคืนเงิน")}</span>
              </button>
            )}

            {/* Contact Support button */}
            <a
              href="tel:0891234567"
              className="w-full py-3.5 rounded-full font-bold text-sm bg-white border border-[#ece4d6] text-[#002e47] cursor-pointer active:scale-95 flex items-center justify-center gap-2 hover:bg-slate-50 transition"
            >
              <span>📞 {t("ติดต่อร้านลุงเกตุ (ด่วน)")}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Cancellation Dialog Overlay */}
      <AnimatePresence>
        {showCancelDialog && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCancelDialog(false)}
              className="absolute inset-0 bg-black"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[85vh] z-10 text-[#002e47]"
            >
              <h3 className="text-lg font-black tracking-tight mb-2">{t("ยกเลิกคำสั่งซื้อและขอคืนเงิน")}</h3>
              <p className="text-xs text-slate-500 mb-4">
                {t("กรุณาระบุเหตุผลและข้อมูลพร้อมเพย์สำหรับรับเงินคืนจำนวน")} <strong>฿{total.toLocaleString()}</strong>
              </p>

              {errorText && (
                <div className="mb-3 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold">
                  {errorText}
                </div>
              )}

              <div className="space-y-2 mb-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{t("เหตุผลในการยกเลิก")}</p>
                {cancelReasonsList.map((reason) => (
                  <label
                    key={reason}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition cursor-pointer text-sm font-semibold ${selectedReason === reason
                        ? "border-[#002e47] bg-[#fffcf5]"
                        : "border-[#ece4d6] hover:bg-slate-50"
                      }`}
                  >
                    <input
                      type="radio"
                      name="cancel_reason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={() => {
                        setSelectedReason(reason);
                        setErrorText("");
                      }}
                      className="accent-[#002e47]"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>

              {selectedReason === t("อื่น ๆ (ระบุด้านล่าง)") && (
                <div className="mb-4">
                  <textarea
                    placeholder={t("พิมพ์ระบุเหตุผลการยกเลิกที่นี่...")}
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    rows={3}
                    className="w-full bg-[#fcfbf9] border border-[#ece4d6] rounded-2xl px-4 py-2.5 text-sm font-bold text-[#002e47] focus:outline-none focus:border-[#002e47]/30 transition"
                  />
                </div>
              )}

              <div className="mb-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t("ข้อมูลการรับเงินคืน")}</p>
                <input
                  type="text"
                  placeholder={t("เบอร์พร้อมเพย์ หรือ บัญชีธนาคาร + ชื่อบัญชี")}
                  value={promptPayNumber}
                  onChange={(e) => {
                    setPromptPayNumber(e.target.value);
                    setErrorText("");
                  }}
                  className="w-full bg-[#fcfbf9] border border-[#ece4d6] rounded-2xl px-4 py-2.5 text-sm font-bold text-[#002e47] placeholder-slate-400 focus:outline-none focus:border-[#002e47]/30 transition shadow-inner"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowCancelDialog(false)}
                  className="w-full py-3.5 rounded-full font-bold text-xs bg-slate-100 text-slate-500 cursor-pointer hover:bg-slate-200 transition"
                >
                  {t("ย้อนกลับ")}
                </button>
                <button
                  type="button"
                  onClick={handleRequestCancel}
                  className="w-full py-3.5 rounded-full font-bold text-xs text-white cursor-pointer hover:opacity-95 transition"
                  style={{ background: BRAND }}
                >
                  {t("ยืนยันขอยกเลิก")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

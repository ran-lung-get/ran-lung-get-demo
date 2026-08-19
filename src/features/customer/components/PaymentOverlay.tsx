import { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, CheckCircle, Check, Ticket, QrCode, Banknote, ShieldCheck } from "lucide-react";
import type { CartLine, OrderType } from "../types";
import { BRAND, GOLD } from "../constants/colors";
import { useLanguage } from "../../../lib/i18n";

export function PaymentOverlay({
  total,
  cart,
  orderType,
  deliveryFee,
  subtotal,
  selectedTable: _selectedTable,
  address: _address,
  onBack,
  onSuccess,
}: {
  total: number;
  cart: CartLine[];
  orderType: OrderType;
  deliveryFee: number;
  subtotal: number;
  selectedTable: string;
  address: string;
  onBack: () => void;
  onSuccess: () => void;
}) {
  const { t } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState<"promptpay" | "cash">("promptpay");
  const [submitting, setSubmitting] = useState(false);

  const earnedTickets = Math.max(1, Math.floor(total / 60));

  const handleConfirmOrder = () => {
    if (submitting) return;
    setSubmitting(true);
    onSuccess();
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", duration: 0.3 }}
      className="absolute inset-0 z-50 bg-[var(--surface)] overflow-y-auto no-scrollbar pb-12"
    >
      {/* Header */}
      <div className="w-full" style={{ background: BRAND, color: "white" }}>
        <div className="max-w-2xl mx-auto px-5 pt-5 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              aria-label="ย้อนกลับไปหน้าสั่งอาหาร"
              title="ย้อนกลับไปหน้าสั่งอาหาร"
              className="grid h-10 w-10 place-items-center rounded-full bg-white/10 border border-white/15 cursor-pointer hover:bg-white/20 transition"
            >
              <ChevronLeft size={20} color={GOLD} />
            </button>
            <h1 className="text-lg font-bold">{t("ชำระเงินค่าอาหาร")}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-5 space-y-4">
        {/* Order Summary Box */}
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-100 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-sm font-bold text-slate-800">{t("สรุปรายการสั่งซื้อ")}</span>
            <span className="text-xs text-slate-400 font-medium">({cart.length} {t("รายการ")})</span>
          </div>

          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>{t("ยอดรวมอาหาร")}</span>
              <span>฿{subtotal.toLocaleString()}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>{t("ค่าจัดส่ง")}</span>
                <span>฿{deliveryFee.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-slate-100 font-bold text-slate-800 text-base">
              <span>{t("ยอดชำระทั้งหมด")}</span>
              <span style={{ color: BRAND }}>฿{total.toLocaleString()}</span>
            </div>

            {/* Ticket Reward Preview */}
            <div className="mt-2.5 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-900 text-xs font-black">
              <Ticket size={15} className="text-amber-600 shrink-0" />
              <span>
                {t("สั่งซื้อออเดอร์นี้ รับตั๋วสุ่มกาชาฟรี")} +{earnedTickets} {t("ใบ")}! 🎫
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-100 space-y-3">
          <h3 className="text-sm font-bold text-slate-800">{t("เลือกวิธีการชำระเงิน")}</h3>

          <div className="grid grid-cols-2 gap-3">
            {/* PromptPay */}
            <button
              type="button"
              onClick={() => setPaymentMethod("promptpay")}
              className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-2 cursor-pointer ${
                paymentMethod === "promptpay"
                  ? "border-[#002e47] bg-[#002e47]/5 shadow-xs"
                  : "border-slate-100 bg-white hover:bg-slate-50"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                  paymentMethod === "promptpay" ? "bg-[#002e47] text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                <QrCode size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">{t("พร้อมเพย์ QR Code")}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{t("สแกนจ่ายผ่านแอปธนาคาร")}</p>
              </div>
            </button>

            {/* Cash */}
            <button
              type="button"
              onClick={() => setPaymentMethod("cash")}
              className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-2 cursor-pointer ${
                paymentMethod === "cash"
                  ? "border-emerald-600 bg-emerald-50 shadow-xs"
                  : "border-slate-100 bg-white hover:bg-slate-50"
              }`}
            >
              <div
                className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors ${
                  paymentMethod === "cash" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                }`}
              >
                <Banknote size={20} />
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">
                  {orderType === "delivery" ? t("เก็บเงินสดปลายทาง") : t("เงินสด / ชำระที่เคาน์เตอร์")}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">{t("จ่ายเมื่อรับอาหาร")}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Selected Method Details */}
        {paymentMethod === "promptpay" ? (
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-100 flex flex-col items-center text-center space-y-4">
            {/* PromptPay Header */}
            <div className="w-full bg-[#003c71] text-white py-2 px-4 rounded-xl flex items-center justify-between">
              <span className="font-extrabold text-xs tracking-wider">Thai QR Payment</span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded font-bold">PromptPay</span>
            </div>

            {/* QR Code Frame */}
            <div className="p-3 bg-white rounded-2xl border-2 border-slate-200 shadow-inner">
              <MockQR />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500">{t("DineOS")}</p>
              <p className="text-2xl font-black" style={{ color: BRAND }}>
                ฿{total.toLocaleString()}
              </p>
              <p className="text-[11px] text-slate-400 pt-1">
                {t("สแกน QR Code เพื่อชำระเงิน และกดปุ่มยืนยันด้านล่าง")}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-100 space-y-3">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200/60">
              <div className="h-12 w-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Banknote size={24} />
              </div>
              <div className="text-left">
                <p className="text-xs font-black text-emerald-950">
                  {orderType === "delivery" ? t("เก็บเงินสดปลายทาง") : t("เงินสด / ชำระที่เคาน์เตอร์")}
                </p>
                <p className="text-[11px] text-emerald-800 mt-0.5 leading-relaxed">
                  {orderType === "delivery"
                    ? t("กรุณาเตรียมเงินสดให้พอดีกับยอดสั่งซื้อเมื่อรับอาหาร")
                    : t("สามารถชำระเงินสดได้ที่เคาน์เตอร์ของร้าน หรือกับพนักงาน")}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <span className="font-bold text-slate-600">{t("ยอดที่ต้องชำระ")}</span>
              <span className="text-base font-black text-slate-900">฿{total.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>{t("ระบบรับออเดอร์ส่งตรงถึงครัว DineOS ทันที")}</span>
        </div>

        {/* Submit Button */}
        <div className="pb-8 pt-2">
          <button
            type="button"
            onClick={handleConfirmOrder}
            disabled={submitting}
            className="w-full h-14 rounded-full font-bold text-white shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            style={{
              background: `linear-gradient(135deg, ${BRAND} 0%, #001f30 100%)`,
            }}
          >
            <CheckCircle size={18} />
            <span>
              {paymentMethod === "promptpay"
                ? `${t("ยืนยันว่าชำระเงินแล้ว")} · ฿${total.toLocaleString()}`
                : `${t("ยืนยันคำสั่งซื้อ (จ่ายเงินสด)")} · ฿${total.toLocaleString()}`}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function MockQR() {
  const cells = 25;
  const size = 190;
  const c = size / cells;
  const rand = (i: number, j: number) => ((i * 73 + j * 137 + i * j * 31) % 7) < 3;
  const dots = [];
  for (let i = 0; i < cells; i++)
    for (let j = 0; j < cells; j++) if (rand(i, j)) dots.push({ i, j });

  const Corner = ({ x, y }: { x: number; y: number }) => (
    <g>
      <rect x={x} y={y} width={c * 7} height={c * 7} fill="#002e47" rx={4} />
      <rect x={x + c} y={y + c} width={c * 5} height={c * 5} fill="white" rx={2} />
      <rect x={x + c * 2} y={y + c * 2} width={c * 3} height={c * 3} fill="#002e47" rx={1} />
    </g>
  );

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" />
      {dots.map((d, k) => {
        if ((d.i < 8 && d.j < 8) || (d.i < 8 && d.j > cells - 9) || (d.i > cells - 9 && d.j < 8))
          return null;
        return <rect key={k} x={d.i * c} y={d.j * c} width={c} height={c} fill="#002e47" />;
      })}
      <Corner x={0} y={0} />
      <Corner x={size - c * 7} y={0} />
      <Corner x={0} y={size - c * 7} />
    </svg>
  );
}

export function SuccessFlash({ earnedTickets }: { earnedTickets?: number }) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: BRAND }}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200 }}
          className="grid h-20 w-20 place-items-center rounded-full shadow-xl"
          style={{ background: GOLD }}
        >
          <Check size={40} color={BRAND} strokeWidth={3} />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-white font-bold text-lg"
        >
          {t("ชำระเงินสำเร็จ")}
        </motion.p>
        {earnedTickets && earnedTickets > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.35, type: "spring" }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-lg"
          >
            <Ticket size={16} />
            <span>
              {t("ได้รับตั๋วสุ่มกาชา")} +{earnedTickets} {t("ใบ")}! 🎫
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

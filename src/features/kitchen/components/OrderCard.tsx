import { useState } from "react";
import {
  Utensils,
  Bike,
  ShoppingBag,
  ShieldAlert,
  RotateCcw,
} from "lucide-react";
import type { OrderHistory } from "../types";
import { OrderTimer } from "./OrderTimer";

const BRAND = "#002e47";
const GOLD = "#fcc14a";

export function OrderCard({
  order,
  advanceOrderStatus,
  regressOrderStatus,
}: {
  order: OrderHistory;
  advanceOrderStatus: (id: string, current: string) => void;
  regressOrderStatus: (id: string, current: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isWaiting = order.status === "รอดำเนินการ" || order.status === "รอรับออเดอร์";
  const isCooking = order.status === "กำลังทำ" || order.status === "กำลังเตรียม";
  const isReady = order.status === "พร้อมเสิร์ฟ";
  const isCompleted = order.status === "สำเร็จ";
  const isRefund = order.status === "ขอคืนเงิน";

  let borderClass = "border-[#ece4d6]";
  let actionBtnText = "เริ่มทำ";
  let actionBtnColor = "bg-[#002e47] text-white hover:bg-[#001f30]";
  
  if (isRefund) {
    borderClass = "border-red-500 shadow-[0_8px_20px_rgba(239,68,68,0.12)] bg-red-50/15";
    actionBtnText = "โอนเงินคืน & ยกเลิก";
    actionBtnColor = "bg-red-600 hover:bg-red-700 text-white";
  } else if (isWaiting) {
    borderClass = "border-amber-400/80 shadow-[0_8px_20px_rgba(245,158,11,0.06)]";
    actionBtnText = "เริ่มปรุงอาหาร";
    actionBtnColor = "bg-blue-600 hover:bg-blue-700 text-white";
  } else if (isCooking) {
    borderClass = "border-blue-400/80 shadow-[0_8px_20px_rgba(37,99,235,0.06)]";
    actionBtnText = "ทำเสร็จแล้ว";
    actionBtnColor = "bg-emerald-600 hover:bg-emerald-700 text-white";
  } else if (isReady) {
    borderClass = "border-emerald-400/80 shadow-[0_8px_20px_rgba(16,185,129,0.06)]";
    actionBtnText = "เสิร์ฟแล้ว / ปิดคิว";
    actionBtnColor = "bg-slate-700 hover:bg-slate-800 text-white";
  }

  let bannerBg = "bg-amber-100 text-[#002e47]";
  let typeLabel = "ทานที่ร้าน";
  let typeIcon = (
    <div className="p-1 rounded-lg bg-amber-500/20 text-[#002e47] flex items-center justify-center shrink-0">
      <Utensils size={18} className="stroke-[2.5]" />
    </div>
  );
  let detailsText = order.tableNumber || "ไม่ระบุโต๊ะ";
  let detailsLarge = true;
  let cardBg = "bg-[#fffdf5]";
  let leftBorderClass = "border-l-[8px] border-l-amber-500";

  if (order.orderType === "delivery") {
    bannerBg = "bg-blue-100 text-blue-800 border-b border-blue-200";
    typeLabel = "จัดส่งถึงที่ (Delivery)";
    typeIcon = (
      <div className="p-1 rounded-lg bg-blue-600/20 text-blue-800 flex items-center justify-center shrink-0">
        <Bike size={18} className="stroke-[2.5]" />
      </div>
    );
    detailsText = order.customerName || "คุณลูกค้า";
    detailsLarge = false;
    cardBg = "bg-[#f4faff]";
    leftBorderClass = "border-l-[8px] border-l-blue-600";
  } else if (order.orderType === "takeaway") {
    bannerBg = "bg-purple-100 text-purple-800 border-b border-purple-200";
    typeLabel = "รับกลับบ้าน (Takeaway)";
    typeIcon = (
      <div className="p-1 rounded-lg bg-purple-600/20 text-purple-800 flex items-center justify-center shrink-0">
        <ShoppingBag size={18} className="stroke-[2.5]" />
      </div>
    );
    detailsText = order.customerName || "คุณลูกค้า";
    detailsLarge = false;
    cardBg = "bg-[#faf8ff]";
    leftBorderClass = "border-l-[8px] border-l-purple-500";
  }

  return (
    <div
      className={`shrink-0 rounded-2xl border-2 overflow-hidden flex flex-col shadow-xs transition-colors duration-300 ${cardBg} ${leftBorderClass} ${borderClass} ${
        isRefund ? "animate-[pulse_2s_infinite]" : ""
      }`}
    >
      {/* Flashing Refund Requested Alert Header */}
      {isRefund && (
        <div className="bg-red-500 text-white text-xs font-black px-4 py-2 flex items-center justify-between border-b border-red-600 animate-pulse">
          <div className="flex items-center gap-1.5">
            <ShieldAlert size={14} />
            <span>⚠️ ลูกค้าขอคืนเงิน</span>
          </div>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-extrabold">
            ยอดคืน ฿{order.total}
          </span>
        </div>
      )}

      {/* High-Contrast Dine-In vs Delivery Top Banner */}
      <div className={`px-4 py-3 flex items-center justify-between ${bannerBg}`}>
        <div className="flex items-center gap-2">
          {typeIcon}
          <span className="text-xs font-black uppercase tracking-wider">
            {typeLabel}
          </span>
        </div>
        <div>
          {detailsLarge ? (
            <span className="text-xl font-black tracking-tight uppercase" style={{ color: BRAND }}>
              {detailsText}
            </span>
          ) : (
            <span className="text-xs font-black truncate max-w-[140px] inline-block">
              {detailsText}
            </span>
          )}
        </div>
      </div>

      {/* Card Info Bar */}
      <div className="px-4 py-2 bg-[#002e47]/5 border-b border-slate-200/60 flex items-center justify-between">
        <span className="text-xs font-extrabold text-[#002e47]">
          ออเดอร์ {order.orderNumber}
        </span>
        {!isCompleted && <OrderTimer id={order.id} />}
      </div>

      {/* Ordered Menu Items */}
      <div className="flex-1 p-4 space-y-3.5 bg-transparent">
        {order.items.map((item, idx) => {
          const parts = item.name.split(" (");
          const name = parts[0];
          const choices = parts[1] ? parts[1].replace(")", "") : "";

          return (
            <div key={idx} className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <span className="text-[15px] sm:text-base font-black text-[#002e47] leading-snug block">
                  {name}
                </span>
                {choices && (
                  <span className="text-[10px] font-bold text-[#5a6e7a] mt-0.5 bg-[#f1ece4]/80 px-1.5 py-0.5 rounded inline-block">
                    {choices}
                  </span>
                )}
              </div>
              <div className="shrink-0 flex items-center justify-center">
                <span 
                  className="text-base font-black text-[#002e47] px-2.5 py-1 rounded-lg border border-[#002e47]/10 shadow-xs min-w-[42px] text-center"
                  style={{ background: GOLD }}
                >
                  x{item.qty}
                </span>
              </div>
            </div>
          );
        })}

        {/* Special Instructions & Notes */}
        {order.note && (
          <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl">
            <span className="text-[9px] font-bold text-red-600 uppercase tracking-wider block mb-0.5">
              หมายเหตุลูกค้า:
            </span>
            <span className="text-xs font-extrabold text-red-700 animate-pulse block leading-normal">
              * {order.note}
            </span>
          </div>
        )}

        {/* Refund Requested Details Banner */}
        {isRefund && (
          <div className="space-y-2.5">
            <div className="p-2.5 bg-red-50/50 border border-red-100 rounded-xl">
              <span className="text-[9px] font-bold text-red-600 uppercase tracking-wider block mb-0.5">
                เหตุผลขอคืนเงิน:
              </span>
              <span className="text-xs font-extrabold text-red-700 block leading-normal">
                {order.cancelReason}
                {order.cancelNote && (
                  <span className="block mt-0.5 text-[10px] text-slate-500 font-medium italic">
                    "{order.cancelNote}"
                  </span>
                )}
              </span>
            </div>

            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2">
              <div className="min-w-0">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  ช่องทางคืนเงิน:
                </span>
                <span className="text-xs font-extrabold text-[#002e47] block truncate">
                  {order.refundPromptPay}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(order.refundPromptPay || "").catch(() => {});
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className={`text-[9px] font-bold px-2 py-1 rounded-md shrink-0 transition active:scale-95 cursor-pointer ${
                  copied
                    ? "bg-emerald-500 text-white"
                    : "bg-white border border-[#ece4d6] text-[#002e47] hover:bg-slate-50"
                }`}
              >
                {copied ? "ก๊อปปี้แล้ว" : "ก๊อปปี้"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Actions Section */}
      <div className="p-3 bg-[#002e47]/5 border-t border-slate-200/60 flex gap-2">
        {!isWaiting && !isCompleted && !isRefund && (
          <button
            type="button"
            onClick={() => regressOrderStatus(order.id, order.status)}
            className="p-2.5 bg-white hover:bg-slate-100 text-[#5a6e7a] border border-slate-200 rounded-xl active:scale-95 transition flex items-center justify-center cursor-pointer shadow-xs"
            title="ย้อนกลับขั้นตอนที่แล้ว"
          >
            <RotateCcw size={16} />
          </button>
        )}
        
        {isRefund ? (
          <button
            type="button"
            onClick={() => setShowConfirm(true)}
            className="flex-1 py-3 rounded-xl font-black text-xs tracking-wider uppercase transition-colors duration-300 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-xs bg-red-600 hover:bg-red-700 text-white"
          >
            โอนเงินคืนสำเร็จ & ยกเลิก
          </button>
        ) : !isCompleted ? (
          <button
            type="button"
            onClick={() => advanceOrderStatus(order.id, order.status)}
            className={`flex-1 py-3 rounded-xl font-black text-xs tracking-wider uppercase transition-colors duration-300 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-xs ${actionBtnColor}`}
          >
            {actionBtnText}
          </button>
        ) : (
          <div className="flex-1 py-2 text-center text-[#5a6e7a] text-xs font-bold bg-slate-100 rounded-xl">
            ออเดอร์สำเร็จแล้ว
          </div>
        )}
      </div>

      {/* Confirm Action Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setShowConfirm(false)}
          />
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm z-10 border border-[#ece4d6] shadow-2xl relative text-[#002e47]">
            <h4 className="text-base font-black tracking-tight mb-2">
              ยืนยันการคืนเงิน & ยกเลิกออเดอร์
            </h4>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
              กรุณาโอนเงินคืนสำเร็จจำนวน <strong>฿{order.total}</strong> ไปยัง <strong>{order.refundPromptPay}</strong> เรียบร้อยแล้วก่อนกดยืนยันปุ่มนี้
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="w-full py-2.5 rounded-xl font-bold text-[10px] bg-slate-100 text-slate-500 cursor-pointer hover:bg-slate-200"
              >
                ย้อนกลับ
              </button>
              <button
                type="button"
                onClick={() => {
                  advanceOrderStatus(order.id, order.status);
                  setShowConfirm(false);
                }}
                className="w-full py-2.5 rounded-xl font-bold text-[10px] text-white cursor-pointer hover:opacity-95 bg-emerald-600"
              >
                โอนเรียบร้อยแล้ว
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

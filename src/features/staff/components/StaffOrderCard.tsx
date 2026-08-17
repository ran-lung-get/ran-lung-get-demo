import { RotateCcw, Check, Trash2 } from "lucide-react";
import type { OrderHistory } from "../types";

export function StaffOrderCard({
  order,
  advanceOrderStatus,
  regressOrderStatus,
  cancelOrder,
}: {
  order: OrderHistory;
  advanceOrderStatus: (id: string) => void;
  regressOrderStatus: (id: string) => void;
  cancelOrder: (id: string) => void;
}) {
  const isDineIn = order.orderType === "dine-in";
  const isTakeaway = order.orderType === "takeaway";
  const isDelivery = order.orderType === "delivery";
  let typeBadge = "ทานที่ร้าน";
  let typeColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
  let borderLeftColor = "border-l-[#fcc14a]";
  if (isTakeaway) {
    typeBadge = "กลับบ้าน";
    typeColor = "bg-blue-50 text-blue-800 border-blue-200";
    borderLeftColor = "border-l-[#5a6e7a]";
  } else if (isDelivery) {
    typeBadge = "เดลิเวอรี่";
    typeColor = "bg-amber-50 text-amber-800 border-amber-200";
    borderLeftColor = "border-l-[#002e47]";
  }

  const isCooking = (s: string) => s === "กำลังทำ" || s === "กำลังเตรียม" || s === "preparing";
  const isReady = (s: string) => s === "พร้อมเสิร์ฟ" || s === "ready";
  const isDelivering = (s: string) => s === "กำลังจัดส่ง" || s === "delivering";
  const isWaiting = (s: string) => s === "รอดำเนินการ" || s === "รอรับออเดอร์" || s === "pending";

  let nextBtnText = "เริ่มทำครัว";
  let nextBtnColor = "bg-[#002e47] text-white hover:bg-[#003957]";
  if (isCooking(order.status)) {
    nextBtnText = isDelivery ? "ปรุงเสร็จ · รอไรเดอร์" : "ปรุงสำเร็จ";
    nextBtnColor = "bg-blue-600 text-white hover:bg-blue-700";
  } else if (isReady(order.status)) {
    if (isDelivery) {
      nextBtnText = "มอบให้ไรเดอร์ (กำลังส่ง)";
      nextBtnColor = "bg-indigo-600 text-white hover:bg-indigo-700";
    } else {
      nextBtnText = "ส่งเสิร์ฟสำเร็จ";
      nextBtnColor = "bg-emerald-600 text-white hover:bg-emerald-700";
    }
  } else if (isDelivering(order.status)) {
    nextBtnText = "ส่งถึงแล้ว · สำเร็จ";
    nextBtnColor = "bg-slate-800 text-white hover:bg-slate-900";
  }

  return (
    <div className={`bg-white border-2 border-l-[6px] border-[#ece4d6] ${borderLeftColor} rounded-2xl p-4 shadow-xs hover:shadow-sm transition relative space-y-3`}>
      <div className="flex items-center justify-between">
        <div>
          <span className="font-black text-[#002e47] text-sm">{order.orderNumber}</span>
          <span className="text-[10px] text-slate-400 ml-1.5 font-bold">
            {order.date.includes(" · ") ? order.date.split(" · ")[1] : order.date}
          </span>
        </div>
        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${typeColor}`}>
          {typeBadge}
        </span>
      </div>
      <div className="pt-2 border-t border-slate-100">
        <p className="text-[10px] font-bold text-slate-400">รายละเอียดลูกค้า:</p>
        <p className="text-xs font-black text-[#002e47] mt-0.5">
          {order.customerName || "คุณลูกค้า"} {isDineIn && order.tableNumber && `(โต๊ะ ${order.tableNumber})`}
        </p>
      </div>
      <div className="space-y-1.5">
        {order.items.map((i, idx) => (
          <div key={idx} className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-700">{i.name}</span>
            <span className="font-black bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">x{i.qty}</span>
          </div>
        ))}
      </div>
      {order.note && (
        <div className="p-2 bg-red-50/50 border border-red-100 rounded-xl text-[10px] font-black text-red-700">
          💡 หมายเหตุ: {order.note}
        </div>
      )}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
        <button
          type="button"
          onClick={() => regressOrderStatus(order.id)}
          disabled={isWaiting(order.status)}
          className="p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-slate-600 transition disabled:opacity-50"
        >
          <RotateCcw size={13} />
        </button>
        <button
          type="button"
          onClick={() => advanceOrderStatus(order.id)}
          className={`flex-1 py-1.5 rounded-xl text-[11px] font-black tracking-wide shadow-xs transition flex items-center justify-center gap-1 cursor-pointer ${nextBtnColor}`}
        >
          <Check size={11} />
          <span>{nextBtnText}</span>
        </button>
        <button
          type="button"
          onClick={() => cancelOrder(order.id)}
          className="p-1.5 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl text-red-600 transition"
        >
          <Trash2 size={13} />
        </button>
      </div>
    </div>
  );
}

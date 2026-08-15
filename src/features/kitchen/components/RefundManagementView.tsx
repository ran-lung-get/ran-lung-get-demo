import { useState, useEffect, useMemo } from "react";
import type { OrderHistory } from "../types";

export function RefundManagementView() {
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderHistory | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("ran-lung-get-orders");
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse orders:", e);
      }
    }

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "ran-lung-get-orders" && e.newValue) {
        try {
          setOrders(JSON.parse(e.newValue));
        } catch (err) {
          console.error(err);
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const refundRequests = useMemo(() => {
    return orders.filter((o) => o.status === "ขอคืนเงิน");
  }, [orders]);

  const handleCopy = (promptPay: string, orderId: string) => {
    navigator.clipboard?.writeText(promptPay).catch(() => {});
    setCopiedId(orderId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleConfirmRefund = (orderId: string) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status: "ยกเลิกแล้ว" };
      }
      return o;
    });

    setOrders(updated);
    localStorage.setItem("ran-lung-get-orders", JSON.stringify(updated));
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "ran-lung-get-orders",
        newValue: JSON.stringify(updated),
      })
    );
    setSelectedOrder(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-xs flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black tracking-tight text-[#002e47]">
            คำขอคืนเงิน & ยกเลิกออเดอร์
          </h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            รายการขอยกเลิกและแจ้งคืนเงินจากลูกค้า (ตรวจสอบสลิปการโอนและสิทธิ์ยกเลิก)
          </p>
        </div>
        <div className="bg-red-50 text-red-600 font-extrabold text-xs px-3.5 py-1.5 rounded-full border border-red-100 flex items-center gap-1.5">
          <span className="animate-pulse">●</span>
          <span>ค้างดำเนินการ: {refundRequests.length} รายการ</span>
        </div>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {refundRequests.length === 0 ? (
          <div className="py-16 text-center text-slate-400 font-bold col-span-full bg-white rounded-3xl border border-[#ece4d6] p-6 shadow-xs">
            ไม่มีคำขอคืนเงินค้างอยู่ในขณะนี้
          </div>
        ) : (
          refundRequests.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-red-100 rounded-3xl p-5 shadow-xs hover:shadow-md transition relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-red-500" />

              <div className="space-y-4">
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h3 className="font-black text-[#002e47] text-base">
                      {order.orderNumber}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                      {order.date}
                    </p>
                  </div>
                  <span className="text-xs font-black text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md">
                    ขอคืนเงิน
                  </span>
                </div>

                <div className="bg-[#fcfbf9] border border-[#ece4d6] rounded-2xl p-3 text-xs space-y-1.5">
                  <p className="font-extrabold text-[#002e47] mb-1">รายการอาหาร</p>
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between font-semibold text-slate-600">
                      <span>
                        {item.name} <span className="text-[10px] text-slate-400">×{item.qty}</span>
                      </span>
                      <span>฿{item.price * item.qty}</span>
                    </div>
                  ))}
                  <div className="border-t border-[#ece4d6] pt-1.5 mt-1 flex justify-between font-bold text-[#002e47]">
                    <span>ยอดคืนเงินรวม</span>
                    <span className="text-sm">฿{order.total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-extrabold text-[#5a6e7a] tracking-wider uppercase">
                    เหตุผลในการยกเลิก
                  </p>
                  <p className="text-xs font-semibold text-red-600 bg-red-50/50 p-2.5 rounded-xl border border-red-100/50 leading-relaxed">
                    {order.cancelReason}
                    {order.cancelNote && (
                      <span className="block mt-1 text-[11px] text-slate-500 font-medium italic">
                        "{order.cancelNote}"
                      </span>
                    )}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-extrabold text-[#5a6e7a] tracking-wider uppercase">
                    ข้อมูลโอนเงินคืน
                  </p>
                  <div className="flex items-center justify-between gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <span className="text-xs font-black text-[#002e47] truncate">
                      {order.refundPromptPay}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(order.refundPromptPay || "", order.id)}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg shrink-0 transition active:scale-95 cursor-pointer ${
                        copiedId === order.id
                          ? "bg-emerald-500 text-white"
                          : "bg-white border border-[#ece4d6] text-[#002e47] hover:bg-slate-50"
                      }`}
                    >
                      {copiedId === order.id ? "ก๊อปปี้แล้ว" : "ก๊อปปี้"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(order)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#002e47] text-white hover:opacity-95 transition cursor-pointer text-center"
                >
                  ดำเนินการคืนเงิน
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Confirmation Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedOrder(null)}
          />
          <div className="bg-white rounded-3xl p-6 w-full max-w-md z-10 border border-[#ece4d6] shadow-2xl relative text-[#002e47]">
            <h3 className="text-lg font-black tracking-tight mb-2">
              ยืนยันการคืนเงิน & ยกเลิกออเดอร์
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              กรุณาทำรายการโอนเงินคืนนอกระบบจำนวน <strong>฿{selectedOrder.total.toLocaleString()}</strong> 
              ไปยังพร้อมเพย์ <strong>{selectedOrder.refundPromptPay}</strong> ให้สำเร็จก่อนกดยืนยันปุ่มนี้
            </p>

            <div className="space-y-3 mb-5 p-3.5 bg-red-50/50 rounded-2xl border border-red-100 text-xs">
              <div className="flex justify-between font-semibold">
                <span>เลขออเดอร์:</span>
                <span className="font-bold">{selectedOrder.orderNumber}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>ช่องทางคืนเงิน:</span>
                <span className="font-black text-red-600">{selectedOrder.refundPromptPay}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>ยอดเงินที่ต้องโอนคืน:</span>
                <span className="font-black text-base text-red-600">฿{selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="w-full py-3 rounded-xl font-bold text-xs bg-slate-100 text-slate-500 cursor-pointer hover:bg-slate-200"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={() => handleConfirmRefund(selectedOrder.id)}
                className="w-full py-3 rounded-xl font-bold text-xs text-white cursor-pointer hover:opacity-95 bg-emerald-600"
              >
                ยืนยันการโอนสำเร็จ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

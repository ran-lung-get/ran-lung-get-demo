import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { supabase } from "../../lib/supabase";
import { adjustStockFromOrder, getIngredients, updateIngredientStock, addIngredient, deleteIngredient } from "../../lib/supabase.service";
import { MENU, MenuItem } from "../customer/index";
import {
  ChefHat,
  CheckCircle,
  Clock,
  RotateCcw,
  Volume2,
  VolumeX,
  PlusCircle,
  Filter,
  Check,
  Utensils,
  Bike,
  ShoppingBag,
  Home,
  Trash2,
  Flame,
  Inbox,
  Trophy,
  ClipboardList,
  Menu,
  LayoutDashboard,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  Edit2,
  X,
  LayoutGrid,
  Table
} from "lucide-react";

// Types matching index.tsx
type OrderType = "dine-in" | "takeaway" | "delivery";
type OrderHistory = {
  id: string;
  orderNumber: string;
  date: string;
  items: { name: string; qty: number; price: number; image: string }[];
  subtotal: number;
  delivery: number;
  total: number;
  status: string; // "รอดำเนินการ" | "กำลังเตรียม" | "กำลังทำ" | "พร้อมเสิร์ฟ" | "สำเร็จ"
  orderType?: OrderType;
  customerName?: string;
  phone?: string;
  tableNumber?: string;
  queueNumber?: string;
  note?: string;
};

export const Route = createFileRoute("/staff/")({
  component: KitchenMonitor,
});

// Color design constants matching the customer ordering app
const BRAND = "#002e47";
const GOLD = "#fcc14a";
const INK_MUTED = "#5a6e7a";
const LINEN = "#fff8f2";
const SURFACE = "#f8fafc";

// Helper to extract timestamp from order ID for ticking timers
const getTimestampFromOrderId = (id: string) => {
  if (id.startsWith("hist_")) {
    const tsString = id.replace("hist_", "");
    const ts = parseInt(tsString);
    if (!isNaN(ts) && ts > 1000000000000) {
      return ts;
    }
  }
  if (id === "hist_1") return Date.now() - 15 * 60 * 1000; // 15 mins ago
  if (id === "hist_2") return Date.now() - 30 * 60 * 1000; // 30 mins ago
  return Date.now();
};

// Web Audio API Synthesized Chime Sound
function playNotificationSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // Play a "Ding-Dong" chime (D5 followed by A4)
    // Ding
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
    gain1.gain.setValueAtTime(0.12, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.6);

    // Dong
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(440.00, ctx.currentTime + 0.22);
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.setValueAtTime(0.12, ctx.currentTime + 0.22);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.22);
    osc2.stop(ctx.currentTime + 0.85);
  } catch (e) {
    console.error("Audio chime synthesiser:", e);
  }
}

// Live ticking timer component for kitchen order cards
function OrderTimer({ id }: { id: string }) {
  const [elapsed, setElapsed] = useState("");
  const [isDelayed, setIsDelayed] = useState(false);

  useEffect(() => {
    const timestamp = getTimestampFromOrderId(id);

    const updateTimer = () => {
      const diffSecs = Math.floor((Date.now() - timestamp) / 1000);
      const minutes = Math.floor(diffSecs / 60);
      const seconds = diffSecs % 60;
      setElapsed(`${minutes}:${seconds.toString().padStart(2, "0")} น.`);
      setIsDelayed(minutes >= 10); // Turn red after 10 mins (SLA exceeded)
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg border font-mono font-bold text-[11px] tracking-wider transition ${isDelayed
        ? "text-red-600 bg-red-50 border-red-200 animate-pulse"
        : "text-[#5a6e7a] bg-[#f8fafc] border-slate-200/80"
      }`}>
      <Clock size={10} className={isDelayed ? "text-red-500" : "text-[#5a6e7a]"} />
      <span>{elapsed}</span>
    </div>
  );
}

// Mock items and lists for order generation
const MENU_ITEMS_FOR_SIMULATION = [
  { name: "กระเพราหมูสับ (ข้าวราด)", price: 60, category: "signature", image: "/meal/krapao.jpg" },
  { name: "ผัดพริกเผา (ข้าวราด)", price: 65, category: "signature", image: "/meal/pad_tua_sea.jpg" },
  { name: "ผัดซีอิ๊ว (เส้นใหญ่)", price: 70, category: "noodles", image: "/meal/pad_see_ew.jpg" },
  { name: "ข้าวผัดกระเทียม (ข้าวผัด)", price: 70, category: "rice", image: "/meal/fried_rice.jpg" },
  { name: "กระเพราหมูกรอบ (ข้าวราด)", price: 70, category: "signature", image: "/meal/krapao.jpg" },
  { name: "ผัดคะน้าหมูกรอบ (ข้าวราด)", price: 70, category: "main", image: "/meal/pad_pak.jpg" },
  { name: "น้ำลำไย", price: 45, category: "drinks", image: "/meal/longan_juice.jpg" },
  { name: "น้ำส้มคั้น", price: 50, category: "drinks", image: "/meal/orange_juice.jpg" },
  { name: "เฉาก๊วย", price: 40, category: "dessert", image: "/meal/grass_jelly.webp" },
];

const CUSTOMER_NAMES = ["คุณ นนท์", "คุณ แพรว", "คุณ บาส", "คุณ ส้ม", "คุณ โอม", "คุณ พั้นช์", "คุณ พิม", "คุณ ต้น"];
const TABLES = ["โต๊ะ 1", "โต๊ะ 2", "โต๊ะ 3", "โต๊ะ 4", "โต๊ะ 5", "โต๊ะ 6", "โต๊ะ 7", "โต๊ะ 8"];
const SPICY_LEVELS = ["ไม่เผ็ด", "เผ็ดน้อย", "เผ็ดกลาง", "เผ็ดมาก"];
const NOTES = [
  "ขอไข่แดงไม่สุกนะค้าบ",
  "เผ็ดจัดจ้านพิเศษ",
  "ไม่ใส่กระเทียม",
  "ขอแห้งๆ ผัดไม่แฉะ",
  "ไม่ใส่ต้นหอมผักชี",
  "ขอกะเพราเน้นๆ พริกแห้ง",
  "ไข่ดาวสุกกรอบๆ",
];

// POS History Order Row Component for completed orders (Image 2 style)
function HistoryOrderRow({ order }: { order: OrderHistory }) {
  const isDineIn = order.orderType === "dine-in";
  const isDelivery = order.orderType === "delivery";
  const isTakeaway = order.orderType === "takeaway";

  let typeLabel = "ทานที่ร้าน";
  let detailsText = order.tableNumber || "ไม่ระบุโต๊ะ";
  let typeIcon = <Utensils size={14} />;

  if (isDelivery) {
    typeLabel = "จัดส่งถึงที่";
    detailsText = order.customerName || "คุณลูกค้า";
    typeIcon = <Bike size={14} />;
  } else if (isTakeaway) {
    typeLabel = order.queueNumber ? `รับกลับบ้าน (คิว ${order.queueNumber})` : "รับกลับบ้าน";
    detailsText = order.customerName || "คุณลูกค้า";
    typeIcon = <ShoppingBag size={14} />;
  }

  // Items string
  const itemsSummary = order.items.map(item => `${item.name.split(" (")[0]} x${item.qty}`).join(", ");

  return (
    <div className="bg-[#fcfbf9] hover:bg-[#f6f3ed] border border-[#ece4d6] rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 sm:gap-4 transition shadow-sm">
      {/* Left side: circular check icon */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-[#5a6e7a]/40 bg-[#f8fafc] text-[#5a6e7a] flex items-center justify-center shrink-0 shadow-sm">
          <Check size={20} className="stroke-[3]" />
        </div>

        {/* Order channel / account details */}
        <div>
          <div className="flex items-center gap-1 text-[10px] font-bold text-[#5a6e7a] uppercase tracking-wide">
            {typeIcon}
            <span>{typeLabel}</span>
          </div>
          <p className="text-sm font-black text-[#002e47] mt-0.5">
            {detailsText}
          </p>
        </div>
      </div>

      {/* Right side: Items list, Order number, and Total */}
      <div className="text-right flex flex-col justify-between items-end min-w-0 max-w-[55%] sm:max-w-[65%]">
        <p className="text-xs font-bold text-[#002e47] truncate w-full text-right" title={itemsSummary}>
          {itemsSummary}
        </p>
        <span className="text-[10px] font-extrabold text-[#5a6e7a] tracking-wider mt-1">
          ออเดอร์ {order.orderNumber}
        </span>
        <span className="text-[10px] font-black text-[#5a6e7a] mt-1 bg-[#5a6e7a]/10 px-2 py-0.5 rounded-lg">
          ยอดรวม: ฿{order.total}
        </span>
      </div>
    </div>
  );
}

// POS Order Card Component with brand colors, large text, and big banners
function OrderCard({
  order,
  advanceOrderStatus,
  regressOrderStatus,
  cancelOrder,
}: {
  order: OrderHistory;
  advanceOrderStatus: (id: string, current: string) => void;
  regressOrderStatus: (id: string, current: string) => void;
  cancelOrder: (id: string) => void;
}) {
  const isWaiting = order.status === "รอดำเนินการ";
  const isCooking = order.status === "กำลังทำ" || order.status === "กำลังเตรียม";
  const isReady = order.status === "พร้อมเสิร์ฟ";
  const isCompleted = order.status === "สำเร็จ" || order.status === "ยกเลิก";
  const isCancelled = order.status === "ยกเลิก";

  // Accent border colors based on status
  let borderClass = "border-[#ece4d6]";
  let actionBtnText = "เริ่มทำ";
  let actionBtnColor = "bg-[#002e47] text-white hover:bg-[#001f30]";

  if (isWaiting) {
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

  // Dine-in vs Delivery top banner styling
  let bannerBg = "bg-amber-100 text-[#002e47]";
  let typeLabel = "ทานที่ร้าน";
  let typeIcon = (
    <div className="p-1 rounded-lg bg-amber-500/20 text-[#002e47] flex items-center justify-center shrink-0">
      <Utensils size={18} className="stroke-[2.5]" />
    </div>
  );
  let detailsText = order.tableNumber || "ไม่ระบุโต๊ะ";
  let detailsLarge = true; // Huge text for Dine-in tables
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
      className={`shrink-0 rounded-2xl border-2 overflow-hidden flex flex-col shadow-soft transition-colors duration-300 ${cardBg} ${leftBorderClass} ${borderClass}`}
    >
      {/* High-Contrast Dine-In vs Delivery Top Banner */}
      <div className={`px-4 py-3 flex items-center justify-between ${bannerBg}`}>
        <div className="flex items-center gap-2">
          {typeIcon}
          <span className="text-xs font-black uppercase tracking-wider">
            {typeLabel}
          </span>
        </div>
        <div>
          {order.orderType === "takeaway" && order.queueNumber ? (
            <div className="flex items-center gap-2">
              <div className="text-right">
                <span className="text-xs font-black truncate max-w-[100px] block">
                  {detailsText}
                </span>
                {order.phone && (
                  <span className="text-[9px] font-bold text-purple-700/70 block">
                    โทร: {order.phone}
                  </span>
                )}
              </div>
              <div className="bg-purple-600 text-white font-black text-sm px-2 py-1 rounded-lg border border-purple-400 shrink-0">
                {order.queueNumber}
              </div>
            </div>
          ) : detailsLarge ? (
            <span className="text-xl font-black tracking-tight uppercase" style={{ color: BRAND }}>
              {detailsText}
            </span>
          ) : (
            <div className="text-right">
              <span className="text-xs font-black truncate max-w-[140px] block">
                {detailsText}
              </span>
              {order.phone && (
                <span className="text-[10px] font-bold text-slate-500 block">
                  โทร: {order.phone}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Info Bar: Order Number and Elapsed Timer */}
      <div className="px-4 py-2 bg-[#002e47]/5 border-b border-slate-200/60 flex items-center justify-between">
        <span className="text-xs font-extrabold text-[#002e47]">
          ออเดอร์ {order.orderNumber}
        </span>
        <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          ฿{order.total}
        </span>
        {!isCompleted && <OrderTimer id={order.id} />}
      </div>

      {/* Ordered Menu Items - Large font, bold style, massive quantities */}
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
                  className="text-base font-black text-[#002e47] px-2.5 py-1 rounded-lg border border-[#002e47]/10 shadow-sm min-w-[42px] text-center"
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
          <div className="p-2.5 bg-red-50 border border-red-155 rounded-xl">
            <span className="text-[9px] font-bold text-red-600 uppercase tracking-wider block mb-0.5">
              หมายเหตุลูกค้า:
            </span>
            <span className="text-xs font-extrabold text-red-700 animate-pulse block leading-normal">
              * {order.note}
            </span>
          </div>
        )}
      </div>

      {/* Actions Section */}
      <div className="p-3 bg-[#002e47]/5 border-t border-slate-200/60 flex gap-2">
        {/* Undo Revert state */}
        {!isWaiting && !isCompleted && (
          <button
            onClick={() => regressOrderStatus(order.id, order.status)}
            className="p-2.5 bg-white hover:bg-slate-100 text-[#5a6e7a] border border-slate-200 rounded-xl active:scale-95 transition flex items-center justify-center cursor-pointer shadow-sm"
            title="ย้อนกลับขั้นตอนที่แล้ว"
          >
            <RotateCcw size={16} />
          </button>
        )}

        {/* Progress status button */}
        {!isCompleted ? (
          <>
            <button
              onClick={() => advanceOrderStatus(order.id, order.status)}
              className="flex-1 py-3 rounded-xl font-black text-xs tracking-wider uppercase transition-colors duration-300 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white"
              style={{ background: actionBtnColor.includes("blue") ? "#2563eb" : actionBtnColor.includes("emerald") ? "#059669" : "#334155" }}
            >
              {actionBtnText}
            </button>
            <button
              onClick={() => {
                if (window.confirm(`คุณแน่ใจหรือไม่ที่จะยกเลิกออเดอร์ ${order.orderNumber}?`)) {
                  cancelOrder(order.id);
                }
              }}
              className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl active:scale-95 transition flex items-center justify-center cursor-pointer shadow-sm"
              title="ยกเลิกออเดอร์"
            >
              <Trash2 size={16} />
            </button>
          </>
        ) : isCancelled ? (
          <div className="flex-1 py-2 text-center text-red-600 text-xs font-bold bg-red-50 border border-red-100 rounded-xl">
            ยกเลิกออเดอร์แล้ว
          </div>
        ) : (
          <div className="flex-1 py-2 text-center text-[#5a6e7a] text-xs font-bold bg-slate-100 rounded-xl">
            ออเดอร์สำเร็จแล้ว
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyColumnMessage({ text }: { text: string }) {
  return (
    <div className="py-12 flex flex-col items-center justify-center text-center text-[#5a6e7a]/50">
      <ChefHat size={28} className="opacity-30 mb-2" />
      <span className="text-[11px] font-bold">{text}</span>
    </div>
  );
}
function KitchenSidebarContent({
  view,
  setView,
  onClose,
}: {
  view: "kitchen" | "dashboard" | "menu" | "tables";
  setView: (v: "kitchen" | "dashboard" | "menu" | "tables") => void;
  onClose?: () => void;
}) {
  return (
    <div className="flex flex-col h-full bg-[#002e47] text-white select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white border border-white/15 shadow-sm relative overflow-hidden group">
            <ChefHat className="h-5.5 w-5.5 text-[#fcc14a]" />
          </div>
          <div>
            <h2 className="font-black text-sm tracking-tight text-white uppercase">
              ระบบจัดการร้าน
            </h2>
            <p className="text-[10px] font-bold text-[#fcc14a] tracking-wider uppercase">
              หลังบ้านลุงเกตุ
            </p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition cursor-pointer md:hidden"
          >
            <RotateCcw size={16} className="rotate-45" />
          </button>
        )}
      </div>

      {/* Main Vendor/Admin Navigation */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block px-2">
            เมนูจัดการระบบ
          </span>
          <nav className="space-y-1">
            <button
              onClick={() => {
                setView("kitchen");
                if (onClose) onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "kitchen"
                  ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]"
                  : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"
                }`}
            >
              <ChefHat size={18} className={view === "kitchen" ? "text-[#fcc14a]" : "text-white/60"} />
              <span className="text-sm">จอจัดการครัว</span>
            </button>

            <button
              onClick={() => {
                setView("tables");
                if (onClose) onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "tables"
                  ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]"
                  : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"
                }`}
            >
              <Table size={18} className={view === "tables" ? "text-[#fcc14a]" : "text-white/60"} />
              <span className="text-sm">ผังโต๊ะอาหาร</span>
            </button>

            <button
              onClick={() => {
                setView("dashboard");
                if (onClose) onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "dashboard"
                  ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]"
                  : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"
                }`}
            >
              <LayoutDashboard size={18} className={view === "dashboard" ? "text-[#fcc14a]" : "text-white/60"} />
              <span className="text-sm">แดชบอร์ด</span>
            </button>

            <button
              onClick={() => {
                setView("menu");
                if (onClose) onClose();
              }}
              className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "menu"
                  ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]"
                  : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"
                }`}
            >
              <ClipboardList size={18} className={view === "menu" ? "text-[#fcc14a]" : "text-white/60"} />
              <span className="text-sm">จัดการสต็อกอาหาร</span>
            </button>

            <a
              href="/customer"
              onClick={(e) => {
                e.preventDefault();
                localStorage.removeItem("ran-lung-get-staff-token");
                if (onClose) onClose();
                window.location.href = "/customer";
              }}
              className="w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left text-white/70 hover:text-white hover:bg-white/5 font-medium transition duration-200 cursor-pointer border-l-4 border-transparent"
            >
              <Home size={18} className="text-white/60" />
              <span className="text-sm">สั่งอาหาร (หน้าลูกค้า)</span>
            </a>
          </nav>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/10 bg-white/2 shrink-0">
        <p className="text-[9px] text-white/40 text-center font-semibold">
          ระบบจัดการร้านค้า v1.2.0 · ครัวลุงเกตุ
        </p>
      </div>
    </div>
  );
}

// Base data for realistic dashboard figures if orders list is empty
const BASE_RECENT_ORDERS: OrderHistory[] = [
  {
    id: "mock_recent_1",
    orderNumber: "AK-2910",
    date: "25 มิ.ย. 2569 · 11:15 น.",
    items: [{ name: "กระเพราหมูกรอบ (ข้าวราด) (เผ็ดกลาง, ไข่ดาวสุกกรอบๆ)", qty: 1, price: 80, image: "" }],
    subtotal: 80,
    delivery: 0,
    total: 80,
    status: "สำเร็จ",
    orderType: "dine-in",
    customerName: "คุณ นนท์",
    tableNumber: "โต๊ะ 3"
  },
  {
    id: "mock_recent_2",
    orderNumber: "AK-2909",
    date: "25 มิ.ย. 2569 · 11:02 น.",
    items: [
      { name: "ผัดซีอิ๊ว (เส้นใหญ่) (ไม่เผ็ด)", qty: 2, price: 70, image: "" },
      { name: "น้ำลำไย", qty: 2, price: 45, image: "" }
    ],
    subtotal: 230,
    delivery: 0,
    total: 230,
    status: "สำเร็จ",
    orderType: "dine-in",
    customerName: "คุณ แพรว",
    tableNumber: "โต๊ะ 1"
  },
  {
    id: "mock_recent_3",
    orderNumber: "AK-2908",
    date: "25 มิ.ย. 2569 · 10:45 น.",
    items: [{ name: "ผัดคะน้าหมูกรอบ (ข้าวราด) (เผ็ดน้อย)", qty: 1, price: 70, image: "" }],
    subtotal: 70,
    delivery: 40,
    total: 110,
    status: "สำเร็จ",
    orderType: "delivery",
    customerName: "คุณ สมยศ",
    tableNumber: ""
  },
  {
    id: "mock_recent_4",
    orderNumber: "AK-2907",
    date: "25 มิ.ย. 2569 · 10:30 น.",
    items: [
      { name: "กระเพราหมูสับ (ข้าวราด) (เผ็ดมาก)", qty: 1, price: 60, image: "" },
      { name: "เฉาก๊วย", qty: 1, price: 40, image: "" }
    ],
    subtotal: 100,
    delivery: 0,
    total: 100,
    status: "สำเร็จ",
    orderType: "takeaway",
    customerName: "คุณ วิชัย",
    tableNumber: ""
  },
  {
    id: "mock_recent_5",
    orderNumber: "AK-2906",
    date: "25 มิ.ย. 2569 · 10:15 น.",
    items: [{ name: "ข้าวผัดกระเทียม (ข้าวผัด) (ไม่เผ็ด)", qty: 1, price: 70, image: "" }],
    subtotal: 70,
    delivery: 0,
    total: 70,
    status: "สำเร็จ",
    orderType: "dine-in",
    customerName: "คุณ พั้นช์",
    tableNumber: "โต๊ะ 5"
  }
];

const BASE_POPULAR_ITEMS = [
  { name: "กระเพราหมูกรอบ (ข้าวราด)", count: 48 },
  { name: "ผัดคะน้าหมูกรอบ (ข้าวราด)", count: 32 },
  { name: "กระเพราหมูสับ (ข้าวราด)", count: 27 },
  { name: "ผัดซีอิ๊ว (เส้นใหญ่)", count: 19 },
  { name: "น้ำลำไย", count: 15 }
];

function DashboardView({ orders }: { orders: OrderHistory[] }) {
  // Aggregate sales & customers
  const totalOrders = 85 + orders.length;
  const totalRevenue = 48500 + orders.reduce((sum, o) => sum + o.total, 0);

  // Unique customers computation
  const totalCustomers = 32 + useMemo(() => {
    const seen = new Set<string>();
    orders.forEach(o => {
      if (o.customerName) seen.add(o.customerName);
      else if (o.tableNumber) seen.add(o.tableNumber);
    });
    return seen.size;
  }, [orders]);

  // Aggregate popular menus (Base + active orders count)
  const mergedPopularItems = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach(o => {
      o.items.forEach(item => {
        const baseName = item.name.split(" (")[0];
        counts[baseName] = (counts[baseName] || 0) + item.qty;
      });
    });

    const items = BASE_POPULAR_ITEMS.map(b => ({ ...b }));
    Object.entries(counts).forEach(([name, count]) => {
      const match = items.find(i => i.name === name);
      if (match) {
        match.count += count;
      } else {
        items.push({ name, count });
      }
    });

    return items.sort((a, b) => b.count - a.count);
  }, [orders]);

  const topProduct = mergedPopularItems[0]?.name || "กระเพราหมูกรอบ (ข้าวราด)";

  // Merge active orders and base orders for the recent activity tables
  const mergedRecentOrders = useMemo(() => {
    const active = [...orders].sort((a, b) => getTimestampFromOrderId(b.id) - getTimestampFromOrderId(a.id));
    if (active.length >= 5) {
      return active.slice(0, 5);
    }
    const needed = 5 - active.length;
    return [...active, ...BASE_RECENT_ORDERS.slice(0, needed)];
  }, [orders]);

  const mergedRecentCustomers = useMemo(() => {
    const list: { name: string; info: string; time: string; type: OrderType }[] = [];
    const seen = new Set<string>();

    const sortedOrders = [...orders].sort((a, b) => getTimestampFromOrderId(b.id) - getTimestampFromOrderId(a.id));
    sortedOrders.forEach(o => {
      const key = o.customerName || o.tableNumber;
      if (key && !seen.has(key)) {
        seen.add(key);
        list.push({
          name: o.customerName || "คุณลูกค้า",
          info: o.orderType === "dine-in" ? (o.tableNumber || "ทานที่ร้าน") : o.orderType === "takeaway" ? "รับกลับบ้าน" : "เดลิเวอรี่",
          time: o.date.includes(" · ") ? o.date.split(" · ")[1] : "เมื่อสักครู่",
          type: o.orderType || "dine-in"
        });
      }
    });

    const mockCustomers = [
      { name: "คุณ นนท์", info: "โต๊ะ 3", time: "11:15 น.", type: "dine-in" as OrderType },
      { name: "คุณ แพรว", info: "โต๊ะ 1", time: "11:02 น.", type: "dine-in" as OrderType },
      { name: "คุณ สมยศ", info: "เดลิเวอรี่", time: "10:45 น.", type: "delivery" as OrderType },
      { name: "คุณ วิชัย", info: "รับกลับบ้าน", time: "10:30 น.", type: "takeaway" as OrderType },
      { name: "คุณ พั้นช์", info: "โต๊ะ 5", time: "10:15 น.", type: "dine-in" as OrderType },
    ];

    for (const mc of mockCustomers) {
      if (list.length >= 5) break;
      if (!seen.has(mc.name)) {
        seen.add(mc.name);
        list.push(mc);
      }
    }

    return list.slice(0, 5);
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Orders */}
        <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="text-2xl sm:text-3.5xl font-black tracking-tight text-[#002e47]">
              {totalOrders}
            </div>
            <div className="p-2 sm:p-2.5 rounded-2xl bg-amber-500/10 text-amber-600">
              <ClipboardList size={20} className="stroke-[2.5]" />
            </div>
          </div>
          <h3 className="text-[11px] sm:text-xs font-extrabold text-[#5a6e7a] tracking-wider uppercase mt-4">
            ยอดสั่งซื้อสะสม (ออเดอร์)
          </h3>
        </div>

        {/* Total Revenue */}
        <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="text-2xl sm:text-3.5xl font-black tracking-tight text-[#002e47]">
              ฿{new Intl.NumberFormat("th-TH").format(totalRevenue)}
            </div>
            <div className="p-2 sm:p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600">
              <DollarSign size={20} className="stroke-[2.5]" />
            </div>
          </div>
          <h3 className="text-[11px] sm:text-xs font-extrabold text-[#5a6e7a] tracking-wider uppercase mt-4">
            รายได้สะสมทั้งหมด (บาท)
          </h3>
        </div>

        {/* Total Customers */}
        <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="text-2xl sm:text-3.5xl font-black tracking-tight text-[#002e47]">
              {totalCustomers}
            </div>
            <div className="p-2 sm:p-2.5 rounded-2xl bg-blue-500/10 text-blue-600">
              <Users size={20} className="stroke-[2.5]" />
            </div>
          </div>
          <h3 className="text-[11px] sm:text-xs font-extrabold text-[#5a6e7a] tracking-wider uppercase mt-4">
            ลูกค้าสะสมทั้งหมด (คน)
          </h3>
        </div>

        {/* Popular Menu */}
        <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md transition">
          <div className="flex justify-between items-start">
            <div className="text-sm sm:text-base font-black tracking-tight text-[#002e47] line-clamp-2 max-w-[85%] leading-snug">
              {topProduct}
            </div>
            <div className="p-2 sm:p-2.5 rounded-2xl bg-yellow-500/10 text-yellow-600 shrink-0">
              <TrendingUp size={20} className="stroke-[2.5]" />
            </div>
          </div>
          <h3 className="text-[11px] sm:text-xs font-extrabold text-[#5a6e7a] tracking-wider uppercase mt-4">
            เมนูยอดนิยมอันดับ 1
          </h3>
        </div>
      </div>

      {/* Charts & Recent Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Popular Menus Horizontal Bar Chart (Left 1/3) */}
        <div className="lg:col-span-1 bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={20} className="text-[#002e47] stroke-[2.5]" />
            <h2 className="text-base font-black tracking-tight text-[#002e47]">
              5 อันดับเมนูขายดีที่สุด
            </h2>
          </div>

          <div className="space-y-5">
            {mergedPopularItems.slice(0, 5).map((item, index) => {
              const maxCount = mergedPopularItems[0]?.count || 1;
              const pct = (item.count / maxCount) * 100;

              let medalColor = "";
              if (index === 0) medalColor = "bg-[#fcc14a] text-[#002e47]";
              else if (index === 1) medalColor = "bg-slate-200 text-slate-700";
              else if (index === 2) medalColor = "bg-amber-600/20 text-amber-800";
              else medalColor = "bg-slate-100 text-slate-500";

              return (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className={`h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${medalColor}`}>
                        {index + 1}
                      </span>
                      <span className="font-extrabold text-[#002e47] truncate">{item.name}</span>
                    </div>
                    <span className="font-black text-[#002e47] bg-slate-100 px-2 py-0.5 rounded-lg text-xs shrink-0">
                      {item.count} จาน
                    </span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-550"
                      style={{
                        width: `${pct}%`,
                        background: index === 0 ? "#002e47" : "#5a6e7a"
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Orders & Customers (Right 2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Orders Card */}
          <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm">
            <h2 className="text-base font-black tracking-tight text-[#002e47] mb-4">
              5 ออเดอร์ล่าสุด
            </h2>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                <thead>
                  <tr className="border-b border-slate-100 text-[#5a6e7a] font-bold">
                    <th className="py-2.5 font-bold">ออเดอร์</th>
                    <th className="py-2.5 font-bold">เวลา</th>
                    <th className="py-2.5 font-bold">ประเภท</th>
                    <th className="py-2.5 font-bold text-right">ยอดรวม</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                  {mergedRecentOrders.map((o) => {
                    const typeLabel = o.orderType === "dine-in"
                      ? (o.tableNumber || "ทานที่ร้าน")
                      : o.orderType === "delivery"
                        ? "เดลิเวอรี่"
                        : "กลับบ้าน";

                    const typeColor = o.orderType === "dine-in"
                      ? "text-amber-600 bg-amber-50"
                      : o.orderType === "delivery"
                        ? "text-blue-600 bg-blue-50"
                        : "text-purple-600 bg-purple-50";

                    return (
                      <tr key={o.id} className="hover:bg-slate-50/50">
                        <td className="py-3 font-extrabold text-[#002e47]">
                          {o.orderNumber}
                        </td>
                        <td className="py-3 text-slate-500 text-[11px] sm:text-xs">
                          {o.date.includes(" · ") ? o.date.split(" · ")[1] : o.date}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${typeColor}`}>
                            {typeLabel}
                          </span>
                        </td>
                        <td className="py-3 text-right font-black text-[#002e47]">
                          ฿{o.total}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Customers Card */}
          <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm">
            <h2 className="text-base font-black tracking-tight text-[#002e47] mb-4">
              5 รายชื่อลูกค้าล่าสุด
            </h2>
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
                <thead>
                  <tr className="border-b border-slate-100 text-[#5a6e7a] font-bold">
                    <th className="py-2.5 font-bold">ชื่อลูกค้า</th>
                    <th className="py-2.5 font-bold">ช่องทาง/โต๊ะ</th>
                    <th className="py-2.5 font-bold text-right">เวลาเข้าชม</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 font-medium text-slate-700">
                  {mergedRecentCustomers.map((c, idx) => {
                    const typeColor = c.type === "dine-in"
                      ? "text-amber-600 bg-amber-50"
                      : c.type === "delivery"
                        ? "text-blue-600 bg-blue-50"
                        : "text-purple-600 bg-purple-50";

                    return (
                      <tr key={idx} className="hover:bg-slate-50/50">
                        <td className="py-3 font-extrabold text-[#002e47]">
                          {c.name}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${typeColor}`}>
                            {c.info}
                          </span>
                        </td>
                        <td className="py-3 text-right text-slate-500 text-[11px] sm:text-xs">
                          {c.time}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuManagementView() {
  const [activeSubView, setActiveSubView] = useState<"menu" | "ingredients">("menu");
  const [outOfStockIds, setOutOfStockIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Ingredients states
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newIngName, setNewIngName] = useState("");
  const [newIngQty, setNewIngQty] = useState("");
  const [newIngUnit, setNewIngUnit] = useState("g");
  const [newIngThreshold, setNewIngThreshold] = useState("");

  // Edit ingredient states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editQty, setEditQty] = useState("");
  const [editUnit, setEditUnit] = useState("g");
  const [editThreshold, setEditThreshold] = useState("");

  // Load out-of-stock IDs from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ran-lung-get-out-of-stock-items");
    if (saved) {
      try {
        setOutOfStockIds(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse out-of-stock items:", e);
      }
    }
  }, []);

  // Listen to storage sync events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ran-lung-get-out-of-stock-items" && e.newValue) {
        try {
          setOutOfStockIds(JSON.parse(e.newValue));
        } catch (err) {
          console.error("Sync error in out-of-stock:", err);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const fetchIngredients = async () => {
    setLoadingIngredients(true);
    try {
      const data = await getIngredients();
      if (data && data.length > 0) {
        setIngredients(data);
      } else if (data && data.length === 0) {
        // Auto seed standard ingredients when database table is empty!
        console.log("Database table is empty, auto-seeding standard ingredients...");
        const defaults = [
          { name: "หมูสับ", quantity: 1000, unit: "g", min_threshold: 200 },
          { name: "หมูกรอบ", quantity: 1000, unit: "g", min_threshold: 200 },
          { name: "หมูชิ้น", quantity: 1000, unit: "g", min_threshold: 200 },
          { name: "ไก่สับ", quantity: 1000, unit: "g", min_threshold: 200 },
          { name: "ไก่ต้ม", quantity: 1000, unit: "g", min_threshold: 200 },
          { name: "เนื้อ", quantity: 1000, unit: "g", min_threshold: 200 },
          { name: "หมึก", quantity: 1000, unit: "g", min_threshold: 200 },
          { name: "กุ้ง", quantity: 1000, unit: "g", min_threshold: 200 },
          { name: "หอยลาย", quantity: 1000, unit: "g", min_threshold: 200 },
          { name: "ไข่ไก่", quantity: 100, unit: "pcs", min_threshold: 15 },
          { name: "ไส้กรอก", quantity: 50, unit: "pcs", min_threshold: 10 },
          { name: "กุนเชียง", quantity: 50, unit: "pcs", min_threshold: 10 }
        ];
        const client = supabase as any;
        const { error } = await client.from("ingredients").insert(defaults);
        if (!error) {
          const freshData = await getIngredients();
          if (freshData) {
            setIngredients(freshData);
          }
        } else {
          setIngredients([]);
        }
      } else {
        setIngredients([]);
      }
    } catch (err) {
      console.warn("Error loading stock from DB, using local mock fallback:", err);
      // Fallback to localStorage mock data
      const localIng = localStorage.getItem("ran-lung-get-mock-ingredients");
      if (localIng) {
        setIngredients(JSON.parse(localIng));
      } else {
        const defaults = [
          { id: "mock-1", name: "หมูสับ", quantity: 1000, unit: "g", min_threshold: 200 },
          { id: "mock-2", name: "หมูกรอบ", quantity: 1000, unit: "g", min_threshold: 200 },
          { id: "mock-3", name: "หมูชิ้น", quantity: 1000, unit: "g", min_threshold: 200 },
          { id: "mock-4", name: "ไก่สับ", quantity: 1000, unit: "g", min_threshold: 200 },
          { id: "mock-5", name: "ไก่ต้ม", quantity: 1000, unit: "g", min_threshold: 200 },
          { id: "mock-6", name: "เนื้อ", quantity: 1000, unit: "g", min_threshold: 200 },
          { id: "mock-7", name: "หมึก", quantity: 1000, unit: "g", min_threshold: 200 },
          { id: "mock-8", name: "กุ้ง", quantity: 1000, unit: "g", min_threshold: 200 },
          { id: "mock-9", name: "หอยลาย", quantity: 1000, unit: "g", min_threshold: 200 },
          { id: "mock-10", name: "ไข่ไก่", quantity: 100, unit: "pcs", min_threshold: 15 },
          { id: "mock-11", name: "ไส้กรอก", quantity: 50, unit: "pcs", min_threshold: 10 },
          { id: "mock-12", name: "กุนเชียง", quantity: 50, unit: "pcs", min_threshold: 10 }
        ];
        setIngredients(defaults);
        localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(defaults));
      }
    } finally {
      setLoadingIngredients(false);
    }
  };

  useEffect(() => {
    if (activeSubView === "ingredients") {
      fetchIngredients();
    }
  }, [activeSubView]);

  const toggleStock = (itemId: string) => {
    let updated: string[];
    if (outOfStockIds.includes(itemId)) {
      updated = outOfStockIds.filter(id => id !== itemId);
    } else {
      updated = [...outOfStockIds, itemId];
    }
    setOutOfStockIds(updated);
    localStorage.setItem("ran-lung-get-out-of-stock-items", JSON.stringify(updated));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "ran-lung-get-out-of-stock-items",
      newValue: JSON.stringify(updated),
    }));
  };

  const adjustIngredientQty = async (id: string, amount: number) => {
    const item = ingredients.find(i => i.id === id);
    if (!item) return;
    const newQty = Math.max(0, Number(item.quantity) + amount);

    const updated = ingredients.map(i => i.id === id ? { ...i, quantity: newQty } : i);
    setIngredients(updated);
    localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(updated));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "ran-lung-get-mock-ingredients",
      newValue: JSON.stringify(updated)
    }));

    try {
      await updateIngredientStock(id, newQty);
    } catch (err) {
      console.warn("Supabase update skipped (using local mock data).");
    }
  };

  const handleAddIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = parseFloat(newIngQty);
    const t = parseFloat(newIngThreshold);
    if (!newIngName.trim() || isNaN(q) || isNaN(t)) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง");
      return;
    }

    const newItem = {
      id: "mock-" + Date.now(),
      name: newIngName.trim(),
      quantity: q,
      unit: newIngUnit,
      min_threshold: t,
      is_active: true,
      status: "active"
    };

    const updated = [newItem, ...ingredients];
    setIngredients(updated);
    localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(updated));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "ran-lung-get-mock-ingredients",
      newValue: JSON.stringify(updated)
    }));

    setNewIngName("");
    setNewIngQty("");
    setNewIngThreshold("");
    setShowAddForm(false);

    try {
      await addIngredient(newIngName.trim(), q, newIngUnit, t);
      fetchIngredients();
    } catch (err: any) {
      console.warn("Supabase insert skipped (using local mock data).");
    }
  };

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditName(item.name);
    setEditQty(item.quantity.toString());
    setEditUnit(item.unit);
    setEditThreshold(item.min_threshold.toString());
  };

  const saveEdit = async (id: string) => {
    const q = parseFloat(editQty);
    const t = parseFloat(editThreshold);
    if (!editName.trim() || isNaN(q) || isNaN(t)) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง");
      return;
    }

    const updated = ingredients.map(i => i.id === id ? {
      ...i,
      name: editName.trim(),
      quantity: q,
      unit: editUnit,
      min_threshold: t
    } : i);
    setIngredients(updated);
    localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(updated));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "ran-lung-get-mock-ingredients",
      newValue: JSON.stringify(updated)
    }));
    setEditingId(null);

    try {
      await updateIngredientStock(id, q, editName.trim(), editUnit, t);
    } catch (err) {
      console.warn("Supabase update skipped (using local mock data).");
    }
  };

  const handleDeleteIngredient = async (id: string, name: string) => {
    if (!confirm(`คุณต้องการลบวัตถุดิบ "${name}" ใช่หรือไม่? สูตรอาหารทั้งหมดที่ผูกกับวัตถุดิบนี้จะถูกลบไปด้วย`)) return;
    
    const updated = ingredients.filter(i => i.id !== id);
    setIngredients(updated);
    localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(updated));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "ran-lung-get-mock-ingredients",
      newValue: JSON.stringify(updated)
    }));

    try {
      await deleteIngredient(id);
    } catch (err) {
      console.warn("Supabase delete skipped (using local mock data).");
    }
  };

  const toggleIngredientActive = async (id: string) => {
    const item = ingredients.find(i => i.id === id);
    if (!item) return;
    const newActive = item.is_active === false ? true : false;
    const newStatus = newActive ? "active" : "disabled";

    const updated = ingredients.map(i => i.id === id ? { ...i, is_active: newActive, status: newStatus } : i);
    setIngredients(updated);
    localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(updated));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "ran-lung-get-mock-ingredients",
      newValue: JSON.stringify(updated)
    }));

    try {
      const client = supabase as any;
      await client.from("ingredients").update({ is_active: newActive, status: newStatus }).eq("id", id);
    } catch (err) {
      console.warn("Supabase update active status skipped (using local mock data).");
    }
  };

  const formatUnitAndQty = (qty: number, unit: string) => {
    if (unit === "g") {
      if (qty >= 1000) {
        return `${Number((qty / 1000).toFixed(2))} kg`;
      }
      return `${qty} g`;
    }
    return `${qty} ${unit}`;
  };

  const formatThreshold = (qty: number, unit: string) => {
    if (unit === "g" && qty >= 1000) {
      return `${Number((qty / 1000).toFixed(2))} kg`;
    }
    return `${qty} ${unit}`;
  };

  const categories = [
    { id: "all", label: "ทั้งหมด" },
    { id: "signature", label: "Signature" },
    { id: "main", label: "อาหารจานเดียว" },
    { id: "noodles", label: "เส้น" },
    { id: "rice", label: "ข้าวผัด" },
    { id: "vegetarian", label: "มังสวิรัติ" },
    { id: "drinks", label: "เครื่องดื่ม" },
    { id: "dessert", label: "ของหวาน" }
  ];

  const filteredMenuItems = useMemo(() => {
    return MENU.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const renderIngredientCard = (item: any) => {
    const isLowStock = Number(item.quantity) <= Number(item.min_threshold);
    const isEditing = editingId === item.id;

    return (
      <div
        key={item.id}
        className={`bg-white border rounded-2xl p-4 shadow-sm hover:shadow transition relative flex flex-col justify-between gap-3 min-h-[140px] ${
          isLowStock ? "border-red-200 bg-red-50/5" : "border-[#ece4d6]/80"
        }`}
      >
        {isEditing ? (
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-bold text-xs text-[#002e47] focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={editQty}
                onChange={(e) => setEditQty(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-bold text-xs text-[#002e47] focus:outline-none"
              />
              <select
                value={editUnit}
                onChange={(e) => setEditUnit(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1.5 text-xs text-[#002e47] focus:outline-none"
              >
                <option value="g">g</option>
                <option value="pcs">pcs</option>
                <option value="ml">ml</option>
              </select>
            </div>
            <div>
              <label className="block text-[9px] font-bold text-[#5a6e7a] mb-1">ขั้นต่ำแจ้งเตือน</label>
              <input
                type="number"
                value={editThreshold}
                onChange={(e) => setEditThreshold(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-bold text-xs text-[#002e47] focus:outline-none"
              />
            </div>
            <div className="flex gap-1.5 justify-end mt-1">
              <button
                type="button"
                onClick={() => saveEdit(item.id)}
                className="bg-emerald-600 text-white px-2.5 py-1.5 rounded-lg font-bold text-[10px] cursor-pointer hover:bg-emerald-700"
              >
                บันทึก
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="bg-slate-100 text-[#5a6e7a] px-2.5 py-1.5 rounded-lg font-bold text-[10px] cursor-pointer hover:bg-slate-200"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-[#002e47] truncate text-xs flex items-center gap-1.5" title={item.name}>
                  {item.name}
                  {isLowStock && (
                    <span className="bg-red-500 text-white font-black text-[8px] px-1.5 py-0.5 rounded animate-pulse">
                      เหลือน้อย!
                    </span>
                  )}
                </span>
                <span className="text-[10px] text-slate-400 font-bold mt-0.5">
                  ขั้นต่ำ: {formatThreshold(Number(item.min_threshold), item.unit)}
                </span>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="p-1 text-slate-400 hover:text-[#002e47] transition hover:bg-slate-100 rounded-lg cursor-pointer"
                  title="แก้ไขวัตถุดิบ"
                >
                  <Edit2 size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteIngredient(item.id, item.name)}
                  className="p-1 text-slate-400 hover:text-red-600 transition hover:bg-red-50 rounded-lg cursor-pointer"
                  title="ลบวัตถุดิบ"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>

            <div className="mt-1">
              <span className={`text-base font-black tracking-tight ${isLowStock ? "text-red-600" : "text-emerald-700"}`}>
                {formatUnitAndQty(Number(item.quantity), item.unit)}
              </span>
            </div>

            <div className="flex gap-1 mt-2 pt-2 border-t border-slate-100">
              {item.unit === "g" ? (
                <>
                  <button
                    type="button"
                    onClick={() => adjustIngredientQty(item.id, 100)}
                    className="flex-1 border border-[#ece4d6] hover:bg-slate-50 text-[10px] font-black py-1 rounded-lg text-[#002e47] transition cursor-pointer"
                  >
                    +100g
                  </button>
                  <button
                    type="button"
                    onClick={() => adjustIngredientQty(item.id, 1000)}
                    className="flex-1 border border-[#ece4d6] hover:bg-slate-50 text-[10px] font-black py-1 rounded-lg text-[#002e47] transition cursor-pointer"
                  >
                    +1kg
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => adjustIngredientQty(item.id, 10)}
                  className="flex-1 border border-[#ece4d6] hover:bg-slate-50 text-[10px] font-black py-1 rounded-lg text-[#002e47] transition cursor-pointer"
                >
                  +10 pcs
                </button>
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderRow = (item: any) => {
    const isLowStock = Number(item.quantity) <= Number(item.min_threshold);
    const isEditing = editingId === item.id;

    return (
      <tr key={item.id} className={`hover:bg-slate-50/30 transition ${isLowStock ? "bg-red-50/5" : ""}`}>
        {/* Column 1: ชื่อวัตถุดิบ */}
        <td className="py-3 px-4 font-extrabold text-[#002e47]">
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-bold text-xs text-[#002e47] focus:outline-none"
            />
          ) : (
            <div className="flex items-center gap-2">
              <span>{item.name}</span>
              {isLowStock && (
                <span className="bg-red-500 text-white font-black text-[8px] px-1.5 py-0.5 rounded animate-pulse">
                  เหลือน้อย!
                </span>
              )}
            </div>
          )}
        </td>

        {/* Column 2: เปิด-ปิดการขาย */}
        <td className="py-3 px-4">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-extrabold tracking-wide ${
              item.is_active !== false && item.status !== "disabled" ? "text-emerald-600" : "text-red-500"
            }`}>
              {item.is_active !== false && item.status !== "disabled" ? "เปิดขาย" : "ปิดขาย"}
            </span>
            <button
              type="button"
              onClick={() => toggleIngredientActive(item.id)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                item.is_active !== false && item.status !== "disabled" ? "bg-emerald-500" : "bg-red-400"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  item.is_active !== false && item.status !== "disabled" ? "translate-x-4" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </td>

        {/* Column 2: ปริมาณคงเหลือ */}
        <td className="py-3 px-4">
          {isEditing ? (
            <div className="flex gap-1.5 items-center">
              <input
                type="number"
                value={editQty}
                onChange={(e) => setEditQty(e.target.value)}
                className="w-20 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-bold text-xs text-[#002e47] focus:outline-none"
              />
              <select
                value={editUnit}
                onChange={(e) => setEditUnit(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-[#002e47] focus:outline-none"
              >
                <option value="g">g</option>
                <option value="pcs">pcs</option>
                <option value="ml">ml</option>
              </select>
            </div>
          ) : (
            <span className={`font-black ${isLowStock ? "text-red-600" : "text-emerald-700"}`}>
              {formatUnitAndQty(Number(item.quantity), item.unit)}
            </span>
          )}
        </td>

        {/* Column 3: ระดับแจ้งเตือนขั้นต่ำ */}
        <td className="py-3 px-4 text-slate-500 font-bold">
          {isEditing ? (
            <input
              type="number"
              value={editThreshold}
              onChange={(e) => setEditThreshold(e.target.value)}
              className="w-20 bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 font-bold text-xs text-[#002e47] focus:outline-none"
            />
          ) : (
            <span>{formatThreshold(Number(item.min_threshold), item.unit)}</span>
          )}
        </td>

        {/* Column 4: จัดการสต็อก / บันทึก */}
        <td className="py-3 px-4 text-right">
          {isEditing ? (
            <div className="flex gap-1.5 justify-end">
              <button
                type="button"
                onClick={() => saveEdit(item.id)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl font-bold text-[11px] cursor-pointer transition shadow-sm"
              >
                บันทึก
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="bg-slate-100 hover:bg-slate-200 text-[#5a6e7a] px-3 py-1.5 rounded-xl font-bold text-[11px] cursor-pointer transition"
              >
                ยกเลิก
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-3">
              {/* Quick Plus Buttons */}
              <div className="flex gap-1">
                {item.unit === "g" ? (
                  <>
                    <button
                      type="button"
                      onClick={() => adjustIngredientQty(item.id, 100)}
                      className="border border-[#ece4d6] hover:bg-slate-50 text-[10px] font-black px-2 py-1 rounded-lg text-[#002e47] transition cursor-pointer"
                    >
                      +100g
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustIngredientQty(item.id, 1000)}
                      className="border border-[#ece4d6] hover:bg-slate-50 text-[10px] font-black px-2 py-1 rounded-lg text-[#002e47] transition cursor-pointer"
                    >
                      +1kg
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => adjustIngredientQty(item.id, 10)}
                    className="border border-[#ece4d6] hover:bg-slate-50 text-[10px] font-black px-2 py-1 rounded-lg text-[#002e47] transition cursor-pointer"
                  >
                    +10 pcs
                  </button>
                )}
              </div>
              {/* Edit & Delete Icons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => startEdit(item)}
                  className="p-1 text-slate-400 hover:text-[#002e47] transition hover:bg-slate-100 rounded-lg cursor-pointer"
                  title="แก้ไขวัตถุดิบ"
                >
                  <Edit2 size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteIngredient(item.id, item.name)}
                  className="p-1 text-slate-400 hover:text-red-600 transition hover:bg-red-50 rounded-lg cursor-pointer"
                  title="ลบวัตถุดิบ"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          )}
        </td>
      </tr>
    );
  };

  const handleSeedDefaultData = async () => {
    setLoadingIngredients(true);
    try {
      const defaults = [
        { name: "หมูสับ", quantity: 1000, unit: "g", min_threshold: 200, is_active: true, status: "active" },
        { name: "หมูกรอบ", quantity: 1000, unit: "g", min_threshold: 200, is_active: true, status: "active" },
        { name: "หมูชิ้น", quantity: 1000, unit: "g", min_threshold: 200, is_active: true, status: "active" },
        { name: "ไก่สับ", quantity: 1000, unit: "g", min_threshold: 200, is_active: true, status: "active" },
        { name: "ไก่ต้ม", quantity: 1000, unit: "g", min_threshold: 200, is_active: true, status: "active" },
        { name: "เนื้อ", quantity: 1000, unit: "g", min_threshold: 200, is_active: true, status: "active" },
        { name: "หมึก", quantity: 1000, unit: "g", min_threshold: 200, is_active: true, status: "active" },
        { name: "กุ้ง", quantity: 1000, unit: "g", min_threshold: 200, is_active: true, status: "active" },
        { name: "หอยลาย", quantity: 1000, unit: "g", min_threshold: 200, is_active: true, status: "active" },
        { name: "ไข่ไก่", quantity: 100, unit: "pcs", min_threshold: 15, is_active: true, status: "active" },
        { name: "ไส้กรอก", quantity: 50, unit: "pcs", min_threshold: 10, is_active: true, status: "active" },
        { name: "กุนเชียง", quantity: 50, unit: "pcs", min_threshold: 10, is_active: true, status: "active" }
      ];
      const client = supabase as any;
      await client.from("ingredients").insert(defaults);
      fetchIngredients();
    } catch (err) {
      alert("ไม่สามารถนำเข้าข้อมูลเริ่มต้นได้");
    } finally {
      setLoadingIngredients(false);
    }
  };

  const groupedIngredients = useMemo(() => {
    const meat = ingredients.filter(i => i.name.includes("หมู") || i.name.includes("ไก่") || i.name === "เนื้อ");
    const seafood = ingredients.filter(i => i.name.includes("หมึก") || i.name.includes("กุ้ง") || i.name.includes("หอย"));
    const toppings = ingredients.filter(i => i.name.includes("ไข่") || i.name.includes("ไส้กรอก") || i.name.includes("กุนเชียง"));
    const others = ingredients.filter(i =>
      !meat.some(m => m.id === i.id) &&
      !seafood.some(s => s.id === i.id) &&
      !toppings.some(t => t.id === i.id)
    );
    return { meat, seafood, toppings, others };
  }, [ingredients]);

  return (
    <div className="space-y-6">
      {/* Search and Category Filters */}
      <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black tracking-tight text-[#002e47]">
              จัดการสต็อก:
            </h2>
            <select
              value={activeSubView}
              onChange={(e) => setActiveSubView(e.target.value as any)}
              className="bg-white border border-[#ece4d6] rounded-xl px-3 py-1.5 text-sm font-bold text-[#002e47] focus:outline-none shadow-sm cursor-pointer"
            >
              <option value="menu">เปิด-ปิด เมนูอาหาร</option>
              <option value="ingredients">คลังวัตถุดิบอาหาร (Database)</option>
            </select>
          </div>

          {activeSubView === "menu" ? (
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="ค้นหาชื่อเมนู..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#fcfbf9] border border-[#ece4d6] rounded-2xl px-4 py-2.5 text-sm font-bold text-[#002e47] placeholder-[#5a6e7a]/50 focus:outline-none focus:border-[#002e47]/30 transition shadow-inner"
              />
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-2 bg-[#002e47] text-white px-4 py-2.5 rounded-2xl font-bold text-xs tracking-wider transition hover:bg-[#004165] shadow-md cursor-pointer"
            >
              <PlusCircle size={15} />
              {showAddForm ? "ปิดฟอร์ม" : "เพิ่มวัตถุดิบใหม่"}
            </button>
          )}
        </div>

        {activeSubView === "menu" && (
          /* Category Pills */
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs tracking-wider transition cursor-pointer ${selectedCategory === cat.id
                    ? "bg-[#002e47] text-white shadow-inner"
                    : "bg-slate-100 text-[#5a6e7a] hover:bg-slate-200"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {activeSubView === "ingredients" && showAddForm && (
        <form onSubmit={handleAddIngredient} className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-[#002e47]">เพิ่มวัตถุดิบใหม่เข้าระบบ</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-[#5a6e7a] uppercase mb-1.5">ชื่อวัตถุดิบ</label>
              <input
                type="text"
                placeholder="เช่น หมูสับ, เนื้อ, คะน้า"
                value={newIngName}
                onChange={(e) => setNewIngName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#002e47]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#5a6e7a] uppercase mb-1.5">จำนวนเริ่มต้น</label>
              <input
                type="number"
                placeholder="เช่น 1000 (สำหรับ 1kg)"
                value={newIngQty}
                onChange={(e) => setNewIngQty(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#002e47]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#5a6e7a] uppercase mb-1.5">หน่วยนับ</label>
              <select
                value={newIngUnit}
                onChange={(e) => setNewIngUnit(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#002e47]"
              >
                <option value="g">กรัม (g)</option>
                <option value="pcs">ชิ้น/ฟอง (pcs)</option>
                <option value="ml">มิลลิลิตร (ml)</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#5a6e7a] uppercase mb-1.5">เตือนเมื่อเหลือน้อยกว่า</label>
              <input
                type="number"
                placeholder="เช่น 200"
                value={newIngThreshold}
                onChange={(e) => setNewIngThreshold(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#002e47]"
              />
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="bg-slate-100 text-[#5a6e7a] px-4 py-2 rounded-xl font-bold text-xs cursor-pointer hover:bg-slate-200"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="bg-[#002e47] text-white px-4 py-2 rounded-xl font-bold text-xs cursor-pointer hover:bg-[#004165]"
            >
              เพิ่มเข้าระบบ
            </button>
          </div>
        </form>
      )}

      {activeSubView === "ingredients" ? (
        /* Ingredients Grouped Columns Dashboard */
        <div className="w-full">
          {loadingIngredients ? (
            <div className="bg-white border border-[#ece4d6] rounded-3xl p-16 text-center text-slate-400 font-bold shadow-sm">
              กำลังโหลดข้อมูลสต็อกวัตถุดิบ...
            </div>
          ) : ingredients.length === 0 ? (
            <div className="bg-white border border-[#ece4d6] rounded-3xl p-12 text-center shadow-sm">
              <div className="py-12 text-center max-w-md mx-auto space-y-4">
                <div className="h-16 w-16 bg-[#002e47]/5 text-[#002e47] rounded-full flex items-center justify-center mx-auto">
                  <ChefHat size={32} />
                </div>
                <h3 className="font-black text-[#002e47] text-base">ไม่พบข้อมูลวัตถุดิบในฐานข้อมูล</h3>
                <p className="text-xs text-[#5a6e7a] font-semibold leading-relaxed">
                  กรุณาเพิ่มวัตถุดิบใหม่ทีละรายการ หรือกดปุ่มด้านล่างเพื่อเริ่มสร้างชุดข้อมูลวัตถุดิบเริ่มต้น 12 รายการเข้าระบบโดยอัตโนมัติ
                </p>
                <button
                  type="button"
                  onClick={handleSeedDefaultData}
                  className="bg-[#002e47] text-white px-5 py-2.5 rounded-2xl font-bold text-xs tracking-wider transition hover:bg-[#004165] shadow-md cursor-pointer"
                >
                  ⚡ นำเข้าข้อมูลวัตถุดิบเริ่มต้น
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white border border-[#ece4d6] rounded-3xl p-4 sm:p-5 shadow-sm">
              <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans min-w-[650px]">
                <thead>
                  <tr className="border-b border-[#ece4d6] text-[#5a6e7a] font-bold">
                    <th className="py-3 px-4 font-black">ชื่อวัตถุดิบ</th>
                    <th className="py-3 px-4 font-black">เปิด-ปิดการขาย</th>
                    <th className="py-3 px-4 font-black">ปริมาณคงเหลือ</th>
                    <th className="py-3 px-4 font-black">ระดับแจ้งเตือนขั้นต่ำ</th>
                    <th className="py-3 px-4 font-black text-right">ปรับปรุงสต็อก / จัดการ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {/* Category Meat */}
                  <tr className="bg-slate-50/50">
                    <td colSpan={4} className="py-2.5 px-4 font-black text-xs text-[#002e47] border-y border-[#ece4d6]/60">
                      🥩 เนื้อสัตว์ (Meats)
                    </td>
                  </tr>
                  {groupedIngredients.meat.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 px-4 text-center text-slate-400 text-xs">ไม่มีรายการเนื้อสัตว์</td>
                    </tr>
                  ) : (
                    groupedIngredients.meat.map(item => renderRow(item))
                  )}

                  {/* Category Seafood */}
                  <tr className="bg-slate-50/50">
                    <td colSpan={4} className="py-2.5 px-4 font-black text-xs text-[#002e47] border-y border-[#ece4d6]/60">
                      🐙 อาหารทะเล (Seafood)
                    </td>
                  </tr>
                  {groupedIngredients.seafood.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 px-4 text-center text-slate-400 text-xs">ไม่มีรายการอาหารทะเล</td>
                    </tr>
                  ) : (
                    groupedIngredients.seafood.map(item => renderRow(item))
                  )}

                  {/* Category Toppings */}
                  <tr className="bg-slate-50/50">
                    <td colSpan={4} className="py-2.5 px-4 font-black text-xs text-[#002e47] border-y border-[#ece4d6]/60">
                      🥚 ไข่ & เครื่องเคียง (Toppings)
                    </td>
                  </tr>
                  {[...groupedIngredients.toppings, ...groupedIngredients.others].length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 px-4 text-center text-slate-400 text-xs">ไม่มีรายการเครื่องเคียง</td>
                    </tr>
                  ) : (
                    [...groupedIngredients.toppings, ...groupedIngredients.others].map(item => renderRow(item))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* Menu Items Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMenuItems.length === 0 ? (
            <div className="py-16 text-center text-slate-400 font-bold col-span-full bg-white rounded-3xl border border-[#ece4d6] p-6 shadow-soft">
              ไม่พบเมนูอาหารที่ค้นหา
            </div>
          ) : (
            filteredMenuItems.map((item) => {
              const isOutOfStock = outOfStockIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`bg-white border rounded-3xl p-4 flex gap-4 transition shadow-sm hover:shadow-md relative overflow-hidden ${isOutOfStock ? "border-red-200 bg-red-50/20" : "border-[#ece4d6]"
                    }`}
                >
                  {/* Food Image */}
                  <div className="h-20 w-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`h-full w-full object-cover transition duration-300 ${isOutOfStock ? "grayscale opacity-50" : ""
                        }`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/thai_food_hero.png";
                      }}
                    />
                    {isOutOfStock && (
                      <div className="absolute inset-0 bg-red-600/10 flex items-center justify-center">
                        <span className="bg-red-600 text-white text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm">
                          หมด
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-center gap-1.5 justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {item.category.toUpperCase()}
                        </span>
                        <span className="text-xs font-black text-[#002e47]">
                          ฿{item.price}
                        </span>
                      </div>
                      <h3 className="text-sm font-black text-[#002e47] mt-0.5 truncate" title={item.name}>
                        {item.name}
                      </h3>
                      <p className="text-[10px] font-semibold text-[#5a6e7a] line-clamp-2 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Toggle Button */}
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                      <span className={`text-[10px] font-extrabold tracking-wide ${isOutOfStock ? "text-red-500" : "text-emerald-600"
                        }`}>
                        {isOutOfStock ? "● ปิดการขายชั่วคราว" : "● เปิดขายปกติ"}
                      </span>
                      <button
                        onClick={() => toggleStock(item.id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isOutOfStock ? "bg-red-500" : "bg-emerald-500"
                          }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isOutOfStock ? "translate-x-5" : "translate-x-0"
                            }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

function TableManagementView({ orders }: { orders: OrderHistory[] }) {
  const [tables, setTables] = useState<any[]>([
    { id: "1", label: "โต๊ะ 1", status: "available" },
    { id: "2", label: "โต๊ะ 2", status: "occupied" },
    { id: "3", label: "โต๊ะ 3", status: "available" },
    { id: "4", label: "โต๊ะ 4", status: "available" },
    { id: "5", label: "โต๊ะ 5", status: "available" },
    { id: "6", label: "โต๊ะ 6", status: "occupied" },
    { id: "7", label: "โต๊ะ 7", status: "available" },
    { id: "8", label: "โต๊ะ 8", status: "available" },
  ]);
  const [selectedTable, setSelectedTable] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch tables from Supabase/localStorage
  const fetchTables = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("restaurant_tables")
        .select("id, label, status")
        .order("id");
      if (!error && data && data.length > 0) {
        setTables(data as any);
        localStorage.setItem("ran-lung-get-tables", JSON.stringify(data));
      } else {
        const local = localStorage.getItem("ran-lung-get-tables");
        if (local) {
          setTables(JSON.parse(local));
        }
      }
    } catch (e) {
      const local = localStorage.getItem("ran-lung-get-tables");
      if (local) {
        setTables(JSON.parse(local));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();

    // Subscribe to realtime changes
    const ch = supabase
      .channel("staff-tables-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "restaurant_tables" }, (payload) => {
        if (payload.eventType === "UPDATE" || payload.eventType === "INSERT") {
          const updated = payload.new as any;
          setTables((prev) => {
            const next = prev.map((t) => t.id === String(updated.id) ? { ...t, ...updated, id: String(updated.id) } : t);
            localStorage.setItem("ran-lung-get-tables", JSON.stringify(next));
            return next;
          });
        }
      })
      .subscribe();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ran-lung-get-tables" && e.newValue) {
        try {
          setTables(JSON.parse(e.newValue));
        } catch {}
      }
    };
    window.addEventListener("storage", handleStorageChange);

    return () => {
      supabase.removeChannel(ch);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const updateTableStatus = async (tableId: string, label: string, newStatus: string) => {
    const updated = tables.map((t) => t.id === tableId ? { ...t, status: newStatus } : t);
    setTables(updated);
    localStorage.setItem("ran-lung-get-tables", JSON.stringify(updated));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "ran-lung-get-tables",
      newValue: JSON.stringify(updated),
    }));

    // Update in Supabase
    try {
      await (supabase as any)
        .from("restaurant_tables")
        .update({ status: newStatus })
        .eq("id", tableId);
    } catch (e) {
      console.warn("Supabase update table status failed, using local fallback");
    }

    if (selectedTable && selectedTable.id === tableId) {
      setSelectedTable((prev: any) => prev ? { ...prev, status: newStatus } : null);
    }
  };

  // Get active dine-in orders for a table
  const getActiveOrdersForTable = (tableLabel: string) => {
    return orders.filter(
      (o) =>
        o.orderType === "dine-in" &&
        o.tableNumber === tableLabel &&
        o.status !== "สำเร็จ" &&
        o.status !== "ยกเลิก"
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-black tracking-tight text-[#002e47]">
            ผังที่นั่ง & จัดการสถานะโต๊ะอาหาร
          </h2>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            มอนิเตอร์และปรับปรุงสถานะโต๊ะอาหารแบบเรียลไทม์ (ว่าง / มีลูกค้า / จองแล้ว)
          </p>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={fetchTables}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-xs font-bold text-[#002e47] cursor-pointer transition active:scale-95 animate-fade-in"
          >
            รีเฟรชผังโต๊ะ
          </button>
        </div>
      </div>

      {/* Grid of Tables */}
      {loading ? (
        <div className="bg-white border border-[#ece4d6] rounded-3xl p-16 text-center text-slate-400 font-bold shadow-sm">
          กำลังโหลดข้อมูลผังโต๊ะ...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tables.map((table) => {
            const activeOrders = getActiveOrdersForTable(table.label);
            const isOccupied = table.status === "occupied";
            const isReserved = table.status === "reserved";
            const isAvailable = table.status === "available" || (!isOccupied && !isReserved);

            let statusLabel = "ว่าง";
            let statusColor = "bg-emerald-500 text-white border-emerald-600";
            let boxBg = "bg-emerald-50/30 border-emerald-200 hover:bg-emerald-50/50";
            if (isOccupied) {
              statusLabel = "มีลูกค้า";
              statusColor = "bg-red-500 text-white border-red-600";
              boxBg = "bg-red-50/30 border-red-200 hover:bg-red-50/50";
            } else if (isReserved) {
              statusLabel = "จองแล้ว";
              statusColor = "bg-amber-500 text-white border-amber-600";
              boxBg = "bg-amber-50/30 border-amber-200 hover:bg-amber-50/50";
            }

            return (
              <div
                key={table.id}
                onClick={() => setSelectedTable(table)}
                className={`border-2 rounded-3xl p-5 text-left relative overflow-hidden transition cursor-pointer flex flex-col justify-between min-h-[160px] shadow-sm hover:shadow ${boxBg}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-base text-[#002e47]">
                      {table.label}
                    </span>
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${statusColor}`}>
                      {statusLabel}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-wider">
                    ความจุ: 2-4 คน
                  </p>
                </div>

                {isOccupied && (
                  <div className="mt-4 pt-3 border-t border-red-100 text-xs">
                    {activeOrders.length > 0 ? (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between font-bold text-red-700">
                          <span>คิวปัจจุบัน:</span>
                          <span className="bg-red-100 text-red-800 px-1.5 py-0.2 rounded-md font-black text-[9px]">
                            {activeOrders.length} ออเดอร์
                          </span>
                        </div>
                        {activeOrders.slice(0, 2).map((o) => (
                          <div key={o.id} className="text-[11px] text-slate-600 font-semibold truncate">
                            {o.orderNumber} ({o.customerName || "คุณลูกค้า"})
                          </div>
                        ))}
                        {activeOrders.length > 2 && (
                          <div className="text-[9px] text-slate-400 font-bold italic">
                            และอีก {activeOrders.length - 2} รายการ...
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-slate-400 font-bold italic text-[11px]">
                        ไม่มีออเดอร์ในระบบ (เลือกนั่งเอง)
                      </div>
                    )}
                  </div>
                )}

                {isReserved && (
                  <div className="mt-4 pt-3 border-t border-amber-100 text-xs text-amber-800 font-bold italic">
                    โต๊ะถูกจองไว้สำหรับต้อนรับคิวถัดไป
                  </div>
                )}

                {isAvailable && (
                  <div className="mt-4 pt-3 border-t border-emerald-100 text-xs text-emerald-800 font-semibold italic">
                    โต๊ะว่าง พร้อมต้อนรับลูกค้า
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Detail & Action Modal */}
      {selectedTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setSelectedTable(null)}
          />
          <div className="bg-white rounded-[28px] p-6 w-full max-w-md z-10 border border-[#ece4d6] shadow-2xl relative text-[#002e47] flex flex-col max-h-[85vh]">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-black tracking-tight">
                  รายละเอียด {selectedTable.label}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  ความจุมาตรฐาน: 2-4 ที่นั่ง
                </p>
              </div>
              <button
                onClick={() => setSelectedTable(null)}
                className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 cursor-pointer text-slate-500"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto py-4 space-y-5 flex-1">
              {/* Status Section */}
              <div className="space-y-2">
                <p className="text-[10px] font-extrabold text-[#5a6e7a] tracking-wider uppercase">
                  สถานะโต๊ะปัจจุบัน
                </p>
                <div className="flex items-center gap-3">
                  {selectedTable.status === "available" && (
                    <span className="px-3.5 py-1.5 rounded-full font-black text-xs bg-emerald-100 text-emerald-800 border border-emerald-200">
                      🟢 โต๊ะว่าง (Available)
                    </span>
                  )}
                  {selectedTable.status === "occupied" && (
                    <span className="px-3.5 py-1.5 rounded-full font-black text-xs bg-red-100 text-red-800 border border-red-200">
                      🔴 มีลูกค้าอยู่ (Occupied)
                    </span>
                  )}
                  {selectedTable.status === "reserved" && (
                    <span className="px-3.5 py-1.5 rounded-full font-black text-xs bg-amber-100 text-amber-800 border border-amber-200">
                      🟡 จองแล้ว (Reserved)
                    </span>
                  )}
                </div>
              </div>

              {/* Order Details (if occupied) */}
              {selectedTable.status === "occupied" && (
                <div className="space-y-2.5">
                  <p className="text-[10px] font-extrabold text-[#5a6e7a] tracking-wider uppercase">
                    ออเดอร์ที่กำลังทาน
                  </p>
                  {(() => {
                    const activeOrders = getActiveOrdersForTable(selectedTable.label);
                    if (activeOrders.length === 0) {
                      return (
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-bold text-slate-400 italic">
                          ไม่มีออเดอร์ในระบบคิว (ลูกค้าเข้ามานั่งโดยตรงหรือพนักงานเปิดโต๊ะแมนนวล)
                        </div>
                      );
                    }
                    return (
                      <div className="space-y-3">
                        {activeOrders.map((o) => (
                          <div key={o.id} className="p-4 bg-[#fcfbf9] rounded-2xl border border-[#ece4d6] space-y-3">
                            <div className="flex items-center justify-between text-xs pb-2 border-b border-[#ece4d6]/60">
                              <span className="font-black text-[#002e47] text-sm">
                                {o.orderNumber}
                              </span>
                              <span className="text-slate-400 font-semibold">{o.date.split(" · ")[1] || ""}</span>
                            </div>
                            <div className="space-y-1.5 text-xs">
                              <div className="flex justify-between font-bold text-slate-600">
                                <span>ลูกค้า:</span>
                                <span className="text-[#002e47]">{o.customerName || "ไม่ระบุ"}</span>
                              </div>
                              <div className="space-y-1 mt-1 pl-2 border-l-2 border-slate-200">
                                {o.items.map((item, idx) => (
                                  <div key={idx} className="flex justify-between text-[11px] font-semibold text-slate-500">
                                    <span>{item.name} ×{item.qty}</span>
                                    <span>฿{item.price * item.qty}</span>
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-between font-black text-[#002e47] pt-2 border-t border-dashed border-slate-200 text-sm">
                                <span>ยอดรวม:</span>
                                <span>฿{o.total.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Status Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <p className="text-[10px] font-extrabold text-[#5a6e7a] tracking-wider uppercase">
                  เปลี่ยนสถานะโต๊ะด้วยตนเอง
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => updateTableStatus(selectedTable.id, selectedTable.label, "available")}
                    className={`py-3 px-1 rounded-2xl text-xs font-black transition active:scale-95 cursor-pointer text-center ${
                      selectedTable.status === "available"
                        ? "bg-emerald-500 text-white border border-emerald-600 shadow-inner"
                        : "bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-emerald-800"
                    }`}
                  >
                    ว่าง
                  </button>
                  <button
                    onClick={() => updateTableStatus(selectedTable.id, selectedTable.label, "occupied")}
                    className={`py-3 px-1 rounded-2xl text-xs font-black transition active:scale-95 cursor-pointer text-center ${
                      selectedTable.status === "occupied"
                        ? "bg-red-500 text-white border border-red-600 shadow-inner"
                        : "bg-slate-50 hover:bg-red-50 border border-slate-200 text-red-800"
                    }`}
                  >
                    มีลูกค้า
                  </button>
                  <button
                    onClick={() => updateTableStatus(selectedTable.id, selectedTable.label, "reserved")}
                    className={`py-3 px-1 rounded-2xl text-xs font-black transition active:scale-95 cursor-pointer text-center ${
                      selectedTable.status === "reserved"
                        ? "bg-amber-500 text-white border border-amber-600 shadow-inner"
                        : "bg-slate-50 hover:bg-amber-50 border border-slate-200 text-amber-800"
                    }`}
                  >
                    จองแล้ว
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => setSelectedTable(null)}
                className="w-full py-3 bg-[#002e47] hover:opacity-95 text-white rounded-2xl text-xs font-black cursor-pointer transition text-center"
              >
                เสร็จสิ้น
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function KitchenMonitor() {
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("active"); // "active", "รอดำเนินการ", "กำลังทำ", "พร้อมเสิร์ฟ", "สำเร็จ"
  const [typeFilter, setTypeFilter] = useState<string>("all"); // "all", "dine-in", "takeaway", "delivery"
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<"kitchen" | "dashboard" | "menu" | "tables">("kitchen");

  // Auth Check for Staff — ใช้ Supabase session แทน localStorage token
  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await (await import("../../lib/supabase")).supabase.auth.getSession();
      if (!session) {
        window.location.href = "/login";
        return;
      }
      // ตรวจสอบ role จาก users table
      const { supabase } = await import("../../lib/supabase");
      const { data } = await (supabase as any)
        .from("users")
        .select("role")
        .eq("auth_user_id", session.user.id)
        .maybeSingle();
      const role = data?.role ?? "customer";
      if (role !== "staff" && role !== "admin") {
        // ถ้าไม่ใช่ staff หรือ admin ให้ไปหน้า customer แทน
        window.location.href = "/customer";
      }
    }
    checkAuth();
  }, []);

  const fetchSupabaseOrders = async () => {
    try {
      const { data: dbOrders, error: dbOrdersError } = await supabase
        .from("orders")
        .select(`
          *,
          customers (
            display_name
          ),
          order_items (*)
        `)
        .order("created_at", { ascending: false });

      if (!dbOrdersError && dbOrders) {
        const mappedOrders: OrderHistory[] = dbOrders.map((o: any) => {
          let localStatus = "รอดำเนินการ";
          if (o.status === "pending") localStatus = "รอดำเนินการ";
          else if (o.status === "preparing") localStatus = "กำลังทำ";
          else if (o.status === "delivering") localStatus = "พร้อมเสิร์ฟ";
          else if (o.status === "completed") localStatus = "สำเร็จ";
          else if (o.status === "cancelled") localStatus = "ยกเลิก";

          return {
            id: o.id,
            orderNumber: o.order_number,
            date: new Date(o.created_at).toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" }) + " · " + new Date(o.created_at).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
            items: (o.order_items || []).map((item: any) => ({
              name: item.name,
              qty: item.quantity,
              price: Number(item.unit_price),
              image: item.image || ""
            })),
            subtotal: Number(o.subtotal),
            delivery: Number(o.delivery_fee),
            total: Number(o.total),
            status: localStatus,
            orderType: o.order_type,
            customerName: o.customers?.display_name || "คุณลูกค้า",
            tableNumber: o.table_number || "",
            queueNumber: o.queue_number || "",
            note: o.special_instructions || ""
          };
        });

        setOrders((prev) => {
          // Filter out local mock orders that match DB orders IDs to avoid duplicates
          const localOnly = prev.filter(p => !p.id.startsWith("hist_") && !p.id.includes("-") && !mappedOrders.some(m => m.id === p.id));
          const combined = [...mappedOrders, ...localOnly];
          localStorage.setItem("ran-lung-get-orders", JSON.stringify(combined));
          return combined;
        });
      }
    } catch (e) {
      console.error("Failed to fetch Supabase orders:", e);
    }
  };

  // Load orders from localStorage and Supabase
  useEffect(() => {
    const saved = localStorage.getItem("ran-lung-get-orders");
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse orders:", e);
      }
    }
    fetchSupabaseOrders();

    // Subscribe to realtime orders changes
    const ordersCh = supabase
      .channel("staff-orders-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
        fetchSupabaseOrders();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "order_items" }, () => {
        fetchSupabaseOrders();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(ordersCh);
    };
  }, []);

  // Listen to storage sync events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ran-lung-get-orders" && e.newValue) {
        try {
          const newOrders: OrderHistory[] = JSON.parse(e.newValue);

          setOrders((prev) => {
            const prevIds = new Set(prev.map(o => o.id));
            const hasNew = newOrders.some(o => !prevIds.has(o.id));
            if (hasNew && soundEnabled) {
              playNotificationSound();
            }
            return newOrders;
          });
        } catch (err) {
          console.error("Sync error:", err);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [soundEnabled]);

  // Poll localStorage as a fallback for real-time sync
  useEffect(() => {
    let lastValue = localStorage.getItem("ran-lung-get-orders");
    const interval = setInterval(() => {
      const currentValue = localStorage.getItem("ran-lung-get-orders");
      if (currentValue !== lastValue) {
        lastValue = currentValue;
        if (currentValue) {
          try {
            const newOrders: OrderHistory[] = JSON.parse(currentValue);
            setOrders((prev) => {
              const prevIds = new Set(prev.map(o => o.id));
              const hasNew = newOrders.some(o => !prevIds.has(o.id));
              if (hasNew && soundEnabled) {
                playNotificationSound();
              }
              return newOrders;
            });
          } catch (err) {
            console.error("Sync error in polling:", err);
          }
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [soundEnabled]);

  // Sync state back to localStorage and notify other tabs
  const updateOrdersAndNotify = (updatedList: OrderHistory[]) => {
    setOrders(updatedList);
    localStorage.setItem("ran-lung-get-orders", JSON.stringify(updatedList));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "ran-lung-get-orders",
      newValue: JSON.stringify(updatedList),
    }));
  };

  const advanceOrderStatus = (orderId: string, currentStatus: string) => {
    let nextStatus = "สำเร็จ";
    if (currentStatus === "รอดำเนินการ") nextStatus = "กำลังทำ";
    else if (currentStatus === "กำลังทำ" || currentStatus === "กำลังเตรียม") nextStatus = "พร้อมเสิร์ฟ";
    else if (currentStatus === "พร้อมเสิร์ฟ") nextStatus = "สำเร็จ";

    const updated = orders.map((o) => {
      if (o.id === orderId) {
        // หักสต็อกเมื่อออเดอร์เปลี่ยนจาก "รอดำเนินการ" -> "กำลังปรุง/กำลังทำ"
        if (currentStatus === "รอดำเนินการ") {
          adjustStockFromOrder(o.items, "deduct");
        }
        // Clear table if complete
        if (nextStatus === "สำเร็จ" && o.orderType === "dine-in" && o.tableNumber) {
          const savedTables = localStorage.getItem("ran-lung-get-tables");
          if (savedTables) {
            try {
              const parsedTables = JSON.parse(savedTables);
              const updatedTables = parsedTables.map((t: any) =>
                t.label === o.tableNumber ? { ...t, status: "available" } : t
              );
              localStorage.setItem("ran-lung-get-tables", JSON.stringify(updatedTables));
              window.dispatchEvent(new StorageEvent("storage", {
                key: "ran-lung-get-tables",
                newValue: JSON.stringify(updatedTables),
              }));

              // Clear table status in Supabase as well
              const tableId = o.tableNumber.replace(/[^0-9]/g, ""); // e.g. "โต๊ะ 3" -> "3"
              if (tableId) {
                void (supabase as any)
                  .from("restaurant_tables")
                  .update({ status: "available" })
                  .eq("id", tableId);
              }
            } catch (e) {
              console.error("Failed to clear table status on complete:", e);
            }
          }
        }
        // Sync to Supabase
        if (!orderId.startsWith("hist_")) {
          const sbStatus = nextStatus === "สำเร็จ" ? "completed" : nextStatus === "พร้อมเสิร์ฟ" ? "delivering" : "preparing";
          void supabase.from("orders").update({ status: sbStatus }).eq("id", orderId);
        }
        return { ...o, status: nextStatus };
      }
      return o;
    });
    updateOrdersAndNotify(updated);
  };

  const cancelOrder = (orderId: string) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        // คืนสต็อกหากออเดอร์ถูกยกเลิก (และเคยถูกหักสต็อกไปแล้ว คือตอนที่อยู่ในขั้นตอนปรุง/พร้อมเสิร์ฟ/สำเร็จ)
        if (o.status !== "รอดำเนินการ" && o.status !== "ยกเลิก" && o.status !== "ขอคืนเงิน") {
          adjustStockFromOrder(o.items, "add");
        }
        // Clear table if dine-in
        if (o.orderType === "dine-in" && o.tableNumber) {
          const savedTables = localStorage.getItem("ran-lung-get-tables");
          if (savedTables) {
            try {
              const parsedTables = JSON.parse(savedTables);
              const updatedTables = parsedTables.map((t: any) =>
                t.label === o.tableNumber ? { ...t, status: "available" } : t
              );
              localStorage.setItem("ran-lung-get-tables", JSON.stringify(updatedTables));
              window.dispatchEvent(new StorageEvent("storage", {
                key: "ran-lung-get-tables",
                newValue: JSON.stringify(updatedTables),
              }));

              // Clear table status in Supabase as well
              const tableId = o.tableNumber.replace(/[^0-9]/g, ""); // e.g. "โต๊ะ 3" -> "3"
              if (tableId) {
                void (supabase as any)
                  .from("restaurant_tables")
                  .update({ status: "available" })
                  .eq("id", tableId);
              }
            } catch (e) {
              console.error("Failed to clear table status on cancel:", e);
            }
          }
        }
        // Sync to Supabase
        if (!orderId.startsWith("hist_")) {
          void supabase.from("orders").update({ status: "cancelled" }).eq("id", orderId);
        }
        return { ...o, status: "ยกเลิก" };
      }
      return o;
    });
    updateOrdersAndNotify(updated);
  };

  const regressOrderStatus = (orderId: string, currentStatus: string) => {
    let prevStatus = "รอดำเนินการ";
    if (currentStatus === "กำลังทำ" || currentStatus === "กำลังเตรียม") prevStatus = "รอดำเนินการ";
    else if (currentStatus === "พร้อมเสิร์ฟ") prevStatus = "กำลังทำ";
    else if (currentStatus === "สำเร็จ") prevStatus = "พร้อมเสิร์ฟ";

    const updated = orders.map((o) => {
      if (o.id === orderId) {
        // คืนสต็อกหากปรับสถานะกลับมาเป็น "รอดำเนินการ" จากขั้นที่เคยหักสต็อกไปแล้ว
        if (prevStatus === "รอดำเนินการ" && (currentStatus === "กำลังทำ" || currentStatus === "กำลังเตรียม" || currentStatus === "พร้อมเสิร์ฟ" || currentStatus === "สำเร็จ")) {
          adjustStockFromOrder(o.items, "add");
        }
        // Sync to Supabase
        if (!orderId.startsWith("hist_")) {
          const sbStatus = prevStatus === "รอดำเนินการ" ? "pending" : prevStatus === "กำลังทำ" ? "preparing" : "delivering";
          void supabase.from("orders").update({ status: sbStatus }).eq("id", orderId);
        }
        return { ...o, status: prevStatus };
      }
      return o;
    });
    updateOrdersAndNotify(updated);
  };

  const clearCompletedOrders = () => {
    const updated = orders.filter(o => o.status !== "สำเร็จ");
    updateOrdersAndNotify(updated);
  };

  // Mock simulator order placement
  const triggerMockOrder = () => {
    const isDineIn = Math.random() > 0.4;
    const orderType: OrderType = isDineIn ? "dine-in" : (Math.random() > 0.5 ? "delivery" : "takeaway");

    // Pick 1-3 random items
    const itemsCount = Math.floor(Math.random() * 3) + 1;
    const items = [];
    let subtotal = 0;
    for (let i = 0; i < itemsCount; i++) {
      const rawItem = MENU_ITEMS_FOR_SIMULATION[Math.floor(Math.random() * MENU_ITEMS_FOR_SIMULATION.length)];
      const qty = Math.floor(Math.random() * 2) + 1;

      let name = rawItem.name;
      const details = [];
      if (rawItem.category === "signature" || rawItem.category === "main" || rawItem.category === "noodles") {
        details.push(SPICY_LEVELS[Math.floor(Math.random() * SPICY_LEVELS.length)]);
      }
      if (Math.random() > 0.5 && rawItem.category !== "drinks" && rawItem.category !== "dessert") {
        details.push("ไข่ดาว (+฿10)");
        subtotal += 10 * qty;
      }

      const formattedName = name + (details.length > 0 ? ` (${details.join(", ")})` : "");
      items.push({
        name: formattedName,
        qty,
        price: rawItem.price,
        image: rawItem.image,
      });
      subtotal += rawItem.price * qty;
    }

    const delivery = orderType === "delivery" ? 40 : 0;
    const orderNum = `#AK-${Math.floor(2848 + Math.random() * 100)}`;
    const name = CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)];
    const tableNum = isDineIn ? TABLES[Math.floor(Math.random() * TABLES.length)] : "";
    const randomNote = Math.random() > 0.4 ? NOTES[Math.floor(Math.random() * NOTES.length)] : "";

    const newOrder: OrderHistory = {
      id: `hist_${Date.now()}`,
      orderNumber: orderNum,
      date: new Date().toLocaleDateString("th-TH", { day: "numeric", month: "short", year: "numeric" }) + " · " + new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
      items,
      subtotal,
      delivery,
      total: subtotal + delivery,
      status: "รอดำเนินการ",
      orderType,
      customerName: name,
      tableNumber: tableNum,
      note: randomNote,
    };

    const updated = [newOrder, ...orders];
    updateOrdersAndNotify(updated);
    if (soundEnabled) {
      playNotificationSound();
    }
  };

  // State stats aggregation
  const stats = useMemo(() => {
    let waiting = 0;
    let cooking = 0;
    let ready = 0;
    let completed = 0;

    orders.forEach((o) => {
      if (o.status === "รอดำเนินการ") waiting++;
      else if (o.status === "กำลังทำ" || o.status === "กำลังเตรียม") cooking++;
      else if (o.status === "พร้อมเสิร์ฟ") ready++;
      else if (o.status === "สำเร็จ") completed++;
    });

    return { waiting, cooking, ready, completed, totalActive: waiting + cooking + ready };
  }, [orders]);

  // Aggregate stats group by menu name
  const menuSummary = useMemo(() => {
    const summary: Record<string, number> = {};
    orders
      .filter((o) => o.status === "รอดำเนินการ" || o.status === "กำลังทำ" || o.status === "กำลังเตรียม")
      .forEach((o) => {
        o.items.forEach((item) => {
          const baseName = item.name.split(" (")[0];
          summary[baseName] = (summary[baseName] || 0) + item.qty;
        });
      });
    return Object.entries(summary).sort((a, b) => b[1] - a[1]);
  }, [orders]);

  // Filter orders (oldest first for FIFO)
  const filteredOrders = useMemo(() => {
    let result = [...orders];
    result.sort((a, b) => getTimestampFromOrderId(a.id) - getTimestampFromOrderId(b.id));

    if (statusFilter !== "active") {
      result = result.filter((o) => o.status === statusFilter);
    } else {
      result = result.filter((o) => o.status !== "สำเร็จ");
    }

    if (typeFilter !== "all") {
      result = result.filter((o) => o.orderType === typeFilter);
    }

    return result;
  }, [orders, statusFilter, typeFilter]);

  // Specific columns grouping when showing all active orders
  const ordersByStatus = useMemo(() => {
    const list = orders.filter(o => typeFilter === "all" ? true : o.orderType === typeFilter);
    list.sort((a, b) => getTimestampFromOrderId(a.id) - getTimestampFromOrderId(b.id));

    const waiting = list.filter(o => o.status === "รอดำเนินการ");
    const cooking = list.filter(o => o.status === "กำลังทำ" || o.status === "กำลังเตรียม");
    const ready = list.filter(o => o.status === "พร้อมเสิร์ฟ");

    return { waiting, cooking, ready };
  }, [orders, typeFilter]);

  return (
    <div className="h-screen bg-[#fff8f2] text-[#002e47] flex flex-row font-sans select-none antialiased overflow-hidden">
      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-[50] md:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] z-[55] flex flex-col md:hidden shadow-2xl"
            >
              <KitchenSidebarContent
                view={view}
                setView={setView}
                onClose={() => setSidebarOpen(false)}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Sticky left) */}
      <aside className="hidden md:flex flex-col w-72 h-screen shrink-0 border-r border-[#ece4d6] shadow-soft z-20">
        <KitchenSidebarContent view={view} setView={setView} />
      </aside>

      {/* Main Workspace (Takes full remaining space) */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">

        {/* Desktop Header */}
        <header className="hidden md:block bg-white border-b border-[#ece4d6] p-4 sticky top-0 z-30 shadow-sm shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#002e47] text-white shadow-md">
                {view === "kitchen" ? (
                  <ChefHat className="h-5 w-5" color={GOLD} />
                ) : view === "tables" ? (
                  <Table className="h-5 w-5" color={GOLD} />
                ) : (
                  <LayoutDashboard className="h-5 w-5" color={GOLD} />
                )}
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black tracking-tight" style={{ color: BRAND }}>
                  {view === "kitchen"
                    ? "จอจัดการครัวลุงเกตุ"
                    : view === "tables"
                    ? "ผังที่นั่ง & จัดการสถานะโต๊ะ"
                    : "แดชบอร์ดภาพรวมร้านค้า"}
                </h1>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500">
                  {view === "kitchen"
                    ? "ระบบจัดคิวอาหารและมอนิเตอร์หน้าเตา"
                    : view === "tables"
                    ? "ตรวจสอบและเปลี่ยนสถานะโต๊ะ ว่าง / ไม่ว่าง / จองแล้ว"
                    : "วิเคราะห์ยอดขาย จำนวนลูกค้า และสถิติร้านค้า"
                  }
                </p>
              </div>
            </div>

            {/* Quick Actions & Counter */}
            <div className="flex items-center gap-2 text-xs">
              {view === "kitchen" && (
                <div className="bg-[#fcfbf9] border border-[#ece4d6] px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold">
                  <span className="text-[10px] text-slate-500">คิวรอดำเนินการ:</span>
                  <span className="text-xs sm:text-sm font-black" style={{ color: BRAND }}>{stats.totalActive}</span>
                </div>
              )}

              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-xl border transition active:scale-95 cursor-pointer ${soundEnabled
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100"
                    : "bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200"
                  }`}
                title={soundEnabled ? "ปิดเสียงเตือน" : "เปิดเสียงเตือน"}
              >
                {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>

              <button
                onClick={triggerMockOrder}
                className="flex items-center gap-1.5 hover:opacity-90 active:scale-95 text-[#002e47] px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition shadow-sm cursor-pointer border border-[#002e47]/10"
                style={{ background: GOLD }}
              >
                <PlusCircle size={13} />
                <span>จำลองออเดอร์</span>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Sticky Top Header */}
        <header className="block md:hidden bg-white border-b border-[#ece4d6] p-3 sticky top-0 z-30 shadow-sm shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Hamburger menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-[#002e47] transition active:scale-95 cursor-pointer border border-[#ece4d6]"
              >
                <Menu size={18} />
              </button>
              <div>
                <h1 className="text-sm font-black tracking-tight" style={{ color: BRAND }}>
                  {view === "kitchen" ? "ครัวลุงเกตุ" : view === "tables" ? "ผังโต๊ะอาหาร" : "แดชบอร์ดหลังบ้าน"}
                </h1>
                <p className="text-[9px] font-bold text-slate-500">
                  {view === "kitchen" ? (
                    <>
                      คิวค้าง: <span className="text-[#002e47]">{stats.totalActive}</span> · ช่องทาง: {
                        typeFilter === "all" ? "ทั้งหมด" :
                          typeFilter === "dine-in" ? "ทานที่ร้าน" :
                            typeFilter === "takeaway" ? "กลับบ้าน" : "เดลิเวอรี่"
                      }
                    </>
                  ) : view === "tables" ? (
                    "จัดการผังโต๊ะเรียลไทม์"
                  ) : (
                    "ภาพรวมร้านค้าลุงเกตุ"
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {statusFilter === "สำเร็จ" && stats.completed > 0 && (
                <button
                  onClick={clearCompletedOrders}
                  className="flex items-center gap-1 bg-red-50 border border-red-200 text-red-600 px-2.5 py-1 rounded-xl text-[10px] font-black transition cursor-pointer"
                >
                  <Trash2 size={11} />
                  <span>ล้าง</span>
                </button>
              )}

              {!soundEnabled && (
                <span className="p-1.5 rounded-lg bg-red-50 text-red-500 border border-red-100 flex items-center justify-center">
                  <VolumeX size={13} />
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Main content grid */}
        <main className="p-3 sm:p-4 lg:p-6 w-full mx-auto flex flex-col gap-4 sm:gap-6">
          {view === "dashboard" ? (
            <DashboardView orders={orders} />
          ) : view === "menu" ? (
            <MenuManagementView />
          ) : view === "tables" ? (
            <TableManagementView orders={orders} />
          ) : (
            <>
              {/* Navigation Tabs and Channel Filters - Desktop/Tablet */}
              <div className="hidden md:flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white border border-[#ece4d6] p-3 rounded-2xl shrink-0 shadow-sm">
                {/* Status Tabs */}
                <div className="flex flex-row overflow-x-auto no-scrollbar gap-1 w-full sm:w-auto shrink-0 pb-1 sm:pb-0">
                  {[
                    { id: "active", label: "คิวปัจจุบัน (Kanban)", count: stats.totalActive },
                    { id: "รอดำเนินการ", label: "ออเดอร์ใหม่", count: stats.waiting, dotColor: "bg-amber-500" },
                    { id: "กำลังทำ", label: "กำลังปรุง", count: stats.cooking, dotColor: "bg-blue-500" },
                    { id: "พร้อมเสิร์ฟ", label: "พร้อมเสิร์ฟ", count: stats.ready, dotColor: "bg-emerald-500" },
                    { id: "สำเร็จ", label: "เสร็จสิ้น", count: stats.completed },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setStatusFilter(tab.id)}
                      className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs tracking-wider transition-all shrink-0 cursor-pointer ${statusFilter === tab.id
                          ? "bg-[#002e47] text-white shadow-inner"
                          : "text-[#5a6e7a] hover:text-[#002e47] hover:bg-slate-50"
                        }`}
                    >
                      {tab.dotColor && (
                        <span className={`h-1.5 w-1.5 rounded-full ${tab.dotColor} animate-pulse`} />
                      )}
                      <span>{tab.label}</span>
                      {tab.count !== undefined && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${statusFilter === tab.id
                            ? "bg-slate-700 text-white"
                            : "bg-slate-100 text-[#5a6e7a]"
                          }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Channels Filter Dropdown & Clearing history button */}
                <div className="flex items-center gap-2 justify-between sm:justify-start w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: INK_MUTED }}>
                    <Filter size={14} />
                    <span>ช่องทาง:</span>
                  </div>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="bg-white border border-[#ece4d6] rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#002e47] focus:outline-none shadow-sm flex-1 sm:flex-initial max-w-[150px]"
                  >
                    <option value="all">ทั้งหมด</option>
                    <option value="dine-in">ทานที่ร้าน</option>
                    <option value="takeaway">กลับบ้าน</option>
                    <option value="delivery">เดลิเวอรี่</option>
                  </select>
                </div>
              </div>

              {/* Menu Item Summary (Horizontal scrollable pills) */}
              {menuSummary.length > 0 && (
                <div className="bg-white border border-[#ece4d6] p-3 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-2.5 shrink-0 shadow-sm">
                  <div className="flex items-center gap-1.5 text-xs font-black text-[#002e47] shrink-0">
                    <ChefHat size={14} className="text-[#fcc14a]" />
                    <span>ยอดสรุปอาหารที่ต้องปรุง:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 overflow-x-auto no-scrollbar max-h-[80px] sm:max-h-none overflow-y-auto">
                    {menuSummary.map(([name, qty]) => (
                      <div
                        key={name}
                        className="flex items-center gap-1.5 bg-[#002e47]/5 border border-[#002e47]/10 rounded-xl px-3 py-1 text-xs shrink-0 font-bold"
                      >
                        <span className="text-[#002e47]">{name}</span>
                        <span className="bg-[#fcc14a] text-[#002e47] font-black px-1.5 py-0.2 rounded-md text-[10px] leading-tight">
                          x{qty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="w-full overflow-x-auto pb-6">
                {statusFilter === "active" ? (
                  <>
                    {/* Mobile: Single vertical scrollable stack list of cards directly succeeding each other */}
                    <div className="flex md:hidden flex-col gap-4 pb-24">
                      {filteredOrders.length === 0 ? (
                        <div className="py-16 text-center text-[#5a6e7a] font-bold bg-white rounded-3xl border border-[#ece4d6] p-6 shadow-soft">
                          <ChefHat size={36} className="opacity-30 mx-auto mb-2" />
                          <span>ไม่มีรายการคิวปัจจุบัน</span>
                        </div>
                      ) : (
                        filteredOrders.map(o => (
                          <OrderCard
                            key={o.id}
                            order={o}
                            advanceOrderStatus={advanceOrderStatus}
                            regressOrderStatus={regressOrderStatus}
                            cancelOrder={cancelOrder}
                          />
                        ))
                      )}
                    </div>

                    {/* Desktop/Tablet: 3 Kanban columns side-by-side */}
                    <div className="hidden md:grid md:grid-cols-3 gap-6 min-w-[960px]">
                      {/* Column 1: Waiting */}
                      <div className="flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-soft">
                        <div className="p-4 bg-amber-500/10 border-b border-[#ece4d6] flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
                            <h3 className="font-black text-sm uppercase tracking-wider" style={{ color: BRAND }}>
                              ออเดอร์ใหม่
                            </h3>
                          </div>
                          <span className="text-white text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-500">
                            {ordersByStatus.waiting.length}
                          </span>
                        </div>
                        <div className="p-4 space-y-4 bg-[#f8fafc]/50">
                          {ordersByStatus.waiting.length === 0 ? (
                            <EmptyColumnMessage text="ไม่มีออเดอร์ใหม่" />
                          ) : (
                            ordersByStatus.waiting.map(o => (
                              <OrderCard
                                key={o.id}
                                order={o}
                                advanceOrderStatus={advanceOrderStatus}
                                regressOrderStatus={regressOrderStatus}
                                cancelOrder={cancelOrder}
                              />
                            ))
                          )}
                        </div>
                      </div>

                      {/* Column 2: Cooking */}
                      <div className="flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-soft">
                        <div className="p-4 bg-blue-50 border-b border-[#ece4d6] flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
                            <h3 className="font-black text-sm uppercase tracking-wider" style={{ color: BRAND }}>
                              กำลังปรุง
                            </h3>
                          </div>
                          <span className="text-white text-xs font-black px-2.5 py-0.5 rounded-full bg-blue-600">
                            {ordersByStatus.cooking.length}
                          </span>
                        </div>
                        <div className="p-4 space-y-4 bg-[#f8fafc]/50">
                          {ordersByStatus.cooking.length === 0 ? (
                            <EmptyColumnMessage text="ไม่มีรายการกำลังปรุง" />
                          ) : (
                            ordersByStatus.cooking.map(o => (
                              <OrderCard
                                key={o.id}
                                order={o}
                                advanceOrderStatus={advanceOrderStatus}
                                regressOrderStatus={regressOrderStatus}
                                cancelOrder={cancelOrder}
                              />
                            ))
                          )}
                        </div>
                      </div>

                      {/* Column 3: Ready */}
                      <div className="flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-soft">
                        <div className="p-4 bg-emerald-50 border-b border-[#ece4d6] flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <h3 className="font-black text-sm uppercase tracking-wider" style={{ color: BRAND }}>
                              พร้อมเสิร์ฟ
                            </h3>
                          </div>
                          <span className="text-white text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500">
                            {ordersByStatus.ready.length}
                          </span>
                        </div>
                        <div className="p-4 space-y-4 bg-[#f8fafc]/50">
                          {ordersByStatus.ready.length === 0 ? (
                            <EmptyColumnMessage text="ไม่มีออเดอร์พร้อมเสิร์ฟ" />
                          ) : (
                            ordersByStatus.ready.map(o => (
                              <OrderCard
                                key={o.id}
                                order={o}
                                advanceOrderStatus={advanceOrderStatus}
                                regressOrderStatus={regressOrderStatus}
                                cancelOrder={cancelOrder}
                              />
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Single status full screen grid (e.g. Completed history view) */
                  <div className="bg-white rounded-3xl border border-[#ece4d6] shadow-soft flex flex-col">
                    <div className="p-4 bg-slate-50 border-b border-[#ece4d6] flex items-center justify-between shrink-0">
                      <h3 className="font-black text-sm uppercase tracking-wider" style={{ color: BRAND }}>
                        {statusFilter === "สำเร็จ" ? "ประวัติรายการสำเร็จ" : `สถานะออเดอร์: ${statusFilter}`}
                      </h3>
                      <div className="flex items-center gap-2">
                        {statusFilter === "สำเร็จ" && stats.completed > 0 && (
                          <button
                            onClick={clearCompletedOrders}
                            className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer shadow-sm"
                          >
                            <Trash2 size={13} />
                            <span>ล้างรายการสำเร็จทั้งหมด</span>
                          </button>
                        )}
                        <span className="bg-slate-200 text-slate-700 text-xs font-black px-2.5 py-0.5 rounded-full">
                          {filteredOrders.length} รายการ
                        </span>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 pb-24 md:pb-6 bg-[#f8fafc]/50">
                      <div className={`mx-auto w-full ${statusFilter === "สำเร็จ"
                          ? "flex flex-col gap-3 max-w-3xl"
                          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                        }`}>
                        {filteredOrders.length === 0 ? (
                          <div className="py-16 text-center text-slate-400 font-bold w-full col-span-full">
                            ไม่มีออเดอร์ในส่วนนี้
                          </div>
                        ) : (
                          filteredOrders.map(o => (
                            statusFilter === "สำเร็จ" ? (
                              <HistoryOrderRow
                                key={o.id}
                                order={o}
                              />
                            ) : (
                              <OrderCard
                                key={o.id}
                                order={o}
                                advanceOrderStatus={advanceOrderStatus}
                                regressOrderStatus={regressOrderStatus}
                                cancelOrder={cancelOrder}
                              />
                            )
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </main>

        {/* Mobile Bottom Tab Navigation */}
        <div className="block md:hidden sticky bottom-0 left-0 right-0 bg-white border-t border-[#ece4d6] shadow-lg px-2 py-1 z-30 shrink-0">
          <div className="flex items-center justify-around">
            {[
              { id: "active", label: "ทั้งหมด", icon: ClipboardList, count: stats.totalActive },
              { id: "รอดำเนินการ", label: "ใหม่", icon: Inbox, count: stats.waiting },
              { id: "กำลังทำ", label: "กำลังปรุง", icon: Flame, count: stats.cooking },
              { id: "พร้อมเสิร์ฟ", label: "พร้อมเสิร์ฟ", icon: CheckCircle, count: stats.ready },
              { id: "สำเร็จ", label: "สำเร็จแล้ว", icon: Trophy, count: stats.completed },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = view === "kitchen" && statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setView("kitchen");
                    setStatusFilter(tab.id);
                  }}
                  className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all cursor-pointer min-w-[60px] ${isActive
                      ? "text-[#002e47] font-black"
                      : "text-slate-400 font-medium"
                    }`}
                >
                  <div className="relative">
                    <TabIcon size={18} className={isActive ? "stroke-[2.5]" : "stroke-[2]"} />
                    {tab.count > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[8px] font-bold px-1 py-0.2 rounded-full min-w-[12px] text-center">
                        {tab.count}
                      </span>
                    )}
                  </div>
                  <span className="text-[9px] mt-1 tracking-tight">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

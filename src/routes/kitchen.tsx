import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ChefHat,
  Volume2,
  VolumeX,
  PlusCircle,
  Filter,
  Trash2,
  Flame,
  Inbox,
  Trophy,
  ClipboardList,
  Menu,
  LayoutDashboard,
  CheckCircle,
  Bell,
  Bike,
} from "lucide-react";

import {
  type OrderHistory,
  type OrderType,
  playNotificationSound,
  playRefundSound,
  getTimestampFromOrderId,
  MENU_ITEMS_FOR_SIMULATION,
  CUSTOMER_NAMES,
  TABLES,
  SPICY_LEVELS,
  NOTES,
  OrderCard,
  HistoryOrderRow,
  EmptyColumnMessage,
  MenuManagementView,
  RefundManagementView,
  KitchenSidebarContent,
  DashboardView,
} from "../features/kitchen";
import { generateUniqueOrderNumber } from "../lib/utils";

export const Route = createFileRoute("/kitchen")({
  head: () => ({
    meta: [
      { title: "DineOS" },
      { name: "description", content: "หน้าจอแสดงผลและจัดการคิวอาหารในห้องครัว DineOS" },
    ],
  }),
  component: KitchenMonitor,
});

const BRAND = "#002e47";
const GOLD = "#fcc14a";
const INK_MUTED = "#5a6e7a";

function KitchenMonitor() {
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("active");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<"kitchen" | "dashboard" | "menu" | "refunds">("kitchen");

  // Load orders from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("ran-lung-get-orders");
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse orders:", e);
      }
    }
  }, []);

  // Listen to storage sync events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ran-lung-get-orders" && e.newValue) {
        try {
          const newOrders: OrderHistory[] = JSON.parse(e.newValue);
          
          setOrders((prev) => {
            if (soundEnabled) {
              const oldRefunds = prev.filter(o => o.status === "ขอคืนเงิน").map(o => o.id);
              const hasNewRefund = newOrders.some(o => o.status === "ขอคืนเงิน" && !oldRefunds.includes(o.id));
              
              if (hasNewRefund) {
                playRefundSound();
              } else {
                const prevIds = new Set(prev.map(o => o.id));
                const hasNew = newOrders.some(o => !prevIds.has(o.id));
                if (hasNew) {
                  playNotificationSound();
                }
              }
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
              if (soundEnabled) {
                const oldRefunds = prev.filter(o => o.status === "ขอคืนเงิน").map(o => o.id);
                const hasNewRefund = newOrders.some(o => o.status === "ขอคืนเงิน" && !oldRefunds.includes(o.id));
                
                if (hasNewRefund) {
                  playRefundSound();
                } else {
                  const prevIds = new Set(prev.map(o => o.id));
                  const hasNew = newOrders.some(o => !prevIds.has(o.id));
                  if (hasNew) {
                    playNotificationSound();
                  }
                }
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
    const target = orders.find((o) => o.id === orderId);
    const isDelivery = target?.orderType === "delivery";

    if (currentStatus === "รอดำเนินการ" || currentStatus === "รอรับออเดอร์" || currentStatus === "pending") {
      nextStatus = "กำลังทำ";
    } else if (currentStatus === "กำลังทำ" || currentStatus === "กำลังเตรียม" || currentStatus === "preparing") {
      nextStatus = "พร้อมเสิร์ฟ";
    } else if (currentStatus === "พร้อมเสิร์ฟ" || currentStatus === "ready") {
      if (isDelivery) {
        nextStatus = "กำลังจัดส่ง";
      } else {
        nextStatus = "สำเร็จ";
      }
    } else if (currentStatus === "กำลังจัดส่ง" || currentStatus === "delivering") {
      nextStatus = "สำเร็จ";
    }

    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status: nextStatus };
      }
      return o;
    });
    updateOrdersAndNotify(updated);
  };

  const regressOrderStatus = (orderId: string, currentStatus: string) => {
    let prevStatus = "รอดำเนินการ";
    const target = orders.find((o) => o.id === orderId);
    const isDelivery = target?.orderType === "delivery";

    if (currentStatus === "กำลังทำ" || currentStatus === "กำลังเตรียม" || currentStatus === "preparing") {
      prevStatus = "รอดำเนินการ";
    } else if (currentStatus === "พร้อมเสิร์ฟ" || currentStatus === "ready") {
      prevStatus = "กำลังทำ";
    } else if (currentStatus === "กำลังจัดส่ง" || currentStatus === "delivering") {
      prevStatus = "พร้อมเสิร์ฟ";
    } else if (currentStatus === "สำเร็จ" || currentStatus === "completed") {
      prevStatus = isDelivery ? "กำลังจัดส่ง" : "พร้อมเสิร์ฟ";
    }

    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, status: prevStatus };
      }
      return o;
    });
    updateOrdersAndNotify(updated);
  };

  const clearCompletedOrders = () => {
    const updated = orders.filter(o => o.status !== "สำเร็จ" && o.status !== "completed");
    updateOrdersAndNotify(updated);
  };

  const triggerMockOrder = () => {
    const isDineIn = Math.random() > 0.4;
    const orderType: OrderType = isDineIn ? "dine-in" : (Math.random() > 0.5 ? "delivery" : "takeaway");
    
    const itemsCount = Math.floor(Math.random() * 3) + 1;
    const items = [];
    let subtotal = 0;
    for (let i = 0; i < itemsCount; i++) {
      const rawItem = MENU_ITEMS_FOR_SIMULATION[Math.floor(Math.random() * MENU_ITEMS_FOR_SIMULATION.length)];
      const qty = Math.floor(Math.random() * 2) + 1;
      
      const name = rawItem.name;
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
    const orderNum = generateUniqueOrderNumber(orders);
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

  const stats = useMemo(() => {
    let waiting = 0;
    let cooking = 0;
    let ready = 0;
    let delivering = 0;
    let completed = 0;
    let refunds = 0;

    orders.forEach((o) => {
      const s = o.status;
      if (s === "รอดำเนินการ" || s === "รอรับออเดอร์" || s === "pending") waiting++;
      else if (s === "กำลังทำ" || s === "กำลังเตรียม" || s === "preparing") cooking++;
      else if (s === "พร้อมเสิร์ฟ" || s === "ready") ready++;
      else if (s === "กำลังจัดส่ง" || s === "delivering") delivering++;
      else if (s === "สำเร็จ" || s === "completed") completed++;
      else if (s === "ขอคืนเงิน") refunds++;
    });

    return { 
      waiting, 
      cooking, 
      ready, 
      delivering,
      completed, 
      refunds,
      totalActive: waiting + cooking + ready + delivering 
    };
  }, [orders]);

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

  const filteredOrders = useMemo(() => {
    let result = [...orders];
    result.sort((a, b) => getTimestampFromOrderId(a.id) - getTimestampFromOrderId(b.id));

    if (statusFilter !== "active") {
      result = result.filter((o) => {
        if (statusFilter === "รอดำเนินการ") return o.status === "รอดำเนินการ" || o.status === "รอรับออเดอร์" || o.status === "pending";
        if (statusFilter === "กำลังทำ") return o.status === "กำลังทำ" || o.status === "กำลังเตรียม" || o.status === "preparing";
        if (statusFilter === "พร้อมเสิร์ฟ") return o.status === "พร้อมเสิร์ฟ" || o.status === "ready";
        if (statusFilter === "กำลังจัดส่ง") return o.status === "กำลังจัดส่ง" || o.status === "delivering";
        if (statusFilter === "สำเร็จ") return o.status === "สำเร็จ" || o.status === "completed";
        return o.status === statusFilter;
      });
    } else {
      result = result.filter((o) => o.status !== "สำเร็จ" && o.status !== "completed");
    }

    if (typeFilter !== "all") {
      result = result.filter((o) => o.orderType === typeFilter);
    }

    return result;
  }, [orders, statusFilter, typeFilter]);

  const ordersByStatus = useMemo(() => {
    const list = orders.filter(o => typeFilter === "all" ? true : o.orderType === typeFilter);
    list.sort((a, b) => getTimestampFromOrderId(a.id) - getTimestampFromOrderId(b.id));

    const waiting = list.filter(o => o.status === "รอดำเนินการ" || o.status === "รอรับออเดอร์" || o.status === "pending");
    const cooking = list.filter(o => o.status === "กำลังทำ" || o.status === "กำลังเตรียม" || o.status === "preparing");
    const ready = list.filter(o => o.status === "พร้อมเสิร์ฟ" || o.status === "ready");
    const delivering = list.filter(o => o.status === "กำลังจัดส่ง" || o.status === "delivering");

    return { waiting, cooking, ready, delivering };
  }, [orders, typeFilter]);

  return (
    <div className="h-screen bg-[#fff8f2] text-[#002e47] flex flex-row font-sans select-none antialiased overflow-hidden">
      {/* Mobile Drawer Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-[50] md:hidden"
            />
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
                refundCount={stats.refunds}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 h-screen shrink-0 border-r border-[#ece4d6] shadow-xs z-20">
        <KitchenSidebarContent view={view} setView={setView} refundCount={stats.refunds} />
      </aside>

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
        {/* Desktop Header */}
        <header className="hidden md:block bg-white border-b border-[#ece4d6] p-4 sticky top-0 z-30 shadow-xs shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#002e47] text-white shadow-md">
                {view === "kitchen" ? (
                  <ChefHat className="h-5 w-5" color={GOLD} />
                ) : view === "refunds" ? (
                  <Bell className="h-5 w-5" color={GOLD} />
                ) : (
                  <LayoutDashboard className="h-5 w-5" color={GOLD} />
                )}
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black tracking-tight" style={{ color: BRAND }}>
                  {view === "kitchen" 
                    ? "จอจัดการครัว DineOS" 
                    : view === "refunds"
                    ? "คำขอคืนเงิน & ยกเลิกออเดอร์"
                    : "แดชบอร์ดภาพรวมร้านค้า"
                  }
                </h1>
                <p className="text-[10px] sm:text-xs font-semibold text-slate-500">
                  {view === "kitchen" 
                    ? "ระบบจัดคิวอาหารและมอนิเตอร์หน้าเตา" 
                    : view === "refunds"
                    ? "จัดการรายการแจ้งยกเลิกและโอนเงินคืนให้ลูกค้า"
                    : "วิเคราะห์ยอดขาย จำนวนลูกค้า และสถิติร้านค้า"
                  }
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              {view === "kitchen" && (
                <div className="bg-[#fcfbf9] border border-[#ece4d6] px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold">
                  <span className="text-[10px] text-slate-500">คิวรอดำเนินการ:</span>
                  <span className="text-xs sm:text-sm font-black" style={{ color: BRAND }}>{stats.totalActive}</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-xl border transition active:scale-95 cursor-pointer ${
                  soundEnabled 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100" 
                    : "bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200"
                }`}
                title={soundEnabled ? "ปิดเสียงเตือน" : "เปิดเสียงเตือน"}
              >
                {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              </button>

              <button
                type="button"
                onClick={triggerMockOrder}
                className="flex items-center gap-1.5 hover:opacity-90 active:scale-95 text-[#002e47] px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition shadow-xs cursor-pointer border border-[#002e47]/10"
                style={{ background: GOLD }}
              >
                <PlusCircle size={13} />
                <span>จำลองออเดอร์</span>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Top Header */}
        <header className="block md:hidden bg-white border-b border-[#ece4d6] p-3 sticky top-0 z-30 shadow-xs shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="เปิดเมนูนำทาง"
                onClick={() => setSidebarOpen(true)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-[#002e47] transition active:scale-95 cursor-pointer border border-[#ece4d6]"
              >
                <Menu size={18} />
              </button>
              <div>
                <h1 className="text-sm font-black tracking-tight" style={{ color: BRAND }}>
                  {view === "kitchen" 
                    ? "ครัว DineOS" 
                    : view === "refunds"
                    ? "คำขอคืนเงิน"
                    : "แดชบอร์ดหลังบ้าน"
                  }
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
                  ) : view === "refunds" ? (
                    "จัดการคัดลอกโอนเงินคืนลูกค้า"
                  ) : (
                    "ภาพรวมร้านค้า DineOS"
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {statusFilter === "สำเร็จ" && stats.completed > 0 && (
                <button
                  type="button"
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
          ) : view === "refunds" ? (
            <RefundManagementView />
          ) : (
            <>
              {/* Navigation Tabs and Channel Filters */}
              <div className="hidden md:flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white border border-[#ece4d6] p-3 rounded-2xl shrink-0 shadow-xs">
                <div className="flex flex-row overflow-x-auto no-scrollbar gap-1 w-full sm:w-auto shrink-0 pb-1 sm:pb-0">
                  {[
                    { id: "active", label: "คิวปัจจุบัน (Kanban)", count: stats.totalActive },
                    { id: "รอดำเนินการ", label: "ออเดอร์ใหม่", count: stats.waiting, dotColor: "bg-amber-500" },
                    { id: "กำลังทำ", label: "กำลังปรุง", count: stats.cooking, dotColor: "bg-blue-500" },
                    { id: "พร้อมเสิร์ฟ", label: "พร้อมเสิร์ฟ", count: stats.ready, dotColor: "bg-emerald-500" },
                    { id: "กำลังจัดส่ง", label: "ไรเดอร์กำลังส่ง", count: stats.delivering, dotColor: "bg-indigo-500" },
                    { id: "สำเร็จ", label: "เสร็จสิ้น", count: stats.completed },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setStatusFilter(tab.id)}
                      className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs tracking-wider transition-all shrink-0 cursor-pointer ${
                        statusFilter === tab.id
                          ? "bg-[#002e47] text-white shadow-inner"
                          : "text-[#5a6e7a] hover:text-[#002e47] hover:bg-slate-50"
                      }`}
                    >
                      {tab.dotColor && (
                        <span className={`h-1.5 w-1.5 rounded-full ${tab.dotColor} animate-pulse`} />
                      )}
                      <span>{tab.label}</span>
                      {tab.count !== undefined && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          statusFilter === tab.id 
                            ? "bg-slate-700 text-white" 
                            : "bg-slate-100 text-[#5a6e7a]"
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 justify-between sm:justify-start w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: INK_MUTED }}>
                    <Filter size={14} />
                    <span>ช่องทาง:</span>
                  </div>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="bg-white border border-[#ece4d6] rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#002e47] focus:outline-none shadow-xs flex-1 sm:flex-initial max-w-[150px]"
                  >
                    <option value="all">ทั้งหมด</option>
                    <option value="dine-in">ทานที่ร้าน</option>
                    <option value="takeaway">กลับบ้าน</option>
                    <option value="delivery">เดลิเวอรี่</option>
                  </select>
                </div>
              </div>

              {/* Menu Item Summary */}
              {menuSummary.length > 0 && (
                <div className="bg-white border border-[#ece4d6] p-3 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-2.5 shrink-0 shadow-xs">
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
                        <span className="bg-[#fcc14a] text-[#002e47] font-black px-1.5 py-0.5 rounded-md text-[10px] leading-tight">
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
                    <div className="flex md:hidden flex-col gap-4 pb-24">
                      {filteredOrders.length === 0 ? (
                        <div className="py-16 text-center text-[#5a6e7a] font-bold bg-white rounded-3xl border border-[#ece4d6] p-6 shadow-xs">
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
                          />
                        ))
                      )}
                    </div>

                    <div className={`hidden md:grid gap-6 ${
                      typeFilter === "dine-in" || typeFilter === "takeaway"
                        ? "md:grid-cols-3 min-w-[960px]"
                        : "md:grid-cols-4 min-w-[1200px]"
                    }`}>
                      {/* Column 1: Waiting */}
                      <div className="flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-xs">
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
                              />
                            ))
                          )}
                        </div>
                      </div>

                      {/* Column 2: Cooking */}
                      <div className="flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-xs">
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
                              />
                            ))
                          )}
                        </div>
                      </div>

                      {/* Column 3: Ready / Waiting for Pickup */}
                      <div className="flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-xs">
                        <div className="p-4 bg-emerald-50 border-b border-[#ece4d6] flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                            <h3 className="font-black text-sm uppercase tracking-wider" style={{ color: BRAND }}>
                              {typeFilter === "delivery" ? "รอไรเดอร์มารับ" : "พร้อมเสิร์ฟ / รอรับ"}
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
                              />
                            ))
                          )}
                        </div>
                      </div>

                      {/* Column 4: Delivering / Rider Out (shown for all or delivery) */}
                      {(typeFilter === "all" || typeFilter === "delivery") && (
                        <div className="flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-xs">
                          <div className="p-4 bg-indigo-50 border-b border-[#ece4d6] flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-2">
                              <Bike size={16} className="text-indigo-600 animate-bounce" />
                              <h3 className="font-black text-sm uppercase tracking-wider" style={{ color: BRAND }}>
                                ไรเดอร์กำลังส่ง
                              </h3>
                            </div>
                            <span className="text-white text-xs font-black px-2.5 py-0.5 rounded-full bg-indigo-600">
                              {ordersByStatus.delivering.length}
                            </span>
                          </div>
                          <div className="p-4 space-y-4 bg-[#f8fafc]/50">
                            {ordersByStatus.delivering.length === 0 ? (
                              <EmptyColumnMessage text="ไม่มีรายการกำลังนำส่ง" />
                            ) : (
                              ordersByStatus.delivering.map(o => (
                                <OrderCard 
                                  key={o.id}
                                  order={o}
                                  advanceOrderStatus={advanceOrderStatus}
                                  regressOrderStatus={regressOrderStatus}
                                />
                              ))
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-3xl border border-[#ece4d6] shadow-xs flex flex-col">
                    <div className="p-4 bg-slate-50 border-b border-[#ece4d6] flex items-center justify-between shrink-0">
                      <h3 className="font-black text-sm uppercase tracking-wider" style={{ color: BRAND }}>
                        {statusFilter === "สำเร็จ" ? "ประวัติรายการสำเร็จ" : `สถานะออเดอร์: ${statusFilter}`}
                      </h3>
                      <div className="flex items-center gap-2">
                        {statusFilter === "สำเร็จ" && stats.completed > 0 && (
                          <button
                            type="button"
                            onClick={clearCompletedOrders}
                            className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer shadow-xs"
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
                      <div className={`mx-auto w-full ${
                        statusFilter === "สำเร็จ"
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
              { id: "กำลังทำ", label: "ปรุง", icon: Flame, count: stats.cooking },
              { id: "พร้อมเสิร์ฟ", label: "พร้อมเสิร์ฟ", icon: CheckCircle, count: stats.ready },
              { id: "กำลังจัดส่ง", label: "กำลังส่ง", icon: Bike, count: stats.delivering },
              { id: "สำเร็จ", label: "สำเร็จแล้ว", icon: Trophy, count: stats.completed },
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = view === "kitchen" && statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setView("kitchen");
                    setStatusFilter(tab.id);
                  }}
                  className={`relative flex flex-col items-center justify-center py-1.5 px-2 rounded-xl transition-all cursor-pointer min-w-[50px] ${
                    isActive
                      ? "text-[#002e47] font-black"
                      : "text-slate-400 font-medium"
                  }`}
                >
                  <div className="relative">
                    <TabIcon size={18} className={isActive ? "stroke-[2.5]" : "stroke-[2]"} />
                    {tab.count > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[8px] font-bold px-1 py-0.5 rounded-full min-w-[12px] text-center">
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

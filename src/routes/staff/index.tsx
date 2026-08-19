import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { supabase } from "../../lib/supabase";
import {
  ChefHat,
  Volume2,
  VolumeX,
  PlusCircle,
  Filter,
  Trash2,
  Menu,
  Table,
  BookOpen,
  Inbox,
  Bike,
  AlertTriangle,
} from "lucide-react";

import {
  type OrderHistory,
  playNotificationSound,
  playCancelSound,
  StaffOrderCard,
  StaffHistoryOrderRow,
  EmptyColumnMessage,
  StaffSidebarContent,
  TableManagementView,
  MenuManagementView,
  StockManagementView,
} from "../../features/staff";
import { useLanguage } from "../../lib/i18n";
import { LanguageSelector } from "../../components/LanguageSelector";
import { generateUniqueOrderNumber } from "../../lib/utils";
import { clearAllOrdersData, adjustStockFromOrder } from "../../lib/supabase.service";

export const Route = createFileRoute("/staff/")({
  head: () => ({
    meta: [
      { title: "DineOS" },
      { name: "description", content: "ระบบจัดการออเดอร์ ผังโต๊ะ และการบริการหน้าร้าน DineOS" },
    ],
  }),
  component: KitchenMonitor,
});

const BRAND = "#002e47";
const GOLD = "#fcc14a";
const INK_MUTED = "#5a6e7a";

function KitchenMonitor() {
  const { t, tMenu, language } = useLanguage();
  const [orders, setOrders] = useState<OrderHistory[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("active");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState<"kitchen" | "tables" | "menu" | "stock">("kitchen");
  const [isClearing, setIsClearing] = useState(false);
  const [cancelAlert, setCancelAlert] = useState<{
    orderNumber: string;
    customerName?: string;
    tableNumber?: string;
    status: string;
    reason?: string;
    refundPromptPay?: string;
    total?: number;
  } | null>(null);

  const knownCancelledRef = useRef<Set<string>>(new Set());
  const knownOrderIdsRef = useRef<Set<string>>(new Set());

  const isWaiting = (s: string) => s === "รอดำเนินการ" || s === "รอรับออเดอร์" || s === "pending";
  const isCooking = (s: string) => s === "กำลังทำ" || s === "กำลังเตรียม" || s === "preparing";
  const isReady = (s: string) => s === "พร้อมเสิร์ฟ" || s === "ready";
  const isDelivering = (s: string) => s === "กำลังจัดส่ง" || s === "delivering";
  const isCompleted = (s: string) => s === "สำเร็จ" || s === "completed";
  const isRefund = (s: string) => s === "ขอคืนเงิน" || s === "refund_requested" || s === "refunded";
  const isCancelled = (s: string) => s === "ยกเลิก" || s === "ยกเลิกแล้ว" || s === "cancelled" || isRefund(s);

  const handleLogout = async () => {
    document.body.style.display = "none";
    localStorage.removeItem("ran-lung-get-staff-token");
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  useEffect(() => {
    async function checkAuth() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          window.location.href = "/login";
          return;
        }

        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("auth_user_id", session.user.id)
          .maybeSingle();

        if (error || !data || (data.role !== "staff" && data.role !== "admin")) {
          window.location.href = "/customer";
          return;
        }

        if (data.is_active === false) {
          alert("บัญชีของคุณอยู่ระหว่างรอการอนุมัติสิทธิ์ (Pending Approval)");
          await supabase.auth.signOut();
          window.location.href = "/login";
          return;
        }
      } catch {
        window.location.href = "/login";
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
          else if (o.status === "ready") localStatus = "พร้อมเสิร์ฟ";
          else if (o.status === "delivering") localStatus = "กำลังจัดส่ง";
          else if (o.status === "completed") localStatus = "สำเร็จ";
          else if (o.status === "cancelled") localStatus = "ยกเลิก";
          else if (o.status === "refund_requested" || o.status === "ขอคืนเงิน") localStatus = "ขอคืนเงิน";
          else if (o.status) localStatus = o.status;

          let formattedDate = "";
          try {
            if (o.created_at) {
              const d = new Date(o.created_at);
              formattedDate =
                d.toLocaleDateString("th-TH", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }) +
                " · " +
                d.toLocaleTimeString("th-TH", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
            }
          } catch {
            formattedDate = "";
          }

          return {
            id: String(o.id),
            orderNumber: o.order_number || String(o.id),
            date:
              formattedDate ||
              new Date().toLocaleDateString("th-TH") +
                " · " +
                new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
            items: Array.isArray(o.order_items)
              ? o.order_items.map((item: any) => ({
                  name: item.name || "รายการอาหาร",
                  qty: Number(item.quantity) || 1,
                  price: Number(item.unit_price) || 0,
                  image: item.image || "",
                  addons: Array.isArray(item.addons) ? item.addons : undefined,
                  options: item.options && typeof item.options === "object" ? item.options : undefined,
                  note: item.note || undefined,
                }))
              : [],
            subtotal: Number(o.subtotal) || 0,
            delivery: Number(o.delivery_fee) || 0,
            total: Number(o.total) || 0,
            status: localStatus,
            orderType: o.order_type || "dine-in",
            customerName: o.customers?.display_name || "คุณลูกค้า",
            tableNumber: o.table_number || "",
            queueNumber: o.queue_number || "",
            note: o.special_instructions || "",
            refundPromptPay: o.refund_promptpay || undefined,
          };
        });

        // ตรวจจับออเดอร์ที่ถูกยกเลิก/ขอคืนเงินใหม่
        const newlyCancelled = mappedOrders.find(
          (o) => (isRefund(o.status) || o.status === "ยกเลิก") && !knownCancelledRef.current.has(o.id)
        );
        if (newlyCancelled && knownCancelledRef.current.size > 0) {
          if (soundEnabled) playCancelSound();
          setCancelAlert({
            orderNumber: newlyCancelled.orderNumber,
            customerName: newlyCancelled.customerName,
            tableNumber: newlyCancelled.tableNumber,
            status: newlyCancelled.status,
            reason: newlyCancelled.note,
            refundPromptPay: newlyCancelled.refundPromptPay,
            total: newlyCancelled.total,
          });
        }

        mappedOrders.forEach((o) => {
          if (isRefund(o.status) || o.status === "ยกเลิก") {
            knownCancelledRef.current.add(o.id);
          }
          knownOrderIdsRef.current.add(o.id);
        });

        setOrders((prev) => {
          const localOnly = prev.filter(
            (p) =>
              !mappedOrders.some(
                (m) => m.id === p.id || (m.orderNumber && m.orderNumber === p.orderNumber)
              )
          );
          const combined = [...mappedOrders, ...localOnly];
          localStorage.setItem("ran-lung-get-orders", JSON.stringify(combined));
          return combined;
        });
      }
    } catch (e) {
      console.error("Failed to fetch Supabase orders:", e);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("ran-lung-get-orders");
    if (saved) {
      try {
        const parsed: OrderHistory[] = JSON.parse(saved);
        parsed.forEach((o) => {
          if (isRefund(o.status) || o.status === "ยกเลิก") {
            knownCancelledRef.current.add(o.id);
          }
          knownOrderIdsRef.current.add(o.id);
        });
        setOrders(parsed);
      } catch (e) {
        console.error(e);
      }
    }
    fetchSupabaseOrders();

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

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ran-lung-get-orders" && e.newValue) {
        try {
          const newOrders: OrderHistory[] = JSON.parse(e.newValue);
          
          // ตรวจจับออเดอร์ยกเลิก/ขอคืนเงินใหม่ใน storage
          const newlyCancelled = newOrders.find(
            (o) => (isRefund(o.status) || o.status === "ยกเลิก") && !knownCancelledRef.current.has(o.id)
          );
          if (newlyCancelled && knownCancelledRef.current.size > 0) {
            if (soundEnabled) playCancelSound();
            setCancelAlert({
              orderNumber: newlyCancelled.orderNumber,
              customerName: newlyCancelled.customerName,
              tableNumber: newlyCancelled.tableNumber,
              status: newlyCancelled.status,
              reason: newlyCancelled.note || newlyCancelled.cancelReason,
              refundPromptPay: newlyCancelled.refundPromptPay,
              total: newlyCancelled.total,
            });
          }

          const hasNewWaiting = newOrders.some(
            (o) => !knownOrderIdsRef.current.has(o.id) && isWaiting(o.status)
          );
          if (hasNewWaiting && soundEnabled) playNotificationSound();

          newOrders.forEach((o) => {
            if (isRefund(o.status) || o.status === "ยกเลิก") {
              knownCancelledRef.current.add(o.id);
            }
            knownOrderIdsRef.current.add(o.id);
          });

          setOrders(newOrders);
        } catch (err) {
          console.error("Sync error:", err);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [soundEnabled]);

  const triggerMockOrder = () => {
    const orderNum = generateUniqueOrderNumber(orders);
    const names = ["คุณ มานะ", "คุณ สมรัก", "คุณ ณเดช", "คุณ ญาญ่า", "คุณ กิ๊ฟ", "คุณ นิว"];
    const tbs = ["โต๊ะ 1", "โต๊ะ 2", "โต๊ะ 3", "โต๊ะ 4", "โต๊ะ 5"];
    const newOrder: OrderHistory = {
      id: "mock_" + Date.now(),
      orderNumber: orderNum,
      date:
        new Date().toLocaleDateString("th-TH") +
        " · " +
        new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
      items: [
        { name: "กระเพราหมูกรอบ (ข้าวราด)", qty: 1, price: 70, image: "", addons: [{ name: "ไข่ดาว", price: 10 }] },
        { name: "น้ำลำไย", qty: 2, price: 40, image: "" },
      ],
      subtotal: 160,
      delivery: 0,
      total: 160,
      status: "รอดำเนินการ",
      orderType: "dine-in",
      customerName: names[Math.floor(Math.random() * names.length)],
      tableNumber: tbs[Math.floor(Math.random() * tbs.length)],
      note: "เผ็ดปกติ",
    };
    setOrders((prev) => {
      const next = [newOrder, ...prev];
      localStorage.setItem("ran-lung-get-orders", JSON.stringify(next));
      return next;
    });
    void adjustStockFromOrder(newOrder.items, "deduct");
    if (soundEnabled) playNotificationSound();
  };

  const clearMockOrders = () => {
    setOrders((prev) => {
      const next = prev.filter((o) => !o.id.startsWith("mock_"));
      localStorage.setItem("ran-lung-get-orders", JSON.stringify(next));
      return next;
    });
  };

  const syncTableStatusForOrder = async (order: OrderHistory, nextOrderList: OrderHistory[]) => {
    if (!order.tableNumber) return;
    const tableLabel = order.tableNumber.trim();
    const rawNum = tableLabel.replace("โต๊ะ ", "").trim();

    const hasActive = nextOrderList.some((o) => {
      if (isCompleted(o.status) || isCancelled(o.status)) return false;
      if (!o.tableNumber) return false;
      const tLabel = o.tableNumber.trim();
      const tNum = tLabel.replace("โต๊ะ ", "").trim();
      return tLabel === tableLabel || tNum === rawNum;
    });

    // Only auto-mark as occupied if there's an active order.
    // Do NOT auto-revert to available when food is served/completed,
    // staff will manually toggle table to available when customers leave.
    if (hasActive) {
      try {
        const { data: dbTables } = await supabase.from("restaurant_tables").select("id, label, status");
        if (dbTables && Array.isArray(dbTables)) {
          const found = dbTables.find(
            (t: any) =>
              String(t.id) === rawNum ||
              t.label === tableLabel ||
              t.label.replace("โต๊ะ ", "").trim() === rawNum
          );
          if (found && found.status !== "occupied") {
            await supabase.from("restaurant_tables").update({ status: "occupied" }).eq("id", found.id);
          }
        }
      } catch (e) {
        console.warn("[syncTableStatusForOrder] Table update:", e);
      }
    }
  };

  const advanceOrderStatus = async (id: string) => {
    let nextStatus = "สำเร็จ";
    let dbStatus = "completed";
    const targetOrder = orders.find((o) => o.id === id);
    if (!targetOrder) return;
    if (isWaiting(targetOrder.status)) {
      nextStatus = "กำลังทำ";
      dbStatus = "preparing";
    } else if (isCooking(targetOrder.status)) {
      nextStatus = "พร้อมเสิร์ฟ";
      dbStatus = "ready";
    } else if (isReady(targetOrder.status)) {
      if (targetOrder.orderType === "delivery") {
        nextStatus = "กำลังจัดส่ง";
        dbStatus = "delivering";
      } else {
        nextStatus = "สำเร็จ";
        dbStatus = "completed";
      }
    } else if (isDelivering(targetOrder.status)) {
      nextStatus = "สำเร็จ";
      dbStatus = "completed";
    }
    const nextList = orders.map((o) => (o.id === id ? { ...o, status: nextStatus } : o));
    setOrders(nextList);
    localStorage.setItem("ran-lung-get-orders", JSON.stringify(nextList));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "ran-lung-get-orders",
      newValue: JSON.stringify(nextList),
    }));
    try {
      const { error } = await supabase.from("orders").update({ status: dbStatus }).eq("id", id);
      if (error) throw error;
    } catch {
      console.warn("Offline status update completed locally.");
    }
    await syncTableStatusForOrder(targetOrder, nextList);
  };

  const regressOrderStatus = async (id: string) => {
    let nextStatus = "รอดำเนินการ";
    let dbStatus = "pending";
    const targetOrder = orders.find((o) => o.id === id);
    if (!targetOrder) return;
    if (isCooking(targetOrder.status)) {
      nextStatus = "รอดำเนินการ";
      dbStatus = "pending";
    } else if (isReady(targetOrder.status)) {
      nextStatus = "กำลังทำ";
      dbStatus = "preparing";
    } else if (isDelivering(targetOrder.status)) {
      nextStatus = "พร้อมเสิร์ฟ";
      dbStatus = "ready";
    } else if (isCompleted(targetOrder.status)) {
      if (targetOrder.orderType === "delivery") {
        nextStatus = "กำลังจัดส่ง";
        dbStatus = "delivering";
      } else {
        nextStatus = "พร้อมเสิร์ฟ";
        dbStatus = "ready";
      }
    }
    const nextList = orders.map((o) => (o.id === id ? { ...o, status: nextStatus } : o));
    setOrders(nextList);
    localStorage.setItem("ran-lung-get-orders", JSON.stringify(nextList));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "ran-lung-get-orders",
      newValue: JSON.stringify(nextList),
    }));
    try {
      await supabase.from("orders").update({ status: dbStatus }).eq("id", id);
    } catch {
      // Ignored
    }
    await syncTableStatusForOrder(targetOrder, nextList);
  };

  const cancelOrder = async (id: string) => {
    if (!confirm("คุณต้องการยกเลิกคำสั่งซื้อนี้ใช่หรือไม่?")) return;
    const targetOrder = orders.find((o) => o.id === id);
    const nextList = orders.map((o) => (o.id === id ? { ...o, status: "ยกเลิก" } : o));
    setOrders(nextList);
    localStorage.setItem("ran-lung-get-orders", JSON.stringify(nextList));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "ran-lung-get-orders",
      newValue: JSON.stringify(nextList),
    }));
    try {
      await supabase.from("orders").update({ status: "cancelled" }).eq("id", id);
    } catch {
      // Ignored
    }
    if (targetOrder) {
      if (targetOrder.items && targetOrder.items.length > 0) {
        void adjustStockFromOrder(targetOrder.items, "add");
      }
      await syncTableStatusForOrder(targetOrder, nextList);
    }
  };

  const clearAllOrders = async () => {
    if (!confirm("คุณต้องการล้างรายการออเดอร์ทั้งหมดเพื่อเริ่มต้นใหม่ใช่หรือไม่?\n(ระบบจะลบข้อมูลออเดอร์ทั้งหมดออกจากฐานข้อมูล และรีเซ็ตสถานะโต๊ะทั้งหมด)")) return;
    setIsClearing(true);
    try {
      await clearAllOrdersData();
      setOrders([]);
      localStorage.setItem("ran-lung-get-orders", JSON.stringify([]));
      window.dispatchEvent(new StorageEvent("storage", {
        key: "ran-lung-get-orders",
        newValue: JSON.stringify([]),
      }));
      try {
        window.dispatchEvent(new CustomEvent("ran-lung-get-orders-cleared"));
      } catch {}
    } catch (e) {
      console.error("clearAllOrders error:", e);
      setOrders([]);
      localStorage.setItem("ran-lung-get-orders", JSON.stringify([]));
    } finally {
      setIsClearing(false);
    }
  };

  const stats = useMemo(() => {
    const active = orders.filter((o) => !isCompleted(o.status) && !isCancelled(o.status));
    return {
      totalActive: active.length,
      waiting: orders.filter((o) => isWaiting(o.status)).length,
      cooking: orders.filter((o) => isCooking(o.status)).length,
      ready: orders.filter((o) => isReady(o.status)).length,
      delivering: orders.filter((o) => o.status === "กำลังจัดส่ง" || o.status === "delivering").length,
      completed: orders.filter((o) => isCompleted(o.status)).length,
      cancelled: orders.filter((o) => isCancelled(o.status)).length,
    };
  }, [orders]);

  const ordersByStatus = useMemo(() => {
    const list = orders.filter((o) => typeFilter === "all" || o.orderType === typeFilter);
    return {
      waiting: list.filter((o) => isWaiting(o.status)).reverse(),
      cooking: list.filter((o) => isCooking(o.status)),
      ready: list.filter((o) => isReady(o.status)),
      delivering: list.filter((o) => o.status === "กำลังจัดส่ง" || o.status === "delivering"),
    };
  }, [orders, typeFilter]);

  const filteredOrders = useMemo(() => {
    const list = orders.filter((o) => typeFilter === "all" || o.orderType === typeFilter);
    if (statusFilter === "active") return list.filter((o) => !isCompleted(o.status) && !isCancelled(o.status));
    if (statusFilter === "รอดำเนินการ") return list.filter((o) => isWaiting(o.status));
    if (statusFilter === "กำลังทำ") return list.filter((o) => isCooking(o.status));
    if (statusFilter === "พร้อมเสิร์ฟ") return list.filter((o) => isReady(o.status));
    if (statusFilter === "สำเร็จ") return list.filter((o) => isCompleted(o.status));
    if (statusFilter === "ยกเลิก" || statusFilter === "cancelled") return list.filter((o) => isCancelled(o.status));
    return list.filter((o) => o.status === statusFilter);
  }, [orders, statusFilter, typeFilter]);

  const menuSummary = useMemo(() => {
    const activeCookingOrders = orders.filter((o) => isCooking(o.status) || isWaiting(o.status));
    const counts: Record<string, number> = {};
    activeCookingOrders.forEach((o) => {
      (o.items || []).forEach((item) => {
        if (!item || !item.name) return;
        const cleanName = item.name.split(" (")[0];
        counts[cleanName] = (counts[cleanName] || 0) + (item.qty || 1);
      });
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [orders]);

  const getViewTitle = () => {
    if (view === "kitchen") return t("กระดานครัว (KDS)");
    if (view === "tables") return t("จัดการโต๊ะ");
    if (view === "menu") return t("จัดการเมนู");
    return t("สต็อกวัตถุดิบ");
  };

  const getViewSubtitle = () => {
    if (view === "kitchen") return t("ระบบจัดคิวอาหารและมอนิเตอร์หน้าเตา");
    if (view === "tables") return t("เพิ่ม/ลบโต๊ะ และตรวจสอบสถานะโต๊ะอาหารเรียลไทม์");
    if (view === "menu") return t("เพิ่ม แก้ไข ลบเมนูอาหาร พร้อมตัวเลือกและรูปภาพ");
    return t("ตรวจสอบสต็อกวัตถุดิบ ปรับจำนวน และเกณฑ์แจ้งเตือนสต็อกต่ำ");
  };

  const getViewIcon = () => {
    if (view === "kitchen") return <ChefHat className="h-5 w-5" color={GOLD} />;
    if (view === "tables") return <Table className="h-5 w-5" color={GOLD} />;
    if (view === "menu") return <BookOpen className="h-5 w-5" color={GOLD} />;
    return <Inbox className="h-5 w-5" color={GOLD} />;
  };

  return (
    <div className="min-h-screen bg-[#fff8f2] text-gray-900 flex flex-col md:flex-row font-sans">
      {/* Mobile Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] z-[55] flex flex-col md:hidden shadow-2xl"
            >
              <StaffSidebarContent
                view={view}
                setView={setView}
                onClose={() => setSidebarOpen(false)}
                handleLogout={handleLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 h-screen shrink-0 border-r border-[#ece4d6] shadow-xs z-20">
        <StaffSidebarContent view={view} setView={setView} handleLogout={handleLogout} />
      </aside>

      {/* Workspace */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0">
        {/* Desktop Header */}
        <header className="hidden md:block bg-white border-b border-[#ece4d6] p-4 sticky top-0 z-30 shadow-xs shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#002e47] text-white shadow-md">
                {getViewIcon()}
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black tracking-tight" style={{ color: BRAND }}>
                  {getViewTitle()}
                </h1>
                <p className="text-xs font-semibold text-slate-500">{getViewSubtitle()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs">
              {view === "kitchen" && (
                <div className="bg-[#fcfbf9] border border-[#ece4d6] px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold">
                  <span className="text-[10px] text-slate-500">{t("คิวรอดำเนินการ")}:</span>
                  <span className="text-xs sm:text-sm font-black" style={{ color: BRAND }}>
                    {stats.totalActive}
                  </span>
                </div>
              )}
              {(view === "kitchen" || view === "tables") && (
                <>
                  <button
                    type="button"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`p-2 rounded-xl border transition active:scale-95 cursor-pointer ${
                      soundEnabled
                        ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100"
                        : "bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200"
                    }`}
                  >
                    {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                  </button>
                  {view === "kitchen" && (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={clearAllOrders}
                        title={t("ล้างทุกออเดอร์")}
                        className="flex items-center gap-1.5 hover:bg-rose-100 active:scale-95 text-rose-700 bg-rose-50 px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition shadow-xs cursor-pointer border border-rose-200"
                      >
                        <Trash2 size={13} />
                        <span>{t("ล้างทุกออเดอร์")}</span>
                      </button>
                      <button
                        type="button"
                        onClick={clearMockOrders}
                        className="flex items-center gap-1.5 hover:bg-slate-200 active:scale-95 text-slate-700 bg-slate-100 px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition shadow-xs cursor-pointer border border-slate-200"
                      >
                        <span>{t("ลบออเดอร์จำลอง")}</span>
                      </button>
                      <button
                        type="button"
                        onClick={triggerMockOrder}
                        className="flex items-center gap-1.5 hover:opacity-90 active:scale-95 text-[#002e47] px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition shadow-xs cursor-pointer border border-[#002e47]/10"
                        style={{ background: GOLD }}
                      >
                        <PlusCircle size={13} />
                        <span>{t("จำลองออเดอร์")}</span>
                      </button>
                    </div>
                  )}
                </>
              )}
              <LanguageSelector variant="light" />
            </div>
          </div>
        </header>

        {/* Mobile Header */}
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
                  {view === "kitchen" && "ครัว DineOS"}
                  {view === "tables" && "ผังโต๊ะอาหาร"}
                  {view === "menu" && "จัดการเมนู"}
                  {view === "stock" && "คลังสต็อกวัตถุดิบ"}
                </h1>
                <p className="text-[9px] font-bold text-slate-500">
                  {view === "kitchen" && `คิวค้าง: ${stats.totalActive}`}
                  {view === "tables" && "จัดการผังโต๊ะเรียลไทม์"}
                  {view === "menu" && "จัดการรายการอาหาร"}
                  {view === "stock" && "ตรวจสอบสต็อก"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector variant="light" compact />
              {(view === "kitchen" || view === "tables") && (
                <button
                  type="button"
                  onClick={triggerMockOrder}
                  className="bg-[#fcc14a] text-[#002e47] text-[10px] px-2.5 py-1 rounded-xl font-bold cursor-pointer"
                >
                  + จำลอง
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-3 sm:p-4 lg:p-6 w-full mx-auto flex-1 flex flex-col">
          {/* Cancellation Alert Banner */}
          <AnimatePresence>
            {cancelAlert && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white shadow-xl flex items-center justify-between gap-4 border-2 border-rose-400 z-30"
              >
                <div className="flex items-center gap-3.5">
                  <div className="h-11 w-11 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 animate-bounce">
                    <AlertTriangle size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="bg-white text-rose-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase shadow-xs">
                        {cancelAlert.status === "ขอคืนเงิน" ? "🚨 มีการขอคืนเงิน" : "⚠️ ยกเลิกออเดอร์"}
                      </span>
                      <p className="text-sm font-black tracking-wide">
                        ออเดอร์ #{cancelAlert.orderNumber} {cancelAlert.tableNumber && `(${cancelAlert.tableNumber})`}
                      </p>
                    </div>
                    <p className="text-xs text-rose-100 mt-1 font-medium flex items-center gap-2 flex-wrap">
                      <span>{cancelAlert.reason ? `เหตุผล: ${cancelAlert.reason}` : "ลูกค้ายกเลิกคำสั่งซื้อนี้"}</span>
                      {cancelAlert.refundPromptPay && (
                        <span className="font-bold text-amber-200 bg-black/25 px-2 py-0.5 rounded-lg border border-amber-300/30">
                          พร้อมเพย์: {cancelAlert.refundPromptPay}
                        </span>
                      )}
                      {cancelAlert.total !== undefined && (
                        <span className="font-black text-white bg-white/20 px-2 py-0.5 rounded-lg">
                          ฿{cancelAlert.total.toLocaleString()}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setCancelAlert(null)}
                  className="px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-black transition cursor-pointer shrink-0 border border-white/20 active:scale-95"
                >
                  {t("รับทราบ")} ✕
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {view === "tables" ? (
            <TableManagementView orders={orders} onRefreshOrders={fetchSupabaseOrders} />
          ) : view === "menu" ? (
            <MenuManagementView />
          ) : view === "stock" ? (
            <StockManagementView handleLogout={handleLogout} />
          ) : (
            <>
              {/* Kitchen View Tabs */}
              <div className="hidden md:flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white border border-[#ece4d6] p-3 rounded-2xl shrink-0 shadow-xs mb-6">
                <div className="flex flex-row overflow-x-auto no-scrollbar gap-1 w-full sm:w-auto shrink-0">
                  {[
                    { id: "active", label: t("คิวปัจจุบัน (Kanban)"), count: stats.totalActive },
                    { id: "รอดำเนินการ", label: t("ออเดอร์ใหม่"), count: stats.waiting, dotColor: "bg-amber-500" },
                    { id: "กำลังทำ", label: t("กำลังปรุง"), count: stats.cooking, dotColor: "bg-blue-500" },
                    { id: "พร้อมเสิร์ฟ", label: t("พร้อมเสิร์ฟ"), count: stats.ready, dotColor: "bg-emerald-500" },
                    { id: "กำลังจัดส่ง", label: t("ไรเดอร์กำลังส่ง"), count: stats.delivering, dotColor: "bg-indigo-500" },
                    { id: "สำเร็จ", label: t("เสร็จสิ้น"), count: stats.completed },
                    { id: "ยกเลิก", label: t("ยกเลิก / ขอคืนเงิน"), count: stats.cancelled, dotColor: "bg-rose-500" },
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
                      {(tab as any).dotColor && (
                        <span className={`h-1.5 w-1.5 rounded-full ${(tab as any).dotColor} animate-pulse`} />
                      )}
                      <span>{tab.label}</span>
                      {tab.count !== undefined && (
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                            statusFilter === tab.id ? "bg-slate-700 text-white" : "bg-slate-100 text-[#5a6e7a]"
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2 justify-between sm:justify-start w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: INK_MUTED }}>
                    <Filter size={14} />
                    <span>{t("ช่องทางการรับอาหาร")}:</span>
                  </div>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="bg-white border border-[#ece4d6] rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#002e47] focus:outline-none shadow-xs flex-1 sm:flex-initial max-w-[150px]"
                  >
                    <option value="all">{t("ทั้งหมด")}</option>
                    <option value="dine-in">{t("ทานที่ร้าน")}</option>
                    <option value="takeaway">{t("กลับบ้าน")}</option>
                    <option value="delivery">{t("จัดส่ง")}</option>
                  </select>
                </div>
              </div>

              {/* Cooking Summary */}
              {menuSummary.length > 0 && (
                <div className="bg-white border border-[#ece4d6] p-3 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-2.5 shrink-0 shadow-xs mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-black text-[#002e47] shrink-0">
                    <ChefHat size={14} className="text-[#fcc14a]" />
                    <span>{t("ยอดรวมเมนูเตาอาหาร")}:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {menuSummary.map(([name, qty]) => (
                      <div
                        key={name}
                        className="flex items-center gap-1.5 bg-[#002e47]/5 border border-[#002e47]/10 rounded-xl px-3 py-1 text-xs shrink-0 font-bold"
                      >
                        <span className="text-[#002e47]">{tMenu(name, "name")}</span>
                        <span className="bg-[#fcc14a] text-[#002e47] font-black px-1.5 py-0.2 rounded-md text-[10px]">
                          x{qty}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Order Area */}
              <div className="flex-1 overflow-y-auto no-scrollbar">
                {statusFilter === "active" ? (
                  <div className={`hidden md:grid gap-6 ${
                    typeFilter === "dine-in" || typeFilter === "takeaway"
                      ? "md:grid-cols-3 min-w-[960px]"
                      : "md:grid-cols-4 min-w-[1200px]"
                  }`}>
                    <div className="flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-xs">
                      <div className="p-4 bg-amber-500/10 border-b border-[#ece4d6] flex items-center justify-between shrink-0">
                        <span className="font-black text-sm text-[#002e47]">{t("ออเดอร์ใหม่")}</span>
                        <span className="text-white text-xs font-black px-2 py-0.5 rounded-full bg-amber-500">
                          {ordersByStatus.waiting.length}
                        </span>
                      </div>
                      <div className="p-4 space-y-4 bg-[#f8fafc]/50 flex-1 overflow-y-auto max-h-[70vh]">
                        {ordersByStatus.waiting.length === 0 ? (
                          <EmptyColumnMessage text={t("ไม่มีออเดอร์ใหม่")} />
                        ) : (
                          ordersByStatus.waiting.map((o) => (
                            <StaffOrderCard
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
                    <div className="flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-xs">
                      <div className="p-4 bg-blue-50 border-b border-[#ece4d6] flex items-center justify-between shrink-0">
                        <span className="font-black text-sm text-[#002e47]">{t("กำลังปรุง")}</span>
                        <span className="text-white text-xs font-black px-2 py-0.5 rounded-full bg-blue-600">
                          {ordersByStatus.cooking.length}
                        </span>
                      </div>
                      <div className="p-4 space-y-4 bg-[#f8fafc]/50 flex-1 overflow-y-auto max-h-[70vh]">
                        {ordersByStatus.cooking.length === 0 ? (
                          <EmptyColumnMessage text={t("ไม่มีรายการกำลังปรุง")} />
                        ) : (
                          ordersByStatus.cooking.map((o) => (
                            <StaffOrderCard
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
                    <div className="flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-xs">
                      <div className="p-4 bg-emerald-50 border-b border-[#ece4d6] flex items-center justify-between shrink-0">
                        <span className="font-black text-sm text-[#002e47]">
                          {typeFilter === "delivery" ? t("รอไรเดอร์มารับ") : t("พร้อมเสิร์ฟ / รอรับ")}
                        </span>
                        <span className="text-white text-xs font-black px-2 py-0.5 rounded-full bg-emerald-500">
                          {ordersByStatus.ready.length}
                        </span>
                      </div>
                      <div className="p-4 space-y-4 bg-[#f8fafc]/50 flex-1 overflow-y-auto max-h-[70vh]">
                        {ordersByStatus.ready.length === 0 ? (
                          <EmptyColumnMessage text={t("ไม่มีออเดอร์พร้อมเสิร์ฟ")} />
                        ) : (
                          ordersByStatus.ready.map((o) => (
                            <StaffOrderCard
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
                    {(typeFilter === "all" || typeFilter === "delivery") && (
                      <div className="flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-xs">
                        <div className="p-4 bg-indigo-50 border-b border-[#ece4d6] flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-2">
                            <Bike size={16} className="text-indigo-600 animate-bounce" />
                            <span className="font-black text-sm text-[#002e47]">{t("ไรเดอร์กำลังส่ง")}</span>
                          </div>
                          <span className="text-white text-xs font-black px-2 py-0.5 rounded-full bg-indigo-600">
                            {ordersByStatus.delivering.length}
                          </span>
                        </div>
                        <div className="p-4 space-y-4 bg-[#f8fafc]/50 flex-1 overflow-y-auto max-h-[70vh]">
                          {ordersByStatus.delivering.length === 0 ? (
                            <EmptyColumnMessage text={t("ไม่มีรายการกำลังนำส่ง")} />
                          ) : (
                            ordersByStatus.delivering.map((o) => (
                              <StaffOrderCard
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
                    )}
                  </div>
                ) : (
                  <div className="bg-white rounded-3xl border border-[#ece4d6] p-4">
                    <h2 className="text-sm font-black mb-4">{t("ประวัติคำสั่งซื้อ")} ({t(statusFilter)})</h2>
                    <div className="space-y-3">
                      {filteredOrders.length === 0 ? (
                        <p className="text-center text-slate-400 py-12">{t("ไม่มีรายการ")}</p>
                      ) : (
                        filteredOrders.map((o) =>
                          statusFilter === "สำเร็จ" ? (
                            <StaffHistoryOrderRow key={o.id} order={o} />
                          ) : isCancelled(o.status) ? (
                            <div key={o.id} className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 space-y-2.5 shadow-xs">
                              <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="text-xs font-black text-rose-800 bg-rose-200/80 px-2.5 py-0.5 rounded-full">
                                    {o.status === "ขอคืนเงิน" ? "🚨 ขอคืนเงิน" : "🚫 ยกเลิกแล้ว"}
                                  </span>
                                  <span className="font-black text-[#002e47] text-sm">#{o.orderNumber || o.id}</span>
                                  {o.tableNumber && (
                                    <span className="text-xs font-bold text-slate-600">({o.tableNumber})</span>
                                  )}
                                  <span className="text-xs text-slate-400 font-medium">· {o.date}</span>
                                </div>
                                <span className="text-sm font-black text-[#002e47]">฿{o.total.toLocaleString()}</span>
                              </div>
                              <div className="space-y-1 text-xs text-slate-700 bg-white/80 p-3 rounded-xl border border-rose-100">
                                {(o.items || []).map((item, idx) => (
                                  <div key={idx} className="flex justify-between">
                                    <span className="font-bold text-[#002e47]">
                                      {item.name} × {item.qty}
                                      {Array.isArray(item.addons) && item.addons.length > 0 && (
                                        <span className="text-amber-700 font-normal ml-1">
                                          (+ {item.addons.map((a: any) => a.name).join(", ")})
                                        </span>
                                      )}
                                    </span>
                                    <span className="text-slate-500">฿{item.price * item.qty}</span>
                                  </div>
                                ))}
                              </div>
                              {(o.cancelReason || o.cancelNote || (o as any).refundPromptPay || o.note) && (
                                <div className="bg-rose-100/70 border border-rose-200 rounded-xl p-2.5 text-xs text-rose-900 font-bold space-y-1">
                                  {(o.cancelReason || o.note) && (
                                    <p>💡 <span className="font-normal text-rose-800">{t("เหตุผล")}:</span> {o.cancelReason || o.note}</p>
                                  )}
                                  {o.cancelNote && (
                                    <p>📝 <span className="font-normal text-rose-800">{t("รายละเอียด")}:</span> {o.cancelNote}</p>
                                  )}
                                  {(o as any).refundPromptPay && (
                                    <p className="flex items-center gap-1">
                                      💳 <span className="font-normal text-rose-800">{t("พร้อมเพย์/บัญชีรับเงิน")}:</span>
                                      <span className="text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded font-black">
                                        {(o as any).refundPromptPay}
                                      </span>
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <StaffOrderCard
                              key={o.id}
                              order={o}
                              advanceOrderStatus={advanceOrderStatus}
                              regressOrderStatus={regressOrderStatus}
                              cancelOrder={cancelOrder}
                            />
                          )
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
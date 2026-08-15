import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import type { CartLine, OrderType, OrderHistory } from "../types";

export function useCustomerOrders({
  dbUser,
  dbCustomer,
  profile,
  setTables,
}: {
  dbUser: any;
  dbCustomer: any;
  profile: any;
  setTables: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const [orderHistory, setOrderHistory] = useState<OrderHistory[]>([]);
  const [hasActiveOrder, setHasActiveOrder] = useState(false);
  const [activeOrderNumber, setActiveOrderNumber] = useState("");

  const syncActiveOrder = (historyList: OrderHistory[]) => {
    const active = historyList.find(
      (o) => o.status !== "สำเร็จ" && o.status !== "ยกเลิกแล้ว"
    );
    if (active) {
      setActiveOrderNumber(active.orderNumber);
      setHasActiveOrder(true);
    } else {
      setHasActiveOrder(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("ran-lung-get-orders");
    if (saved) {
      try {
        const parsed: OrderHistory[] = JSON.parse(saved);
        setOrderHistory(parsed);
        syncActiveOrder(parsed);
      } catch (e) {
        console.error("Failed to parse orders from storage:", e);
      }
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "ran-lung-get-orders" && e.newValue) {
        try {
          const updated: OrderHistory[] = JSON.parse(e.newValue);
          setOrderHistory(updated);
          syncActiveOrder(updated);
        } catch (err) {
          console.error("Failed to parse synced orders:", err);
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);

    const chOrders = supabase
      .channel("customer-orders-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload: any) => {
          if (payload.eventType === "UPDATE" || payload.eventType === "INSERT") {
            const updatedRow = payload.new;
            if (updatedRow && updatedRow.order_number) {
              setOrderHistory((prev) => {
                const statusMap: Record<string, OrderHistory["status"]> = {
                  pending: "รอรับออเดอร์",
                  preparing: "กำลังเตรียม",
                  ready: "พร้อมเสิร์ฟ" as any,
                  delivering: "กำลังจัดส่ง",
                  completed: "สำเร็จ",
                  cancelled: "ยกเลิกแล้ว",
                };
                const mappedStatus = statusMap[updatedRow.status] || updatedRow.status;
                const nextHistory = prev.map((o) =>
                  o.orderNumber === updatedRow.order_number
                    ? { ...o, status: mappedStatus }
                    : o
                );
                localStorage.setItem("ran-lung-get-orders", JSON.stringify(nextHistory));
                syncActiveOrder(nextHistory);
                return nextHistory;
              });
            }
          }
        }
      )
      .subscribe();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      supabase.removeChannel(chOrders);
    };
  }, []);

  const saveOrderToHistory = (
    cart: CartLine[],
    orderType: OrderType | null,
    selectedTable: string | null,
    address: string,
    tables: any[]
  ): boolean => {
    if (!cart || cart.length === 0) return false;
    const orderNum = `#AK-${Math.floor(2848 + Math.random() * 100)}`;
    const selectedTableObj = tables.find((t) => t.id === selectedTable);
    const tableNumStr =
      orderType === "dine-in" && selectedTableObj ? selectedTableObj.label : undefined;

    let takeawayQueueNum: string | undefined = undefined;
    if (orderType === "takeaway") {
      const currentQueueCounter = localStorage.getItem("ran-lung-get-takeaway-queue-counter");
      let nextQueue = 1;
      if (currentQueueCounter) {
        const parsed = parseInt(currentQueueCounter);
        if (!isNaN(parsed)) {
          nextQueue = parsed + 1;
        }
      }
      localStorage.setItem("ran-lung-get-takeaway-queue-counter", String(nextQueue));
      takeawayQueueNum = `Q-${String(nextQueue).padStart(2, "0")}`;
    }

    const activeSubtotal = cart.reduce((s, l) => s + l.price * l.qty, 0);
    const activeDeliveryFee = orderType === "delivery" ? 40 : 0;

    const newOrder: OrderHistory = {
      id: `hist_${Date.now()}`,
      orderNumber: orderNum,
      date:
        new Date().toLocaleDateString("th-TH", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }) +
        " · " +
        new Date().toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" }),
      items: cart.map((l) => ({ name: l.name, qty: l.qty, price: l.price, image: l.image })),
      subtotal: activeSubtotal,
      delivery: activeDeliveryFee,
      total: activeSubtotal + activeDeliveryFee,
      status: "รอรับออเดอร์",
      orderType: orderType || "delivery",
      tableNumber: tableNumStr,
      queueNumber: takeawayQueueNum,
    };
    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);
    localStorage.setItem("ran-lung-get-orders", JSON.stringify(updatedHistory));
    setActiveOrderNumber(orderNum);
    setHasActiveOrder(true);

    if (orderType === "dine-in" && selectedTable) {
      setTables((prev) =>
        prev.map((t) => (String(t.id) === String(selectedTable) ? { ...t, status: "occupied" } : t))
      );
    }

    const insertOrder = async () => {
      if (orderType === "dine-in" && selectedTable) {
        try {
          await (supabase as any)
            .from("restaurant_tables")
            .update({ status: "occupied" })
            .eq("id", selectedTable);
        } catch {}
      }
      let finalUserId = dbUser?.id;
      let finalCustomerId = dbCustomer?.id;

      if (!finalUserId || !finalCustomerId) {
        try {
          const { data: users } = await supabase.from("users").select("id").limit(1);
          const { data: customers } = await supabase.from("customers").select("id").limit(1);
          if (users && users.length > 0) finalUserId = users[0].id;
          if (customers && customers.length > 0) finalCustomerId = customers[0].id;
        } catch {}
      }

      if (!finalUserId || !finalCustomerId) {
        console.warn("Could not find any user or customer in Supabase. Skipping Supabase insert.");
        return;
      }

      const orderId =
        typeof crypto?.randomUUID === "function"
          ? crypto.randomUUID()
          : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
              const r = (Math.random() * 16) | 0,
                v = c === "x" ? r : (r & 0x3) | 0x8;
              return v.toString(16);
            });

      const { error: orderErr } = await supabase.from("orders").insert({
        id: orderId,
        order_number: orderNum,
        user_id: finalUserId,
        customer_id: finalCustomerId,
        line_user_id: profile?.userId || null,
        order_type: orderType || "delivery",
        status: "pending",
        subtotal: activeSubtotal,
        delivery_fee: activeDeliveryFee,
        total: activeSubtotal + activeDeliveryFee,
        table_number: tableNumStr || null,
        delivery_address: orderType === "delivery" ? address : null,
        special_instructions: null,
        created_at: new Date().toISOString(),
      });

      if (orderErr) {
        console.error("Failed to insert order in Supabase:", orderErr);
        return;
      }

      const orderItems = newOrder.items.map((item) => ({
        order_id: orderId,
        item_id: item.name,
        name: item.name,
        image: item.image || null,
        unit_price: item.price,
        quantity: item.qty,
        line_total: item.price * item.qty,
        created_at: new Date().toISOString(),
      }));

      const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
      if (itemsErr) {
        console.error("Failed to insert order items in Supabase:", itemsErr);
      }
    };

    void insertOrder();
    return true;
  };

  return {
    orderHistory,
    setOrderHistory,
    hasActiveOrder,
    activeOrderNumber,
    saveOrderToHistory,
  };
}

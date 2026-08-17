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

  const isOrderFinished = (status?: string) => {
    if (!status) return true;
    const s = String(status).trim().toLowerCase();
    return (
      s === "สำเร็จ" ||
      s === "เสร็จสิ้น" ||
      s === "completed" ||
      s === "ยกเลิก" ||
      s === "ยกเลิกแล้ว" ||
      s === "cancelled" ||
      s === "canceled"
    );
  };

  const syncActiveOrder = (historyList: OrderHistory[]) => {
    const active = historyList.find((o) => !isOrderFinished(o.status));
    if (active) {
      setActiveOrderNumber(active.orderNumber);
      setHasActiveOrder(true);
    } else {
      setActiveOrderNumber("");
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

    // Fetch latest order statuses from Supabase on mount
    const fetchLatestOrdersFromDb = async () => {
      try {
        const clearedAt = localStorage.getItem("ran-lung-get-orders-cleared-at");
        let query = supabase.from("orders").select("id, order_number, status, created_at");
        if (clearedAt) {
          query = query.gt("created_at", clearedAt);
        }

        if (profile?.userId) {
          query = query.or(`line_user_id.eq.${profile.userId},customer_id.eq.${dbCustomer?.id || ""}`);
        } else if (dbCustomer?.id) {
          query = query.eq("customer_id", dbCustomer.id);
        } else if (dbUser?.id) {
          query = query.eq("user_id", dbUser.id);
        } else {
          const localSaved = localStorage.getItem("ran-lung-get-orders");
          if (!localSaved) return;
          const localParsed: OrderHistory[] = JSON.parse(localSaved);
          const orderNums = localParsed.map((o) => o.orderNumber).filter(Boolean);
          if (orderNums.length === 0) return;
          query = query.in("order_number", orderNums);
        }

        const { data: dbOrders, error } = await query.order("created_at", { ascending: false }).limit(20);
        if (!error && dbOrders && dbOrders.length > 0) {
          const statusMap: Record<string, OrderHistory["status"]> = {
            pending: "รอรับออเดอร์",
            preparing: "กำลังเตรียม",
            ready: "พร้อมเสิร์ฟ" as any,
            delivering: "กำลังจัดส่ง",
            completed: "สำเร็จ",
            cancelled: "ยกเลิกแล้ว",
          };

          setOrderHistory((prev) => {
            const merged = [...prev];
            dbOrders.forEach((dbO: any) => {
              const mappedStatus =
                statusMap[dbO.status] || (isOrderFinished(dbO.status) ? "ยกเลิกแล้ว" : dbO.status);
              const existingIdx = merged.findIndex(
                (o) => o.orderNumber === dbO.order_number || o.id === dbO.id
              );
              if (existingIdx >= 0) {
                merged[existingIdx] = {
                  ...merged[existingIdx],
                  status: mappedStatus,
                };
              }
            });
            localStorage.setItem("ran-lung-get-orders", JSON.stringify(merged));
            syncActiveOrder(merged);
            return merged;
          });
        }
      } catch (err) {
        console.warn("Failed to fetch latest customer orders from Supabase:", err);
      }
    };

    void fetchLatestOrdersFromDb();

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
                const mappedStatus =
                  statusMap[updatedRow.status] ||
                  (isOrderFinished(updatedRow.status) ? "ยกเลิกแล้ว" : updatedRow.status);
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
  }, [profile?.userId, dbCustomer?.id, dbUser?.id]);

  const saveOrderToHistory = (
    cart: CartLine[],
    orderType: OrderType | null,
    selectedTable: string | null,
    address: string,
    tables: any[]
  ): boolean => {
    if (!cart || cart.length === 0) return false;
    const finalOrderType = orderType || (selectedTable ? "dine-in" : "delivery");
    const orderNum = `#AK-${Math.floor(2848 + Math.random() * 100)}`;
    const selectedTableObj = tables.find(
      (t) => String(t.id) === String(selectedTable) || t.label === selectedTable
    );
    const tableNumStr =
      finalOrderType === "dine-in" && selectedTable
        ? selectedTableObj
          ? selectedTableObj.label
          : selectedTable.includes("โต๊ะ")
          ? selectedTable
          : `โต๊ะ ${selectedTable}`
        : undefined;

    let takeawayQueueNum: string | undefined = undefined;
    if (finalOrderType === "takeaway") {
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
    const activeDeliveryFee = finalOrderType === "delivery" ? 40 : 0;

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
      orderType: finalOrderType,
      tableNumber: tableNumStr,
      queueNumber: takeawayQueueNum,
    };
    const updatedHistory = [newOrder, ...orderHistory];
    setOrderHistory(updatedHistory);
    localStorage.setItem("ran-lung-get-orders", JSON.stringify(updatedHistory));
    setActiveOrderNumber(orderNum);
    setHasActiveOrder(true);

    if (finalOrderType === "dine-in" && selectedTable) {
      setTables((prev) => {
        const next = prev.map((t) =>
          String(t.id) === String(selectedTable) || t.label === selectedTable || t.label === tableNumStr
            ? { ...t, status: "occupied" }
            : t
        );
        localStorage.setItem("ran-lung-get-tables", JSON.stringify(next));
        window.dispatchEvent(
          new StorageEvent("storage", {
            key: "ran-lung-get-tables",
            newValue: JSON.stringify(next),
          })
        );
        return next;
      });
    }

    const insertOrder = async () => {
      if (finalOrderType === "dine-in" && selectedTable) {
        try {
          const rawId = String(selectedTable).replace("โต๊ะ", "").trim();
          await (supabase as any)
            .from("restaurant_tables")
            .update({ status: "occupied" })
            .eq("id", rawId);
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

  const clearOrderHistory = async () => {
    const currentOrders = orderHistory;
    const orderIds = currentOrders.map((o) => o.id).filter(Boolean);

    setOrderHistory([]);
    setHasActiveOrder(false);
    setActiveOrderNumber("");
    localStorage.setItem("ran-lung-get-orders", JSON.stringify([]));
    localStorage.setItem("ran-lung-get-orders-cleared-at", new Date().toISOString());
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "ran-lung-get-orders",
        newValue: JSON.stringify([]),
      })
    );

    try {
      // 1. Delete order_items first to satisfy foreign key constraints
      if (orderIds.length > 0) {
        await supabase.from("order_items").delete().in("order_id", orderIds);
        await supabase.from("orders").delete().in("id", orderIds);
      }

      // 2. Delete user's orders from Supabase if authenticated
      if (profile?.userId) {
        const { data: userOrders } = await supabase
          .from("orders")
          .select("id")
          .eq("line_user_id", profile.userId);
        if (userOrders && userOrders.length > 0) {
          const uIds = userOrders.map((o) => o.id);
          await supabase.from("order_items").delete().in("order_id", uIds);
          await supabase.from("orders").delete().in("id", uIds);
        }
      } else if (dbCustomer?.id) {
        const { data: custOrders } = await supabase
          .from("orders")
          .select("id")
          .eq("customer_id", dbCustomer.id);
        if (custOrders && custOrders.length > 0) {
          const cIds = custOrders.map((o) => o.id);
          await supabase.from("order_items").delete().in("order_id", cIds);
          await supabase.from("orders").delete().in("id", cIds);
        }
      } else if (dbUser?.id) {
        const { data: usrOrders } = await supabase
          .from("orders")
          .select("id")
          .eq("user_id", dbUser.id);
        if (usrOrders && usrOrders.length > 0) {
          const usrIds = usrOrders.map((o) => o.id);
          await supabase.from("order_items").delete().in("order_id", usrIds);
          await supabase.from("orders").delete().in("id", usrIds);
        }
      }
    } catch (e) {
      console.warn("Failed to delete orders from Supabase:", e);
    }
  };

  return {
    orderHistory,
    setOrderHistory,
    hasActiveOrder,
    activeOrderNumber,
    saveOrderToHistory,
    clearOrderHistory,
  };
}

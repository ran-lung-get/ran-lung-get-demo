import { useState, useEffect } from "react";
import { Plus, X, ChevronRight, PlusCircle, Trash2, CheckCircle2, Users, Clock, Filter, Sparkles } from "lucide-react";
import { supabase } from "../../../lib/supabase";
import type { OrderHistory } from "../types";

export function TableManagementView({
  orders,
  onRefreshOrders,
}: {
  orders: OrderHistory[];
  onRefreshOrders: () => Promise<void>;
}) {
  const [tables, setTables] = useState<any[]>([
    { id: "1", label: "โต๊ะ 1", status: "available", capacity: 4, table_type: "normal" },
    { id: "2", label: "โต๊ะ 2", status: "occupied", capacity: 4, table_type: "normal" },
    { id: "3", label: "โต๊ะ 3", status: "available", capacity: 4, table_type: "normal" },
    { id: "4", label: "โต๊ะ 4", status: "available", capacity: 4, table_type: "normal" },
    { id: "5", label: "โต๊ะ 5", status: "available", capacity: 4, table_type: "normal" },
    { id: "6", label: "โต๊ะ 6", status: "occupied", capacity: 4, table_type: "normal" },
    { id: "7", label: "โต๊ะ 7", status: "available", capacity: 4, table_type: "normal" },
    { id: "8", label: "โต๊ะ 8", status: "available", capacity: 4, table_type: "normal" },
    { id: "9", label: "โต๊ะ 9 (Walk-in)", status: "available", capacity: 4, table_type: "walkin" },
    { id: "10", label: "โต๊ะ 10 (Walk-in)", status: "available", capacity: 4, table_type: "walkin" },
  ]);
  const [selectedTable, setSelectedTable] = useState<any | null>(null);
  const [tableFilter, setTableFilter] = useState<"all" | "available" | "occupied">("all");
  const [loading, setLoading] = useState(false);
  const [isMoveSelectorOpen, setIsMoveSelectorOpen] = useState(false);
  const [isAddTableOpen, setIsAddTableOpen] = useState(false);
  const [newTableName, setNewTableName] = useState("");
  const [newTableCapacity, setNewTableCapacity] = useState(4);
  const [newTableType, setNewTableType] = useState<"normal" | "walkin">("normal");
  const [addingTable, setAddingTable] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void | Promise<void>;
  } | null>(null);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("restaurant_tables")
        .select("id, label, status, capacity, table_type")
        .order("id");
      if (!error && data && data.length > 0) {
        const strData = data.map((t: any) => ({ ...t, id: String(t.id) }));
        setTables(strData as any);
        localStorage.setItem("ran-lung-get-tables", JSON.stringify(strData));
      } else {
        const local = localStorage.getItem("ran-lung-get-tables");
        if (local) setTables(JSON.parse(local));
      }
    } catch {
      const local = localStorage.getItem("ran-lung-get-tables");
      if (local) setTables(JSON.parse(local));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
    const ch = supabase
      .channel("tables-staff-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "restaurant_tables" }, (payload: any) => {
        if (payload.eventType === "DELETE") {
          const deletedId = String(payload.old?.id);
          setTables((prev) => {
            const next = prev.filter((t) => t.id !== deletedId);
            localStorage.setItem("ran-lung-get-tables", JSON.stringify(next));
            return next;
          });
          setSelectedTable((prev: any) => (prev?.id === deletedId ? null : prev));
        } else if (payload.eventType === "UPDATE" || payload.eventType === "INSERT") {
          const updated = { ...payload.new, id: String(payload.new.id) } as any;
          setTables((prev) => {
            const exists = prev.some((t) => t.id === updated.id);
            const next = exists
              ? prev.map((t) => (t.id === updated.id ? { ...t, ...updated } : t))
              : [...prev, updated];
            localStorage.setItem("ran-lung-get-tables", JSON.stringify(next));
            return next;
          });
          setSelectedTable((prev: any) => (prev?.id === updated.id ? { ...prev, ...updated } : prev));
        }
      })
      .subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  const extractTableNumber = (val?: string): string => {
    if (!val) return "";
    const digits = String(val).match(/\d+/);
    return digits ? digits[0] : "";
  };

  const matchTable = (orderTable?: string, tableLabel?: string, tableId?: string): boolean => {
    if (!orderTable) return false;
    const orderNum = extractTableNumber(orderTable);
    if (!orderNum) return false;
    const labelNum = extractTableNumber(tableLabel);
    const idNum = extractTableNumber(tableId);
    return (!!labelNum && orderNum === labelNum) || (!!idNum && orderNum === idNum);
  };

  const getActiveOrdersForTable = (tableLabel: string, tableId?: string) => {
    return orders.filter(
      (o) =>
        (o.status === "รอดำเนินการ" ||
          o.status === "กำลังทำ" ||
          o.status === "พร้อมเสิร์ฟ" ||
          o.status === "รอรับออเดอร์" ||
          o.status === "pending" ||
          o.status === "preparing" ||
          o.status === "ready") &&
        matchTable(o.tableNumber, tableLabel, tableId)
    );
  };

  const getCompletedOrdersForTable = (tableLabel: string, tableId?: string) => {
    return orders.filter(
      (o) =>
        (o.status === "สำเร็จ" || o.status === "completed") &&
        matchTable(o.tableNumber, tableLabel, tableId)
    );
  };

  const getTableOrders = (tableLabel: string, tableId?: string) => {
    return orders.filter(
      (o) =>
        o.status !== "ยกเลิก" &&
        o.status !== "cancelled" &&
        matchTable(o.tableNumber, tableLabel, tableId)
    );
  };

  const updateTableStatus = async (tableId: string, nextStatus: string) => {
    const nextList = tables.map((t) => (t.id === tableId ? { ...t, status: nextStatus } : t));
    setTables(nextList);
    localStorage.setItem("ran-lung-get-tables", JSON.stringify(nextList));
    window.dispatchEvent(new StorageEvent("storage", {
      key: "ran-lung-get-tables",
      newValue: JSON.stringify(nextList),
    }));
    try {
      window.dispatchEvent(new CustomEvent("ran-lung-get-tables-updated", { detail: nextList }));
    } catch {}

    const currentSelected = nextList.find((t) => t.id === tableId);
    if (currentSelected) setSelectedTable(currentSelected);

    try {
      await supabase.from("restaurant_tables").update({ status: nextStatus }).eq("id", tableId);
    } catch {
      console.warn("Offline update completed locally.");
    }
  };

  const addNewTable = async () => {
    if (!newTableName.trim()) return;
    setAddingTable(true);
    const label = newTableName.trim();
    const suffix = newTableType === "walkin" ? " (Walk-in)" : "";
    const fullLabel = label.includes("โต๊ะ") ? label + suffix : `โต๊ะ ${label}${suffix}`;
    try {
      const { data, error } = await supabase
        .from("restaurant_tables")
        .insert({ label: fullLabel, status: "available", capacity: newTableCapacity, table_type: newTableType })
        .select()
        .single();
      if (error) throw error;
      const newT = { ...data, id: String(data.id) };
      setTables((prev) => {
        const next = [...prev, newT];
        localStorage.setItem("ran-lung-get-tables", JSON.stringify(next));
        return next;
      });
      setIsAddTableOpen(false);
      setNewTableName("");
      setNewTableCapacity(4);
      setNewTableType("normal");
    } catch (e: any) {
      alert("เกิดข้อผิดพลาด: " + (e?.message || "ไม่สามารถเพิ่มโต๊ะได้"));
    } finally {
      setAddingTable(false);
    }
  };

  const deleteTable = async (tableId: string, tableLabel: string) => {
    const activeOrders = getActiveOrdersForTable(tableLabel);
    if (activeOrders.length > 0) {
      alert(`ไม่สามารถลบโต๊ะได้ เนื่องจากมีออเดอร์ค้างอยู่ ${activeOrders.length} รายการ กรุณาเคลียร์โต๊ะก่อน`);
      return;
    }
    try {
      const { error } = await supabase.from("restaurant_tables").delete().eq("id", tableId);
      if (error) throw error;
      setTables((prev) => {
        const next = prev.filter((t) => t.id !== tableId);
        localStorage.setItem("ran-lung-get-tables", JSON.stringify(next));
        return next;
      });
      setSelectedTable(null);
    } catch (e: any) {
      alert("เกิดข้อผิดพลาด: " + (e?.message || "ไม่สามารถลบโต๊ะได้"));
    }
  };

  const moveAllOrders = async (fromTableLabel: string, toTableLabel: string) => {
    const activeFromOrders = getActiveOrdersForTable(fromTableLabel);
    if (activeFromOrders.length === 0) {
      alert("ไม่มีออเดอร์ให้ย้ายบนโต๊ะนี้");
      return;
    }
    try {
      const orderIds = activeFromOrders.map((o) => o.id);
      const { error: orderErr } = await (supabase as any).from("orders").update({ table_number: toTableLabel }).in("id", orderIds);
      if (orderErr) throw orderErr;
      const fromTable = tables.find((t) => t.label === fromTableLabel);
      const toTable = tables.find((t) => t.label === toTableLabel);
      if (fromTable) await (supabase as any).from("restaurant_tables").update({ status: "available" }).eq("id", fromTable.id);
      if (toTable) await (supabase as any).from("restaurant_tables").update({ status: "occupied" }).eq("id", toTable.id);
      await fetchTables();
      await onRefreshOrders();
      const updatedTablesList = tables.map((t) =>
        t.label === fromTableLabel ? { ...t, status: "available" } : t.label === toTableLabel ? { ...t, status: "occupied" } : t
      );
      setSelectedTable(updatedTablesList.find((t) => t.label === toTableLabel) || null);
      alert(`ย้ายออเดอร์จาก ${fromTableLabel} ไปยัง ${toTableLabel} สำเร็จ!`);
    } catch (err) {
      console.error("[Move Table] Error:", err);
      alert("เกิดข้อผิดพลาดในการย้ายโต๊ะ");
    }
  };

  const clearTableAndOrders = async (tableLabel: string) => {
    try {
      const activeOrders = getActiveOrdersForTable(tableLabel);
      if (activeOrders.length > 0) {
        const orderIds = activeOrders.map((o) => o.id);
        await (supabase as any).from("orders").update({ status: "completed" }).in("id", orderIds);
      }
      const targetTable = tables.find((t) => t.label === tableLabel);
      if (targetTable) {
        await (supabase as any).from("restaurant_tables").update({ status: "available" }).eq("id", targetTable.id);
      }
      await fetchTables();
      await onRefreshOrders();
      setSelectedTable(null);
      alert(`เคลียร์โต๊ะ ${tableLabel} เสร็จสิ้น!`);
    } catch (err) {
      console.error("[Clear Table] Error:", err);
      alert("เกิดข้อผิดพลาดในการเคลียร์โต๊ะ");
    }
  };

  // Only auto-occupy if an active cooking/waiting order arrives for an available table
  useEffect(() => {
    if (tables.length === 0) return;
    const toOccupy = tables.filter(
      (t) => getActiveOrdersForTable(t.label, t.id).length > 0 && t.status === "available"
    );
    if (toOccupy.length > 0) {
      toOccupy.forEach((t) => {
        void updateTableStatus(t.id, "occupied");
      });
    }
  }, [orders]);

  const availableCount = tables.filter((t) => t.status === "available").length;
  const occupiedCount = tables.filter((t) => t.status === "occupied").length;

  const filteredTables = tables.filter((t) => {
    if (tableFilter === "all") return true;
    return t.status === tableFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header & Quick Stats */}
      <div className="bg-white border border-[#ece4d6] rounded-3xl p-5 shadow-xs flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-black text-[#002e47]">ผังที่นั่ง & จัดการสถานะโต๊ะอาหาร</h2>
            <span className="bg-[#fcc14a] text-[#002e47] text-[10px] font-black px-2 py-0.5 rounded-full">
              {tables.length} โต๊ะ
            </span>
          </div>
          <p className="text-xs text-slate-500 font-semibold mt-1">
            พนักงานสามารถกดกำหนดสถานะ ว่าง / มีลูกค้า ได้ทันทีด้วยตนเอง
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-50 p-1.5 rounded-2xl border border-slate-200/80">
          <button
            type="button"
            onClick={() => setTableFilter("all")}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer ${
              tableFilter === "all"
                ? "bg-[#002e47] text-white shadow-xs"
                : "text-slate-600 hover:bg-slate-200/60"
            }`}
          >
            ทั้งหมด ({tables.length})
          </button>
          <button
            type="button"
            onClick={() => setTableFilter("available")}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
              tableFilter === "available"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 inline-block" />
            <span>ว่าง ({availableCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setTableFilter("occupied")}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
              tableFilter === "occupied"
                ? "bg-red-600 text-white shadow-xs"
                : "text-red-700 hover:bg-red-50"
            }`}
          >
            <span className="h-2 w-2 rounded-full bg-red-400 inline-block" />
            <span>มีลูกค้า ({occupiedCount})</span>
          </button>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={fetchTables}
            className="bg-[#002e47]/5 border border-[#002e47]/10 hover:bg-[#002e47]/10 text-[#002e47] text-xs font-black px-3.5 py-2 rounded-xl transition cursor-pointer"
          >
            🔄 โหลดใหม่
          </button>
          <button
            type="button"
            onClick={() => setIsAddTableOpen(true)}
            className="flex items-center gap-1.5 bg-[#002e47] hover:bg-[#003a5c] text-white text-xs font-black px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
          >
            <Plus size={14} />
            <span>เพิ่มโต๊ะ</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Table Grid */}
        <div className="flex-1 lg:max-w-[65%]">
          {loading ? (
            <div className="bg-white border border-[#ece4d6] rounded-3xl p-16 text-center text-slate-400 font-bold shadow-xs">
              กำลังโหลดผังโต๊ะ...
            </div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
              {[...filteredTables]
                .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))
                .map((table) => {
                  const activeOrders = getActiveOrdersForTable(table.label, table.id);
                  const completedOrders = getCompletedOrdersForTable(table.label, table.id);
                  const isOccupied = table.status === "occupied";
                  const isAvailable = !isOccupied;
                  const isWalkIn = table.table_type === "walkin" || table.label.toLowerCase().includes("walk-in");
                  const isSelected = selectedTable?.id === table.id;

                  let statusLabel = isOccupied ? "มีลูกค้า" : isWalkIn ? "Walk-in ว่าง" : "ว่าง";
                  let statusBadgeClass = isOccupied
                    ? "bg-red-500 text-white border-red-600"
                    : isWalkIn
                    ? "bg-slate-600 text-white border-slate-700"
                    : "bg-emerald-500 text-white border-emerald-600";
                  let cardBg = isOccupied
                    ? "bg-red-50/40 border-red-300 hover:bg-red-50/70"
                    : isWalkIn
                    ? "bg-slate-50/40 border-slate-300 hover:bg-slate-50/70"
                    : "bg-emerald-50/30 border-emerald-200 hover:bg-emerald-50/60";

                  return (
                    <div
                      key={table.id}
                      onClick={() => setSelectedTable(table)}
                      className={`border-2 rounded-3xl p-4 text-left relative overflow-hidden transition cursor-pointer flex flex-col justify-between min-h-[140px] shadow-xs hover:shadow-md ${cardBg} ${
                        isSelected ? "ring-4 ring-[#002e47]/30 border-[#002e47] scale-[1.01]" : ""
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-black text-base text-[#002e47]">{table.label}</span>
                          <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border shadow-2xs ${statusBadgeClass}`}>
                            {statusLabel}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-wider">
                          รองรับ {table.capacity || 4} ท่าน {isWalkIn && <span className="ml-1 text-slate-600 font-extrabold">(Walk-in)</span>}
                        </p>
                      </div>

                      {/* Order Summary on Table */}
                      <div className="mt-3">
                        {isOccupied && activeOrders.length > 0 ? (
                          <div className="bg-amber-100/90 border border-amber-300 rounded-xl px-2.5 py-1.5 text-xs text-amber-950 font-bold flex items-center justify-between">
                            <span>กำลังปรุง/รอเสิร์ฟ</span>
                            <span className="bg-amber-600 text-white text-[10px] px-2 py-0.5 rounded-md font-black">
                              {activeOrders.length} บิล
                            </span>
                          </div>
                        ) : isOccupied && completedOrders.length > 0 ? (
                          <div className="bg-red-100/90 border border-red-200 rounded-xl px-2.5 py-1.5 text-xs text-red-900 font-bold flex items-center justify-between">
                            <span>🍽️ เสิร์ฟแล้ว (กำลังทาน)</span>
                            <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-md font-black">
                              {completedOrders.length} บิล
                            </span>
                          </div>
                        ) : isOccupied ? (
                          <div className="bg-red-50 border border-red-200 rounded-xl px-2.5 py-1.5 text-[11px] text-red-800 font-bold flex items-center gap-1.5">
                            <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                            <span>มีลูกค้านั่งที่โต๊ะ</span>
                          </div>
                        ) : (
                          <div className="text-[11px] text-emerald-700 font-bold py-0.5">
                            🟢 พร้อมรับลูกค้าทันที
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Detail Panel */}
        <div className="w-full lg:w-[35%] bg-white border border-[#ece4d6] rounded-[28px] p-6 shadow-xs flex flex-col min-h-[500px]">
          {selectedTable ? (
            <div className="flex flex-col flex-1 h-full text-[#002e47]">
              <div className="flex justify-between items-start pb-4 border-b border-slate-100 mb-5">
                <div>
                  <h3 className="text-lg font-black">{selectedTable.label}</h3>
                  <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border inline-block mt-1 ${
                    selectedTable.status === "occupied"
                      ? "bg-red-500 text-white border-red-600"
                      : "bg-emerald-500 text-white border-emerald-600"
                  }`}>
                    {selectedTable.status === "occupied" ? "🔴 มีลูกค้า" : "🟢 ว่าง"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => { setSelectedTable(null); setIsMoveSelectorOpen(false); }}
                  className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 cursor-pointer text-slate-500 transition"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Status Selector */}
              <div className="mb-5 bg-[#002e47]/5 p-3.5 rounded-2xl border border-[#002e47]/10">
                <span className="text-xs font-black text-[#002e47] block mb-2">กำหนดสถานะโต๊ะ (คลิกเพื่อเปลี่ยนทันที)</span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => updateTableStatus(selectedTable.id, "available")}
                    className={`py-3 px-2 rounded-xl font-black text-xs border transition cursor-pointer flex flex-col items-center gap-0.5 ${
                      selectedTable.status === "available" || selectedTable.status !== "occupied"
                        ? "bg-emerald-500 text-white border-emerald-600 shadow-md ring-2 ring-emerald-300"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                  >
                    <span>🟢 ว่าง</span>
                    <span className="text-[9px] font-medium opacity-80">พร้อมรับลูกค้า</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => updateTableStatus(selectedTable.id, "occupied")}
                    className={`py-3 px-2 rounded-xl font-black text-xs border transition cursor-pointer flex flex-col items-center gap-0.5 ${
                      selectedTable.status === "occupied"
                        ? "bg-red-500 text-white border-red-600 shadow-md ring-2 ring-red-300"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-red-50 hover:text-red-700"
                    }`}
                  >
                    <span>🔴 มีลูกค้า</span>
                    <span className="text-[9px] font-medium opacity-80">กำลังนั่งทาน</span>
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="mb-6 space-y-2">
                <span className="text-xs font-bold text-slate-500 block mb-1">เมนูการจัดการ</span>
                <button
                  type="button"
                  onClick={() => setIsMoveSelectorOpen(true)}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">🔄 ย้าย / รวมออเดอร์ไปยังโต๊ะอื่น</span>
                  <ChevronRight size={14} className="text-slate-400" />
                </button>
                <a
                  href="/customer"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => { localStorage.setItem("ran-lung-get-selected-table", selectedTable.id); }}
                  className="w-full py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs flex items-center justify-between transition block text-left text-inherit no-underline cursor-pointer"
                >
                  <span className="flex items-center gap-2">🛍️ สั่งอาหาร Walk-in (ชำระเงินสด/โอนเงิน)</span>
                  <PlusCircle size={14} className="text-slate-400" />
                </a>
                <button
                  type="button"
                  onClick={() => setConfirmDialog({
                    isOpen: true,
                    title: "ยืนยันการเคลียร์โต๊ะ",
                    message: `คุณต้องการเคลียร์โต๊ะและเปลี่ยนสถานะออเดอร์ค้างทั้งหมดของ ${selectedTable.label} ให้เสร็จสิ้นใช่หรือไม่?`,
                    onConfirm: async () => { await clearTableAndOrders(selectedTable.label); }
                  })}
                  className="w-full py-3 px-4 rounded-xl border border-red-200 text-red-700 bg-red-50/30 hover:bg-red-50 font-bold text-xs flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">🧹 เคลียร์โต๊ะ & อ้างอิงออเดอร์เสร็จสิ้น</span>
                  <Trash2 size={14} className="text-red-400" />
                </button>

                <button
                  type="button"
                  onClick={() => setConfirmDialog({
                    isOpen: true,
                    title: "⚠️ ยืนยันการลบโต๊ะ",
                    message: `คุณต้องการลบ ${selectedTable.label} ออกจากระบบใช่หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้`,
                    onConfirm: async () => { await deleteTable(selectedTable.id, selectedTable.label); }
                  })}
                  className="w-full py-3 px-4 rounded-xl border border-red-300 text-red-800 bg-red-100/50 hover:bg-red-100 font-bold text-xs flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-2">🗑️ ลบโต๊ะนี้ออกจากระบบ</span>
                  <Trash2 size={14} className="text-red-500" />
                </button>
              </div>

              {/* Table Orders List */}
              <div className="flex-1 flex flex-col border-t border-slate-100 pt-4 overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-700">
                    รายการอาหารบนโต๊ะ ({getTableOrders(selectedTable.label, selectedTable.id).length} บิล)
                  </span>
                  {getTableOrders(selectedTable.label, selectedTable.id).length > 0 && (
                    <span className="text-[10px] text-slate-400 font-medium">
                      รวมทั้งหมด: ฿{getTableOrders(selectedTable.label, selectedTable.id).reduce((sum, o) => sum + o.total, 0)}
                    </span>
                  )}
                </div>
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[280px] no-scrollbar">
                  {getTableOrders(selectedTable.label, selectedTable.id).length > 0 ? (
                    getTableOrders(selectedTable.label, selectedTable.id).map((order) => {
                      const isOrderDone = order.status === "สำเร็จ" || order.status === "completed";
                      return (
                        <div
                          key={order.id}
                          className={`rounded-xl p-3.5 space-y-2 border transition ${
                            isOrderDone
                              ? "bg-slate-50/80 border-slate-200"
                              : "bg-amber-50/60 border-amber-200"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-extrabold text-[11px] text-[#002e47]">
                              {order.orderNumber}
                            </span>
                            <span
                              className={`text-[10px] font-black px-2 py-0.5 rounded ${
                                isOrderDone
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-amber-500 text-white"
                              }`}
                            >
                              {isOrderDone ? "🍽️ เสิร์ฟแล้ว (กำลังทาน)" : order.status}
                            </span>
                          </div>
                          <div className="space-y-1 text-xs text-slate-600 font-bold">
                            {(order.items || []).map((it, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span>{it?.name || "รายการ"} x{it?.qty || 1}</span>
                                <span>฿{(it?.price || 0) * (it?.qty || 1)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-dashed border-slate-200 text-xs">
                            <span className="font-black text-[#002e47]">ยอดรวม: ฿{order.total || 0}</span>
                            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded">ชำระแล้ว</span>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center text-slate-400 py-8 text-xs italic font-bold">
                      ไม่มีประวัติออเดอร์บนโต๊ะนี้
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-12 text-center my-auto">
              <div className="text-5xl mb-3">🍽️</div>
              <p className="font-bold text-sm text-[#002e47]">เลือกโต๊ะอาหารเพื่อดำเนินการ</p>
              <p className="text-[11px] text-slate-500 mt-1.5 max-w-[200px] leading-relaxed">
                กดเลือกโต๊ะจากแผนผังที่นั่งฝั่งซ้าย เพื่อกำหนดสถานะ (ว่าง/มีลูกค้า/จอง), ย้ายออเดอร์ หรือเคลียร์โต๊ะ
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add Table Modal */}
      {isAddTableOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsAddTableOpen(false)} />
          <div className="bg-white rounded-[28px] p-6 w-full max-w-sm z-10 border border-[#ece4d6] shadow-2xl relative text-[#002e47]">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-black">➕ เพิ่มโต๊ะใหม่</h3>
              <button
                type="button"
                onClick={() => setIsAddTableOpen(false)}
                className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 cursor-pointer text-slate-500"
              >
                <X size={15} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">ชื่อโต๊ะ / หมายเลขโต๊ะ</label>
                <input
                  type="text"
                  placeholder="เช่น 11, VIP, ห้องส่วนตัว"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#002e47]/20"
                  onKeyDown={(e) => e.key === "Enter" && addNewTable()}
                  autoFocus
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">จำนวนที่นั่ง</label>
                <select
                  value={newTableCapacity}
                  onChange={(e) => setNewTableCapacity(Number(e.target.value))}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#002e47]/20 bg-white"
                >
                  {[2, 4, 6, 8, 10, 12].map((n) => (
                    <option key={n} value={n}>
                      {n} คน
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">ประเภทโต๊ะ</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewTableType("normal")}
                    className={`py-2.5 rounded-xl font-bold text-xs border transition ${newTableType === "normal" ? "bg-[#002e47] text-white border-[#002e47]" : "bg-white border-slate-200 hover:bg-slate-50"}`}
                  >
                    🪑 ปกติ
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewTableType("walkin")}
                    className={`py-2.5 rounded-xl font-bold text-xs border transition ${newTableType === "walkin" ? "bg-slate-600 text-white border-slate-600" : "bg-white border-slate-200 hover:bg-slate-50"}`}
                  >
                    🚶 Walk-in
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => setIsAddTableOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={addNewTable}
                disabled={!newTableName.trim() || addingTable}
                className="flex-1 py-2.5 rounded-xl bg-[#002e47] text-white font-black text-xs hover:bg-[#003a5c] transition disabled:opacity-50"
              >
                {addingTable ? "กำลังเพิ่ม..." : "✅ เพิ่มโต๊ะ"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Move Table Modal */}
      {isMoveSelectorOpen && selectedTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setIsMoveSelectorOpen(false)} />
          <div className="bg-white rounded-[28px] p-6 w-full max-w-lg z-10 border border-[#ece4d6] shadow-2xl relative text-[#002e47] flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-5 shrink-0">
              <div>
                <h3 className="text-lg font-black flex items-center gap-2">🔄 ย้าย / รวมออเดอร์</h3>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">
                  เลือกโต๊ะปลายทางสำหรับ <span className="font-extrabold text-[#002e47] underline">{selectedTable.label}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMoveSelectorOpen(false)}
                className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 cursor-pointer text-slate-500"
              >
                <X size={15} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar py-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[...tables]
                  .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10))
                  .filter((t) => t.id !== selectedTable.id)
                  .map((t) => {
                    const activeOrders = getActiveOrdersForTable(t.label);
                    const isOccupied = t.status === "occupied";
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => {
                          const actionText = isOccupied ? `รวมออเดอร์กับ ${t.label}` : `ย้ายออเดอร์ทั้งหมดไปที่ ${t.label}`;
                          setConfirmDialog({
                            isOpen: true,
                            title: isOccupied ? "ยืนยันการรวมออเดอร์" : "ยืนยันการย้ายโต๊ะ",
                            message: `คุณต้องการ${actionText} ใช่หรือไม่?`,
                            onConfirm: async () => {
                              await moveAllOrders(selectedTable.label, t.label);
                              setIsMoveSelectorOpen(false);
                            },
                          });
                        }}
                        className={`border-2 rounded-md p-4 text-left transition flex flex-col justify-between min-h-[110px] cursor-pointer ${isOccupied ? "bg-red-50/10 border-red-100 hover:bg-red-50/50" : "bg-emerald-50/10 border-emerald-100 hover:bg-emerald-50/50"}`}
                      >
                        <div className="w-full flex items-center justify-between">
                          <span className="font-extrabold text-sm">{t.label}</span>
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full border ${isOccupied ? "bg-red-500 text-white border-red-600" : "bg-emerald-500 text-white border-emerald-600"}`}>
                            {isOccupied ? "มีลูกค้า" : "ว่าง"}
                          </span>
                        </div>
                        {isOccupied && (
                          <div className="text-[10px] text-red-700 font-extrabold mt-2">
                            {activeOrders.length > 0 ? `ค้างอยู่ ${activeOrders.length} ออเดอร์` : "นั่งโต๊ะเปล่า"}
                          </div>
                        )}
                      </button>
                    );
                  })}
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 shrink-0 flex justify-end">
              <button
                type="button"
                onClick={() => setIsMoveSelectorOpen(false)}
                className="px-5 py-2.5 rounded-md border border-slate-200 hover:bg-slate-50 font-bold text-xs"
              >
                ยกเลิก
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Dialog */}
      {confirmDialog?.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setConfirmDialog(null)} />
          <div className="bg-white rounded-[28px] p-6 w-full max-w-sm z-10 border border-[#ece4d6] shadow-2xl relative text-[#002e47] flex flex-col">
            <h3 className="text-base font-black mb-2">{confirmDialog.title}</h3>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed mb-6">{confirmDialog.message}</p>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setConfirmDialog(null)}
                className="px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-50 bg-white font-bold text-xs cursor-pointer transition"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={async () => {
                  const onConf = confirmDialog.onConfirm;
                  setConfirmDialog(null);
                  await onConf();
                }}
                className="px-4 py-2 rounded-md bg-[#002e47] hover:bg-[#002e47]/90 text-white font-bold text-xs cursor-pointer border border-transparent transition"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

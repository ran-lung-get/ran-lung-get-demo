import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";

export function useCustomerTables() {
  const [selectedTable, setSelectedTable] = useState("");
  const [showTablePicker, setShowTablePicker] = useState(false);
  const [tables, setTables] = useState([
    { id: "1", label: "โต๊ะ 1", status: "available" },
    { id: "2", label: "โต๊ะ 2", status: "available" },
    { id: "3", label: "โต๊ะ 3", status: "available" },
    { id: "4", label: "โต๊ะ 4", status: "available" },
    { id: "5", label: "โต๊ะ 5", status: "available" },
    { id: "6", label: "โต๊ะ 6", status: "available" },
    { id: "7", label: "โต๊ะ 7", status: "available" },
    { id: "8", label: "โต๊ะ 8", status: "available" },
    { id: "9", label: "โต๊ะ 9 (Walk-in)", status: "available" },
    { id: "10", label: "โต๊ะ 10 (Walk-in)", status: "available" },
  ]);

  useEffect(() => {
    async function fetchTables() {
      try {
        const { data, error } = await supabase
          .from("restaurant_tables")
          .select("id, label, status")
          .order("id");
        if (!error && data && data.length > 0) {
          const has9 = data.some((t: any) => t.id === "9" || t.label.includes("โต๊ะ 9"));
          const has10 = data.some((t: any) => t.id === "10" || t.label.includes("โต๊ะ 10"));
          const merged = [...data];
          if (!has9) {
            merged.push({ id: "9", label: "โต๊ะ 9 (Walk-in)", status: "available" });
          }
          if (!has10) {
            merged.push({ id: "10", label: "โต๊ะ 10 (Walk-in)", status: "available" });
          }

          setTables(merged as any);
          localStorage.setItem("ran-lung-get-tables", JSON.stringify(merged));
        } else {
          const local = localStorage.getItem("ran-lung-get-tables");
          if (local) setTables(JSON.parse(local));
        }
      } catch {
        const local = localStorage.getItem("ran-lung-get-tables");
        if (local) setTables(JSON.parse(local));
      }
    }
    fetchTables();

    const ch = supabase
      .channel("tables-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "restaurant_tables" },
        (payload: any) => {
          if (payload.eventType === "UPDATE" || payload.eventType === "INSERT") {
            const updated = payload.new as any;
            setTables((prev) => {
              const next = prev.map((t) =>
                t.id === String(updated.id) ? { ...t, ...updated, id: String(updated.id) } : t
              );
              localStorage.setItem("ran-lung-get-tables", JSON.stringify(next));
              return next;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(ch);
    };
  }, []);

  const handleSelectTable = (tableId: string) => {
    setSelectedTable(tableId);
  };

  return {
    tables,
    setTables,
    selectedTable,
    setSelectedTable,
    showTablePicker,
    setShowTablePicker,
    handleSelectTable,
  };
}

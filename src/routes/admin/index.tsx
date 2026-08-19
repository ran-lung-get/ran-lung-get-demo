import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { supabase } from "../../lib/supabase";
import {
  getIngredients,
  updateIngredientStock,
  addIngredient,
  deleteIngredient,
} from "../../lib/supabase.service";
import type { MenuItem } from "../../features/customer";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  ArrowLeft,
  Menu,
} from "lucide-react";

import {
  type AdminViewType,
  AdminSidebarContent,
  AdminDashboardView,
  AdminInventoryView,
  AdminStaffView,
  AdminResetModal,
} from "../../features/admin";
import { useLanguage } from "../../lib/i18n";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "DineOS" },
      { name: "description", content: "ระบบจัดการคลัง สต็อก เมนู และบัญชีผู้ใช้ DineOS" },
    ],
  }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const { t, tMenu } = useLanguage();
  const navigate = useNavigate();
  const [view, setView] = useState<AdminViewType>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [resetModalOpen, setResetModalOpen] = useState(false);

  // Auth check state
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [_adminUser, setAdminUser] = useState<any>(null);

  // Dashboard state
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Inventory state
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loadingMenuItems, setLoadingMenuItems] = useState(false);
  const [activeSubView, setActiveSubView] = useState<"menu" | "ingredients">("menu");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [outOfStockIds, setOutOfStockIds] = useState<string[]>([]);

  // Add ingredient form states
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

  // Staff management state
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // 1. Verify Admin Auth
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

        if (error || !data || data.role !== "admin") {
          console.warn("Unauthorized access: admin role required");
          window.location.href = "/customer";
          return;
        }

        if (data.is_active === false) {
          alert("บัญชีแอดมินของคุณอยู่ระหว่างรอการอนุมัติสิทธิ์ (Pending Approval)");
          await supabase.auth.signOut();
          window.location.href = "/login";
          return;
        }

        setAdminUser(data);
      } catch (err) {
        console.error("Auth check failed:", err);
        window.location.href = "/customer";
      } finally {
        setCheckingAuth(false);
      }
    }
    checkAuth();
  }, []);

  // 2. Fetch Orders (for Dashboard Stats)
  const fetchSupabaseOrders = async () => {
    setLoadingOrders(true);
    try {
      const { data: dbOrders, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          customers (
            display_name
          ),
          order_items (*)
        `,
        )
        .order("created_at", { ascending: false });

      if (!error && dbOrders) {
        const mapped = dbOrders.map((o: any) => {
          let localStatus = "รอดำเนินการ";
          if (o.status === "pending") localStatus = "รอดำเนินการ";
          else if (o.status === "preparing") localStatus = "กำลังทำ";
          else if (o.status === "ready") localStatus = "พร้อมเสิร์ฟ";
          else if (o.status === "delivering") localStatus = "กำลังจัดส่ง";
          else if (o.status === "completed") localStatus = "สำเร็จ";
          else if (o.status === "cancelled") localStatus = "ยกเลิก";
          else if (o.status) localStatus = o.status;

          return {
            id: o.id,
            orderNumber: o.order_number,
            date:
              new Date(o.created_at).toLocaleDateString("th-TH", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }) +
              " · " +
              new Date(o.created_at).toLocaleTimeString("th-TH", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            items: (o.order_items || []).map((item: any) => ({
              name: item.name,
              qty: item.quantity,
              price: Number(item.unit_price),
            })),
            subtotal: Number(o.subtotal),
            delivery: Number(o.delivery_fee),
            total: Number(o.total),
            status: localStatus,
            orderType: o.order_type,
            customerName: o.customers?.display_name || "คุณลูกค้า",
            tableNumber: o.table_number || "",
            queueNumber: o.queue_number || "",
            note: o.special_instructions || "",
            created_at: o.created_at,
          };
        });
        setOrders(mapped);
      }
    } catch (e) {
      console.error("Failed to load orders:", e);
    } finally {
      setLoadingOrders(false);
    }
  };

  // 3. Fetch Ingredients (for Stock view)
  const fetchIngredients = async () => {
    setLoadingIngredients(true);
    try {
      const data = await getIngredients();
      setIngredients(data ?? []);
    } catch (err) {
      console.error("Load stock error:", err);
    } finally {
      setLoadingIngredients(false);
    }
  };

  const fetchMenuItems = async () => {
    setLoadingMenuItems(true);
    try {
      const { data, error } = await supabase
        .from("menu_items")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && data) {
        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          desc: item.description || "",
          price: Number(item.price),
          image: item.image_url || item.image || "",
          category: item.category || "signature",
          isAvailable: item.is_available ?? true,
          isSpicy: item.is_spicy ?? false,
          options: item.options || undefined,
          addons: item.addons || undefined,
        }));
        setMenuItems(mapped);
      } else {
        setMenuItems([]);
      }
    } catch (err) {
      console.error("Load menu items error:", err);
      setMenuItems([]);
    } finally {
      setLoadingMenuItems(false);
    }
  };

  // 4. Fetch Users (for Staff role controller)
  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setUsers(data);
      } else {
        const mockUsers = [
          {
            id: "u-1",
            display_name: "แอดมิน DineOS",
            email: "admin@dineos.app",
            role: "admin",
            is_active: true,
            picture_url: null,
          },
          {
            id: "u-2",
            display_name: "สมศรี แม่ครัว",
            email: "cook@dineos.app",
            role: "staff",
            is_active: true,
            picture_url: null,
          },
          {
            id: "u-3",
            display_name: "นายสมชาย (ลูกค้า)",
            email: "somchai@gmail.com",
            role: "customer",
            is_active: true,
            picture_url: null,
          },
        ];
        setUsers(mockUsers);
      }
    } catch (e) {
      console.error("Load users failed:", e);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Initialize data on view change
  useEffect(() => {
    if (checkingAuth) return;
    if (view === "dashboard") {
      fetchSupabaseOrders();
    } else if (view === "inventory") {
      fetchIngredients();
      fetchMenuItems();
      const savedOutOfStock = localStorage.getItem("ran-lung-get-out-of-stock-items");
      if (savedOutOfStock) {
        try {
          setOutOfStockIds(JSON.parse(savedOutOfStock));
        } catch {
          // Ignored
        }
      }
    } else if (view === "staff" || view === "approvals") {
      fetchUsers();
    }
  }, [view, checkingAuth]);

  // Realtime subscription for users table
  useEffect(() => {
    fetchUsers();

    const channel = supabase
      .channel("admin-users-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "users" }, () => {
        fetchUsers();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  const updateUserRole = async (userId: string, newRole: "admin" | "staff" | "customer") => {
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
    try {
      const { error } = await supabase.from("users").update({ role: newRole }).eq("id", userId);
      if (error) throw error;
    } catch (err) {
      console.warn("Supabase role update failed, keeping optimistic local edit:", err);
    }
  };

  const toggleUserActiveStatus = async (userId: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, is_active: nextStatus } : u)));
    try {
      const { error } = await supabase
        .from("users")
        .update({ is_active: nextStatus })
        .eq("id", userId);
      if (error) throw error;
    } catch (err) {
      console.warn("Supabase active toggle failed:", err);
    }
  };

  const deleteUser = async (userId: string, displayName: string) => {
    if (!confirm(`คุณต้องการลบผู้ใช้งาน "${displayName}" ใช่หรือไม่?`)) return;
    const previousUsers = [...users];
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    try {
      const { error } = await supabase.from("users").delete().eq("id", userId);
      if (error) throw error;
    } catch (err: any) {
      console.error("Supabase user deletion failed, rolling back:", err);
      alert(
        `ไม่สามารถลบผู้ใช้ได้: ${err?.message || "กรุณาตรวจสอบว่าผู้ใช้นี้มีประวัติคำสั่งซื้ออยู่หรือไม่"}`,
      );
      setUsers(previousUsers);
    }
  };

  const toggleStock = async (itemId: string) => {
    const isCurrentlyOut = outOfStockIds.includes(itemId);
    const updated = isCurrentlyOut
      ? outOfStockIds.filter((id) => id !== itemId)
      : [...outOfStockIds, itemId];
    const nextIsAvailable = isCurrentlyOut; // If it was out, turning on makes it available (true)

    setOutOfStockIds(updated);
    localStorage.setItem("ran-lung-get-out-of-stock-items", JSON.stringify(updated));
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "ran-lung-get-out-of-stock-items",
        newValue: JSON.stringify(updated),
      }),
    );

    // Update menuItems state & localStorage ran-lung-get-menu-items
    setMenuItems((prev) => {
      const next = prev.map((m) => (m.id === itemId ? { ...m, isAvailable: nextIsAvailable } : m));
      localStorage.setItem("ran-lung-get-menu-items", JSON.stringify(next));
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "ran-lung-get-menu-items",
          newValue: JSON.stringify(next),
        }),
      );
      try {
        window.dispatchEvent(new CustomEvent("ran-lung-get-menu-updated", { detail: next }));
      } catch {}
      return next;
    });

    try {
      await supabase.from("menu_items").update({ is_available: nextIsAvailable }).eq("id", itemId);
    } catch (e) {
      console.warn("Supabase toggleStock update failed:", e);
    }
  };

  const adjustIngredientQty = async (id: string, amount: number) => {
    const item = ingredients.find((i) => i.id === id);
    if (!item) return;
    const newQty = Math.max(0, Number(item.quantity) + amount);

    const nextList = ingredients.map((i) => (i.id === id ? { ...i, quantity: newQty } : i));
    setIngredients(nextList);
    localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(nextList));
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "ran-lung-get-mock-ingredients",
        newValue: JSON.stringify(nextList),
      })
    );
    try {
      window.dispatchEvent(new CustomEvent("ran-lung-get-stock-updated", { detail: nextList }));
    } catch {}

    try {
      await updateIngredientStock(id, newQty);
    } catch {
      console.warn("Supabase stock update failed — reverting.");
      setIngredients((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: item.quantity } : i)),
      );
    }
  };

  const handleAddIngredientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = parseFloat(newIngQty);
    const t = parseFloat(newIngThreshold);
    if (!newIngName.trim() || isNaN(q) || isNaN(t)) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง");
      return;
    }

    setNewIngName("");
    setNewIngQty("");
    setNewIngThreshold("");
    setShowAddForm(false);

    try {
      await addIngredient(newIngName.trim(), q, newIngUnit, t);
      await fetchIngredients();
    } catch (err) {
      console.error("เพิ่มวัตถุดิบไม่สำเร็จ:", err);
      alert("ไม่สามารถเพิ่มวัตถุดิบได้ กรุณาลองใหม่");
    }
  };

  const saveIngredientEdit = async (id: string) => {
    const q = parseFloat(editQty);
    const t = parseFloat(editThreshold);
    if (!editName.trim() || isNaN(q) || isNaN(t)) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const nextList = ingredients.map((i) =>
      i.id === id
        ? {
            ...i,
            name: editName.trim(),
            quantity: q,
            unit: editUnit,
            min_threshold: t,
          }
        : i,
    );
    setIngredients(nextList);
    localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(nextList));
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "ran-lung-get-mock-ingredients",
        newValue: JSON.stringify(nextList),
      })
    );
    try {
      window.dispatchEvent(new CustomEvent("ran-lung-get-stock-updated", { detail: nextList }));
    } catch {}
    setEditingId(null);

    try {
      await updateIngredientStock(id, q, editName.trim(), editUnit, t);
      await fetchIngredients();
    } catch (err) {
      console.error("Supabase edit update failed:", err);
      alert("บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่");
      await fetchIngredients();
    }
  };

  const handleRemoveIngredient = async (id: string, name: string) => {
    if (!confirm(`คุณต้องการลบวัตถุดิบ "${name}" ใช่หรือไม่?`)) return;
    const nextList = ingredients.filter((i) => i.id !== id);
    setIngredients(nextList);
    localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(nextList));
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "ran-lung-get-mock-ingredients",
        newValue: JSON.stringify(nextList),
      })
    );
    try {
      window.dispatchEvent(new CustomEvent("ran-lung-get-stock-updated", { detail: nextList }));
    } catch {}
    try {
      await deleteIngredient(id);
    } catch {
      console.warn("Supabase delete failed.");
    }
  };

  const formatUnitAndQty = (qty: number, unit: string) => {
    if (unit === "g" && qty >= 1000) {
      return `${Number((qty / 1000).toFixed(2))} kg`;
    }
    return `${qty} ${unit}`;
  };

  const groupedIngredients = useMemo(() => {
    const meat = ingredients.filter(
      (i) => i.name.includes("หมู") || i.name.includes("ไก่") || i.name === "เนื้อ",
    );
    const seafood = ingredients.filter(
      (i) => i.name.includes("หมึก") || i.name.includes("กุ้ง") || i.name.includes("หอย"),
    );
    const toppings = ingredients.filter(
      (i) => i.name.includes("ไข่") || i.name.includes("ไส้กรอก") || i.name.includes("กุนเชียง"),
    );
    const others = ingredients.filter(
      (i) =>
        !meat.some((m) => m.id === i.id) &&
        !seafood.some((s) => s.id === i.id) &&
        !toppings.some((t) => t.id === i.id),
    );
    return { meat, seafood, toppings, others };
  }, [ingredients]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-sans">
        <div className="text-center space-y-3">
          <div className="h-10 w-10 border-4 border-[#002e47] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-bold text-gray-500">{t("กำลังตรวจสอบสิทธิ์ผู้ดูแลระบบ...")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8f2] text-gray-900 flex flex-col md:flex-row font-sans">
      {/* Mobile Sidebar Header */}
      <header className="md:hidden bg-[#002e47] text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={t("เปิดเมนูนำทาง")}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition cursor-pointer"
          >
            <Menu size={20} />
          </button>
          <span className="font-black text-sm tracking-wide">{t("ระบบจัดการหลังบ้าน")} (Admin)</span>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
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
              transition={{ type: "tween", duration: 0.2 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-[#002e47] text-white z-50 flex flex-col p-5 shadow-2xl"
            >
              <AdminSidebarContent
                view={view}
                setView={setView}
                setSidebarOpen={setSidebarOpen}
                handleLogout={handleLogout}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col w-72 h-screen shrink-0 bg-[#002e47] text-white border-r border-[#ece4d6] shadow-md z-20">
        <AdminSidebarContent
          view={view}
          setView={setView}
          handleLogout={handleLogout}
        />
      </aside>

      {/* Main content view area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0 bg-[#fff8f2]">
        {/* Desktop Header */}
        <header className="hidden md:block bg-white border-b border-[#ece4d6] p-5 sticky top-0 z-10 shadow-xs shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#002e47] text-white shadow-md">
                {view === "dashboard" ? (
                  <LayoutDashboard size={18} className="text-[#fcc14a]" />
                ) : (
                  <Users size={18} className="text-[#fcc14a]" />
                )}
              </div>
              <div>
                <h1 className="text-lg font-black text-[#002e47] tracking-tight">
                  {view === "dashboard"
                    ? t("ภาพรวม")
                    : view === "approvals"
                      ? t("คำขออนุมัติสิทธิ์")
                      : t("จัดการพนักงาน")}
                </h1>
                <p className="text-xs text-slate-500 font-semibold">
                  {view === "dashboard"
                    ? t("วิเคราะห์ยอดขายสะสม ยอดสั่งซื้อ และรายรับทั้งหมดของร้าน")
                    : view === "approvals"
                      ? t("อนุมัติหรือปฏิเสธคำขอสิทธิ์การใช้งานจากพนักงาน")
                      : t("จัดการและเปลี่ยนบทบาทสิทธิ์ (Admin / Staff / Customer) ในระบบ")}
                </p>
              </div>
            </div>

            <a
              href="/customer"
              className="flex items-center gap-1.5 text-xs font-bold text-[#002e47] bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl px-3.5 py-2 transition"
            >
              <ArrowLeft size={14} />
              <span>{t("สั่งอาหาร (หน้าลูกค้า)")}</span>
            </a>
          </div>
        </header>

        {/* Dynamic Inner Panel View */}
        <div className="p-4 sm:p-6 flex-1 max-w-6xl w-full mx-auto">
          {view === "dashboard" && (
            <AdminDashboardView
              orders={orders}
              loading={loadingOrders}
              onOpenResetModal={() => setResetModalOpen(true)}
            />
          )}
          {view === "inventory" && (
            <AdminInventoryView
              ingredients={ingredients}
              loading={loadingIngredients}
              activeSubView={activeSubView}
              setActiveSubView={setActiveSubView}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              showAddForm={showAddForm}
              setShowAddForm={setShowAddForm}
              outOfStockIds={outOfStockIds}
              toggleStock={toggleStock}
              adjustIngredientQty={adjustIngredientQty}
              handleAddIngredientSubmit={handleAddIngredientSubmit}
              newIngName={newIngName}
              setNewIngName={setNewIngName}
              newIngQty={newIngQty}
              setNewIngQty={setNewIngQty}
              newIngUnit={newIngUnit}
              setNewIngUnit={setNewIngUnit}
              newIngThreshold={newIngThreshold}
              setNewIngThreshold={setNewIngThreshold}
              editingId={editingId}
              setEditingId={setEditingId}
              editName={editName}
              setEditName={setEditName}
              editQty={editQty}
              setEditQty={setEditQty}
              editUnit={editUnit}
              setEditUnit={setEditUnit}
              editThreshold={editThreshold}
              menuItems={menuItems}
              loadingMenuItems={loadingMenuItems}
              setEditThreshold={setEditThreshold}
              saveIngredientEdit={saveIngredientEdit}
              handleRemoveIngredient={handleRemoveIngredient}
              formatUnitAndQty={formatUnitAndQty}
              groupedIngredients={groupedIngredients}
              setIngredients={setIngredients}
            />
          )}
          {(view === "staff" || view === "approvals") && (
            <AdminStaffView
              users={users}
              loading={loadingUsers}
              updateUserRole={updateUserRole}
              toggleUserActiveStatus={toggleUserActiveStatus}
              deleteUser={deleteUser}
              isApprovalsTab={view === "approvals"}
            />
          )}
        </div>
      </main>

      {/* Safety Confirmation Modal for Order Reset */}
      <AdminResetModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onSuccess={() => {
          setOrders([]);
          fetchSupabaseOrders();
        }}
      />
    </div>
  );
}
import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-BbREKNGv.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { $ as DollarSign, A as Pen, B as LayoutDashboard, I as Menu, R as LogOut, S as ShieldCheck, Y as Flame, a as Users, at as CirclePlus, c as UserPlus, f as TrendingUp, gt as ArrowLeft, l as UserCheck, p as Trash2, rt as ClipboardList, s as UserX, ut as ChefHat, w as Search, x as Shield } from "../_libs/lucide-react.mjs";
import { t as MENU } from "./customer-CXoL6D-b.mjs";
import { i as getIngredients, o as updateIngredientStock, r as deleteIngredient, t as addIngredient } from "./supabase.service-B-38Jtjp.mjs";
import { a as CartesianGrid, i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DYaSXrCu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminDashboard() {
	const navigate = useNavigate();
	const [view, setView] = (0, import_react.useState)("dashboard");
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [soundEnabled] = (0, import_react.useState)(true);
	const [checkingAuth, setCheckingAuth] = (0, import_react.useState)(true);
	const [adminUser, setAdminUser] = (0, import_react.useState)(null);
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [loadingOrders, setLoadingOrders] = (0, import_react.useState)(false);
	const [ingredients, setIngredients] = (0, import_react.useState)([]);
	const [loadingIngredients, setLoadingIngredients] = (0, import_react.useState)(false);
	const [menuItems, setMenuItems] = (0, import_react.useState)([]);
	const [loadingMenuItems, setLoadingMenuItems] = (0, import_react.useState)(false);
	const [activeSubView, setActiveSubView] = (0, import_react.useState)("menu");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("all");
	const [showAddForm, setShowAddForm] = (0, import_react.useState)(false);
	const [outOfStockIds, setOutOfStockIds] = (0, import_react.useState)([]);
	const [newIngName, setNewIngName] = (0, import_react.useState)("");
	const [newIngQty, setNewIngQty] = (0, import_react.useState)("");
	const [newIngUnit, setNewIngUnit] = (0, import_react.useState)("g");
	const [newIngThreshold, setNewIngThreshold] = (0, import_react.useState)("");
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [editName, setEditName] = (0, import_react.useState)("");
	const [editQty, setEditQty] = (0, import_react.useState)("");
	const [editUnit, setEditUnit] = (0, import_react.useState)("g");
	const [editThreshold, setEditThreshold] = (0, import_react.useState)("");
	const [users, setUsers] = (0, import_react.useState)([]);
	const [loadingUsers, setLoadingUsers] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		async function checkAuth() {
			try {
				const { data: { session } } = await supabase.auth.getSession();
				if (!session) {
					window.location.href = "/login";
					return;
				}
				const { data, error } = await supabase.from("users").select("*").eq("auth_user_id", session.user.id).maybeSingle();
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
	const fetchSupabaseOrders = async () => {
		setLoadingOrders(true);
		try {
			const { data: dbOrders, error } = await supabase.from("orders").select(`
          *,
          customers (
            display_name
          ),
          order_items (*)
        `).order("created_at", { ascending: false });
			if (!error && dbOrders) setOrders(dbOrders.map((o) => {
				let localStatus = "รอดำเนินการ";
				if (o.status === "pending") localStatus = "รอดำเนินการ";
				else if (o.status === "preparing") localStatus = "กำลังทำ";
				else if (o.status === "delivering") localStatus = "พร้อมเสิร์ฟ";
				else if (o.status === "completed") localStatus = "สำเร็จ";
				else if (o.status === "cancelled") localStatus = "ยกเลิก";
				return {
					id: o.id,
					orderNumber: o.order_number,
					date: new Date(o.created_at).toLocaleDateString("th-TH", {
						day: "numeric",
						month: "short",
						year: "numeric"
					}) + " · " + new Date(o.created_at).toLocaleTimeString("th-TH", {
						hour: "2-digit",
						minute: "2-digit"
					}),
					items: (o.order_items || []).map((item) => ({
						name: item.name,
						qty: item.quantity,
						price: Number(item.unit_price)
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
					created_at: o.created_at
				};
			}));
		} catch (e) {
			console.error("Failed to load orders:", e);
		} finally {
			setLoadingOrders(false);
		}
	};
	const fetchIngredients = async () => {
		setLoadingIngredients(true);
		try {
			setIngredients(await getIngredients() ?? []);
		} catch (err) {
			console.error("Load stock error:", err);
		} finally {
			setLoadingIngredients(false);
		}
	};
	const fetchMenuItems = async () => {
		setLoadingMenuItems(true);
		try {
			const { data, error } = await supabase.from("menu_items").select("*").order("sort_order", { ascending: true });
			if (!error && data) setMenuItems(data.map((item) => ({
				id: item.id,
				name: item.name,
				desc: item.description || "",
				price: Number(item.price),
				image: item.image_url || item.image || "",
				category: item.category || "signature",
				isAvailable: item.is_available ?? true,
				isSpicy: item.is_spicy ?? false,
				options: item.options || void 0,
				addons: item.addons || void 0
			})));
			else setMenuItems([]);
		} catch (err) {
			console.error("Load menu items error:", err);
			setMenuItems([]);
		} finally {
			setLoadingMenuItems(false);
		}
	};
	const fetchUsers = async () => {
		setLoadingUsers(true);
		try {
			const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false });
			if (!error && data) setUsers(data);
			else setUsers([
				{
					id: "u-1",
					display_name: "แอดมินลุงเกตุ",
					email: "admin@lungget.com",
					role: "admin",
					is_active: true,
					picture_url: null
				},
				{
					id: "u-2",
					display_name: "สมศรี แม่ครัว",
					email: "cook@lungget.com",
					role: "staff",
					is_active: true,
					picture_url: null
				},
				{
					id: "u-3",
					display_name: "นายสมชาย (ลูกค้า)",
					email: "somchai@gmail.com",
					role: "customer",
					is_active: true,
					picture_url: null
				}
			]);
		} catch (e) {
			console.error("Load users failed:", e);
		} finally {
			setLoadingUsers(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (checkingAuth) return;
		if (view === "dashboard") fetchSupabaseOrders();
		else if (view === "inventory") {
			fetchIngredients();
			fetchMenuItems();
			const savedOutOfStock = localStorage.getItem("ran-lung-get-out-of-stock-items");
			if (savedOutOfStock) try {
				setOutOfStockIds(JSON.parse(savedOutOfStock));
			} catch {}
		} else if (view === "staff" || view === "approvals") fetchUsers();
	}, [view, checkingAuth]);
	(0, import_react.useEffect)(() => {
		fetchUsers();
		const channel = supabase.channel("admin-users-changes").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "users"
		}, () => {
			fetchUsers();
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, []);
	const handleLogout = async () => {
		await supabase.auth.signOut();
		navigate({ to: "/login" });
	};
	const updateUserRole = async (userId, newRole) => {
		setUsers((prev) => prev.map((u) => u.id === userId ? {
			...u,
			role: newRole
		} : u));
		try {
			const { error } = await supabase.from("users").update({ role: newRole }).eq("id", userId);
			if (error) throw error;
		} catch (err) {
			console.warn("Supabase role update failed, keeping optimistic local edit:", err);
		}
	};
	const toggleUserActiveStatus = async (userId, currentStatus) => {
		const nextStatus = !currentStatus;
		setUsers((prev) => prev.map((u) => u.id === userId ? {
			...u,
			is_active: nextStatus
		} : u));
		try {
			const { error } = await supabase.from("users").update({ is_active: nextStatus }).eq("id", userId);
			if (error) throw error;
		} catch (err) {
			console.warn("Supabase active toggle failed:", err);
		}
	};
	const deleteUser = async (userId, displayName) => {
		if (!confirm(`คุณต้องการลบผู้ใช้งาน "${displayName}" ใช่หรือไม่?`)) return;
		const previousUsers = [...users];
		setUsers((prev) => prev.filter((u) => u.id !== userId));
		try {
			const { error } = await supabase.from("users").delete().eq("id", userId);
			if (error) throw error;
		} catch (err) {
			console.error("Supabase user deletion failed, rolling back:", err);
			alert(`ไม่สามารถลบผู้ใช้ได้: ${err?.message || "กรุณาตรวจสอบว่าผู้ใช้นี้มีประวัติคำสั่งซื้ออยู่หรือไม่"}`);
			setUsers(previousUsers);
		}
	};
	const toggleStock = (itemId) => {
		let updated;
		if (outOfStockIds.includes(itemId)) updated = outOfStockIds.filter((id) => id !== itemId);
		else updated = [...outOfStockIds, itemId];
		setOutOfStockIds(updated);
		localStorage.setItem("ran-lung-get-out-of-stock-items", JSON.stringify(updated));
		window.dispatchEvent(new StorageEvent("storage", {
			key: "ran-lung-get-out-of-stock-items",
			newValue: JSON.stringify(updated)
		}));
	};
	const adjustIngredientQty = async (id, amount) => {
		const item = ingredients.find((i) => i.id === id);
		if (!item) return;
		const newQty = Math.max(0, Number(item.quantity) + amount);
		setIngredients((prev) => prev.map((i) => i.id === id ? {
			...i,
			quantity: newQty
		} : i));
		try {
			await updateIngredientStock(id, newQty);
		} catch {
			console.warn("Supabase stock update failed — reverting.");
			setIngredients((prev) => prev.map((i) => i.id === id ? {
				...i,
				quantity: item.quantity
			} : i));
		}
	};
	const handleAddIngredientSubmit = async (e) => {
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
	const saveIngredientEdit = async (id) => {
		const q = parseFloat(editQty);
		const t = parseFloat(editThreshold);
		if (!editName.trim() || isNaN(q) || isNaN(t)) {
			alert("กรุณากรอกข้อมูลให้ครบถ้วน");
			return;
		}
		setIngredients((prev) => prev.map((i) => i.id === id ? {
			...i,
			name: editName.trim(),
			quantity: q,
			unit: editUnit,
			min_threshold: t
		} : i));
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
	const handleRemoveIngredient = async (id, name) => {
		if (!confirm(`คุณต้องการลบวัตถุดิบ "${name}" ใช่หรือไม่?`)) return;
		setIngredients((prev) => prev.filter((i) => i.id !== id));
		try {
			await deleteIngredient(id);
		} catch {
			console.warn("Supabase delete failed.");
		}
	};
	const formatUnitAndQty = (qty, unit) => {
		if (unit === "g" && qty >= 1e3) return `${Number((qty / 1e3).toFixed(2))} kg`;
		return `${qty} ${unit}`;
	};
	const groupedIngredients = (0, import_react.useMemo)(() => {
		const meat = ingredients.filter((i) => i.name.includes("หมู") || i.name.includes("ไก่") || i.name === "เนื้อ");
		const seafood = ingredients.filter((i) => i.name.includes("หมึก") || i.name.includes("กุ้ง") || i.name.includes("หอย"));
		const toppings = ingredients.filter((i) => i.name.includes("ไข่") || i.name.includes("ไส้กรอก") || i.name.includes("กุนเชียง"));
		return {
			meat,
			seafood,
			toppings,
			others: ingredients.filter((i) => !meat.some((m) => m.id === i.id) && !seafood.some((s) => s.id === i.id) && !toppings.some((t) => t.id === i.id))
		};
	}, [ingredients]);
	if (checkingAuth) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-gray-50 flex items-center justify-center font-sans",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-10 w-10 border-4 border-[#002e47] border-t-transparent rounded-full animate-spin mx-auto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-bold text-gray-500",
				children: "กำลังตรวจสอบสิทธิ์ผู้ดูแลระบบ..."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#fff8f2] text-gray-900 flex flex-col md:flex-row font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "md:hidden bg-[#002e47] text-white p-4 flex items-center justify-between shadow-md sticky top-0 z-30",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSidebarOpen(!sidebarOpen),
						className: "p-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-black text-sm tracking-wide",
						children: "หลังบ้านผู้ดูแลระบบ (Admin)"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: handleLogout,
					className: "text-red-300 font-bold text-xs",
					children: "ออก"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				onClick: () => setSidebarOpen(false),
				className: "fixed inset-0 bg-black/60 z-40 md:hidden"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.aside, {
				initial: { x: "-100%" },
				animate: { x: 0 },
				exit: { x: "-100%" },
				transition: {
					type: "tween",
					duration: .2
				},
				className: "fixed top-0 left-0 bottom-0 w-64 bg-[#002e47] text-white z-50 flex flex-col p-5 shadow-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSidebarContent, {
					view,
					setView,
					setSidebarOpen,
					handleLogout,
					pendingCount: users.filter((u) => u.is_active === false).length
				})
			})] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "hidden md:flex flex-col w-72 h-screen shrink-0 bg-[#002e47] text-white border-r border-[#ece4d6] shadow-md z-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminSidebarContent, {
					view,
					setView,
					handleLogout,
					pendingCount: users.filter((u) => u.is_active === false).length
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1 flex flex-col h-screen overflow-y-auto min-w-0 bg-[#fff8f2]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
					className: "hidden md:block bg-white border-b border-[#ece4d6] p-5 sticky top-0 z-10 shadow-sm shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-9 w-9 place-items-center rounded-xl bg-[#002e47] text-white shadow-md",
								children: view === "dashboard" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, {
									size: 18,
									className: "text-[#fcc14a]"
								}) : view === "inventory" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
									size: 18,
									className: "text-[#fcc14a]"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									size: 18,
									className: "text-[#fcc14a]"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-lg font-black text-[#002e47] tracking-tight",
								children: view === "dashboard" ? "รายงานยอดขาย & ประวัติ" : view === "inventory" ? "จัดการคลังสต็อก & เมนู" : view === "approvals" ? "คำขออนุมัติสิทธิ์" : "จัดการระดับพนักงาน"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-500 font-semibold",
								children: view === "dashboard" ? "วิเคราะห์ยอดขายสะสม ยอดสั่งซื้อ และรายรับทั้งหมดของร้าน" : view === "inventory" ? "เปิดปิดเมนูอาหาร ปรับปรุงจำนวนสต็อกวัตถุดิบหน้าร้าน" : view === "approvals" ? "อนุมัติหรือปฏิเสธคำขอสิทธิ์การใช้งานจากพนักงาน" : "จัดการและเปลี่ยนบทบาทสิทธิ์ (Admin / Staff / Customer) ในระบบ"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/customer",
							className: "flex items-center gap-1.5 text-xs font-bold text-[#002e47] bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl px-3.5 py-2 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "สั่งอาหาร (หน้าร้าน)" })]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 sm:p-6 flex-1 max-w-6xl w-full mx-auto",
					children: [
						view === "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminDashboardView, {
							orders,
							loading: loadingOrders
						}),
						view === "inventory" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminInventoryView, {
							ingredients,
							loading: loadingIngredients,
							activeSubView,
							setActiveSubView,
							searchQuery,
							setSearchQuery,
							selectedCategory,
							setSelectedCategory,
							showAddForm,
							setShowAddForm,
							outOfStockIds,
							toggleStock,
							adjustIngredientQty,
							handleAddIngredientSubmit,
							newIngName,
							setNewIngName,
							newIngQty,
							setNewIngQty,
							newIngUnit,
							setNewIngUnit,
							newIngThreshold,
							setNewIngThreshold,
							editingId,
							setEditingId,
							editName,
							setEditName,
							editQty,
							setEditQty,
							editUnit,
							setEditUnit,
							editThreshold,
							menuItems,
							loadingMenuItems,
							setEditThreshold,
							saveIngredientEdit,
							handleRemoveIngredient,
							formatUnitAndQty,
							groupedIngredients,
							setIngredients
						}),
						(view === "staff" || view === "approvals") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminStaffView, {
							users,
							loading: loadingUsers,
							updateUserRole,
							toggleUserActiveStatus,
							deleteUser,
							isApprovalsTab: view === "approvals"
						})
					]
				})]
			})
		]
	});
}
function AdminSidebarContent({ view, setView, setSidebarOpen, handleLogout, pendingCount = 0 }) {
	const selectTab = (v) => {
		setView(v);
		if (setSidebarOpen) setSidebarOpen(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full bg-[#002e47] text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-5 border-b border-white/10 flex items-center justify-between shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#fcc14a] border border-white/15",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
							size: 22,
							className: "stroke-[2.5]"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-black text-sm tracking-tight text-white uppercase",
						children: "แผงผู้ดูแลระบบ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[9px] font-bold text-[#fcc14a] tracking-wider uppercase",
						children: "ADMIN PANEL"
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto p-4 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold text-white/40 uppercase tracking-widest block px-2 mb-2",
						children: "เมนูเจ้าของร้าน"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => selectTab("dashboard"),
						className: `w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "dashboard" ? "bg-white/10 text-white font-black border-l-4 border-[#fcc14a]" : "text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, {
							size: 18,
							className: view === "dashboard" ? "text-[#fcc14a]" : "text-white/60"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "แดชบอร์ดรายได้"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => selectTab("inventory"),
						className: `w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "inventory" ? "bg-white/10 text-white font-black border-l-4 border-[#fcc14a]" : "text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
							size: 18,
							className: view === "inventory" ? "text-[#fcc14a]" : "text-white/60"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "จัดการคลัง & สต็อก"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => selectTab("staff"),
						className: `w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "staff" ? "bg-white/10 text-white font-black border-l-4 border-[#fcc14a]" : "text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
							size: 18,
							className: view === "staff" ? "text-[#fcc14a]" : "text-white/60"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm",
							children: "จัดการสิทธิ์พนักงาน"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => selectTab("approvals"),
						className: `w-full flex items-center justify-between px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "approvals" ? "bg-white/10 text-white font-black border-l-4 border-[#fcc14a]" : "text-white/70 hover:text-white hover:bg-white/5 border-l-4 border-transparent"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, {
								size: 18,
								className: view === "approvals" ? "text-[#fcc14a]" : "text-white/60"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "คำขออนุมัติสิทธิ์"
							})]
						}), pendingCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full",
							children: pendingCount
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 border-t border-white/10 bg-white/2 shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleLogout,
					className: "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left text-red-300 hover:text-red-200 hover:bg-white/5 transition duration-200 cursor-pointer text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ออกจากระบบ" })]
				})
			})
		]
	});
}
function AdminDashboardView({ orders, loading }) {
	const [timeRange, setTimeRange] = (0, import_react.useState)("all");
	const filteredOrders = (0, import_react.useMemo)(() => {
		const now = /* @__PURE__ */ new Date();
		return orders.filter((o) => {
			if (!o.created_at) return true;
			const orderDate = new Date(o.created_at);
			const diffDays = (now.getTime() - orderDate.getTime()) / (1e3 * 60 * 60 * 24);
			if (timeRange === "today") return orderDate.toDateString() === now.toDateString();
			if (timeRange === "7days") return diffDays <= 7;
			if (timeRange === "30days") return diffDays <= 30;
			return true;
		});
	}, [orders, timeRange]);
	const stats = (0, import_react.useMemo)(() => {
		const totalOrders = filteredOrders.length;
		const totalRev = filteredOrders.reduce((sum, o) => sum + o.total, 0);
		const avgBill = totalOrders > 0 ? Math.round(totalRev / totalOrders) : 0;
		const uniqueCustomers = new Set(filteredOrders.map((o) => o.customerName || o.id)).size;
		const itemsCount = {};
		filteredOrders.forEach((o) => {
			o.items?.forEach((item) => {
				const cleanName = item.name.split(" (")[0];
				itemsCount[cleanName] = (itemsCount[cleanName] || 0) + item.qty;
			});
		});
		return {
			totalOrders,
			totalRev,
			avgBill,
			uniqueCustomers,
			sortedProducts: Object.entries(itemsCount).map(([name, count]) => ({
				name,
				count
			})).sort((a, b) => b.count - a.count)
		};
	}, [filteredOrders]);
	const chartData = (0, import_react.useMemo)(() => {
		const dataMap = {};
		const now = /* @__PURE__ */ new Date();
		if (timeRange === "today") {
			for (let i = 8; i <= 21; i++) {
				const hourStr = `${String(i).padStart(2, "0")}:00`;
				dataMap[hourStr] = 0;
			}
			filteredOrders.forEach((o) => {
				if (!o.created_at) return;
				const d = new Date(o.created_at);
				const hourStr = `${String(d.getHours()).padStart(2, "0")}:00`;
				if (dataMap[hourStr] !== void 0) dataMap[hourStr] = (dataMap[hourStr] || 0) + o.total;
			});
		} else if (timeRange === "7days") {
			for (let i = 6; i >= 0; i--) {
				const d = /* @__PURE__ */ new Date();
				d.setDate(now.getDate() - i);
				const dateStr = d.toLocaleDateString("th-TH", {
					day: "numeric",
					month: "short"
				});
				dataMap[dateStr] = 0;
			}
			filteredOrders.forEach((o) => {
				if (!o.created_at) return;
				const dateStr = new Date(o.created_at).toLocaleDateString("th-TH", {
					day: "numeric",
					month: "short"
				});
				if (dataMap[dateStr] !== void 0) dataMap[dateStr] = (dataMap[dateStr] || 0) + o.total;
			});
		} else if (timeRange === "30days") {
			for (let i = 29; i >= 0; i--) {
				const d = /* @__PURE__ */ new Date();
				d.setDate(now.getDate() - i);
				const dateStr = d.toLocaleDateString("th-TH", {
					day: "numeric",
					month: "short"
				});
				dataMap[dateStr] = 0;
			}
			filteredOrders.forEach((o) => {
				if (!o.created_at) return;
				const dateStr = new Date(o.created_at).toLocaleDateString("th-TH", {
					day: "numeric",
					month: "short"
				});
				if (dataMap[dateStr] !== void 0) dataMap[dateStr] = (dataMap[dateStr] || 0) + o.total;
			});
		} else filteredOrders.slice().reverse().forEach((o) => {
			if (!o.created_at) return;
			const dateStr = new Date(o.created_at).toLocaleDateString("th-TH", {
				day: "numeric",
				month: "short"
			});
			dataMap[dateStr] = (dataMap[dateStr] || 0) + o.total;
		});
		return Object.entries(dataMap).map(([name, value]) => ({
			name,
			value
		}));
	}, [filteredOrders, timeRange]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-20 font-bold text-gray-500",
		children: "กำลังดาวน์โหลดข้อมูลการขาย..."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row sm:items-center justify-between bg-white border border-[#ece4d6] p-3.5 rounded-[22px] gap-3 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-black text-[#002e47]",
					children: "📅 เลือกช่วงเวลาสรุปข้อมูลแดชบอร์ด:"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1",
					children: [
						{
							id: "all",
							label: "ทั้งหมด"
						},
						{
							id: "today",
							label: "วันนี้"
						},
						{
							id: "7days",
							label: "7 วันล่าสุด"
						},
						{
							id: "30days",
							label: "30 วันล่าสุด (1 เดือน)"
						}
					].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setTimeRange(opt.id),
						className: `px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${timeRange === opt.id ? "bg-[#002e47] text-white shadow-sm" : "bg-slate-50 text-[#5a6e7a] hover:text-[#002e47] hover:bg-slate-100"}`,
						children: opt.label
					}, opt.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-[#ece4d6] rounded-[28px] p-5 shadow-sm flex flex-col justify-between min-h-[120px] transition hover:shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-3xl font-black text-[#002e47] tracking-tight",
								children: stats.totalOrders
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2.5 rounded-2xl bg-orange-50 text-orange-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
									size: 22,
									className: "stroke-[2.5]"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-black text-slate-400 mt-4",
							children: "ยอดสั่งซื้อสะสม (ออเดอร์)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-[#ece4d6] rounded-[28px] p-5 shadow-sm flex flex-col justify-between min-h-[120px] transition hover:shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-3xl font-black text-[#002e47] tracking-tight",
								children: ["฿", new Intl.NumberFormat("th-TH").format(stats.totalRev)]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2.5 rounded-2xl bg-emerald-50 text-emerald-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
									size: 22,
									className: "stroke-[2.5]"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-black text-slate-400 mt-4",
							children: "รายได้สะสมทั้งหมด (บาท)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-[#ece4d6] rounded-[28px] p-5 shadow-sm flex flex-col justify-between min-h-[120px] transition hover:shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-3xl font-black text-[#002e47] tracking-tight",
								children: stats.uniqueCustomers
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2.5 rounded-2xl bg-blue-50 text-blue-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
									size: 22,
									className: "stroke-[2.5]"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-black text-slate-400 mt-4",
							children: "ลูกค้าสะสมทั้งหมด (คน)"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-[#ece4d6] rounded-[28px] p-5 shadow-sm flex flex-col justify-between min-h-[120px] transition hover:shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-black text-[#002e47] tracking-tight line-clamp-2 max-w-[80%] leading-tight pt-1",
								children: stats.sortedProducts[0]?.name || "ไม่มีข้อมูล"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2.5 rounded-2xl bg-amber-50 text-amber-500 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
									size: 22,
									className: "stroke-[2.5]"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-black text-slate-400 mt-4",
							children: "เมนูยอดนิยมอันดับ 1"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-[#ece4d6] rounded-[28px] p-5 shadow-sm flex flex-col justify-between min-h-[120px] transition hover:shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-3xl font-black text-[#002e47] tracking-tight",
								children: ["฿", stats.avgBill]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2.5 rounded-2xl bg-purple-50 text-purple-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
									size: 22,
									className: "stroke-[2.5]"
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-black text-slate-400 mt-4",
							children: "ยอดเฉลี่ยต่อบิล (บาท)"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white border border-[#ece4d6] rounded-[28px] p-5 shadow-sm flex flex-col",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-black text-sm text-[#002e47] flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
										size: 16,
										className: "text-emerald-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "กราฟแนวโน้มรายได้การขาย" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg font-bold",
									children: ["รวมรายได้: ฿", new Intl.NumberFormat("th-TH").format(stats.totalRev)]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: 260,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
										data: chartData,
										margin: {
											top: 10,
											right: 10,
											left: -20,
											bottom: 0
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
												id: "colorValue",
												x1: "0",
												y1: "0",
												x2: "0",
												y2: "1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "5%",
													stopColor: "#002e47",
													stopOpacity: .15
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
													offset: "95%",
													stopColor: "#002e47",
													stopOpacity: 0
												})]
											}) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												strokeDasharray: "3 3",
												vertical: false,
												stroke: "#f1ebe4"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "name",
												stroke: "#5a6e7a",
												fontSize: 10,
												tickLine: false,
												axisLine: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												stroke: "#5a6e7a",
												fontSize: 10,
												tickLine: false,
												axisLine: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
												contentStyle: {
													background: "#fff",
													border: "1px solid #ece4d6",
													borderRadius: "16px",
													fontSize: "11px",
													fontFamily: "sans-serif",
													boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
												},
												formatter: (value) => [`฿${new Intl.NumberFormat("th-TH").format(Number(value))}`, "ยอดขาย"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
												type: "monotone",
												dataKey: "value",
												stroke: "#002e47",
												strokeWidth: 2.5,
												fillOpacity: 1,
												fill: "url(#colorValue)"
											})
										]
									})
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white border border-[#ece4d6] rounded-[28px] p-5 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-black text-sm text-[#002e47] mb-4",
								children: "🧾 5 ออเดอร์ล่าสุด"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left text-xs font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b border-slate-100 text-slate-400 font-black uppercase text-[10px] tracking-wider",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2.5 pb-3",
												children: "ออเดอร์"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2.5 pb-3",
												children: "เวลา"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2.5 pb-3",
												children: "ประเภท"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2.5 pb-3 text-right",
												children: "ยอดรวม"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-slate-100 text-slate-700",
										children: filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: 4,
											className: "py-8 text-center text-slate-400 italic",
											children: "ไม่มีข้อมูลออเดอร์ในช่วงเวลานี้"
										}) }) : filteredOrders.slice(0, 5).map((o) => {
											const isDineIn = o.orderType === "dine-in";
											const isTakeaway = o.orderType === "takeaway";
											let badgeLabel = "เดลิเวอรี่";
											let badgeColor = "bg-blue-50 text-blue-800 border-blue-100";
											if (isDineIn) {
												badgeLabel = o.tableNumber ? `โต๊ะ ${o.tableNumber}` : "ทานที่ร้าน";
												badgeColor = "bg-amber-50 text-amber-800 border-amber-100";
											} else if (isTakeaway) {
												badgeLabel = "กลับบ้าน";
												badgeColor = "bg-emerald-50 text-emerald-800 border-emerald-100";
											}
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "hover:bg-slate-50/40 transition",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3.5 font-black text-[#002e47]",
														children: o.orderNumber
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3.5 text-slate-400",
														children: o.date.includes(" · ") ? o.date.split(" · ")[1] : o.date
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3.5",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: `px-2 py-0.5 rounded-lg text-[9px] font-black border ${badgeColor}`,
															children: badgeLabel
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
														className: "py-3.5 text-right font-black text-[#002e47]",
														children: ["฿", o.total]
													})
												]
											}, o.id);
										})
									})]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white border border-[#ece4d6] rounded-[28px] p-5 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-black text-sm text-[#002e47] mb-4",
								children: "👥 5 รายชื่อลูกค้าล่าสุด"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left text-xs font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "border-b border-slate-100 text-slate-400 font-black uppercase text-[10px] tracking-wider",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2.5 pb-3",
												children: "ชื่อลูกค้า"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2.5 pb-3",
												children: "ช่องทาง/โต๊ะ"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "py-2.5 pb-3 text-right",
												children: "เวลาเข้าใช้งาน"
											})
										]
									}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-slate-100 text-slate-700",
										children: filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											colSpan: 3,
											className: "py-8 text-center text-slate-400 italic",
											children: "ไม่มีรายชื่อลูกค้าใหม่"
										}) }) : filteredOrders.slice(0, 5).map((o, idx) => {
											const isDineIn = o.orderType === "dine-in";
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "hover:bg-slate-50/40 transition",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3.5 font-black text-[#002e47]",
														children: o.customerName || "คุณลูกค้า"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3.5 text-slate-500 font-bold",
														children: isDineIn ? `ทานที่ร้าน (โต๊ะ ${o.tableNumber || "-"})` : o.orderType === "takeaway" ? "กลับบ้าน (Takeaway)" : "จัดส่ง (Delivery)"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
														className: "py-3.5 text-right text-slate-400",
														children: o.date.includes(" · ") ? o.date.split(" · ")[1] : o.date
													})
												]
											}, idx);
										})
									})]
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:col-span-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white border border-[#ece4d6] rounded-[28px] p-5 shadow-sm flex flex-col h-full",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-black text-sm text-[#002e47] mb-4 flex items-center gap-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📊 5 อันดับเมนูขายดีที่สุด" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-6 flex-1",
							children: stats.sortedProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-400 italic py-16 text-center",
								children: "ไม่มีข้อมูลยอดขายเมนู"
							}) : stats.sortedProducts.slice(0, 5).map((p, idx) => {
								const maxCount = stats.sortedProducts[0]?.count || 1;
								const ratio = Math.max(8, Math.round(p.count / maxCount * 100));
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-xs font-black text-[#002e47]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "w-5 h-5 rounded-full bg-amber-400 text-white flex items-center justify-center font-black text-[10px]",
												children: idx + 1
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate max-w-[140px]",
												children: p.name
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-[#002e47]",
											children: [p.count, " จาน"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full bg-slate-100 h-2.5 rounded-full overflow-hidden",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-[#002e47] h-full rounded-full transition-all duration-500",
											style: { width: `${ratio}%` }
										})
									})]
								}, idx);
							})
						})]
					})
				})]
			})
		]
	});
}
function AdminInventoryView({ ingredients, loading, menuItems, loadingMenuItems, activeSubView, setActiveSubView, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, showAddForm, setShowAddForm, outOfStockIds, toggleStock, adjustIngredientQty, handleAddIngredientSubmit, newIngName, setNewIngName, newIngQty, setNewIngQty, newIngUnit, setNewIngUnit, newIngThreshold, setNewIngThreshold, editingId, setEditingId, editName, setEditName, editQty, setEditQty, editUnit, setEditUnit, editThreshold, setEditThreshold, saveIngredientEdit, handleRemoveIngredient, formatUnitAndQty, groupedIngredients, setIngredients }) {
	const handleSeedDefaultData = async () => {
		if (!confirm("คุณต้องการนำเข้าวัตถุดิบตั้งต้นสำหรับสาขาหรือไม่?")) return;
		const defaults = [
			{
				name: "หมูสับ",
				quantity: 1e3,
				unit: "g",
				min_threshold: 200
			},
			{
				name: "หมูกรอบ",
				quantity: 1e3,
				unit: "g",
				min_threshold: 200
			},
			{
				name: "หมูชิ้น",
				quantity: 1e3,
				unit: "g",
				min_threshold: 200
			},
			{
				name: "ไก่สับ",
				quantity: 1e3,
				unit: "g",
				min_threshold: 200
			},
			{
				name: "ไก่ต้ม",
				quantity: 1e3,
				unit: "g",
				min_threshold: 200
			},
			{
				name: "เนื้อ",
				quantity: 1e3,
				unit: "g",
				min_threshold: 200
			},
			{
				name: "หมึก",
				quantity: 1e3,
				unit: "g",
				min_threshold: 200
			},
			{
				name: "กุ้ง",
				quantity: 1e3,
				unit: "g",
				min_threshold: 200
			},
			{
				name: "หอยลาย",
				quantity: 1e3,
				unit: "g",
				min_threshold: 200
			},
			{
				name: "ไข่ไก่",
				quantity: 100,
				unit: "pcs",
				min_threshold: 15
			},
			{
				name: "ไส้กรอก",
				quantity: 50,
				unit: "pcs",
				min_threshold: 10
			},
			{
				name: "กุนเชียง",
				quantity: 50,
				unit: "pcs",
				min_threshold: 10
			}
		];
		try {
			const { error } = await supabase.from("ingredients").insert(defaults);
			if (!error) {
				const fresh = await getIngredients();
				if (fresh) setIngredients(fresh);
			}
		} catch {
			setIngredients(defaults.map((d, idx) => ({
				...d,
				id: `mock-${idx}`
			})));
			localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(defaults));
		}
	};
	const toggleIngredientActive = async (id, current) => {
		const nextVal = !current;
		setIngredients((prev) => prev.map((i) => i.id === id ? {
			...i,
			is_active: nextVal
		} : i));
		try {
			await supabase.from("ingredients").update({ is_active: nextVal }).eq("id", id);
		} catch {}
	};
	const categories = [
		{
			id: "all",
			label: "ทั้งหมด"
		},
		{
			id: "signature",
			label: "Signature"
		},
		{
			id: "main",
			label: "อาหารจานเดียว"
		},
		{
			id: "noodles",
			label: "เส้น"
		},
		{
			id: "rice",
			label: "ข้าวผัด"
		},
		{
			id: "vegetarian",
			label: "มังสวิรัติ"
		},
		{
			id: "drinks",
			label: "เครื่องดื่ม"
		},
		{
			id: "dessert",
			label: "ของหวาน"
		}
	];
	const filteredMenuItems = (0, import_react.useMemo)(() => {
		return (menuItems.length > 0 ? menuItems : MENU).filter((item) => {
			const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}, [
		menuItems,
		searchQuery,
		selectedCategory
	]);
	const renderRow = (item) => {
		const isLowStock = Number(item.quantity) <= Number(item.min_threshold);
		const isEditing = editingId === item.id;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
			className: `hover:bg-slate-50/70 border-b border-slate-100 ${isLowStock ? "bg-red-50/10" : ""}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "py-3 px-4 font-bold text-[#002e47]",
					children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						value: editName,
						onChange: (e) => setEditName(e.target.value),
						className: "bg-slate-50 border border-slate-300 rounded px-2 py-1 font-bold text-xs"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.name }), isLowStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bg-red-100 text-red-800 text-[8px] font-extrabold uppercase px-1 rounded",
							children: "เหลือน้อย"
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "py-3 px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => toggleIngredientActive(item.id, item.is_active !== false),
						className: `px-2 py-0.5 rounded text-[10px] font-black tracking-wider ${item.is_active !== false ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-slate-100 text-slate-400 border border-slate-200"}`,
						children: item.is_active !== false ? "🟢 เปิดใช้งาน" : "⚪ ปิดใช้งาน"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "py-3 px-4 font-extrabold",
					children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: editQty,
							onChange: (e) => setEditQty(e.target.value),
							className: "bg-slate-50 border border-slate-300 rounded w-16 px-2 py-1 font-bold text-xs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: editUnit,
							onChange: (e) => setEditUnit(e.target.value),
							className: "bg-slate-50 border border-slate-300 rounded px-1 py-1 font-bold text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "g",
									children: "g"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "pcs",
									children: "pcs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ml",
									children: "ml"
								})
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: isLowStock ? "text-red-600 font-black" : "text-[#002e47]",
						children: formatUnitAndQty(Number(item.quantity), item.unit)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "py-3 px-4 text-slate-500 font-semibold",
					children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "number",
						value: editThreshold,
						onChange: (e) => setEditThreshold(e.target.value),
						className: "bg-slate-50 border border-slate-300 rounded w-16 px-2 py-1 font-bold text-xs"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatUnitAndQty(Number(item.min_threshold), item.unit) })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "py-3 px-4 text-right space-x-1.5",
					children: isEditing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => saveIngredientEdit(item.id),
							className: "px-2 py-1 rounded bg-emerald-600 text-white font-bold text-[10px]",
							children: "บันทึก"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setEditingId(null),
							className: "px-2 py-1 rounded bg-slate-200 text-[#5a6e7a] font-bold text-[10px]",
							children: "ยกเลิก"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex gap-1 items-center justify-end",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => adjustIngredientQty(item.id, 500),
								className: "bg-slate-100 hover:bg-slate-200 text-[#002e47] border px-1.5 py-0.5 rounded text-[10px] font-black",
								title: "เติมสต็อก +500g",
								children: "+500"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setEditingId(item.id);
									setEditName(item.name);
									setEditQty(item.quantity.toString());
									setEditUnit(item.unit);
									setEditThreshold(item.min_threshold.toString());
								},
								className: "p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-[#002e47]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { size: 12 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleRemoveIngredient(item.id, item.name),
								className: "p-1 hover:bg-red-50 rounded text-slate-400 hover:text-red-600",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 })
							})
						]
					})
				})
			]
		}, item.id);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white border border-[#ece4d6] rounded-3xl p-5 shadow-sm space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-black text-[#002e47]",
							children: "จัดการคลังร้านค้า:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: activeSubView,
							onChange: (e) => setActiveSubView(e.target.value),
							className: "bg-white border border-[#ece4d6] rounded-xl px-3 py-1.5 text-sm font-bold text-[#002e47] focus:outline-none shadow-sm cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "menu",
								children: "เปิด-ปิด เมนูอาหารขายหน้าร้าน"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "ingredients",
								children: "จัดการคลังวัตถุดิบ (Ingredients)"
							})]
						})]
					}), activeSubView === "menu" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative max-w-md w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "ค้นหาเมนู...",
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "w-full bg-[#fcfbf9] border border-[#ece4d6] rounded-2xl px-4 py-2.5 text-sm font-bold text-[#002e47] placeholder-[#5a6e7a]/50 focus:outline-none transition shadow-inner"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setShowAddForm(!showAddForm),
						className: "inline-flex items-center gap-2 bg-[#002e47] text-white px-4 py-2.5 rounded-2xl font-bold text-xs tracking-wider transition hover:bg-[#004165] shadow-md cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { size: 15 }), showAddForm ? "ปิดฟอร์ม" : "เพิ่มวัตถุดิบใหม่"]
					})]
				}), activeSubView === "menu" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setSelectedCategory(cat.id),
						className: `px-3 py-1.5 rounded-xl font-bold text-xs tracking-wider transition cursor-pointer ${selectedCategory === cat.id ? "bg-[#002e47] text-white shadow-inner" : "bg-slate-100 text-[#5a6e7a] hover:bg-slate-200"}`,
						children: cat.label
					}, cat.id))
				})]
			}),
			activeSubView === "ingredients" && showAddForm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleAddIngredientSubmit,
				className: "bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-black text-[#002e47]",
						children: "นำวัตถุดิบใหม่เข้าคลังสต็อก"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-1 md:grid-cols-4 gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-bold text-[#5a6e7a] uppercase mb-1.5",
								children: "ชื่อวัตถุดิบ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "เช่น หมูสับ, คะน้า",
								value: newIngName,
								onChange: (e) => setNewIngName(e.target.value),
								className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#002e47]"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-bold text-[#5a6e7a] uppercase mb-1.5",
								children: "จำนวนเริ่มต้น"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								placeholder: "เช่น 1000",
								value: newIngQty,
								onChange: (e) => setNewIngQty(e.target.value),
								className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#002e47]"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-bold text-[#5a6e7a] uppercase mb-1.5",
								children: "หน่วยนับ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: newIngUnit,
								onChange: (e) => setNewIngUnit(e.target.value),
								className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#002e47]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "g",
										children: "กรัม (g)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "pcs",
										children: "ชิ้น/ฟอง (pcs)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "ml",
										children: "มิลลิลิตร (ml)"
									})
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-[11px] font-bold text-[#5a6e7a] uppercase mb-1.5",
								children: "เตือนเมื่อเหลือน้อยกว่า"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								placeholder: "เช่น 200",
								value: newIngThreshold,
								onChange: (e) => setNewIngThreshold(e.target.value),
								className: "w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-[#002e47]"
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2 justify-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowAddForm(false),
							className: "bg-slate-100 text-[#5a6e7a] px-4 py-2 rounded-xl font-bold text-xs cursor-pointer hover:bg-slate-200",
							children: "ยกเลิก"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "bg-[#002e47] text-white px-4 py-2 rounded-xl font-bold text-xs cursor-pointer hover:bg-[#004165]",
							children: "เพิ่มวัตถุดิบ"
						})]
					})
				]
			}),
			activeSubView === "ingredients" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full",
				children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white border border-[#ece4d6] rounded-3xl p-16 text-center text-slate-400 font-bold",
					children: "กำลังโหลดข้อมูลสต็อกวัตถุดิบ..."
				}) : ingredients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white border border-[#ece4d6] rounded-3xl p-12 text-center shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-8 text-center max-w-sm mx-auto space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, {
								size: 32,
								className: "mx-auto text-slate-400"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-black text-[#002e47] text-base",
								children: "ไม่พบวัตถุดิบในฐานข้อมูล"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: handleSeedDefaultData,
								className: "bg-[#002e47] text-white px-5 py-2.5 rounded-2xl font-bold text-xs",
								children: "⚡ นำเข้าวัตถุดิบเริ่มต้น"
							})
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto bg-white border border-[#ece4d6] rounded-3xl p-4 shadow-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left border-collapse text-xs sm:text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-[#ece4d6] text-[#5a6e7a] font-bold",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "ชื่อวัตถุดิบ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "การใช้งาน"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "ปริมาณคงเหลือ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4",
									children: "จุดแจ้งเตือนขั้นต่ำ"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "py-3 px-4 text-right",
									children: "การจัดการ"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", {
							className: "divide-y divide-slate-100 font-semibold text-slate-700",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
									className: "bg-slate-50/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 5,
										className: "py-2 px-4 font-black text-xs text-[#002e47]",
										children: "🥩 เนื้อสัตว์"
									})
								}),
								groupedIngredients.meat.map(renderRow),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
									className: "bg-slate-50/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 5,
										className: "py-2 px-4 font-black text-xs text-[#002e47]",
										children: "🐙 อาหารทะเล"
									})
								}),
								groupedIngredients.seafood.map(renderRow),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
									className: "bg-slate-50/50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										colSpan: 5,
										className: "py-2 px-4 font-black text-xs text-[#002e47]",
										children: "🥚 ไข่ & เครื่องเคียง"
									})
								}),
								[...groupedIngredients.toppings, ...groupedIngredients.others].map(renderRow)
							]
						})]
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: filteredMenuItems.map((item) => {
					const isOutOfStock = outOfStockIds.includes(item.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `bg-white border rounded-3xl p-4 flex gap-4 transition shadow-sm hover:shadow-md relative overflow-hidden ${isOutOfStock ? "border-red-200 bg-red-50/20" : "border-[#ece4d6]"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "h-16 w-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: item.image,
								alt: item.name,
								className: "h-full w-full object-cover"
							}), isOutOfStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-0 bg-red-600/10 text-red-600 font-bold text-[9px] flex items-center justify-center",
								children: "หมด"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 flex flex-col justify-between min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-bold text-gray-400 uppercase",
									children: item.category
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-black text-[#002e47]",
									children: ["฿", item.price]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs font-bold text-[#002e47] truncate",
								children: item.name
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between pt-2 border-t border-slate-100",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[10px] font-black ${isOutOfStock ? "text-red-500" : "text-emerald-600"}`,
									children: isOutOfStock ? "● ปิดชั่วคราว" : "● ขายปกติ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => toggleStock(item.id),
									className: `relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${isOutOfStock ? "bg-red-500" : "bg-emerald-500"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute left-[2px] top-[2px] h-4 w-4 rounded-full bg-white shadow transition-transform duration-200 ease-in-out ${isOutOfStock ? "translate-x-4" : "translate-x-0"}` })
								})]
							})]
						})]
					}, item.id);
				})
			})
		]
	});
}
function AdminStaffView({ users, loading, updateUserRole, toggleUserActiveStatus, deleteUser, isApprovalsTab = false }) {
	const [search, setSearch] = (0, import_react.useState)("");
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-20 font-bold text-gray-500",
		children: "กำลังดาวน์โหลดรายชื่อผู้ใช้งาน..."
	});
	const filteredUsers = users.filter((u) => {
		if (!(isApprovalsTab ? u.is_active === false : u.is_active !== false)) return false;
		const q = search.toLowerCase();
		return u.display_name && u.display_name.toLowerCase().includes(q) || u.email && u.email.toLowerCase().includes(q) || u.role && u.role.toLowerCase().includes(q);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white border border-[#ece4d6] rounded-3xl p-5 shadow-sm space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-black text-[#002e47]",
				children: isApprovalsTab ? "⏳ คำขออนุมัติสิทธิ์ (รอตรวจสอบ)" : "👥 รายชื่อผู้ใช้ระบบและสิทธิ์การเข้าถึง"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400",
					size: 16
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "text",
					placeholder: "ค้นหาชื่อ, อีเมล, สิทธิ์...",
					value: search,
					onChange: (e) => setSearch(e.target.value),
					className: "pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all w-full sm:w-64"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-left border-collapse text-xs sm:text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-[#ece4d6] text-[#5a6e7a] font-bold",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-3 px-4",
							children: "ชื่อผู้ใช้ / อีเมล"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-3 px-4",
							children: "ระดับสิทธิ์ (Role)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-3 px-4",
							children: "สถานะบัญชี"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-3 px-4 text-right",
							children: "ปรับบทบาทสิทธิ์พนักงาน"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
					className: "divide-y divide-slate-100 font-semibold text-slate-700",
					children: filteredUsers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 4,
						className: "py-8 text-center text-slate-400 italic",
						children: "ไม่พบข้อมูลรายชื่อในระบบ"
					}) }) : filteredUsers.map((user) => {
						const isActive = user.is_active !== false;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "hover:bg-slate-50/50",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "py-3 px-4 flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-9 w-9 rounded-full bg-slate-100 border overflow-hidden shrink-0 flex items-center justify-center font-bold text-[#002e47] text-xs",
										children: user.picture_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: user.picture_url,
											alt: user.display_name,
											className: "h-full w-full object-cover"
										}) : user.display_name.substring(0, 2).toUpperCase()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-extrabold text-[#002e47]",
										children: user.display_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-slate-400",
										children: user.email || "ล็อคอินผ่าน LINE/Guest"
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: `inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full border ${user.role === "admin" ? "bg-purple-100 text-purple-800 border-purple-200" : user.role === "staff" ? "bg-blue-100 text-blue-800 border-blue-200" : "bg-slate-100 text-slate-600 border-slate-200"}`,
										children: [user.role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 11 }) : user.role === "staff" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, { size: 11 }) : null, user.role.toUpperCase()]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4",
									children: user.role === "captain" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl text-[10px] font-bold border bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { size: 11 }), " ใช้งานได้ (Locked)"]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => toggleUserActiveStatus(user.id, isActive),
										className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xl text-[10px] font-bold border transition cursor-pointer active:scale-95 ${isActive ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-red-50 text-red-700 border-red-200"}`,
										children: [isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { size: 11 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, { size: 11 }), isActive ? "ใช้งานได้" : isApprovalsTab ? "รออนุมัติ / ระงับชั่วคราว" : "ระงับชั่วคราว"]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-3 px-4 text-right space-x-1.5",
									children: user.role !== "captain" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex gap-1.5 justify-end items-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => updateUserRole(user.id, "admin"),
												className: `px-2 py-1 rounded text-[10px] font-bold border transition cursor-pointer ${user.role === "admin" ? "bg-purple-600 text-white border-purple-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`,
												children: "Admin"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => updateUserRole(user.id, "staff"),
												className: `px-2 py-1 rounded text-[10px] font-bold border transition cursor-pointer ${user.role === "staff" ? "bg-blue-600 text-white border-blue-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`,
												children: "Staff"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => updateUserRole(user.id, "customer"),
												className: `px-2 py-1 rounded text-[10px] font-bold border transition cursor-pointer ${user.role === "customer" ? "bg-slate-700 text-white border-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`,
												children: "Customer"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: () => deleteUser(user.id, user.display_name),
												className: "px-2.5 py-1 rounded text-[10px] font-bold border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 transition cursor-pointer active:scale-95 flex items-center gap-1 shrink-0 ml-1",
												title: "ลบผู้ใช้งาน",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 11 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ลบ" })]
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold italic text-rose-700",
										children: "เจ้าของระบบสูงสุด"
									})
								})
							]
						}, user.id);
					})
				})]
			})
		})]
	});
}
//#endregion
export { AdminDashboard as component };

import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-BbREKNGv.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { $ as DollarSign, A as Pen, D as Plus, H as Inbox, I as Menu, J as Funnel, Q as EyeOff, R as LogOut, T as RotateCcw, U as Image, W as House, X as FileText, Y as Flame, Z as Eye, at as CirclePlus, d as TriangleAlert, dt as Check, h as Table, j as PenLine, m as Tag, n as VolumeX, p as Trash2, pt as BookOpen, q as Grip, r as Volume2, st as ChevronRight, t as X, ut as ChefHat, w as Search } from "../_libs/lucide-react.mjs";
import { t as MENU } from "./customer-CXoL6D-b.mjs";
import { n as adjustStockFromOrder } from "./supabase.service-B-38Jtjp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff-C1LH5KAN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BRAND = "#002e47";
var GOLD = "#fcc14a";
var INK_MUTED = "#5a6e7a";
var MENU_CATEGORIES = [
	{
		id: "signature",
		label: "Signature",
		emoji: "⭐"
	},
	{
		id: "main",
		label: "จานหลัก",
		emoji: "🍽️"
	},
	{
		id: "noodles",
		label: "เส้น/ก๋วยเตี๋ยว",
		emoji: "🍜"
	},
	{
		id: "rice",
		label: "ข้าว",
		emoji: "🍚"
	},
	{
		id: "drinks",
		label: "เครื่องดื่ม",
		emoji: "🥤"
	},
	{
		id: "dessert",
		label: "ของหวาน",
		emoji: "🍮"
	},
	{
		id: "vegetarian",
		label: "มังสวิรัติ",
		emoji: "🥦"
	}
];
function playNotificationSound() {
	try {
		const context = new (window.AudioContext || window.webkitAudioContext)();
		const playBeep = (time, freq) => {
			const osc = context.createOscillator();
			const gain = context.createGain();
			osc.type = "sine";
			osc.frequency.setValueAtTime(freq, time);
			gain.gain.setValueAtTime(.15, time);
			gain.gain.exponentialRampToValueAtTime(.001, time + .12);
			osc.connect(gain);
			gain.connect(context.destination);
			osc.start(time);
			osc.stop(time + .15);
		};
		const now = context.currentTime;
		playBeep(now, 880);
		playBeep(now + .15, 1046.5);
	} catch (err) {
		console.warn("Sound play failed:", err);
	}
}
function EmptyColumnMessage({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-12 text-center text-slate-400 font-bold border-2 border-dashed border-slate-100 rounded-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, {
			size: 32,
			className: "opacity-20 mx-auto mb-2 text-slate-500"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs",
			children: text
		})]
	});
}
function KitchenSidebarContent({ view, setView, onClose, handleLogout }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full bg-[#002e47] text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 border-b border-white/10 flex items-center justify-between shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-[#fcc14a] border border-white/15",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, {
							size: 22,
							className: "stroke-[2.5]"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-black text-sm tracking-tight text-white uppercase",
						children: "ระบบจัดการครัว"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[9px] font-bold text-[#fcc14a] tracking-wider uppercase",
						children: "KITCHEN MONITOR (STAFF)"
					})] })]
				}), onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "md:hidden text-white/50 hover:text-white p-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-bold text-white/40 uppercase tracking-widest block px-2 mb-2",
							children: "เมนูพนักงาน"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setView("kitchen");
								if (onClose) onClose();
							},
							className: `w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "kitchen" ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]" : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, {
								size: 18,
								className: view === "kitchen" ? "text-[#fcc14a]" : "text-white/60"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "จอจัดการครัว"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setView("tables");
								if (onClose) onClose();
							},
							className: `w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "tables" ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]" : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
								size: 18,
								className: view === "tables" ? "text-[#fcc14a]" : "text-white/60"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "ผังโต๊ะอาหาร"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setView("menu");
								if (onClose) onClose();
							},
							className: `w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "menu" ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]" : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
								size: 18,
								className: view === "menu" ? "text-[#fcc14a]" : "text-white/60"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "จัดการเมนูอาหาร"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setView("stock");
								if (onClose) onClose();
							},
							className: `w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "stock" ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]" : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {
								size: 18,
								className: view === "stock" ? "text-[#fcc14a]" : "text-white/60"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "จัดการสต็อกวัตถุดิบ"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "/customer",
							onClick: (e) => {
								e.preventDefault();
								localStorage.removeItem("ran-lung-get-staff-token");
								if (onClose) onClose();
								window.location.href = "/customer";
							},
							className: "w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left text-white/70 hover:text-white hover:bg-white/5 font-medium transition duration-200 cursor-pointer border-l-4 border-transparent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
								size: 18,
								className: "text-white/60"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm",
								children: "สั่งอาหาร (หน้าลูกค้า)"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 border-t border-white/10 bg-white/2 shrink-0 flex flex-col gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: handleLogout,
					className: "w-full flex items-center justify-center gap-2 p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-xl transition duration-300 cursor-pointer border border-red-500/20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 16 }), " ออกจากระบบ"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[9px] text-white/40 text-center font-semibold mt-1",
					children: "ระบบจัดการร้านค้า v1.2.0 · ครัวลุงเกตุ"
				})]
			})
		]
	});
}
function KitchenMonitor() {
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [soundEnabled, setSoundEnabled] = (0, import_react.useState)(true);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("active");
	const [typeFilter, setTypeFilter] = (0, import_react.useState)("all");
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [view, setView] = (0, import_react.useState)("kitchen");
	const handleLogout = async () => {
		document.body.style.display = "none";
		localStorage.removeItem("ran-lung-get-staff-token");
		await supabase.auth.signOut();
		window.location.href = "/login";
	};
	(0, import_react.useEffect)(() => {
		async function checkAuth() {
			try {
				const { data: { session } } = await supabase.auth.getSession();
				if (!session) {
					window.location.href = "/login";
					return;
				}
				const { data, error } = await supabase.from("users").select("*").eq("auth_user_id", session.user.id).maybeSingle();
				if (error || !data || data.role !== "staff" && data.role !== "admin" && data.role !== "captain") {
					window.location.href = "/customer";
					return;
				}
				if (data.is_active === false) {
					alert("บัญชีของคุณอยู่ระหว่างรอการอนุมัติสิทธิ์ (Pending Approval)");
					await supabase.auth.signOut();
					window.location.href = "/login";
					return;
				}
			} catch (err) {
				window.location.href = "/login";
			}
		}
		checkAuth();
	}, []);
	const fetchSupabaseOrders = async () => {
		try {
			const { data: dbOrders, error: dbOrdersError } = await supabase.from("orders").select(`
          *,
          customers (
            display_name
          ),
          order_items (*)
        `).order("created_at", { ascending: false });
			if (!dbOrdersError && dbOrders) {
				const mappedOrders = dbOrders.map((o) => {
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
					const localOnly = prev.filter((p) => !p.id.startsWith("hist_") && !p.id.includes("-") && !mappedOrders.some((m) => m.id === p.id));
					const combined = [...mappedOrders, ...localOnly];
					localStorage.setItem("ran-lung-get-orders", JSON.stringify(combined));
					return combined;
				});
			}
		} catch (e) {
			console.error("Failed to fetch Supabase orders:", e);
		}
	};
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("ran-lung-get-orders");
		if (saved) try {
			setOrders(JSON.parse(saved));
		} catch (e) {
			console.error(e);
		}
		fetchSupabaseOrders();
		const ordersCh = supabase.channel("staff-orders-realtime").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "orders"
		}, () => {
			fetchSupabaseOrders();
		}).on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "order_items"
		}, () => {
			fetchSupabaseOrders();
		}).subscribe();
		return () => {
			supabase.removeChannel(ordersCh);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const handleStorageChange = (e) => {
			if (e.key === "ran-lung-get-orders" && e.newValue) try {
				const newOrders = JSON.parse(e.newValue);
				setOrders((prev) => {
					const prevIds = new Set(prev.map((o) => o.id));
					if (newOrders.some((o) => !prevIds.has(o.id)) && soundEnabled) playNotificationSound();
					return newOrders;
				});
			} catch (err) {
				console.error("Sync error:", err);
			}
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);
	const triggerMockOrder = () => {
		const num = Math.floor(Math.random() * 9e3) + 1e3;
		const names = [
			"คุณ มานะ",
			"คุณ สมรัก",
			"คุณ ณเดช",
			"คุณ ญาญ่า",
			"คุณ กิ๊ฟ",
			"คุณ นิว"
		];
		const tbs = [
			"โต๊ะ 1",
			"โต๊ะ 2",
			"โต๊ะ 3",
			"โต๊ะ 4",
			"โต๊ะ 5"
		];
		const newOrder = {
			id: "mock_" + Date.now(),
			orderNumber: "AK-" + num,
			date: (/* @__PURE__ */ new Date()).toLocaleDateString("th-TH") + " · " + (/* @__PURE__ */ new Date()).toLocaleTimeString("th-TH", {
				hour: "2-digit",
				minute: "2-digit"
			}),
			items: [{
				name: "กระเพราหมูกรอบ (ข้าวราด)",
				qty: 1,
				price: 70,
				image: ""
			}, {
				name: "น้ำลำไย",
				qty: 2,
				price: 40,
				image: ""
			}],
			subtotal: 150,
			delivery: 0,
			total: 150,
			status: "รอดำเนินการ",
			orderType: "dine-in",
			customerName: names[Math.floor(Math.random() * names.length)],
			tableNumber: tbs[Math.floor(Math.random() * tbs.length)],
			note: "เผ็ดปกติ"
		};
		setOrders((prev) => {
			const next = [newOrder, ...prev];
			localStorage.setItem("ran-lung-get-orders", JSON.stringify(next));
			return next;
		});
		if (soundEnabled) playNotificationSound();
	};
	const clearMockOrders = () => {
		setOrders((prev) => {
			const next = prev.filter((o) => !o.id.startsWith("mock_"));
			localStorage.setItem("ran-lung-get-orders", JSON.stringify(next));
			return next;
		});
	};
	const advanceOrderStatus = async (id) => {
		let nextStatus = "สำเร็จ";
		let dbStatus = "completed";
		const targetOrder = orders.find((o) => o.id === id);
		if (!targetOrder) return;
		if (targetOrder.status === "รอดำเนินการ") {
			nextStatus = "กำลังทำ";
			dbStatus = "preparing";
		} else if (targetOrder.status === "กำลังทำ") {
			nextStatus = "พร้อมเสิร์ฟ";
			dbStatus = "delivering";
		} else if (targetOrder.status === "พร้อมเสิร์ฟ") {
			nextStatus = "สำเร็จ";
			dbStatus = "completed";
		}
		const nextList = orders.map((o) => o.id === id ? {
			...o,
			status: nextStatus
		} : o);
		setOrders(nextList);
		localStorage.setItem("ran-lung-get-orders", JSON.stringify(nextList));
		try {
			const { error } = await supabase.from("orders").update({ status: dbStatus }).eq("id", id);
			if (error) throw error;
			if (dbStatus === "completed") await adjustStockFromOrder(targetOrder.items.map((i) => ({
				name: i.name,
				qty: i.qty
			})), "deduct");
		} catch {
			console.warn("Offline status update completed locally.");
		}
	};
	const regressOrderStatus = async (id) => {
		let nextStatus = "รอดำเนินการ";
		let dbStatus = "pending";
		const targetOrder = orders.find((o) => o.id === id);
		if (!targetOrder) return;
		if (targetOrder.status === "กำลังทำ") {
			nextStatus = "รอดำเนินการ";
			dbStatus = "pending";
		} else if (targetOrder.status === "พร้อมเสิร์ฟ") {
			nextStatus = "กำลังทำ";
			dbStatus = "preparing";
		} else if (targetOrder.status === "สำเร็จ") {
			nextStatus = "พร้อมเสิร์ฟ";
			dbStatus = "delivering";
		}
		const nextList = orders.map((o) => o.id === id ? {
			...o,
			status: nextStatus
		} : o);
		setOrders(nextList);
		localStorage.setItem("ran-lung-get-orders", JSON.stringify(nextList));
		try {
			await supabase.from("orders").update({ status: dbStatus }).eq("id", id);
		} catch {}
	};
	const cancelOrder = async (id) => {
		if (!confirm("คุณต้องการยกเลิกคำสั่งซื้อนี้ใช่หรือไม่?")) return;
		const nextList = orders.map((o) => o.id === id ? {
			...o,
			status: "ยกเลิก"
		} : o);
		setOrders(nextList);
		localStorage.setItem("ran-lung-get-orders", JSON.stringify(nextList));
		try {
			await supabase.from("orders").update({ status: "cancelled" }).eq("id", id);
		} catch {}
	};
	const stats = (0, import_react.useMemo)(() => {
		return {
			totalActive: orders.filter((o) => o.status !== "สำเร็จ" && o.status !== "ยกเลิก").length,
			waiting: orders.filter((o) => o.status === "รอดำเนินการ").length,
			cooking: orders.filter((o) => o.status === "กำลังทำ").length,
			ready: orders.filter((o) => o.status === "พร้อมเสิร์ฟ").length,
			completed: orders.filter((o) => o.status === "สำเร็จ").length
		};
	}, [orders]);
	const ordersByStatus = (0, import_react.useMemo)(() => {
		const list = orders.filter((o) => typeFilter === "all" || o.orderType === typeFilter);
		return {
			waiting: list.filter((o) => o.status === "รอดำเนินการ").reverse(),
			cooking: list.filter((o) => o.status === "กำลังทำ"),
			ready: list.filter((o) => o.status === "พร้อมเสิร์ฟ")
		};
	}, [orders, typeFilter]);
	const filteredOrders = (0, import_react.useMemo)(() => {
		const list = orders.filter((o) => typeFilter === "all" || o.orderType === typeFilter);
		if (statusFilter === "active") return list.filter((o) => o.status !== "สำเร็จ" && o.status !== "ยกเลิก");
		return list.filter((o) => o.status === statusFilter);
	}, [
		orders,
		statusFilter,
		typeFilter
	]);
	const menuSummary = (0, import_react.useMemo)(() => {
		const activeCookingOrders = orders.filter((o) => o.status === "กำลังทำ" || o.status === "รอดำเนินการ");
		const counts = {};
		activeCookingOrders.forEach((o) => {
			o.items.forEach((item) => {
				const cleanName = item.name.split(" (")[0];
				counts[cleanName] = (counts[cleanName] || 0) + item.qty;
			});
		});
		return Object.entries(counts).sort((a, b) => b[1] - a[1]);
	}, [orders]);
	const getViewTitle = () => {
		if (view === "kitchen") return "จอจัดการครัวลุงเกตุ";
		if (view === "tables") return "ผังที่นั่ง & จัดการโต๊ะ Walk-in";
		if (view === "menu") return "จัดการเมนูอาหาร";
		return "จัดการคลังวัตถุดิบ & สต็อก";
	};
	const getViewSubtitle = () => {
		if (view === "kitchen") return "ระบบจัดคิวอาหารและมอนิเตอร์หน้าเตา";
		if (view === "tables") return "เพิ่ม/ลบโต๊ะ และตรวจสอบสถานะโต๊ะอาหารเรียลไทม์";
		if (view === "menu") return "เพิ่ม แก้ไข ลบเมนูอาหาร พร้อมตัวเลือกและรูปภาพ";
		return "ตรวจสอบสต็อกวัตถุดิบ ปรับจำนวน และเกณฑ์แจ้งเตือนสต็อกต่ำ";
	};
	const getViewIcon = () => {
		if (view === "kitchen") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, {
			className: "h-5 w-5",
			color: GOLD
		});
		if (view === "tables") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table, {
			className: "h-5 w-5",
			color: GOLD
		});
		if (view === "menu") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
			className: "h-5 w-5",
			color: GOLD
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {
			className: "h-5 w-5",
			color: GOLD
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#fff8f2] text-gray-900 flex flex-col md:flex-row font-sans",
		children: [
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
					duration: .25
				},
				className: "fixed top-0 left-0 bottom-0 w-[280px] z-[55] flex flex-col md:hidden shadow-2xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KitchenSidebarContent, {
					view,
					setView,
					onClose: () => setSidebarOpen(false),
					handleLogout
				})
			})] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "hidden md:flex flex-col w-72 h-screen shrink-0 border-r border-[#ece4d6] shadow-soft z-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KitchenSidebarContent, {
					view,
					setView,
					handleLogout
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col h-screen overflow-y-auto min-w-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: "hidden md:block bg-white border-b border-[#ece4d6] p-4 sticky top-0 z-30 shadow-sm shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-9 w-9 place-items-center rounded-xl bg-[#002e47] text-white shadow-md",
									children: getViewIcon()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-base sm:text-lg font-black tracking-tight",
									style: { color: BRAND },
									children: getViewTitle()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold text-slate-500",
									children: getViewSubtitle()
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs",
								children: [view === "kitchen" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-[#fcfbf9] border border-[#ece4d6] px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] text-slate-500",
										children: "คิวรอดำเนินการ:"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs sm:text-sm font-black",
										style: { color: BRAND },
										children: stats.totalActive
									})]
								}), (view === "kitchen" || view === "tables") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSoundEnabled(!soundEnabled),
									className: `p-2 rounded-xl border transition active:scale-95 cursor-pointer ${soundEnabled ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100" : "bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200"}`,
									children: soundEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { size: 15 })
								}), view === "kitchen" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: clearMockOrders,
										className: "flex items-center gap-1.5 hover:bg-red-100 active:scale-95 text-red-600 bg-red-50 px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition shadow-sm cursor-pointer border border-red-200",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ยกเลิกจำลองออเดอร์" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: triggerMockOrder,
										className: "flex items-center gap-1.5 hover:opacity-90 active:scale-95 text-[#002e47] px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition shadow-sm cursor-pointer border border-[#002e47]/10",
										style: { background: GOLD },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "จำลองออเดอร์" })]
									})]
								})] })]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
						className: "block md:hidden bg-white border-b border-[#ece4d6] p-3 sticky top-0 z-30 shadow-sm shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSidebarOpen(true),
									className: "p-1.5 rounded-lg hover:bg-slate-100 text-[#002e47] transition active:scale-95 cursor-pointer border border-[#ece4d6]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 18 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "text-sm font-black tracking-tight",
									style: { color: BRAND },
									children: [
										view === "kitchen" && "ครัวลุงเกตุ",
										view === "tables" && "ผังโต๊ะอาหาร",
										view === "menu" && "จัดการเมนู",
										view === "stock" && "คลังสต็อกวัตถุดิบ"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[9px] font-bold text-slate-500",
									children: [
										view === "kitchen" && `คิวค้าง: ${stats.totalActive}`,
										view === "tables" && "จัดการผังโต๊ะเรียลไทม์",
										view === "menu" && "จัดการรายการอาหาร",
										view === "stock" && "ตรวจสอบสต็อก"
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [(view === "kitchen" || view === "tables") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: triggerMockOrder,
									className: "bg-[#fcc14a] text-[#002e47] text-[10px] px-2.5 py-1 rounded-xl font-bold",
									children: "+ จำลอง"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: handleLogout,
									className: "bg-red-50 text-red-600 text-[10px] px-2.5 py-1 rounded-xl font-bold border border-red-100 active:scale-95 transition",
									children: "ออก"
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "p-3 sm:p-4 lg:p-6 w-full mx-auto flex-1 flex flex-col",
						children: view === "tables" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableManagementView, {
							orders,
							onRefreshOrders: fetchSupabaseOrders
						}) : view === "menu" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuManagementView, {}) : view === "stock" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StockManagementView, { handleLogout }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden md:flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white border border-[#ece4d6] p-3 rounded-2xl shrink-0 shadow-sm mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-row overflow-x-auto no-scrollbar gap-1 w-full sm:w-auto shrink-0",
									children: [
										{
											id: "active",
											label: "คิวปัจจุบัน (Kanban)",
											count: stats.totalActive
										},
										{
											id: "รอดำเนินการ",
											label: "ออเดอร์ใหม่",
											count: stats.waiting,
											dotColor: "bg-amber-500"
										},
										{
											id: "กำลังทำ",
											label: "กำลังปรุง",
											count: stats.cooking,
											dotColor: "bg-blue-500"
										},
										{
											id: "พร้อมเสิร์ฟ",
											label: "พร้อมเสิร์ฟ",
											count: stats.ready,
											dotColor: "bg-emerald-500"
										},
										{
											id: "สำเร็จ",
											label: "เสร็จสิ้น",
											count: stats.completed
										}
									].map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setStatusFilter(tab.id),
										className: `relative flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs tracking-wider transition-all shrink-0 cursor-pointer ${statusFilter === tab.id ? "bg-[#002e47] text-white shadow-inner" : "text-[#5a6e7a] hover:text-[#002e47] hover:bg-slate-50"}`,
										children: [
											tab.dotColor && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${tab.dotColor} animate-pulse` }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tab.label }),
											tab.count !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-[10px] px-1.5 py-0.5 rounded-full font-bold ${statusFilter === tab.id ? "bg-slate-700 text-white" : "bg-slate-100 text-[#5a6e7a]"}`,
												children: tab.count
											})
										]
									}, tab.id))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 justify-between sm:justify-start w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 text-xs font-bold",
										style: { color: INK_MUTED },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ช่องทาง:" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: typeFilter,
										onChange: (e) => setTypeFilter(e.target.value),
										className: "bg-white border border-[#ece4d6] rounded-xl px-2.5 py-1.5 text-xs font-bold text-[#002e47] focus:outline-none shadow-sm flex-1 sm:flex-initial max-w-[150px]",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "all",
												children: "ทั้งหมด"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "dine-in",
												children: "ทานที่ร้าน"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "takeaway",
												children: "กลับบ้าน"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "delivery",
												children: "เดลิเวอรี่"
											})
										]
									})]
								})]
							}),
							menuSummary.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white border border-[#ece4d6] p-3 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-2.5 shrink-0 shadow-sm mb-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs font-black text-[#002e47] shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, {
										size: 14,
										className: "text-[#fcc14a]"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ยอดรวมเมนูเตาอาหาร:" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: menuSummary.map(([name, qty]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 bg-[#002e47]/5 border border-[#002e47]/10 rounded-xl px-3 py-1 text-xs shrink-0 font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#002e47]",
											children: name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "bg-[#fcc14a] text-[#002e47] font-black px-1.5 py-0.2 rounded-md text-[10px]",
											children: ["x", qty]
										})]
									}, name))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 overflow-y-auto no-scrollbar",
								children: statusFilter === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden md:grid md:grid-cols-3 gap-6 min-w-[960px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-soft",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-4 bg-amber-500/10 border-b border-[#ece4d6] flex items-center justify-between shrink-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-black text-sm text-[#002e47]",
													children: "ออเดอร์ใหม่"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white text-xs font-black px-2 py-0.5 rounded-full bg-amber-500",
													children: ordersByStatus.waiting.length
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "p-4 space-y-4 bg-[#f8fafc]/50 flex-1 overflow-y-auto max-h-[70vh]",
												children: ordersByStatus.waiting.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyColumnMessage, { text: "ไม่มีออเดอร์ใหม่" }) : ordersByStatus.waiting.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, {
													order: o,
													advanceOrderStatus,
													regressOrderStatus,
													cancelOrder
												}, o.id))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-soft",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-4 bg-blue-50 border-b border-[#ece4d6] flex items-center justify-between shrink-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-black text-sm text-[#002e47]",
													children: "กำลังปรุง"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white text-xs font-black px-2 py-0.5 rounded-full bg-blue-600",
													children: ordersByStatus.cooking.length
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "p-4 space-y-4 bg-[#f8fafc]/50 flex-1 overflow-y-auto max-h-[70vh]",
												children: ordersByStatus.cooking.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyColumnMessage, { text: "ไม่มีรายการกำลังปรุง" }) : ordersByStatus.cooking.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, {
													order: o,
													advanceOrderStatus,
													regressOrderStatus,
													cancelOrder
												}, o.id))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-soft",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-4 bg-emerald-50 border-b border-[#ece4d6] flex items-center justify-between shrink-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-black text-sm text-[#002e47]",
													children: "พร้อมเสิร์ฟ"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white text-xs font-black px-2 py-0.5 rounded-full bg-emerald-500",
													children: ordersByStatus.ready.length
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "p-4 space-y-4 bg-[#f8fafc]/50 flex-1 overflow-y-auto max-h-[70vh]",
												children: ordersByStatus.ready.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyColumnMessage, { text: "ไม่มีออเดอร์พร้อมเสิร์ฟ" }) : ordersByStatus.ready.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, {
													order: o,
													advanceOrderStatus,
													regressOrderStatus,
													cancelOrder
												}, o.id))
											})]
										})
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white rounded-3xl border border-[#ece4d6] p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "text-sm font-black mb-4",
										children: [
											"ประวัติออเดอร์ (",
											statusFilter,
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-3",
										children: filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-center text-slate-400 py-12",
											children: "ไม่มีรายการ"
										}) : filteredOrders.map((o) => statusFilter === "สำเร็จ" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryOrderRow, { order: o }, o.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, {
											order: o,
											advanceOrderStatus,
											regressOrderStatus,
											cancelOrder
										}, o.id))
									})]
								})
							})
						] })
					})
				]
			})
		]
	});
}
function OrderCard({ order, advanceOrderStatus, regressOrderStatus, cancelOrder }) {
	const isDineIn = order.orderType === "dine-in";
	const isTakeaway = order.orderType === "takeaway";
	const isDelivery = order.orderType === "delivery";
	let typeBadge = "ทานที่ร้าน";
	let typeColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
	let borderLeftColor = "border-l-[#fcc14a]";
	if (isTakeaway) {
		typeBadge = "กลับบ้าน";
		typeColor = "bg-blue-50 text-blue-800 border-blue-200";
		borderLeftColor = "border-l-[#5a6e7a]";
	} else if (isDelivery) {
		typeBadge = "เดลิเวอรี่";
		typeColor = "bg-amber-50 text-amber-800 border-amber-200";
		borderLeftColor = "border-l-[#002e47]";
	}
	let nextBtnText = "เริ่มทำครัว";
	let nextBtnColor = "bg-[#002e47] text-white hover:bg-[#003957]";
	if (order.status === "กำลังทำ") {
		nextBtnText = "ปรุงสำเร็จ";
		nextBtnColor = "bg-blue-600 text-white hover:bg-blue-700";
	} else if (order.status === "พร้อมเสิร์ฟ") {
		nextBtnText = "ส่งเสิร์ฟสำเร็จ";
		nextBtnColor = "bg-emerald-600 text-white hover:bg-emerald-700";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `bg-white border-2 border-l-[6px] border-[#ece4d6] ${borderLeftColor} rounded-2xl p-4 shadow-sm hover:shadow transition relative space-y-3`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-black text-[#002e47] text-sm",
					children: order.orderNumber
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] text-slate-400 ml-1.5 font-bold",
					children: order.date.includes(" · ") ? order.date.split(" · ")[1] : order.date
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `text-[9px] font-black px-2 py-0.5 rounded-full border ${typeColor}`,
					children: typeBadge
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pt-2 border-t border-slate-100",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-bold text-slate-400",
					children: "รายละเอียดลูกค้า:"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-black text-[#002e47] mt-0.5",
					children: [
						order.customerName || "คุณลูกค้า",
						" ",
						isDineIn && order.tableNumber && `(โต๊ะ ${order.tableNumber})`
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-1.5",
				children: order.items.map((i, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between items-center text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-slate-700",
						children: i.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-black bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded",
						children: ["x", i.qty]
					})]
				}, idx))
			}),
			order.note && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-2 bg-red-50/50 border border-red-100 rounded-xl text-[10px] font-black text-red-700",
				children: ["💡 หมายเหตุ: ", order.note]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => regressOrderStatus(order.id),
						disabled: order.status === "รอดำเนินการ",
						className: "p-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-slate-600 transition disabled:opacity-50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 13 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => advanceOrderStatus(order.id),
						className: `flex-1 py-1.5 rounded-xl text-[11px] font-black tracking-wide shadow-sm transition flex items-center justify-center gap-1 cursor-pointer ${nextBtnColor}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 11 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: nextBtnText })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => cancelOrder(order.id),
						className: "p-1.5 bg-red-50 hover:bg-red-100 border border-red-100 rounded-xl text-red-600 transition",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 13 })
					})
				]
			})
		]
	});
}
function HistoryOrderRow({ order }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-slate-50 border border-slate-100 rounded-xl p-3 flex justify-between items-center text-xs",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-black text-[#002e47]",
				children: order.orderNumber
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] text-slate-400 ml-1.5",
				children: order.date
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-slate-500 mt-0.5 truncate max-w-sm",
				children: order.items.map((i) => `${i.name} x${i.qty}`).join(", ")
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-right shrink-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-black block text-[#002e47]",
				children: ["฿", order.total]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[9px] bg-emerald-100 text-emerald-800 px-1.5 rounded font-black",
				children: "สำเร็จ"
			})]
		})]
	});
}
function TableManagementView({ orders, onRefreshOrders }) {
	const [tables, setTables] = (0, import_react.useState)([
		{
			id: "1",
			label: "โต๊ะ 1",
			status: "available",
			capacity: 4,
			table_type: "normal"
		},
		{
			id: "2",
			label: "โต๊ะ 2",
			status: "occupied",
			capacity: 4,
			table_type: "normal"
		},
		{
			id: "3",
			label: "โต๊ะ 3",
			status: "available",
			capacity: 4,
			table_type: "normal"
		},
		{
			id: "4",
			label: "โต๊ะ 4",
			status: "available",
			capacity: 4,
			table_type: "normal"
		},
		{
			id: "5",
			label: "โต๊ะ 5",
			status: "available",
			capacity: 4,
			table_type: "normal"
		},
		{
			id: "6",
			label: "โต๊ะ 6",
			status: "occupied",
			capacity: 4,
			table_type: "normal"
		},
		{
			id: "7",
			label: "โต๊ะ 7",
			status: "available",
			capacity: 4,
			table_type: "normal"
		},
		{
			id: "8",
			label: "โต๊ะ 8",
			status: "available",
			capacity: 4,
			table_type: "normal"
		},
		{
			id: "9",
			label: "โต๊ะ 9 (Walk-in)",
			status: "available",
			capacity: 4,
			table_type: "walkin"
		},
		{
			id: "10",
			label: "โต๊ะ 10 (Walk-in)",
			status: "available",
			capacity: 4,
			table_type: "walkin"
		}
	]);
	const [selectedTable, setSelectedTable] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [isMoveSelectorOpen, setIsMoveSelectorOpen] = (0, import_react.useState)(false);
	const [isAddTableOpen, setIsAddTableOpen] = (0, import_react.useState)(false);
	const [newTableName, setNewTableName] = (0, import_react.useState)("");
	const [newTableCapacity, setNewTableCapacity] = (0, import_react.useState)(4);
	const [newTableType, setNewTableType] = (0, import_react.useState)("normal");
	const [addingTable, setAddingTable] = (0, import_react.useState)(false);
	const [confirmDialog, setConfirmDialog] = (0, import_react.useState)(null);
	const fetchTables = async () => {
		setLoading(true);
		try {
			const { data, error } = await supabase.from("restaurant_tables").select("id, label, status, capacity, table_type").order("id");
			if (!error && data && data.length > 0) {
				const strData = data.map((t) => ({
					...t,
					id: String(t.id)
				}));
				setTables(strData);
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
	(0, import_react.useEffect)(() => {
		fetchTables();
		const ch = supabase.channel("tables-staff-realtime").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "restaurant_tables"
		}, (payload) => {
			if (payload.eventType === "DELETE") {
				const deletedId = String(payload.old?.id);
				setTables((prev) => {
					const next = prev.filter((t) => t.id !== deletedId);
					localStorage.setItem("ran-lung-get-tables", JSON.stringify(next));
					return next;
				});
				setSelectedTable((prev) => prev?.id === deletedId ? null : prev);
			} else if (payload.eventType === "UPDATE" || payload.eventType === "INSERT") {
				const updated = {
					...payload.new,
					id: String(payload.new.id)
				};
				setTables((prev) => {
					const next = prev.some((t) => t.id === updated.id) ? prev.map((t) => t.id === updated.id ? {
						...t,
						...updated
					} : t) : [...prev, updated];
					localStorage.setItem("ran-lung-get-tables", JSON.stringify(next));
					return next;
				});
			}
		}).subscribe();
		return () => {
			supabase.removeChannel(ch);
		};
	}, []);
	const getActiveOrdersForTable = (tableLabel) => {
		return orders.filter((o) => (o.status === "รอดำเนินการ" || o.status === "กำลังทำ" || o.status === "พร้อมเสิร์ฟ" || o.status === "รอรับออเดอร์") && (o.tableNumber === tableLabel || o.tableNumber === tableLabel.replace("โต๊ะ ", "")));
	};
	const updateTableStatus = async (tableId, nextStatus) => {
		const nextList = tables.map((t) => t.id === tableId ? {
			...t,
			status: nextStatus
		} : t);
		setTables(nextList);
		localStorage.setItem("ran-lung-get-tables", JSON.stringify(nextList));
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
			const { data, error } = await supabase.from("restaurant_tables").insert({
				label: fullLabel,
				status: "available",
				capacity: newTableCapacity,
				table_type: newTableType
			}).select().single();
			if (error) throw error;
			const newT = {
				...data,
				id: String(data.id)
			};
			setTables((prev) => {
				const next = [...prev, newT];
				localStorage.setItem("ran-lung-get-tables", JSON.stringify(next));
				return next;
			});
			setIsAddTableOpen(false);
			setNewTableName("");
			setNewTableCapacity(4);
			setNewTableType("normal");
		} catch (e) {
			alert("เกิดข้อผิดพลาด: " + (e?.message || "ไม่สามารถเพิ่มโต๊ะได้"));
		} finally {
			setAddingTable(false);
		}
	};
	const deleteTable = async (tableId, tableLabel) => {
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
		} catch (e) {
			alert("เกิดข้อผิดพลาด: " + (e?.message || "ไม่สามารถลบโต๊ะได้"));
		}
	};
	const moveAllOrders = async (fromTableLabel, toTableLabel) => {
		const activeFromOrders = getActiveOrdersForTable(fromTableLabel);
		if (activeFromOrders.length === 0) {
			alert("ไม่มีออเดอร์ให้ย้ายบนโต๊ะนี้");
			return;
		}
		try {
			const orderIds = activeFromOrders.map((o) => o.id);
			const { error: orderErr } = await supabase.from("orders").update({ table_number: toTableLabel }).in("id", orderIds);
			if (orderErr) throw orderErr;
			const fromTable = tables.find((t) => t.label === fromTableLabel);
			const toTable = tables.find((t) => t.label === toTableLabel);
			if (fromTable) await supabase.from("restaurant_tables").update({ status: "available" }).eq("id", fromTable.id);
			if (toTable) await supabase.from("restaurant_tables").update({ status: "occupied" }).eq("id", toTable.id);
			await fetchTables();
			await onRefreshOrders();
			setSelectedTable(tables.map((t) => t.label === fromTableLabel ? {
				...t,
				status: "available"
			} : t.label === toTableLabel ? {
				...t,
				status: "occupied"
			} : t).find((t) => t.label === toTableLabel) || null);
			alert(`ย้ายออเดอร์จาก ${fromTableLabel} ไปยัง ${toTableLabel} สำเร็จ!`);
		} catch (err) {
			console.error("[Move Table] Error:", err);
			alert("เกิดข้อผิดพลาดในการย้ายโต๊ะ");
		}
	};
	const clearTableAndOrders = async (tableLabel) => {
		try {
			const activeOrders = getActiveOrdersForTable(tableLabel);
			if (activeOrders.length > 0) {
				const orderIds = activeOrders.map((o) => o.id);
				await supabase.from("orders").update({ status: "completed" }).in("id", orderIds);
			}
			const targetTable = tables.find((t) => t.label === tableLabel);
			if (targetTable) await supabase.from("restaurant_tables").update({ status: "available" }).eq("id", targetTable.id);
			await fetchTables();
			await onRefreshOrders();
			setSelectedTable(null);
			alert(`เคลียร์โต๊ะ ${tableLabel} เสร็จสิ้น!`);
		} catch (err) {
			console.error("[Clear Table] Error:", err);
			alert("เกิดข้อผิดพลาดในการเคลียร์โต๊ะ");
		}
	};
	(0, import_react.useEffect)(() => {
		if (tables.length === 0) return;
		const tablesToUpdate = tables.filter((t) => getActiveOrdersForTable(t.label).length > 0 && t.status === "available");
		if (tablesToUpdate.length > 0) tablesToUpdate.forEach((t) => {
			updateTableStatus(t.id, "occupied");
		});
	}, [orders, tables]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white border border-[#ece4d6] rounded-3xl p-5 shadow-sm flex items-center justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-black text-[#002e47]",
					children: "ผังที่นั่งร้านอาหาร (หน้าร้าน)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-slate-500 font-semibold mt-0.5",
					children: [
						"รวมทั้งหมด ",
						tables.length,
						" โต๊ะอาหาร (รวมโต๊ะ Walk-in สีเทา)"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: fetchTables,
						className: "bg-[#002e47]/5 border hover:bg-[#002e47]/10 text-[#002e47] text-xs font-black px-3.5 py-2 rounded-xl transition",
						children: "🔄 โหลดใหม่"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setIsAddTableOpen(true),
						className: "flex items-center gap-1.5 bg-[#002e47] hover:bg-[#003a5c] text-white text-xs font-black px-4 py-2 rounded-xl transition shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "เพิ่มโต๊ะ" })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col lg:flex-row gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 lg:max-w-[65%]",
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white border border-[#ece4d6] rounded-3xl p-16 text-center text-slate-400 font-bold shadow-sm",
						children: "กำลังโหลดผังโต๊ะ..."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 xl:grid-cols-3 gap-5",
						children: [...tables].sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)).map((table) => {
							const activeOrders = getActiveOrdersForTable(table.label);
							const isOccupied = table.status === "occupied";
							const isWalkIn = table.table_type === "walkin" || table.label.toLowerCase().includes("walk-in");
							const isSelected = selectedTable?.id === table.id;
							let statusLabel = "ว่าง";
							let statusColor = "bg-emerald-500 text-white border-emerald-600";
							let boxBg = "bg-emerald-50/30 border-emerald-200 hover:bg-emerald-50/50";
							if (isOccupied) {
								statusLabel = "มีลูกค้า";
								statusColor = "bg-red-500 text-white border-red-600";
								boxBg = "bg-red-50/30 border-red-200 hover:bg-red-50/50";
							} else if (isWalkIn) {
								statusLabel = "Walk-in";
								statusColor = "bg-slate-500 text-white border-slate-600";
								boxBg = "bg-slate-50/40 border-slate-300 hover:bg-slate-50/60";
							}
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								onClick: () => setSelectedTable(table),
								className: `border-2 rounded-3xl p-5 text-left relative overflow-hidden transition cursor-pointer flex flex-col justify-between min-h-[160px] shadow-sm hover:shadow ${boxBg} ${isSelected ? "ring-4 ring-[#002e47]/30 border-[#002e47] scale-[1.01]" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-black text-base text-[#002e47]",
										children: table.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `text-[10px] font-black px-2.5 py-0.5 rounded-full border ${statusColor}`,
										children: statusLabel
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-wider",
									children: [
										"โต๊ะสำหรับ ",
										table.capacity || 4,
										" คน ",
										isWalkIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-1 text-slate-600 font-extrabold",
											children: "(Walk-in)"
										})
									]
								})] }), isOccupied && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-4 pt-3 border-t border-red-100 text-xs",
									children: activeOrders.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-red-700",
										children: [
											"มีออเดอร์ค้าง (",
											activeOrders.length,
											")"
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-400 font-semibold italic text-[11px]",
										children: "ไม่มีออเดอร์ค้าง"
									})
								})]
							}, table.id);
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full lg:w-[35%] bg-white border border-[#ece4d6] rounded-[28px] p-6 shadow-sm flex flex-col min-h-[500px]",
					children: selectedTable ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col flex-1 h-full text-[#002e47]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-start pb-4 border-b border-slate-100 mb-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-lg font-black",
									children: selectedTable.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-[10px] font-black px-2.5 py-0.5 rounded-full border inline-block mt-1 ${selectedTable.status === "occupied" ? "bg-red-500 text-white border-red-600" : "bg-emerald-500 text-white border-emerald-600"}`,
									children: selectedTable.status === "occupied" ? "มีลูกค้า" : "ว่าง"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => {
										setSelectedTable(null);
										setIsMoveSelectorOpen(false);
									},
									className: "h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 cursor-pointer text-slate-500",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-bold text-slate-500 block mb-2",
									children: "อัปเดตสถานะโต๊ะ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => updateTableStatus(selectedTable.id, "available"),
										className: `py-2 rounded-md font-bold text-[10px] border transition ${selectedTable.status === "available" ? "bg-emerald-500 text-white border-emerald-600" : "bg-white border-slate-200 hover:bg-slate-50"}`,
										children: "🟢 ว่าง"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => updateTableStatus(selectedTable.id, "occupied"),
										className: `py-2 rounded-md font-bold text-[10px] border transition ${selectedTable.status === "occupied" ? "bg-red-500 text-white border-red-600" : "bg-white border-slate-200 hover:bg-slate-50"}`,
										children: "🔴 มีลูกค้า"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-bold text-slate-500 block mb-1",
										children: "เมนูการจัดการ"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setIsMoveSelectorOpen(true),
										className: "w-full py-3 px-4 rounded-md border border-slate-200 hover:bg-slate-50 font-bold text-xs flex items-center justify-between transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex items-center gap-2",
											children: "🔄 ย้าย / รวมออเดอร์ไปยังโต๊ะอื่น"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
											size: 14,
											className: "text-slate-400"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "/customer",
										target: "_blank",
										rel: "noreferrer",
										onClick: () => {
											localStorage.setItem("ran-lung-get-selected-table", selectedTable.id);
										},
										className: "w-full py-3 px-4 rounded-md border border-slate-200 hover:bg-slate-50 font-bold text-xs flex items-center justify-between transition block text-left text-inherit no-underline",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex items-center gap-2",
											children: "🛍️ สั่งอาหาร Walk-in (ชำระเงินสด/โอนเงิน)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, {
											size: 14,
											className: "text-slate-400"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setConfirmDialog({
											isOpen: true,
											title: "ยืนยันการเคลียร์โต๊ะ",
											message: `คุณต้องการเคลียร์โต๊ะและเปลี่ยนสถานะออเดอร์ค้างทั้งหมดของ ${selectedTable.label} ให้เสร็จสิ้นใช่หรือไม่?`,
											onConfirm: async () => {
												await clearTableAndOrders(selectedTable.label);
											}
										}),
										className: "w-full py-3 px-4 rounded-md border border-red-200 text-red-700 bg-red-50/30 hover:bg-red-50 font-bold text-xs flex items-center justify-between transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex items-center gap-2",
											children: "🧹 เคลียร์โต๊ะ & อ้างอิงออเดอร์เสร็จสิ้น"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
											size: 14,
											className: "text-red-400"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => setConfirmDialog({
											isOpen: true,
											title: "⚠️ ยืนยันการลบโต๊ะ",
											message: `คุณต้องการลบ ${selectedTable.label} ออกจากระบบใช่หรือไม่? การดำเนินการนี้ไม่สามารถย้อนกลับได้`,
											onConfirm: async () => {
												await deleteTable(selectedTable.id, selectedTable.label);
											}
										}),
										className: "w-full py-3 px-4 rounded-md border border-red-300 text-red-800 bg-red-100/50 hover:bg-red-100 font-bold text-xs flex items-center justify-between transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex items-center gap-2",
											children: "🗑️ ลบโต๊ะนี้ออกจากระบบ"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
											size: 14,
											className: "text-red-500"
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 flex flex-col border-t border-slate-100 pt-4 overflow-hidden",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-bold text-slate-500 block mb-3",
									children: [
										"บิลแยกและรายละเอียดอาหาร (",
										getActiveOrdersForTable(selectedTable.label).length,
										" ออเดอร์)"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 overflow-y-auto space-y-3.5 pr-1 max-h-[280px] no-scrollbar",
									children: getActiveOrdersForTable(selectedTable.label).length > 0 ? getActiveOrdersForTable(selectedTable.label).map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-slate-50/50 border border-[#ece4d6] rounded-md p-3.5 space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-center",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-extrabold text-[11px] text-slate-700",
													children: order.orderNumber
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] bg-slate-200/60 font-black px-2 py-0.5 rounded text-slate-600",
													children: order.status
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "space-y-1 text-xs text-slate-600 font-bold",
												children: order.items.map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
														it.name,
														" x",
														it.qty
													] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["฿", it.price * it.qty] })]
												}, idx))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex justify-between items-center pt-2 border-t border-dashed border-slate-200 text-xs",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-black text-[#002e47]",
													children: ["ยอดรวม: ฿", order.total]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[9px] bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.5 rounded",
													children: "จ่ายแล้ว"
												})]
											})
										]
									}, order.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center text-slate-400 py-8 text-xs italic font-bold",
										children: "ไม่มีออเดอร์ค้างอยู่บนโต๊ะนี้"
									})
								})]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex flex-col items-center justify-center text-slate-400 py-12 text-center my-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-5xl mb-3",
								children: "🍽️"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-bold text-sm text-[#002e47]",
								children: "เลือกโต๊ะอาหารเพื่อดำเนินการ"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] text-slate-500 mt-1.5 max-w-[200px] leading-relaxed",
								children: "กดเลือกโต๊ะจากแผนผังที่นั่งฝั่งซ้าย เพื่อย้ายออเดอร์, ดูรายละเอียดบิลแยก หรือเคลียร์/ลบโต๊ะ"
							})
						]
					})
				})]
			}),
			isAddTableOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
					onClick: () => setIsAddTableOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-[28px] p-6 w-full max-w-sm z-10 border border-[#ece4d6] shadow-2xl relative text-[#002e47]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-black",
								children: "➕ เพิ่มโต๊ะใหม่"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsAddTableOpen(false),
								className: "h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 cursor-pointer text-slate-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-slate-600 block mb-1",
									children: "ชื่อโต๊ะ / หมายเลขโต๊ะ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "เช่น 11, VIP, ห้องส่วนตัว",
									value: newTableName,
									onChange: (e) => setNewTableName(e.target.value),
									className: "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#002e47]/20",
									onKeyDown: (e) => e.key === "Enter" && addNewTable(),
									autoFocus: true
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-slate-600 block mb-1",
									children: "จำนวนที่นั่ง"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: newTableCapacity,
									onChange: (e) => setNewTableCapacity(Number(e.target.value)),
									className: "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#002e47]/20 bg-white",
									children: [
										2,
										4,
										6,
										8,
										10,
										12
									].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: n,
										children: [n, " คน"]
									}, n))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-slate-600 block mb-1",
									children: "ประเภทโต๊ะ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setNewTableType("normal"),
										className: `py-2.5 rounded-xl font-bold text-xs border transition ${newTableType === "normal" ? "bg-[#002e47] text-white border-[#002e47]" : "bg-white border-slate-200 hover:bg-slate-50"}`,
										children: "🪑 ปกติ"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setNewTableType("walkin"),
										className: `py-2.5 rounded-xl font-bold text-xs border transition ${newTableType === "walkin" ? "bg-slate-600 text-white border-slate-600" : "bg-white border-slate-200 hover:bg-slate-50"}`,
										children: "🚶 Walk-in"
									})]
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsAddTableOpen(false),
								className: "flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition",
								children: "ยกเลิก"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: addNewTable,
								disabled: !newTableName.trim() || addingTable,
								className: "flex-1 py-2.5 rounded-xl bg-[#002e47] text-white font-black text-xs hover:bg-[#003a5c] transition disabled:opacity-50",
								children: addingTable ? "กำลังเพิ่ม..." : "✅ เพิ่มโต๊ะ"
							})]
						})
					]
				})]
			}),
			isMoveSelectorOpen && selectedTable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
					onClick: () => setIsMoveSelectorOpen(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-[28px] p-6 w-full max-w-lg z-10 border border-[#ece4d6] shadow-2xl relative text-[#002e47] flex flex-col max-h-[90vh]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center pb-4 border-b border-slate-100 mb-5 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-black flex items-center gap-2",
								children: "🔄 ย้าย / รวมออเดอร์"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate-500 font-semibold mt-0.5",
								children: ["เลือกโต๊ะปลายทางสำหรับ ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-extrabold text-[#002e47] underline",
									children: selectedTable.label
								})]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsMoveSelectorOpen(false),
								className: "h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 cursor-pointer text-slate-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 overflow-y-auto no-scrollbar py-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 sm:grid-cols-3 gap-4",
								children: [...tables].sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10)).filter((t) => t.id !== selectedTable.id).map((t) => {
									const activeOrders = getActiveOrdersForTable(t.label);
									const isOccupied = t.status === "occupied";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: () => {
											const actionText = isOccupied ? `รวมออเดอร์กับ ${t.label}` : `ย้ายออเดอร์ทั้งหมดไปที่ ${t.label}`;
											setConfirmDialog({
												isOpen: true,
												title: isOccupied ? "ยืนยันการรวมออเดอร์" : "ยืนยันการย้ายโต๊ะ",
												message: `คุณต้องการ${actionText} ใช่หรือไม่?`,
												onConfirm: async () => {
													await moveAllOrders(selectedTable.label, t.label);
													setIsMoveSelectorOpen(false);
												}
											});
										},
										className: `border-2 rounded-md p-4 text-left transition flex flex-col justify-between min-h-[110px] cursor-pointer ${isOccupied ? "bg-red-50/10 border-red-100 hover:bg-red-50/50" : "bg-emerald-50/10 border-emerald-100 hover:bg-emerald-50/50"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "w-full flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-extrabold text-sm",
												children: t.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `text-[8px] font-black px-1.5 py-0.5 rounded-full border ${isOccupied ? "bg-red-500 text-white border-red-600" : "bg-emerald-500 text-white border-emerald-600"}`,
												children: isOccupied ? "มีลูกค้า" : "ว่าง"
											})]
										}), isOccupied && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-red-700 font-extrabold mt-2",
											children: activeOrders.length > 0 ? `ค้างอยู่ ${activeOrders.length} ออเดอร์` : "นั่งโต๊ะเปล่า"
										})]
									}, t.id);
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 pt-4 border-t border-slate-100 shrink-0 flex justify-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsMoveSelectorOpen(false),
								className: "px-5 py-2.5 rounded-md border border-slate-200 hover:bg-slate-50 font-bold text-xs",
								children: "ยกเลิก"
							})
						})
					]
				})]
			}),
			confirmDialog?.isOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-[60] flex items-center justify-center p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/60 backdrop-blur-sm",
					onClick: () => setConfirmDialog(null)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-[28px] p-6 w-full max-w-sm z-10 border border-[#ece4d6] shadow-2xl relative text-[#002e47] flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-black mb-2",
							children: confirmDialog.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-500 font-semibold leading-relaxed mb-6",
							children: confirmDialog.message
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 justify-end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setConfirmDialog(null),
								className: "px-4 py-2 rounded-md border border-red-500 text-red-500 hover:bg-red-50 bg-white font-bold text-xs cursor-pointer transition",
								children: "ยกเลิก"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: async () => {
									const onConf = confirmDialog.onConfirm;
									setConfirmDialog(null);
									await onConf();
								},
								className: "px-4 py-2 rounded-md bg-[#002e47] hover:bg-[#002e47]/90 text-white font-bold text-xs cursor-pointer border border-transparent transition",
								children: "ยืนยัน"
							})]
						})
					]
				})]
			})
		]
	});
}
function MenuManagementView() {
	const [menuItems, setMenuItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [categoryFilter, setCategoryFilter] = (0, import_react.useState)("all");
	const [editItem, setEditItem] = (0, import_react.useState)(null);
	const [isFormOpen, setIsFormOpen] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploadingImage, setUploadingImage] = (0, import_react.useState)(false);
	const fileInputRef = (0, import_react.useRef)(null);
	const [formName, setFormName] = (0, import_react.useState)("");
	const [formDesc, setFormDesc] = (0, import_react.useState)("");
	const [formPrice, setFormPrice] = (0, import_react.useState)("");
	const [formCategory, setFormCategory] = (0, import_react.useState)("signature");
	const [formIsSpicy, setFormIsSpicy] = (0, import_react.useState)(false);
	const [formImageUrl, setFormImageUrl] = (0, import_react.useState)("");
	const [formImagePath, setFormImagePath] = (0, import_react.useState)("");
	const [formOptions, setFormOptions] = (0, import_react.useState)([]);
	const [formAddons, setFormAddons] = (0, import_react.useState)([]);
	const [formStaffNote, setFormStaffNote] = (0, import_react.useState)("");
	const fetchMenuItems = async () => {
		setLoading(true);
		try {
			const { data, error } = await supabase.from("menu_items").select("*").order("sort_order", { ascending: true });
			if (!error && data) setMenuItems(data);
			else setMenuItems(MENU.map((m, i) => ({
				id: m.id,
				name: m.name,
				description: m.desc,
				price: m.price,
				image: m.image,
				image_url: null,
				category: m.category,
				is_available: true,
				is_spicy: m.spicy || false,
				sort_order: i,
				options: m.options || null,
				addons: m.addons || null,
				staff_note: null
			})));
		} catch {
			setMenuItems(MENU.map((m, i) => ({
				id: m.id,
				name: m.name,
				description: m.desc,
				price: m.price,
				image: m.image,
				image_url: null,
				category: m.category,
				is_available: true,
				is_spicy: m.spicy || false,
				sort_order: i,
				options: m.options || null,
				addons: m.addons || null,
				staff_note: null
			})));
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchMenuItems();
		const ch = supabase.channel("menu-items-realtime").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "menu_items"
		}, (payload) => {
			if (payload.eventType === "DELETE") setMenuItems((prev) => prev.filter((m) => m.id !== payload.old.id));
			else if (payload.eventType === "INSERT") setMenuItems((prev) => {
				if (prev.some((m) => m.id === payload.new.id)) return prev;
				return [...prev, payload.new].sort((a, b) => a.sort_order - b.sort_order);
			});
			else if (payload.eventType === "UPDATE") setMenuItems((prev) => prev.map((m) => m.id === payload.new.id ? {
				...m,
				...payload.new
			} : m));
		}).subscribe();
		return () => {
			supabase.removeChannel(ch);
		};
	}, []);
	const openAddForm = () => {
		setEditItem(null);
		setFormName("");
		setFormDesc("");
		setFormPrice("");
		setFormCategory("signature");
		setFormIsSpicy(false);
		setFormImageUrl("");
		setFormImagePath("");
		setFormOptions([]);
		setFormAddons([]);
		setFormStaffNote("");
		setIsFormOpen(true);
	};
	const openEditForm = (item) => {
		setEditItem(item);
		setFormName(item.name);
		setFormDesc(item.description || "");
		setFormPrice(String(item.price));
		setFormCategory(item.category);
		setFormIsSpicy(item.is_spicy);
		setFormImageUrl(item.image_url || item.image || "");
		setFormImagePath(item.image || "");
		setFormOptions(Array.isArray(item.options) ? item.options.map((og) => ({
			id: og.id || String(Math.random()),
			name: og.name || "",
			choices: Array.isArray(og.choices) ? og.choices : []
		})) : []);
		setFormAddons(Array.isArray(item.addons) ? item.addons.map((a) => ({
			id: a.id || String(Math.random()),
			name: a.name || "",
			price: Number(a.price) || 0
		})) : []);
		setFormStaffNote(item.staff_note || "");
		setIsFormOpen(true);
	};
	const handleImageUpload = async (file) => {
		setUploadingImage(true);
		try {
			const ext = file.name.split(".").pop();
			const fileName = `menu_${Date.now()}.${ext}`;
			const { data, error } = await supabase.storage.from("menu-images").upload(fileName, file, {
				upsert: true,
				contentType: file.type
			});
			if (error) throw error;
			const { data: urlData } = supabase.storage.from("menu-images").getPublicUrl(data.path);
			setFormImageUrl(urlData.publicUrl);
		} catch (e) {
			console.warn("Image upload failed:", e?.message);
			const reader = new FileReader();
			reader.onload = (ev) => setFormImageUrl(ev.target?.result);
			reader.readAsDataURL(file);
		} finally {
			setUploadingImage(false);
		}
	};
	const generateId = (name) => {
		return "m_" + name.replace(/[^a-zA-Z0-9ก-๙]/g, "_").toLowerCase().slice(0, 30) + "_" + Date.now();
	};
	const saveMenuItem = async () => {
		if (!formName.trim() || !formPrice) return;
		setSaving(true);
		const price = parseFloat(formPrice);
		const payload = {
			name: formName.trim(),
			description: formDesc.trim() || null,
			price,
			category: formCategory,
			is_spicy: formIsSpicy,
			is_available: editItem ? editItem.is_available : true,
			image: formImagePath || null,
			image_url: formImageUrl || null,
			options: formOptions.length > 0 ? formOptions : null,
			addons: formAddons.length > 0 ? formAddons : null,
			staff_note: formStaffNote.trim() || null,
			sort_order: editItem ? editItem.sort_order : menuItems.length
		};
		try {
			if (editItem) {
				const { error } = await supabase.from("menu_items").update(payload).eq("id", editItem.id);
				if (error) throw error;
				setMenuItems((prev) => prev.map((m) => m.id === editItem.id ? {
					...m,
					...payload
				} : m));
			} else {
				const newId = generateId(formName);
				const { data, error } = await supabase.from("menu_items").insert({
					...payload,
					id: newId
				}).select().single();
				if (error) throw error;
				setMenuItems((prev) => {
					if (prev.some((m) => m.id === data.id)) return prev;
					return [...prev, data].sort((a, b) => a.sort_order - b.sort_order);
				});
			}
			setIsFormOpen(false);
		} catch (e) {
			alert("บันทึกไม่สำเร็จ: " + (e?.message || "เกิดข้อผิดพลาด"));
		} finally {
			setSaving(false);
		}
	};
	const deleteMenuItem = async (item) => {
		if (!confirm(`คุณต้องการลบเมนู "${item.name}" ออกจากระบบใช่หรือไม่?`)) return;
		try {
			const { error } = await supabase.from("menu_items").delete().eq("id", item.id);
			if (error) throw error;
			setMenuItems((prev) => prev.filter((m) => m.id !== item.id));
			if (isFormOpen && editItem?.id === item.id) setIsFormOpen(false);
		} catch (e) {
			alert("ลบไม่สำเร็จ: " + (e?.message || "เกิดข้อผิดพลาด"));
		}
	};
	const toggleAvailability = async (item) => {
		const next = !item.is_available;
		setMenuItems((prev) => prev.map((m) => m.id === item.id ? {
			...m,
			is_available: next
		} : m));
		try {
			await supabase.from("menu_items").update({ is_available: next }).eq("id", item.id);
		} catch {}
	};
	const addOptionGroup = () => {
		setFormOptions((prev) => [...prev, {
			id: "og_" + Date.now(),
			name: "",
			choices: []
		}]);
	};
	const removeOptionGroup = (idx) => {
		setFormOptions((prev) => prev.filter((_, i) => i !== idx));
	};
	const updateOptionGroupName = (idx, name) => {
		setFormOptions((prev) => prev.map((og, i) => i === idx ? {
			...og,
			name
		} : og));
	};
	const addChoice = (ogIdx) => {
		setFormOptions((prev) => prev.map((og, i) => i === ogIdx ? {
			...og,
			choices: [...og.choices, {
				id: "c_" + Date.now(),
				label: "",
				price: void 0
			}]
		} : og));
	};
	const removeChoice = (ogIdx, cIdx) => {
		setFormOptions((prev) => prev.map((og, i) => i === ogIdx ? {
			...og,
			choices: og.choices.filter((_, ci) => ci !== cIdx)
		} : og));
	};
	const updateChoice = (ogIdx, cIdx, field, value) => {
		setFormOptions((prev) => prev.map((og, i) => i === ogIdx ? {
			...og,
			choices: og.choices.map((c, ci) => ci === cIdx ? {
				...c,
				[field]: field === "price" ? value === "" ? void 0 : Number(value) : value
			} : c)
		} : og));
	};
	const addAddon = () => {
		setFormAddons((prev) => [...prev, {
			id: "a_" + Date.now(),
			name: "",
			price: 0
		}]);
	};
	const removeAddon = (idx) => {
		setFormAddons((prev) => prev.filter((_, i) => i !== idx));
	};
	const updateAddon = (idx, field, value) => {
		setFormAddons((prev) => prev.map((a, i) => i === idx ? {
			...a,
			[field]: field === "price" ? Number(value) : value
		} : a));
	};
	const filtered = menuItems.filter((m) => {
		const matchSearch = search === "" || m.name.toLowerCase().includes(search.toLowerCase());
		const matchCat = categoryFilter === "all" || m.category === categoryFilter;
		return matchSearch && matchCat;
	});
	const getCatLabel = (catId) => MENU_CATEGORIES.find((c) => c.id === catId)?.label || catId;
	const getCatEmoji = (catId) => MENU_CATEGORIES.find((c) => c.id === catId)?.emoji || "🍽️";
	const getDisplayImage = (item) => item.image_url || item.image || "";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col lg:flex-row gap-6 flex-1 min-h-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 lg:max-w-[60%] flex flex-col gap-4 min-h-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-[#ece4d6] rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-start sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
								size: 14,
								className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "ค้นหาเมนูอาหาร...",
								value: search,
								onChange: (e) => setSearch(e.target.value),
								className: "w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl text-sm font-bold text-[#002e47] focus:outline-none focus:ring-2 focus:ring-[#002e47]/20 bg-slate-50"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: categoryFilter,
							onChange: (e) => setCategoryFilter(e.target.value),
							className: "border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-[#002e47] focus:outline-none bg-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "all",
								children: "ทุกหมวดหมู่"
							}), MENU_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
								value: c.id,
								children: [
									c.emoji,
									" ",
									c.label
								]
							}, c.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: openAddForm,
							className: "flex items-center gap-1.5 bg-[#002e47] hover:bg-[#003a5c] text-white text-xs font-black px-4 py-2.5 rounded-xl transition shadow-sm shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "เพิ่มเมนู" })]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white border border-[#ece4d6] rounded-2xl p-3 shadow-sm text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-black text-[#002e47]",
								children: menuItems.length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-bold text-slate-500",
								children: "รายการทั้งหมด"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white border border-emerald-200 rounded-2xl p-3 shadow-sm text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-black text-emerald-600",
								children: menuItems.filter((m) => m.is_available).length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-bold text-slate-500",
								children: "มีจำหน่าย"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white border border-slate-200 rounded-2xl p-3 shadow-sm text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-2xl font-black text-slate-400",
								children: menuItems.filter((m) => !m.is_available).length
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-bold text-slate-500",
								children: "หมดชั่วคราว"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-[#ece4d6] rounded-3xl shadow-sm flex-1 overflow-hidden flex flex-col",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 border-b border-[#ece4d6] flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "font-black text-[#002e47] text-sm",
							children: [
								"รายการเมนูอาหาร (",
								filtered.length,
								")"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: fetchMenuItems,
							className: "text-xs font-bold text-slate-500 hover:text-[#002e47] transition",
							children: "🔄 รีเฟรช"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto no-scrollbar divide-y divide-slate-50",
						children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-12 text-center text-slate-400 font-bold",
							children: "กำลังโหลดเมนู..."
						}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-12 text-center text-slate-400 font-bold",
							children: "ไม่พบเมนูที่ค้นหา"
						}) : filtered.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center gap-3 p-3 hover:bg-slate-50 transition group ${!item.is_available ? "opacity-60" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-14 w-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 flex items-center justify-center",
									children: getDisplayImage(item) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: getDisplayImage(item),
										alt: item.name,
										className: "h-full w-full object-cover",
										onError: (e) => {
											e.target.style.display = "none";
										}
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-2xl",
										children: getCatEmoji(item.category)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-black text-[#002e47] text-sm truncate",
												children: item.name
											}), item.is_spicy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
												size: 11,
												className: "text-red-500 shrink-0"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 mt-0.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] bg-[#002e47]/5 text-[#002e47] px-1.5 py-0.5 rounded font-bold",
													children: [
														getCatEmoji(item.category),
														" ",
														getCatLabel(item.category)
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "font-black text-[#002e47] text-xs",
													children: ["฿", item.price]
												}),
												!item.is_available && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[9px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded font-black",
													children: "หมดชั่วคราว"
												})
											]
										}),
										item.staff_note && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded mt-0.5 font-semibold truncate",
											children: ["📝 ", item.staff_note]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => toggleAvailability(item),
											title: item.is_available ? "ซ่อนชั่วคราว" : "เปิดจำหน่าย",
											className: `p-1.5 rounded-lg border transition ${item.is_available ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100" : "bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200"}`,
											children: item.is_available ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 13 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 13 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => openEditForm(item),
											className: "p-1.5 rounded-lg border bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100 transition",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PenLine, { size: 13 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => deleteMenuItem(item),
											className: "p-1.5 rounded-lg border bg-red-50 border-red-200 text-red-500 hover:bg-red-100 transition",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 13 })
										})
									]
								})
							]
						}, item.id))
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `w-full lg:w-[42%] ${isFormOpen ? "block" : "hidden lg:flex"} flex flex-col`,
			children: isFormOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white border border-[#ece4d6] rounded-3xl shadow-sm flex flex-col h-full max-h-[calc(100vh-160px)] overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 border-b border-[#ece4d6] flex items-center justify-between shrink-0 bg-[#002e47] rounded-t-3xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-black text-white text-base",
							children: editItem ? "✏️ แก้ไขเมนู" : "➕ เพิ่มเมนูใหม่"
						}), editItem && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] text-white/60 font-bold mt-0.5",
							children: ["ID: ", editItem.id]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIsFormOpen(false),
							className: "h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 overflow-y-auto no-scrollbar p-5 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-black text-slate-600 block mb-2 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { size: 12 }), " รูปภาพเมนู"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative h-36 rounded-2xl border-2 border-dashed border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center cursor-pointer hover:border-[#002e47]/40 transition group",
									onClick: () => fileInputRef.current?.click(),
									children: formImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: formImageUrl,
										alt: "preview",
										className: "h-full w-full object-cover",
										onError: () => setFormImageUrl("")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-white font-black text-xs",
											children: "เปลี่ยนรูป"
										})
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-center text-slate-400",
										children: uploadingImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-bold",
											children: "กำลังอัปโหลด..."
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
												size: 28,
												className: "mx-auto mb-2 opacity-30"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs font-bold",
												children: "คลิกเพื่ออัปโหลดรูปอาหาร"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] text-slate-400",
												children: "JPG, PNG, WebP"
											})
										] })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileInputRef,
									type: "file",
									accept: "image/*",
									className: "hidden",
									onChange: async (e) => {
										if (e.target.files?.[0]) {
											await handleImageUpload(e.target.files[0]);
											e.target.value = "";
										}
									}
								}),
								formImageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										value: formImageUrl,
										onChange: (e) => setFormImageUrl(e.target.value),
										placeholder: "หรือวาง URL รูปภาพ",
										className: "flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-bold focus:outline-none focus:ring-1 focus:ring-[#002e47]/20"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setFormImageUrl(""),
										className: "text-[10px] text-red-500 font-bold hover:text-red-700 px-2",
										children: "ลบ"
									})]
								}),
								!formImageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: formImageUrl,
									onChange: (e) => setFormImageUrl(e.target.value),
									placeholder: "หรือวาง URL รูปภาพ เช่น https://... หรือ /meal/...",
									className: "mt-2 w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-[11px] font-bold focus:outline-none focus:ring-1 focus:ring-[#002e47]/20"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-black text-slate-600 block mb-1.5 flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { size: 12 }),
									" ชื่อเมนู ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-red-500",
										children: "*"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								placeholder: "ชื่อเมนูอาหาร เช่น กระเพราหมูสับ",
								value: formName,
								onChange: (e) => setFormName(e.target.value),
								className: "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-[#002e47] focus:outline-none focus:ring-2 focus:ring-[#002e47]/20"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "text-xs font-black text-slate-600 block mb-1.5 flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 12 }), " คำอธิบายเมนู"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								placeholder: "บรรยายส่วนประกอบ รสชาติ วัตถุดิบหลัก...",
								value: formDesc,
								onChange: (e) => setFormDesc(e.target.value),
								rows: 2,
								className: "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-semibold text-[#002e47] focus:outline-none focus:ring-2 focus:ring-[#002e47]/20 resize-none"
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-black text-slate-600 block mb-1.5 flex items-center gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { size: 12 }),
										" ราคา (บาท) ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-red-500",
											children: "*"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									placeholder: "0",
									min: 0,
									value: formPrice,
									onChange: (e) => setFormPrice(e.target.value),
									className: "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-black text-[#002e47] focus:outline-none focus:ring-2 focus:ring-[#002e47]/20"
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-black text-slate-600 block mb-1.5",
									children: "หมวดหมู่"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: formCategory,
									onChange: (e) => setFormCategory(e.target.value),
									className: "w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-bold text-[#002e47] focus:outline-none bg-white",
									children: MENU_CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: c.id,
										children: [
											c.emoji,
											" ",
											c.label
										]
									}, c.id))
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between bg-slate-50 rounded-xl p-3 border border-slate-200",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
										size: 16,
										className: "text-red-500"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-bold text-[#002e47]",
										children: "เมนูนี้มีรสเผ็ด"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setFormIsSpicy(!formIsSpicy),
									className: `relative h-6 w-11 rounded-full transition-colors duration-200 ${formIsSpicy ? "bg-red-500" : "bg-slate-300"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${formIsSpicy ? "translate-x-[22px]" : "translate-x-0.5"}` })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-xs font-black text-slate-600 flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Grip, { size: 12 }), " ตัวเลือก (Options) — เช่น ระดับความเผ็ด"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: addOptionGroup,
										className: "text-[10px] font-black text-[#002e47] bg-[#002e47]/10 hover:bg-[#002e47]/20 px-2.5 py-1 rounded-lg transition",
										children: "+ เพิ่มกลุ่ม"
									})]
								}),
								formOptions.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-slate-400 italic font-bold text-center py-3 bg-slate-50 rounded-xl border border-dashed border-slate-200",
									children: "ยังไม่มีตัวเลือก กด \"+ เพิ่มกลุ่ม\" เพื่อเริ่ม"
								}),
								formOptions.map((og, ogIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border border-slate-200 rounded-xl p-3 mb-2 bg-slate-50/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "ชื่อกลุ่มตัวเลือก เช่น ระดับความเผ็ด",
											value: og.name,
											onChange: (e) => updateOptionGroupName(ogIdx, e.target.value),
											className: "flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-[#002e47]/20"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => removeOptionGroup(ogIdx),
											className: "text-red-500 hover:text-red-700 p-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 12 })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1.5",
										children: [og.choices.map((c, cIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "text",
													placeholder: "ชื่อตัวเลือก เช่น เผ็ดมาก",
													value: c.label,
													onChange: (e) => updateChoice(ogIdx, cIdx, "label", e.target.value),
													className: "flex-1 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold focus:outline-none"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "number",
													placeholder: "บวก฿",
													min: 0,
													value: c.price ?? "",
													onChange: (e) => updateChoice(ogIdx, cIdx, "price", e.target.value),
													className: "w-16 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold focus:outline-none"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => removeChoice(ogIdx, cIdx),
													className: "text-red-400 hover:text-red-600 p-1",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 11 })
												})
											]
										}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => addChoice(ogIdx),
											className: "text-[10px] font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 mt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 10 }), " เพิ่ม choice"]
										})]
									})]
								}, og.id))
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-xs font-black text-slate-600 flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 12 }), " วัตถุดิบเพิ่ม (Addons) — เช่น ไข่ดาว, หมูกรอบ"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: addAddon,
										className: "text-[10px] font-black text-[#002e47] bg-[#002e47]/10 hover:bg-[#002e47]/20 px-2.5 py-1 rounded-lg transition",
										children: "+ เพิ่ม"
									})]
								}),
								formAddons.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-slate-400 italic font-bold text-center py-3 bg-slate-50 rounded-xl border border-dashed border-slate-200",
									children: "ยังไม่มี addons"
								}),
								formAddons.map((a, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 mb-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "text",
											placeholder: "ชื่อ addon เช่น ไข่ดาว",
											value: a.name,
											onChange: (e) => updateAddon(idx, "name", e.target.value),
											className: "flex-1 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold focus:outline-none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-bold text-slate-500",
											children: "+฿"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											placeholder: "0",
											min: 0,
											value: a.price,
											onChange: (e) => updateAddon(idx, "price", e.target.value),
											className: "w-16 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold focus:outline-none"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => removeAddon(idx),
											className: "text-red-400 hover:text-red-600 p-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 12 })
										})
									]
								}, a.id))
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-black text-slate-600 block mb-1.5 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { size: 12 }), " หมายเหตุพนักงาน (Staff Note)"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									placeholder: "เช่น: วัตถุดิบในสต็อก: หมูสด, กระเพรา / แจ้งครัวแยกเสิร์ฟ...",
									value: formStaffNote,
									onChange: (e) => setFormStaffNote(e.target.value),
									rows: 2,
									className: "w-full border border-amber-200 bg-amber-50 rounded-xl px-3 py-2.5 text-sm font-semibold text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-300/40 resize-none placeholder:text-amber-400"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-amber-600 font-bold mt-1",
									children: "📝 ข้อความนี้จะปรากฏบนรายการเมนูให้พนักงานเห็น"
								})
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5 border-t border-[#ece4d6] shrink-0 flex gap-3 bg-slate-50 rounded-b-3xl",
						children: [
							editItem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => deleteMenuItem(editItem),
								className: "px-4 py-2.5 rounded-xl border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 font-bold text-xs transition",
								children: "🗑️ ลบเมนูนี้"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setIsFormOpen(false),
								className: "px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition",
								children: "ยกเลิก"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: saveMenuItem,
								disabled: !formName.trim() || !formPrice || saving,
								className: "px-6 py-2.5 rounded-xl bg-[#002e47] hover:bg-[#003a5c] text-white font-black text-xs transition shadow-sm disabled:opacity-50",
								children: saving ? "กำลังบันทึก..." : editItem ? "💾 บันทึกการแก้ไข" : "✅ เพิ่มเมนู"
							})
						]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white border border-[#ece4d6] rounded-3xl shadow-sm flex-1 flex flex-col items-center justify-center text-center p-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-6xl mb-4",
						children: "📋"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-black text-[#002e47] text-base mb-2",
						children: "จัดการเมนูอาหาร"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-slate-500 font-semibold max-w-[220px] leading-relaxed mb-6",
						children: "เลือกเมนูจากรายการด้านซ้ายเพื่อแก้ไข หรือกด \"+ เพิ่มเมนู\" เพื่อสร้างเมนูใหม่"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: openAddForm,
						className: "flex items-center gap-2 bg-[#002e47] hover:bg-[#003a5c] text-white font-black text-sm px-5 py-3 rounded-2xl transition shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "เพิ่มเมนูใหม่" })]
					})
				]
			})
		})]
	});
}
function StockManagementView({ handleLogout }) {
	const [ingredients, setIngredients] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [filterLowStock, setFilterLowStock] = (0, import_react.useState)(false);
	const [isAddModalOpen, setIsAddModalOpen] = (0, import_react.useState)(false);
	const [isEditModalOpen, setIsEditModalOpen] = (0, import_react.useState)(false);
	const [editingIng, setEditingIng] = (0, import_react.useState)(null);
	const [formName, setFormName] = (0, import_react.useState)("");
	const [formQty, setFormQty] = (0, import_react.useState)(1e3);
	const [formUnit, setFormUnit] = (0, import_react.useState)("g");
	const [formThreshold, setFormThreshold] = (0, import_react.useState)(200);
	const fetchIngredients = async () => {
		setLoading(true);
		try {
			const { data, error } = await supabase.from("ingredients").select("*").order("name", { ascending: true });
			if (!error && data && data.length > 0) {
				setIngredients(data);
				localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(data));
			} else {
				const local = localStorage.getItem("ran-lung-get-mock-ingredients");
				if (local) setIngredients(JSON.parse(local));
				else {
					const defaultIngs = [
						{
							id: "ing_1",
							name: "หมูสับ",
							quantity: 1e3,
							unit: "g",
							min_threshold: 200
						},
						{
							id: "ing_2",
							name: "หมูกรอบ",
							quantity: 1e3,
							unit: "g",
							min_threshold: 200
						},
						{
							id: "ing_3",
							name: "หมูชิ้น",
							quantity: 1e3,
							unit: "g",
							min_threshold: 200
						},
						{
							id: "ing_4",
							name: "ไก่สับ",
							quantity: 1e3,
							unit: "g",
							min_threshold: 200
						},
						{
							id: "ing_5",
							name: "ไก่ต้ม",
							quantity: 1e3,
							unit: "g",
							min_threshold: 200
						},
						{
							id: "ing_6",
							name: "เนื้อ",
							quantity: 1e3,
							unit: "g",
							min_threshold: 200
						},
						{
							id: "ing_7",
							name: "หมึก",
							quantity: 1e3,
							unit: "g",
							min_threshold: 200
						},
						{
							id: "ing_8",
							name: "กุ้ง",
							quantity: 1e3,
							unit: "g",
							min_threshold: 200
						},
						{
							id: "ing_9",
							name: "หอยลาย",
							quantity: 1e3,
							unit: "g",
							min_threshold: 200
						},
						{
							id: "ing_10",
							name: "ไข่ไก่",
							quantity: 100,
							unit: "pcs",
							min_threshold: 15
						},
						{
							id: "ing_11",
							name: "ไส้กรอก",
							quantity: 50,
							unit: "pcs",
							min_threshold: 10
						},
						{
							id: "ing_12",
							name: "กุนเชียง",
							quantity: 50,
							unit: "pcs",
							min_threshold: 10
						}
					];
					setIngredients(defaultIngs);
					localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(defaultIngs));
				}
			}
		} catch (e) {
			const local = localStorage.getItem("ran-lung-get-mock-ingredients");
			if (local) setIngredients(JSON.parse(local));
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchIngredients();
		const ch = supabase.channel("ingredients-staff-realtime").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "ingredients"
		}, () => {
			fetchIngredients();
		}).subscribe();
		return () => {
			supabase.removeChannel(ch);
		};
	}, []);
	const handleQuickAdd = async (id, amount) => {
		const target = ingredients.find((i) => i.id === id);
		if (!target) return;
		const nextQty = Number(target.quantity) + amount;
		const updated = ingredients.map((i) => i.id === id ? {
			...i,
			quantity: nextQty
		} : i);
		setIngredients(updated);
		localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(updated));
		try {
			await supabase.from("ingredients").update({
				quantity: nextQty,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", id);
		} catch (e) {
			console.warn("Local quick add stock saved.");
		}
	};
	const openAddModal = () => {
		setFormName("");
		setFormQty(1e3);
		setFormUnit("g");
		setFormThreshold(200);
		setIsAddModalOpen(true);
	};
	const openEditModal = (ing) => {
		setEditingIng(ing);
		setFormName(ing.name);
		setFormQty(Number(ing.quantity));
		setFormUnit(ing.unit);
		setFormThreshold(Number(ing.min_threshold));
		setIsEditModalOpen(true);
	};
	const handleSaveNew = async () => {
		if (!formName.trim()) {
			alert("กรุณากรอกชื่อวัตถุดิบ");
			return;
		}
		if (formQty < 0 || formThreshold < 0) {
			alert("กรุณากรอกปริมาณที่ถูกต้อง");
			return;
		}
		const newIng = {
			id: "ing_" + Math.random().toString(36).substring(2, 9),
			name: formName,
			quantity: Number(formQty),
			unit: formUnit,
			min_threshold: Number(formThreshold),
			created_at: (/* @__PURE__ */ new Date()).toISOString(),
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		};
		const updated = [...ingredients, newIng];
		setIngredients(updated);
		localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(updated));
		setIsAddModalOpen(false);
		try {
			const { error } = await supabase.from("ingredients").insert({
				name: newIng.name,
				quantity: newIng.quantity,
				unit: newIng.unit,
				min_threshold: newIng.min_threshold
			});
			if (error) throw error;
			alert("เพิ่มวัตถุดิบใหม่เข้าสต็อกแล้ว!");
			fetchIngredients();
		} catch (e) {
			console.warn("Saved locally. Supabase error.");
			alert("บันทึกข้อมูลวัตถุดิบในบราวเซอร์นี้สำเร็จ! (หมายเหตุ: มีปัญหาเชื่อมต่อกับฐานข้อมูลหลัก)");
		}
	};
	const handleSaveEdit = async () => {
		if (!editingIng) return;
		if (!formName.trim()) {
			alert("กรุณากรอกชื่อวัตถุดิบ");
			return;
		}
		if (formQty < 0 || formThreshold < 0) {
			alert("กรุณากรอกปริมาณที่ถูกต้อง");
			return;
		}
		const updatedIng = {
			...editingIng,
			name: formName,
			quantity: Number(formQty),
			unit: formUnit,
			min_threshold: Number(formThreshold),
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		};
		const updated = ingredients.map((i) => i.id === editingIng.id ? updatedIng : i);
		setIngredients(updated);
		localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(updated));
		setIsEditModalOpen(false);
		try {
			const { error } = await supabase.from("ingredients").update({
				name: updatedIng.name,
				quantity: updatedIng.quantity,
				unit: updatedIng.unit,
				min_threshold: updatedIng.min_threshold,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", editingIng.id);
			if (error) throw error;
			alert("แก้ไขข้อมูลวัตถุดิบสำเร็จ!");
		} catch (e) {
			console.warn("Updated locally.");
			alert("อัปเดตข้อมูลในบราวเซอร์เครื่องนี้สำเร็จ! (หมายเหตุ: มีปัญหาเชื่อมต่อกับฐานข้อมูลหลัก)");
		}
	};
	const handleDeleteIng = async (id) => {
		if (!confirm("คุณต้องการลบวัตถุดิบนี้ออกจากสต็อกใช่หรือไม่?")) return;
		const updated = ingredients.filter((i) => i.id !== id);
		setIngredients(updated);
		localStorage.setItem("ran-lung-get-mock-ingredients", JSON.stringify(updated));
		try {
			const { error } = await supabase.from("ingredients").delete().eq("id", id);
			if (error) throw error;
			alert("ลบวัตถุดิบเสร็จสิ้น");
		} catch (e) {
			console.warn("Deleted locally.");
			alert("ลบข้อมูลออกจากบราวเซอร์เครื่องนี้สำเร็จ! (หมายเหตุ: มีปัญหาเชื่อมต่อกับฐานข้อมูลหลัก)");
		}
	};
	const filteredIngredients = (0, import_react.useMemo)(() => {
		if (filterLowStock) return ingredients.filter((i) => Number(i.quantity) <= Number(i.min_threshold));
		return ingredients;
	}, [ingredients, filterLowStock]);
	const lowStockCount = (0, import_react.useMemo)(() => {
		return ingredients.filter((i) => Number(i.quantity) <= Number(i.min_threshold)).length;
	}, [ingredients]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white border border-[#ece4d6] rounded-3xl p-5 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-black text-[#002e47]",
					children: "จัดการคลังวัตถุดิบ & สต็อก (Stock Management)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-slate-500 font-semibold mt-0.5",
					children: [
						"รวมวัตถุดิบทั้งหมด ",
						ingredients.length,
						" ชนิด"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2 w-full sm:w-auto shrink-0 justify-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: fetchIngredients,
						className: "bg-[#002e47]/5 border hover:bg-[#002e47]/10 text-[#002e47] text-xs font-black px-3.5 py-2.5 rounded-xl transition cursor-pointer",
						children: "🔄 โหลดใหม่"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: openAddModal,
						className: "bg-[#fcc14a] hover:bg-[#fcc14a]/90 text-[#002e47] text-xs font-black px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "เพิ่มวัตถุดิบ" })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-3 bg-white border border-[#ece4d6] p-4 rounded-3xl shrink-0 shadow-sm items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setFilterLowStock(false),
						className: `px-4 py-2 rounded-xl font-bold text-xs tracking-wider transition-all cursor-pointer ${!filterLowStock ? "bg-[#002e47] text-white shadow-inner" : "text-[#5a6e7a] hover:text-[#002e47] hover:bg-slate-50"}`,
						children: [
							"วัตถุดิบทั้งหมด (",
							ingredients.length,
							")"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setFilterLowStock(true),
						className: `relative flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs tracking-wider transition-all cursor-pointer ${filterLowStock ? "bg-red-500 text-white shadow-inner" : "text-red-500 hover:bg-red-50"}`,
						children: [lowStockCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-current animate-pulse shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"ของใกล้หมด / ต่ำกว่าเกณฑ์ (",
							lowStockCount,
							")"
						] })]
					})]
				})
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white border border-[#ece4d6] rounded-3xl p-16 text-center text-slate-400 font-bold shadow-sm",
				children: "กำลังดึงข้อมูลคลังสต็อก..."
			}) : filteredIngredients.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-white border border-[#ece4d6] rounded-3xl p-16 text-center text-slate-400 font-bold shadow-sm",
				children: filterLowStock ? "🎉 เยี่ยมมาก! ไม่มีวัตถุดิบใดที่ต่ำกว่าเกณฑ์แจ้งเตือน" : "❌ ไม่พบรายการวัตถุดิบ"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
				children: filteredIngredients.map((ing) => {
					const qty = Number(ing.quantity);
					const threshold = Number(ing.min_threshold);
					const isLow = qty <= threshold;
					const percentage = Math.min(100, Math.max(0, qty / (threshold * 3) * 100));
					let progressColor = "bg-emerald-500";
					if (isLow) progressColor = "bg-red-500 animate-pulse";
					else if (qty <= threshold * 1.5) progressColor = "bg-amber-500";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `bg-white border-2 rounded-3xl p-5 shadow-sm transition flex flex-col justify-between space-y-4 hover:shadow-md relative overflow-hidden border-[#ece4d6] ${isLow ? "border-red-200 bg-red-50/5" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-start gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-black text-[#002e47] text-sm flex items-center gap-1.5",
								children: [ing.name, isLow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-500",
									title: "ของใกล้หมดสต็อก!",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
										size: 15,
										className: "fill-red-100"
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] font-bold text-slate-400 mt-0.5",
								children: ["สถานะ: ", isLow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-red-600 font-black",
									children: "ต่ำกว่าเกณฑ์ (Low)"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-emerald-600 font-black",
									children: "ปกติ (Good)"
								})]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-base font-black ${isLow ? "text-red-600" : "text-[#002e47]"}`,
									children: qty.toLocaleString()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-slate-500 ml-1",
									children: ing.unit
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `h-full ${progressColor} transition-all duration-500`,
									style: { width: `${percentage}%` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between text-[9px] text-slate-400 font-bold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "เหลือน้อย" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										"เกณฑ์เตือน: ",
										threshold,
										" ",
										ing.unit
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "พอดี" })
								]
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "pt-4 border-t border-slate-100 flex flex-col gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-bold text-slate-400",
									children: "เติมด่วน:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex gap-1",
									children: ing.unit === "g" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleQuickAdd(ing.id, 500),
										className: "px-2 py-1 bg-slate-50 hover:bg-[#002e47] hover:text-white border border-slate-200 text-slate-600 rounded-lg text-[9px] font-black transition cursor-pointer",
										children: "+500g"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleQuickAdd(ing.id, 1e3),
										className: "px-2 py-1 bg-slate-50 hover:bg-[#002e47] hover:text-white border border-slate-200 text-slate-600 rounded-lg text-[9px] font-black transition cursor-pointer",
										children: "+1kg"
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleQuickAdd(ing.id, 10),
										className: "px-2 py-1 bg-slate-50 hover:bg-[#002e47] hover:text-white border border-slate-200 text-slate-600 rounded-lg text-[9px] font-black transition cursor-pointer",
										children: "+10 ชิ้น"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => handleQuickAdd(ing.id, 50),
										className: "px-2 py-1 bg-slate-50 hover:bg-[#002e47] hover:text-white border border-slate-200 text-slate-600 rounded-lg text-[9px] font-black transition cursor-pointer",
										children: "+50 ชิ้น"
									})] })
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-end gap-1.5 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => openEditModal(ing),
									className: "flex-1 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 font-bold text-[10px] rounded-xl hover:bg-slate-100 transition flex items-center justify-center gap-1 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { size: 11 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "แก้ไข / เติมละเอียด" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => handleDeleteIng(ing.id),
									className: "p-1.5 bg-red-50 border border-red-100 text-red-600 rounded-xl hover:bg-red-100 transition cursor-pointer",
									title: "ลบวัตถุดิบ",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 11 })
								})]
							})]
						})]
					}, ing.id);
				})
			}),
			(isAddModalOpen || isEditModalOpen) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/60 backdrop-blur-xs",
					onClick: () => {
						setIsAddModalOpen(false);
						setIsEditModalOpen(false);
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-[28px] p-6 w-full max-w-sm z-10 border border-[#ece4d6] shadow-2xl relative text-[#002e47] flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between items-center pb-4 border-b border-slate-100 mb-4 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-base font-black flex items-center gap-2",
								children: isAddModalOpen ? "➕ เพิ่มวัตถุดิบใหม่" : "📝 แก้ไขวัตถุดิบ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-500 font-semibold mt-0.5",
								children: "ระบุจำนวนหน่วยและเกณฑ์แจ้งเตือนคลังเหลือน้อย"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setIsAddModalOpen(false);
									setIsEditModalOpen(false);
								},
								className: "h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 cursor-pointer text-slate-500",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-slate-500 block mb-1.5",
									children: "ชื่อวัตถุดิบ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: formName,
									onChange: (e) => setFormName(e.target.value),
									placeholder: "เช่น พริกขี้หนูสวน, เนื้อปู",
									className: "w-full px-3 py-2 border border-[#ece4d6] rounded-xl text-xs font-bold text-[#002e47] focus:outline-none focus:ring-2 focus:ring-[#002e47]/10"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-bold text-slate-500 block mb-1.5",
										children: "ปริมาณสต็อก"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: formQty,
										onChange: (e) => setFormQty(Number(e.target.value)),
										className: "w-full px-3 py-2 border border-[#ece4d6] rounded-xl text-xs font-bold text-[#002e47] focus:outline-none focus:ring-2 focus:ring-[#002e47]/10"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "text-xs font-bold text-slate-500 block mb-1.5",
										children: "หน่วยนับ"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: formUnit,
										onChange: (e) => setFormUnit(e.target.value),
										className: "w-full px-3 py-2 border border-[#ece4d6] rounded-xl text-xs font-bold text-[#002e47] focus:outline-none focus:ring-2 focus:ring-[#002e47]/10 bg-white",
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
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "kg",
												children: "กิโลกรัม (kg)"
											})
										]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-bold text-slate-500 block mb-1.5",
									children: "ระดับแจ้งเตือนสต็อกต่ำสุด (Threshold)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									value: formThreshold,
									onChange: (e) => setFormThreshold(Number(e.target.value)),
									className: "w-full px-3 py-2 border border-[#ece4d6] rounded-xl text-xs font-bold text-[#002e47] focus:outline-none focus:ring-2 focus:ring-[#002e47]/10"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 pt-4 border-t border-slate-100 shrink-0 flex justify-end gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setIsAddModalOpen(false);
									setIsEditModalOpen(false);
								},
								className: "px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 font-bold text-xs cursor-pointer transition",
								children: "ยกเลิก"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: isAddModalOpen ? handleSaveNew : handleSaveEdit,
								className: "px-4 py-2 rounded-xl bg-[#002e47] hover:bg-[#002e47]/90 text-white font-black text-xs cursor-pointer transition shadow",
								children: "💾 บันทึกข้อมูล"
							})]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { KitchenMonitor as component };

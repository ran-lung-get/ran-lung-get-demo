import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-BbREKNGv.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as DollarSign, B as LayoutDashboard, C as ShieldAlert, R as LogOut, a as Users, c as UserPlus, f as TrendingUp, i as Utensils, nt as Clock, ot as CircleCheckBig, p as Trash2, w as Search } from "../_libs/lucide-react.mjs";
import { i as Area, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/captain-BAgG5hoc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BRAND = "#002e47";
function CaptainDashboard() {
	const navigate = useNavigate();
	const [users, setUsers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [search, setSearch] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)("dashboard");
	const [dateRange, setDateRange] = (0, import_react.useState)("today");
	const [dashboardData, setDashboardData] = (0, import_react.useState)(null);
	const [dashboardLoading, setDashboardLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function fetchDashboard() {
			if (activeTab !== "dashboard") return;
			setDashboardLoading(true);
			try {
				let startDate = /* @__PURE__ */ new Date();
				startDate.setHours(0, 0, 0, 0);
				if (dateRange === "week") startDate.setDate(startDate.getDate() - 7);
				else if (dateRange === "month") startDate.setDate(startDate.getDate() - 30);
				const { data: ordersData, error: ordersError } = await supabase.from("orders").select("id, total, created_at").eq("status", "completed").gte("created_at", startDate.toISOString());
				if (ordersError) throw ordersError;
				const safeOrders = ordersData || [];
				const totalSales = safeOrders.reduce((sum, o) => sum + (o.total || 0), 0);
				const totalOrders = safeOrders.length;
				const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
				const orderIds = safeOrders.map((o) => o.id);
				let bestSellers = [];
				if (orderIds.length > 0) {
					const { data: itemsData, error: itemsError } = await supabase.from("order_items").select("name, quantity, order_id, created_at").gte("created_at", startDate.toISOString());
					if (!itemsError && itemsData) {
						const validItems = itemsData.filter((item) => orderIds.includes(item.order_id));
						const itemCounts = {};
						validItems.forEach((item) => {
							itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
						});
						bestSellers = Object.entries(itemCounts).map(([name, quantity]) => ({
							name,
							quantity
						})).sort((a, b) => b.quantity - a.quantity).slice(0, 5);
					}
				}
				const hourCounts = {};
				for (let i = 8; i <= 22; i++) hourCounts[`${i}:00`] = 0;
				safeOrders.forEach((o) => {
					const key = `${new Date(o.created_at).getHours()}:00`;
					if (hourCounts[key] !== void 0) hourCounts[key]++;
					else hourCounts[key] = 1;
				});
				const peakHours = Object.entries(hourCounts).map(([hour, orders]) => ({
					hour,
					orders
				})).sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
				setDashboardData({
					totalSales,
					totalOrders,
					avgOrderValue,
					bestSellers,
					peakHours
				});
			} catch (err) {
				console.error("Failed to fetch dashboard data:", err);
			} finally {
				setDashboardLoading(false);
			}
		}
		fetchDashboard();
	}, [dateRange, activeTab]);
	(0, import_react.useEffect)(() => {
		async function checkAuth() {
			try {
				const { data: { session } } = await supabase.auth.getSession();
				if (!session) {
					window.location.href = "/login";
					return;
				}
				const { data, error } = await supabase.from("users").select("*").eq("auth_user_id", session.user.id).maybeSingle();
				if (error || !data || data.role !== "captain") {
					window.location.href = "/customer";
					return;
				}
				if (data.is_active === false) {
					alert("บัญชี Captain ของคุณอยู่ระหว่างรอการอนุมัติสิทธิ์ (Pending Approval)");
					await supabase.auth.signOut();
					window.location.href = "/login";
					return;
				}
				fetchUsers();
			} catch (err) {
				window.location.href = "/login";
			}
		}
		checkAuth();
		const channel = supabase.channel("captain-users-changes").on("postgres_changes", {
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
	async function fetchUsers() {
		setLoading(true);
		const { data, error } = await supabase.from("users").select("*").order("created_at", { ascending: false });
		if (error) console.error("Error fetching users:", error);
		else setUsers(data);
		setLoading(false);
	}
	async function handleLogout() {
		await supabase.auth.signOut();
		navigate({ to: "/login" });
	}
	async function handleDeleteUser(userId, authUserId) {
		if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้งานนี้? การกระทำนี้ไม่สามารถกู้คืนได้")) return;
		try {
			const { error } = await supabase.rpc("delete_user_by_captain", { target_user_id: authUserId });
			if (error) throw error;
			alert("ลบผู้ใช้งานสำเร็จ");
			fetchUsers();
		} catch (err) {
			alert("เกิดข้อผิดพลาดในการลบ: " + err.message);
		}
	}
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
			alert("เกิดข้อผิดพลาดในการเปลี่ยนสถานะ: " + err.message);
			fetchUsers();
		}
	};
	async function handleChangeRole(authUserId, newRole) {
		setUsers((prev) => prev.map((u) => u.auth_user_id === authUserId ? {
			...u,
			role: newRole
		} : u));
		try {
			const { error } = await supabase.rpc("update_user_role_by_captain", {
				target_user_id: authUserId,
				new_role: newRole
			});
			if (error) throw error;
		} catch (err) {
			alert("เกิดข้อผิดพลาดในการเปลี่ยน Role: " + err.message);
			fetchUsers();
		}
	}
	const filteredUsers = users.filter((u) => {
		const q = search.toLowerCase();
		return u.display_name && u.display_name.toLowerCase().includes(q) || u.email && u.email.toLowerCase().includes(q);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen w-full flex bg-[#f1f5f9] text-[#0f1f2b] font-prompt",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 shadow-sm z-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-6 border-b border-slate-100 flex items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-10 h-10 rounded-xl grid place-items-center shadow-inner",
							style: { background: `linear-gradient(135deg, ${BRAND}, #001a2c)` },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, {
								className: "text-[#fcc14a]",
								size: 20
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-bold text-lg leading-tight",
							style: { color: BRAND },
							children: "Captain"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase font-bold tracking-widest text-[#5a6e7a]",
							children: "Supreme Panel"
						})] })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex-1 p-4 space-y-1.5 overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("dashboard"),
							className: `w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${activeTab === "dashboard" ? "bg-[#002e47] text-white shadow-md shadow-blue-900/10" : "text-[#5a6e7a] hover:bg-slate-50 hover:text-[#002e47]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { size: 18 }), "ภาพรวมยอดขาย"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("users"),
							className: `w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${activeTab === "users" ? "bg-[#002e47] text-white shadow-md shadow-blue-900/10" : "text-[#5a6e7a] hover:bg-slate-50 hover:text-[#002e47]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 18 }), "จัดการผู้ใช้งาน"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab("approvals"),
							className: `w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${activeTab === "approvals" ? "bg-[#002e47] text-white shadow-md shadow-blue-900/10" : "text-[#5a6e7a] hover:bg-slate-50 hover:text-[#002e47]"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 18 }), "คำขออนุมัติสิทธิ์"]
							}), users.filter((u) => u.is_active === false && (u.role === "staff" || u.role === "admin" || u.role === "captain")).length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-rose-500 text-white text-[10px] px-2 py-0.5 rounded-full",
								children: users.filter((u) => u.is_active === false && (u.role === "staff" || u.role === "admin" || u.role === "captain")).length
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-4 border-t border-slate-100",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleLogout,
						className: "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 16 }), "ออกจากระบบ"]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "flex-1 flex flex-col h-screen overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shrink-0 sticky top-0 z-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold",
					style: { color: BRAND },
					children: activeTab === "dashboard" ? "ภาพรวมยอดขาย (Dashboard)" : "ระบบจัดการผู้ใช้งาน"
				}), activeTab !== "dashboard" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-72",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-400",
						size: 18
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "ค้นหาชื่อ, อีเมล...",
						value: search,
						onChange: (e) => setSearch(e.target.value),
						className: "w-full pl-10 pr-4 py-2 bg-slate-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#002e47]/20 transition-all"
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto p-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-5xl mx-auto",
					children: activeTab === "dashboard" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 bg-white p-2 rounded-xl border border-slate-200 w-fit",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setDateRange("today"),
									className: `px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${dateRange === "today" ? "bg-[#002e47] text-white" : "text-slate-500 hover:bg-slate-100"}`,
									children: "วันนี้"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setDateRange("week"),
									className: `px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${dateRange === "week" ? "bg-[#002e47] text-white" : "text-slate-500 hover:bg-slate-100"}`,
									children: "7 วันล่าสุด"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setDateRange("month"),
									className: `px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${dateRange === "month" ? "bg-[#002e47] text-white" : "text-slate-500 hover:bg-slate-100"}`,
									children: "30 วันล่าสุด"
								})
							]
						}), dashboardLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-20 text-center text-slate-400",
							children: "กำลังโหลดข้อมูล..."
						}) : dashboardData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 md:grid-cols-3 gap-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { size: 24 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-slate-500 font-medium",
										children: "ยอดขายรวม"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-2xl font-bold",
										style: { color: BRAND },
										children: ["฿", dashboardData.totalSales.toLocaleString()]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 24 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-slate-500 font-medium",
										children: "จำนวนออเดอร์สำเร็จ"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl font-bold",
										style: { color: BRAND },
										children: dashboardData.totalOrders.toLocaleString()
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 24 })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-slate-500 font-medium",
										children: "ยอดเฉลี่ยต่อออเดอร์"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-2xl font-bold",
										style: { color: BRAND },
										children: ["฿", dashboardData.avgOrderValue.toFixed(2)]
									})] })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-lg font-bold mb-4 flex items-center gap-2",
									style: { color: BRAND },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
										size: 18,
										className: "text-blue-500"
									}), "ช่วงเวลาออเดอร์ (Peak Hours)"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-64 w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: "100%",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
											data: dashboardData.peakHours,
											margin: {
												top: 10,
												right: 10,
												left: -20,
												bottom: 0
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
													id: "colorOrders",
													x1: "0",
													y1: "0",
													x2: "0",
													y2: "1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
														offset: "5%",
														stopColor: "#002e47",
														stopOpacity: .3
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
														offset: "95%",
														stopColor: "#002e47",
														stopOpacity: 0
													})]
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
													dataKey: "hour",
													axisLine: false,
													tickLine: false,
													tick: {
														fontSize: 12,
														fill: "#64748b"
													},
													dy: 10
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
													axisLine: false,
													tickLine: false,
													tick: {
														fontSize: 12,
														fill: "#64748b"
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
													contentStyle: {
														borderRadius: "12px",
														border: "none",
														boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
													},
													cursor: {
														stroke: "#cbd5e1",
														strokeWidth: 1,
														strokeDasharray: "4 4"
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
													type: "monotone",
													dataKey: "orders",
													stroke: "#002e47",
													strokeWidth: 3,
													fillOpacity: 1,
													fill: "url(#colorOrders)"
												})
											]
										})
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-white p-6 rounded-2xl border border-slate-200 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "text-lg font-bold mb-4 flex items-center gap-2",
									style: { color: BRAND },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, {
										size: 18,
										className: "text-orange-500"
									}), "เมนูยอดฮิต"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-4",
									children: dashboardData.bestSellers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-slate-400 text-center py-8",
										children: "ไม่มีข้อมูล"
									}) : dashboardData.bestSellers.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3 overflow-hidden",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0",
												children: idx + 1
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium text-slate-700 truncate",
												children: item.name
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-sm font-bold bg-slate-50 px-2 py-1 rounded text-slate-600 shrink-0",
											children: [item.quantity, " จาน"]
										})]
									}, idx))
								})]
							})]
						})] }) : null]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm whitespace-nowrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "bg-slate-50 text-slate-500 font-medium",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-6 py-4",
										children: "ผู้ใช้งาน"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-6 py-4",
										children: "อีเมล"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-6 py-4",
										children: "Role"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-6 py-4",
										children: "สถานะ"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-6 py-4 text-right",
										children: "จัดการ"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-slate-100",
								children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 5,
									className: "px-6 py-8 text-center text-slate-400",
									children: "กำลังโหลดข้อมูล..."
								}) }) : filteredUsers.filter((u) => {
									if (activeTab === "approvals") return u.is_active === false;
									return u.is_active !== false;
								}).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 5,
									className: "px-6 py-8 text-center text-slate-400",
									children: activeTab === "approvals" ? "ไม่มีคำขออนุมัติที่รอดำเนินการ" : "ไม่พบผู้ใช้งาน"
								}) }) : filteredUsers.filter((u) => {
									if (activeTab === "approvals") return u.is_active === false;
									return u.is_active !== false;
								}).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-slate-50 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-slate-800",
												children: u.display_name
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4 text-slate-500",
											children: u.email || "-"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
												value: u.role || "customer",
												onChange: (e) => handleChangeRole(u.auth_user_id, e.target.value),
												className: `px-3 py-1 rounded-lg text-xs font-semibold outline-none border cursor-pointer ${u.role === "captain" ? "bg-purple-100 text-purple-700 border-purple-200" : u.role === "admin" ? "bg-blue-100 text-blue-700 border-blue-200" : u.role === "staff" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-700 border-slate-200"}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "captain",
														children: "Captain"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "admin",
														children: "Admin"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "staff",
														children: "Staff"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
														value: "customer",
														children: "Customer"
													})
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => toggleUserActiveStatus(u.id, u.is_active !== false),
												className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${u.is_active !== false ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : "bg-rose-50 text-rose-600 hover:bg-rose-100"}`,
												children: u.is_active !== false ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 14 }), " ใช้งาน"] }) : "รออนุมัติ / ถูกระงับ"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "px-6 py-4 text-right",
											children: u.role !== "captain" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => handleDeleteUser(u.id, u.auth_user_id),
												className: "p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors",
												title: "ลบผู้ใช้",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 18 })
											})
										})
									]
								}, u.id))
							})]
						})
					})
				})
			})]
		})]
	});
}
//#endregion
export { CaptainDashboard as component };

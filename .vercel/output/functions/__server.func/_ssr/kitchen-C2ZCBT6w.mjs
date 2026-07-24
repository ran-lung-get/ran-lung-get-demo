import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { $ as DollarSign, B as LayoutDashboard, C as ShieldAlert, H as Inbox, I as Menu, J as Funnel, T as RotateCcw, W as House, Y as Flame, a as Users, at as CirclePlus, b as ShoppingBag, dt as Check, f as TrendingUp, ft as ChartColumn, ht as Bell, i as Utensils, mt as Bike, n as VolumeX, nt as Clock, ot as CircleCheckBig, p as Trash2, r as Volume2, rt as ClipboardList, u as Trophy, ut as ChefHat } from "../_libs/lucide-react.mjs";
import { t as MENU } from "./customer-CXoL6D-b.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/kitchen-C2ZCBT6w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BRAND = "#002e47";
var GOLD = "#fcc14a";
var INK_MUTED = "#5a6e7a";
var getTimestampFromOrderId = (id) => {
	if (id.startsWith("hist_")) {
		const tsString = id.replace("hist_", "");
		const ts = parseInt(tsString);
		if (!isNaN(ts) && ts > 0xe8d4a51000) return ts;
	}
	if (id === "hist_1") return Date.now() - 900 * 1e3;
	if (id === "hist_2") return Date.now() - 1800 * 1e3;
	return Date.now();
};
function playNotificationSound() {
	try {
		const AudioContextClass = window.AudioContext || window.webkitAudioContext;
		if (!AudioContextClass) return;
		const ctx = new AudioContextClass();
		const osc1 = ctx.createOscillator();
		const gain1 = ctx.createGain();
		osc1.type = "sine";
		osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
		gain1.gain.setValueAtTime(.12, ctx.currentTime);
		gain1.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .6);
		osc1.connect(gain1);
		gain1.connect(ctx.destination);
		osc1.start();
		osc1.stop(ctx.currentTime + .6);
		const osc2 = ctx.createOscillator();
		const gain2 = ctx.createGain();
		osc2.type = "sine";
		osc2.frequency.setValueAtTime(440, ctx.currentTime + .22);
		gain2.gain.setValueAtTime(0, ctx.currentTime);
		gain2.gain.setValueAtTime(.12, ctx.currentTime + .22);
		gain2.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + .85);
		osc2.connect(gain2);
		gain2.connect(ctx.destination);
		osc2.start(ctx.currentTime + .22);
		osc2.stop(ctx.currentTime + .85);
	} catch (e) {
		console.error("Audio chime synthesiser:", e);
	}
}
function playRefundSound() {
	try {
		const AudioContextClass = window.AudioContext || window.webkitAudioContext;
		if (!AudioContextClass) return;
		const ctx = new AudioContextClass();
		[
			0,
			.18,
			.36
		].forEach((delay) => {
			const osc = ctx.createOscillator();
			const gain = ctx.createGain();
			osc.type = "triangle";
			osc.frequency.setValueAtTime(880, ctx.currentTime + delay);
			gain.gain.setValueAtTime(.12, ctx.currentTime + delay);
			gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + delay + .15);
			osc.connect(gain);
			gain.connect(ctx.destination);
			osc.start(ctx.currentTime + delay);
			osc.stop(ctx.currentTime + delay + .15);
		});
	} catch (e) {
		console.error(e);
	}
}
function OrderTimer({ id }) {
	const [elapsed, setElapsed] = (0, import_react.useState)("");
	const [isDelayed, setIsDelayed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const timestamp = getTimestampFromOrderId(id);
		const updateTimer = () => {
			const diffSecs = Math.floor((Date.now() - timestamp) / 1e3);
			const minutes = Math.floor(diffSecs / 60);
			setElapsed(`${minutes}:${(diffSecs % 60).toString().padStart(2, "0")} น.`);
			setIsDelayed(minutes >= 10);
		};
		updateTimer();
		const interval = setInterval(updateTimer, 1e3);
		return () => clearInterval(interval);
	}, [id]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `flex items-center gap-1 px-2 py-0.5 rounded-lg border font-mono font-bold text-[11px] tracking-wider transition ${isDelayed ? "text-red-600 bg-red-50 border-red-200 animate-pulse" : "text-[#5a6e7a] bg-[#f8fafc] border-slate-200/80"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
			size: 10,
			className: isDelayed ? "text-red-500" : "text-[#5a6e7a]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: elapsed })]
	});
}
var MENU_ITEMS_FOR_SIMULATION = [
	{
		name: "กระเพราหมูสับ (ข้าวราด)",
		price: 60,
		category: "signature",
		image: "/meal/krapao.jpg"
	},
	{
		name: "ผัดพริกเผา (ข้าวราด)",
		price: 65,
		category: "signature",
		image: "/meal/pad_tua_sea.jpg"
	},
	{
		name: "ผัดซีอิ๊ว (เส้นใหญ่)",
		price: 70,
		category: "noodles",
		image: "/meal/pad_see_ew.jpg"
	},
	{
		name: "ข้าวผัดกระเทียม (ข้าวผัด)",
		price: 70,
		category: "rice",
		image: "/meal/fried_rice.jpg"
	},
	{
		name: "กระเพราหมูกรอบ (ข้าวราด)",
		price: 70,
		category: "signature",
		image: "/meal/krapao.jpg"
	},
	{
		name: "ผัดคะน้าหมูกรอบ (ข้าวราด)",
		price: 70,
		category: "main",
		image: "/meal/pad_pak.jpg"
	},
	{
		name: "น้ำลำไย",
		price: 45,
		category: "drinks",
		image: "/meal/longan_juice.jpg"
	},
	{
		name: "น้ำส้มคั้น",
		price: 50,
		category: "drinks",
		image: "/meal/orange_juice.jpg"
	},
	{
		name: "เฉาก๊วย",
		price: 40,
		category: "dessert",
		image: "/meal/grass_jelly.webp"
	}
];
var CUSTOMER_NAMES = [
	"คุณ นนท์",
	"คุณ แพรว",
	"คุณ บาส",
	"คุณ ส้ม",
	"คุณ โอม",
	"คุณ พั้นช์",
	"คุณ พิม",
	"คุณ ต้น"
];
var TABLES = [
	"โต๊ะ 1",
	"โต๊ะ 2",
	"โต๊ะ 3",
	"โต๊ะ 4",
	"โต๊ะ 5",
	"โต๊ะ 6",
	"โต๊ะ 7",
	"โต๊ะ 8"
];
var SPICY_LEVELS = [
	"ไม่เผ็ด",
	"เผ็ดน้อย",
	"เผ็ดกลาง",
	"เผ็ดมาก"
];
var NOTES = [
	"ขอไข่แดงไม่สุกนะค้าบ",
	"เผ็ดจัดจ้านพิเศษ",
	"ไม่ใส่กระเทียม",
	"ขอแห้งๆ ผัดไม่แฉะ",
	"ไม่ใส่ต้นหอมผักชี",
	"ขอกะเพราเน้นๆ พริกแห้ง",
	"ไข่ดาวสุกกรอบๆ"
];
function HistoryOrderRow({ order }) {
	order.orderType;
	const isDelivery = order.orderType === "delivery";
	const isTakeaway = order.orderType === "takeaway";
	let typeLabel = "ทานที่ร้าน";
	let detailsText = order.tableNumber || "ไม่ระบุโต๊ะ";
	let typeIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { size: 14 });
	if (isDelivery) {
		typeLabel = "จัดส่งถึงที่";
		detailsText = order.customerName || "คุณลูกค้า";
		typeIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bike, { size: 14 });
	} else if (isTakeaway) {
		typeLabel = "รับกลับบ้าน";
		detailsText = order.customerName || "คุณลูกค้า";
		typeIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 14 });
	}
	const itemsSummary = order.items.map((item) => `${item.name.split(" (")[0]} x${item.qty}`).join(", ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-[#fcfbf9] hover:bg-[#f6f3ed] border border-[#ece4d6] rounded-2xl p-3 sm:p-4 flex items-center justify-between gap-3 sm:gap-4 transition shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-[#5a6e7a]/40 bg-[#f8fafc] text-[#5a6e7a] flex items-center justify-center shrink-0 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					size: 20,
					className: "stroke-[3]"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1 text-[10px] font-bold text-[#5a6e7a] uppercase tracking-wide",
				children: [typeIcon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: typeLabel })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-black text-[#002e47] mt-0.5",
				children: detailsText
			})] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-right flex flex-col justify-between items-end min-w-0 max-w-[55%] sm:max-w-[65%]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold text-[#002e47] truncate w-full text-right",
					title: itemsSummary,
					children: itemsSummary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10px] font-extrabold text-[#5a6e7a] tracking-wider mt-1",
					children: ["ออเดอร์ ", order.orderNumber]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10px] font-black text-[#5a6e7a] mt-1 bg-[#5a6e7a]/10 px-2 py-0.5 rounded-lg",
					children: ["ยอดรวม: ฿", order.total]
				})
			]
		})]
	});
}
function OrderCard({ order, advanceOrderStatus, regressOrderStatus }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [showConfirm, setShowConfirm] = (0, import_react.useState)(false);
	const isWaiting = order.status === "รอดำเนินการ" || order.status === "รอรับออเดอร์";
	const isCooking = order.status === "กำลังทำ" || order.status === "กำลังเตรียม";
	const isReady = order.status === "พร้อมเสิร์ฟ";
	const isCompleted = order.status === "สำเร็จ";
	const isRefund = order.status === "ขอคืนเงิน";
	let borderClass = "border-[#ece4d6]";
	let actionBtnText = "เริ่มทำ";
	let actionBtnColor = "bg-[#002e47] text-white hover:bg-[#001f30]";
	if (isRefund) {
		borderClass = "border-red-500 shadow-[0_8px_20px_rgba(239,68,68,0.12)] bg-red-50/15";
		actionBtnText = "โอนเงินคืน & ยกเลิก";
		actionBtnColor = "bg-red-600 hover:bg-red-700 text-white";
	} else if (isWaiting) {
		borderClass = "border-amber-400/80 shadow-[0_8px_20px_rgba(245,158,11,0.06)]";
		actionBtnText = "เริ่มปรุงอาหาร";
		actionBtnColor = "bg-blue-600 hover:bg-blue-700 text-white";
	} else if (isCooking) {
		borderClass = "border-blue-400/80 shadow-[0_8px_20px_rgba(37,99,235,0.06)]";
		actionBtnText = "ทำเสร็จแล้ว";
		actionBtnColor = "bg-emerald-600 hover:bg-emerald-700 text-white";
	} else if (isReady) {
		borderClass = "border-emerald-400/80 shadow-[0_8px_20px_rgba(16,185,129,0.06)]";
		actionBtnText = "เสิร์ฟแล้ว / ปิดคิว";
		actionBtnColor = "bg-slate-700 hover:bg-slate-800 text-white";
	}
	let bannerBg = "bg-amber-100 text-[#002e47]";
	let typeLabel = "ทานที่ร้าน";
	let typeIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-1 rounded-lg bg-amber-500/20 text-[#002e47] flex items-center justify-center shrink-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, {
			size: 18,
			className: "stroke-[2.5]"
		})
	});
	let detailsText = order.tableNumber || "ไม่ระบุโต๊ะ";
	let detailsLarge = true;
	let cardBg = "bg-[#fffdf5]";
	let leftBorderClass = "border-l-[8px] border-l-amber-500";
	if (order.orderType === "delivery") {
		bannerBg = "bg-blue-100 text-blue-800 border-b border-blue-200";
		typeLabel = "จัดส่งถึงที่ (Delivery)";
		typeIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-1 rounded-lg bg-blue-600/20 text-blue-800 flex items-center justify-center shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bike, {
				size: 18,
				className: "stroke-[2.5]"
			})
		});
		detailsText = order.customerName || "คุณลูกค้า";
		detailsLarge = false;
		cardBg = "bg-[#f4faff]";
		leftBorderClass = "border-l-[8px] border-l-blue-600";
	} else if (order.orderType === "takeaway") {
		bannerBg = "bg-purple-100 text-purple-800 border-b border-purple-200";
		typeLabel = "รับกลับบ้าน (Takeaway)";
		typeIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "p-1 rounded-lg bg-purple-600/20 text-purple-800 flex items-center justify-center shrink-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
				size: 18,
				className: "stroke-[2.5]"
			})
		});
		detailsText = order.customerName || "คุณลูกค้า";
		detailsLarge = false;
		cardBg = "bg-[#faf8ff]";
		leftBorderClass = "border-l-[8px] border-l-purple-500";
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `shrink-0 rounded-2xl border-2 overflow-hidden flex flex-col shadow-soft transition-colors duration-300 ${cardBg} ${leftBorderClass} ${borderClass} ${isRefund ? "animate-[pulse_2s_infinite]" : ""}`,
		children: [
			isRefund && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-red-500 text-white text-xs font-black px-4 py-2 flex items-center justify-between border-b border-red-600 animate-pulse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⚠️ ลูกค้าขอคืนเงิน" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-extrabold",
					children: ["ยอดคืน ฿", order.total]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `px-4 py-3 flex items-center justify-between ${bannerBg}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [typeIcon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-black uppercase tracking-wider",
						children: typeLabel
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: detailsLarge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xl font-black tracking-tight uppercase",
					style: { color: BRAND },
					children: detailsText
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-black truncate max-w-[140px] inline-block",
					children: detailsText
				}) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-2 bg-[#002e47]/5 border-b border-slate-200/60 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs font-extrabold text-[#002e47]",
					children: ["ออเดอร์ ", order.orderNumber]
				}), !isCompleted && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderTimer, { id: order.id })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 p-4 space-y-3.5 bg-transparent",
				children: [
					order.items.map((item, idx) => {
						const parts = item.name.split(" (");
						const name = parts[0];
						const choices = parts[1] ? parts[1].replace(")", "") : "";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[15px] sm:text-base font-black text-[#002e47] leading-snug block",
									children: name
								}), choices && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-[#5a6e7a] mt-0.5 bg-[#f1ece4]/80 px-1.5 py-0.5 rounded inline-block",
									children: choices
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "shrink-0 flex items-center justify-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-base font-black text-[#002e47] px-2.5 py-1 rounded-lg border border-[#002e47]/10 shadow-sm min-w-[42px] text-center",
									style: { background: GOLD },
									children: ["x", item.qty]
								})
							})]
						}, idx);
					}),
					order.note && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-2.5 bg-red-50 border border-red-150 rounded-xl",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[9px] font-bold text-red-600 uppercase tracking-wider block mb-0.5",
							children: "หมายเหตุลูกค้า:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs font-extrabold text-red-700 animate-pulse block leading-normal",
							children: ["* ", order.note]
						})]
					}),
					isRefund && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-2.5 bg-red-50/50 border border-red-100 rounded-xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[9px] font-bold text-red-600 uppercase tracking-wider block mb-0.5",
								children: "เหตุผลขอคืนเงิน:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs font-extrabold text-red-700 block leading-normal",
								children: [order.cancelReason, order.cancelNote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block mt-0.5 text-[10px] text-slate-500 font-medium italic",
									children: [
										"\"",
										order.cancelNote,
										"\""
									]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[9px] font-bold text-slate-400 uppercase tracking-wider block",
									children: "ช่องทางคืนเงิน:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-extrabold text-[#002e47] block truncate",
									children: order.refundPromptPay
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									navigator.clipboard?.writeText(order.refundPromptPay || "").catch(() => {});
									setCopied(true);
									setTimeout(() => setCopied(false), 2e3);
								},
								className: `text-[9px] font-bold px-2 py-1 rounded-md shrink-0 transition active:scale-95 cursor-pointer ${copied ? "bg-emerald-500 text-white" : "bg-white border border-[#ece4d6] text-[#002e47] hover:bg-slate-50"}`,
								children: copied ? "ก๊อปปี้แล้ว" : "ก๊อปปี้"
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-3 bg-[#002e47]/5 border-t border-slate-200/60 flex gap-2",
				children: [!isWaiting && !isCompleted && !isRefund && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => regressOrderStatus(order.id, order.status),
					className: "p-2.5 bg-white hover:bg-slate-100 text-[#5a6e7a] border border-slate-200 rounded-xl active:scale-95 transition flex items-center justify-center cursor-pointer shadow-sm",
					title: "ย้อนกลับขั้นตอนที่แล้ว",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { size: 16 })
				}), isRefund ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setShowConfirm(true),
					className: "flex-1 py-3 rounded-xl font-black text-xs tracking-wider uppercase transition-colors duration-300 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-sm bg-red-600 hover:bg-red-700 text-white",
					children: "โอนเงินคืนสำเร็จ & ยกเลิก"
				}) : !isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => advanceOrderStatus(order.id, order.status),
					className: `flex-1 py-3 rounded-xl font-black text-xs tracking-wider uppercase transition-colors duration-300 flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-sm ${actionBtnColor}`,
					children: actionBtnText
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1 py-2 text-center text-[#5a6e7a] text-xs font-bold bg-slate-100 rounded-xl",
					children: "ออเดอร์สำเร็จแล้ว"
				})]
			}),
			showConfirm && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/60 backdrop-blur-xs",
					onClick: () => setShowConfirm(false)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl p-6 w-full max-w-sm z-10 border border-[#ece4d6] shadow-2xl relative text-[#002e47]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-base font-black tracking-tight mb-2",
							children: "ยืนยันการคืนเงิน & ยกเลิกออเดอร์"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] text-slate-500 leading-relaxed mb-4",
							children: [
								"กรุณาโอนเงินคืนสำเร็จจำนวน ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["฿", order.total] }),
								" ไปยัง ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: order.refundPromptPay }),
								" เรียบร้อยแล้วก่อนกดยืนยันปุ่มนี้"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowConfirm(false),
								className: "w-full py-2.5 rounded-xl font-bold text-[10px] bg-slate-100 text-slate-500 cursor-pointer hover:bg-slate-200",
								children: "ย้อนกลับ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									advanceOrderStatus(order.id, order.status);
									setShowConfirm(false);
								},
								className: "w-full py-2.5 rounded-xl font-bold text-[10px] text-white cursor-pointer hover:opacity-95 bg-emerald-600",
								children: "โอนเรียบร้อยแล้ว"
							})]
						})
					]
				})]
			})
		]
	});
}
function EmptyColumnMessage({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-12 flex flex-col items-center justify-center text-center text-[#5a6e7a]/50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, {
			size: 28,
			className: "opacity-30 mb-2"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] font-bold",
			children: text
		})]
	});
}
function MenuManagementView() {
	const [outOfStockIds, setOutOfStockIds] = (0, import_react.useState)([]);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)("all");
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("ran-lung-get-out-of-stock-items");
		if (saved) try {
			setOutOfStockIds(JSON.parse(saved));
		} catch (e) {
			console.error("Failed to parse out-of-stock items:", e);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const handleStorageChange = (e) => {
			if (e.key === "ran-lung-get-out-of-stock-items" && e.newValue) try {
				setOutOfStockIds(JSON.parse(e.newValue));
			} catch (err) {
				console.error("Sync error in out-of-stock:", err);
			}
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);
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
		return MENU.filter((item) => {
			const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.desc.toLowerCase().includes(searchQuery.toLowerCase());
			const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
			return matchesSearch && matchesCategory;
		});
	}, [searchQuery, selectedCategory]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-black tracking-tight text-[#002e47]",
					children: "จัดการวัตถุดิบ — เปิด/ปิดเมนูอาหาร"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative max-w-md w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "text",
						placeholder: "ค้นหาชื่อเมนู...",
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						className: "w-full bg-[#fcfbf9] border border-[#ece4d6] rounded-2xl px-4 py-2.5 text-sm font-bold text-[#002e47] placeholder-[#5a6e7a]/50 focus:outline-none focus:border-[#002e47]/30 transition shadow-inner"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: categories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSelectedCategory(cat.id),
					className: `px-3 py-1.5 rounded-xl font-bold text-xs tracking-wider transition cursor-pointer ${selectedCategory === cat.id ? "bg-[#002e47] text-white shadow-inner" : "bg-slate-100 text-[#5a6e7a] hover:bg-slate-200"}`,
					children: cat.label
				}, cat.id))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6",
			children: filteredMenuItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "py-16 text-center text-slate-400 font-bold col-span-full bg-white rounded-3xl border border-[#ece4d6] p-6 shadow-sm",
				children: "ไม่พบเมนูอาหารที่ค้นหา"
			}) : filteredMenuItems.map((item) => {
				const isOutOfStock = outOfStockIds.includes(item.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `bg-white border rounded-3xl p-4 flex gap-4 transition shadow-sm hover:shadow-md relative overflow-hidden ${isOutOfStock ? "border-red-200 bg-red-50/20" : "border-[#ece4d6]"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "h-20 w-20 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.image,
							alt: item.name,
							className: `h-full w-full object-cover transition duration-300 ${isOutOfStock ? "grayscale opacity-50" : ""}`,
							onError: (e) => {
								e.target.src = "/thai_food_hero.jpg";
							}
						}), isOutOfStock && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-0 bg-red-600/10 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-red-600 text-white text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded shadow-sm",
								children: "หมด"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 flex flex-col justify-between min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-1.5 justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold text-slate-400 uppercase tracking-wider",
									children: item.category.toUpperCase()
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-black text-[#002e47]",
									children: ["฿", item.price]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-black text-[#002e47] mt-0.5 truncate",
								title: item.name,
								children: item.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] font-semibold text-[#5a6e7a] line-clamp-2 mt-1 leading-relaxed",
								children: item.desc
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mt-3 pt-2 border-t border-slate-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-[10px] font-extrabold tracking-wide ${isOutOfStock ? "text-red-500" : "text-emerald-600"}`,
								children: isOutOfStock ? "● ปิดการขายชั่วคราว" : "● เปิดขายปกติ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggleStock(item.id),
								className: `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isOutOfStock ? "bg-red-500" : "bg-emerald-500"}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isOutOfStock ? "translate-x-5" : "translate-x-0"}` })
							})]
						})]
					})]
				}, item.id);
			})
		})]
	});
}
function RefundManagementView() {
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [selectedOrder, setSelectedOrder] = (0, import_react.useState)(null);
	const [copiedId, setCopiedId] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("ran-lung-get-orders");
		if (saved) try {
			setOrders(JSON.parse(saved));
		} catch (e) {
			console.error("Failed to parse orders:", e);
		}
		const handleStorage = (e) => {
			if (e.key === "ran-lung-get-orders" && e.newValue) try {
				setOrders(JSON.parse(e.newValue));
			} catch (err) {
				console.error(err);
			}
		};
		window.addEventListener("storage", handleStorage);
		return () => window.removeEventListener("storage", handleStorage);
	}, []);
	const refundRequests = (0, import_react.useMemo)(() => {
		return orders.filter((o) => o.status === "ขอคืนเงิน");
	}, [orders]);
	const handleCopy = (promptPay, orderId) => {
		navigator.clipboard?.writeText(promptPay).catch(() => {});
		setCopiedId(orderId);
		setTimeout(() => setCopiedId(null), 2e3);
	};
	const handleConfirmRefund = (orderId) => {
		const updated = orders.map((o) => {
			if (o.id === orderId) return {
				...o,
				status: "ยกเลิกแล้ว"
			};
			return o;
		});
		setOrders(updated);
		localStorage.setItem("ran-lung-get-orders", JSON.stringify(updated));
		window.dispatchEvent(new StorageEvent("storage", {
			key: "ran-lung-get-orders",
			newValue: JSON.stringify(updated)
		}));
		setSelectedOrder(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-black tracking-tight text-[#002e47]",
					children: "คำขอคืนเงิน & ยกเลิกออเดอร์"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-slate-500 font-semibold mt-1",
					children: "รายการขอยกเลิกและแจ้งคืนเงินจากลูกค้า (ตรวจสอบสลิปการโอนและสิทธิ์ยกเลิก)"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-red-50 text-red-600 font-extrabold text-xs px-3.5 py-1.5 rounded-full border border-red-100 flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "animate-pulse",
						children: "●"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"ค้างดำเนินการ: ",
						refundRequests.length,
						" รายการ"
					] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
				children: refundRequests.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-16 text-center text-slate-400 font-bold col-span-full bg-white rounded-3xl border border-[#ece4d6] p-6 shadow-sm",
					children: "ไม่มีคำขอคืนเงินค้างอยู่ในขณะนี้"
				}) : refundRequests.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-red-100 rounded-3xl p-5 shadow-sm hover:shadow-md transition relative overflow-hidden flex flex-col justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute top-0 inset-x-0 h-1.5 bg-red-500" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-black text-[#002e47] text-base",
										children: order.orderNumber
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-slate-400 font-bold mt-0.5",
										children: order.date
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-black text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md",
										children: "ขอคืนเงิน"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-[#fcfbf9] border border-[#ece4d6] rounded-2xl p-3 text-xs space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-extrabold text-[#002e47] mb-1",
											children: "รายการอาหาร"
										}),
										order.items.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between font-semibold text-slate-600",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												item.name,
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-[10px] text-slate-400",
													children: ["×", item.qty]
												})
											] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["฿", item.price * item.qty] })]
										}, idx)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t border-[#ece4d6] pt-1.5 mt-1 flex justify-between font-bold text-[#002e47]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ยอดคืนเงินรวม" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm",
												children: ["฿", order.total.toLocaleString()]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-extrabold text-[#5a6e7a] tracking-wider uppercase",
										children: "เหตุผลในการยกเลิก"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs font-semibold text-red-600 bg-red-50/50 p-2.5 rounded-xl border border-red-100/50 leading-relaxed",
										children: [order.cancelReason, order.cancelNote && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block mt-1 text-[11px] text-slate-500 font-medium italic",
											children: [
												"\"",
												order.cancelNote,
												"\""
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] font-extrabold text-[#5a6e7a] tracking-wider uppercase",
										children: "ข้อมูลโอนเงินคืน"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-xl",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-black text-[#002e47] truncate",
											children: order.refundPromptPay
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => handleCopy(order.refundPromptPay || "", order.id),
											className: `text-[10px] font-bold px-2 py-1 rounded-lg shrink-0 transition active:scale-95 cursor-pointer ${copiedId === order.id ? "bg-emerald-500 text-white" : "bg-white border border-[#ece4d6] text-[#002e47] hover:bg-slate-50"}`,
											children: copiedId === order.id ? "ก๊อปปี้แล้ว" : "ก๊อปปี้"
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 pt-3 border-t border-slate-100 flex gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelectedOrder(order),
								className: "flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#002e47] text-white hover:opacity-95 transition cursor-pointer text-center",
								children: "ดำเนินการคืนเงิน"
							})
						})
					]
				}, order.id))
			}),
			selectedOrder && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 bg-black/60 backdrop-blur-xs",
					onClick: () => setSelectedOrder(null)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl p-6 w-full max-w-md z-10 border border-[#ece4d6] shadow-2xl relative text-[#002e47]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-black tracking-tight mb-2",
							children: "ยืนยันการคืนเงิน & ยกเลิกออเดอร์"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-500 leading-relaxed mb-4",
							children: [
								"กรุณาทำรายการโอนเงินคืนนอกระบบจำนวน ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["฿", selectedOrder.total.toLocaleString()] }),
								"ไปยังพร้อมเพย์ ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: selectedOrder.refundPromptPay }),
								" ให้สำเร็จก่อนกดยืนยันปุ่มนี้"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3 mb-5 p-3.5 bg-red-50/50 rounded-2xl border border-red-100 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "เลขออเดอร์:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: selectedOrder.orderNumber
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ช่องทางคืนเงิน:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-black text-red-600",
										children: selectedOrder.refundPromptPay
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between font-semibold",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ยอดเงินที่ต้องโอนคืน:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-black text-base text-red-600",
										children: ["฿", selectedOrder.total.toLocaleString()]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSelectedOrder(null),
								className: "w-full py-3 rounded-xl font-bold text-xs bg-slate-100 text-slate-500 cursor-pointer hover:bg-slate-200",
								children: "ยกเลิก"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => handleConfirmRefund(selectedOrder.id),
								className: "w-full py-3 rounded-xl font-bold text-xs text-white cursor-pointer hover:opacity-95 bg-emerald-600",
								children: "ยืนยันการโอนสำเร็จ"
							})]
						})
					]
				})]
			})
		]
	});
}
function KitchenSidebarContent({ view, setView, onClose, refundCount = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-full bg-[#002e47] text-white select-none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 border-b border-white/10 flex items-center justify-between shrink-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white border border-white/15 shadow-sm relative overflow-hidden group",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, { className: "h-5.5 w-5.5 text-[#fcc14a]" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-black text-sm tracking-tight text-white uppercase",
						children: "ระบบจัดการร้าน"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] font-bold text-[#fcc14a] tracking-wider uppercase",
						children: "หลังบ้านลุงเกตุ"
					})] })]
				}), onClose && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition cursor-pointer md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
						size: 16,
						className: "rotate-45"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto no-scrollbar p-4 space-y-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold text-white/40 uppercase tracking-widest block px-2",
						children: "เมนูจัดการระบบ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "space-y-1",
						children: [
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
									setView("dashboard");
									if (onClose) onClose();
								},
								className: `w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "dashboard" ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]" : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, {
									size: 18,
									className: view === "dashboard" ? "text-[#fcc14a]" : "text-white/60"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "แดชบอร์ด"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setView("menu");
									if (onClose) onClose();
								},
								className: `w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "menu" ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]" : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
									size: 18,
									className: view === "menu" ? "text-[#fcc14a]" : "text-white/60"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm",
									children: "จัดการวัตถุดิบ"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setView("refunds");
									if (onClose) onClose();
								},
								className: `w-full flex items-center justify-between px-3 py-3.5 rounded-xl text-left transition duration-200 cursor-pointer ${view === "refunds" ? "bg-white/10 text-white shadow-inner font-black border-l-4 border-[#fcc14a]" : "text-white/70 hover:text-white hover:bg-white/5 font-medium border-l-4 border-transparent"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
										size: 18,
										className: view === "refunds" ? "text-[#fcc14a]" : "text-white/60"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										children: "แจ้งเตือนการยกเลิก"
									})]
								}), refundCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-red-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full animate-bounce",
									children: refundCount
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
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-4 border-t border-white/10 bg-white/2 shrink-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[9px] text-white/40 text-center font-semibold",
					children: "ระบบจัดการร้านค้า v1.2.0 · ครัวลุงเกตุ"
				})
			})
		]
	});
}
var BASE_RECENT_ORDERS = [
	{
		id: "mock_recent_1",
		orderNumber: "AK-2910",
		date: "25 มิ.ย. 2569 · 11:15 น.",
		items: [{
			name: "กระเพราหมูกรอบ (ข้าวราด) (เผ็ดกลาง, ไข่ดาวสุกกรอบๆ)",
			qty: 1,
			price: 80,
			image: ""
		}],
		subtotal: 80,
		delivery: 0,
		total: 80,
		status: "สำเร็จ",
		orderType: "dine-in",
		customerName: "คุณ นนท์",
		tableNumber: "โต๊ะ 3"
	},
	{
		id: "mock_recent_2",
		orderNumber: "AK-2909",
		date: "25 มิ.ย. 2569 · 11:02 น.",
		items: [{
			name: "ผัดซีอิ๊ว (เส้นใหญ่) (ไม่เผ็ด)",
			qty: 2,
			price: 70,
			image: ""
		}, {
			name: "น้ำลำไย",
			qty: 2,
			price: 45,
			image: ""
		}],
		subtotal: 230,
		delivery: 0,
		total: 230,
		status: "สำเร็จ",
		orderType: "dine-in",
		customerName: "คุณ แพรว",
		tableNumber: "โต๊ะ 1"
	},
	{
		id: "mock_recent_3",
		orderNumber: "AK-2908",
		date: "25 มิ.ย. 2569 · 10:45 น.",
		items: [{
			name: "ผัดคะน้าหมูกรอบ (ข้าวราด) (เผ็ดน้อย)",
			qty: 1,
			price: 70,
			image: ""
		}],
		subtotal: 70,
		delivery: 40,
		total: 110,
		status: "สำเร็จ",
		orderType: "delivery",
		customerName: "คุณ สมยศ",
		tableNumber: ""
	},
	{
		id: "mock_recent_4",
		orderNumber: "AK-2907",
		date: "25 มิ.ย. 2569 · 10:30 น.",
		items: [{
			name: "กระเพราหมูสับ (ข้าวราด) (เผ็ดมาก)",
			qty: 1,
			price: 60,
			image: ""
		}, {
			name: "เฉาก๊วย",
			qty: 1,
			price: 40,
			image: ""
		}],
		subtotal: 100,
		delivery: 0,
		total: 100,
		status: "สำเร็จ",
		orderType: "takeaway",
		customerName: "คุณ วิชัย",
		tableNumber: ""
	},
	{
		id: "mock_recent_5",
		orderNumber: "AK-2906",
		date: "25 มิ.ย. 2569 · 10:15 น.",
		items: [{
			name: "ข้าวผัดกระเทียม (ข้าวผัด) (ไม่เผ็ด)",
			qty: 1,
			price: 70,
			image: ""
		}],
		subtotal: 70,
		delivery: 0,
		total: 70,
		status: "สำเร็จ",
		orderType: "dine-in",
		customerName: "คุณ พั้นช์",
		tableNumber: "โต๊ะ 5"
	}
];
var BASE_POPULAR_ITEMS = [
	{
		name: "กระเพราหมูกรอบ (ข้าวราด)",
		count: 48
	},
	{
		name: "ผัดคะน้าหมูกรอบ (ข้าวราด)",
		count: 32
	},
	{
		name: "กระเพราหมูสับ (ข้าวราด)",
		count: 27
	},
	{
		name: "ผัดซีอิ๊ว (เส้นใหญ่)",
		count: 19
	},
	{
		name: "น้ำลำไย",
		count: 15
	}
];
function DashboardView({ orders }) {
	const totalOrders = 85 + orders.length;
	const totalRevenue = 48500 + orders.reduce((sum, o) => sum + o.total, 0);
	const totalCustomers = 32 + (0, import_react.useMemo)(() => {
		const seen = /* @__PURE__ */ new Set();
		orders.forEach((o) => {
			if (o.customerName) seen.add(o.customerName);
			else if (o.tableNumber) seen.add(o.tableNumber);
		});
		return seen.size;
	}, [orders]);
	const mergedPopularItems = (0, import_react.useMemo)(() => {
		const counts = {};
		orders.forEach((o) => {
			o.items.forEach((item) => {
				const baseName = item.name.split(" (")[0];
				counts[baseName] = (counts[baseName] || 0) + item.qty;
			});
		});
		const items = BASE_POPULAR_ITEMS.map((b) => ({ ...b }));
		Object.entries(counts).forEach(([name, count]) => {
			const match = items.find((i) => i.name === name);
			if (match) match.count += count;
			else items.push({
				name,
				count
			});
		});
		return items.sort((a, b) => b.count - a.count);
	}, [orders]);
	const topProduct = mergedPopularItems[0]?.name || "กระเพราหมูกรอบ (ข้าวราด)";
	const mergedRecentOrders = (0, import_react.useMemo)(() => {
		const active = [...orders].sort((a, b) => getTimestampFromOrderId(b.id) - getTimestampFromOrderId(a.id));
		if (active.length >= 5) return active.slice(0, 5);
		const needed = 5 - active.length;
		return [...active, ...BASE_RECENT_ORDERS.slice(0, needed)];
	}, [orders]);
	const mergedRecentCustomers = (0, import_react.useMemo)(() => {
		const list = [];
		const seen = /* @__PURE__ */ new Set();
		[...orders].sort((a, b) => getTimestampFromOrderId(b.id) - getTimestampFromOrderId(a.id)).forEach((o) => {
			const key = o.customerName || o.tableNumber;
			if (key && !seen.has(key)) {
				seen.add(key);
				list.push({
					name: o.customerName || "คุณลูกค้า",
					info: o.orderType === "dine-in" ? o.tableNumber || "ทานที่ร้าน" : o.orderType === "takeaway" ? "รับกลับบ้าน" : "เดลิเวอรี่",
					time: o.date.includes(" · ") ? o.date.split(" · ")[1] : "เมื่อสักครู่",
					type: o.orderType || "dine-in"
				});
			}
		});
		for (const mc of [
			{
				name: "คุณ นนท์",
				info: "โต๊ะ 3",
				time: "11:15 น.",
				type: "dine-in"
			},
			{
				name: "คุณ แพรว",
				info: "โต๊ะ 1",
				time: "11:02 น.",
				type: "dine-in"
			},
			{
				name: "คุณ สมยศ",
				info: "เดลิเวอรี่",
				time: "10:45 น.",
				type: "delivery"
			},
			{
				name: "คุณ วิชัย",
				info: "รับกลับบ้าน",
				time: "10:30 น.",
				type: "takeaway"
			},
			{
				name: "คุณ พั้นช์",
				info: "โต๊ะ 5",
				time: "10:15 น.",
				type: "dine-in"
			}
		]) {
			if (list.length >= 5) break;
			if (!seen.has(mc.name)) {
				seen.add(mc.name);
				list.push(mc);
			}
		}
		return list.slice(0, 5);
	}, [orders]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl sm:text-3.5xl font-black tracking-tight text-[#002e47]",
							children: totalOrders
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 sm:p-2.5 rounded-2xl bg-amber-500/10 text-amber-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
								size: 20,
								className: "stroke-[2.5]"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[11px] sm:text-xs font-extrabold text-[#5a6e7a] tracking-wider uppercase mt-4",
						children: "ยอดสั่งซื้อสะสม (ออเดอร์)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-2xl sm:text-3.5xl font-black tracking-tight text-[#002e47]",
							children: ["฿", new Intl.NumberFormat("th-TH").format(totalRevenue)]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 sm:p-2.5 rounded-2xl bg-emerald-500/10 text-emerald-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {
								size: 20,
								className: "stroke-[2.5]"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[11px] sm:text-xs font-extrabold text-[#5a6e7a] tracking-wider uppercase mt-4",
						children: "รายได้สะสมทั้งหมด (บาท)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl sm:text-3.5xl font-black tracking-tight text-[#002e47]",
							children: totalCustomers
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 sm:p-2.5 rounded-2xl bg-blue-500/10 text-blue-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {
								size: 20,
								className: "stroke-[2.5]"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[11px] sm:text-xs font-extrabold text-[#5a6e7a] tracking-wider uppercase mt-4",
						children: "ลูกค้าสะสมทั้งหมด (คน)"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col justify-between min-h-[140px] hover:shadow-md transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between items-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm sm:text-base font-black tracking-tight text-[#002e47] line-clamp-2 max-w-[85%] leading-snug",
							children: topProduct
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2 sm:p-2.5 rounded-2xl bg-yellow-500/10 text-yellow-600 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
								size: 20,
								className: "stroke-[2.5]"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-[11px] sm:text-xs font-extrabold text-[#5a6e7a] tracking-wider uppercase mt-4",
						children: "เมนูยอดนิยมอันดับ 1"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-1 bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, {
						size: 20,
						className: "text-[#002e47] stroke-[2.5]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-black tracking-tight text-[#002e47]",
						children: "5 อันดับเมนูขายดีที่สุด"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-5",
					children: mergedPopularItems.slice(0, 5).map((item, index) => {
						const maxCount = mergedPopularItems[0]?.count || 1;
						const pct = item.count / maxCount * 100;
						let medalColor = "";
						if (index === 0) medalColor = "bg-[#fcc14a] text-[#002e47]";
						else if (index === 1) medalColor = "bg-slate-200 text-slate-700";
						else if (index === 2) medalColor = "bg-amber-600/20 text-amber-800";
						else medalColor = "bg-slate-100 text-slate-500";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs sm:text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${medalColor}`,
										children: index + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-extrabold text-[#002e47] truncate",
										children: item.name
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-black text-[#002e47] bg-slate-100 px-2 py-0.5 rounded-lg text-xs shrink-0",
									children: [item.count, " จาน"]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-3 w-full bg-slate-100 rounded-full overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full transition-all duration-550",
									style: {
										width: `${pct}%`,
										background: index === 0 ? "#002e47" : "#5a6e7a"
									}
								})
							})]
						}, item.name);
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-black tracking-tight text-[#002e47] mb-4",
						children: "5 ออเดอร์ล่าสุด"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto no-scrollbar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left border-collapse text-xs sm:text-sm font-sans",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-slate-100 text-[#5a6e7a] font-bold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 font-bold",
										children: "ออเดอร์"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 font-bold",
										children: "เวลา"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 font-bold",
										children: "ประเภท"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 font-bold text-right",
										children: "ยอดรวม"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-slate-50 font-medium text-slate-700",
								children: mergedRecentOrders.map((o) => {
									const typeLabel = o.orderType === "dine-in" ? o.tableNumber || "ทานที่ร้าน" : o.orderType === "delivery" ? "เดลิเวอรี่" : "กลับบ้าน";
									const typeColor = o.orderType === "dine-in" ? "text-amber-600 bg-amber-50" : o.orderType === "delivery" ? "text-blue-600 bg-blue-50" : "text-purple-600 bg-purple-50";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-slate-50/50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 font-extrabold text-[#002e47]",
												children: o.orderNumber
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 text-slate-500 text-[11px] sm:text-xs",
												children: o.date.includes(" · ") ? o.date.split(" · ")[1] : o.date
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `px-2 py-0.5 rounded-lg text-[10px] font-bold ${typeColor}`,
													children: typeLabel
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
												className: "py-3 text-right font-black text-[#002e47]",
												children: ["฿", o.total]
											})
										]
									}, o.id);
								})
							})]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white border border-[#ece4d6] rounded-3xl p-5 sm:p-6 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-black tracking-tight text-[#002e47] mb-4",
						children: "5 รายชื่อลูกค้าล่าสุด"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-x-auto no-scrollbar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left border-collapse text-xs sm:text-sm font-sans",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-slate-100 text-[#5a6e7a] font-bold",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 font-bold",
										children: "ชื่อลูกค้า"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 font-bold",
										children: "ช่องทาง/โต๊ะ"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2.5 font-bold text-right",
										children: "เวลาเข้าชม"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-slate-50 font-medium text-slate-700",
								children: mergedRecentCustomers.map((c, idx) => {
									const typeColor = c.type === "dine-in" ? "text-amber-600 bg-amber-50" : c.type === "delivery" ? "text-blue-600 bg-blue-50" : "text-purple-600 bg-purple-50";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
										className: "hover:bg-slate-50/50",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 font-extrabold text-[#002e47]",
												children: c.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: `px-2 py-0.5 rounded-lg text-[10px] font-bold ${typeColor}`,
													children: c.info
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
												className: "py-3 text-right text-slate-500 text-[11px] sm:text-xs",
												children: c.time
											})
										]
									}, idx);
								})
							})]
						})
					})]
				})]
			})]
		})]
	});
}
function KitchenMonitor() {
	const [orders, setOrders] = (0, import_react.useState)([]);
	const [soundEnabled, setSoundEnabled] = (0, import_react.useState)(true);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("active");
	const [typeFilter, setTypeFilter] = (0, import_react.useState)("all");
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [view, setView] = (0, import_react.useState)("kitchen");
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("ran-lung-get-orders");
		if (saved) try {
			setOrders(JSON.parse(saved));
		} catch (e) {
			console.error("Failed to parse orders:", e);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		const handleStorageChange = (e) => {
			if (e.key === "ran-lung-get-orders" && e.newValue) try {
				const newOrders = JSON.parse(e.newValue);
				setOrders((prev) => {
					if (soundEnabled) {
						const oldRefunds = prev.filter((o) => o.status === "ขอคืนเงิน").map((o) => o.id);
						if (newOrders.some((o) => o.status === "ขอคืนเงิน" && !oldRefunds.includes(o.id))) playRefundSound();
						else {
							const prevIds = new Set(prev.map((o) => o.id));
							if (newOrders.some((o) => !prevIds.has(o.id))) playNotificationSound();
						}
					}
					return newOrders;
				});
			} catch (err) {
				console.error("Sync error:", err);
			}
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, [soundEnabled]);
	(0, import_react.useEffect)(() => {
		let lastValue = localStorage.getItem("ran-lung-get-orders");
		const interval = setInterval(() => {
			const currentValue = localStorage.getItem("ran-lung-get-orders");
			if (currentValue !== lastValue) {
				lastValue = currentValue;
				if (currentValue) try {
					const newOrders = JSON.parse(currentValue);
					setOrders((prev) => {
						if (soundEnabled) {
							const oldRefunds = prev.filter((o) => o.status === "ขอคืนเงิน").map((o) => o.id);
							if (newOrders.some((o) => o.status === "ขอคืนเงิน" && !oldRefunds.includes(o.id))) playRefundSound();
							else {
								const prevIds = new Set(prev.map((o) => o.id));
								if (newOrders.some((o) => !prevIds.has(o.id))) playNotificationSound();
							}
						}
						return newOrders;
					});
				} catch (err) {
					console.error("Sync error in polling:", err);
				}
			}
		}, 1e3);
		return () => clearInterval(interval);
	}, [soundEnabled]);
	const updateOrdersAndNotify = (updatedList) => {
		setOrders(updatedList);
		localStorage.setItem("ran-lung-get-orders", JSON.stringify(updatedList));
		window.dispatchEvent(new StorageEvent("storage", {
			key: "ran-lung-get-orders",
			newValue: JSON.stringify(updatedList)
		}));
	};
	const advanceOrderStatus = (orderId, currentStatus) => {
		let nextStatus = "สำเร็จ";
		if (currentStatus === "รอดำเนินการ") nextStatus = "กำลังทำ";
		else if (currentStatus === "กำลังทำ" || currentStatus === "กำลังเตรียม") nextStatus = "พร้อมเสิร์ฟ";
		else if (currentStatus === "พร้อมเสิร์ฟ") nextStatus = "สำเร็จ";
		updateOrdersAndNotify(orders.map((o) => {
			if (o.id === orderId) return {
				...o,
				status: nextStatus
			};
			return o;
		}));
	};
	const regressOrderStatus = (orderId, currentStatus) => {
		let prevStatus = "รอดำเนินการ";
		if (currentStatus === "กำลังทำ" || currentStatus === "กำลังเตรียม") prevStatus = "รอดำเนินการ";
		else if (currentStatus === "พร้อมเสิร์ฟ") prevStatus = "กำลังทำ";
		else if (currentStatus === "สำเร็จ") prevStatus = "พร้อมเสิร์ฟ";
		updateOrdersAndNotify(orders.map((o) => {
			if (o.id === orderId) return {
				...o,
				status: prevStatus
			};
			return o;
		}));
	};
	const clearCompletedOrders = () => {
		updateOrdersAndNotify(orders.filter((o) => o.status !== "สำเร็จ"));
	};
	const triggerMockOrder = () => {
		const isDineIn = Math.random() > .4;
		const orderType = isDineIn ? "dine-in" : Math.random() > .5 ? "delivery" : "takeaway";
		const itemsCount = Math.floor(Math.random() * 3) + 1;
		const items = [];
		let subtotal = 0;
		for (let i = 0; i < itemsCount; i++) {
			const rawItem = MENU_ITEMS_FOR_SIMULATION[Math.floor(Math.random() * MENU_ITEMS_FOR_SIMULATION.length)];
			const qty = Math.floor(Math.random() * 2) + 1;
			let name = rawItem.name;
			const details = [];
			if (rawItem.category === "signature" || rawItem.category === "main" || rawItem.category === "noodles") details.push(SPICY_LEVELS[Math.floor(Math.random() * SPICY_LEVELS.length)]);
			if (Math.random() > .5 && rawItem.category !== "drinks" && rawItem.category !== "dessert") {
				details.push("ไข่ดาว (+฿10)");
				subtotal += 10 * qty;
			}
			const formattedName = name + (details.length > 0 ? ` (${details.join(", ")})` : "");
			items.push({
				name: formattedName,
				qty,
				price: rawItem.price,
				image: rawItem.image
			});
			subtotal += rawItem.price * qty;
		}
		const delivery = orderType === "delivery" ? 40 : 0;
		const orderNum = `#AK-${Math.floor(2848 + Math.random() * 100)}`;
		const name = CUSTOMER_NAMES[Math.floor(Math.random() * CUSTOMER_NAMES.length)];
		const tableNum = isDineIn ? TABLES[Math.floor(Math.random() * TABLES.length)] : "";
		const randomNote = Math.random() > .4 ? NOTES[Math.floor(Math.random() * NOTES.length)] : "";
		updateOrdersAndNotify([{
			id: `hist_${Date.now()}`,
			orderNumber: orderNum,
			date: (/* @__PURE__ */ new Date()).toLocaleDateString("th-TH", {
				day: "numeric",
				month: "short",
				year: "numeric"
			}) + " · " + (/* @__PURE__ */ new Date()).toLocaleTimeString("th-TH", {
				hour: "2-digit",
				minute: "2-digit"
			}),
			items,
			subtotal,
			delivery,
			total: subtotal + delivery,
			status: "รอดำเนินการ",
			orderType,
			customerName: name,
			tableNumber: tableNum,
			note: randomNote
		}, ...orders]);
		if (soundEnabled) playNotificationSound();
	};
	const stats = (0, import_react.useMemo)(() => {
		let waiting = 0;
		let cooking = 0;
		let ready = 0;
		let completed = 0;
		let refunds = 0;
		orders.forEach((o) => {
			const s = o.status;
			if (s === "รอดำเนินการ" || s === "รอรับออเดอร์") waiting++;
			else if (s === "กำลังทำ" || s === "กำลังเตรียม") cooking++;
			else if (s === "พร้อมเสิร์ฟ") ready++;
			else if (s === "สำเร็จ") completed++;
			else if (s === "ขอคืนเงิน") refunds++;
		});
		return {
			waiting,
			cooking,
			ready,
			completed,
			refunds,
			totalActive: waiting + cooking + ready
		};
	}, [orders]);
	const menuSummary = (0, import_react.useMemo)(() => {
		const summary = {};
		orders.filter((o) => o.status === "รอดำเนินการ" || o.status === "กำลังทำ" || o.status === "กำลังเตรียม").forEach((o) => {
			o.items.forEach((item) => {
				const baseName = item.name.split(" (")[0];
				summary[baseName] = (summary[baseName] || 0) + item.qty;
			});
		});
		return Object.entries(summary).sort((a, b) => b[1] - a[1]);
	}, [orders]);
	const filteredOrders = (0, import_react.useMemo)(() => {
		let result = [...orders];
		result.sort((a, b) => getTimestampFromOrderId(a.id) - getTimestampFromOrderId(b.id));
		if (statusFilter !== "active") result = result.filter((o) => o.status === statusFilter);
		else result = result.filter((o) => o.status !== "สำเร็จ");
		if (typeFilter !== "all") result = result.filter((o) => o.orderType === typeFilter);
		return result;
	}, [
		orders,
		statusFilter,
		typeFilter
	]);
	const ordersByStatus = (0, import_react.useMemo)(() => {
		const list = orders.filter((o) => typeFilter === "all" ? true : o.orderType === typeFilter);
		list.sort((a, b) => getTimestampFromOrderId(a.id) - getTimestampFromOrderId(b.id));
		return {
			waiting: list.filter((o) => o.status === "รอดำเนินการ"),
			cooking: list.filter((o) => o.status === "กำลังทำ" || o.status === "กำลังเตรียม"),
			ready: list.filter((o) => o.status === "พร้อมเสิร์ฟ")
		};
	}, [orders, typeFilter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "h-screen bg-[#fff8f2] text-[#002e47] flex flex-row font-sans select-none antialiased overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: .4 },
				exit: { opacity: 0 },
				onClick: () => setSidebarOpen(false),
				className: "fixed inset-0 bg-black/60 z-[50] md:hidden"
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
					refundCount: stats.refunds
				})
			})] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "hidden md:flex flex-col w-72 h-screen shrink-0 border-r border-[#ece4d6] shadow-soft z-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(KitchenSidebarContent, {
					view,
					setView,
					refundCount: stats.refunds
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
									children: view === "kitchen" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, {
										className: "h-5 w-5",
										color: GOLD
									}) : view === "refunds" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
										className: "h-5 w-5",
										color: GOLD
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, {
										className: "h-5 w-5",
										color: GOLD
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-base sm:text-lg font-black tracking-tight",
									style: { color: BRAND },
									children: view === "kitchen" ? "จอจัดการครัวลุงเกตุ" : view === "refunds" ? "คำขอคืนเงิน & ยกเลิกออเดอร์" : "แดชบอร์ดภาพรวมร้านค้า"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] sm:text-xs font-semibold text-slate-500",
									children: view === "kitchen" ? "ระบบจัดคิวอาหารและมอนิเตอร์หน้าเตา" : view === "refunds" ? "จัดการรายการแจ้งยกเลิกและโอนเงินคืนให้ลูกค้า" : "วิเคราะห์ยอดขาย จำนวนลูกค้า และสถิติร้านค้า"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs",
								children: [
									view === "kitchen" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-[#fcfbf9] border border-[#ece4d6] px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-slate-500",
											children: "คิวรอดำเนินการ:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs sm:text-sm font-black",
											style: { color: BRAND },
											children: stats.totalActive
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSoundEnabled(!soundEnabled),
										className: `p-2 rounded-xl border transition active:scale-95 cursor-pointer ${soundEnabled ? "bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100" : "bg-slate-100 border-slate-200 text-slate-400 hover:bg-slate-200"}`,
										title: soundEnabled ? "ปิดเสียงเตือน" : "เปิดเสียงเตือน",
										children: soundEnabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { size: 15 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { size: 15 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: triggerMockOrder,
										className: "flex items-center gap-1.5 hover:opacity-90 active:scale-95 text-[#002e47] px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wider transition shadow-sm cursor-pointer border border-[#002e47]/10",
										style: { background: GOLD },
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlus, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "จำลองออเดอร์" })]
									})
								]
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
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-sm font-black tracking-tight",
									style: { color: BRAND },
									children: view === "kitchen" ? "ครัวลุงเกตุ" : view === "refunds" ? "คำขอคืนเงิน" : "แดชบอร์ดหลังบ้าน"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[9px] font-bold text-slate-500",
									children: view === "kitchen" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										"คิวค้าง: ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#002e47]",
											children: stats.totalActive
										}),
										" · ช่องทาง: ",
										typeFilter === "all" ? "ทั้งหมด" : typeFilter === "dine-in" ? "ทานที่ร้าน" : typeFilter === "takeaway" ? "กลับบ้าน" : "เดลิเวอรี่"
									] }) : view === "refunds" ? "จัดการคัดลอกโอนเงินคืนลูกค้า" : "ภาพรวมร้านค้าลุงเกตุ"
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [statusFilter === "สำเร็จ" && stats.completed > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: clearCompletedOrders,
									className: "flex items-center gap-1 bg-red-50 border border-red-200 text-red-600 px-2.5 py-1 rounded-xl text-[10px] font-black transition cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 11 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ล้าง" })]
								}), !soundEnabled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "p-1.5 rounded-lg bg-red-50 text-red-500 border border-red-100 flex items-center justify-center",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { size: 13 })
								})]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "p-3 sm:p-4 lg:p-6 w-full mx-auto flex flex-col gap-4 sm:gap-6",
						children: view === "dashboard" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardView, { orders }) : view === "menu" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuManagementView, {}) : view === "refunds" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefundManagementView, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden md:flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white border border-[#ece4d6] p-3 rounded-2xl shrink-0 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-row overflow-x-auto no-scrollbar gap-1 w-full sm:w-auto shrink-0 pb-1 sm:pb-0",
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
								className: "bg-white border border-[#ece4d6] p-3 rounded-2xl flex flex-col sm:flex-row sm:items-center gap-2.5 shrink-0 shadow-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1.5 text-xs font-black text-[#002e47] shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, {
										size: 14,
										className: "text-[#fcc14a]"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ยอดสรุปอาหารที่ต้องปรุง:" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5 overflow-x-auto no-scrollbar max-h-[80px] sm:max-h-none overflow-y-auto",
									children: menuSummary.map(([name, qty]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5 bg-[#002e47]/5 border border-[#002e47]/10 rounded-xl px-3 py-1 text-xs shrink-0 font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[#002e47]",
											children: name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "bg-[#fcc14a] text-[#002e47] font-black px-1.5 py-0.2 rounded-md text-[10px] leading-tight",
											children: ["x", qty]
										})]
									}, name))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-full overflow-x-auto pb-6",
								children: statusFilter === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex md:hidden flex-col gap-4 pb-24",
									children: filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "py-16 text-center text-[#5a6e7a] font-bold bg-white rounded-3xl border border-[#ece4d6] p-6 shadow-soft",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, {
											size: 36,
											className: "opacity-30 mx-auto mb-2"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ไม่มีรายการคิวปัจจุบัน" })]
									}) : filteredOrders.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, {
										order: o,
										advanceOrderStatus,
										regressOrderStatus
									}, o.id))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "hidden md:grid md:grid-cols-3 gap-6 min-w-[960px]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-soft",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-4 bg-amber-500/10 border-b border-[#ece4d6] flex items-center justify-between shrink-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "font-black text-sm uppercase tracking-wider",
														style: { color: BRAND },
														children: "ออเดอร์ใหม่"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white text-xs font-black px-2.5 py-0.5 rounded-full bg-amber-500",
													children: ordersByStatus.waiting.length
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "p-4 space-y-4 bg-[#f8fafc]/50",
												children: ordersByStatus.waiting.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyColumnMessage, { text: "ไม่มีออเดอร์ใหม่" }) : ordersByStatus.waiting.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, {
													order: o,
													advanceOrderStatus,
													regressOrderStatus
												}, o.id))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-soft",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-4 bg-blue-50 border-b border-[#ece4d6] flex items-center justify-between shrink-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "font-black text-sm uppercase tracking-wider",
														style: { color: BRAND },
														children: "กำลังปรุง"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white text-xs font-black px-2.5 py-0.5 rounded-full bg-blue-600",
													children: ordersByStatus.cooking.length
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "p-4 space-y-4 bg-[#f8fafc]/50",
												children: ordersByStatus.cooking.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyColumnMessage, { text: "ไม่มีรายการกำลังปรุง" }) : ordersByStatus.cooking.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, {
													order: o,
													advanceOrderStatus,
													regressOrderStatus
												}, o.id))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-col bg-white rounded-3xl border border-[#ece4d6] shadow-soft",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "p-4 bg-emerald-50 border-b border-[#ece4d6] flex items-center justify-between shrink-0",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
														className: "font-black text-sm uppercase tracking-wider",
														style: { color: BRAND },
														children: "พร้อมเสิร์ฟ"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500",
													children: ordersByStatus.ready.length
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "p-4 space-y-4 bg-[#f8fafc]/50",
												children: ordersByStatus.ready.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyColumnMessage, { text: "ไม่มีออเดอร์พร้อมเสิร์ฟ" }) : ordersByStatus.ready.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, {
													order: o,
													advanceOrderStatus,
													regressOrderStatus
												}, o.id))
											})]
										})
									]
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white rounded-3xl border border-[#ece4d6] shadow-soft flex flex-col",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-4 bg-slate-50 border-b border-[#ece4d6] flex items-center justify-between shrink-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-black text-sm uppercase tracking-wider",
											style: { color: BRAND },
											children: statusFilter === "สำเร็จ" ? "ประวัติรายการสำเร็จ" : `สถานะออเดอร์: ${statusFilter}`
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [statusFilter === "สำเร็จ" && stats.completed > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: clearCompletedOrders,
												className: "flex items-center gap-1.5 bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer shadow-sm",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 13 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ล้างรายการสำเร็จทั้งหมด" })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "bg-slate-200 text-slate-700 text-xs font-black px-2.5 py-0.5 rounded-full",
												children: [filteredOrders.length, " รายการ"]
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "p-3 sm:p-4 pb-24 md:pb-6 bg-[#f8fafc]/50",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `mx-auto w-full ${statusFilter === "สำเร็จ" ? "flex flex-col gap-3 max-w-3xl" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"}`,
											children: filteredOrders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "py-16 text-center text-slate-400 font-bold w-full col-span-full",
												children: "ไม่มีออเดอร์ในส่วนนี้"
											}) : filteredOrders.map((o) => statusFilter === "สำเร็จ" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryOrderRow, { order: o }, o.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, {
												order: o,
												advanceOrderStatus,
												regressOrderStatus
											}, o.id))
										})
									})]
								})
							})
						] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "block md:hidden sticky bottom-0 left-0 right-0 bg-white border-t border-[#ece4d6] shadow-lg px-2 py-1 z-30 shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center justify-around",
							children: [
								{
									id: "active",
									label: "ทั้งหมด",
									icon: ClipboardList,
									count: stats.totalActive
								},
								{
									id: "รอดำเนินการ",
									label: "ใหม่",
									icon: Inbox,
									count: stats.waiting
								},
								{
									id: "กำลังทำ",
									label: "กำลังปรุง",
									icon: Flame,
									count: stats.cooking
								},
								{
									id: "พร้อมเสิร์ฟ",
									label: "พร้อมเสิร์ฟ",
									icon: CircleCheckBig,
									count: stats.ready
								},
								{
									id: "สำเร็จ",
									label: "สำเร็จแล้ว",
									icon: Trophy,
									count: stats.completed
								}
							].map((tab) => {
								const TabIcon = tab.icon;
								const isActive = view === "kitchen" && statusFilter === tab.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => {
										setView("kitchen");
										setStatusFilter(tab.id);
									},
									className: `relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all cursor-pointer min-w-[60px] ${isActive ? "text-[#002e47] font-black" : "text-slate-400 font-medium"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabIcon, {
											size: 18,
											className: isActive ? "stroke-[2.5]" : "stroke-[2]"
										}), tab.count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute -top-1.5 -right-2 bg-red-500 text-white text-[8px] font-bold px-1 py-0.2 rounded-full min-w-[12px] text-center",
											children: tab.count
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] mt-1 tracking-tight",
										children: tab.label
									})]
								}, tab.id);
							})
						})
					})
				]
			})
		]
	});
}
//#endregion
export { KitchenMonitor as component };

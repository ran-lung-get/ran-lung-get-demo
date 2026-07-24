import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-BbREKNGv.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { D as Plus, E as Receipt, F as MessageCircle, G as History, I as Menu, L as MapPin, M as PartyPopper, N as Package, O as Phone, P as Minus, R as LogOut, W as House, _ as Star, b as ShoppingBag, ct as ChevronLeft, dt as Check, et as CreditCard, g as Store, i as Utensils, k as Pencil, lt as ChevronDown, mt as Bike, nt as Clock, o as User, ot as CircleCheckBig, p as Trash2, rt as ClipboardList, st as ChevronRight, t as X, ut as ChefHat, w as Search, y as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { t as MENU } from "./customer-CXoL6D-b.mjs";
import { a as syncAuthUserToSupabase } from "./supabase.service-B-38Jtjp.mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./translation.functions-CL9HGddj.mjs";
import { n as useLanguage } from "./i18n-DLuw9dTA.mjs";
import { t as liff } from "../_libs/line__liff+whatwg-fetch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customer-DwRzUp_K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function liffLogout() {
	liff.logout();
}
var createStripeSession = createServerFn({ method: "POST" }).inputValidator(objectType({
	cart: arrayType(objectType({
		name: stringType(),
		price: numberType(),
		qty: numberType(),
		image: stringType().optional().nullable()
	})),
	subtotal: numberType(),
	deliveryFee: numberType(),
	orderType: enumType([
		"dine-in",
		"takeaway",
		"delivery"
	]),
	origin: stringType()
})).handler(createSsrRpc("6b4488881deae7e3365fe0ebfdea8eed7b8a778b0f25096ab4bc9f62b8e899bf"));
var verifyStripeSession = createServerFn({ method: "POST" }).inputValidator(objectType({ sessionId: stringType() })).handler(createSsrRpc("818ca136293094221adfa261da8c10a991ddc9eca4c1f1f6272328657ac214b2"));
var HERO_IMG = "/thai_food_hero.jpg";
var PROTEINS = [
	{
		id: "p_minced_pork",
		name: "หมูสับ",
		price: 0
	},
	{
		id: "p_crispy_pork",
		name: "หมูกรอบ",
		price: 20
	},
	{
		id: "p_sliced_pork",
		name: "หมูชิ้น",
		price: 10
	},
	{
		id: "p_minced_chicken",
		name: "ไก่สับ",
		price: 0
	},
	{
		id: "p_boiled_chicken",
		name: "ไก่ต้ม",
		price: 0
	},
	{
		id: "p_beef",
		name: "เนื้อ",
		price: 10
	},
	{
		id: "p_squid",
		name: "หมึก",
		price: 10
	},
	{
		id: "p_shrimp",
		name: "กุ้ง",
		price: 10
	},
	{
		id: "p_clam",
		name: "หอยลาย",
		price: 10
	},
	{
		id: "p_no_meat",
		name: "ไม่เอาเนื้อสัตว์",
		price: 0
	}
];
var TOPPINGS = [
	{
		id: "t_sausage",
		name: "ไส้กรอก",
		price: 10
	},
	{
		id: "t_chinese_sausage",
		name: "กุนเชียง",
		price: 10
	},
	{
		id: "t_soft_boiled_egg",
		name: "ไข่ดาวไม่สุก",
		price: 10
	},
	{
		id: "t_fried_egg",
		name: "ไข่ดาวสุก",
		price: 10
	},
	{
		id: "t_boiled_egg",
		name: "ไข่ต้ม",
		price: 10
	},
	{
		id: "t_omelet",
		name: "ไข่เจียว",
		price: 10
	}
];
var SIZES = [{
	id: "s_regular",
	name: "ธรรมดา",
	price: 0
}, {
	id: "s_special",
	name: "พิเศษ",
	price: 10
}];
var BRAND = "#002e47";
var GOLD = "#fcc14a";
var INK_MUTED = "#5a6e7a";
var LINEN = "#fff8f2";
var SURFACE = "#f8fafc";
function LiffApp() {
	const navigate = useNavigate();
	const [liffReady, setLiffReady] = (0, import_react.useState)(false);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const { language, setLanguage, t, tMenu } = useLanguage();
	(0, import_react.useEffect)(() => {
		window.ChatWidgetConfig = {
			mode: "realtime-widget",
			widgetId: "ran-lung-get",
			avatarUrl: "Botnoi",
			container: "#webavatar-container",
			greetingInstruction: "",
			enableBubble: "true",
			cameraOffset: "0,0,0"
		};
		let scriptElement = null;
		if (!document.getElementById("webavatar-jssdk")) {
			const s = document.createElement("script");
			s.id = "webavatar-jssdk";
			s.src = "https://webavatar.didthat.cc/chat-widget.js";
			s.async = true;
			(document.head || document.body).appendChild(s);
			scriptElement = s;
		}
		const handleNavigate = (e) => {
			e.preventDefault();
			const target = e.detail.target;
			navigate({ to: target });
		};
		window.addEventListener("webavatar-navigate", handleNavigate);
		return () => {
			window.removeEventListener("webavatar-navigate", handleNavigate);
			if (scriptElement && scriptElement.parentNode) scriptElement.parentNode.removeChild(scriptElement);
			const existingScript = document.getElementById("webavatar-jssdk");
			if (existingScript && existingScript.parentNode) existingScript.parentNode.removeChild(existingScript);
			if (window.WebAvatar) try {
				window.WebAvatar.disconnect();
			} catch (err) {
				console.error("Error disconnecting WebAvatar on unmount:", err);
			}
			delete window.ChatWidgetConfig;
		};
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		let authListener = null;
		async function bootstrap(sessionToCheck) {
			try {
				if (localStorage.getItem("ran-lung-get-guest") === "true") {
					if (!cancelled) {
						setProfile({
							userId: "guest",
							displayName: "ลูกค้าหน้าร้าน"
						});
						setLiffReady(true);
					}
					return;
				}
				const { data: { session } } = await supabase.auth.getSession();
				const finalSession = sessionToCheck || session;
				if (finalSession) {
					if (!cancelled) {
						setProfile({
							userId: finalSession.user.id,
							displayName: finalSession.user.email ?? "ผู้ใช้งาน",
							pictureUrl: void 0
						});
						setLiffReady(true);
						try {
							const res = await syncAuthUserToSupabase(finalSession.user);
							if (res) {
								setDbUser(res.user);
								setDbCustomer(res.customer);
							}
						} catch (e) {
							console.error("Failed to sync auth user:", e);
						}
					}
					return;
				}
				if (!cancelled) navigate({ to: "/login" });
			} catch (err) {
				if (!cancelled) {
					console.error("[Auth Guard error]", err);
					navigate({ to: "/login" });
				}
			}
		}
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_IN" && session) bootstrap(session);
		});
		authListener = data.subscription;
		bootstrap();
		return () => {
			cancelled = true;
			if (authListener) authListener.unsubscribe();
		};
	}, [navigate]);
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("ran-lung-get-orders");
		if (saved) try {
			setOrderHistory(JSON.parse(saved));
		} catch (e) {
			console.error("Failed to parse orders from storage:", e);
		}
		const handleStorageChange = (e) => {
			if (e.key === "ran-lung-get-orders" && e.newValue) try {
				setOrderHistory(JSON.parse(e.newValue));
			} catch (err) {
				console.error("Failed to parse synced orders:", err);
			}
		};
		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);
	const [tab, setTab] = (0, import_react.useState)("home");
	const [dbUser, setDbUser] = (0, import_react.useState)(null);
	const [dbCustomer, setDbCustomer] = (0, import_react.useState)(null);
	const [overlay, setOverlay] = (0, import_react.useState)(null);
	const [stripeVerifying, setStripeVerifying] = (0, import_react.useState)(false);
	const [stripeError, setStripeError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!liffReady || typeof window === "undefined") return;
		const params = new URLSearchParams(window.location.search);
		const isSuccess = params.get("payment_success") === "true";
		const sessionId = params.get("session_id");
		if (isSuccess && sessionId) {
			async function verifyAndSave() {
				setStripeVerifying(true);
				try {
					console.log("[Stripe Client] Verifying checkout session:", sessionId);
					const result = await verifyStripeSession({ data: { sessionId } });
					if (result.success) {
						const pendingStr = localStorage.getItem("ran-lung-get-pending-stripe-order");
						if (pendingStr) {
							const pending = JSON.parse(pendingStr);
							console.log("[Stripe Client] Pending order restored:", pending);
							saveOrderToHistory(pending.cart, pending.orderType, pending.selectedTable, pending.address);
							setCart([]);
							localStorage.removeItem("ran-lung-get-pending-stripe-order");
							setShowSuccess(true);
							setOverlay(null);
							setTab("status");
							setTimeout(() => {
								setShowSuccess(false);
							}, 2e3);
						} else setStripeError("ไม่พบข้อมูลคำสั่งซื้อที่รอดำเนินการ กรุณาตรวจสอบประวัติการสั่งซื้อของคุณ (Pending order details not found)");
					} else setStripeError(result.message || "การชำระเงินไม่ผ่านการตรวจสอบความถูกต้อง (Stripe verification failed)");
				} catch (err) {
					console.error("[Stripe Client] Error verifying Stripe session:", err);
					setStripeError(err?.message || "ระบบไม่สามารถตรวจสอบความถูกต้องของการชำระเงินได้");
				} finally {
					setStripeVerifying(false);
					const newUrl = window.location.pathname;
					window.history.replaceState({}, document.title, newUrl);
				}
			}
			verifyAndSave();
		} else if (params.get("payment_cancelled") === "true") {
			setStripeError("การชำระเงินผ่าน Stripe ถูกยกเลิก");
			const newUrl = window.location.pathname;
			window.history.replaceState({}, document.title, newUrl);
		}
	}, [liffReady]);
	const [sidebar, setSidebar] = (0, import_react.useState)(false);
	const [menuItems, setMenuItems] = (0, import_react.useState)(MENU);
	const [cart, setCart] = (0, import_react.useState)([]);
	const [selectedItem, setSelectedItem] = (0, import_react.useState)(null);
	const [editingCartLine, setEditingCartLine] = (0, import_react.useState)(null);
	const selectedItemToEdit = (0, import_react.useMemo)(() => {
		if (editingCartLine) return menuItems.find((m) => m.id === editingCartLine.itemId) || null;
		return null;
	}, [editingCartLine, menuItems]);
	const [cartDrawer, setCartDrawer] = (0, import_react.useState)(false);
	const [orderType, setOrderType] = (0, import_react.useState)(null);
	const [showSuccess, setShowSuccess] = (0, import_react.useState)(false);
	const [hasActiveOrder, setHasActiveOrder] = (0, import_react.useState)(false);
	const [activeOrderNumber, setActiveOrderNumber] = (0, import_react.useState)("");
	const [selectedTable, setSelectedTable] = (0, import_react.useState)("");
	const [showTablePicker, setShowTablePicker] = (0, import_react.useState)(false);
	const [tables, setTables] = (0, import_react.useState)([
		{
			id: "1",
			label: "โต๊ะ 1",
			status: "available"
		},
		{
			id: "2",
			label: "โต๊ะ 2",
			status: "available"
		},
		{
			id: "3",
			label: "โต๊ะ 3",
			status: "available"
		},
		{
			id: "4",
			label: "โต๊ะ 4",
			status: "available"
		},
		{
			id: "5",
			label: "โต๊ะ 5",
			status: "available"
		},
		{
			id: "6",
			label: "โต๊ะ 6",
			status: "available"
		},
		{
			id: "7",
			label: "โต๊ะ 7",
			status: "available"
		},
		{
			id: "8",
			label: "โต๊ะ 8",
			status: "available"
		},
		{
			id: "9",
			label: "โต๊ะ 9 (Walk-in)",
			status: "available"
		},
		{
			id: "10",
			label: "โต๊ะ 10 (Walk-in)",
			status: "available"
		}
	]);
	(0, import_react.useEffect)(() => {
		async function fetchTables() {
			try {
				const { data, error } = await supabase.from("restaurant_tables").select("id, label, status").order("id");
				if (!error && data && data.length > 0) {
					const has9 = data.some((t) => t.id === "9" || t.label.includes("โต๊ะ 9"));
					const has10 = data.some((t) => t.id === "10" || t.label.includes("โต๊ะ 10"));
					const merged = [...data];
					if (!has9) merged.push({
						id: "9",
						label: "โต๊ะ 9 (Walk-in)",
						status: "available"
					});
					if (!has10) merged.push({
						id: "10",
						label: "โต๊ะ 10 (Walk-in)",
						status: "available"
					});
					setTables(merged);
				}
			} catch {}
		}
		fetchTables();
		const ch = supabase.channel("tables-realtime").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "restaurant_tables"
		}, (payload) => {
			if (payload.eventType === "UPDATE" || payload.eventType === "INSERT") {
				const updated = payload.new;
				setTables((prev) => prev.map((t) => t.id === String(updated.id) ? {
					...t,
					...updated,
					id: String(updated.id)
				} : t));
			}
		}).subscribe();
		return () => {
			supabase.removeChannel(ch);
		};
	}, []);
	const [address, setAddress] = (0, import_react.useState)("");
	const [addressType, setAddressType] = (0, import_react.useState)("home");
	const [deliveryMethod, setDeliveryMethod] = (0, import_react.useState)(null);
	const [showAddressError, setShowAddressError] = (0, import_react.useState)(false);
	const [showTypeError, setShowTypeError] = (0, import_react.useState)(false);
	const [simulateClosed, setSimulateClosed] = (0, import_react.useState)(false);
	const [bypassRealClosed, setBypassRealClosed] = (0, import_react.useState)(false);
	const [ingredients, setIngredients] = (0, import_react.useState)([]);
	const [recipes, setRecipes] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		async function loadMenu() {
			try {
				const { data: dbItems, error } = await supabase.from("menu_items").select("*").order("sort_order");
				if (!error && dbItems && dbItems.length > 0) {
					const mapped = dbItems.map((item) => ({
						id: item.id,
						name: item.name,
						desc: item.description || "",
						price: Number(item.price),
						image: item.image_url || item.image || "",
						category: item.category,
						isAvailable: item.is_available ?? true,
						isSpicy: item.is_spicy ?? false,
						options: item.options || void 0,
						addons: item.addons || void 0
					}));
					setMenuItems(mapped);
					localStorage.setItem("ran-lung-get-menu-items", JSON.stringify(mapped));
				} else {
					const localMenu = localStorage.getItem("ran-lung-get-menu-items");
					if (localMenu) setMenuItems(JSON.parse(localMenu));
				}
			} catch (err) {
				console.warn("Failed to load menu from Supabase:", err);
				const localMenu = localStorage.getItem("ran-lung-get-menu-items");
				if (localMenu) setMenuItems(JSON.parse(localMenu));
			}
		}
		async function loadStock() {
			try {
				const { data: ingData } = await supabase.from("ingredients").select("*");
				if (ingData && ingData.length > 0) setIngredients(ingData);
				else {
					const localIng = localStorage.getItem("ran-lung-get-mock-ingredients");
					if (localIng) setIngredients(JSON.parse(localIng));
				}
				const { data: recData } = await supabase.from("recipe_items").select("*");
				if (recData && recData.length > 0) setRecipes(recData);
				else setRecipes([
					{
						option_id: "opt-mu-sap",
						ingredient_id: "mock-1",
						quantity_required: 80
					},
					{
						option_id: "opt-mu-krob",
						ingredient_id: "mock-2",
						quantity_required: 80
					},
					{
						option_id: "opt-mu-chin",
						ingredient_id: "mock-3",
						quantity_required: 80
					},
					{
						option_id: "opt-kai-sap",
						ingredient_id: "mock-4",
						quantity_required: 80
					},
					{
						option_id: "opt-kai-tom",
						ingredient_id: "mock-5",
						quantity_required: 80
					},
					{
						option_id: "opt-nua",
						ingredient_id: "mock-6",
						quantity_required: 80
					},
					{
						option_id: "opt-muek",
						ingredient_id: "mock-7",
						quantity_required: 80
					},
					{
						option_id: "opt-kung",
						ingredient_id: "mock-8",
						quantity_required: 80
					},
					{
						option_id: "opt-hoi-lay",
						ingredient_id: "mock-9",
						quantity_required: 80
					},
					{
						option_id: "opt-khai-kai",
						ingredient_id: "mock-10",
						quantity_required: 1
					},
					{
						option_id: "opt-sai-krog",
						ingredient_id: "mock-11",
						quantity_required: 1
					},
					{
						option_id: "opt-kun-chiang",
						ingredient_id: "mock-12",
						quantity_required: 1
					}
				]);
			} catch (err) {
				console.warn("Error loading stock from database, using local fallback:", err);
				const localIng = localStorage.getItem("ran-lung-get-mock-ingredients");
				if (localIng) setIngredients(JSON.parse(localIng));
			}
		}
		loadMenu();
		loadStock();
		const handleStorageChange = (e) => {
			if (e.key === "ran-lung-get-mock-ingredients" && e.newValue) try {
				setIngredients(JSON.parse(e.newValue));
			} catch (err) {
				console.error("Storage sync parse error:", err);
			}
			if (e.key === "ran-lung-get-menu-items" && e.newValue) try {
				setMenuItems(JSON.parse(e.newValue));
			} catch (err) {
				console.error("Storage sync parse error:", err);
			}
		};
		window.addEventListener("storage", handleStorageChange);
		const chMenu = supabase.channel("menu-items-realtime-customer").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "menu_items"
		}, () => {
			loadMenu();
		}).subscribe();
		const chIng = supabase.channel("ingredients-realtime-customer").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "ingredients"
		}, () => {
			loadStock();
		}).subscribe();
		const chRec = supabase.channel("recipe_items-realtime-customer").on("postgres_changes", {
			event: "*",
			schema: "public",
			table: "recipe_items"
		}, () => {
			loadStock();
		}).subscribe();
		return () => {
			window.removeEventListener("storage", handleStorageChange);
			supabase.removeChannel(chMenu);
			supabase.removeChannel(chIng);
			supabase.removeChannel(chRec);
		};
	}, []);
	const checkOptionOutOfStock = (optionId) => {
		const optionRecipes = recipes.filter((r) => r.option_id === optionId);
		if (optionRecipes.length === 0) return false;
		return optionRecipes.some((recipe) => {
			const ingredient = ingredients.find((i) => {
				return i.id === recipe.ingredient_id || i.name === recipe.ingredient_id || recipe.ingredient_id && recipe.ingredient_id.includes(i.name);
			});
			if (!ingredient) return true;
			if (ingredient.is_active === false || ingredient.status === "disabled") return true;
			return Number(ingredient.quantity) < Number(recipe.quantity_required);
		});
	};
	const isCurrentlyClosed = (0, import_react.useMemo)(() => {
		if (simulateClosed) return true;
		if (bypassRealClosed) return false;
		const thTimeStr = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
		const thTime = new Date(thTimeStr);
		const day = thTime.getDay();
		const hour = thTime.getHours();
		const minute = thTime.getMinutes();
		if (day === 6) return true;
		const timeInMinutes = hour * 60 + minute;
		if (timeInMinutes < 480 || timeInMinutes >= 1260) return true;
		return false;
	}, [simulateClosed, bypassRealClosed]);
	const shouldShowClosedOverlay = isCurrentlyClosed && tab === "home" && (overlay === null || overlay === "menu" || overlay === "orderConfirm" || overlay === "payment");
	const [orderHistory, setOrderHistory] = (0, import_react.useState)([{
		id: "hist_1",
		orderNumber: "#AK-2841",
		date: "17 มิ.ย. 2026 · 18:30",
		items: [{
			name: "กระเพราหมูสับ (ข้าวราด)",
			qty: 2,
			price: 60,
			image: "/meal/krapao.jpg"
		}, {
			name: "น้ำส้มคั้น",
			qty: 1,
			price: 50,
			image: "/meal/orange_juice.jpg"
		}],
		subtotal: 170,
		delivery: 40,
		total: 210,
		status: "สำเร็จ",
		orderType: "delivery"
	}, {
		id: "hist_2",
		orderNumber: "#AK-2835",
		date: "15 มิ.ย. 2026 · 12:15",
		items: [{
			name: "ผัดซีอิ๊ว (เส้นใหญ่)",
			qty: 1,
			price: 70,
			image: "/meal/pad_see_ew.jpg"
		}, {
			name: "เฉาก๊วย",
			qty: 1,
			price: 40,
			image: "/meal/grass_jelly.webp"
		}],
		subtotal: 110,
		delivery: 40,
		total: 150,
		status: "สำเร็จ",
		orderType: "delivery"
	}]);
	const totalQty = cart.reduce((s, l) => s + l.qty, 0);
	const subtotal = cart.reduce((s, l) => s + l.price * l.qty, 0);
	const deliveryFee = orderType === "delivery" ? 40 : 0;
	const addToCart = (line) => setCart((c) => [...c, line]);
	const removeLine = (id) => setCart((c) => c.filter((l) => l.id !== id));
	const saveOrderToHistory = (customCart, customOrderType, customSelectedTable, customAddress) => {
		const activeCart = customCart || cart;
		const activeOrderType = customOrderType || orderType;
		const activeSelectedTable = customSelectedTable !== void 0 ? customSelectedTable : selectedTable;
		const activeAddress = customAddress !== void 0 ? customAddress : address;
		if (activeCart.length === 0) return;
		const orderNum = `#AK-${Math.floor(2848 + Math.random() * 100)}`;
		const selectedTableObj = tables.find((t) => t.id === activeSelectedTable);
		const tableNumStr = activeOrderType === "dine-in" && selectedTableObj ? selectedTableObj.label : void 0;
		let takeawayQueueNum = void 0;
		if (activeOrderType === "takeaway") {
			const currentQueueCounter = localStorage.getItem("ran-lung-get-takeaway-queue-counter");
			let nextQueue = 1;
			if (currentQueueCounter) {
				const parsed = parseInt(currentQueueCounter);
				if (!isNaN(parsed)) nextQueue = parsed + 1;
			}
			localStorage.setItem("ran-lung-get-takeaway-queue-counter", String(nextQueue));
			takeawayQueueNum = `Q-${String(nextQueue).padStart(2, "0")}`;
		}
		const activeSubtotal = activeCart.reduce((s, l) => s + l.price * l.qty, 0);
		const activeDeliveryFee = activeOrderType === "delivery" ? 40 : 0;
		const newOrder = {
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
			items: activeCart.map((l) => ({
				name: l.name,
				qty: l.qty,
				price: l.price,
				image: l.image
			})),
			subtotal: activeSubtotal,
			delivery: activeDeliveryFee,
			total: activeSubtotal + activeDeliveryFee,
			status: "รอรับออเดอร์",
			orderType: activeOrderType || "delivery",
			tableNumber: tableNumStr,
			queueNumber: takeawayQueueNum
		};
		const updatedHistory = [newOrder, ...orderHistory];
		setOrderHistory(updatedHistory);
		localStorage.setItem("ran-lung-get-orders", JSON.stringify(updatedHistory));
		setActiveOrderNumber(orderNum);
		setHasActiveOrder(true);
		if (activeOrderType === "dine-in" && activeSelectedTable) {
			setTables((prev) => prev.map((t) => t.id === activeSelectedTable ? {
				...t,
				status: "occupied"
			} : t));
			supabase.from("restaurant_tables").update({ status: "occupied" }).eq("id", activeSelectedTable);
		}
		const insertOrder = async () => {
			let finalUserId = dbUser?.id;
			let finalCustomerId = dbCustomer?.id;
			if (!finalUserId || !finalCustomerId) try {
				const { data: users } = await supabase.from("users").select("id").limit(1);
				const { data: customers } = await supabase.from("customers").select("id").limit(1);
				if (users && users.length > 0) finalUserId = users[0].id;
				if (customers && customers.length > 0) finalCustomerId = customers[0].id;
			} catch {}
			if (!finalUserId || !finalCustomerId) {
				console.warn("Could not find any user or customer in Supabase. Skipping Supabase insert.");
				return;
			}
			const orderId = typeof crypto?.randomUUID === "function" ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
				const r = Math.random() * 16 | 0;
				return (c == "x" ? r : r & 3 | 8).toString(16);
			});
			const { error: orderErr } = await supabase.from("orders").insert({
				id: orderId,
				order_number: orderNum,
				user_id: finalUserId,
				customer_id: finalCustomerId,
				line_user_id: profile?.userId || null,
				order_type: activeOrderType || "delivery",
				status: "pending",
				subtotal: activeSubtotal,
				delivery_fee: activeDeliveryFee,
				total: activeSubtotal + activeDeliveryFee,
				table_number: tableNumStr || null,
				delivery_address: activeOrderType === "delivery" ? activeAddress : null,
				special_instructions: null,
				created_at: (/* @__PURE__ */ new Date()).toISOString()
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
				created_at: (/* @__PURE__ */ new Date()).toISOString()
			}));
			const { error: itemsErr } = await supabase.from("order_items").insert(orderItems);
			if (itemsErr) console.error("Failed to insert order items in Supabase:", itemsErr);
		};
		insertOrder();
	};
	const resetAll = () => {
		setCart([]);
		setOverlay(null);
		setCartDrawer(false);
		setSelectedItem(null);
		setTab("home");
		setShowAddressError(false);
		setShowTypeError(false);
	};
	if (!liffReady) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen w-full flex items-center justify-center relative",
		style: { background: "radial-gradient(circle at 20% 20%, #0d2d42 0%, #050d15 65%, #020609 100%)" },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 pointer-events-none",
			style: {
				backgroundImage: "radial-gradient(circle, rgba(252,193,74,0.05) 1px, transparent 1px)",
				backgroundSize: "32px 32px"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4 z-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				width: 40,
				height: 40,
				borderRadius: "50%",
				border: "3px solid rgba(255,255,255,0.1)",
				borderTopColor: "#fcc14a",
				animation: "spin 0.8s linear infinite"
			} }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `@keyframes spin { to { transform: rotate(360deg); } }` })]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[var(--linen)]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			"aria-label": "แอปพลิเคชันสั่งอาหาร ร้านลุงเก็ต",
			className: "relative overflow-hidden bg-[var(--linen)] no-scrollbar z-10 w-full",
			style: { height: "100dvh" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-0 overflow-y-auto no-scrollbar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								x: tab === "status" ? 20 : -20
							},
							animate: {
								opacity: 1,
								x: 0
							},
							exit: {
								opacity: 0,
								x: tab === "status" ? -20 : 20
							},
							transition: {
								duration: .25,
								ease: "easeInOut"
							},
							className: "h-full",
							children: [tab === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeScreen, {
								menuItems,
								onOpenSidebar: () => setSidebar(true),
								orderType,
								isCurrentlyClosed,
								bypassRealClosed,
								setOrderType,
								onPickItem: (it) => setSelectedItem(it),
								onOpenCart: () => setCartDrawer(true),
								totalQty,
								subtotal,
								onOpenMenu: () => setOverlay("menu"),
								hasActiveOrder,
								activeOrderNumber,
								onGoToStatus: () => setTab("status"),
								selectedTable,
								setSelectedTable,
								tables,
								onOpenTablePicker: () => setShowTablePicker(true),
								activeOrderType: orderHistory.find((o) => o.orderNumber === activeOrderNumber)?.orderType,
								activeOrderStatus: orderHistory.find((o) => o.orderNumber === activeOrderNumber)?.status,
								address,
								setAddress,
								addressType,
								setAddressType,
								deliveryMethod,
								setDeliveryMethod,
								showAddressError,
								setShowAddressError,
								showTypeError,
								setShowTypeError
							}), tab === "status" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusScreen, {
								onOpenSidebar: () => setSidebar(true),
								activeOrder: orderHistory.find((o) => o.orderNumber === activeOrderNumber) || orderHistory[0]
							})]
						}, tab)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: (selectedItem || editingCartLine) && (selectedItem || selectedItemToEdit) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemModal, {
					item: selectedItem || selectedItemToEdit,
					cartLine: editingCartLine || void 0,
					onClose: () => {
						setSelectedItem(null);
						setEditingCartLine(null);
					},
					onAdd: (line) => {
						if (editingCartLine) setCart((c) => c.map((l) => l.id === line.id ? line : l));
						else addToCart(line);
						setSelectedItem(null);
						setEditingCartLine(null);
					},
					checkOptionOutOfStock
				}, "item") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, { children: [
					overlay === "menu" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MenuOverlay, {
						menuItems,
						onBack: () => setOverlay(null),
						onPickItem: (it) => setSelectedItem(it),
						onOpenCart: () => setCartDrawer(true),
						totalQty,
						subtotal
					}, "menu"),
					overlay === "orderConfirm" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderConfirmOverlay, {
						cart,
						subtotal,
						deliveryFee,
						onBack: () => setOverlay("menu"),
						onRemove: removeLine,
						onEdit: (line) => setEditingCartLine(line),
						onProceed: () => setOverlay("payment")
					}, "confirm"),
					overlay === "payment" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentOverlay, {
						total: subtotal + deliveryFee,
						cart,
						orderType: orderType || "delivery",
						deliveryFee,
						subtotal,
						selectedTable,
						address,
						onBack: () => setOverlay("orderConfirm"),
						onSuccess: () => {
							saveOrderToHistory();
							setShowSuccess(true);
							setTimeout(() => {
								setShowSuccess(false);
								setOverlay(null);
								setTab("status");
							}, 1500);
						}
					}, "pay")
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AnimatePresence, { children: [overlay === "history" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryOverlay, {
					orderHistory,
					onBack: () => setOverlay(null),
					onClearHistory: () => {
						setOrderHistory([]);
						localStorage.removeItem("ran-lung-get-orders");
					}
				}, "history"), overlay === "contact" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactOverlay, { onBack: () => setOverlay(null) }, "contact")] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: cartDrawer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartDrawer, {
					cart,
					subtotal,
					onClose: () => setCartDrawer(false),
					onRemove: removeLine,
					onEdit: (line) => {
						setEditingCartLine(line);
						setCartDrawer(false);
					},
					onCheckout: () => {
						setCartDrawer(false);
						setOverlay("orderConfirm");
					}
				}, "cd") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: sidebar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sidebar, {
					onClose: () => setSidebar(false),
					onNavigate: (t) => {
						setSidebar(false);
						if (t === "home" || t === "status") setTab(t);
						if (t === "history") setOverlay("history");
						if (t === "contact") setOverlay("contact");
					},
					orderHistory,
					simulateClosed,
					setSimulateClosed: (val) => {
						setSimulateClosed(val);
						if (val) setBypassRealClosed(false);
					},
					profile,
					onLogout: async () => {
						setLiffReady(false);
						localStorage.removeItem("ran-lung-get-guest");
						await supabase.auth.signOut().catch(() => {});
						try {
							liffLogout();
						} catch {}
						navigate({ to: "/login" });
					}
				}, "sb") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: shouldShowClosedOverlay && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreClosedOverlay, {
					onBypass: () => {
						setBypassRealClosed(true);
						setSimulateClosed(false);
					},
					onOpenSidebar: () => setSidebar(true)
				}, "closed") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showTablePicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TablePickerBottomSheet, {
					tables,
					selectedTable,
					onSelect: (tableId) => {
						const prevTable = selectedTable;
						setSelectedTable(tableId);
						setTables((prev) => prev.map((t) => {
							if (t.id === tableId) return {
								...t,
								status: "occupied"
							};
							if (prevTable && t.id === prevTable) return {
								...t,
								status: "available"
							};
							return t;
						}));
						if (prevTable && prevTable !== tableId) supabase.from("restaurant_tables").update({ status: "available" }).eq("id", prevTable);
						supabase.from("restaurant_tables").update({ status: "occupied" }).eq("id", tableId);
						setTimeout(() => setShowTablePicker(false), 200);
					},
					onClose: () => setShowTablePicker(false)
				}, "table-picker") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showSuccess && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuccessFlash, {}, "sf") }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: totalQty > 0 && tab !== "status" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: {
						y: 40,
						opacity: 0
					},
					animate: {
						y: 0,
						opacity: 1
					},
					exit: {
						y: 40,
						opacity: 0
					},
					transition: {
						type: "spring",
						damping: 20,
						stiffness: 300
					},
					className: "absolute z-20",
					style: {
						left: 16,
						right: 16,
						bottom: 24,
						maxWidth: 600,
						marginLeft: "auto",
						marginRight: "auto"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setCartDrawer(true),
						className: "w-full rounded-2xl px-5 py-4 flex items-center justify-between shadow-[0_12px_32px_rgba(0,46,71,0.38)] transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] cursor-pointer border border-[#fcc14a]/20",
						style: {
							background: `linear-gradient(135deg, ${BRAND} 0%, #001f30 100%)`,
							color: "white"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative grid h-10 w-10 place-items-center rounded-xl backdrop-blur-md",
								style: { background: "rgba(252,193,74,0.18)" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
									size: 20,
									style: { color: GOLD }
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-1.5 -right-1.5 grid h-5 min-w-5 px-1 place-items-center rounded-full text-[10px] font-extrabold shadow-sm border border-white",
									style: {
										background: GOLD,
										color: BRAND
									},
									children: totalQty
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-bold text-sm leading-tight",
									children: "ตะกร้าสินค้า"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-white/60 font-light",
									children: "กดเพื่อดูและสั่งซื้อ"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-black text-lg",
								style: { color: GOLD },
								children: ["฿", subtotal]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								size: 18,
								className: "text-[#fcc14a]"
							})]
						})]
					})
				}, "fixed-cart-bar") }),
				tab === "status" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-sm p-4 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: resetAll,
						className: "w-full max-w-md h-12 rounded-full font-semibold",
						style: {
							background: BRAND,
							color: "white"
						},
						children: "กลับไปยังหน้าหลัก"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "webavatar-container",
					className: `absolute bottom-6 right-4 z-40 transition-opacity duration-300 ${tab === "home" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
					style: {
						width: "100px",
						height: "100px"
					}
				})
			]
		})
	});
}
function DeliveryBlock({ onOpenMenu, address, setAddress, addressType, setAddressType, deliveryMethod, setDeliveryMethod, showAddressError, setShowAddressError }) {
	const [touched, setTouched] = (0, import_react.useState)(false);
	address.trim().length;
	const DELIVERY_METHODS = [{
		id: "leave",
		label: "วางไว้ที่หน้าประตู",
		sublabel: "เราวางอาหารไว้ให้",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { size: 20 })
	}, {
		id: "pickup",
		label: "ลงมารับเอง",
		sublabel: "รับที่จุดรับอาหาร",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 20 })
	}];
	const handleAddressChange = (val) => {
		setAddress(val);
		setTouched(true);
		if (val.trim().length >= 5 && deliveryMethod) setShowAddressError(false);
	};
	const handleDeliveryMethodChange = (method) => {
		setDeliveryMethod(method);
		if (address.trim().length >= 5 && method) setShowAddressError(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-10 w-10 place-items-center rounded-full shrink-0",
				style: {
					background: LINEN,
					color: BRAND
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 18 })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "delivery-address",
						className: "text-[10px] uppercase tracking-[0.12em] mb-1 block",
						style: { color: INK_MUTED },
						children: "ที่อยู่จัดส่ง"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "delivery-address",
						name: "delivery-address",
						"aria-label": "ที่อยู่จัดส่ง",
						value: address,
						onChange: (e) => handleAddressChange(e.target.value),
						onBlur: () => setTouched(true),
						placeholder: "กรอกที่อยู่ เช่น ถนนสุขุมวิท 31",
						className: "w-full rounded-xl border px-3 py-2.5 text-sm transition",
						style: {
							borderColor: showAddressError || touched && address.trim().length < 5 ? "#ef4444" : address.trim().length >= 5 ? "#16a34a" : "#ece4d6",
							outline: "none"
						}
					}),
					(showAddressError || touched && address.trim().length < 5) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] text-red-500",
						children: "กรุณากรอกที่อยู่ให้ครบถ้วน (อย่างน้อย 5 ตัวอักษร)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2.5 flex gap-2",
						children: [
							"home",
							"work",
							"dorm"
						].map((id) => {
							const labels = {
								home: "บ้าน",
								work: "ที่ทำงาน",
								dorm: "หอพัก"
							};
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": `ประเภทที่อยู่ ${labels[id]}`,
								onClick: () => setAddressType(id),
								className: "px-3 py-1 rounded-full border text-xs font-medium transition",
								style: {
									borderColor: addressType === id ? BRAND : "#ece4d6",
									background: addressType === id ? BRAND : "white",
									color: addressType === id ? GOLD : BRAND
								},
								children: labels[id]
							}, id);
						})
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] uppercase tracking-[0.12em] mb-2",
				style: { color: INK_MUTED },
				children: "รูปแบบการรับอาหาร"
			}),
			showAddressError && !deliveryMethod && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-red-500 font-semibold mb-2",
				children: "* กรุณาเลือกรูปแบบการรับอาหาร"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2",
				style: {
					border: showAddressError && !deliveryMethod ? "1px solid #ef4444" : "none",
					padding: showAddressError && !deliveryMethod ? "4px" : "0px",
					borderRadius: "12px"
				},
				children: DELIVERY_METHODS.map((m) => {
					const active = deliveryMethod === m.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						"aria-label": `เลือกรูปแบบการรับอาหาร ${m.label}`,
						onClick: () => handleDeliveryMethodChange(m.id),
						className: "flex flex-col items-start gap-1.5 rounded-xl border-2 p-3 text-left transition",
						style: {
							borderColor: active ? BRAND : "#ece4d6",
							background: active ? "#f0f6fa" : "white"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-9 w-9 place-items-center rounded-lg",
								style: {
									background: active ? BRAND : LINEN,
									color: active ? GOLD : BRAND
								},
								children: m.icon
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-semibold leading-tight",
								style: { color: BRAND },
								children: m.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px]",
								style: { color: INK_MUTED },
								children: m.sublabel
							})
						]
					}, m.id);
				})
			})
		] })]
	});
}
function DineInBlock({ selectedTable, onOpenPicker }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid h-10 w-10 place-items-center rounded-full shrink-0",
			style: {
				background: LINEN,
				color: BRAND
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { size: 18 })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] uppercase tracking-[0.12em]",
				style: { color: INK_MUTED },
				children: "ทานที่ร้าน"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-slate-600",
						children: "เลือกโต๊ะจะทำผ่านผังที่นั่ง (เปิด modal)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm font-semibold",
						style: { color: BRAND },
						children: selectedTable ? `โต๊ะที่เลือก: ${selectedTable}` : "ยังไม่ได้เลือกโต๊ะ"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "เปิดผังที่นั่งเลือกโต๊ะ",
							onClick: onOpenPicker,
							className: "px-4 py-2 rounded-full border",
							style: {
								borderColor: BRAND,
								color: BRAND
							},
							children: "เปิดผังที่นั่ง"
						})
					})
				]
			})]
		})]
	}) });
}
function FlagIcon({ lang }) {
	if (lang === "th") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 9 6",
		className: "w-5 h-3.5 rounded-sm shrink-0 shadow-sm border border-white/10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "9",
				height: "6",
				fill: "#A51931"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				y: "1",
				width: "9",
				height: "4",
				fill: "#F4F5F8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				y: "2",
				width: "9",
				height: "2",
				fill: "#2D2A4A"
			})
		]
	});
	if (lang === "en") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 19 10",
		className: "w-5 h-3.5 rounded-sm shrink-0 shadow-sm border border-white/10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "19",
				height: "10",
				fill: "#B22234"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0,1 h19 M0,3 h19 M0,5 h19 M0,7 h19 M0,9 h19",
				stroke: "#FFF",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "7.6",
				height: "5.38",
				fill: "#3C3B6E"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "1.5",
				cy: "1",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "3.0",
				cy: "1",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "4.5",
				cy: "1",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "6.0",
				cy: "1",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "2.2",
				cy: "1.8",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "3.7",
				cy: "1.8",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "5.2",
				cy: "1.8",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "1.5",
				cy: "2.6",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "3.0",
				cy: "2.6",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "4.5",
				cy: "2.6",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "6.0",
				cy: "2.6",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "2.2",
				cy: "3.4",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "3.7",
				cy: "3.4",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "5.2",
				cy: "3.4",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "1.5",
				cy: "4.2",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "3.0",
				cy: "4.2",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "4.5",
				cy: "4.2",
				r: "0.2",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "6.0",
				cy: "4.2",
				r: "0.2",
				fill: "#fff"
			})
		]
	});
	if (lang === "zh") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 30 20",
		className: "w-5 h-3.5 rounded-sm shrink-0 shadow-sm border border-white/10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "30",
				height: "20",
				fill: "#DE2910"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
				points: "5,2 6.17,5.61 9.33,5.61 6.78,7.47 7.76,11.08 5,8.89 2.24,11.08 3.22,7.47 0.67,5.61 3.83,5.61",
				fill: "#FFDE00"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "10",
				cy: "2",
				r: "0.5",
				fill: "#FFDE00"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "4",
				r: "0.5",
				fill: "#FFDE00"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "12",
				cy: "7",
				r: "0.5",
				fill: "#FFDE00"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "10",
				cy: "9",
				r: "0.5",
				fill: "#FFDE00"
			})
		]
	});
	return null;
}
function HomeScreen({ menuItems, onOpenSidebar, orderType, setOrderType, onPickItem, onOpenCart, totalQty, subtotal, onOpenMenu, hasActiveOrder, activeOrderNumber, onGoToStatus, selectedTable, setSelectedTable, tables, onOpenTablePicker, activeOrderType, activeOrderStatus, address, setAddress, addressType, setAddressType, deliveryMethod, setDeliveryMethod, showAddressError, setShowAddressError, showTypeError, setShowTypeError, isCurrentlyClosed, bypassRealClosed }) {
	const { language, setLanguage, t, tMenu } = useLanguage();
	const [langDropdownOpen, setLangDropdownOpen] = (0, import_react.useState)(false);
	const scrollRef = (0, import_react.useRef)(null);
	const scroll = (direction) => {
		if (scrollRef.current) scrollRef.current.scrollBy({
			left: direction === "left" ? -240 : 240,
			behavior: "smooth"
		});
	};
	const orderTypeRef = (0, import_react.useRef)(null);
	const [homeSelectedCat, setHomeSelectedCat] = (0, import_react.useState)("all");
	const homeFilteredItems = (0, import_react.useMemo)(() => {
		if (homeSelectedCat === "all") return menuItems;
		return menuItems.filter((m) => m.category === homeSelectedCat);
	}, [homeSelectedCat, menuItems]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-36",
		style: { background: LINEN },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-72 md:h-96 w-full overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: HERO_IMG,
						alt: "restaurant",
						className: "absolute inset-0 h-full w-full object-cover object-center scale-110 transition-transform duration-700 ease-out hover:scale-115"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0",
						style: { background: "linear-gradient(180deg, rgba(0,18,30,0.55) 0%, rgba(0,18,30,0.25) 40%, rgba(0,18,30,0.85) 100%)" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 max-w-7xl mx-auto w-full h-full px-5 md:px-12 pointer-events-none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-full h-full pointer-events-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-5 left-5 right-5 z-30 flex items-center justify-between pointer-events-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									"aria-label": "เปิดเมนูด้านข้าง",
									onClick: onOpenSidebar,
									className: "grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 active:scale-95 transition-all shadow-sm cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												"aria-label": "เปลี่ยนภาษา",
												onClick: () => setLangDropdownOpen(!langDropdownOpen),
												className: "flex items-center bg-black/35 hover:bg-black/45 backdrop-blur-md px-3 rounded-full border border-white/20 text-white shadow-md transition-all cursor-pointer min-w-[120px] justify-between h-10 select-none active:scale-95",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlagIcon, { lang: language }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-extrabold text-[11px] tracking-wide whitespace-nowrap",
														children: language === "th" ? "ภาษาไทย" : language === "en" ? "English" : "中文"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
													size: 13,
													className: `opacity-75 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`
												})]
											}),
											langDropdownOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "fixed inset-0 z-40 cursor-default",
												onClick: () => setLangDropdownOpen(false)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: langDropdownOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
												initial: {
													opacity: 0,
													y: 4,
													scale: .95
												},
												animate: {
													opacity: 1,
													y: 0,
													scale: 1
												},
												exit: {
													opacity: 0,
													y: 4,
													scale: .95
												},
												transition: { duration: .15 },
												className: "absolute right-0 top-full mt-1.5 w-44 bg-black/85 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden z-50 p-1.5 flex flex-col gap-1",
												children: [
													{
														code: "th",
														label: "ภาษาไทย",
														text: "Thai"
													},
													{
														code: "en",
														label: "English",
														text: "English"
													},
													{
														code: "zh",
														label: "中文",
														text: "Chinese"
													}
												].map((item) => {
													const isActive = language === item.code;
													return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														"aria-label": `เลือกภาษา ${item.label}`,
														onClick: () => {
															setLanguage(item.code);
															setLangDropdownOpen(false);
														},
														className: "w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all active:scale-[0.98] cursor-pointer",
														style: {
															background: isActive ? "rgba(252,193,74,0.15)" : "transparent",
															color: isActive ? "#fcc14a" : "#ffffff",
															fontWeight: isActive ? "800" : "600"
														},
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "flex items-center gap-2 tracking-wide",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlagIcon, { lang: item.code }), item.label]
														}), isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
															size: 12,
															className: "text-[#fcc14a]",
															strokeWidth: 3
														})]
													}, item.code);
												})
											}) })
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										"aria-label": `เปิดตะกร้าสินค้า มีสินค้าทั้งหมด ${totalQty} ชิ้น`,
										onClick: onOpenCart,
										className: "h-10 px-3.5 flex items-center gap-1.5 text-white/90 text-xs bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-full border border-white/20 shadow-md active:scale-95 transition-all cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 15 }), totalQty > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-0.5 inline-flex items-center justify-center h-4 min-w-4 px-1 rounded-full text-[10px] font-bold",
											style: {
												background: GOLD,
												color: BRAND
											},
											children: totalQty
										})]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-5 left-5 right-5 text-white",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-[0.2em] text-white/70",
										children: "EPICUREAN"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-2xl font-bold mt-1",
										children: t("สวัสดี, ยินดีต้อนรับ")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-white/80 mt-1",
										children: t("เลือกประสบการณ์การรับประทาน")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex flex-wrap items-center gap-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: `inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold border backdrop-blur-sm ${isCurrentlyClosed ? "bg-red-500/20 text-red-400 border-red-500/35" : "bg-emerald-500/20 text-emerald-400 border-emerald-500/35"}`,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full shrink-0 ${isCurrentlyClosed ? "bg-red-400" : "bg-emerald-400"}` }), isCurrentlyClosed ? t("ปิดบริการ") : t("เปิดบริการ")]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-semibold text-white/90",
													children: isCurrentlyClosed ? language === "th" ? "อา. - ศ. 08:00 - 21:00" : "Sun - Fri 08:00 - 21:00" : "08:00 - 21:00"
												}),
												bypassRealClosed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "inline-flex items-center gap-1 rounded-full bg-amber-500/25 px-2 py-0.5 text-[9px] font-bold text-amber-300 border border-amber-500/30",
													children: "โหมดสาธิต"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											"aria-label": "สั่งอาหาร",
											onClick: () => {
												if (!orderType) {
													setShowTypeError(true);
													orderTypeRef.current?.scrollIntoView({ behavior: "smooth" });
													return;
												}
												if (orderType === "dine-in" && !selectedTable) {
													onOpenTablePicker();
													return;
												}
												if (orderType === "delivery" && (!address || address.trim().length < 5 || !deliveryMethod)) {
													setShowAddressError(true);
													orderTypeRef.current?.scrollIntoView({ behavior: "smooth" });
													return;
												}
												onOpenMenu();
											},
											className: "inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-[#ffcb44] to-[#fcc14a] px-5 py-2.5 text-sm font-bold shadow-[0_6px_20px_rgba(252,193,74,0.35)] transition-all duration-200 hover:scale-[1.03] active:scale-95 cursor-pointer",
											style: { color: BRAND },
											children: [
												t("สั่งอาหาร"),
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
													size: 16,
													strokeWidth: 2.5
												})
											]
										})]
									})
								]
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: hasActiveOrder && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: 16
				},
				animate: {
					opacity: 1,
					y: 0
				},
				exit: {
					opacity: 0,
					y: 16
				},
				transition: {
					type: "spring",
					damping: 20,
					stiffness: 260
				},
				className: "px-5 md:px-12 mt-4 max-w-7xl mx-auto w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniOrderTracker, {
					orderNumber: activeOrderNumber,
					onGoToStatus,
					orderType: activeOrderType || "delivery",
					status: activeOrderStatus
				})
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				ref: orderTypeRef,
				className: "px-5 md:px-12 mt-4 max-w-7xl mx-auto w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "text-sm font-bold mb-3 flex flex-wrap items-center gap-x-1.5",
						style: { color: BRAND },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							t("ช่องทางการรับอาหาร"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-red-500",
								children: "*"
							})
						] }), orderType === null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-slate-400 font-normal",
							children: t("(กรุณาเลือกช่องทางการรับอาหารด้านบนเพื่อระบุรายละเอียด)")
						})]
					}),
					showTypeError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-red-500 font-semibold mb-3",
						children: t("* กรุณาเลือกช่องทางการรับอาหาร (ทานที่ร้าน, จัดส่งถึงที่ หรือ รับกลับบ้าน) ก่อนเริ่มสั่งซื้อ")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `grid grid-cols-3 gap-2.5 p-1.5 rounded-2xl transition-all duration-300 ${showTypeError ? "border-2 border-red-500 bg-red-50/20" : "border-2 border-transparent"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								"aria-label": "เลือกทานที่ร้าน",
								onClick: () => {
									setOrderType("dine-in");
									setShowTypeError(false);
									onOpenTablePicker();
								},
								className: "rounded-2xl p-3 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-95 bg-white border shadow-sm",
								style: {
									background: orderType === "dine-in" ? BRAND : "white",
									color: orderType === "dine-in" ? GOLD : BRAND,
									borderColor: orderType === "dine-in" ? BRAND : "#ece4d6",
									boxShadow: orderType === "dine-in" ? "0 6px 20px rgba(0,46,71,0.22)" : "0 2px 8px rgba(0,0,0,0.03)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-9 w-9 place-items-center rounded-xl transition-colors",
									style: {
										background: orderType === "dine-in" ? "rgba(252,193,74,0.18)" : LINEN,
										color: orderType === "dine-in" ? GOLD : BRAND
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Utensils, { size: 17 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold text-[12px]",
									children: t("ทานที่ร้าน")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								"aria-label": "เลือกรับกลับบ้าน",
								onClick: () => {
									setOrderType("takeaway");
									setShowTypeError(false);
								},
								className: "rounded-2xl p-3 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-95 bg-white border shadow-sm",
								style: {
									background: orderType === "takeaway" ? BRAND : "white",
									color: orderType === "takeaway" ? GOLD : BRAND,
									borderColor: orderType === "takeaway" ? BRAND : "#ece4d6",
									boxShadow: orderType === "takeaway" ? "0 6px 20px rgba(0,46,71,0.22)" : "0 2px 8px rgba(0,0,0,0.03)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-9 w-9 place-items-center rounded-xl transition-colors",
									style: {
										background: orderType === "takeaway" ? "rgba(252,193,74,0.18)" : LINEN,
										color: orderType === "takeaway" ? GOLD : BRAND
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 17 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold text-[12px]",
									children: t("รับกลับบ้าน")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								"aria-label": "เลือกจัดส่งถึงที่",
								onClick: () => {
									setOrderType("delivery");
									setShowTypeError(false);
								},
								className: "rounded-2xl p-3 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 active:scale-95 bg-white border shadow-sm",
								style: {
									background: orderType === "delivery" ? BRAND : "white",
									color: orderType === "delivery" ? GOLD : BRAND,
									borderColor: orderType === "delivery" ? BRAND : "#ece4d6",
									boxShadow: orderType === "delivery" ? "0 6px 20px rgba(0,46,71,0.22)" : "0 2px 8px rgba(0,0,0,0.03)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-9 w-9 place-items-center rounded-xl transition-colors",
									style: {
										background: orderType === "delivery" ? "rgba(252,193,74,0.18)" : LINEN,
										color: orderType === "delivery" ? GOLD : BRAND
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bike, { size: 17 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-bold text-[12px]",
									children: t("จัดส่งถึงที่")
								})]
							})
						]
					})
				]
			}),
			orderType !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 md:px-12 mt-6 max-w-7xl mx-auto w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 8
						},
						animate: {
							opacity: 1,
							y: 0
						},
						exit: {
							opacity: 0,
							y: -8
						},
						transition: { duration: .18 },
						className: "w-full bg-white rounded-2xl px-4 py-4 shadow-soft border border-[#ece4d6]",
						children: [
							orderType === "delivery" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeliveryBlock, {
								onOpenMenu,
								address,
								setAddress,
								addressType,
								setAddressType,
								deliveryMethod,
								setDeliveryMethod,
								showAddressError,
								setShowAddressError
							}),
							orderType === "dine-in" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DineInBlock, {
								selectedTable,
								onOpenPicker: onOpenTablePicker
							}),
							orderType === "takeaway" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5 p-1 text-center sm:text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
									className: "font-bold text-sm text-[#002e47] flex items-center justify-center sm:justify-start gap-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 16 }),
										" ",
										t("รับกลับบ้าน"),
										" (Take Away)"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-slate-500 leading-normal font-semibold",
									children: [t("ร้านจะจัดเตรียมแพ็กอาหารใส่กล่องให้อย่างดี คุณสามารถมารับอาหารได้ที่เคาน์เตอร์ร้านเมื่อสถานะเปลี่ยนเป็น"), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-[#059669] mx-1",
										children: [
											"\"",
											t("พร้อมเสิร์ฟ"),
											"\""
										]
									})]
								})]
							})
						]
					}, orderType)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 md:px-12 mt-6 max-w-7xl mx-auto w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between mb-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold",
						style: { color: BRAND },
						children: t("เมนูแนะนำ")
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => scroll("left"),
							className: "absolute left-0 top-1/2 -translate-y-1/2 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/50 backdrop-blur-[2px] border border-[#ece4d6]/50 hover:bg-white/80 transition shadow-sm",
							style: {
								color: BRAND,
								marginLeft: -4
							},
							"aria-label": t("เลื่อนซ้าย"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 18 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							ref: scrollRef,
							className: "-mx-5 px-10 overflow-x-auto no-scrollbar scroll-smooth",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex gap-4",
								children: menuItems.filter((m) => m.category !== "drinks" && m.category !== "dessert").map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									initial: {
										opacity: 0,
										y: 12
									},
									animate: {
										opacity: 1,
										y: 0
									},
									transition: { delay: i * .04 },
									onClick: () => {
										if (!orderType) {
											setShowTypeError(true);
											orderTypeRef.current?.scrollIntoView({ behavior: "smooth" });
											return;
										}
										if (orderType === "dine-in" && !selectedTable) {
											onOpenTablePicker();
											return;
										}
										if (orderType === "delivery" && (!address || address.trim().length < 5 || !deliveryMethod)) {
											setShowAddressError(true);
											orderTypeRef.current?.scrollIntoView({ behavior: "smooth" });
											return;
										}
										onPickItem(m);
									},
									className: "group bg-white rounded-2xl p-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] border border-[#ece4d6]/80 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,46,71,0.12)] min-w-[220px] w-56 shrink-0 flex flex-col justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative h-36 w-full overflow-hidden rounded-xl mb-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: encodeURI(String(m.image)),
											alt: tMenu(m.name, "name"),
											className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										}), m.category === "signature" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-bold bg-[#002e47]/85 text-[#fcc14a] backdrop-blur-md border border-[#fcc14a]/30",
											children: "Signature"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0 flex flex-col",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1 text-[10px] uppercase tracking-wider",
												style: { color: GOLD },
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
													size: 10,
													fill: GOLD,
													stroke: GOLD
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: { color: INK_MUTED },
													children: language === "th" ? "Chef's pick" : language === "zh" ? "厨师推荐" : "Chef's pick"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-bold text-[15px] truncate mt-1 group-hover:text-[#002e47] transition-colors",
												style: { color: BRAND },
												children: tMenu(m.name, "name")
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs mt-1 line-clamp-2 font-light",
												style: { color: INK_MUTED },
												children: tMenu(m.desc, "desc")
											})
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3.5 flex items-end justify-between pt-2 border-t border-slate-100",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-extrabold text-base",
											style: { color: BRAND },
											children: ["฿", m.price]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											"aria-label": `หยิบ ${tMenu(m.name, "name")} ใส่ตะกร้า`,
											onClick: (e) => {
												e.stopPropagation();
												if (!orderType) {
													setShowTypeError(true);
													orderTypeRef.current?.scrollIntoView({ behavior: "smooth" });
													return;
												}
												if (orderType === "dine-in" && !selectedTable) {
													onOpenTablePicker();
													return;
												}
												if (orderType === "delivery" && (!address || address.trim().length < 5 || !deliveryMethod)) {
													setShowAddressError(true);
													orderTypeRef.current?.scrollIntoView({ behavior: "smooth" });
													return;
												}
												onPickItem(m);
											},
											className: "grid h-9 w-9 place-items-center rounded-full shadow-md cursor-pointer transition-transform duration-200 active:scale-90 hover:scale-105",
											style: {
												background: BRAND,
												color: GOLD
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 18 })
										})]
									})]
								}, m.id))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => scroll("right"),
							className: "absolute right-0 top-1/2 -translate-y-1/2 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/50 backdrop-blur-[2px] border border-[#ece4d6]/50 hover:bg-white/80 transition shadow-sm",
							style: {
								color: BRAND,
								marginRight: -4
							},
							"aria-label": t("เลื่อนขวา"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 18 })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 md:px-12 mt-10 max-w-7xl mx-auto w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-extrabold",
							style: { color: BRAND },
							children: t("รายการอาหารทั้งหมด")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-slate-500 mt-0.5 font-light",
							children: "เลือกดูตามประเภทอาหารและเครื่องดื่ม"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: onOpenMenu,
							className: "inline-flex items-center gap-1.5 text-xs font-bold text-[#002e47] bg-[#fcc14a]/20 hover:bg-[#fcc14a]/30 px-3.5 py-1.5 rounded-full border border-[#fcc14a]/40 transition active:scale-95 cursor-pointer self-start sm:self-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { size: 14 }),
								" ค้นหาเมนู ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 14 })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex gap-2 overflow-x-auto no-scrollbar pb-3 pt-1",
						children: [
							{
								id: "all",
								label: "ทั้งหมด",
								icon: "🍽️"
							},
							{
								id: "signature",
								label: "Signature",
								icon: "⭐"
							},
							{
								id: "main",
								label: "ผัด & กับข้าว",
								icon: "🍳"
							},
							{
								id: "rice",
								label: "ข้าวผัด",
								icon: "🍚"
							},
							{
								id: "noodles",
								label: "เมนูเส้น",
								icon: "🍜"
							},
							{
								id: "vegetarian",
								label: "มังสวิรัติ",
								icon: "🥬"
							},
							{
								id: "drinks",
								label: "เครื่องดื่ม",
								icon: "🥤"
							},
							{
								id: "dessert",
								label: "ของหวาน",
								icon: "🍧"
							}
						].map((cat) => {
							const active = homeSelectedCat === cat.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setHomeSelectedCat(cat.id),
								className: "flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer shadow-sm border",
								style: {
									background: active ? BRAND : "white",
									color: active ? GOLD : BRAND,
									borderColor: active ? BRAND : "#ece4d6",
									boxShadow: active ? "0 4px 14px rgba(0,46,71,0.2)" : "0 2px 6px rgba(0,0,0,0.02)"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat.label })]
							}, cat.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
						children: homeFilteredItems.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							onClick: () => {
								if (!orderType) {
									setShowTypeError(true);
									orderTypeRef.current?.scrollIntoView({ behavior: "smooth" });
									return;
								}
								if (orderType === "dine-in" && !selectedTable) {
									onOpenTablePicker();
									return;
								}
								if (orderType === "delivery" && (!address || address.trim().length < 5 || !deliveryMethod)) {
									setShowAddressError(true);
									orderTypeRef.current?.scrollIntoView({ behavior: "smooth" });
									return;
								}
								onPickItem(m);
							},
							className: "bg-white rounded-2xl p-3.5 shadow-sm border border-[#ece4d6]/80 flex items-start gap-3.5 cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative h-20 w-20 rounded-xl overflow-hidden flex-shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: encodeURI(String(m.image)),
									alt: tMenu(m.name, "name"),
									className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 min-w-0 flex flex-col justify-between self-stretch",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex items-center gap-1.5 mb-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-[#002e47] border border-slate-200/80",
											children: m.category === "signature" ? "⭐ Signature" : m.category === "main" ? "🍳 ผัด/กับข้าว" : m.category === "rice" ? "🍚 ข้าวผัด" : m.category === "noodles" ? "🍜 เมนูเส้น" : m.category === "vegetarian" ? "🥬 มังสวิรัติ" : m.category === "drinks" ? "🥤 เครื่องดื่ม" : m.category === "dessert" ? "🍧 ของหวาน" : m.category
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-sm truncate group-hover:text-[#002e47] transition-colors",
										style: { color: BRAND },
										children: tMenu(m.name, "name")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs mt-0.5 text-slate-500 line-clamp-1 font-light",
										children: tMenu(m.desc, "desc")
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-extrabold text-base",
										style: { color: BRAND },
										children: ["฿", m.price]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										"aria-label": `หยิบ ${tMenu(m.name, "name")} ใส่ตะกร้า`,
										onClick: (e) => {
											e.stopPropagation();
											if (!orderType) {
												setShowTypeError(true);
												orderTypeRef.current?.scrollIntoView({ behavior: "smooth" });
												return;
											}
											if (orderType === "dine-in" && !selectedTable) {
												onOpenTablePicker();
												return;
											}
											if (orderType === "delivery" && (!address || address.trim().length < 5 || !deliveryMethod)) {
												setShowAddressError(true);
												orderTypeRef.current?.scrollIntoView({ behavior: "smooth" });
												return;
											}
											onPickItem(m);
										},
										className: "grid h-8 w-8 place-items-center rounded-full shadow-sm cursor-pointer transition-transform duration-200 active:scale-90 hover:scale-105",
										style: {
											background: BRAND,
											color: GOLD
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 })
									})]
								})]
							})]
						}, m.id))
					})
				]
			})
		]
	});
}
function TablePickerBottomSheet({ tables, selectedTable, onSelect, onClose }) {
	const [tableFilter, setTableFilter] = (0, import_react.useState)("all");
	const displayTables = (0, import_react.useMemo)(() => {
		const list = [...tables].sort((a, b) => Number(a.id) - Number(b.id));
		if (tableFilter === "available") return list.filter((t) => t.status === "available");
		if (tableFilter === "occupied") return list.filter((t) => t.status === "occupied");
		return list;
	}, [tables, tableFilter]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: onClose,
		className: "absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 z-50 flex items-center justify-center px-4 pointer-events-none",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			initial: {
				opacity: 0,
				y: 30,
				scale: .95
			},
			animate: {
				opacity: 1,
				y: 0,
				scale: 1
			},
			exit: {
				opacity: 0,
				y: 20,
				scale: .95
			},
			transition: {
				type: "spring",
				damping: 25,
				stiffness: 350
			},
			className: "w-full max-w-[360px] rounded-[28px] bg-white shadow-2xl flex flex-col pointer-events-auto",
			style: { maxHeight: "85vh" },
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3 px-5 pt-5 pb-3 flex-shrink-0 border-b border-slate-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-[0.18em] text-slate-400 font-semibold",
						children: "เลือกโต๊ะ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-base font-bold text-slate-800",
						children: "ผังที่นั่ง"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
						whileTap: { scale: .85 },
						onClick: onClose,
						className: "flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors shrink-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 15 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 py-3 flex gap-2 flex-shrink-0",
					children: [
						{
							id: "all",
							label: "ทั้งหมด",
							dot: "#94a3b8"
						},
						{
							id: "available",
							label: "ว่าง",
							dot: "#15803d"
						},
						{
							id: "occupied",
							label: "ไม่ว่าง",
							dot: "#dc2626"
						}
					].map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
						whileTap: { scale: .9 },
						onClick: () => setTableFilter(opt.id),
						className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all flex-1 justify-center",
						style: {
							background: tableFilter === opt.id ? BRAND : "#f8fafc",
							color: tableFilter === opt.id ? "white" : "#64748b",
							borderColor: tableFilter === opt.id ? BRAND : "#e2e8f0"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "h-1.5 w-1.5 rounded-full shrink-0",
							style: { background: tableFilter === opt.id ? "white" : opt.dot }
						}), opt.label]
					}, opt.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-y-auto flex-1 px-4 pb-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-3",
						children: displayTables.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-2 text-center py-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold text-slate-400",
								children: "ไม่พบข้อมูลโต๊ะ"
							})
						}) : displayTables.map((table) => {
							const available = table.status === "available";
							const isSelected = selectedTable === table.id;
							const isWalkIn = table.label.toLowerCase().includes("walk-in") || table.label.includes("หน้าร้าน");
							const boxBg = isWalkIn ? "#f1f5f9" : isSelected ? BRAND : available ? "#dcfce7" : "#fee2e2";
							const boxBorder = isWalkIn ? "#cbd5e1" : isSelected ? BRAND : available ? "#15803d" : "#dc2626";
							const boxText = isWalkIn ? "#475569" : isSelected ? GOLD : available ? "#14532d" : "#7f1d1d";
							const boxSub = isWalkIn ? "#64748b" : isSelected ? "rgba(252,193,74,0.7)" : available ? "#166534" : "#991b1b";
							const badgeBg = isWalkIn ? "#e2e8f0" : isSelected ? "rgba(252,193,74,0.2)" : available ? "#bbf7d0" : "#fecaca";
							const badgeText = isWalkIn ? "#475569" : isSelected ? GOLD : available ? "#14532d" : "#7f1d1d";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.button, {
								"aria-label": `เลือก ${table.label}`,
								disabled: isWalkIn || !available && !isSelected,
								onClick: () => !isWalkIn && available && onSelect(table.id),
								className: "rounded-2xl p-4 text-left relative overflow-hidden",
								style: {
									background: boxBg,
									color: boxText,
									border: `2px solid ${boxBorder}`,
									opacity: isWalkIn ? .8 : !available && !isSelected ? .8 : 1,
									cursor: isWalkIn ? "not-allowed" : available ? "pointer" : "not-allowed"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-xs truncate max-w-[85px]",
										children: table.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0",
										style: {
											background: badgeBg,
											color: badgeText
										},
										children: isWalkIn ? "Walk-in" : isSelected ? "เลือกแล้ว" : available ? "ว่าง" : "ไม่ว่าง"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[10px]",
									style: { color: boxSub },
									children: isWalkIn ? "สำหรับหน้าร้าน" : "ความจุ 2-4 คน"
								})]
							}, table.id);
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-xl bg-slate-50 px-3 py-2.5 flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold text-slate-500",
							children: "สถานะโต๊ะ:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2 flex-wrap",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex items-center gap-1 text-[10px] font-bold text-[#14532d] bg-[#dcfce7] px-2 py-0.5 rounded-full border border-[#15803d]",
									children: "ว่าง"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex items-center gap-1 text-[10px] font-bold text-[#7f1d1d] bg-[#fee2e2] px-2 py-0.5 rounded-full border border-[#dc2626]",
									children: "ไม่ว่าง"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex items-center gap-1 text-[10px] font-bold text-[#475569] bg-[#f1f5f9] px-2 py-0.5 rounded-full border border-[#cbd5e1]",
									children: "สำหรับ Walk-in"
								})
							]
						})]
					})]
				})
			]
		})
	})] });
}
function ItemModal({ item, onClose, onAdd, checkOptionOutOfStock, cartLine }) {
	const { language, t, tMenu } = useLanguage();
	const [qty, setQty] = (0, import_react.useState)(cartLine ? cartLine.qty : 1);
	const [options, setOptions] = (0, import_react.useState)(() => {
		if (cartLine) {
			const { protein, size, ...rest } = cartLine.options;
			return rest;
		}
		const o = {};
		item.options?.forEach((g) => o[g.id] = g.choices[0].id);
		return o;
	});
	const [selectedAddons, setSelectedAddons] = (0, import_react.useState)(() => {
		if (cartLine && (item.category === "drinks" || item.category === "dessert")) return cartLine.addons.map((a) => a.id);
		return [];
	});
	const [note, setNote] = (0, import_react.useState)(cartLine ? cartLine.note : "");
	const isFood = item.category !== "drinks" && item.category !== "dessert";
	const defaultProteinId = (0, import_react.useMemo)(() => {
		if (!isFood) return "";
		const found = PROTEINS.find((p) => p.name !== "ไม่เอาเนื้อสัตว์" && item.name.includes(p.name));
		return found ? found.id : "p_minced_pork";
	}, [item.name, isFood]);
	const [protein, setProtein] = (0, import_react.useState)(() => {
		if (cartLine && isFood && cartLine.options.protein) {
			const found = PROTEINS.find((p) => p.name === cartLine.options.protein);
			if (found) return found.id;
		}
		if (!isFood) return "";
		const found = PROTEINS.find((p) => p.name !== "ไม่เอาเนื้อสัตว์" && item.name.includes(p.name));
		return found ? found.id : "p_minced_pork";
	});
	const [size, setSize] = (0, import_react.useState)(() => {
		if (cartLine && isFood && cartLine.options.size) {
			const found = SIZES.find((s) => s.name === cartLine.options.size);
			if (found) return found.id;
		}
		return "s_regular";
	});
	const [selectedToppings, setSelectedToppings] = (0, import_react.useState)(() => {
		if (cartLine && isFood) return cartLine.addons.map((a) => a.id);
		return [];
	});
	(0, import_react.useEffect)(() => {
		if (!isFood || !protein) return;
		if (checkOptionOutOfStock(protein)) {
			const firstAvailable = PROTEINS.find((p) => !checkOptionOutOfStock(p.id));
			if (firstAvailable) setProtein(firstAvailable.id);
			else setProtein("p_no_meat");
		}
	}, [
		protein,
		isFood,
		checkOptionOutOfStock
	]);
	const basePrice = (0, import_react.useMemo)(() => {
		if (!isFood) return item.price;
		const defaultProtein = PROTEINS.find((p) => p.id === defaultProteinId);
		const defaultProteinPrice = defaultProtein ? defaultProtein.price : 0;
		return Math.max(0, item.price - defaultProteinPrice);
	}, [
		item.price,
		defaultProteinId,
		isFood
	]);
	const unitPrice = (0, import_react.useMemo)(() => {
		if (!isFood) {
			const addonTotal = (item.addons ?? []).filter((a) => selectedAddons.includes(a.id)).reduce((s, a) => s + a.price, 0);
			return item.price + addonTotal;
		}
		const proteinItem = PROTEINS.find((p) => p.id === protein);
		const proteinPrice = proteinItem ? proteinItem.price : 0;
		const sizeItem = SIZES.find((s) => s.id === size);
		const sizePrice = sizeItem ? sizeItem.price : 0;
		const toppingsPrice = TOPPINGS.filter((t) => selectedToppings.includes(t.id)).reduce((sum, t) => sum + t.price, 0);
		return basePrice + proteinPrice + toppingsPrice + sizePrice;
	}, [
		isFood,
		item.price,
		selectedAddons,
		protein,
		size,
		selectedToppings,
		basePrice
	]);
	const total = unitPrice * qty;
	const formattedName = (0, import_react.useMemo)(() => {
		if (!isFood) return tMenu(item.name, "name");
		let name = tMenu(item.name, "name");
		const defaultProtein = PROTEINS.find((p) => p.id === defaultProteinId);
		const proteinItem = PROTEINS.find((p) => p.id === protein);
		if (defaultProtein && proteinItem && defaultProtein.id !== proteinItem.id) {
			const newProteinName = proteinItem.name === "ไม่เอาเนื้อสัตว์" ? "" : t(proteinItem.name);
			const defaultProteinNameTranslated = t(defaultProtein.name);
			if (name.includes(defaultProteinNameTranslated)) name = name.replace(defaultProteinNameTranslated, newProteinName);
			else name = name.trim() + " " + newProteinName;
		}
		const sizeItem = SIZES.find((s) => s.id === size);
		if (sizeItem && sizeItem.id === "s_special") {
			const specialLabel = ` (${t("พิเศษ")})`;
			if (!name.includes(specialLabel)) name += specialLabel;
		}
		return name;
	}, [
		item.name,
		isFood,
		defaultProteinId,
		protein,
		size,
		t,
		tMenu
	]);
	const handleAdd = () => {
		if (!isFood) {
			const addons = (item.addons ?? []).filter((a) => selectedAddons.includes(a.id)).map((a) => ({
				id: a.id,
				name: a.name,
				price: a.price
			}));
			onAdd({
				id: cartLine ? cartLine.id : `${item.id}-${Date.now()}`,
				itemId: item.id,
				name: item.name,
				price: unitPrice,
				qty,
				addons,
				options,
				note,
				image: item.image
			});
			return;
		}
		const addons = TOPPINGS.filter((t) => selectedToppings.includes(t.id)).map((t) => ({
			id: t.id,
			name: t.name,
			price: t.price
		}));
		onAdd({
			id: cartLine ? cartLine.id : `${item.id}-${Date.now()}`,
			itemId: item.id,
			name: formattedName,
			price: unitPrice,
			qty,
			addons,
			options: {
				...options,
				protein: PROTEINS.find((p) => p.id === protein)?.name || "",
				size: SIZES.find((s) => s.id === size)?.name || ""
			},
			note,
			image: item.image
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: onClose,
		className: "absolute inset-0 bg-black/50 z-50"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { y: "100%" },
		animate: { y: 0 },
		exit: { y: "100%" },
		transition: {
			type: "spring",
			damping: 30,
			stiffness: 280
		},
		className: "absolute inset-x-0 bottom-0 top-12 md:top-24 md:bottom-24 md:max-w-xl md:mx-auto md:rounded-3xl md:shadow-2xl z-50 bg-white overflow-hidden flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-5 pt-5 pb-4 border-b",
				style: { borderColor: "#f1ece4" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs uppercase tracking-[0.18em] text-slate-500",
								children: t("ระบุความต้องการพิเศษ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold truncate",
								style: { color: BRAND },
								children: formattedName
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-slate-600",
								children: tMenu(item.desc, "desc")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xl font-bold",
								style: { color: BRAND },
								children: ["฿", unitPrice]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onClose,
						className: "grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto no-scrollbar px-5 pt-5 pb-32",
				children: [
					item.options?.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between mb-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								style: { color: BRAND },
								children: t(g.name)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full",
								style: {
									background: "#fff2d6",
									color: BRAND
								},
								children: t("จำเป็น")
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: g.choices.map((c) => {
								const active = options[g.id] === c.id;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									"aria-label": `เลือก ${t(c.label)}`,
									onClick: () => setOptions({
										...options,
										[g.id]: c.id
									}),
									className: "w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left",
									style: {
										borderColor: active ? BRAND : "#ece4d6",
										background: active ? "#fff8e6" : "white"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										style: { color: BRAND },
										children: t(c.label)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-5 w-5 place-items-center rounded-full border-2",
										style: { borderColor: active ? BRAND : "#cbd5d8" },
										children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "h-2.5 w-2.5 rounded-full",
											style: { background: BRAND }
										})
									})]
								}, c.id);
							})
						})]
					}, g.id)),
					isFood ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between mb-2.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-semibold text-sm flex items-center gap-1.5",
									style: { color: BRAND },
									children: ["🥩 ", t("เลือกเนื้อสัตว์")]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] px-2 py-0.5 rounded-full font-medium",
									style: {
										background: "#fff2d6",
										color: BRAND
									},
									children: t("จำเป็น")
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2",
								children: PROTEINS.map((p) => {
									const active = protein === p.id;
									const isOutOfStock = checkOptionOutOfStock(p.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										disabled: isOutOfStock,
										"aria-label": `เลือกวัตถุดิบ ${t(p.name)}`,
										onClick: () => setProtein(p.id),
										className: "flex items-center justify-between rounded-xl border p-3 text-left transition duration-150 relative overflow-hidden",
										style: {
											borderColor: active ? BRAND : isOutOfStock ? "#f1f5f9" : "#ece4d6",
											background: active ? "#fffcf5" : isOutOfStock ? "#f8fafc" : "white",
											opacity: isOutOfStock ? .5 : 1,
											cursor: isOutOfStock ? "not-allowed" : "pointer"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `text-xs font-semibold ${isOutOfStock ? "line-through text-slate-400" : ""}`,
											style: { color: isOutOfStock ? void 0 : BRAND },
											children: [
												t(p.name),
												" ",
												isOutOfStock && `(${t("หมด")})`
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold",
											style: { color: active ? BRAND : INK_MUTED },
											children: isOutOfStock ? "" : p.price > 0 ? `+${p.price} ฿` : t("ฟรี")
										})]
									}, p.id);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold text-sm flex items-center gap-1.5 mb-2.5",
								style: { color: BRAND },
								children: ["⚖️ ", t("ขนาด")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-3",
								children: SIZES.map((s) => {
									const active = size === s.id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										"aria-label": `เลือกขนาด ${t(s.name)}`,
										onClick: () => setSize(s.id),
										className: "flex items-center justify-between rounded-xl border px-4 py-3 text-left transition duration-150",
										style: {
											borderColor: active ? BRAND : "#ece4d6",
											background: active ? "#fffcf5" : "white"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold",
											style: { color: BRAND },
											children: t(s.name)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold",
											style: { color: BRAND },
											children: s.price > 0 ? `+${s.price} ฿` : t("ฟรี")
										})]
									}, s.id);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold text-sm flex items-center gap-1.5 mb-2.5",
								style: { color: BRAND },
								children: ["🥚 ", t("เลือกท็อปปิ้งเพิ่มเติม")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2",
								children: TOPPINGS.map((topping) => {
									const active = selectedToppings.includes(topping.id);
									const isOutOfStock = checkOptionOutOfStock(topping.id);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										disabled: isOutOfStock,
										"aria-label": `เลือกท็อปปิ้ง ${t(topping.name)}`,
										onClick: () => setSelectedToppings((prev) => active ? prev.filter((id) => id !== topping.id) : [...prev, topping.id]),
										className: "flex items-center justify-between rounded-xl border p-3 text-left transition duration-150 relative overflow-hidden",
										style: {
											borderColor: active ? BRAND : isOutOfStock ? "#f1f5f9" : "#ece4d6",
											background: active ? "#fffcf5" : isOutOfStock ? "#f8fafc" : "white",
											opacity: isOutOfStock ? .5 : 1,
											cursor: isOutOfStock ? "not-allowed" : "pointer"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "grid h-4 w-4 place-items-center rounded border",
												style: {
													borderColor: active ? BRAND : "#cbd5d8",
													background: active ? BRAND : "transparent"
												},
												children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
													size: 10,
													color: GOLD,
													strokeWidth: 4
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `text-xs font-medium ${isOutOfStock ? "line-through text-slate-400" : ""}`,
												style: { color: isOutOfStock ? void 0 : BRAND },
												children: [
													t(topping.name),
													" ",
													isOutOfStock && `(${t("หมด")})`
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[11px] font-bold",
											style: { color: BRAND },
											children: isOutOfStock ? "" : `+${topping.price} ฿`
										})]
									}, topping.id);
								})
							})]
						})
					] }) : item.addons && item.addons.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold mb-2",
							style: { color: BRAND },
							children: t("เพิ่มเติม")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-2",
							children: item.addons.map((a) => {
								const active = selectedAddons.includes(a.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									"aria-label": `เลือกเพิ่มเติม ${a.name}`,
									onClick: () => setSelectedAddons((s) => active ? s.filter((x) => x !== a.id) : [...s, a.id]),
									className: "w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left",
									style: {
										borderColor: active ? BRAND : "#ece4d6",
										background: active ? "#fff8e6" : "white"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid h-5 w-5 place-items-center rounded-md border-2",
											style: {
												borderColor: active ? BRAND : "#cbd5d8",
												background: active ? BRAND : "transparent"
											},
											children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												size: 12,
												color: GOLD,
												strokeWidth: 3
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm font-medium",
											style: { color: BRAND },
											children: ["+ ", a.name]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-sm font-semibold",
										style: { color: BRAND },
										children: [a.price, " ฿"]
									})]
								}, a.id);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							htmlFor: "special-instructions",
							className: "font-semibold mb-2 block",
							style: { color: BRAND },
							children: "ระบุความต้องการพิเศษ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: "special-instructions",
							name: "special-instructions",
							"aria-label": "ระบุความต้องการพิเศษ",
							value: note,
							onChange: (e) => setNote(e.target.value),
							placeholder: "เช่น ไม่ใส่ผัก, รสจัดพิเศษ",
							className: "w-full rounded-xl border bg-white p-3 text-sm focus:outline-none focus:ring-2",
							style: {
								borderColor: "#ece4d6",
								color: BRAND,
								minHeight: 80
							}
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-0 left-0 right-0 p-4 bg-white border-t",
				style: { borderColor: "#f1ece4" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1 bg-[var(--surface)] rounded-full p-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": "ลดจำนวนชิ้น",
								onClick: () => setQty(Math.max(1, qty - 1)),
								className: "grid h-9 w-9 place-items-center rounded-full",
								style: {
									background: "white",
									color: BRAND
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { size: 16 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-7 text-center font-bold",
								style: { color: BRAND },
								children: qty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": "เพิ่มจำนวนชิ้น",
								onClick: () => setQty(qty + 1),
								className: "grid h-9 w-9 place-items-center rounded-full",
								style: {
									background: BRAND,
									color: GOLD
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 16 })
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						"aria-label": cartLine ? `บันทึกการแก้ไข ${formattedName} จำนวน ${qty} ชิ้น รวมราคา ${total} บาท` : `เพิ่ม ${formattedName} ลงตะกร้า จำนวน ${qty} ชิ้น รวมราคา ${total} บาท`,
						onClick: handleAdd,
						className: "flex-1 h-12 rounded-full font-semibold flex items-center justify-between px-5 transition active:scale-95 cursor-pointer",
						style: {
							background: BRAND,
							color: "white"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cartLine ? "บันทึกการแก้ไข" : "เพิ่มลงตะกร้า" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["฿", total] })]
					})]
				})
			})
		]
	})] });
}
function MenuOverlay({ onBack, onPickItem, onOpenCart, totalQty, subtotal, menuItems }) {
	const { language, t, tMenu } = useLanguage();
	const [activeCat, setActiveCat] = (0, import_react.useState)("all");
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [sortBy, setSortBy] = (0, import_react.useState)("default");
	const [showSortModal, setShowSortModal] = (0, import_react.useState)(false);
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
			label: "ผัด & กับข้าว"
		},
		{
			id: "rice",
			label: "ข้าวผัด"
		},
		{
			id: "noodles",
			label: "เมนูเส้น"
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
	const filteredAndSortedItems = (0, import_react.useMemo)(() => {
		let list = activeCat === "all" ? menuItems : menuItems.filter((m) => m.category === activeCat);
		if (searchQuery.trim() !== "") {
			const q = searchQuery.toLowerCase();
			list = list.filter((m) => m.name.toLowerCase().includes(q) || m.desc && m.desc.toLowerCase().includes(q));
		}
		if (sortBy === "price-low") list = [...list].sort((a, b) => a.price - b.price);
		else if (sortBy === "price-high") list = [...list].sort((a, b) => b.price - a.price);
		return list;
	}, [
		activeCat,
		searchQuery,
		sortBy,
		menuItems
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { x: "100%" },
		animate: { x: 0 },
		exit: { x: "100%" },
		transition: {
			type: "tween",
			duration: .3
		},
		className: "absolute inset-0 z-30 bg-[var(--linen)] flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "z-20 bg-[var(--linen)] border-b border-slate-200/80 pt-5 pb-4 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto px-5 w-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: onBack,
									className: "grid h-10 w-10 place-items-center rounded-full bg-white",
									style: {
										color: BRAND,
										boxShadow: "0 2px 12px rgba(0,46,71,0.08)"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 20 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-lg font-bold text-center flex-1",
									style: { color: BRAND },
									children: t("รายการเมนู")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: onOpenCart,
									className: "relative grid h-10 w-10 place-items-center rounded-full bg-white transition active:scale-95 cursor-pointer",
									style: {
										color: BRAND,
										boxShadow: "0 2px 12px rgba(0,46,71,0.08)"
									},
									"aria-label": "เปิดตะกร้าสินค้า",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { size: 20 }), totalQty > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-1 -right-1 grid h-5 min-w-5 px-1 place-items-center rounded-full text-[10px] font-bold border-2 border-white",
										style: {
											background: GOLD,
											color: BRAND
										},
										children: totalQty
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 rounded-2xl bg-white px-4 py-3 shadow-sm border border-slate-200 flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
										size: 16,
										className: "text-slate-400"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										"aria-label": "ค้นหาเมนู",
										placeholder: t("ค้นหาเมนู..."),
										value: searchQuery,
										onChange: (e) => setSearchQuery(e.target.value),
										className: "w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
									}),
									searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setSearchQuery(""),
										className: "text-slate-400 hover:text-slate-600 transition",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setShowSortModal(true),
								className: "grid h-11 w-11 place-items-center rounded-2xl border shadow-sm transition active:scale-95 cursor-pointer relative",
								style: {
									background: sortBy !== "default" ? BRAND : "white",
									color: sortBy !== "default" ? GOLD : BRAND,
									borderColor: sortBy !== "default" ? BRAND : "#ece4d6"
								},
								"aria-label": "เรียงลำดับเมนู",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { size: 18 }), sortBy !== "default" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white shadow-sm border border-white",
									children: "1"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2",
							children: categories.map((cat) => {
								const active = cat.id === activeCat;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setActiveCat(cat.id),
									className: "relative rounded-full px-4 py-2 text-sm font-medium transition",
									style: { color: active ? "white" : BRAND },
									children: [active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
										layoutId: "menu-cat-pill",
										className: "absolute inset-0 rounded-full",
										style: { background: BRAND }
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "relative",
										children: t(cat.label)
									})]
								}, cat.id);
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto no-scrollbar w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-7xl mx-auto px-5 pt-5 pb-32",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 space-y-0",
						children: filteredAndSortedItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center py-16 flex flex-col items-center justify-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
									size: 32,
									className: "text-slate-300 mb-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-slate-500",
									children: "ไม่พบเมนูที่คุณค้นหา"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-slate-400 mt-1",
									children: "ลองใช้คำอื่น หรือรีเซ็ตการค้นหา"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setSearchQuery(""),
									className: "mt-4 px-4 py-2 bg-[#002e47] text-[#fcc14a] rounded-full text-xs font-bold shadow-soft cursor-pointer transition active:scale-95",
									children: "ล้างคำค้นหา"
								})
							]
						}) : filteredAndSortedItems.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "w-full bg-white rounded-2xl p-3 shadow-soft flex items-start gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: encodeURI(String(m.image)),
								alt: tMenu(m.name, "name"),
								className: "h-20 w-20 rounded-xl object-cover flex-shrink-0"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1 min-w-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-sm truncate",
										style: { color: BRAND },
										children: tMenu(m.name, "name")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs mt-1 text-slate-500 whitespace-normal",
										children: tMenu(m.desc, "desc")
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-lg",
										style: { color: "#a16207" },
										children: ["฿", m.price]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-shrink-0 grid place-items-center",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: (e) => {
												e.stopPropagation();
												onPickItem(m);
											},
											className: "h-10 w-10 rounded-full bg-[#002e47] text-white grid place-items-center cursor-pointer transition active:scale-95 hover:opacity-90",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 })
										})
									})]
								})] })
							})]
						}, m.id))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: totalQty > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					y: 40,
					opacity: 0
				},
				animate: {
					y: 0,
					opacity: 1
				},
				exit: {
					y: 40,
					opacity: 0
				},
				transition: {
					type: "spring",
					damping: 20,
					stiffness: 300
				},
				className: "absolute z-40 w-[calc(100%-32px)] md:max-w-md md:left-1/2 md:-translate-x-1/2 bottom-6 left-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onOpenCart,
					className: "w-full rounded-2xl px-5 py-4 flex items-center justify-between shadow-lift",
					style: {
						background: BRAND,
						color: "white"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative grid h-9 w-9 place-items-center rounded-xl",
							style: { background: "rgba(252,193,74,0.15)" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, {
								size: 18,
								style: { color: GOLD }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute -top-1 -right-1 grid h-5 min-w-5 px-1 place-items-center rounded-full text-[10px] font-bold",
								style: {
									background: GOLD,
									color: BRAND
								},
								children: totalQty
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: t("ดูตะกร้าสินค้า")
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold text-lg",
						style: { color: GOLD },
						children: ["฿", subtotal]
					})]
				})
			}, "menu-cart-fixed") }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showSortModal && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				onClick: () => setShowSortModal(false),
				className: "absolute inset-0 bg-black/50 z-50 cursor-pointer"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { y: "100%" },
				animate: { y: 0 },
				exit: { y: "100%" },
				transition: {
					type: "spring",
					damping: 28,
					stiffness: 260
				},
				className: "absolute inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl pb-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 pt-3 pb-4 border-b border-slate-100",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto h-1.5 w-12 rounded-full bg-slate-200 mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "text-base font-bold flex items-center gap-1.5",
							style: { color: BRAND },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("เรียงลำดับตาม") })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setShowSortModal(false),
							className: "text-sm font-semibold",
							style: { color: INK_MUTED },
							children: t("เสร็จสิ้นการเลือก")
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-5 mt-4 space-y-2.5",
					children: [
						{
							id: "default",
							label: "🔥 ยอดนิยม (แนะนำ)",
							desc: "เมนูขายดีประจำสัปดาห์"
						},
						{
							id: "price-low",
							label: "💵 ราคา: ต่ำ - สูง",
							desc: "เมนูราคาประหยัด เรียงตามเงินบาท"
						},
						{
							id: "price-high",
							label: "💵 ราคา: สูง - ต่ำ",
							desc: "เมนูระดับพรีเมียมคัดสรรพิเศษ"
						}
					].map((opt) => {
						const active = sortBy === opt.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setSortBy(opt.id);
								setShowSortModal(false);
							},
							className: "w-full flex items-center justify-between p-3.5 rounded-2xl border text-left transition duration-200 active:scale-[0.98] cursor-pointer",
							style: {
								background: active ? "rgba(0,46,71,0.02)" : "white",
								borderColor: active ? BRAND : "#ece4d6"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-sm",
								style: { color: BRAND },
								children: t(opt.label)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-400 mt-0.5",
								children: t(opt.desc)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-5 w-5 rounded-full border-2 flex items-center justify-center transition",
								style: {
									borderColor: active ? BRAND : "#cbd5e1",
									background: active ? BRAND : "transparent"
								},
								children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-[#fcc14a]" })
							})]
						}, opt.id);
					})
				})]
			})] }) })
		]
	});
}
function CartDrawer({ cart, subtotal, onClose, onRemove, onEdit, onCheckout }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: onClose,
		className: "absolute inset-0 bg-black/50 z-40"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
		"aria-label": "ตะกร้าสินค้าของคุณ",
		initial: { y: "100%" },
		animate: { y: 0 },
		exit: { y: "100%" },
		transition: {
			type: "spring",
			damping: 30,
			stiffness: 280
		},
		className: "absolute inset-x-0 bottom-0 md:left-auto md:right-4 md:bottom-4 md:max-w-md md:w-full md:rounded-3xl md:shadow-2xl z-50 bg-white rounded-t-3xl max-h-[85%] flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 pt-3 pb-4 border-b",
				style: { borderColor: "#f1ece4" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto h-1.5 w-12 rounded-full bg-[#e5dccc] mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-bold",
						style: { color: BRAND },
						children: "ตะกร้าของคุณ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						"aria-label": "ปิดตะกร้า",
						onClick: onClose,
						className: "text-sm",
						style: { color: INK_MUTED },
						children: "ปิด"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 overflow-y-auto no-scrollbar px-5 py-4 space-y-3",
				children: [cart.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center py-10 text-sm",
					style: { color: INK_MUTED },
					children: "ยังไม่มีรายการในตะกร้า"
				}), cart.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 bg-[var(--surface)] rounded-2xl p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: encodeURI(String(l.image)),
							alt: l.name,
							className: "h-16 w-16 rounded-xl object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold text-sm",
									style: { color: BRAND },
									children: l.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs",
									style: { color: INK_MUTED },
									children: [
										"× ",
										l.qty,
										l.addons.length > 0 && ` · ${l.addons.map((a) => a.name).join(", ")}`
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-bold mt-1",
									style: { color: BRAND },
									children: ["฿", l.price * l.qty]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": `แก้ไข ${l.name}`,
								onClick: () => onEdit(l),
								className: "grid h-8 w-8 place-items-center rounded-full transition active:scale-95 cursor-pointer",
								style: {
									background: "rgba(0,46,71,0.06)",
									color: BRAND
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 13 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": `ลบ ${l.name} ออกจากตะกร้า`,
								onClick: () => onRemove(l.id),
								className: "grid h-8 w-8 place-items-center rounded-full transition active:scale-95 cursor-pointer",
								style: {
									background: "#fee2e2",
									color: "#dc2626"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 13 })
							})]
						})
					]
				}, l.id))]
			}),
			cart.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-5 pt-3 pb-5 border-t space-y-3",
				style: { borderColor: "#f1ece4" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						style: { color: INK_MUTED },
						children: "ยอดรวม"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-bold text-base",
						style: { color: BRAND },
						children: ["฿", subtotal]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					"aria-label": "ดำเนินการสั่งซื้อสินค้าในตะกร้า",
					onClick: onCheckout,
					className: "w-full h-12 rounded-full font-semibold",
					style: {
						background: BRAND,
						color: "white"
					},
					children: "ดำเนินการสั่งซื้อ"
				})]
			})
		]
	})] });
}
function OrderConfirmOverlay({ cart, subtotal, deliveryFee, onBack, onRemove, onEdit, onProceed }) {
	const [phone, setPhone] = (0, import_react.useState)("");
	const [err, setErr] = (0, import_react.useState)("");
	const grand = subtotal + deliveryFee;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { x: "100%" },
		animate: { x: 0 },
		exit: { x: "100%" },
		transition: {
			type: "tween",
			duration: .3
		},
		className: "absolute inset-0 z-40 bg-[var(--surface)] overflow-y-auto no-scrollbar pb-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full",
			style: {
				background: BRAND,
				color: "white"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl mx-auto px-5 pt-5 pb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onBack,
						className: "grid h-10 w-10 place-items-center rounded-full bg-white/10 border border-white/15",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							size: 20,
							color: GOLD
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-bold",
						children: "รายการสั่งซื้อในตะกร้า"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm mt-2 text-white/70",
					children: "ตรวจสอบรายการก่อนชำระเงิน"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl mx-auto px-5 mt-4 space-y-3",
			children: [
				cart.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-2xl p-4 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: encodeURI(String(l.image)),
							alt: l.name,
							className: "h-16 w-16 rounded-xl object-cover"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold text-sm",
										style: { color: BRAND },
										children: l.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-bold text-sm",
										style: { color: BRAND },
										children: ["฿", l.price * l.qty]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs mt-1",
									style: { color: INK_MUTED },
									children: [
										"จำนวน × ",
										l.qty,
										" · ฿",
										l.price,
										"/ชิ้น"
									]
								}),
								l.addons.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs mt-0.5",
									style: { color: INK_MUTED },
									children: ["+ ", l.addons.map((a) => a.name).join(", ")]
								}),
								l.note && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs mt-0.5 italic",
									style: { color: INK_MUTED },
									children: [
										"\"",
										l.note,
										"\""
									]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onEdit(l),
							className: "flex-1 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1 transition active:scale-95 cursor-pointer",
							style: {
								background: "rgba(0,46,71,0.06)",
								color: BRAND
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 14 }), " แก้ไขรายการ"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => onRemove(l.id),
							className: "flex-1 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-1 transition active:scale-95 cursor-pointer",
							style: {
								background: "#fee2e2",
								color: "#dc2626"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 }), " ลบรายการ"]
						})]
					})]
				}, l.id)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-2xl p-4 shadow-soft space-y-2.5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold mb-2",
							style: { color: BRAND },
							children: "สรุปคำสั่งซื้อ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "ยอดรวมอาหาร",
							value: `฿${subtotal}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "ค่าจัดส่ง",
							value: `฿${deliveryFee}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-t pt-2.5 mt-2.5",
							style: { borderColor: "#f1ece4" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
								label: "รวมทั้งหมด",
								value: `฿${grand}`,
								bold: true
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-2xl p-4 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "text-sm font-semibold flex items-center gap-2",
							style: { color: BRAND },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 14 }), " เบอร์โทรสำหรับติดต่อ"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "tel",
							value: phone,
							onChange: (e) => {
								setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
								setErr("");
							},
							placeholder: "0XX-XXX-XXXX",
							className: "mt-2 w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2",
							style: {
								borderColor: err ? "#ef4444" : "#ece4d6",
								color: BRAND
							}
						}),
						err && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-red-500 mt-1",
							children: err
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pb-8 mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									if (phone.length < 10) {
										setErr("กรุณากรอกเบอร์โทรให้ครบ 10 หลัก");
										return;
									}
									onProceed();
								},
								className: "w-full h-14 rounded-full font-bold text-white shadow-lift active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer",
								style: { background: "linear-gradient(135deg, #635bff 0%, #8073ea 100%)" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["ชำระผ่าน Stripe · ฿", grand.toLocaleString()] })]
							})
						})
					]
				})
			]
		})]
	});
}
function Row({ label, value, bold }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				color: bold ? BRAND : INK_MUTED,
				fontWeight: bold ? 600 : 400
			},
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: bold ? "text-lg" : "",
			style: {
				color: BRAND,
				fontWeight: bold ? 700 : 500
			},
			children: value
		})]
	});
}
function PaymentOverlay({ total, cart, orderType, deliveryFee, subtotal, selectedTable, address, onBack, onSuccess }) {
	const [stripeLoading, setStripeLoading] = (0, import_react.useState)(false);
	const [stripeErrorMsg, setStripeErrorMsg] = (0, import_react.useState)(null);
	const handleStripeCheckout = async () => {
		setStripeLoading(true);
		setStripeErrorMsg(null);
		try {
			const pendingOrder = {
				cart,
				orderType,
				selectedTable,
				address
			};
			localStorage.setItem("ran-lung-get-pending-stripe-order", JSON.stringify(pendingOrder));
			const origin = window.location.origin;
			const result = await createStripeSession({ data: {
				cart: cart.map((l) => ({
					name: l.name,
					price: l.price,
					qty: l.qty,
					image: l.image || null
				})),
				subtotal,
				deliveryFee,
				orderType,
				origin
			} });
			if (result.url) window.location.href = result.url;
			else throw new Error("ไม่สามารถสร้าง URL สำหรับการชำระเงินได้");
		} catch (err) {
			console.error("[Stripe] Checkout error:", err);
			setStripeErrorMsg(err?.message || "เกิดข้อผิดพลาดในการเชื่อมต่อกับ Stripe");
			setStripeLoading(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { x: "100%" },
		animate: { x: 0 },
		exit: { x: "100%" },
		transition: {
			type: "tween",
			duration: .3
		},
		className: "absolute inset-0 z-50 bg-[var(--surface)] overflow-y-auto no-scrollbar pb-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full",
			style: {
				background: BRAND,
				color: "white"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-2xl mx-auto px-5 pt-5 pb-6 mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onBack,
						className: "grid h-10 w-10 place-items-center rounded-full bg-white/10 border border-white/15 cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							size: 20,
							color: GOLD
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-bold",
						children: "ชำระเงินค่าอาหาร"
					})]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl mx-auto px-5 space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white rounded-3xl p-5 shadow-soft border border-slate-50 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between pb-3 border-b border-slate-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-bold text-slate-800",
							children: "สรุปรายการสั่งซื้อ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-slate-400 font-medium",
							children: [
								"(",
								cart.length,
								" รายการ)"
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 text-sm text-slate-600",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ค่าอาหาร (Subtotal)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["฿", subtotal.toLocaleString()] })]
							}),
							deliveryFee > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ค่าจัดส่ง (Delivery Fee)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["฿", deliveryFee.toLocaleString()] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between pt-3 border-t border-slate-100 font-bold text-slate-800 text-base",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ยอดชำระทั้งหมด" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									style: { color: BRAND },
									children: ["฿", total.toLocaleString()]
								})]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-amber-50 rounded-2xl p-4 border border-amber-200/50 flex gap-3 text-xs text-amber-800 leading-relaxed shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-lg",
						children: "💡"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-bold mb-0.5",
							children: "ระบบชำระเงิน Stripe (โอนเงิน/บัตรเครดิต)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-amber-700",
							children: "ชำระได้ทั้ง PromptPay QR Code และ บัตรเครดิต ผ่านแพลตฟอร์ม Stripe ที่ปลอดภัยระดับมาตรฐานสากล"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1.5 text-[10px] text-amber-600 italic",
							children: "หมายเหตุ: หากผู้พัฒนายังไม่ได้ใส่กุญแจ Stripe ลับในระบบ ระบบจะทำงานใน sandbox mode อัตโนมัติ เพื่อให้จำลองความสำเร็จได้ทันที"
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center py-4 bg-white rounded-3xl border border-slate-100 shadow-soft gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 text-xs text-slate-400 font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Secured by" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[#635bff] font-extrabold tracking-tight text-sm",
							children: "stripe"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 opacity-60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] bg-slate-100 px-2 py-1 rounded font-bold text-slate-500",
								children: "VISA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] bg-slate-100 px-2 py-1 rounded font-bold text-slate-500",
								children: "MASTERCARD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] bg-slate-100 px-2 py-1 rounded font-bold text-slate-500",
								children: "JCB"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] bg-slate-100 px-2 py-1 rounded font-bold text-slate-500",
								children: "PROMPTPAY"
							})
						]
					})]
				}),
				stripeErrorMsg && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-red-50 rounded-xl p-3 border border-red-200 text-xs text-red-700 text-center",
					children: stripeErrorMsg
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pb-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleStripeCheckout,
						disabled: stripeLoading,
						className: "w-full h-14 rounded-full font-bold text-white shadow-lift active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75",
						style: { background: "linear-gradient(135deg, #635bff 0%, #8073ea 100%)" },
						children: stripeLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
							width: 20,
							height: 20,
							borderRadius: "50%",
							border: "2px solid rgba(255,255,255,0.2)",
							borderTopColor: "white",
							animation: "spin 0.8s linear infinite"
						} }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["ชำระผ่าน Stripe ฿", total.toLocaleString()] })] })
					})
				})
			]
		})]
	});
}
function SuccessFlash() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "absolute inset-0 z-[60] flex items-center justify-center",
		style: { background: BRAND },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { scale: 0 },
				animate: { scale: 1 },
				transition: {
					type: "spring",
					damping: 12,
					stiffness: 200
				},
				className: "grid h-24 w-24 place-items-center rounded-full",
				style: { background: GOLD },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
					size: 48,
					color: BRAND,
					strokeWidth: 3
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
				initial: {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: { delay: .2 },
				className: "text-white font-bold text-lg",
				children: "ชำระเงินสำเร็จ"
			})]
		})
	});
}
function StatusScreen({ onOpenSidebar, activeOrder }) {
	const [showCancelDialog, setShowCancelDialog] = (0, import_react.useState)(false);
	const [selectedReason, setSelectedReason] = (0, import_react.useState)("");
	const [customReason, setCustomReason] = (0, import_react.useState)("");
	const [promptPayNumber, setPromptPayNumber] = (0, import_react.useState)("");
	const [errorText, setErrorText] = (0, import_react.useState)("");
	const orderType = activeOrder?.orderType || "delivery";
	const currentStatus = activeOrder?.status || "รอรับออเดอร์";
	const steps = orderType === "dine-in" ? [
		{
			id: 1,
			label: "รับออเดอร์",
			icon: Check,
			done: currentStatus !== "รอรับออเดอร์",
			active: currentStatus === "รอรับออเดอร์"
		},
		{
			id: 2,
			label: "กำลังทำอาหาร",
			icon: ChefHat,
			done: currentStatus === "สำเร็จ",
			active: currentStatus === "กำลังเตรียม"
		},
		{
			id: 3,
			label: "เสร็จสิ้น",
			icon: PartyPopper,
			done: currentStatus === "สำเร็จ",
			active: false
		}
	] : orderType === "takeaway" ? [
		{
			id: 1,
			label: "รับออเดอร์",
			icon: Check,
			done: currentStatus !== "รอรับออเดอร์",
			active: currentStatus === "รอรับออเดอร์"
		},
		{
			id: 2,
			label: "กำลังเตรียมอาหาร",
			icon: ChefHat,
			done: currentStatus === "สำเร็จ",
			active: currentStatus === "กำลังเตรียม"
		},
		{
			id: 3,
			label: "พร้อมรับอาหาร",
			icon: ShoppingBag,
			done: currentStatus === "สำเร็จ",
			active: false
		}
	] : [
		{
			id: 1,
			label: "รับออเดอร์",
			icon: Check,
			done: currentStatus !== "รอรับออเดอร์",
			active: currentStatus === "รอรับออเดอร์"
		},
		{
			id: 2,
			label: "กำลังเตรียมอาหาร",
			icon: ChefHat,
			done: currentStatus === "กำลังจัดส่ง" || currentStatus === "สำเร็จ",
			active: currentStatus === "กำลังเตรียม"
		},
		{
			id: 3,
			label: "คนรับอาหาร/กำลังขับไป",
			icon: Bike,
			done: currentStatus === "สำเร็จ",
			active: currentStatus === "กำลังจัดส่ง"
		},
		{
			id: 4,
			label: "เสร็จสิ้น",
			icon: PartyPopper,
			done: currentStatus === "สำเร็จ",
			active: false
		}
	];
	const orderItems = activeOrder ? activeOrder.items : [{
		name: "Premium Wagyu Don",
		qty: 1,
		price: 420
	}, {
		name: "Matcha Latte",
		qty: 2,
		price: 120
	}];
	const total = activeOrder ? activeOrder.total : 700;
	const statusTheme = (0, import_react.useMemo)(() => {
		if (currentStatus === "ขอคืนเงิน") return {
			title: "ยื่นขอคืนเงินแล้ว",
			subtitle: "ร้านค้ากำลังตรวจสอบและโอนเงินคืนตามพร้อมเพย์ที่ท่านระบุ",
			color: "#f59e0b",
			bg: "rgba(245, 158, 11, 0.08)",
			iconColor: "#f59e0b"
		};
		if (currentStatus === "ยกเลิกแล้ว") return {
			title: "ออเดอร์ถูกยกเลิกแล้ว",
			subtitle: "การคืนเงินสำเร็จหรือยกเลิกคำสั่งซื้อเรียบร้อยแล้ว",
			color: "#ef4444",
			bg: "rgba(239, 68, 68, 0.08)",
			iconColor: "#ef4444"
		};
		if (currentStatus === "รอรับออเดอร์") return {
			title: "กำลังรอรับออเดอร์",
			subtitle: "ร้านค้ากำลังตรวจสอบสลิปและเตรียมเข้าครัว",
			color: "#3b82f6",
			bg: "rgba(59, 130, 246, 0.08)",
			iconColor: "#3b82f6"
		};
		return {
			title: currentStatus === "สำเร็จ" ? "รายการสำเร็จ" : "กำลังดำเนินการ",
			subtitle: currentStatus === "สำเร็จ" ? "" : orderType === "dine-in" ? "รอเสิร์ฟอาหารในอีก 10 นาที" : "รอรับอาหารในอีก 14 นาที",
			color: "#10b981",
			bg: "rgba(16, 185, 129, 0.08)",
			iconColor: "#10b981"
		};
	}, [currentStatus, orderType]);
	const cancelReasonsList = [
		"สั่งอาหารผิดเมนู / ลืมเพิ่มบางรายการ",
		"ต้องการเปลี่ยนที่อยู่จัดส่ง / วิธีรับอาหาร",
		"รอนานเกินไป / เปลี่ยนใจไม่ทานแล้ว",
		"อื่น ๆ (ระบุด้านล่าง)"
	];
	const handleRequestCancel = () => {
		if (!selectedReason) {
			setErrorText("กรุณาเลือกเหตุผลในการยกเลิก");
			return;
		}
		if (selectedReason === "อื่น ๆ (ระบุด้านล่าง)" && !customReason.trim()) {
			setErrorText("กรุณาระบุรายละเอียดเหตุผลเพิ่มเติม");
			return;
		}
		if (!promptPayNumber.trim()) {
			setErrorText("กรุณากรอกเบอร์พร้อมเพย์ หรือเลขบัญชีธนาคารสำหรับรับเงินคืน");
			return;
		}
		const saved = localStorage.getItem("ran-lung-get-orders");
		if (saved && activeOrder) try {
			const updated = JSON.parse(saved).map((o) => {
				if (o.orderNumber === activeOrder.orderNumber) return {
					...o,
					status: "ขอคืนเงิน",
					cancelReason: selectedReason,
					cancelNote: customReason,
					refundPromptPay: promptPayNumber
				};
				return o;
			});
			localStorage.setItem("ran-lung-get-orders", JSON.stringify(updated));
			window.dispatchEvent(new StorageEvent("storage", {
				key: "ran-lung-get-orders",
				newValue: JSON.stringify(updated)
			}));
		} catch (e) {
			console.error("Cancel failed:", e);
		}
		setShowCancelDialog(false);
		setErrorText("");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-full pb-28 relative w-full",
		style: { background: SURFACE },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl mx-auto w-full",
			children: [
				currentStatus === "ขอคืนเงิน" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-5 mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col gap-1.5 shadow-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-amber-800 font-bold text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "animate-pulse",
								children: "●"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "กำลังดำเนินการคืนเงิน" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-amber-700 leading-relaxed font-medium",
							children: [
								"ทางครัวได้รับคำขอแล้ว และกำลังดำเนินการโอนเงินคืนจำนวน",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
									className: "text-amber-900 mx-1",
									children: ["฿", total.toLocaleString()]
								}),
								"ไปที่พร้อมเพย์: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: "text-amber-900",
									children: activeOrder?.refundPromptPay
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-amber-600",
							children: "หากต้องการสอบถามเพิ่มเติม โทรหาร้านค้าได้โดยตรงที่ด้านล่าง"
						})
					]
				}),
				currentStatus === "ยกเลิกแล้ว" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-5 mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 flex flex-col gap-1 shadow-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-red-800 font-bold text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "●" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ยกเลิกออเดอร์สำเร็จ" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-red-700 font-medium",
						children: "ออเดอร์นี้ได้ทำการยกเลิกและคืนเงินเรียบร้อยแล้ว"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 py-4 bg-white border-b flex items-center gap-3",
					style: { borderColor: "#eef2f6" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onOpenSidebar,
						className: "grid h-10 w-10 place-items-center rounded-full",
						style: {
							background: SURFACE,
							color: BRAND
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 20 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-bold",
						style: { color: BRAND },
						children: "สถานะการสั่งซื้อ"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center pt-8 pb-6 px-5 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							initial: { scale: 0 },
							animate: { scale: 1 },
							transition: {
								type: "spring",
								damping: 12,
								stiffness: 180
							},
							className: "grid h-24 w-24 place-items-center rounded-full",
							style: {
								background: statusTheme.bg,
								color: statusTheme.color
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, {
								size: 56,
								color: statusTheme.iconColor,
								strokeWidth: 2
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-5 text-2xl font-bold",
							style: { color: BRAND },
							children: statusTheme.title
						}),
						statusTheme.subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm max-w-xs mx-auto leading-relaxed",
							style: { color: INK_MUTED },
							children: statusTheme.subtitle
						}),
						activeOrder?.orderType === "takeaway" && activeOrder?.queueNumber && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								scale: .95
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							className: "mt-4 px-6 py-2.5 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center bg-purple-50 border-purple-200 w-[90%] mx-auto",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase font-black tracking-widest text-purple-600",
									children: "คิวรับอาหารกลับบ้าน (Takeaway Queue)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-3xl font-black mt-0.5",
									style: { color: BRAND },
									children: activeOrder.queueNumber
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-slate-400 mt-1 text-center leading-normal font-bold",
									children: "* โปรดแสดงหมายเลขคิวนี้ต่อพนักงานที่เคาน์เตอร์เพื่อรับอาหาร"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-2xl p-4 shadow-soft",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between mb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs",
										style: { color: INK_MUTED },
										children: "หมายเลขออเดอร์"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-bold",
										style: { color: BRAND },
										children: activeOrder ? activeOrder.orderNumber : "#AK-2847"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2",
									children: orderItems.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											style: { color: BRAND },
											children: [
												o.name,
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													style: { color: INK_MUTED },
													children: ["× ", o.qty]
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-medium",
											style: { color: BRAND },
											children: ["฿", o.price * o.qty]
										})]
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 pt-3 border-t flex items-center justify-between",
									style: { borderColor: "#f1ece4" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm",
										style: { color: INK_MUTED },
										children: "รวมทั้งหมด"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-lg font-bold",
										style: { color: BRAND },
										children: ["฿", total.toLocaleString()]
									})]
								})
							]
						}),
						currentStatus !== "ขอคืนเงิน" && currentStatus !== "ยกเลิกแล้ว" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-white rounded-2xl p-5 shadow-soft",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold mb-4",
								style: { color: BRAND },
								children: "ติดตามสถานะ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-[19px] top-2 bottom-2 w-0.5 bg-[#eef2f6]" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: { height: 0 },
										animate: { height: orderType === "dine-in" ? "50%" : "66%" },
										transition: {
											duration: 1.2,
											ease: "easeOut"
										},
										className: "absolute left-[19px] top-2 w-0.5",
										style: { background: BRAND }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-5",
										children: steps.map((s, i) => {
											const Icon = s.icon;
											const isCurrent = s.active;
											const isDone = s.done;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative flex items-center gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "relative z-10 grid h-10 w-10 place-items-center rounded-full",
													style: {
														background: isDone ? BRAND : isCurrent ? GOLD : "#eef2f6",
														color: isDone ? GOLD : isCurrent ? BRAND : INK_MUTED
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }), isCurrent && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
														className: "absolute inset-0 rounded-full",
														style: { background: GOLD },
														animate: {
															scale: [
																1,
																1.4,
																1
															],
															opacity: [
																.4,
																0,
																.4
															]
														},
														transition: {
															duration: 1.8,
															repeat: Infinity
														}
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-sm font-semibold",
														style: { color: isDone || isCurrent ? BRAND : INK_MUTED },
														children: s.label
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs",
														style: { color: INK_MUTED },
														children: isDone ? "เสร็จสมบูรณ์" : isCurrent ? "กำลังดำเนินการ" : "รอดำเนินการ"
													})]
												})]
											}, s.id);
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-3",
							children: [currentStatus === "รอรับออเดอร์" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setShowCancelDialog(true),
								className: "w-full py-3.5 rounded-full font-bold text-sm transition-all hover:bg-red-50 border border-red-200 text-red-500 cursor-pointer active:scale-95 flex items-center justify-center gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ยกเลิกและขอคืนเงิน" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "tel:0891234567",
								className: "w-full py-3.5 rounded-full font-bold text-sm bg-white border border-[#ece4d6] text-[#002e47] cursor-pointer active:scale-95 flex items-center justify-center gap-2 hover:bg-slate-50 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "📞 ติดต่อร้านลุงเกตุ (ด่วน)" })
							})]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: showCancelDialog && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: .5 },
				exit: { opacity: 0 },
				onClick: () => setShowCancelDialog(false),
				className: "absolute inset-0 bg-black"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				initial: { y: "100%" },
				animate: { y: 0 },
				exit: { y: "100%" },
				transition: {
					type: "tween",
					duration: .25
				},
				className: "relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl overflow-y-auto max-h-[85vh] z-10 text-[#002e47]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-black tracking-tight mb-2",
						children: "ยกเลิกคำสั่งซื้อและขอคืนเงิน"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-slate-500 mb-4",
						children: ["กรุณาระบุเหตุผลและข้อมูลพร้อมเพย์สำหรับรับเงินคืนจำนวน ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["฿", total.toLocaleString()] })]
					}),
					errorText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 px-3 py-2 rounded-xl bg-red-50 border border-red-155 text-red-600 text-xs font-bold",
						children: errorText
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-1",
							children: "เหตุผลในการยกเลิก"
						}), cancelReasonsList.map((reason) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: `flex items-center gap-3 p-3 rounded-xl border transition cursor-pointer text-sm font-semibold ${selectedReason === reason ? "border-[#002e47] bg-[#fffcf5]" : "border-[#ece4d6] hover:bg-slate-50"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "cancel_reason",
								value: reason,
								checked: selectedReason === reason,
								onChange: () => {
									setSelectedReason(reason);
									setErrorText("");
								},
								className: "accent-[#002e47]"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: reason })]
						}, reason))]
					}),
					selectedReason === "อื่น ๆ (ระบุด้านล่าง)" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							placeholder: "พิมพ์ระบุเหตุผลการยกเลิกที่นี่...",
							value: customReason,
							onChange: (e) => setCustomReason(e.target.value),
							rows: 3,
							className: "w-full bg-[#fcfbf9] border border-[#ece4d6] rounded-2xl px-4 py-2.5 text-sm font-bold text-[#002e47] focus:outline-none focus:border-[#002e47]/30 transition"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-slate-400 uppercase tracking-wider mb-2",
							children: "ข้อมูลการรับเงินคืน"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "เบอร์พร้อมเพย์ หรือ บัญชีธนาคาร + ชื่อบัญชี",
							value: promptPayNumber,
							onChange: (e) => {
								setPromptPayNumber(e.target.value);
								setErrorText("");
							},
							className: "w-full bg-[#fcfbf9] border border-[#ece4d6] rounded-2xl px-4 py-2.5 text-sm font-bold text-[#002e47] placeholder-slate-400 focus:outline-none focus:border-[#002e47]/30 transition shadow-inner"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setShowCancelDialog(false),
							className: "w-full py-3.5 rounded-full font-bold text-xs bg-slate-100 text-slate-500 cursor-pointer hover:bg-slate-200 transition",
							children: "ย้อนกลับ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: handleRequestCancel,
							className: "w-full py-3.5 rounded-full font-bold text-xs text-white cursor-pointer hover:opacity-95 transition",
							style: { background: BRAND },
							children: "ยืนยันขอยกเลิก"
						})]
					})
				]
			})]
		}) })]
	});
}
function MiniOrderTracker({ orderNumber, onGoToStatus, orderType, status }) {
	const { t } = useLanguage();
	const isCompleted = status === "สำเร็จ" || status === "completed" || status === "เสร็จสิ้น";
	const isCooking = status === "กำลังทำ" || status === "กำลังเตรียม" || status === "preparing";
	const isReady = status === "พร้อมเสิร์ฟ" || status === "delivering" || status === "พร้อมรับอาหาร" || status === "กำลังจัดส่ง";
	const isReceived = !isCooking && !isReady && !isCompleted;
	const [isVisible, setIsVisible] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let timerId = null;
		if (isCompleted) timerId = setTimeout(() => {
			setIsVisible(false);
		}, 1e4);
		else setIsVisible(true);
		return () => {
			if (timerId) clearTimeout(timerId);
		};
	}, [isCompleted]);
	if (!isVisible) return null;
	const steps = orderType === "dine-in" ? [
		{
			id: 1,
			label: t("รับออเดอร์"),
			icon: Check,
			done: isCooking || isReady || isCompleted,
			active: isReceived
		},
		{
			id: 2,
			label: t("กำลังทำอาหาร"),
			icon: ChefHat,
			done: isReady || isCompleted,
			active: isCooking
		},
		{
			id: 3,
			label: t("เสร็จสิ้น"),
			icon: PartyPopper,
			done: false,
			active: isCompleted
		}
	] : orderType === "takeaway" ? [
		{
			id: 1,
			label: t("รับออเดอร์"),
			icon: Check,
			done: isCooking || isReady || isCompleted,
			active: isReceived
		},
		{
			id: 2,
			label: t("กำลังเตรียมอาหาร"),
			icon: ChefHat,
			done: isReady || isCompleted,
			active: isCooking
		},
		{
			id: 3,
			label: t("พร้อมรับอาหาร"),
			icon: ShoppingBag,
			done: false,
			active: isReady || isCompleted
		}
	] : [
		{
			id: 1,
			label: t("รับออเดอร์"),
			icon: Check,
			done: isCooking || isReady || isCompleted,
			active: isReceived
		},
		{
			id: 2,
			label: t("กำลังเตรียมอาหาร"),
			icon: ChefHat,
			done: isReady || isCompleted,
			active: isCooking
		},
		{
			id: 3,
			label: t("คนรับอาหาร/กำลังขับไป"),
			icon: Bike,
			done: isCompleted,
			active: isReady
		},
		{
			id: 4,
			label: t("เสร็จสิ้น"),
			icon: PartyPopper,
			done: false,
			active: isCompleted
		}
	];
	const activeIndex = steps.findIndex((s) => s.active);
	const doneCount = steps.filter((s) => s.done).length;
	const progressPercent = isCompleted ? 100 : activeIndex !== -1 ? (activeIndex + .5) / steps.length * 100 : (doneCount + .5) / steps.length * 100;
	const lineFraction = isCompleted ? 1 : activeIndex > 0 ? activeIndex / (steps.length - 1) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-white rounded-2xl p-3 shadow-soft border overflow-hidden",
		style: { borderColor: "#ece4d6" },
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-7 w-7 place-items-center rounded-lg",
						style: { background: "rgba(255, 203, 68, 0.15)" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {
							size: 14,
							style: { color: "#ffcb44" }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-bold",
						style: { color: BRAND },
						children: "สถานะ Order ของคุณ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px]",
						style: { color: INK_MUTED },
						children: orderNumber
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.span, {
					animate: !isCompleted ? { scale: [
						1,
						1.03,
						1
					] } : void 0,
					transition: !isCompleted ? {
						duration: 2,
						repeat: Infinity
					} : void 0,
					className: "px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1",
					style: {
						background: isCompleted ? "rgba(16,185,129,0.08)" : "rgba(59,130,246,0.08)",
						color: isCompleted ? "#10b981" : "#2563eb"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full animate-pulse ${isCompleted ? "bg-emerald-500" : "bg-blue-500"}` }), isCompleted ? t("เสร็จสิ้น") : t("กำลังดำเนินการ")]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative h-1.5 rounded-full bg-slate-100 mb-3 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					initial: { width: 0 },
					animate: { width: `${progressPercent}%` },
					transition: {
						duration: 1.2,
						ease: "easeOut"
					},
					className: "absolute inset-y-0 left-0 rounded-full",
					style: { background: "#ffcb44" }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center justify-between mb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-4 h-[2px] -translate-y-1/2",
						style: {
							background: "#eef2f6",
							left: 16,
							right: 16
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-4 h-[2px] -translate-y-1/2 transition-all duration-700",
						style: {
							background: "#ffcb44",
							left: 16,
							width: `calc(${lineFraction} * (100% - 32px))`
						}
					}),
					steps.map((s, i) => {
						const Icon = s.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-center gap-1 flex-1 relative z-10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-8 w-8 place-items-center rounded-full transition-all relative z-10",
									style: {
										background: s.done ? BRAND : s.active ? "#ffcb44" : "#eef2f6",
										color: s.done ? "#ffcb44" : s.active ? BRAND : INK_MUTED,
										boxShadow: s.active ? "0 0 0 3px rgba(255, 203, 68, 0.3)" : "none"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 14 })
								}), s.active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.span, {
									className: "absolute inset-0 rounded-full z-0",
									style: { border: `2px solid #ffcb44` },
									animate: {
										scale: [
											1,
											1.3,
											1
										],
										opacity: [
											.6,
											0,
											.6
										]
									},
									transition: {
										duration: 2,
										repeat: Infinity
									}
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] font-semibold text-center leading-tight mt-1",
								style: { color: s.done || s.active ? BRAND : INK_MUTED },
								children: s.label
							})]
						}, s.id);
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center mt-2.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onGoToStatus,
					className: "text-xs font-semibold underline transition hover:opacity-80",
					style: { color: BRAND },
					children: "ดูรายละเอียดสถานะทั้งหมด"
				})
			})
		]
	});
}
function HistoryOverlay({ orderHistory, onBack, onClearHistory }) {
	const handleClear = () => {
		if (window.confirm("คุณต้องการล้างประวัติการสั่งซื้อทั้งหมดใช่หรือไม่?")) onClearHistory();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { x: "100%" },
		animate: { x: 0 },
		exit: { x: "100%" },
		transition: {
			type: "tween",
			duration: .3
		},
		className: "absolute inset-0 z-30 bg-[var(--surface)] flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full",
			style: {
				background: BRAND,
				color: "white"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-2xl mx-auto px-5 pt-5 pb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: onBack,
							className: "grid h-10 w-10 place-items-center rounded-full bg-white/10 border border-white/15 active:scale-95 transition-all",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
								size: 20,
								color: GOLD
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-lg font-bold",
							children: "ประวัติการสั่งซื้อ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-white/60",
							children: [orderHistory.length, " รายการ"]
						})] })]
					}), orderHistory.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleClear,
						className: "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-500/20 text-red-300 hover:bg-red-500/30 border border-red-500/30 transition active:scale-95 cursor-pointer",
						title: "ล้างประวัติการสั่งซื้อ",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 14 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ล้างประวัติ" })]
					})]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto no-scrollbar w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-2xl mx-auto px-5 pt-5 pb-8 space-y-4",
				children: orderHistory.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center py-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, {
							size: 48,
							className: "mb-4",
							style: { color: INK_MUTED }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							style: { color: INK_MUTED },
							children: "ยังไม่มีประวัติการสั่งซื้อ"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs mt-1",
							style: { color: INK_MUTED },
							children: "เริ่มสั่งอาหารเลย!"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [orderHistory.map((order, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 12
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { delay: idx * .06 },
					className: "bg-white rounded-2xl shadow-soft overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 py-3 flex items-center justify-between",
							style: {
								background: "rgba(0,46,71,0.03)",
								borderBottom: "1px solid #f1ece4"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-10 w-10 place-items-center rounded-xl",
									style: {
										background: BRAND,
										color: GOLD
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Receipt, { size: 18 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-bold",
									style: { color: BRAND },
									children: order.orderNumber
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px]",
									style: { color: INK_MUTED },
									children: order.date
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "px-3 py-1.5 rounded-full text-[11px] font-bold flex items-center gap-1.5",
								style: {
									background: order.status === "สำเร็จ" ? "#dcfce7" : order.status === "กำลังจัดส่ง" ? "#dbeafe" : "#fef9c3",
									color: order.status === "สำเร็จ" ? "#15803d" : order.status === "กำลังจัดส่ง" ? "#1d4ed8" : "#a16207"
								},
								children: [
									order.status === "สำเร็จ" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { size: 12 }),
									order.status === "กำลังจัดส่ง" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bike, { size: 12 }),
									order.status === "กำลังเตรียม" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChefHat, { size: 12 }),
									order.status
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "px-4 py-3 space-y-2.5",
							children: order.items.map((item, itemIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: encodeURI(String(item.image)),
										alt: item.name,
										className: "h-12 w-12 rounded-xl object-cover flex-shrink-0"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium truncate",
											style: { color: BRAND },
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs",
											style: { color: INK_MUTED },
											children: [
												"× ",
												item.qty,
												" · ฿",
												item.price,
												"/ชิ้น"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm font-bold",
										style: { color: BRAND },
										children: ["฿", item.price * item.qty]
									})
								]
							}, itemIdx))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 py-3 flex items-center justify-between",
							style: {
								background: "#fafbfc",
								borderTop: "1px solid #f1ece4"
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs",
								style: { color: INK_MUTED },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["อาหาร ฿", order.subtotal] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mx-1.5",
										children: "·"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["จัดส่ง ฿", order.delivery] })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs",
									style: { color: INK_MUTED },
									children: "รวม"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-lg font-bold",
									style: { color: BRAND },
									children: ["฿", order.total]
								})]
							})]
						})
					]
				}, order.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pt-4 pb-2 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleClear,
						className: "flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition cursor-pointer active:scale-95 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 15 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ล้างประวัติการสั่งซื้อทั้งหมด" })]
					})
				})] })
			})
		})]
	});
}
function ContactOverlay({ onBack }) {
	const reviews = [
		{
			id: 1,
			name: "Panisa T.",
			initials: "PT",
			stars: 5,
			date: "5 มิ.ย. 2026",
			text: "อร่อยสุดยอดมากครับ กระเพราหมูกรอบคือที่สุด! หนังหมูกรอบกรุบกรอบกำลังดี รสชาติเผ็ดจัดจ้านสะใจ แนะนำเลยครับ"
		},
		{
			id: 2,
			name: "Chawalit R.",
			initials: "CR",
			stars: 5,
			date: "2 มิ.ย. 2026",
			text: "ชอบผัดพริกแกงหมูกรอบมากครับ รสชาติเข้มข้นถึงเครื่องแกง ไข่ดาวทอดมาแบบกึ่งสุกกึ่งดิบกำลังดี บริการส่งรวดเร็วทันใจมากครับ"
		},
		{
			id: 3,
			name: "Somsri K.",
			initials: "SK",
			stars: 4,
			date: "28 พ.ค. 2026",
			text: "น้ำลำไยหวานชื่นใจ หอมกลิ่นลำไยสด ดื่มคู่กับผัดซีอิ๊วอร่อยลงตัวมากๆ ค่ะ ร้านสะอาดและใช้วัตถุดิบคุณภาพดีจริงๆ"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { x: "100%" },
		animate: { x: 0 },
		exit: { x: "100%" },
		transition: {
			type: "tween",
			duration: .3
		},
		className: "absolute inset-0 z-30 bg-[var(--surface)] flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full",
			style: {
				background: BRAND,
				color: "white"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-2xl mx-auto px-5 pt-5 pb-4 flex items-center justify-between",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onBack,
						className: "grid h-10 w-10 place-items-center rounded-full bg-white/10 border border-white/15",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {
							size: 20,
							color: GOLD
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-lg font-bold",
						children: "ข้อมูลร้านค้า"
					})]
				})
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto no-scrollbar w-full pb-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl mx-auto px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative h-64 w-full bg-slate-200 overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								title: "Google Maps",
								src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.6416801968853!2d100.5670868153347!3d13.737152990356773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29f03b57e7939%3A0xe5a3637e163b7e80!2sSukhumvit%2031%2C%20Khlong%20Toei%20Nuea%2C%20Watthana%2C%20Bangkok%2010110!5e0!3m2!1sen!2sth!4v1655610000000!5m2!1sen!2sth",
								width: "100%",
								height: "100%",
								style: { border: 0 },
								allowFullScreen: true,
								loading: "lazy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-4 left-5 right-5 flex items-end justify-between pointer-events-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-white",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold",
										children: "ร้านลุงเก็ต"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-white/80 mt-1",
										children: "อาหารตามสั่ง · Street Food"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-[#ffcb44] rounded-2xl px-3 py-2 flex flex-col items-center shadow-lg shrink-0",
									style: { color: BRAND },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-base font-extrabold leading-none",
											children: "4.8"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex gap-0.5 my-0.5",
											style: { color: BRAND },
											children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
												size: 8,
												fill: "currentColor",
												stroke: "none"
											}, i))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[9px] font-semibold leading-none opacity-85",
											children: "214 รีวิว"
										})
									]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-5 mt-5 bg-white rounded-2xl border border-slate-200/80 shadow-soft divide-y divide-slate-100",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 flex items-start gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-10 w-10 place-items-center rounded-xl shrink-0",
										style: {
											background: "rgba(0,46,71,0.06)",
											color: BRAND
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 18 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold text-slate-400",
											children: "Address"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-slate-700 mt-0.5 leading-relaxed",
											children: "88/12 ซอยสุขุมวิท 31 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพฯ 10110"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "https://maps.app.goo.gl/yS3EHz9n2H4Hkpxu7",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "px-3 py-1.5 rounded-full border text-xs font-bold shrink-0 flex items-center gap-1 transition hover:bg-slate-50 mt-1",
										style: {
											borderColor: BRAND,
											color: BRAND
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 12 }), " นำทาง"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-10 w-10 place-items-center rounded-xl shrink-0",
									style: {
										background: "rgba(0,46,71,0.06)",
										color: BRAND
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 18 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold text-slate-400",
											children: "Opening Hours"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-sm mt-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-700 font-medium",
												children: "อาทิตย์ - ศุกร์"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-slate-800 font-semibold",
												children: "08:00 - 21:00"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex justify-between text-sm mt-0.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-red-500 font-medium",
												children: "วันเสาร์"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-red-500 font-semibold",
												children: "ปิดทำการ"
											})]
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "tel:02-123-4567",
								className: "p-4 flex items-center gap-3 transition hover:bg-slate-50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-10 w-10 place-items-center rounded-xl shrink-0",
										style: {
											background: "rgba(0,46,71,0.06)",
											color: BRAND
										},
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 18 })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs font-semibold text-slate-400",
											children: "Phone"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-bold mt-0.5",
											style: { color: GOLD },
											children: "02-123-4567"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
										size: 18,
										className: "text-slate-400"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-5 mt-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-bold text-base",
									style: { color: BRAND },
									children: "Reviews"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "text-xs font-semibold hover:underline",
									style: { color: BRAND },
									children: "See all"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-[#002e47] text-white rounded-2xl p-5 mt-3 flex items-center justify-between shadow-soft",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-4xl font-extrabold leading-none",
											children: "4.8"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex gap-0.5 text-[#ffcb44] my-2",
											children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
												size: 14,
												fill: "currentColor",
												stroke: "none"
											}, i))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-white/70",
											children: "214 รีวิว"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 max-w-[160px] space-y-1.5",
									children: [
										{
											star: 5,
											pct: 85
										},
										{
											star: 4,
											pct: 10
										},
										{
											star: 3,
											pct: 3
										},
										{
											star: 2,
											pct: 1
										},
										{
											star: 1,
											pct: 1
										}
									].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-white/80 font-medium w-2 leading-none",
											children: item.star
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "h-full rounded-full bg-[#ffcb44]",
												style: { width: `${item.pct}%` }
											})
										})]
									}, item.star))
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 space-y-3",
								children: reviews.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid h-10 w-10 place-items-center rounded-full text-white font-bold text-sm bg-[#002e47]",
											children: r.initials
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
													className: "text-sm font-semibold text-slate-800 truncate",
													children: r.name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-[10px] text-slate-400",
													children: r.date
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex gap-0.5 mt-0.5",
												children: [...Array(5)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
													size: 10,
													fill: i < r.stars ? "#ffcb44" : "none",
													stroke: i < r.stars ? "none" : "#cbd5e1"
												}, i))
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs mt-3 leading-relaxed",
										style: { color: BRAND },
										children: r.text
									})]
								}, r.id))
							})
						]
					})
				]
			})
		})]
	});
}
function StoreClosedOverlay({ onBypass, onOpenSidebar }) {
	const todayDay = (0, import_react.useMemo)(() => {
		const thTimeStr = (/* @__PURE__ */ new Date()).toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
		return new Date(thTimeStr).getDay();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		className: "absolute inset-0 z-50 bg-[var(--surface)] flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full shadow-sm",
			style: {
				background: BRAND,
				color: "white"
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl mx-auto px-5 pt-5 pb-4 flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onOpenSidebar,
						className: "grid h-10 w-10 place-items-center rounded-full bg-white/10 border border-white/15 active:scale-95 transition-transform",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {
							size: 20,
							color: GOLD
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs uppercase tracking-[0.25em] text-white/60 font-bold",
						children: "EPICUREAN"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10" })
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex-1 overflow-y-auto no-scrollbar w-full",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl mx-auto px-6 py-6 flex flex-col justify-between h-full min-h-[calc(100vh-80px)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex justify-center mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-20 w-20 place-items-center rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 shadow-sm animate-pulse",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {
										size: 38,
										className: "stroke-[1.5]"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute -bottom-2 -right-2 grid h-7 w-7 place-items-center rounded-full bg-red-500 text-white border border-white shadow-md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {
										size: 14,
										className: "animate-spin",
										style: { animationDuration: "6s" }
									})
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-center space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-bold text-slate-800 leading-snug",
								children: "วันนี้ร้านปิดทำการ ขออภัยในความไม่สะดวก"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "inline-block bg-amber-500/10 border border-amber-500/20 rounded-2xl px-6 py-4 mt-2 max-w-sm mx-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-semibold text-amber-900 leading-relaxed",
									children: [
										"เราจะเปิดบริการอีกครั้งวันอาทิตย์-ศุกร์",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"เวลา ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-extrabold text-amber-950 text-base",
											children: "8:00 - 21:00 น."
										})
									]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs font-bold text-slate-400 uppercase tracking-wider px-1",
								children: "ตารางเวลาให้บริการ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bg-white border border-slate-200/80 rounded-2xl shadow-soft divide-y divide-slate-100 overflow-hidden",
								children: [
									{
										name: "วันอาทิตย์",
										label: "อา.",
										time: "08:00 - 21:00",
										open: true,
										dayIndex: 0
									},
									{
										name: "วันจันทร์",
										label: "จ.",
										time: "08:00 - 21:00",
										open: true,
										dayIndex: 1
									},
									{
										name: "วันอังคาร",
										label: "อ.",
										time: "08:00 - 21:00",
										open: true,
										dayIndex: 2
									},
									{
										name: "วันพุธ",
										label: "พ.",
										time: "08:00 - 21:00",
										open: true,
										dayIndex: 3
									},
									{
										name: "วันพฤหัสบดี",
										label: "พฤ.",
										time: "08:00 - 21:00",
										open: true,
										dayIndex: 4
									},
									{
										name: "วันศุกร์",
										label: "ศ.",
										time: "08:00 - 21:00",
										open: true,
										dayIndex: 5
									},
									{
										name: "วันเสาร์",
										label: "ส.",
										time: "ปิดทำการ",
										open: false,
										dayIndex: 6
									}
								].map((day) => {
									const isToday = day.dayIndex === todayDay;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `flex items-center justify-between px-4 py-3.5 transition-colors ${isToday ? "bg-amber-500/5" : ""}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: `w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center ${isToday ? "bg-amber-500 text-white shadow-sm" : "bg-slate-100 text-slate-500"}`,
												children: day.label
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: `text-sm font-semibold ${isToday ? "text-slate-800" : "text-slate-600"}`,
												children: [
													day.name,
													" ",
													isToday && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "ml-1 text-[10px] font-bold text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded-full",
														children: "วันนี้"
													})
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs font-mono font-bold text-slate-700",
												children: day.time
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2.5 w-2.5 rounded-full ${day.open ? "bg-emerald-500" : "bg-red-500"}` })]
										})]
									}, day.dayIndex);
								})
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onBypass,
						className: "w-full py-4 px-5 rounded-2xl text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 bg-slate-50 border border-slate-200/80 transition-all text-center flex items-center justify-center gap-2 active:scale-[0.98]",
						children: "เข้าสู่หน้าร้าน (โหมดสาธิตสำหรับทดสอบ)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] text-slate-400 text-center",
						children: "* ปุ่มด้านบนสำหรับผู้ตรวจสอบเพื่อทดสอบการใช้งาน in วันหยุด/นอกเวลา"
					})]
				})]
			})
		})]
	});
}
function Sidebar({ onClose, onNavigate, orderHistory, simulateClosed, setSimulateClosed, profile, onLogout }) {
	const items = [
		{
			id: "home",
			label: "หน้าแรก",
			icon: House
		},
		{
			id: "status",
			label: "สถานะการสั่งซื้อ",
			icon: ClipboardList
		},
		{
			id: "history",
			label: "ประวัติการสั่งซื้อ",
			icon: History
		},
		{
			id: "contact",
			label: "ติดต่อเรา",
			icon: MessageCircle
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		onClick: onClose,
		className: "absolute inset-0 bg-black/55 z-[60]"
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.aside, {
		initial: { x: "-100%" },
		animate: { x: 0 },
		exit: { x: "-100%" },
		transition: {
			type: "tween",
			duration: .28
		},
		className: "absolute top-0 left-0 bottom-0 w-[78%] md:w-[320px] z-[70] flex flex-col",
		style: {
			background: BRAND,
			color: "white"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "p-5 border-b border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [profile?.pictureUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: profile.pictureUrl,
						alt: profile.displayName,
						className: "h-12 w-12 rounded-full object-cover",
						style: { border: "2px solid #fcc14a" }
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-12 w-12 place-items-center rounded-full",
						style: {
							background: GOLD,
							color: BRAND
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { size: 22 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-bold",
						children: profile?.displayName ?? "ผู้ใช้งาน"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-white/60",
						children: "บัญชีผู้ใช้"
					})] })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto no-scrollbar p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "space-y-1",
					children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => {
							onNavigate(it.id);
						},
						className: "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left hover:bg-white/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(it.icon, {
								size: 18,
								color: GOLD
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-sm",
								children: it.label
							}),
							it.id === "history" && orderHistory.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full",
								style: {
									background: GOLD,
									color: BRAND
								},
								children: orderHistory.length
							})
						]
					}, it.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 border-t border-white/10 space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-white/5 rounded-2xl p-4 border border-white/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-bold text-white/50 uppercase tracking-wider mb-2.5",
						children: "โหมดผู้พัฒนา (Developer Mode)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-white/80",
							children: "จำลองสถานะร้านปิด"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSimulateClosed(!simulateClosed),
							className: `relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${simulateClosed ? "bg-amber-500" : "bg-white/15"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${simulateClosed ? "translate-x-5" : "translate-x-0"}` })
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: onLogout,
					className: "w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium",
					style: {
						background: "rgba(255,255,255,0.08)",
						color: "white"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 16 }), " ออกจากระบบ"]
				})]
			})
		]
	})] });
}
//#endregion
export { LiffApp as component };

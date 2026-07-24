import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./supabase-BbREKNGv.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, l as useRouterState, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
import { a as Users, dt as Check, it as CircleQuestionMark, o as User, st as ChevronRight, x as Shield } from "../_libs/lucide-react.mjs";
import { n as Route$9 } from "./customer-CXoL6D-b.mjs";
import { t as LanguageProvider } from "./i18n-DLuw9dTA.mjs";
import { t as Stripe } from "../_libs/stripe.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CaAT8q2u.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-BjV1GDfr.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function DevBypassPanel() {
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [activeRole, setActiveRole] = (0, import_react.useState)("customer");
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") setActiveRole(localStorage.getItem("dev-bypass-role") || "customer");
	}, []);
	const handleRoleChange = (role) => {
		if (role === "none") {
			localStorage.removeItem("dev-bypass-role");
			setActiveRole("none");
			window.location.href = "/login";
		} else {
			localStorage.setItem("dev-bypass-role", role);
			setActiveRole(role);
			if (role === "admin") window.location.href = "/admin";
			else if (role === "staff") window.location.href = "/staff";
			else if (role === "captain") window.location.href = "/captain";
			else if (role === "customer") window.location.href = "/customer";
		}
	};
	const roles = [
		{
			id: "customer",
			name: "ลูกค้า / สั่งอาหาร (Customer)",
			icon: User,
			color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
		},
		{
			id: "staff",
			name: "พนักงานครัว (Kitchen Staff)",
			icon: Users,
			color: "text-amber-400 bg-amber-400/10 border-amber-400/20"
		},
		{
			id: "captain",
			name: "พนักงานบริการ (Captain)",
			icon: Users,
			color: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20"
		},
		{
			id: "admin",
			name: "ผู้ดูแลระบบ (Store Admin)",
			icon: Shield,
			color: "text-red-400 bg-red-400/10 border-red-400/20"
		},
		{
			id: "none",
			name: "ระบบล็อคอินหลัก (Main Login)",
			icon: CircleQuestionMark,
			color: "text-gray-400 bg-gray-400/10 border-gray-400/20"
		}
	];
	const currentRoleName = roles.find((r) => r.id === activeRole)?.name.split(" (")[0] || "ลูกค้า / สั่งอาหาร";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-6 left-6 z-[99999] font-sans",
		children: isOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-80 rounded-2xl border border-white/10 bg-[#0f1f2b]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-200",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between pb-3 border-b border-white/5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-2 w-2 rounded-full bg-[#fcc14a] animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-bold uppercase tracking-wider text-white/70",
							children: "เลือกบทบาทระบบเดโม (Demo Mode)"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setIsOpen(false),
						className: "rounded-lg p-1 text-white/40 hover:bg-white/5 hover:text-white transition-colors cursor-pointer text-xs",
						children: "ย่อหน้าต่าง"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-2 text-[11px] text-white/50 leading-relaxed",
					children: "เลือกบทบาทผู้ใช้งานเพื่อทดสอบการใช้งานระบบในมุมมองต่างๆ ทุกหน้าสามารถทดลองสั่งและบันทึกออเดอร์จริงได้ทันที"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 space-y-2",
					children: roles.map((role) => {
						const Icon = role.icon;
						const isSelected = activeRole === role.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => handleRoleChange(role.id),
							className: `w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 text-left cursor-pointer group ${isSelected ? "bg-white/10 border-[#fcc14a]/40 text-[#fcc14a] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:border-white/10 hover:text-white"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `p-1.5 rounded-lg border ${role.color}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm font-semibold",
									children: role.name
								})]
							}), isSelected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								size: 16,
								className: "text-[#fcc14a]"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
								size: 16,
								className: "opacity-0 group-hover:opacity-100 transition-opacity text-white/40"
							})]
						}, role.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 pt-3 border-t border-white/5 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-[#fcc14a]/75 font-medium tracking-wide",
						children: "สลับมุมมองเดโมได้ตลอดการทดลองใช้ระบบ"
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setIsOpen(true),
			className: "flex items-center gap-2.5 rounded-full border border-[#fcc14a]/40 bg-[#0f1f2b]/90 px-4 py-3 font-semibold text-white shadow-lg shadow-black/40 transition-all duration-300 hover:scale-105 hover:border-[#fcc14a]/75 active:scale-95 cursor-pointer",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "flex h-2.5 w-2.5 rounded-full bg-[#fcc14a] animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-xs tracking-wide",
				children: ["สลับบทบาทเดโม: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[#fcc14a] font-bold",
					children: currentRoleName
				})]
			})]
		})
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#002e47"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{ title: "Lovable App" },
			{
				name: "description",
				content: "A mobile-first React web app for LINE LIFF food delivery, featuring a minimalist design and intuitive navigation."
			},
			{
				name: "author",
				content: "Lovable"
			},
			{
				property: "og:title",
				content: "Lovable App"
			},
			{
				property: "og:description",
				content: "A mobile-first React web app for LINE LIFF food delivery, featuring a minimalist design and intuitive navigation."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			},
			{
				name: "twitter:title",
				content: "Lovable App"
			},
			{
				name: "twitter:description",
				content: "A mobile-first React web app for LINE LIFF food delivery, featuring a minimalist design and intuitive navigation."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7f1ddf64-af89-4dbe-8331-802eb463acb3/id-preview-39d7dc68--7b87f1b8-481d-40c1-a507-b9601d300c39.lovable.app-1781499966608.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7f1ddf64-af89-4dbe-8331-802eb463acb3/id-preview-39d7dc68--7b87f1b8-481d-40c1-a507-b9601d300c39.lovable.app-1781499966608.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	const routerState = useRouterState();
	(0, import_react.useEffect)(() => {
		const channel = supabase.channel("global-db-changes").on("postgres_changes", {
			event: "*",
			schema: "public"
		}, (payload) => {
			console.log("🔄 Database Changed:", payload);
			queryClient.invalidateQueries();
			if (payload.table === "users" && payload.eventType === "UPDATE") supabase.auth.getUser().then(({ data: { user } }) => {
				if (user && payload.new && payload.new.auth_user_id === user.id) {
					if (payload.new.is_active === false) {
						alert("สิทธิ์การใช้งานของคุณถูกระงับ (Account Suspended)");
						supabase.auth.signOut().then(() => {
							window.location.href = "/login";
						});
					} else if (payload.old && payload.new.role !== payload.old.role) {
						alert("บทบาทของคุณถูกเปลี่ยนแปลง กรุณาเข้าสู่ระบบใหม่ (Role Changed)");
						supabase.auth.signOut().then(() => {
							window.location.href = "/login";
						});
					}
				}
			});
		}).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LanguageProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: routerState.status === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					scaleX: 0
				},
				animate: {
					opacity: 1,
					scaleX: 1
				},
				exit: { opacity: 0 },
				transition: { duration: .3 },
				className: "fixed top-0 left-0 right-0 h-1 z-[9999] bg-[#fcc14a] origin-left"
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-screen w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DevBypassPanel, {})
		] })
	});
}
var $$splitComponentImporter$6 = () => import("./test-translation-B3hONj6E.mjs");
var Route$7 = createFileRoute("/test-translation")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./login-DTl6piNN.mjs");
var Route$6 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "เข้าสู่ระบบ · ร้านลุงเก้ต" }, {
		name: "description",
		content: "เข้าสู่ระบบเพื่อสั่งอาหารจากร้านลุงเก้ต"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./kitchen-C2ZCBT6w.mjs");
var Route$5 = createFileRoute("/kitchen")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./routes-CcK2eZ0G.mjs");
var Route$4 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./staff-C1LH5KAN.mjs");
var Route$3 = createFileRoute("/staff/")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./captain-BAgG5hoc.mjs");
var Route$2 = createFileRoute("/captain/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./admin-DYaSXrCu.mjs");
var Route$1 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var stripeSecretKey = process.env.STRIPE_SECRET_KEY;
var stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: "2025-01-27.acacia" }) : null;
var Route = createFileRoute("/api/stripe-webhook")({ server: { handlers: { POST: async ({ request }) => {
	const signature = request.headers.get("stripe-signature");
	const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
	if (!stripe) {
		console.warn("[Stripe Webhook] Stripe secret key not configured. Webhook ignored.");
		return new Response(JSON.stringify({ error: "Stripe not configured on server" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
	if (!signature || !webhookSecret) {
		console.error("[Stripe Webhook] Missing stripe-signature header or STRIPE_WEBHOOK_SECRET env variable.");
		return new Response(JSON.stringify({ error: "Missing signature or webhook secret" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
	try {
		const rawBody = await request.text();
		const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
		console.log(`[Stripe Webhook] Verified event: ${event.type}`);
		if (event.type === "checkout.session.completed") {
			const session = event.data.object;
			console.log(`[Stripe Webhook] Checkout completed for session ID: ${session.id}`);
			console.log(`[Stripe Webhook] Payment Status: ${session.payment_status}`);
		}
		return new Response(JSON.stringify({ received: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		console.error(`[Stripe Webhook] Signature verification failed: ${err.message}`);
		return new Response(JSON.stringify({ error: `Webhook Error: ${err.message}` }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
} } } });
var TestTranslationRoute = Route$7.update({
	id: "/test-translation",
	path: "/test-translation",
	getParentRoute: () => Route$8
});
var LoginRoute = Route$6.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$8
});
var KitchenRoute = Route$5.update({
	id: "/kitchen",
	path: "/kitchen",
	getParentRoute: () => Route$8
});
var IndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$8
});
var StaffIndexRoute = Route$3.update({
	id: "/staff/",
	path: "/staff/",
	getParentRoute: () => Route$8
});
var CustomerIndexRoute = Route$9.update({
	id: "/customer/",
	path: "/customer/",
	getParentRoute: () => Route$8
});
var CaptainIndexRoute = Route$2.update({
	id: "/captain/",
	path: "/captain/",
	getParentRoute: () => Route$8
});
var AdminIndexRoute = Route$1.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => Route$8
});
var rootRouteChildren = {
	IndexRoute,
	KitchenRoute,
	LoginRoute,
	TestTranslationRoute,
	ApiStripeWebhookRoute: Route.update({
		id: "/api/stripe-webhook",
		path: "/api/stripe-webhook",
		getParentRoute: () => Route$8
	}),
	AdminIndexRoute,
	CaptainIndexRoute,
	CustomerIndexRoute,
	StaffIndexRoute
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };

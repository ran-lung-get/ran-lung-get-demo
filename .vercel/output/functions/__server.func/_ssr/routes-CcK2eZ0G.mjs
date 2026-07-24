import { o as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CcK2eZ0G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RootRedirector() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		navigate({ to: "/customer" });
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
}
//#endregion
export { RootRedirector as component };

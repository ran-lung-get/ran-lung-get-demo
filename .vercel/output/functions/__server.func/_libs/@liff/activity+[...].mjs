import { __assign, __extends, __makeTemplateObject, __read, __spreadArray } from "tslib";
//#region node_modules/@liff/logger/lib/index.es.js
var n$1;
(function(o) {
	o[o.DEBUG = 1] = "DEBUG", o[o.INFO = 2] = "INFO", o[o.WARN = 3] = "WARN", o[o.ERROR = 4] = "ERROR";
})(n$1 || (n$1 = {}));
var i$3 = new (function() {
	function r(o) {
		void 0 === o && (o = n$1.INFO), this.logLevel = o, this._debug = console.debug, this._info = console.info, this._warn = console.warn, this._error = console.error;
	}
	return r.prototype.debug = function() {
		for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
		this.logLevel <= n$1.DEBUG && (r.unshift("[DEBUG]"), this._debug.apply(this, __spreadArray([], __read(r), !1)));
	}, r.prototype.info = function() {
		for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
		this.logLevel <= n$1.INFO && (r.unshift("[INFO]"), this._info.apply(this, __spreadArray([], __read(r), !1)));
	}, r.prototype.warn = function() {
		for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
		this.logLevel <= n$1.WARN && (r.unshift("[WARN]"), this._warn.apply(this, __spreadArray([], __read(r), !1)));
	}, r.prototype.error = function() {
		for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
		this.logLevel <= n$1.ERROR && (r.unshift("[ERROR]"), this._error.apply(this, __spreadArray([], __read(r), !1)));
	}, r;
}())(3);
//#endregion
//#region node_modules/@liff/use/lib/index.es.js
var i$2 = function(t, e) {
	this._driver = t, this.liff = e, this.hooks = this._driver.hooks, this.internalHooks = this._driver.internalHooks;
}, r$3 = function(t, e) {
	this._driver = t, this.liff = e, this.hooks = this._driver.hooks;
}, s$5 = function() {
	function t(t, e) {
		this.pluginCtx = new r$3(t, e), this.moduleCtx = new i$2(t, e);
	}
	return Object.defineProperty(t.prototype, "pluginContext", {
		get: function() {
			return this.pluginCtx;
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(t.prototype, "moduleContext", {
		get: function() {
			return this.moduleCtx;
		},
		enumerable: !1,
		configurable: !0
	}), t;
}(), u$5 = function() {
	function n() {
		this.modules = /* @__PURE__ */ new Map(), this.hooks = {}, this.internalHooks = {};
	}
	return n.prototype.addModule = function(n, o) {
		this.modules.set(n, o), o.hooks && (this.hooks[n] = Object.entries(o.hooks).reduce(function(n, o) {
			var i, r = __read(o, 2), s = r[0], u = r[1];
			return __assign(__assign({}, n), ((i = {})[s] = u.on.bind(u), i));
		}, {})), "internalHooks" in o && o.internalHooks && (this.internalHooks[n] = Object.entries(o.internalHooks).reduce(function(n, o) {
			var i, r = __read(o, 2), s = r[0], u = r[1];
			return __assign(__assign({}, n), ((i = {})[s] = u.on.bind(u), i));
		}, {}));
	}, n.prototype.hasModule = function(t) {
		return this.modules.has(t);
	}, n;
}(), a$3 = function() {}, l$5 = function(t) {
	return t instanceof a$3;
}, c$5 = function(t) {
	function e(e, n, o) {
		var i = t.call(this) || this;
		return i.driver = e, i.contextHolder = n, i.option = o, i;
	}
	return __extends(e, t), e.prototype.install = function() {
		return this.factory(this.driver, this.contextHolder);
	}, Object.defineProperty(e.prototype, "name", {
		get: function() {
			return "use";
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(e.prototype, "defaultOption", {
		get: function() {
			return { namespacePrefix: "$" };
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.factory = function(t, e) {
		var n = Object.assign({}, this.defaultOption, this.option).namespacePrefix;
		return function(i, r) {
			if (!i || "function" != typeof i.install || "string" != typeof i.name) return i$3.warn("To install the plugin, you need to define the `name` property and the `install` method."), this;
			var s = l$5(i) ? i.name : "".concat(n).concat(i.name);
			if (t.hasModule(s)) return this;
			var u = l$5(i) ? i.install.call(i, e.moduleContext, r) : i.install.call(i, e.pluginContext, r);
			return this["".concat(s)] ? (i$3.warn("There is a duplicate plugin name. `".concat(s, "` plugin namespace will be override.")), this["".concat(s)] = u) : void 0 !== u && (this["".concat(s)] = u), t.addModule(s, i), this;
		};
	}, e;
}(a$3), e$3 = "UNKNOWN", t = "UNAUTHORIZED", E$2 = "INVALID_ARGUMENT", I$2 = "INIT_FAILED", i$1 = "FORBIDDEN", T$3 = "INVALID_CONFIG", _$2 = "RATE_LIMIT_EXCEEDED", n = "INVALID_ID_TOKEN", N$1 = "UNSPECIFIED", l$4 = "CREATE_SUBWINDOW_FAILED", o$1 = "EXCEPTION_IN_SUBWINDOW", D$1 = "liffEvent", s$4 = "LIFF_STORE", a$2 = "https://liff.".concat("line.me", "/"), c$4 = "https://miniapp.".concat("line.me", "/"), r$2 = {
	ACCESS_TOKEN: "accessToken",
	ID_TOKEN: "IDToken",
	DECODED_ID_TOKEN: "decodedIDToken",
	FEATURE_TOKEN: "featureToken",
	LOGIN_TMP: "loginTmp",
	CONFIG: "config",
	CONTEXT: "context",
	EXPIRES: "expires",
	RAW_CONTEXT: "rawContext",
	CLIENT_ID: "clientId",
	IS_SUBSEQUENT_LIFF_APP: "isSubsequentLiffApp",
	MST_CHALLENGE: "mstChallenge",
	MSIT: "msit",
	MST: "mst",
	MST_VERIFIER: "mstVerifier",
	APP_DATA: "appData"
}, A$2 = [
	"context_token",
	"feature_token",
	"access_token",
	"id_token",
	"client_id",
	"mst_verifier",
	"mst_challenge",
	"msit"
], S$4 = [
	"liff.ref.source",
	"liff.ref.medium",
	"liff.ref.campaign",
	"liff.ref.term",
	"liff.ref.content"
], p$5 = "liff://subwindow", L$2 = {
	INIT: "init",
	SUBMIT: "submit",
	CANCEL: "cancel",
	CLOSE: "close",
	ERROR: "error"
}, U$2 = "liff.subwindow", d$4 = "healthCheck", k$3 = [
	"profile",
	"chat_message.write",
	"openid",
	"email"
];
//#endregion
//#region node_modules/@liff/util/lib/index.es.js
function u$3(n) {
	return window.atob(n.replace(/-/g, "+").replace(/_/g, "/"));
}
var f$2 = {
	decode: u$3,
	encode: function(n) {
		return window.btoa(n).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
	},
	decodeUnicode: function(n) {
		var r = u$3(n).split("").map(function(n) {
			return "%" + ("00" + n.charCodeAt(0).toString(16)).slice(-2);
		}).join("");
		return decodeURIComponent(r);
	}
};
function s$3(n, r) {
	if (n === r) return 0;
	for (var t = n.split("."), e = r.split("."), o = Math.max(t.length, e.length), i = 0; i < o; i++) {
		t[i] || (t[i] = "0"), e[i] || (e[i] = "0");
		var a = parseInt(t[i]) - parseInt(e[i]);
		if (0 !== a) return a > 0 ? 1 : -1;
	}
	return 0;
}
function p$4(r) {
	var t = r.replace("#", "").match(/.{2}/g) || [];
	if (4 !== t.length) return i$3.warn("convertArgbToRgba: Received invalid ARGB color"), "";
	var e = function(n) {
		var r = d$3(n);
		return Math.round(r / 255 * 100) / 100;
	}(t[0]), o = d$3(t[1]), i = d$3(t[2]), a = d$3(t[3]);
	return "rgba(".concat(o, ", ").concat(i, ", ").concat(a, ", ").concat(e, ")");
}
function d$3(n) {
	return parseInt(n, 16);
}
function l$3(r) {
	var t = r.replace("#", "").match(/.{2}/g) || [];
	if (3 !== t.length) return i$3.warn("convertArgbToRgba: Received invalid hex color"), "";
	var e = d$3(t[0]), o = d$3(t[1]), i = d$3(t[2]);
	return "".concat(e, ", ").concat(o, ", ").concat(i);
}
function v$3(n) {
	for (var r = n.length, t = new ArrayBuffer(r), e = new Uint8Array(t), o = 0; o < r; o++) e[o] = n.charCodeAt(o);
	return t;
}
var g$3 = {
	get: function(n) {
		var r = new RegExp("(?:(?:^|.*;\\s*)".concat(n, "\\s*\\=\\s*([^;]*).*$)|^.*$"));
		return document.cookie.replace(r, "$1");
	},
	set: function(r, t, e) {
		var o = r + "=" + t;
		if (e) for (var i in e) {
			var a = e[i] ? "=".concat(e[i]) : "";
			o += "; ".concat(i).concat(a);
		}
		i$3.debug("set cookie", o), document.cookie = o;
	},
	remove: function(n, r) {
		var t = "".concat(n, "=; expires=Thu, 01 Jan 1970 00:00:00 GMT");
		if (r) for (var e in r) t += "; ".concat(e, "=").concat(r[e]);
		document.cookie = t;
	}
}, h$3 = new Set([
	"400",
	"401",
	"403",
	"404",
	"429",
	"500"
]), w$3 = function(n) {
	function t(r, t, e) {
		var o = n.call(this, t, e) || this;
		return o.code = r, o;
	}
	return __extends(t, n), t;
}(Error);
function m$3(n, r, t) {
	return null != t && t.cause && console.error("This is the cause of LiffError described below.", t.cause), new w$3(n, r || "", t || {});
}
function y$3(n) {
	var r = n.match(/([^-]+)-[^-]+/);
	return r && r[1];
}
function b$1(n) {
	var r = "";
	return n.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ").forEach(function(n) {
		r += String.fromCharCode(parseInt(n));
	}), window.btoa(r);
}
var R$1 = function() {
	function n() {
		this.map = {};
	}
	return n.prototype.clear = function() {
		this.map = {};
	}, n.prototype.getItem = function(n) {
		var r = this.map[n];
		return void 0 === r ? null : r;
	}, n.prototype.setItem = function(n, r) {
		this.map[n] = r;
	}, n.prototype.removeItem = function(n) {
		delete this.map[n];
	}, n.prototype.key = function(n) {
		var r = Object.keys(this.map)[n];
		return void 0 === r ? null : r;
	}, Object.defineProperty(n.prototype, "length", {
		get: function() {
			return Object.keys(this.map).length;
		},
		enumerable: !1,
		configurable: !0
	}), n;
}();
var A$1, I$1 = {
	parse: function(n) {
		return n.replace(/^\?/, "").replace(/^#\/?/, "").split(/&+/).filter(function(n) {
			return n.length > 0;
		}).reduce(function(n, r) {
			var e = __read(r.split("=").map(decodeURIComponent), 2), o = e[0], i = e[1], a = n[o];
			return Array.isArray(a) ? a.push(i) : Object.prototype.hasOwnProperty.call(n, o) ? n[o] = [a, i] : n[o] = i, n;
		}, {});
	},
	stringify: function(n) {
		return Object.keys(n).map(function(r) {
			var t = n[r], e = function(n) {
				return void 0 !== n ? "".concat(encodeURIComponent(r), "=").concat(encodeURIComponent(n)) : encodeURIComponent(r);
			};
			return Array.isArray(t) ? t.map(function(n) {
				return e(n);
			}).join("&") : e(t);
		}).join("&");
	}
}, U$1 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
function L$1() {
	return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
}
function x$1(n) {
	for (var r = "", t = 0; t < n; t++) r += U$1[Math.floor(62 * L$1())];
	return r;
}
function C$2(n) {
	var r = new URL(n);
	return r.hash = r.hash.slice(1).split("&").filter(function(n) {
		return !A$2.some(function(r) {
			return n.startsWith("".concat(r, "="));
		});
	}).join("&"), r.toString();
}
function j$1(n) {
	var r = new URL(n);
	return r.toString().replace(new RegExp(String.raw(O$1 || (O$1 = __makeTemplateObject(["^", ""], ["^", ""])), r.origin)), "");
}
function E$1(n) {
	var r = new URL(n);
	return Array.from(r.searchParams.keys()).forEach(function(n) {
		n.startsWith("liff.utm_") && r.searchParams.delete(n);
	}), r.toString();
}
var S$3 = function(n) {
	var r = E$1(C$2(n));
	if (r !== n) {
		var t = j$1(r);
		window.history.replaceState(history.state, "", t);
	}
};
function k$2(n, r) {
	if (!n) throw new Error("addParamsToUrl: invalid URL");
	var e = new URL(n);
	return Object.entries(r).forEach(function(n) {
		var r = __read(n, 2), o = r[0], i = r[1];
		e.searchParams.set(o, i);
	}), e.toString();
}
var O$1, $$1 = ((A$1 = {})[a$2] = function() {
	var n = T$2(a$2);
	return new RegExp("^".concat(n, "(\\d+-\\w+)"));
}, A$1[c$4] = function() {
	var n = T$2(c$4);
	return new RegExp("^".concat(n, "((\\d+-\\w+)|(\\w+$))"));
}, A$1);
function P$1(n) {
	for (var r in $$1) {
		var t = n.match($$1[r]());
		if (t) return t[1];
	}
	return null;
}
function T$2(n) {
	return n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function F$2(n) {
	var r = n.match(/^(https?:\/\/.*?)\//);
	return r && r[1] || "";
}
function M$1(n) {
	return n.startsWith("line:");
}
function B$1(n) {
	return void 0 === n && (n = window.navigator.userAgent), /ipad/.test(n.toLowerCase());
}
function G$1(n) {
	return void 0 === n && (n = window.navigator.userAgent), /Line\/\d+\.\d+\.\d+/.test(n);
}
function J$1(n) {
	return void 0 === n && (n = window.navigator.userAgent), /Line\/\d+\.\d+\.\d+ LIFF/.test(n);
}
function V$1(n) {
	return void 0 === n && (n = window.navigator.userAgent), /LIFF\/SubWindow/.test(n);
}
var _$1 = function() {
	return "undefined" == typeof window;
};
//#endregion
//#region node_modules/@liff/is-in-client/lib/index.es.js
var c$3 = null;
function u$2() {
	return null === c$3 && (c$3 = J$1() || G$1() && /[#|&]access_token=/.test(location.hash) || "1" === sessionStorage.getItem("".concat("LIFF_STORE", ":").concat("isInClient")), sessionStorage.setItem("".concat("LIFF_STORE", ":").concat("isInClient"), c$3 ? "1" : "0")), !!c$3;
}
(function(n) {
	function o() {
		return null !== n && n.apply(this, arguments) || this;
	}
	return __extends(o, n), Object.defineProperty(o.prototype, "name", {
		get: function() {
			return "isInClient";
		},
		enumerable: !1,
		configurable: !0
	}), o.prototype.install = function() {
		return function() {
			return u$2();
		};
	}, o;
})(a$3);
//#endregion
//#region node_modules/@liff/store/lib/index.es.js
function c$2() {
	var n;
	return null !== (n = window.__liffConfig) && void 0 !== n ? n : {};
}
function l$2(n) {
	window.__liffConfig = n;
}
function a$1(n, t) {
	if (!t) throw m$3(T$3, "liffId is necessary for liff.init()");
	var o = (u$2() ? sessionStorage : localStorage).getItem("".concat(s$4, ":").concat(t, ":").concat(n));
	try {
		return null === o ? null : JSON.parse(o);
	} catch (f) {
		return null;
	}
}
function p$3(n) {
	return a$1(n, c$2().liffId);
}
function s$2(n, t) {
	var o = c$2().liffId;
	if (!o) throw m$3(T$3, "liffId is necessary for liff.init()");
	(u$2() ? sessionStorage : localStorage).setItem("".concat(s$4, ":").concat(o, ":").concat(n), JSON.stringify(t));
}
function E() {
	return p$3(r$2.CONTEXT);
}
function I(n) {
	s$2(r$2.CONTEXT, n);
}
(function(t) {
	function r() {
		return null !== t && t.apply(this, arguments) || this;
	}
	return __extends(r, t), Object.defineProperty(r.prototype, "name", {
		get: function() {
			return "getContext";
		},
		enumerable: !1,
		configurable: !0
	}), r.prototype.install = function() {
		return function() {
			return E();
		};
	}, r;
})(a$3);
function y$2() {
	return ((E() || {}).d || {}).aId;
}
(function(t) {
	function r() {
		return null !== t && t.apply(this, arguments) || this;
	}
	return __extends(r, t), Object.defineProperty(r.prototype, "name", {
		get: function() {
			return "getAId";
		},
		enumerable: !1,
		configurable: !0
	}), r.prototype.install = function() {
		return function() {
			return y$2();
		};
	}, r;
})(a$3);
function _() {
	return ((E() || {}).d || {}).autoplay || !1;
}
(function(t) {
	function r() {
		return null !== t && t.apply(this, arguments) || this;
	}
	return __extends(r, t), Object.defineProperty(r.prototype, "name", {
		get: function() {
			return "getIsVideoAutoPlay";
		},
		enumerable: !1,
		configurable: !0
	}), r.prototype.install = function() {
		return function() {
			return _();
		};
	}, r;
})(a$3);
function S$2() {
	return (E() || {}).profilePlus;
}
(function(t) {
	function r() {
		return null !== t && t.apply(this, arguments) || this;
	}
	return __extends(r, t), Object.defineProperty(r.prototype, "name", {
		get: function() {
			return "getProfilePlus";
		},
		enumerable: !1,
		configurable: !0
	}), r.prototype.install = function() {
		return function() {
			return S$2();
		};
	}, r;
})(a$3);
function O() {
	return Boolean(p$3(r$2.IS_SUBSEQUENT_LIFF_APP));
}
function P(n) {
	s$2(r$2.IS_SUBSEQUENT_LIFF_APP, n);
}
function b() {
	return p$3(r$2.APP_DATA);
}
function N(n) {
	s$2(r$2.APP_DATA, n);
}
function h$2() {
	return p$3(r$2.MST_VERIFIER);
}
function A(n) {
	s$2(r$2.MST_VERIFIER, n);
}
function v$2() {
	return p$3(r$2.MSIT);
}
function C$1(n) {
	s$2(r$2.MSIT, n);
}
function D() {
	return p$3(r$2.MST);
}
function L(n) {
	s$2(r$2.MST, n);
}
function M() {
	return p$3(r$2.MST_CHALLENGE);
}
function R(n) {
	s$2(r$2.MST_CHALLENGE, n);
}
function j() {
	return p$3(r$2.CLIENT_ID);
}
function F$1(n) {
	s$2(r$2.CLIENT_ID, n);
}
function K() {
	return p$3(r$2.RAW_CONTEXT);
}
function w$2() {
	return p$3(r$2.FEATURE_TOKEN);
}
function U(n) {
	s$2(r$2.FEATURE_TOKEN, n);
}
function X() {
	return p$3(r$2.ID_TOKEN);
}
function G(n) {
	s$2(r$2.ID_TOKEN, n);
}
(function(t) {
	function r() {
		return null !== t && t.apply(this, arguments) || this;
	}
	return __extends(r, t), Object.defineProperty(r.prototype, "name", {
		get: function() {
			return "getIDToken";
		},
		enumerable: !1,
		configurable: !0
	}), r.prototype.install = function() {
		return function() {
			return X();
		};
	}, r;
})(a$3);
function x() {
	return p$3(r$2.ACCESS_TOKEN);
}
function B(n) {
	s$2(r$2.ACCESS_TOKEN, n);
}
(function(t) {
	function r() {
		return null !== t && t.apply(this, arguments) || this;
	}
	return __extends(r, t), Object.defineProperty(r.prototype, "name", {
		get: function() {
			return "getAccessToken";
		},
		enumerable: !1,
		configurable: !0
	}), r.prototype.install = function() {
		return function() {
			return x();
		};
	}, r;
})(a$3);
function H(n) {
	var t = c$2().liffId;
	if (!t) throw m$3(T$3, "liffId is necessary for liff.init()");
	(u$2() ? sessionStorage : localStorage).removeItem("".concat(s$4, ":").concat(t, ":").concat(n));
}
function J() {
	return p$3(r$2.LOGIN_TMP);
}
function Q(n) {
	s$2(r$2.LOGIN_TMP, n);
}
function W() {
	H(r$2.LOGIN_TMP);
}
function q(n) {
	var t = c$2();
	g$3.set("".concat(s$4, ":").concat(r$2.EXPIRES, ":").concat(t.liffId), n.getTime(), {
		expires: n.toUTCString(),
		path: "/",
		secure: null
	});
}
function z() {
	var n = c$2();
	return g$3.get("".concat(s$4, ":").concat(r$2.EXPIRES, ":").concat(n.liffId));
}
function Y() {
	var n = c$2();
	g$3.remove("".concat(s$4, ":").concat(r$2.EXPIRES, ":").concat(n.liffId), { path: "/" });
}
function Z() {
	return p$3(r$2.DECODED_ID_TOKEN);
}
function $(n) {
	s$2(r$2.DECODED_ID_TOKEN, n);
}
(function(t) {
	function r() {
		return null !== t && t.apply(this, arguments) || this;
	}
	return __extends(r, t), Object.defineProperty(r.prototype, "name", {
		get: function() {
			return "getDecodedIDToken";
		},
		enumerable: !1,
		configurable: !0
	}), r.prototype.install = function() {
		return function() {
			return Z();
		};
	}, r;
})(a$3);
function tn() {
	Object.keys(r$2).forEach(function(n) {
		H(r$2[n]);
	}), Y();
}
//#endregion
//#region node_modules/@liff/is-logged-in/lib/index.es.js
function e$2() {
	return !!x();
}
(function(r) {
	function n() {
		return null !== r && r.apply(this, arguments) || this;
	}
	return __extends(n, r), Object.defineProperty(n.prototype, "name", {
		get: function() {
			return "isLoggedIn";
		},
		enumerable: !1,
		configurable: !0
	}), n.prototype.install = function() {
		return function() {
			return e$2();
		};
	}, n;
})(a$3);
//#endregion
//#region node_modules/@liff/get-line-version/lib/index.es.js
function r$1() {
	var n = navigator.userAgent.match(/Line\/\d+(\.\d+)*/i);
	return n ? n[0].slice(5) : null;
}
(function(t) {
	function e() {
		return null !== t && t.apply(this, arguments) || this;
	}
	return __extends(e, t), Object.defineProperty(e.prototype, "name", {
		get: function() {
			return "getLineVersion";
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.install = function() {
		return function() {
			return r$1();
		};
	}, e;
})(a$3);
//#endregion
//#region node_modules/@liff/is-sub-window/lib/index.es.js
var a = function() {
	function t() {}
	return t.prototype.invoke = function() {
		return V$1();
	}, t;
}(), l$1 = function() {
	function t(t) {
		this.storage = t;
	}
	return Object.defineProperty(t, "IN_SUB_WINDOW_KEY", {
		get: function() {
			return "inSubWindow";
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.invoke = function() {
		return new URLSearchParams(window.location.search).has("liff.subwindow") && this.setInSubWindow(!0), !(!this.getInSubWindow() && !this.getSubWindowIdentifier());
	}, t.prototype.getInSubWindow = function() {
		var n = this.storage.getItem("".concat(s$4, ":").concat(this.getLiffId(), ":").concat(t.IN_SUB_WINDOW_KEY));
		return null !== n && JSON.parse(n);
	}, t.prototype.getSubWindowIdentifier = function() {
		var t, n, i = "liff.subwindow.identifier", e = new URLSearchParams(window.location.search);
		return e.get(i) || (t = i, (n = e.get("liff.state")) ? new URLSearchParams(n).get(t) : null) || null;
	}, t.prototype.setInSubWindow = function(n) {
		this.storage.setItem("".concat(s$4, ":").concat(this.getLiffId(), ":").concat(t.IN_SUB_WINDOW_KEY), String(n));
	}, t.prototype.getLiffId = function() {
		var t = c$2().liffId;
		if (!t) throw m$3(T$3, "liffId is necessary for liff.init()");
		return t;
	}, t;
}(), m$1 = new (function(n) {
	function i() {
		var t = n.call(this) || this;
		return _$1() ? t.impl = { invoke: function() {
			return !1;
		} } : u$2() ? t.impl = new a() : t.impl = new l$1(window.sessionStorage), t;
	}
	return __extends(i, n), Object.defineProperty(i.prototype, "name", {
		get: function() {
			return "isSubWindow";
		},
		enumerable: !1,
		configurable: !0
	}), i.prototype.install = function() {
		return this.impl.invoke.bind(this.impl);
	}, i;
}(a$3))(), d$1 = m$1.install();
//#endregion
//#region node_modules/@liff/get-os/lib/index.es.js
var r;
function e() {
	if (!r) {
		var t = window.navigator.userAgent.toLowerCase();
		r = /iphone|ipad|ipod/.test(t) ? "ios" : /android/.test(t) ? "android" : "web";
	}
	return r;
}
(function(n) {
	function r() {
		return n.call(this) || this;
	}
	return __extends(r, n), Object.defineProperty(r.prototype, "name", {
		get: function() {
			return "getOS";
		},
		enumerable: !1,
		configurable: !0
	}), r.prototype.install = function() {
		return function() {
			return e();
		};
	}, r;
})(a$3);
//#endregion
//#region node_modules/@liff/is-api-available/lib/index.es.js
function g$1(e) {
	var r, i = E();
	return null === (r = null == i ? void 0 : i.availability) || void 0 === r ? void 0 : r[e];
}
function h$1(e, r, i) {
	var n = g$1(e), t = i || e;
	if (!n) return {
		available: !1,
		error: {
			code: i$1,
			message: "".concat(t, " is not allowed in this LIFF app")
		}
	};
	var o = n.minVer, c = n.unsupportedFromVer, s = !o || function(e, r) {
		var i = r$1();
		return !!i && !(r && s$3(i, r) > 0) && s$3(i, e) >= 0;
	}(o, c), d = u$2();
	return d && !s ? {
		available: !1,
		error: {
			code: i$1,
			message: "".concat(t, " is unavailable in this client version.")
		}
	} : n.permission ? d && s || r ? { available: !0 } : {
		available: !1,
		error: {
			code: i$1,
			message: "".concat(t, " is not allowed in external browser")
		}
	} : {
		available: !1,
		error: {
			code: i$1,
			message: "".concat(t, " is not allowed in this LIFF app")
		}
	};
}
var S$1 = function() {
	return e$2() ? !J$1() && G$1() ? {
		available: !1,
		error: {
			code: i$1,
			message: "Subwindow is not supported in this browser"
		}
	} : d$1() ? {
		available: !1,
		error: {
			code: i$1,
			message: "this api can be only called in parent window"
		}
	} : h$1("subwindowOpen", !0) : {
		available: !1,
		error: {
			code: t,
			message: "Need access_token for api call, Please login first"
		}
	};
}, w$1 = [
	"subwindowOpen",
	"shareTargetPicker",
	"multipleLiffTransition",
	"scanCode",
	"scanCodeV2",
	"getAdvertisingId",
	"addToHomeScreen",
	"bluetoothLeFunction",
	"skipChannelVerificationScreen",
	"createShortcutOnHomeScreen",
	"internalCreateShortcutOnHomeScreen",
	"iap",
	"requestFriendship",
	"activityGetCallState",
	"activityGetRecordingState"
], C = {
	scanCode: function() {
		return h$1("scanCode");
	},
	getAdvertisingId: function() {
		return h$1("getAdvertisingId");
	},
	bluetoothLeFunction: function() {
		return h$1("bluetoothLeFunction");
	},
	shareTargetPicker: function() {
		return d$1() ? {
			available: !1,
			error: {
				code: i$1,
				message: "this api can be only called in parent window"
			}
		} : e$2() ? h$1("shareTargetPicker", !0) : {
			available: !1,
			error: {
				code: t,
				message: "Need access_token for api call, Please login first"
			}
		};
	},
	multipleLiffTransition: function() {
		var e = g$1("multipleLiffTransition");
		return e && e.permission ? u$2() ? { available: !0 } : {
			available: !1,
			error: {
				code: i$1,
				message: "multipleLiffTransition is available only in the LINE App browser"
			}
		} : {
			available: !1,
			error: {
				code: i$1,
				message: "multipleLiffTransition is not allowed in this LIFF app"
			}
		};
	},
	subwindowOpen: S$1,
	scanCodeV2: function() {
		if (!e$2()) return {
			available: !1,
			error: {
				code: t,
				message: "Need access_token for api call, Please login first"
			}
		};
		var e = S$1();
		return e.available ? h$1("scanCodeV2", !0) : e;
	},
	addToHomeScreen: function() {
		return d$1() ? {
			available: !1,
			error: {
				code: i$1,
				message: "this api can be only called in parent window"
			}
		} : h$1("addToHomeScreen");
	},
	skipChannelVerificationScreen: function() {
		var e = E();
		return e ? "square_chat" === e.type ? {
			available: !1,
			error: {
				code: i$1,
				message: "skipChannelVerificationScreen is not allowed in OpenChat"
			}
		} : h$1("skipChannelVerificationScreen") : {
			available: !1,
			error: {
				code: i$1,
				message: "Context is not found"
			}
		};
	},
	createShortcutOnHomeScreen: function() {
		if (d$1()) return {
			available: !1,
			error: {
				code: i$1,
				message: "this api can be only called in parent window"
			}
		};
		if (!e$2()) return {
			available: !1,
			error: {
				code: t,
				message: "Need access_token for api call, Please login first"
			}
		};
		var e$4 = e();
		return "android" !== e$4 && "ios" !== e$4 ? {
			available: !1,
			error: {
				code: i$1,
				message: "this api can be only called in mobile device"
			}
		} : h$1("addToHomeV2", !0, "createShortcutOnHomeScreen");
	},
	internalCreateShortcutOnHomeScreen: function() {
		if (d$1()) return {
			available: !1,
			error: {
				code: i$1,
				message: "this api can be only called in parent window"
			}
		};
		if (!e$2()) return {
			available: !1,
			error: {
				code: t,
				message: "Need access_token for api call, Please login first"
			}
		};
		var e$5 = e();
		if ("android" !== e$5 && "ios" !== e$5) return {
			available: !1,
			error: {
				code: i$1,
				message: "this api can be only called in mobile device"
			}
		};
		var r = h$1("addToHomeV2", !0, "internalCreateShortcutOnHomeScreen");
		return r.available ? h$1("addToHomeLineScheme", !0, "internalCreateShortcutOnHomeScreen") : r;
	},
	iap: function() {
		return u$2() ? e$2() ? d$1() ? {
			available: !1,
			error: {
				code: i$1,
				message: "this api can be only called in parent window"
			}
		} : h$1("iap", !1, "In-App Purchase") : {
			available: !1,
			error: {
				code: t,
				message: "Need access_token for api call, Please login first"
			}
		} : {
			available: !1,
			error: {
				code: i$1,
				message: "In-App Purchase is not allowed in external browser"
			}
		};
	},
	requestFriendship: function() {
		if (!e$2()) return {
			available: !1,
			error: {
				code: t,
				message: "Need access_token for api call, Please login first"
			}
		};
		var e = E();
		return (null == e ? void 0 : e.hasLinkedBot) ? S$1() : {
			available: !1,
			error: {
				code: i$1,
				message: "requestFriendship requires a linked Official Account (bot) for this LIFF app"
			}
		};
	},
	activityGetCallState: function() {
		return h$1("activityGetCallState", !1, "liff.activity.getCallState");
	},
	activityGetRecordingState: function() {
		return h$1("activityGetRecordingState", !1, "liff.activity.getRecordingState");
	}
}, y$1 = function(e) {
	return function() {
		var r = e();
		if (!r.available) throw m$3(r.error.code, r.error.message);
	};
}, k = {
	scanCode: y$1(C.scanCode),
	getAdvertisingId: y$1(C.getAdvertisingId),
	bluetoothLeFunction: y$1(C.bluetoothLeFunction),
	shareTargetPicker: y$1(C.shareTargetPicker),
	multipleLiffTransition: y$1(C.multipleLiffTransition),
	subwindowOpen: y$1(C.subwindowOpen),
	scanCodeV2: y$1(C.scanCodeV2),
	addToHomeScreen: y$1(C.addToHomeScreen),
	skipChannelVerificationScreen: y$1(C.skipChannelVerificationScreen),
	createShortcutOnHomeScreen: y$1(C.createShortcutOnHomeScreen),
	internalCreateShortcutOnHomeScreen: y$1(C.internalCreateShortcutOnHomeScreen),
	iap: y$1(C.iap),
	requestFriendship: y$1(C.requestFriendship),
	activityGetCallState: y$1(C.activityGetCallState),
	activityGetRecordingState: y$1(C.activityGetRecordingState)
};
function T(e) {
	if (!function(e) {
		return w$1.some(function(r) {
			return r === e;
		});
	}(e)) throw m$3(E$2, "Unexpected API name.");
	var r = C[e];
	return !r || r().available;
}
(function(a) {
	function n() {
		var e = a.apply(this, __spreadArray([], __read(arguments), !1)) || this;
		return e.hooks = {}, e;
	}
	return __extends(n, a), Object.defineProperty(n.prototype, "name", {
		get: function() {
			return "isApiAvailable";
		},
		enumerable: !1,
		configurable: !0
	}), n.prototype.install = function() {
		return function(e) {
			return T(e);
		};
	}, n;
})(a$3);
//#endregion
//#region node_modules/@liff/native-bridge/lib/index.es.js
function l(e) {
	return new CustomEvent(D$1, { detail: e });
}
(function() {
	if ("undefined" != typeof window && "function" != typeof window.CustomEvent) {
		function t(t, e) {
			var i = e || {}, o = i.bubbles, n = void 0 !== o && o, a = i.cancelable, r = void 0 !== a && a, d = i.detail, l = void 0 === d ? void 0 : d, f = document.createEvent("CustomEvent");
			return f.initCustomEvent(t, n, r, l), f;
		}
		t.prototype = Event.prototype, window.CustomEvent = t;
	}
})();
var f = {}, c$1 = !1;
function s$1(e, i) {
	c$1 || (c$1 = !0, window.addEventListener("liffEvent", function(t) {
		t && t.detail && t.detail.type && f[t.detail.type] && f[t.detail.type].forEach(function(e) {
			return e(t);
		});
	})), f[e] ? f[e].push(i) : f[e] = [i];
}
function u$1(t, e) {
	var i = f[t];
	if (i && Array.isArray(i)) {
		var o = i.indexOf(e);
		o >= 0 && i.splice(o, 1);
	}
}
function v$1(t) {
	var i = {};
	try {
		i = JSON.parse(t);
	} catch (r) {
		throw m$3(E$2, r.message);
	}
	var a = l(i);
	i$3.debug("[client dispatchEvent to js]", {
		type: a.type,
		detail: a.detail
	}), window.dispatchEvent(a);
}
function p$1(t, a, d) {
	void 0 === a && (a = {}), void 0 === d && (d = "");
	var l = w$2();
	if (!l) throw m$3(i$1, "Invalid featureToken for client features");
	if (!window._liff || !window._liff.postMessage) throw m$3(E$2, "postMessage is not available from client");
	i$3.debug("[js postMessage to client]", t, d, a), window._liff.postMessage(t, l, d, JSON.stringify(a));
}
function w(t, e, l) {
	return void 0 === e && (e = {}), void 0 === l && (l = { once: !0 }), w$2() ? (l = __assign({
		callbackId: x$1(12),
		once: !0
	}, l), new Promise(function(i, n) {
		var a = function(e) {
			if (e && e.detail) {
				var r = e.detail.callbackId === l.callbackId, d = "string" != typeof e.detail.callbackId;
				(r || d) && (l.once && u$1(t, a), i$3.debug("[callback detail]", e.detail), e.detail.error ? n(e.detail.error) : e.detail.data ? i(e.detail.data) : n(e.detail));
			}
			n();
		};
		s$1(t, a), p$1(t, e, l.callbackId);
	})) : Promise.reject(m$3(i$1, "Invalid featureToken for client features"));
}
//#endregion
//#region node_modules/@liff/activity/lib/index.es.js
var u = new R$1(), c = "activityCallState", v = "activityRecordingState", d = function(t) {
	u.setItem(c, JSON.stringify(t));
}, m = function() {
	var t = u.getItem(c);
	return null === t ? null : JSON.parse(t);
}, s = function(t) {
	u.setItem(v, JSON.stringify(t));
}, p = function() {
	var t = u.getItem(v);
	return null === t ? null : JSON.parse(t);
};
function g() {
	k.activityGetCallState();
	var t = m();
	if (null === t) throw m$3(N$1, "Call state has not been received from the native client yet");
	return t;
}
function y() {
	k.activityGetRecordingState();
	var t = p();
	if (null === t) throw m$3(N$1, "Recording state has not been received from the native client yet");
	return t;
}
var h = new (function(e) {
	function n() {
		return null !== e && e.apply(this, arguments) || this;
	}
	return __extends(n, e), Object.defineProperty(n.prototype, "name", {
		get: function() {
			return "activity";
		},
		enumerable: !1,
		configurable: !0
	}), n.prototype.install = function() {
		return !_$1() && u$2() && (s$1("activityCallStateChange", function(t) {
			var e;
			!(null === (e = null == t ? void 0 : t.detail) || void 0 === e) && e.data && d(t.detail.data);
		}), s$1("activityRecordingStateChange", function(t) {
			var e;
			!(null === (e = null == t ? void 0 : t.detail) || void 0 === e) && e.data && s(t.detail.data);
		})), {
			getCallState: g,
			getRecordingState: y
		};
	}, n;
}(a$3))();
//#endregion
export { F$2 as $, Q as A, i$1 as At, h$2 as B, s$5 as Bt, J as C, T$3 as Ct, N as D, c$4 as Dt, M as E, a$2 as Et, X as F, p$5 as Ft, v$2 as G, l$2 as H, i$3 as Ht, Z as I, s$4 as It, y$2 as J, w$2 as K, _ as L, t as Lt, S$2 as M, l$4 as Mt, U as N, n as Nt, O, d$4 as Ot, W as P, o$1 as Pt, C$2 as Q, b as R, a$3 as Rt, I as S, S$4 as St, L as T, _$2 as Tt, q as U, j as V, u$5 as Vt, tn as W, u$2 as X, z as Y, B$1 as Z, C$1 as _, y$3 as _t, v$1 as a, _$1 as at, F$1 as b, I$2 as bt, k as c, h$3 as ct, m$1 as d, m$3 as dt, I$1 as et, r$1 as f, p$4 as ft, B as g, x$1 as gt, A as h, w$3 as ht, u$1 as i, S$3 as it, R as j, k$3 as jt, P as k, e$3 as kt, e as l, k$2 as lt, $ as m, v$3 as mt, p$1 as n, P$1 as nt, w as o, b$1 as ot, e$2 as p, s$3 as pt, x as q, s$1 as r, R$1 as rt, T as s, f$2 as st, h as t, M$1 as tt, d$1 as u, l$3 as ut, D as v, A$2 as vt, K as w, U$2 as wt, G as x, L$2 as xt, E as y, E$2 as yt, c$2 as z, c$5 as zt };

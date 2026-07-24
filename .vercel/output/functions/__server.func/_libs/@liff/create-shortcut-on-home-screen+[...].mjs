import { At as i, Ct as T, Dt as c$1, Et as a$1, Rt as a$2, X as u, bt as I$1, c as k, dt as m, et as I$2, f as r, l as e, nt as P$1, o as w$1, pt as s$1, tt as M, vt as A, y as E$1, yt as E, z as c } from "./activity+[...].mjs";
import { b as l, y as f } from "./analytics+[...].mjs";
import { __awaiter, __extends, __generator, __read, __spreadArray, __values } from "tslib";
//#region node_modules/@liff/permanent-link/lib/index.es.js
var g$1 = /([\x90\x9D\x81\x8D\x8F<"{|}>\\^`“›„•‚ŽŠ…’—ž–‘”‡™‰ŒšŸ‹œ†¥¿©áÄýÍÎðô]|\n|.*#.*#|%(?![0-9A-Fa-f]{2})[^%]{0,2})/, v = function(n) {
	if (g$1.test(n)) throw m(E, "invalid URL.");
	var t = new URL(n), r = t.username, e = t.password, i = t.hash, a = t.search;
	return {
		username: r,
		password: e,
		pathname: t.pathname,
		hash: i,
		origin: t.origin,
		search: a
	};
}, w = function(n) {
	return n.substring(1).split("&").filter(function(n) {
		return !/^liff\./.test(n) && Boolean(n);
	});
}, x$1 = function(n) {
	return encodeURIComponent(n).replace(/[!'()*]/g, function(n) {
		return "%" + n.charCodeAt(0).toString(16).toUpperCase();
	});
}, U$1 = function(e, i) {
	var a = function(r, e) {
		for (var i = __spreadArray([], __read(r), !1), a = 0; a < e.length; a++) {
			var o = e[a], c = i.indexOf(o);
			c > -1 && i.splice(c, 1);
		}
		return i;
	}(function(n) {
		var e, i, a = n.replace(/\+/g, "%2B"), o = new URLSearchParams(a), c = [];
		try {
			for (var s = __values(o.entries()), u = s.next(); !u.done; u = s.next()) {
				var f = __read(u.value, 2), l = f[0], h = f[1];
				c.push("".concat(x$1(l), "=").concat(x$1(h)));
			}
		} catch (m) {
			e = { error: m };
		} finally {
			try {
				u && !u.done && (i = s.return) && i.call(s);
			} finally {
				if (e) throw e.error;
			}
		}
		if (0 === c.length) return [""];
		var p = n.split("&");
		return c.map(function(n, t) {
			return n.endsWith("=") && !p[t].endsWith("=") ? n.slice(0, -1) : n;
		});
	}(w(e).join("&")), w(i)).join("&");
	return "" !== a ? "?".concat(a) : "";
}, y = function(n, t) {
	return 0 === t.indexOf(n) && (n.endsWith("/") && (n = n.substring(0, n.length - 1)), void 0 === t[n.length] || "/" === t[n.length]);
}, b = function(n, t) {
	var r = v(n), e = new URL(t);
	if (r.username !== e.username || r.password !== e.password) throw m(E, "invalid URL.");
	if (e.origin !== r.origin || !y(e.pathname, r.pathname)) throw m(E, "invalid URL.");
}, L$1 = new (function(r) {
	function o() {
		var e = r.apply(this, __spreadArray([], __read(arguments), !1)) || this;
		return e.extraParams = "", e.getAndValidateContext = function() {
			var n = E$1();
			if (!n) throw m(I$1, "Could not get Context from server.");
			if (!n.endpointUrl) throw m(I$1, "Could not get endpointUrl from server.");
			if (!n.permanentLinkPattern) throw m(I$1, "Could not get permanentLinkPattern from server.");
			return n;
		}, e.createUrl = function() {
			var n = e.getAndValidateContext(), t = window.location, r = t.pathname, i = t.search, a = t.hash, o = t.origin, s = new URL(n.endpointUrl);
			if (s.origin !== o || !y(s.pathname, r)) throw m(T, "Current page is not under entrypoint.");
			var l = r.substring(s.pathname.length);
			l.length > 0 && "/" !== l[0] && (l = "/" + l);
			var p = new RegExp("^".concat(A.join("|"))), d = a.substring(1).split("&").filter(function(n) {
				return !p.test(n) && Boolean(n);
			}).join("&"), g = d === s.hash.substring(1) ? "" : d, v = function(n) {
				return n.substring(1).split("&").filter(function(n) {
					return !/liff\.state/.test(n) && Boolean(n);
				});
			}, w = v(i), x = v(s.search);
			e.extraParams && w.push(e.extraParams);
			for (var U = 0; U < x.length; U++) {
				var b = x[U], C = w.indexOf(b);
				C > -1 && w.splice(C, 1);
			}
			var L = w.join("&"), P = "".concat(l).concat("" !== L ? "?".concat(L) : "").concat(g ? "#".concat(g) : "");
			return "".concat(a$1).concat(c().liffId).concat(P);
		}, e.createUrlBy = function(n) {
			return __awaiter(e, void 0, void 0, function() {
				var t, r, e, i, o, u;
				return __generator(this, function(a) {
					if (!(t = c().liffId)) throw m(I$1, "Should run after liff init.");
					return r = this.getAndValidateContext(), b(n, r.endpointUrl), e = v(n), i = new URL(r.endpointUrl), o = r.miniDomainAllowed ? c$1 : a$1, u = r.miniDomainAllowed && r.miniAppId ? r.miniAppId : t, [2, o.concat(u, (w = e.pathname, x = i.pathname, y = w.substring(x.length), "/" === y ? "" : (y.length > 0 && "/" !== y[0] && (y = "/" + y), y)), U$1(e.search, i.search), (p = e.hash, d = new RegExp("^".concat(A.join("|"))), g = p.substring(1).split("&").filter(function(n) {
						return !d.test(n) && Boolean(n);
					}).join("&"), g ? "#".concat(g) : ""))];
					var p, d, g, w, x, y;
				});
			});
		}, e.setExtraQueryParam = function(n) {
			e.extraParams = n;
		}, e.install = function() {
			return {
				createUrl: e.createUrl,
				createUrlBy: e.createUrlBy,
				setExtraQueryParam: e.setExtraQueryParam
			};
		}, e;
	}
	return __extends(o, r), Object.defineProperty(o.prototype, "name", {
		get: function() {
			return "permanentLink";
		},
		enumerable: !1,
		configurable: !0
	}), o;
}(a$2))();
//#endregion
//#region node_modules/@liff/open-window/lib/index.es.js
var a = "is_liff_external_open_window", p = function(n, i) {
	return n ? "&".concat(n.split("&").filter(function(n) {
		return -1 === n.indexOf(a);
	}).join("&").concat("".concat(i ? "#".concat(i) : ""))) : "".concat(i ? "#".concat(i) : "");
};
function s(n) {
	if (!function(n) {
		if (!n || "object" != typeof n) return !1;
		var t = n, o = t.url, e = t.external, r = __read([typeof o, typeof e], 2), f = r[0], l = r[1];
		return "string" === f && "" !== o && ("undefined" === l || "boolean" === l);
	}(n)) throw m(E, "Invalid parameters for liff.openWindow()");
	var u$1 = r();
	if (u()) if (null !== u$1 && "ios" === e() && s$1(u$1, "9.19") >= 0 || !window._liff.postMessage) {
		var s = n.url, d = n.external, m$1 = void 0 !== d && d;
		window.open(function(n, t) {
			var o, e, r, f, l, c, u, s, d;
			(function(n) {
				return -1 !== n.indexOf("#") && -1 !== n.indexOf("?") && n.indexOf("#") < n.indexOf("?");
			})(n) || function(n) {
				return -1 === n.indexOf("?") && -1 !== n.indexOf("#");
			}(n) ? (u = (o = __read(n.split("#"), 2))[0], e = o[1], s = (r = __read((void 0 === e ? "" : e).split("?"), 2))[0], d = r[1]) : (u = (f = __read(n.split("?"), 2))[0], l = f[1], d = (c = __read((void 0 === l ? "" : l).split("#"), 2))[0], s = c[1]);
			var m = p(d, s);
			return "".concat(u, "?").concat(a, "=").concat(!!t).concat(m);
		}(s, m$1));
	} else w$1("openWindow", n);
	else window.open(n.url, "_blank");
}
(function(i) {
	function t() {
		return null !== i && i.apply(this, arguments) || this;
	}
	return __extends(t, i), Object.defineProperty(t.prototype, "name", {
		get: function() {
			return "openWindow";
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.install = function() {
		return function(n) {
			return s(n);
		};
	}, t;
})(a$2);
//#endregion
//#region node_modules/@liff/create-shortcut-on-home-screen/lib/index.es.js
function S(n, e) {
	return __awaiter(this, void 0, void 0, function() {
		var t, i;
		return __generator(this, function(r) {
			switch (r.label) {
				case 0: return t = l("createShortcutOnHomeScreen"), (i = new URL(t)).searchParams.append("liffId", n), i.searchParams.append("url", e.url), e.description && i.searchParams.append("description", e.description), [4, f(i.toString())];
				case 1: return [2, r.sent().shortcutPageUrl];
			}
		});
	});
}
function g(t) {
	if (M(t)) throw m(E, "LINE URL scheme are not supported in the current environment.");
}
function I(n, e) {
	return __awaiter(this, void 0, void 0, function() {
		var t;
		return __generator(this, function(r) {
			switch (r.label) {
				case 0: return u() ? [2] : [4, new Promise(function(t) {
					setTimeout(t, 1e3);
				})];
				case 1: return r.sent(), "hidden" === document.visibilityState ? [2] : (g(e.url), [4, S(n, e)]);
				case 2: return t = r.sent(), s({
					url: t,
					external: !0
				}), [2];
			}
		});
	});
}
function O(n, e) {
	return __awaiter(this, void 0, void 0, function() {
		var t, i;
		return __generator(this, function(r) {
			switch (r.label) {
				case 0: return t = {
					liffId: n,
					targetUrl: e.url,
					description: e.description
				}, i = "".concat("line://shortcut/liff", "?").concat(I$2.stringify(t)), location.href = i, [4, I(n, e)];
				case 1: return r.sent(), [2];
			}
		});
	});
}
function P(n, e) {
	return __awaiter(this, void 0, void 0, function() {
		var t;
		return __generator(this, function(r) {
			switch (r.label) {
				case 0: return g(e.url), [4, S(n, e)];
				case 1: return t = r.sent(), s({
					url: t,
					external: !0
				}), [2];
			}
		});
	});
}
function H(t) {
	var r;
	if (void 0 === t.url || null === t.url || "" === t.url) throw m(E, "no proper argument");
	var n = E$1();
	if (!(null === (r = null == n ? void 0 : n.availability.addToHomeLineScheme) || void 0 === r ? void 0 : r.permission)) {
		if (M(t.url)) throw m(i, "No permission to specify line schema in url.");
		if (t.description) throw m(i, "No permission to specify description.");
	}
	if (!M(t.url)) {
		if (!n) throw m(i, "Could not get Context from server.");
		n.liffId !== P$1(t.url) && b(t.url, n.endpointUrl);
	}
}
function L(n) {
	return __awaiter(this, void 0, void 0, function() {
		return __generator(this, function(t) {
			switch (t.label) {
				case 0: return H(n), k.internalCreateShortcutOnHomeScreen(), [4, x(n)];
				case 1: return t.sent(), [2];
			}
		});
	});
}
function U(n) {
	return __awaiter(this, void 0, void 0, function() {
		return __generator(this, function(t) {
			switch (t.label) {
				case 0: return H(n), k.createShortcutOnHomeScreen(), [4, x(n)];
				case 1: return t.sent(), [2];
			}
		});
	});
}
function x(n) {
	return __awaiter(this, void 0, void 0, function() {
		var t;
		return __generator(this, function(r) {
			switch (r.label) {
				case 0:
					if (!(t = c().liffId)) throw m(I$1, "Invalid LIFF ID.");
					return "ios" === e() ? [4, P(t, n)] : [3, 2];
				case 1: return r.sent(), [3, 4];
				case 2: return [4, O(t, n)];
				case 3: r.sent(), r.label = 4;
				case 4: return [2];
			}
		});
	});
}
var C = function(t) {
	function r() {
		return null !== t && t.apply(this, arguments) || this;
	}
	return __extends(r, t), Object.defineProperty(r.prototype, "name", {
		get: function() {
			return "createShortcutOnHomeScreen";
		},
		enumerable: !1,
		configurable: !0
	}), r.prototype.install = function() {
		return function(t) {
			return U(t);
		};
	}, r;
}(a$2), N = function(t) {
	function r() {
		return null !== t && t.apply(this, arguments) || this;
	}
	return __extends(r, t), Object.defineProperty(r.prototype, "name", {
		get: function() {
			return "internalCreateShortcutOnHomeScreen";
		},
		enumerable: !1,
		configurable: !0
	}), r.prototype.install = function() {
		return function(t) {
			return L(t);
		};
	}, r;
}(a$2);
//#endregion
export { b as a, L$1 as i, N as n, s as r, C as t };

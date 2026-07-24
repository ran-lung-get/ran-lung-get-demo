import { o as __toESM, t as __commonJSMin } from "../../_runtime.mjs";
import { A as Q, At as i$1, B as h$1, C as J, Ct as T, D as N, E as M, F as X, G as v$1, H as l$1, Ht as i, I as Z, K as w$1, N as U, O, P as W, Rt as a, S as I$2, T as L, U as q, V as j, W as tn, X as u, Y as z, _ as C, _t as y, b as F, bt as I$1, dt as m, et as I, f as r, ft as p, g as B, gt as x, h as A, i as u$1, it as S, j as R, k as P, l as e$3, lt as k, m as $, ot as b, p as e$2, pt as s, q as x$1, r as s$1, s as T$1, u as d, ut as l, v as D, w as K, x as G, xt as L$1, y as E, z as c } from "./activity+[...].mjs";
import { S as r$1, _ as l$3, b as l$2, c as Je$1, d as de, f as me, g as h$2, m as r$2, o as y$1, p as ue, s as Ae$1, u as ae, v as d$2, y as f } from "./analytics+[...].mjs";
import { t as o$1 } from "../liff__check-availability.mjs";
import { n as y$2 } from "../liff__extensions.mjs";
import { a as b$1 } from "./create-shortcut-on-home-screen+[...].mjs";
import { n as s$2, t as a$1 } from "../liff__hooks.mjs";
import { n as p$1 } from "../liff__i18n.mjs";
import { __assign, __awaiter, __extends, __generator, __read, __spreadArray, __values } from "tslib";
//#region node_modules/@liff/ready/lib/index.es.js
var e$1, n = new Promise(function(n) {
	e$1 = n;
});
//#endregion
//#region node_modules/@liff/logout/lib/index.es.js
function o() {
	tn();
}
(function(r) {
	function n() {
		return null !== r && r.apply(this, arguments) || this;
	}
	return __extends(n, r), Object.defineProperty(n.prototype, "name", {
		get: function() {
			return "logout";
		},
		enumerable: !1,
		configurable: !0
	}), n.prototype.install = function() {
		return function() {
			return o();
		};
	}, n;
})(a);
//#endregion
//#region node_modules/@liff/login/lib/index.es.js
var import_tiny_sha256 = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(global, factory) {
		if (typeof define === "function" && define.amd) define([], factory);
		else if (typeof module !== "undefined" && module.exports) module.exports = factory();
		else global.sha256 = factory();
	})(exports, function() {
		var sha256 = function sha256(ascii) {
			function rightRotate(value, amount) {
				return value >>> amount | value << 32 - amount;
			}
			var mathPow = Math.pow;
			var maxWord = mathPow(2, 32);
			var lengthProperty = "length";
			var i, j;
			var result = "";
			var words = [];
			var asciiBitLength = ascii[lengthProperty] * 8;
			var hash = sha256.h = sha256.h || [];
			var k = sha256.k = sha256.k || [];
			var primeCounter = k[lengthProperty];
			var isComposite = {};
			for (var candidate = 2; primeCounter < 64; candidate++) if (!isComposite[candidate]) {
				for (i = 0; i < 313; i += candidate) isComposite[i] = candidate;
				hash[primeCounter] = mathPow(candidate, .5) * maxWord | 0;
				k[primeCounter++] = mathPow(candidate, 1 / 3) * maxWord | 0;
			}
			ascii += "";
			while (ascii[lengthProperty] % 64 - 56) ascii += "\0";
			for (i = 0; i < ascii[lengthProperty]; i++) {
				j = ascii.charCodeAt(i);
				if (j >> 8) return;
				words[i >> 2] |= j << (3 - i) % 4 * 8;
			}
			words[words[lengthProperty]] = asciiBitLength / maxWord | 0;
			words[words[lengthProperty]] = asciiBitLength;
			for (j = 0; j < words[lengthProperty];) {
				var w = words.slice(j, j += 16);
				var oldHash = hash;
				hash = hash.slice(0, 8);
				for (i = 0; i < 64; i++) {
					i + j;
					var w15 = w[i - 15], w2 = w[i - 2];
					var a = hash[0], e = hash[4];
					var temp1 = hash[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + (e & hash[5] ^ ~e & hash[6]) + k[i] + (w[i] = i < 16 ? w[i] : w[i - 16] + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ w15 >>> 3) + w[i - 7] + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ w2 >>> 10) | 0);
					hash = [temp1 + ((rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + (a & hash[1] ^ a & hash[2] ^ hash[1] & hash[2])) | 0].concat(hash);
					hash[4] = hash[4] + temp1 | 0;
				}
				for (i = 0; i < 8; i++) hash[i] = hash[i] + oldHash[i] | 0;
			}
			for (i = 0; i < 8; i++) for (j = 3; j + 1; j--) {
				var b = hash[i] >> j * 8 & 255;
				result += (b < 16 ? 0 : "") + b.toString(16);
			}
			return result;
		};
		sha256.code = "var sha256=function a(b){function c(a,b){return a>>>b|a<<32-b}for(var d,e,f=Math.pow,g=f(2,32),h=\"length\",i=\"\",j=[],k=8*b[h],l=a.h=a.h||[],m=a.k=a.k||[],n=m[h],o={},p=2;64>n;p++)if(!o[p]){for(d=0;313>d;d+=p)o[d]=p;l[n]=f(p,.5)*g|0,m[n++]=f(p,1/3)*g|0}for(b+=\"\\x80\";b[h]%64-56;)b+=\"\\x00\";for(d=0;d<b[h];d++){if(e=b.charCodeAt(d),e>>8)return;j[d>>2]|=e<<(3-d)%4*8}for(j[j[h]]=k/g|0,j[j[h]]=k,e=0;e<j[h];){var q=j.slice(e,e+=16),r=l;for(l=l.slice(0,8),d=0;64>d;d++){var s=q[d-15],t=q[d-2],u=l[0],v=l[4],w=l[7]+(c(v,6)^c(v,11)^c(v,25))+(v&l[5]^~v&l[6])+m[d]+(q[d]=16>d?q[d]:q[d-16]+(c(s,7)^c(s,18)^s>>>3)+q[d-7]+(c(t,17)^c(t,19)^t>>>10)|0),x=(c(u,2)^c(u,13)^c(u,22))+(u&l[1]^u&l[2]^l[1]&l[2]);l=[w+x|0].concat(l),l[4]=l[4]+w|0}for(d=0;8>d;d++)l[d]=l[d]+r[d]|0}for(d=0;8>d;d++)for(e=3;e+1;e--){var y=l[d]>>8*e&255;i+=(16>y?0:\"\")+y.toString(16)}return i};";
		return sha256;
	});
})))());
var v = function(i$5) {
	var o, r = x(43), d$4 = b((0, import_tiny_sha256.default)(r)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, ""), _ = c();
	if (!_ || !_.liffId) throw m(T, "You need to define `liffId` for liff.login()");
	var v = {
		app_id: _.liffId,
		state: x(12),
		response_type: "code",
		code_challenge_method: "S256",
		code_challenge: d$4,
		liff_sdk_version: r$1()
	};
	i$5 && i$5.redirectUri && (v.redirect_uri = i$5.redirectUri), d() && !u() && ((null === (o = ae()) || void 0 === o ? void 0 : o.isReady()) ? v.redirect_uri = window.location.href : v.disable_auto_login = "true"), Q({ codeVerifier: r });
	var w = l$2("authorize") + "?" + I.stringify(v);
	i.debug("[Redirect] ".concat(w)), window.location.href = w;
}, w = function(e) {
	function t() {
		var i = e.apply(this, __spreadArray([], __read(arguments), !1)) || this;
		return i.hooks = { before: new s$2() }, i;
	}
	return __extends(t, e), Object.defineProperty(t.prototype, "name", {
		get: function() {
			return "login";
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.install = function() {
		return this._login.bind(this);
	}, t.prototype._login = function(i) {
		this.hooks.before.call(i), v(i);
	}, t;
}(a);
//#endregion
//#region node_modules/@liff/init/lib/index.es.js
var Le = {
	iconColor: "#111111",
	statusBarColor: "BLACK",
	titleTextColor: "#111111",
	titleSubtextColor: "#B7B7B7",
	titleButtonColor: "#111111",
	titleBackgroundColor: "#FFFFFF",
	progressBarColor: "#06C755",
	progressBackgroundColor: "#FFFFFF",
	titleButtonAreaBackgroundColor: "#1FFFFFFF",
	titleButtonAreaBorderColor: "#26000000",
	baseBackgroundColor: "#FFFFFF",
	baseTextColor: "#000000",
	lightButtonBorderColor: "rgba(0, 0, 0, 0.15)"
}, Te = {
	iconColor: "#FFFFFF",
	statusBarColor: "WHITE",
	titleTextColor: "#FFFFFF",
	titleSubtextColor: "#949494",
	titleButtonColor: "#FFFFFF",
	titleBackgroundColor: "#111111",
	progressBarColor: "#06C755",
	progressBackgroundColor: "#111111",
	titleButtonAreaBackgroundColor: "#1FFFFFFF",
	titleButtonAreaBorderColor: "#26000000",
	baseBackgroundColor: "#000000",
	baseTextColor: "#FFFFFF",
	lightButtonBorderColor: "rgba(255, 255, 255, 0.5)"
};
function Ae() {
	var e;
	Ne("color-scheme", ((null == (e = E()) ? void 0 : e.menuColorSetting) || { adaptableColorSchemes: ["light"] }).adaptableColorSchemes.join(" "));
	var t = window.matchMedia("(prefers-color-scheme: dark)");
	Ee({
		matches: null == t ? void 0 : t.matches,
		media: null == t ? void 0 : t.media
	}), t.addEventListener ? t.addEventListener("change", Ee) : t.addListener && t.addListener(Ee);
}
function Ee(t) {
	var r = E(), n = (null == r ? void 0 : r.menuColorSetting) || {
		adaptableColorSchemes: ["light"],
		lightModeColor: Le,
		darkModeColor: Te
	}, o = n.adaptableColorSchemes, i = n.lightModeColor, a = n.darkModeColor, c = o.includes("dark");
	t.matches && c ? Ue(__assign(__assign({}, Te), a)) : Ue(__assign(__assign({}, Le), i));
}
function Ue(e) {
	var t = e.iconColor, r = e.statusBarColor, n = e.titleTextColor, o = e.titleSubtextColor, i = e.titleButtonColor, a = e.titleBackgroundColor, c = e.progressBarColor, s = e.progressBackgroundColor, l$4 = e.titleButtonAreaBackgroundColor, d = e.titleButtonAreaBorderColor, h = e.baseBackgroundColor, p$2 = e.baseTextColor, m = e.lightButtonBorderColor;
	Ne("--liff-base-background-color", h), Ne("--liff-base-text-color", p$2), Ne("--liff-base-background-rgb-color", l(h)), Ne("--liff-base-text-rgb-color", l(p$2)), Ne("--liff-light-button-border-color", m), Ne("--liff-title-text-color", n), Ne("--liff-title-background-color", a), Ne("--liff-title-button-color", i), Ne("--liff-icon-color", t), Ne("--liff-status-bar-color", r), Ne("--liff-title-subtext-color", o), Ne("--liff-progress-bar-color", c), Ne("--liff-progress-background-color", s), Ne("--liff-title-button-area-background-color", p(l$4)), Ne("--liff-title-button-area-border-color", p(d));
}
function Ne(e, t) {
	document.documentElement.style.setProperty(e, t);
}
var Pe = {
	addToHomeScreen: function(e) {
		if (!new o$1(e).invoke("addToHomeScreen")) throw m(i$1, "No permission for liff.addToHomeScreen()");
	},
	scanCode: function(e) {
		if (!new o$1(e).invoke("scanCode")) return Promise.reject(m(i$1, "No permission for liff.scanCode()"));
	},
	getAdvertisingId: function(e) {
		if (!new o$1(e).invoke("getAdvertisingId")) return Promise.reject(m(i$1, "No permission for liff.getAdvertisingId()"));
	},
	initPlugins: function() {}
};
function Oe(e) {
	return __awaiter(this, void 0, void 0, function() {
		var t;
		return __generator(this, function(r) {
			switch (r.label) {
				case 0: return [4, y$2()];
				case 1: return (t = r.sent()) ? (t.install(e, Pe), [2]) : [2];
			}
		});
	});
}
function De(e) {
	var t = e.split(".");
	if (t[1]) try {
		var r = t[1].replace(/-/g, "+").replace(/_/g, "/");
		return JSON.parse(window.atob(r));
	} catch (n) {
		return null;
	}
	return null;
}
function We(e) {
	var t = e.pathname, r = e.query, n = r ? "?".concat(I.stringify(r)) : "", o = "".concat("liff://").concat(t).concat(n);
	location.href = o;
}
var Me = null;
function Re() {
	"boolean" == typeof Me && i.warn("liff.init is not expected to be called more than once"), Me = !!O() || !(!u() || I.parse(window.location.hash).feature_token || w$1()) && (P(!0), !0);
}
function je() {
	return Boolean(Me);
}
function He(e, n) {
	return __awaiter(this, void 0, void 0, function() {
		var t;
		return __generator(this, function(r) {
			switch (r.label) {
				case 0: return (t = D()) ? [2, t] : e && n ? [4, Ae$1({
					msit: e,
					mstVerifier: n
				})] : [3, 2];
				case 1: return [2, r.sent().mst];
				case 2: return [2, null];
			}
		});
	});
}
function Ve(e) {
	return f("".concat(l$2("apps"), "/").concat(e, "/featureToken"));
}
function qe(e) {
	return __awaiter(this, void 0, void 0, function() {
		var t, o, i, a;
		return __generator(this, function(r) {
			switch (r.label) {
				case 0: return t = I.parse(window.location.hash), o = function(e) {
					for (var t, r, o = [], i = 1; i < arguments.length; i++) o[i - 1] = arguments[i];
					var a = function(t) {
						Object.keys(t).filter(function(e) {
							return null !== t[e] && void 0 !== t[e];
						}).forEach(function(r) {
							e[r] = t[r];
						});
					};
					try {
						for (var c = __values(o), s = c.next(); !s.done; s = c.next()) a(s.value);
					} catch (l) {
						t = { error: l };
					} finally {
						try {
							s && !s.done && (r = c.return) && r.call(c);
						} finally {
							if (t) throw t.error;
						}
					}
					return e;
				}({
					access_token: x$1(),
					context_token: K(),
					feature_token: w$1(),
					id_token: X(),
					client_id: j(),
					mst_challenge: M(),
					mst_verifier: h$1(),
					msit: v$1()
				}, t), je() ? e$2() ? [4, Ve(e)] : [3, 2] : [3, 3];
				case 1: i = r.sent().featureToken, o.feature_token || (o.feature_token = i), r.label = 2;
				case 2: (a = y(e)) && (o.client_id = a), r.label = 3;
				case 3: return [2, o];
			}
		});
	});
}
function Je(e) {
	if (e.persisted && T$1("multipleLiffTransition")) if ("ios" === e$3()) window.location.reload();
	else {
		var t = c().liffId, r = w$1();
		if (!t) throw m(I$1, "Invalid LIFF ID.");
		if (!r) throw m(i$1, "Invalid featureToken for client features");
		We({
			pathname: "app/".concat(t),
			query: { feature_token: r }
		});
	}
}
function ze(e) {
	return __awaiter(this, void 0, void 0, function() {
		var t, n, o, i$2, a, c, s$3, f, u, p, w, g, k$1, F$1, C$1, y$3, B$1, I, _;
		return __generator(this, function(r$4) {
			switch (r$4.label) {
				case 0: return [4, new Promise(function(e) {
					var t = r();
					if (!t || s(t, "9.5.0") < 0) e();
					else if (window._liff && window._liff.features) e();
					else {
						i.debug("cannot find window._liff.features, listen to ready event");
						var r$3 = function() {
							i.debug("ready event is fired"), u$1("ready", r$3), e();
						};
						s$1("ready", r$3);
					}
				})];
				case 1: return r$4.sent(), Re(), [4, qe(e.liffId)];
				case 2:
					if (t = r$4.sent(), n = t.access_token, o = t.context_token, i$2 = t.feature_token, a = t.id_token, c = t.client_id, s$3 = t.mst_verifier, f = t.mst_challenge, u = t.msit, o) {
						if ("string" != typeof o) throw m(I$1, "Cannot get context token, perhaps there is an incorrect parameter in permanent link");
						I$2(De(o));
					}
					if (void 0 !== (null === (I = E()) || void 0 === I ? void 0 : I.liffId) && (null === (_ = E()) || void 0 === _ ? void 0 : _.liffId) !== e.liffId) throw m(I$1, "Invalid LIFF ID");
					return !d() && i$2 && (function(e, t) {
						T$1("multipleLiffTransition") && We({
							pathname: "app/".concat(e),
							query: { feature_token: t }
						});
					}(e.liffId, i$2), je() && U(i$2)), f && R(f), s$3 && A(s$3), c && F(c), u && C(u), window.addEventListener("pageshow", Je), e$2() ? [3, 5] : i$2 && n ? [3, 5] : je() ? (p = k(location.href, { "liff.hback": "2" }), v({ redirectUri: p }), [4, new Promise(function() {})]) : [3, 4];
				case 3: r$4.sent(), r$4.label = 4;
				case 4: throw v(), m(I$1, "Failed to parse feature_token or access_token");
				case 5: return n && i$2 ? [4, d$2(n)] : [3, 7];
				case 6:
					if (w = r$4.sent(), g = w.client_id, k$1 = w.expires_in, F$1 = y(e.liffId), g !== F$1) throw v(), m(I$1, "Failed to verify access_token");
					U(i$2), q(new Date(Date.now() + 1e3 * k$1)), B(n), r$4.label = 7;
				case 7: return [4, He(u, s$3)];
				case 8: return (C$1 = r$4.sent()) ? (L(C$1), [4, Je$1({ mst: C$1 })]) : [3, 10];
				case 9: (y$3 = r$4.sent().data) && N(JSON.stringify(y$3)), r$4.label = 10;
				case 10: return a && !X() && G(a), a && c && !Z() ? [4, y$1(a, c)] : [3, 12];
				case 11: (B$1 = r$4.sent()) && $(B$1), r$4.label = 12;
				case 12: return [2];
			}
		});
	});
}
function Ke(e) {
	return __awaiter(this, void 0, void 0, function() {
		var t, n, o, i, a, c, s;
		return __generator(this, function(r) {
			switch (r.label) {
				case 0: return t = l$2("apps"), n = "".concat(t, "/").concat(e, "/contextToken"), o = x$1(), i = {
					"Content-Type": "application/json",
					Accept: "application/json"
				}, o && (i.Authorization = "Bearer ".concat(o)), [4, f(n, { headers: i })];
				case 1:
					if (a = r.sent(), !(c = a.contextToken)) throw m(I$1, "Can not get context from server.");
					if (!(s = De(c))) throw m(I$1, "Invalid context token.");
					return [2, s];
			}
		});
	});
}
function Ge() {
	return __awaiter(this, void 0, void 0, function() {
		var e, t;
		return __generator(this, function(r) {
			switch (r.label) {
				case 0:
					if (!(e = c().liffId)) throw m(I$1, "Invalid LIFF ID.");
					return [4, Ke(e)];
				case 1: return t = r.sent(), I$2(t), [2];
			}
		});
	});
}
function Qe(e) {
	return __awaiter(this, void 0, void 0, function() {
		var n, o, i, a = this;
		return __generator(this, function(c$2) {
			switch (c$2.label) {
				case 0: n = function() {
					return __awaiter(a, void 0, void 0, function() {
						var t, n, o, i, a, c$1;
						return __generator(this, function(r) {
							switch (r.label) {
								case 0: return [4, (s = c(), l = I.parse(window.location.search), f$1 = J(), u = {
									grant_type: "authorization_code",
									client_id: l.liffClientId,
									appId: s.liffId,
									code: l.code,
									code_verifier: f$1.codeVerifier,
									redirect_uri: s.redirectUri || l.liffRedirectUri,
									id_token_key_type: "JWK"
								}, d = I.stringify(u), f(l$2("token"), {
									method: "POST",
									headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
									body: d
								}))];
								case 1: return t = r.sent(), n = t.access_token, o = t.id_token, i = t.expires_in, F(e), B(n), q(new Date(Date.now() + 1e3 * i)), W(), o ? (G(o), [4, y$1(o, e)]) : [3, 3];
								case 2: (a = r.sent()) && $(a), r.label = 3;
								case 3: return (c$1 = I.parse(location.hash).context_token) ? (I$2(De(c$1)), [3, 6]) : [3, 4];
								case 4: return [4, Ge()];
								case 5: r.sent(), r.label = 6;
								case 6: return [2];
							}
							var s, l, f$1, u, d;
						});
					});
				}, c$2.label = 1;
				case 1: return c$2.trys.push([
					1,
					3,
					,
					4
				]), [4, n()];
				case 2: return c$2.sent(), [3, 4];
				case 3: throw o = c$2.sent(), i = o, W(), i;
				case 4: return [2];
			}
		});
	});
}
function Xe() {
	return __awaiter(this, void 0, void 0, function() {
		var e, n, o, i, a, c, s = this;
		return __generator(this, function(f) {
			switch (f.label) {
				case 0: return (n = ae()) ? [3, 2] : [4, ue(h$2.SUB)];
				case 1: n = f.sent(), f.label = 2;
				case 2: return (e = n).isReady() ? (o = x(8), [4, e.getData("appData")]) : [3, 8];
				case 3: return i = f.sent(), a = i.eventName, c = i.data, a !== l$3.NOT_FOUND ? [3, 6] : [4, e.teardown()];
				case 4: return f.sent(), [4, Xe()];
				case 5: return [2, f.sent()];
				case 6: c && N(JSON.stringify(c)), f.label = 7;
				case 7: return e.listen(function(n) {
					return __awaiter(s, void 0, void 0, function() {
						var t, i;
						return __generator(this, function(r) {
							return t = n.context, i = t.data, t.eventName === L$1.INIT && (null == i ? void 0 : i.subWindowId) !== o && r$2(), t.eventName !== L$1.CANCEL && t.eventName !== L$1.SUBMIT || e.teardown(), [2];
						});
					});
				}), e$2() && e.send({
					eventName: L$1.INIT,
					data: {
						subWindowId: o,
						hasOpener: !!window.opener
					}
				}), [3, 10];
				case 8: return me() ? [3, 10] : [4, new Promise(function(e) {
					window.addEventListener("message", function(e) {
						return function t(r) {
							var n = r.data, o = r.source, i = r.origin;
							if (n) {
								var a = n.type, c = n.message;
								a === "healthCheck" && (window.removeEventListener("message", t), c && N(c), de(i), o && o.postMessage && o.postMessage({ status: "healthCheck" }, i), e());
							}
						};
					}(e));
				})];
				case 9: return [2, f.sent()];
				case 10: return [2];
			}
		});
	});
}
var Ye = new (function() {
	function e() {
		var e = this;
		this.getAndValidateContext = function() {
			var e = E();
			if (!e) throw m(I$1, "Could not get Context from server.");
			if (!e.endpointUrl) throw m(I$1, "Could not get endpointUrl from server.");
			if (!e.permanentLinkPattern) throw m(I$1, "Could not get permanentLinkPattern from server.");
			return e;
		}, this.decodeState = function(t) {
			var r = e.getAndValidateContext();
			t = t.replace(/\n/g, "%0D%0A");
			var n = e.hasTrailingSlash(r.endpointUrl) || e.hasTrailingSlash(t), o = new URL(r.endpointUrl), i = o.origin, a = o.pathname, c = o.search, s = new URL("".concat(i).concat(e.attachSlashAtStart(t))), l = s.pathname, f = s.search, u = s.hash, d = "".concat(c).concat(c ? f.replace(/\?/g, "&") : f), h = "".concat(a).concat(e.attachSlashAtStart(l)).replace("//", "/");
			return (h = e.attachSlashAtStart("".concat(h))).endsWith("/") && !n && (h = h.substring(0, h.length - 1)), "".concat(i).concat(h).concat(d).concat(u).replace(/%0D%0A/g, "\n");
		};
	}
	return e.prototype.attachSlashAtStart = function(e) {
		return "".concat(e && e.length > 0 && !e.startsWith("/") ? "/" : "").concat(e);
	}, e.prototype.hasTrailingSlash = function(e) {
		var t = e.indexOf("?"), r = e.indexOf("#"), n = -1;
		return (n = -1 === t && -1 === r ? e.length : -1 === t ? r : -1 === r ? t : Math.min(t, r)) > 0 && "/" === e[n - 1];
	}, e.prototype.invoke = function() {
		return __awaiter(this, void 0, void 0, function() {
			var e, t, n, o, i$3;
			return __generator(this, function(r) {
				switch (r.label) {
					case 0:
						if (e = I.parse(window.location.search), "string" != typeof (t = e["liff.state"])) return [2];
						r.label = 1;
					case 1: return r.trys.push([
						1,
						4,
						,
						5
					]), n = location.href, (o = this.decodeState(t)) === n ? [3, 3] : (e["liff.hback"] ? location.replace(k(o, { "liff.hback": e["liff.hback"] })) : location.replace(o), [4, new Promise(function() {})]);
					case 2: r.sent(), r.label = 3;
					case 3: return [3, 5];
					case 4:
						if ((i$3 = r.sent()).code === "INIT_FAILED") throw i$3;
						return i.debug(i$3), [3, 5];
					case 5: return [2];
				}
			});
		});
	}, e;
}())();
function Ze(e, n) {
	return __awaiter(this, void 0, void 0, function() {
		var t, o$2;
		return __generator(this, function(r) {
			switch (r.label) {
				case 0:
					if (!e.liffId) throw m(T, "liffId is necessary for liff.init()");
					return l$1(e), !u() && e$2() && (z() || o()), t = I.parse(window.location.search), !d() || u() ? [3, 2] : [4, Xe()];
				case 1: r.sent(), r.label = 2;
				case 2:
					if (t.error && t.liffOAuth2Error) throw c = t.error, s = t.error_description, f = s.replace(/\+/g, " "), u$2 = "".concat(c, ": ").concat(f), m(I$1, u$2);
					return i$4 = t.code, a = J(), Boolean(i$4 && !e$2() && a && a.codeVerifier) ? [4, Qe(t.liffClientId)] : [3, 4];
				case 3: r.sent(), r.label = 4;
				case 4: return u() ? [4, ze(e)] : [3, 6];
				case 5: return r.sent(), [3, 8];
				case 6: return e$2() ? [3, 8] : [4, Ge()];
				case 7: r.sent(), r.label = 8;
				case 8: return [4, Ye.invoke()];
				case 9:
					if (r.sent(), o$2 = E()) try {
						b$1(location.href, o$2.endpointUrl);
					} catch (h) {
						i.warn("liff.init() was called with a current URL that is not related to the endpoint URL.\n".concat(location.href, " is not under ").concat(o$2.endpointUrl));
					}
					return [4, n()];
				case 10: return r.sent(), S(window.location.href), [2];
			}
			var i$4, a, c, s, f, u$2;
		});
	});
}
var $e = function(e, t) {
	return new Promise(function(r, n) {
		if (e) {
			var o = document.createElement("script");
			o.type = "module", o.onload = function() {
				r();
			}, o.src = e, document.head.appendChild(o);
		} else n(m(T, t));
	});
}, et = function(e) {
	var t = "https://static.line-scdn.net/lui/edge/versions/1.13.0/lui-alert.js";
	return t && e && (t = t.replace(/\d{1,2}\.\d{1,2}\.\d{1,3}/, e)), $e(t, "LUI_ALERT_URL is not defined");
}, tt = "liffAlert", rt = function() {
	return __awaiter(void 0, void 0, void 0, function() {
		var e;
		return __generator(this, function(t) {
			switch (t.label) {
				case 0: return e = function() {
					var e, t = document.querySelector("script[src*=\"luivendor.js\"]");
					if (t && (null === (e = t.src.match(/\d{1,2}\.\d{1,2}\.\d{1,3}/g)) || void 0 === e ? void 0 : e.length)) return t.src.match(/\d{1,2}\.\d{1,2}\.\d{1,3}/g)[0];
				}(), e ? [3, 2] : [4, $e("https://static.line-scdn.net/lui/edge/versions/1.13.0/luivendor.js", "LUI_VENDOR_URL is not defined")];
				case 1: t.sent(), t.label = 2;
				case 2: return [4, et(e)];
				case 3: return t.sent(), [4, (r = x(6), new Promise(function() {
					var e = document.createElement("div");
					e.innerHTML = "<lui-alert id=\"".concat(tt, "-").concat(r, "\" shown title=\"").concat(p$1("alert.android.extBrowser.autoLoginWorkaround.title"), "\" message=\"").concat(p$1("alert.android.extBrowser.autoLoginWorkaround.desc"), "\" button=\"").concat(p$1("alert.android.extBrowser.autoLoginWorkaround.button.text"), "\"></lui-alert>"), document.body.appendChild(e);
					var t = document.getElementById("".concat(tt, "-").concat(r));
					t && t.addEventListener("lui-button-click", function() {
						var e = window.open(k(window.location.href, { liffIsEscapedFromApp: "true" }), "_blank");
						e && (e.location.href = k(window.location.href, { liffIsEscapedFromApp: "true" }), window.close());
					});
				}))];
				case 4: return t.sent(), [2];
			}
			var r;
		});
	});
}, nt = function(e) {
	try {
		return new URL(e).searchParams.get("lineAppVersion");
	} catch (t) {
		return null;
	}
};
function ot() {
	return __awaiter(this, void 0, void 0, function() {
		var e, t, n;
		return __generator(this, function(r) {
			switch (r.label) {
				case 0: return e = null !== (n = nt(window.location.href)) && void 0 !== n ? n : nt(window.document.referrer), !!e && s(e, "13.10.0") >= 0 ? [2] : u() || "android" !== e$3() || (t = I.parse(window.location.search))["liff.subwindow.identifier"] || t.liffIsEscapedFromApp ? [2] : t.liffClientId && document.referrer.includes("access.".concat("line.me")) ? (window.location.href = k(window.location.href, { liffIsEscapedFromApp: "true" }), [2]) : t.liffClientId && document.referrer.includes("android-app://") ? [4, rt()] : [3, 2];
				case 1: r.sent(), r.label = 2;
				case 2: return t.liffClientId && "" === document.referrer && 1 === window.history.length ? [4, rt()] : [3, 4];
				case 3: r.sent(), r.label = 4;
				case 4: return !document.referrer.includes("liffClientId") || document.referrer.includes("liffIsEscapedFromApp") ? [3, 6] : [4, rt()];
				case 5: r.sent(), r.label = 6;
				case 6: return [2];
			}
		});
	});
}
var it = function(e) {
	function n() {
		var t = e.apply(this, __spreadArray([], __read(arguments), !1)) || this;
		return t.hooks = {
			before: new a$1(),
			after: new a$1()
		}, t.internalHooks = {
			beforeFinished: new a$1(),
			beforeSuccess: new a$1(),
			error: new a$1()
		}, t;
	}
	return __extends(n, e), Object.defineProperty(n.prototype, "name", {
		get: function() {
			return "init";
		},
		enumerable: !1,
		configurable: !0
	}), n.prototype.install = function(e) {
		var t = e.liff;
		return this.liffForWindow = t, this.init.bind(this);
	}, n.prototype.init = function(e, n, o) {
		return __awaiter(this, void 0, void 0, function() {
			var t;
			return __generator(this, function(r) {
				switch (r.label) {
					case 0: return [4, this.hooks.before.call()];
					case 1: r.sent(), i = this.liffForWindow, window && !window.liff && (window.liff = i), r.label = 2;
					case 2: return r.trys.push([
						2,
						9,
						,
						11
					]), [4, Promise.all([Oe(this.liffForWindow), Ze(e, this.internalHooks.beforeFinished.call)])];
					case 3: return r.sent(), Ae(), [4, this.internalHooks.beforeSuccess.call()];
					case 4: return r.sent(), !e.withLoginOnExternalBrowser || e$2() ? [3, 6] : (v(), [4, new Promise(function() {})]);
					case 5: r.sent(), r.label = 6;
					case 6: return [4, ot()];
					case 7: return r.sent(), [4, this.hooks.after.call()];
					case 8: return r.sent(), "function" == typeof n && n(), e$1(), [3, 11];
					case 9: return t = r.sent(), [4, this.internalHooks.error.call(t)];
					case 10: throw r.sent(), "function" == typeof o && o(t), t;
					case 11: return [2];
				}
				var i;
			});
		});
	}, n;
}(a);
//#endregion
export { n as i, w as n, o as r, it as t };

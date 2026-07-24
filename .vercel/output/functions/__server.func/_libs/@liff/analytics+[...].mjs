import { At as i$1, Ct as T$1, E as M, Ft as p$3, Ht as i, I as Z$1, It as s$1, Lt as t, Mt as l$4, Nt as n$1, Ot as d$3, Pt as o, Q as C, R as b$2, Rt as a, St as S$1, V as j, X as u$3, Z as B$1, _t as y$2, at as _$2, c as k, ct as h$3, dt as m$3, et as I$2, f as r$2, g as B$2, gt as x$2, jt as k$1, kt as e$1, l as e$2, m as $$1, mt as v$3, nt as P, o as w$2, p as e$3, pt as s, q as x$1, rt as R$1, s as T$2, st as f$4, u as d$4, v as D$1, wt as U$1, x as G$1, xt as L$1, y as E$3, yt as E$2, z as c$1 } from "./activity+[...].mjs";
import { __assign, __awaiter, __extends, __generator, __read, __spreadArray, __values } from "tslib";
//#region node_modules/@liff/get-version/lib/index.es.js
function r$1() {
	return "2.29.0";
}
(function(n) {
	function r() {
		return null !== n && n.apply(this, arguments) || this;
	}
	return __extends(r, n), Object.defineProperty(r.prototype, "name", {
		get: function() {
			return "getVersion";
		},
		enumerable: !1,
		configurable: !0
	}), r.prototype.install = function() {
		return function() {
			return "2.29.0";
		};
	}, r;
})(a);
//#endregion
//#region node_modules/@liff/server-api/lib/index.es.js
function c(a) {
	return __awaiter(this, void 0, void 0, function() {
		var e, r, s;
		return __generator(this, function(t) {
			switch (t.label) {
				case 0:
					if (!a.ok) return [3, 4];
					t.label = 1;
				case 1: return t.trys.push([
					1,
					3,
					,
					4
				]), [4, a.json()];
				case 2: return [2, t.sent()];
				case 3: return t.sent(), [2, a];
				case 4: return e = String(a.status), r = h$3.has(e) ? e : e$1, [4, a.json().catch(function() {
					throw m$3(r, a.statusText);
				})];
				case 5: throw s = t.sent(), m$3(s.error || s.errorCode || r, s.error_description || s.message);
			}
		});
	});
}
function u$2(e) {
	var t$8 = function(e) {
		if (e) return e;
		var t$7 = x$1();
		if (!t$7) throw m$3(t, "Need access_token for api call, Please login first");
		return {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: "Bearer ".concat(t$7)
		};
	}(e && e.headers);
	return __assign(__assign({}, e), { headers: t$8 });
}
function f$3(e, t) {
	var a;
	try {
		a = u$2(t);
	} catch (n) {
		return Promise.reject(n);
	}
	return fetch(e, a).then(c);
}
function p$2(e, t) {
	var a;
	try {
		a = u$2(t);
	} catch (n) {
		return Promise.reject(n);
	}
	return fetch(e, a);
}
function h$2(e) {
	var t = e.subdomain, a = void 0 === t ? "api" : t, n = e.pathname;
	return "https://".concat(a, ".").concat("line.me", "/").concat(n);
}
var m$2 = {
	token: h$2({ pathname: "oauth2/v2.1/token" }),
	certs: h$2({ pathname: "oauth2/v2.1/certs" }),
	"openid-configuration": h$2({
		subdomain: "access",
		pathname: ".well-known/openid-configuration"
	}),
	authorize: h$2({
		subdomain: "access",
		pathname: "liff/v1/authorize"
	}),
	profile: h$2({ pathname: "v2/profile" }),
	message: h$2({ pathname: "message/v3/share" }),
	friendship: h$2({ pathname: "friendship/v1/status" }),
	shareTargetPicker: h$2({
		subdomain: "access",
		pathname: "oauth2/v2.1/liff/shareTargetPicker"
	}),
	shareTargetPickerOtt: h$2({ pathname: "liff/v2/apps" }),
	shareTargetPickerResult: h$2({
		subdomain: "access",
		pathname: "oauth2/v2.1/liff/shareTargetPicker/result"
	}),
	apps: h$2({ pathname: "liff/v2/apps" }),
	subWindowGetMSIT: h$2({ pathname: "liff/v2/sub/msit" }),
	subWindowGetMSTByMSIT: h$2({ pathname: "liff/v2/sub/mst" }),
	subWindowSubscribe: h$2({
		subdomain: "liff",
		pathname: "liff/v2/sub/waitResult"
	}),
	subWindowPost: h$2({ pathname: "liff/v2/sub/result" }),
	subWindowGetAppData: h$2({ pathname: "liff/v2/sub/appData" }),
	subWindowGetOrigin: function(e) {
		return h$2({ pathname: "liff/v2/sub/".concat(e, "/origin") });
	},
	accessTokenVerify: h$2({ pathname: "oauth2/v2.1/verify" }),
	unauthorizedPermissions: h$2({
		subdomain: "liff",
		pathname: "liff/v2/incrementalAgreement/unauthorizedPermissions"
	}),
	permanentLink: h$2({
		subdomain: "liff",
		pathname: "liff/v2/permanentLink"
	}),
	createShortcutOnHomeScreen: h$2({
		subdomain: "liff-shortcut",
		pathname: "api/shortcut"
	}),
	iapVirtualConfirm: h$2({ pathname: "iap/v1/product/virtualConfirm" }),
	oaAddFriendRateLimit: h$2({
		subdomain: "liff",
		pathname: "liff/v2/oaadd/rateLimit"
	})
};
function l$3(e) {
	return m$2[e];
}
function d$2(e) {
	return f$3("".concat(l$3("accessTokenVerify"), "?access_token=").concat(encodeURIComponent(e)), { headers: {
		"Content-Type": "application/json",
		Accept: "application/json"
	} });
}
//#endregion
//#region node_modules/@liff/message-bus/lib/index.es.js
var d$1 = "liff.subwindow.identifier", u$1 = "liff.subwindow.cryptokey", l$2 = __assign(__assign({}, L$1), {
	GET_DATA: "getData",
	SET_DATA: "setData",
	NOT_FOUND: "notFound",
	TEARDOWN: "teardown"
}), f$2 = {
	BROADCAST: "broadcast",
	COMMAND: "command"
}, h$1 = {
	MAIN: "main",
	SUB: "sub"
}, m$1 = "AES-GCM", y$1 = function(e) {
	return __awaiter(void 0, void 0, void 0, function() {
		var t;
		return __generator(this, function(n) {
			switch (n.label) {
				case 0: return n.trys.push([
					0,
					2,
					,
					3
				]), [4, window.crypto.subtle.importKey("jwk", {
					kty: "oct",
					k: e,
					alg: "A128GCM",
					ext: !0
				}, { name: m$1 }, !1, ["encrypt", "decrypt"])];
				case 1: return [2, n.sent()];
				case 2: throw t = n.sent(), m$3(e$1, t);
				case 3: return [2];
			}
		});
	});
}, w$1 = function(e, i, r) {
	return __awaiter(void 0, void 0, void 0, function() {
		var t, a, o, d;
		return __generator(this, function(n) {
			switch (n.label) {
				case 0: return n.trys.push([
					0,
					3,
					,
					4
				]), t = new TextEncoder().encode(e), [4, y$1(i)];
				case 1: return a = n.sent(), [4, window.crypto.subtle.encrypt({
					name: m$1,
					iv: t
				}, a, new TextEncoder().encode(r))];
				case 2: return o = n.sent(), [2, btoa(new Uint8Array(o).reduce(function(e, t) {
					return e + String.fromCharCode(t);
				}, ""))];
				case 3: throw d = n.sent(), m$3(e$1, d);
				case 4: return [2];
			}
		});
	});
}, g = function(e, i, r) {
	return __awaiter(void 0, void 0, void 0, function() {
		var t, a, o, d, u, l, f;
		return __generator(this, function(n) {
			switch (n.label) {
				case 0: return n.trys.push([
					0,
					3,
					,
					4
				]), t = new TextEncoder().encode(e), [4, y$1(i)];
				case 1:
					for (a = n.sent(), o = atob(r), d = new Uint8Array(o.length), u = 0; u < o.length; u++) d[u] = o.charCodeAt(u);
					return [4, window.crypto.subtle.decrypt({
						name: m$1,
						iv: t
					}, a, d.buffer)];
				case 2: return l = n.sent(), [2, new TextDecoder().decode(new Uint8Array(l))];
				case 3: throw f = n.sent(), m$3(e$1, f);
				case 4: return [2];
			}
		});
	});
}, b$1 = function(e, t) {
	return E$1(e) === E$1(t);
}, E$1 = function(e) {
	return "".concat(e.identifier, "-").concat(e.action, "-").concat(e.timestamp);
}, A = function(e) {
	return Object.keys(L$1).map(function(e) {
		return L$1[e];
	}).includes(e) ? f$2.BROADCAST : f$2.COMMAND;
};
function T() {
	var e = document.createElement("form");
	e.method = "POST", e.action = "$MESSAGE_HANDLER_URL";
	var t = document.createElement("input");
	t.type = "hidden", t.name = "identifier", t.value = "$IDENTIFIER", e.appendChild(t), document.body.appendChild(e), e.submit();
}
var D = function(o) {
	void 0 === o && (o = h$1.MAIN);
	var v = this;
	this.identification = {
		identifier: "",
		cryptoKey: ""
	}, this.messageHandlerInstance = null, this.listeners = /* @__PURE__ */ new Map(), this.sentMessages = [], this.generateIdentification = function() {
		return __awaiter(v, void 0, void 0, function() {
			var e, i, r, o, l;
			return __generator(this, function(f) {
				switch (f.label) {
					case 0: return e = new URLSearchParams(window.location.search), i = function(t) {
						var n = e.get("liff.state");
						return n ? new URLSearchParams(n).get(t) : null;
					}, r = this, l = { identifier: this.windowType === h$1.MAIN ? x$2(12) : e.get("liff.subwindow.identifier") || i("liff.subwindow.identifier") || "" }, this.windowType !== h$1.MAIN ? [3, 2] : [4, __awaiter(void 0, void 0, void 0, function() {
						var e, t, i;
						return __generator(this, function(n) {
							switch (n.label) {
								case 0: return n.trys.push([
									0,
									3,
									,
									4
								]), [4, window.crypto.subtle.generateKey({
									name: m$1,
									length: 128
								}, !0, ["encrypt", "decrypt"])];
								case 1: return e = n.sent(), [4, window.crypto.subtle.exportKey("jwk", e)];
								case 2:
									if (!(t = n.sent()) || !t.k) throw m$3(e$1, "failed to generate key");
									return [2, t.k];
								case 3: throw i = n.sent(), m$3(e$1, i);
								case 4: return [2];
							}
						});
					})];
					case 1: return o = f.sent(), [3, 3];
					case 2: o = e.get("liff.subwindow.cryptokey") || i("liff.subwindow.cryptokey") || "", f.label = 3;
					case 3: return r.identification = (l.cryptoKey = o, l), [2];
				}
			});
		});
	}, this.hasIdentification = function() {
		var e = v.identification, t = e.identifier, n = e.cryptoKey;
		return "string" == typeof t && "string" == typeof n && t.length > 0 && n.length > 0;
	}, this.isReady = function() {
		return v.hasIdentification() && !!v.messageHandlerInstance;
	}, this.setup = function() {
		return __awaiter(v, void 0, void 0, function() {
			var e, t, i, r, a, o = this;
			return __generator(this, function(n) {
				switch (n.label) {
					case 0: return this.messageHandlerInstance ? [2] : [4, this.generateIdentification()];
					case 1:
						if (n.sent(), !(e = this.identification.identifier)) return [2];
						if (t = /^[a-zA-Z0-9]+$/gm, !e.match(t)) throw m$3(e$1, "Invalid identifier");
						return (i = document.createElement("iframe")).style.display = "none", i.src = "about:blank", document.body.appendChild(i), null === (a = null == i ? void 0 : i.contentWindow) || void 0 === a || a.window.eval("(".concat(T.toString().replace("$MESSAGE_HANDLER_URL", "".concat("https://liff-subwindow.line.me/liff/v2/sub/messageHandler")).replace("$IDENTIFIER", e.split("'")[0]), ")()")), r = "iframe-".concat(e, "-ready"), [4, new Promise(function(e) {
							var t = function(n) {
								n.data[r] && (o.messageHandlerInstance = i, window.addEventListener("message", o.proxyToListeners), e(), document.removeEventListener("message", t));
							};
							window.addEventListener("message", t);
						})];
					case 2: return [2, n.sent()];
				}
			});
		});
	}, this.teardown = function() {
		return __awaiter(v, void 0, void 0, function() {
			var e, t;
			return __generator(this, function(n) {
				switch (n.label) {
					case 0: return this.isReady() ? [4, this.send({ eventName: l$2.TEARDOWN })] : [3, 2];
					case 1: n.sent(), window.removeEventListener("message", this.proxyToListeners), this.listeners.clear(), null === (t = null === (e = this.messageHandlerInstance) || void 0 === e ? void 0 : e.parentNode) || void 0 === t || t.removeChild(this.messageHandlerInstance), this.messageHandlerInstance = null, n.label = 2;
					case 2: return [2];
				}
			});
		});
	}, this.listen = function(e) {
		v.listeners.set(e, e);
	}, this.listenRepliedEvent = function(e, t) {
		var n = function(i) {
			i.replyTarget && b$1(i.replyTarget, e) && (t(i), v.listeners.delete(n));
		};
		v.listeners.set(n, n);
	}, this.send = function(e) {
		return __awaiter(v, void 0, void 0, function() {
			var t, i, r, a, o = this;
			return __generator(this, function(n) {
				switch (n.label) {
					case 0:
						if (!this.isReady()) throw m$3("message bus is not ready to send message");
						return i = {
							action: A(e.eventName),
							identifier: this.identification.identifier || "",
							timestamp: (/* @__PURE__ */ new Date()).getTime()
						}, [4, this.getEncryptedContext(e)];
					case 1: return i.context = n.sent(), t = i, null === (a = null === (r = this.messageHandlerInstance) || void 0 === r ? void 0 : r.contentWindow) || void 0 === a || a.postMessage({ messageBusEvent: t }, "*"), this.sentMessages.push(E$1(t)), [4, new Promise(function(e) {
						o.listenRepliedEvent(t, function(t) {
							e(t.context);
						});
					})];
					case 2: return [2, n.sent()];
				}
			});
		});
	}, this.reply = function(e, i) {
		return __awaiter(v, void 0, void 0, function() {
			var t, r, a, o;
			return __generator(this, function(n) {
				switch (n.label) {
					case 0:
						if (!this.isReady()) throw m$3("message bus is not ready to send message");
						if (!e.identifier || !e.timestamp) throw m$3(e$1, "target message is not valid");
						return r = { action: f$2.BROADCAST }, [4, this.getEncryptedContext(i)];
					case 1: return r.context = n.sent(), r.identifier = this.identification.identifier || "", r.timestamp = (/* @__PURE__ */ new Date()).getTime(), r.replyTarget = {
						action: e.action,
						identifier: e.identifier,
						timestamp: e.timestamp
					}, t = r, null === (o = null === (a = this.messageHandlerInstance) || void 0 === a ? void 0 : a.contentWindow) || void 0 === o || o.postMessage({ messageBusEvent: t }, "*"), this.sentMessages.push(E$1(t)), [2];
				}
			});
		});
	}, this.setData = function(e, t) {
		void 0 === e && (e = "appData"), v.send({
			eventName: l$2.SET_DATA,
			key: e,
			data: t
		});
	}, this.getData = function() {
		for (var e = [], s = 0; s < arguments.length; s++) e[s] = arguments[s];
		return __awaiter(v, __spreadArray([], __read(e), !1), void 0, function(e) {
			return void 0 === e && (e = "appData"), __generator(this, function(t) {
				switch (t.label) {
					case 0: return [4, this.send({
						eventName: l$2.GET_DATA,
						key: e
					})];
					case 1: return [2, t.sent()];
				}
			});
		});
	}, this.proxyToListeners = function(i) {
		return __awaiter(v, void 0, void 0, function() {
			var r, s = this;
			return __generator(this, function(a) {
				return r = i.data.messageBusEvent, "https://liff-subwindow.line.me" !== i.origin ? [2] : r ? (this.sentMessages.includes(E$1(r)) || r.identifier !== this.identification.identifier || r.action !== f$2.BROADCAST && !r.replyTarget || this.listeners.forEach(function(i) {
					return __awaiter(s, void 0, void 0, function() {
						var t, s, a;
						return __generator(this, function(n) {
							switch (n.label) {
								case 0: return t = i, s = [__assign({}, r)], a = {}, [4, this.getDecryptedContext(r.context)];
								case 1: return t.apply(void 0, [__assign.apply(void 0, s.concat([(a.context = n.sent(), a)]))]), [2];
							}
						});
					});
				}), [2]) : [2];
			});
		});
	}, this.getEncryptedContext = function(e) {
		return __awaiter(v, void 0, void 0, function() {
			var t, i, r, s, a, o, c;
			return __generator(this, function(n) {
				switch (n.label) {
					case 0: return t = this.identification, i = t.identifier, r = t.cryptoKey, a = (s = JSON).stringify, c = {
						eventName: e.eventName,
						key: e.key ? e.key : void 0
					}, e.data ? [4, w$1(i, r, JSON.stringify(e.data))] : [3, 2];
					case 1: return o = n.sent(), [3, 3];
					case 2: o = void 0, n.label = 3;
					case 3: return [2, a.apply(s, [(c.data = o, c)])];
				}
			});
		});
	}, this.getDecryptedContext = function(i) {
		return __awaiter(v, void 0, void 0, function() {
			var t, r, s, a, o, c, d, u;
			return __generator(this, function(n) {
				switch (n.label) {
					case 0: return t = this.identification, r = t.identifier, s = t.cryptoKey, (a = JSON.parse(i)).data && "string" == typeof a.data ? (u = (d = JSON).parse, [4, g(r, s, a.data)]) : [3, 2];
					case 1: return c = u.apply(d, [n.sent()]), [3, 3];
					case 2: c = void 0, n.label = 3;
					case 3: return o = c, [2, __assign(__assign({}, a), { data: o })];
				}
			});
		});
	}, this.windowType = o;
};
//#endregion
//#region node_modules/@liff/close-window/lib/index.es.js
function r() {
	var o = r$2();
	null !== o && ("ios" === e$2() && s(o, "9.19") >= 0 || "android" === e$2() && s(o, "11.6.0") >= 0) ? location.href = "liff://close" : window._liff && window._liff.postMessage ? null !== o && s(o, "10.15.0") >= 0 ? "ios" === e$2() ? window._liff.postMessage("closeWindow", "") : window._liff.postMessage("closeWindow", "", "", "") : w$2("closeWindow") : window.close();
}
(function(i) {
	function n() {
		return null !== i && i.apply(this, arguments) || this;
	}
	return __extends(n, i), Object.defineProperty(n.prototype, "name", {
		get: function() {
			return "closeWindow";
		},
		enumerable: !1,
		configurable: !0
	}), n.prototype.install = function() {
		return function() {
			return r();
		};
	}, n;
})(a);
//#endregion
//#region node_modules/@liff/sub-window/lib/index.es.js
function G(e) {
	return f$3(l$3("subWindowGetOrigin")(e));
}
var V$1 = {};
function F$1(e, t) {
	e && V$1[e] && V$1[e].forEach(function(e) {
		e(t);
	});
}
function _$1(e, t) {
	V$1[e] || (V$1[e] = []), V$1[e].push(t);
}
function q$1(e, t) {
	if (V$1[e]) {
		var n = V$1[e].indexOf(t);
		n >= 0 && V$1[e].splice(n, 1);
	}
}
var z$1, H, Q, X, Y, Z = function() {
	function e(e) {
		this.storage = e;
	}
	return e.prototype.getItem = function(e) {
		return this.storage.getItem("".concat(this.getKeyPrefix(), ":").concat(e));
	}, e.prototype.setItem = function(e, t) {
		this.storage.setItem("".concat(this.getKeyPrefix(), ":").concat(e), t);
	}, e.prototype.removeItem = function(e) {
		this.storage.removeItem("".concat(this.getKeyPrefix(), ":").concat(e));
	}, e.prototype.clear = function() {
		this.storage.clear();
	}, e.prototype.getKeyPrefix = function() {
		return "".concat(s$1, ":").concat(this.getLiffId());
	}, e.prototype.getLiffId = function() {
		var e = c$1().liffId;
		if (!e) throw m$3(T$1, "liffId is necessary for liff.init()");
		return e;
	}, e;
}(), $ = new Z(new R$1()), ee = "subWindowStatusUpdated";
function te() {
	var e = $.getItem(ee);
	return null !== e && JSON.parse(e);
}
function ne(e) {
	$.setItem(ee, String(e));
}
function re(e) {
	z$1 = e;
}
function ie() {
	return z$1;
}
function oe() {
	return Q;
}
function se() {
	return X;
}
function ue() {
	return __awaiter(this, arguments, void 0, function(e) {
		return void 0 === e && (e = h$1.MAIN), __generator(this, function(t) {
			switch (t.label) {
				case 0: return [4, (Y = new D(e)).setup()];
				case 1: return t.sent(), [2, Y];
			}
		});
	});
}
function ae() {
	return Y;
}
var ce = new R$1(), fe = new Z(_$2() ? ce : window.sessionStorage), le = "mainWindowOrigin";
function de(e) {
	fe.setItem(le, e);
}
function me() {
	return fe.getItem(le);
}
function ve(n) {
	return __awaiter(this, arguments, void 0, function(e, n) {
		var r, i$5, o$1, s, u, a, c, f;
		return void 0 === n && (n = {}), __generator(this, function(t) {
			switch (t.label) {
				case 0:
					if (null == (r = ae()) ? void 0 : r.isReady()) return [3, 5];
					if (i$5 = JSON.stringify(n), o$1 = c$1().liffId, s = me(), !window.opener || !s || !o$1) throw m$3(o);
					u = !1, t.label = 1;
				case 1: return t.trys.push([
					1,
					3,
					,
					4
				]), [4, G(o$1)];
				case 2: return a = t.sent(), u = a.subwindowCommonModule, [3, 4];
				case 3: throw c = t.sent(), i.debug(c), m$3(o);
				case 4: return f = u ? s : location.origin, [2, new Promise(function(t) {
					window.addEventListener("message", function n(r) {
						(function(e) {
							if (e.data && "string" == typeof e.data.type && [L$1.SUBMIT, L$1.CANCEL].includes(e.data.type)) return !0;
							return !1;
						})(r) && (window.removeEventListener("message", n), t({
							status: e,
							result: i$5
						}));
					}), window.opener.postMessage({
						status: e,
						result: i$5
					}, f);
				})];
				case 5: return r.send({
					eventName: e,
					data: n
				}), [4, new Promise(function(e) {
					setTimeout(e, 500);
				})];
				case 6: return t.sent(), [2, {
					status: e,
					result: JSON.stringify(n)
				}];
			}
		});
	});
}
function pe(e) {
	var t, n = se();
	if (e.origin === n) {
		var r = e.data;
		if (r) {
			var i$6, o = r.status, s = r.result;
			try {
				i$6 = JSON.parse(s || "{}");
			} catch (u) {
				i$6 = {};
			}
			switch (o) {
				case d$3:
					window.clearInterval(oe()), be();
					break;
				case L$1.CANCEL:
				case L$1.SUBMIT:
					ne(!0), window.clearInterval(oe()), window.removeEventListener("message", pe), F$1(o, i$6), null === (t = ie()) || void 0 === t || t.postMessage({ type: o }, se());
					break;
				default: i.debug("unexpected message");
			}
		}
	}
}
var he = function(n) {
	return __awaiter(void 0, void 0, void 0, function() {
		var e, r, i, o;
		return __generator(this, function(t) {
			if (te()) return [2];
			switch (e = n.context, r = e.eventName, i = e.data, o = ae(), r) {
				case L$1.INIT:
					ge(!i.hasOpener);
					break;
				case L$1.CANCEL:
				case L$1.SUBMIT:
					ne(!0), F$1(r, i), o?.reply(n, { eventName: r });
					break;
				case L$1.CLOSE: !1 === te() && (ne(!0), F$1(L$1.CLOSE, {})), be();
			}
			return [2];
		});
	});
};
function we() {
	window.clearInterval(H), window.clearInterval(oe()), window.removeEventListener("message", pe);
}
function ge(e) {
	if (void 0 === e && (e = !1), we(), ne(!1), e) {
		var t = ie();
		t && (t.close(), re(null));
	}
}
function be() {
	return __awaiter(this, void 0, void 0, function() {
		var e;
		return __generator(this, function(t) {
			switch (t.label) {
				case 0: return (e = ae()) ? [4, e.teardown()] : [3, 2];
				case 1: t.sent(), t.label = 2;
				case 2: return [2];
			}
		});
	});
}
function ye(i) {
	return __awaiter(this, void 0, void 0, function() {
		var e, o, s, u, a, c, f, l, b, y, S, I;
		return __generator(this, function(t) {
			switch (t.label) {
				case 0: return (e = P(i.url)) ? (ge(!0), [4, be()]) : [2, Promise.reject(m$3(E$2, "params.url must be liff url or mini url"))];
				case 1: return t.sent(), re("ios" !== e$2() || B$1() ? window.open("", "liffsubwindow", "width=480, height=640, menubar=no, toolbar=no, scrollbars=yes") : window.open()), o = i.url, s = i.appData, (u = new URL(o)).searchParams.append(U$1, "true"), [4, ue()];
				case 2: return a = t.sent(), u.searchParams.append(d$1, a.identification.identifier), u.searchParams.append(u$1, a.identification.cryptoKey), u.hostname = function(e) {
					var t = __read(e.split(".")), i = t[0], o = t.slice(1);
					return __spreadArray(["".concat(i, "-ext")], __read(o), !1).join(".");
				}(u.hostname), c = u.toString(), [4, G(e)];
				case 3:
					if (f = t.sent(), l = f.origin, b = f.subwindowCommonModule, !(y = ie())) throw m$3(l$4);
					if (!b) return y.close(), [2];
					(function(e) {
						X = e;
					})(l), a.listen(he), a.setData("appData", s), window.addEventListener("message", pe), t.label = 4;
				case 4: return t.trys.push([
					4,
					6,
					,
					7
				]), [4, null === (I = i.onBeforeTransition) || void 0 === I ? void 0 : I.call(i)];
				case 5: return t.sent(), [3, 7];
				case 6: throw S = t.sent(), y.close(), S;
				case 7: return y.location.href = c, C = function(e, t) {
					var n = ie(), r = { type: d$3 };
					return t && (r.message = JSON.stringify(t)), window.setInterval(function() {
						n?.postMessage(r, e);
					}, 100);
				}(l, s), Q = C, function(e) {
					H = e;
				}(window.setInterval(function() {
					var e = ie();
					e && e.closed && (we(), re(null), !1 === te() && (ne(!0), F$1(L$1.CLOSE, {})));
				}, 100)), [2];
			}
			var C;
		});
	});
}
var Se = null;
function Ie(i) {
	return __awaiter(this, void 0, void 0, function() {
		var o, s, u, a, c, f, l, m, v, h, w, g, y, S, I = this;
		return __generator(this, function(C) {
			switch (C.label) {
				case 0:
					if (o = i.msit, s = i.mstChallenge, u = i.reconnectCount, a = void 0 === u ? 0 : u, c = function() {
						return __awaiter(I, void 0, void 0, function() {
							return __generator(this, function(e) {
								switch (e.label) {
									case 0: return [4, (t = 1e3, new Promise(function(e) {
										return setTimeout(e, t);
									}))];
									case 1: return e.sent(), [4, Ie({
										msit: o,
										mstChallenge: s,
										onSuccess: i.onSuccess,
										onError: i.onError,
										reconnectCount: a + 1
									})];
									case 2: return e.sent(), [2];
								}
								var t;
							});
						});
					}, f = function() {
						for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
						Se = null, i.onSuccess.apply(i, __spreadArray([], __read(e), !1));
					}, l = function() {
						for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
						Se = null, i.onError.apply(i, __spreadArray([], __read(e), !1));
					}, m = Date.now(), null === Se && (Se = m), v = m - Se, a >= 10 || v > 6e5) return l(m$3(e$1, "Failed to connect")), [2];
					C.label = 1;
				case 1: return C.trys.push([
					1,
					3,
					,
					5
				]), [4, p$2(l$3("subWindowSubscribe"), {
					method: "POST",
					body: JSON.stringify({
						msit: o,
						mstChallenge: s
					})
				})];
				case 2: return h = C.sent(), [3, 5];
				case 3: return C.sent(), [4, c()];
				case 4: return C.sent(), [2];
				case 5: return h.status >= 500 ? [4, c()] : [3, 7];
				case 6: return C.sent(), [3, 17];
				case 7: return h.status >= 400 && 500 > h.status ? [4, Pe(h)] : [3, 9];
				case 8: return g = C.sent(), w = g ? m$3(E$2, g.errorDetail) : m$3(e$1, "Some error happened in the server"), l(w), [3, 17];
				case 9: return 200 !== h.status ? [3, 16] : [4, Pe(h)];
				case 10:
					if (!(g = C.sent())) return l(m$3(e$1, "Some error happened in the server")), [2];
					switch (y = g.status, S = g.result, y) {
						case L$1.ERROR: return [3, 11];
						case L$1.CLOSE:
						case L$1.CANCEL:
						case L$1.SUBMIT: return [3, 13];
					}
					return [3, 14];
				case 11: return [4, c()];
				case 12: return C.sent(), [3, 15];
				case 13: return f(y, S), [3, 15];
				case 14: l(m$3(e$1, "Some error happened in the server")), C.label = 15;
				case 15: return [3, 17];
				case 16: l(m$3(e$1, "Some error happened in the server")), C.label = 17;
				case 17: return [2];
			}
		});
	});
}
function Pe(n) {
	return __awaiter(this, void 0, void 0, function() {
		return __generator(this, function(e) {
			switch (e.label) {
				case 0: return e.trys.push([
					0,
					2,
					,
					3
				]), [4, n.json()];
				case 1: return [2, e.sent()];
				case 2: return e.sent(), [2, null];
				case 3: return [2];
			}
		});
	});
}
function Ce(e) {
	var t = {};
	return Object.keys(e).forEach(function(n) {
		"closeButtonColor" === n ? "white" === e[n] ? t[n] = "#ffffff" : t[n] = "#000000" : t[n] = e[n];
	}), t;
}
var Oe = {
	height: "full",
	closeButtonPosition: "right",
	closeButtonColor: "black",
	closeButtonLabel: ""
};
function Le(n) {
	var r = n.appData, i = n.native, o = c$1().liffId, s = M(), u = P(n.url);
	if (!o) return Promise.reject(m$3(t, "liffId is invalid"));
	if (!s) return Promise.reject(m$3(t, "mst_challenge is invalid"));
	if (!u) return Promise.reject(m$3(E$2, "params.url must be liff url or mini url"));
	return function(e) {
		var t = e.mainLiffId, n = e.subLiffId, r = e.mstChallenge, i = e.appData, o = e.view;
		return t && r ? f$3(l$3("subWindowGetMSIT"), {
			method: "POST",
			body: JSON.stringify({
				mainLiffId: t,
				subLiffId: n,
				mstChallenge: r,
				appData: i,
				view: o
			})
		}) : Promise.reject(m$3(E$2, "no proper argument"));
	}({
		mainLiffId: o,
		subLiffId: u,
		mstChallenge: s,
		appData: r,
		view: Ce(Object.assign({}, Oe, i))
	}).then(function(e) {
		var t = e.msit;
		return Ie({
			msit: t,
			mstChallenge: s,
			onSuccess: function(e, t) {
				F$1(e, t);
			},
			onError: function(e) {
				F$1(L$1.ERROR, e);
			}
		}), t;
	}).then(function(r) {
		return function(n, r) {
			return __awaiter(this, void 0, void 0, function() {
				var e, i, o;
				return __generator(this, function(t) {
					switch (t.label) {
						case 0: return e = n.url, (i = new URLSearchParams()).set("msit", r), [4, null === (o = n.onBeforeTransition) || void 0 === o ? void 0 : o.call(n)];
						case 1: return t.sent(), location.href = "".concat(p$3, "?url=").concat(encodeURIComponent(e), "&").concat(i.toString()), [2];
					}
				});
			});
		}(n, r);
	});
}
function Ee(e) {
	return k.subwindowOpen(), u$3() ? Le(e) : ye(e);
}
function Ne(e) {
	if (!e.mst || !e.status) return Promise.reject(m$3(E$2, "no proper argument"));
	var t = JSON.stringify(e);
	return f$3(l$3("subWindowPost"), {
		method: "POST",
		body: t
	});
}
function Te() {
	if (!d$4()) throw m$3(t, "this api can be only called in child window");
}
function je(n) {
	return void 0 === n && (n = {}), Te(), u$3() ? function() {
		return __awaiter(this, arguments, void 0, function(e) {
			var n, r;
			return void 0 === e && (e = {}), __generator(this, function(t$4) {
				switch (t$4.label) {
					case 0: return (n = D$1()) ? [4, Ne({
						mst: n,
						status: L$1.CANCEL,
						result: e
					})] : [2, Promise.reject(m$3(t, "mst is invalid"))];
					case 1: return r = t$4.sent(), ne(!0), [2, r];
				}
			});
		});
	}(n) : function(e) {
		return void 0 === e && (e = {}), ve(L$1.CANCEL, e);
	}(n);
}
function Me(n) {
	return void 0 === n && (n = {}), Te(), u$3() ? function() {
		return __awaiter(this, arguments, void 0, function(e) {
			var n, r;
			return void 0 === e && (e = {}), __generator(this, function(t$5) {
				switch (t$5.label) {
					case 0: return (n = D$1()) ? [4, Ne({
						mst: n,
						status: L$1.SUBMIT,
						result: e
					})] : [2, Promise.reject(m$3(t, "mst is invalid"))];
					case 1: return r = t$5.sent(), ne(!0), [2, r];
				}
			});
		});
	}(n) : function(e) {
		return void 0 === e && (e = {}), ve(L$1.SUBMIT, e);
	}(n);
}
function Be() {
	return Te(), u$3() ? function() {
		return __awaiter(this, void 0, void 0, function() {
			var e;
			return __generator(this, function(t$6) {
				switch (t$6.label) {
					case 0: return !1 !== te() ? [3, 2] : (e = D$1()) ? [4, Ne({
						mst: e,
						status: L$1.CLOSE,
						result: {}
					})] : [2, Promise.reject(m$3(t, "mst is invalid"))];
					case 1: t$6.sent(), t$6.label = 2;
					case 2: return r(), [2];
				}
			});
		});
	}() : function() {
		return __awaiter(this, void 0, void 0, function() {
			var e;
			return __generator(this, function(t) {
				return (null == (e = ae()) ? void 0 : e.isReady()) ? (e.send({ eventName: L$1.CLOSE }), [2, new Promise(function(e) {
					setTimeout(function() {
						r(), e();
					}, 100);
				})]) : (r(), [2, Promise.resolve()]);
			});
		});
	}();
}
function De() {
	return Te(), function() {
		var e, t = b$2();
		try {
			e = t ? JSON.parse(t) : {};
		} catch (n) {
			e = {};
		}
		return Promise.resolve(e);
	}();
}
function Ae(e) {
	var t = e.msit, n = e.mstVerifier;
	return t && n ? f$3(l$3("subWindowGetMSTByMSIT"), {
		method: "POST",
		body: JSON.stringify({
			msit: t,
			mstVerifier: n
		})
	}) : Promise.reject(m$3(E$2, "no proper argument"));
}
function Je(e) {
	var t = e.mst;
	return t ? f$3(l$3("subWindowGetAppData"), {
		method: "POST",
		body: JSON.stringify({ mst: t })
	}) : Promise.reject(m$3(E$2, "no proper argument"));
}
var Re = {
	on: _$1,
	off: q$1,
	open: Ee,
	cancel: je,
	submit: Me,
	close: Be,
	getAppData: De
};
(function(e) {
	function t() {
		return null !== e && e.apply(this, arguments) || this;
	}
	return __extends(t, e), Object.defineProperty(t.prototype, "name", {
		get: function() {
			return "subWindow";
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.install = function() {
		var e = this;
		return {
			on: _$1.bind(this),
			off: q$1.bind(this),
			open: function(t) {
				return Ee.call(e, __assign(__assign({}, t), { onBeforeTransition: void 0 }));
			},
			cancel: je.bind(this),
			submit: Me.bind(this),
			close: Be.bind(this),
			getAppData: De.bind(this)
		};
	}, t;
})(a);
//#endregion
//#region node_modules/@liff/verify-id-token/lib/index.es.js
function u() {
	return __awaiter(this, void 0, void 0, function() {
		return __generator(this, function(e) {
			switch (e.label) {
				case 0: return [4, f$3(l$3("certs"))];
				case 1: return [2, e.sent()];
			}
		});
	});
}
function l(n, r, i) {
	return __awaiter(this, void 0, void 0, function() {
		var e;
		return __generator(this, function(t) {
			switch (t.label) {
				case 0: return [4, crypto.subtle.importKey("jwk", n, {
					name: "ECDSA",
					namedCurve: "P-256"
				}, !1, ["verify"])];
				case 1: return e = t.sent(), [4, crypto.subtle.verify({
					name: "ECDSA",
					hash: { name: "SHA-256" }
				}, e, i, r)];
				case 2: return [2, t.sent()];
			}
		});
	});
}
var f$1 = "Invalid \"alg\" value in ID_TOKEN", d = "Failed to use Crypto API to verify ID_TOKEN", v$1 = "Invalid \"kid\" value in ID_TOKEN", h = "Invalid \"iss\" value in ID_TOKEN", p = "Invalid \"aud\" value in ID_TOKEN", I$1 = "Invalid \"exp\" value in ID_TOKEN", m = "Invalid signature in ID_TOKEN", w = "Invalid payload in ID_TOKEN";
function y(s, c) {
	return __awaiter(this, void 0, void 0, function() {
		var e, y, D, E, N, O, K, T, _, b, g, S, k, A, C, x;
		return __generator(this, function(t) {
			switch (t.label) {
				case 0:
					if (e = s.split("."), y = __read(e, 3), D = y[0], E = y[1], N = y[2], O = JSON.parse(f$4.decode(D)), K = function(e) {
						var t = e.split(".");
						if (3 !== t.length || t.some(function(e) {
							return 0 === e.length;
						})) return null;
						try {
							return JSON.parse(f$4.decodeUnicode(t[1]));
						} catch (y) {
							return null;
						}
					}(s), !K) throw m$3(n$1, w);
					return T = v$3(f$4.decode(N)), _ = v$3("".concat(D, ".").concat(E)), [4, u()];
				case 1:
					if (b = t.sent(), !(g = b.keys.find(function(e) {
						return e.kid === O.kid;
					}))) return [3, 6];
					if (delete g.alg, "ES256" !== O.alg) throw m$3(n$1, f$1);
					S = void 0, t.label = 2;
				case 2: return t.trys.push([
					2,
					4,
					,
					5
				]), [4, l(g, _, T)];
				case 3: return S = t.sent(), [3, 5];
				case 4: throw k = t.sent(), m$3(n$1, "".concat(d, ": ").concat(k));
				case 5:
					if (S) {
						if (A = K.iss !== "https://access.".concat("line.me"), C = K.aud !== c, x = 1e3 * K.exp < Date.now(), A) throw m$3(n$1, h);
						if (C) throw m$3(n$1, p);
						if (x) throw m$3(n$1, I$1);
						return [2, K];
					}
					throw m$3(n$1, m);
				case 6: throw m$3(n$1, v$1);
				case 7: return [2];
			}
		});
	});
}
//#endregion
//#region node_modules/@liff/permission/lib/index.es.js
function S(r) {
	return __awaiter(this, void 0, void 0, function() {
		var e, i, o, u, l, h, v;
		return __generator(this, function(t$1) {
			switch (t$1.label) {
				case 0: return function(e) {
					if (!k$1.includes(e)) throw m$3("INVALID_ARGUMENT", "Unexpected permission name.");
					var t = E$3();
					return !!(null == t ? void 0 : t.scope.includes(e));
				}(r) ? (e = x$1()) ? [4, d$2(e)] : [3, 2] : [2, { state: "unavailable" }];
				case 1:
					i = t$1.sent(), o = unescape(i.scope).split(" ");
					try {
						for (u = __values(o), l = u.next(); !l.done; l = u.next()) if (l.value.includes(r)) return [2, { state: "granted" }];
					} catch (m) {
						h = { error: m };
					} finally {
						try {
							l && !l.done && (v = u.return) && v.call(u);
						} finally {
							if (h) throw h.error;
						}
					}
					return [2, { state: "prompt" }];
				case 2: throw m$3(t, "Need access_token for api call, Please login first");
			}
		});
	});
}
function _() {
	var e, t, n = E$3();
	return !!n && "square_chat" !== n.type && (T$2("skipChannelVerificationScreen") || !u$3() && (null === (t = null === (e = n.availability) || void 0 === e ? void 0 : e.skipChannelVerificationScreen) || void 0 === t ? void 0 : t.permission));
}
function q() {
	var e = c$1().liffId;
	if (e) return f$3("".concat(l$3("unauthorizedPermissions"), "?liffId=").concat(e), { headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
		Authorization: "Bearer ".concat(x$1())
	} });
	throw m$3(t, "liffId is required");
}
var x, E = Re.on, R = Re.off, V = Re.open, z = function() {
	function n(n, r) {
		var i = this;
		this.onSubmit = function(n) {
			return __awaiter(i, [n], void 0, function(e) {
				var n = e.newAccessToken, r = e.newIdToken, i = e.ICA_ERROR;
				return __generator(this, function(e) {
					return n ? this.resolve({
						newAccessToken: n,
						newIdToken: r
					}) : i && this.reject(m$3("UNKNOWN", i)), this.teardown(), [2];
				});
			});
		}, this.onClose = function() {
			return __awaiter(i, void 0, void 0, function() {
				return __generator(this, function(e) {
					return this.reject(m$3(t, "user didn't allow the agreement")), this.teardown(), [2];
				});
			});
		}, this.onCancel = function() {
			return __awaiter(i, void 0, void 0, function() {
				return __generator(this, function(e) {
					return this.reject(m$3(t, "user didn't allow the agreement")), this.teardown(), [2];
				});
			});
		}, this.onError = function(n) {
			return __awaiter(i, void 0, void 0, function() {
				return __generator(this, function(e) {
					return this.reject(n), this.teardown(), [2];
				});
			});
		}, this.resolve = n, this.reject = r, this.setup();
	}
	return n.prototype.setup = function() {
		E("submit", this.onSubmit), E("close", this.onClose), E("cancel", this.onCancel), E("error", this.onError);
	}, n.prototype.teardown = function() {
		R("submit", this.onSubmit), R("close", this.onClose), R("cancel", this.onCancel), R("error", this.onError), x = void 0;
	}, n.prototype.open = function(e) {
		var t$2 = c$1().liffId;
		t$2 ? V({
			url: "".concat("https://liff.line.me/1656032314-Xgrw5Pmk"),
			appData: {
				liffId: t$2,
				channelId: y$2(t$2),
				accessToken: x$1()
			},
			onBeforeTransition: e
		}).catch(this.reject) : this.reject(m$3(t, "liffId is required"));
	}, n;
}();
function B() {
	return __awaiter(this, void 0, void 0, function() {
		var n, r, i, o, s, c, a = this;
		return __generator(this, function(l) {
			switch (l.label) {
				case 0:
					if (!_()) throw m$3(i$1, "SkipChannelVerificationScreen is unavailable.");
					return x && x.teardown(), n = function() {
						return __awaiter(a, void 0, void 0, function() {
							var e;
							return __generator(this, function(t) {
								switch (t.label) {
									case 0: return [4, q()];
									case 1:
										if (e = t.sent(), (u$3() ? e : e.filter(function(e) {
											return "chat_message.write" !== e;
										})).length <= 0) throw m$3(i$1, "All permissions have already been approved.");
										return [2];
								}
							});
						});
					}, [4, new Promise(function(e, t) {
						(x = new z(e, t)).open(n);
					})];
				case 1: return r = l.sent(), i = r.newAccessToken, o = r.newIdToken, B$2(i), o ? (s = j()) ? [4, y(o, s)] : [3, 3] : [3, 3];
				case 2: (c = l.sent()) && (G$1(o), $$1(c)), l.label = 3;
				case 3: return [2];
			}
		});
	});
}
function F() {
	return __awaiter(this, void 0, void 0, function() {
		var e, n;
		return __generator(this, function(t$3) {
			switch (t$3.label) {
				case 0:
					if (!(e = x$1())) throw m$3(t, "Need access_token for api call, Please login first");
					return [4, d$2(e)];
				case 1: return n = t$3.sent(), [2, decodeURIComponent(n.scope).split(" ").filter(function(e) {
					return "" !== e;
				})];
			}
		});
	});
}
function N(n, o) {
	var s = this;
	return function() {
		for (var c = [], a = 0; a < arguments.length; a++) c[a] = arguments[a];
		return __awaiter(s, void 0, void 0, function() {
			var e, s, a;
			return __generator(this, function(t) {
				switch (t.label) {
					case 0: return e = (c.length > 0 ? c[c.length - 1] : {}).ignorePermissionCheck, s = void 0 !== e && e, [4, S(o)];
					case 1:
						if ("unavailable" !== (a = t.sent().state)) return [3, 2];
						throw m$3(i$1, "The permission is not in LIFF app scope.");
					case 2: return "prompt" !== a || !_() || s || !u$3() && "chat_message.write" === o ? [3, 4] : [4, B()];
					case 3: return t.sent(), [3, 5];
					case 4: s && c.pop(), t.label = 5;
					case 5: return [4, n.apply(void 0, __spreadArray([], __read(c), !1))];
					case 6: return [2, t.sent()];
				}
			});
		});
	};
}
var U = new (function(e) {
	function t() {
		return null !== e && e.apply(this, arguments) || this;
	}
	return __extends(t, e), Object.defineProperty(t.prototype, "name", {
		get: function() {
			return "permission";
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.install = function() {
		return {
			query: S,
			requestAll: B,
			getGrantedAll: F
		};
	}, t;
}(a))();
//#endregion
//#region node_modules/@liff/get-profile/lib/index.es.js
function n() {
	return f$3(l$3("profile"));
}
(function(t) {
	function e() {
		return null !== t && t.apply(this, arguments) || this;
	}
	return __extends(e, t), Object.defineProperty(e.prototype, "name", {
		get: function() {
			return "getProfile";
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.install = function() {
		return N(n, "profile");
	}, e;
})(a);
//#endregion
//#region node_modules/@liff/analytics/lib/index.es.js
function I() {
	return __awaiter(this, void 0, void 0, function() {
		var t, i$2;
		return __generator(this, function(e) {
			switch (e.label) {
				case 0:
					if (!e$3()) return [3, 6];
					e.label = 1;
				case 1: return e.trys.push([
					1,
					5,
					,
					6
				]), (t = Z$1()) && t.sub ? [2, t.sub] : [3, 2];
				case 2: return [4, n()];
				case 3:
					if ((i$2 = e.sent()) && i$2.userId) return [2, i$2.userId];
					e.label = 4;
				case 4: return [3, 6];
				case 5: return e.sent(), i.debug("can't retrieve Mid/Uid because of something wrong"), [3, 6];
				case 6: return [2];
			}
		});
	});
}
function b() {
	return __awaiter(this, void 0, void 0, function() {
		var t;
		return __generator(this, function(e) {
			switch (e.label) {
				case 0: return [4, I()];
				case 1: return (t = e.sent()) && "u" === t.substring(0, 1) ? [2, t] : [2];
			}
		});
	});
}
var L = function(c) {
	function p() {
		var t = c.apply(this, __spreadArray([], __read(arguments), !1)) || this;
		return t.utsExtra = {
			isLiffSuccessful: !1,
			isLoggedIn: !1,
			id: "",
			version: ""
		}, t.injected = !1, t;
	}
	return __extends(p, c), Object.defineProperty(p, "CUSTOMPLACEID_INIT", {
		get: function() {
			return "liff.init";
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(p, "CUSTOMTYPE", {
		get: function() {
			return "liffSdk";
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(p, "LiffUtsLoginStatus", {
		get: function() {
			return {
				isLoggedIn: 1,
				isLiffSuccessful: 2
			};
		},
		enumerable: !1,
		configurable: !0
	}), Object.defineProperty(p.prototype, "name", {
		get: function() {
			return "analytics";
		},
		enumerable: !1,
		configurable: !0
	}), p.prototype.install = function(t) {
		var e = t.liff, i = t.internalHooks;
		this.liffCore = e, i.init.beforeFinished(this.beforeInitFinished.bind(this)), i.init.beforeSuccess(this.beforeInitSuccess.bind(this)), i.init.error(this.initError.bind(this));
	}, p.prototype.createDeprecatedUtsProxy = function(t) {
		return new Proxy(t, { get: function(t, e) {
			var i$3 = t[e];
			return "function" == typeof i$3 ? function() {
				for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
				return i.warn("[LIFF Analytics] ".concat("LIFF Analytics is deprecated and will be removed in a future version. Please migrate to alternative analytics solutions.", " Called method: ").concat(String(e))), i$3.apply(t, n);
			} : i$3;
		} });
	}, p.prototype.changeRatioToUTSFormat = function(t) {
		if (t && Number.isFinite(t)) return Math.round(100 * t);
	}, p.prototype.setExtra = function() {
		var t, e = this.utsExtra, i = e.isLiffSuccessful, n = e.isLoggedIn, r = e.id, s = e.version, o = (n ? p.LiffUtsLoginStatus.isLoggedIn : 0) | (i ? p.LiffUtsLoginStatus.isLiffSuccessful : 0);
		null === (t = this.uts) || void 0 === t || t.setExtra("liff", {
			id: r,
			loginStatus: o,
			version: s
		});
	}, p.prototype.assignUtsExtra = function(t) {
		Object.assign(this.utsExtra, t);
	}, p.prototype.setVersion = function(t) {
		this.assignUtsExtra({ version: t }), i.debug("[LIFFUTS][SDK version] ".concat(t)), this.setExtra();
	}, p.prototype.setLiffId = function(t) {
		this.assignUtsExtra({ id: t }), i.debug("[LIFFUTS][LIFFID] ".concat(t)), this.setExtra();
	}, p.prototype.setIsLoggedIn = function(t) {
		this.assignUtsExtra({ isLoggedIn: t }), i.debug("[LIFFUTS][isLoggedIn] ".concat(t)), this.setExtra();
	}, p.prototype.sendLiffInit = function() {
		var t;
		i.debug("[LIFFUTS][sendCustom] liff.init"), null === (t = this.uts) || void 0 === t || t.sendCustom({
			type: p.CUSTOMTYPE,
			params: { placeId: p.CUSTOMPLACEID_INIT }
		});
	}, p.prototype.setIsLiffSuccessful = function(t) {
		this.assignUtsExtra({ isLiffSuccessful: t }), i.debug("[LIFFUTS][isLiffInitSuccessful] ".concat(t)), this.setExtra();
	}, p.prototype.prepareReferrer = function(t) {
		var e = {};
		Object.keys(t).forEach(function(i) {
			if (S$1.includes(i)) {
				var n = t[i];
				"string" == typeof n && n && (e[i.replace(/^liff\.ref\./, "")] = n);
			}
		}), Object.keys(e).length > 0 && (this.referrer = e);
	}, p.prototype.beforeInitFinished = function() {
		return __awaiter(this, void 0, void 0, function() {
			var t, i$4, n, r, o, c, p, m, I, L, v, y;
			return __generator(this, function(e) {
				switch (e.label) {
					case 0:
						if (t = I$2.parse(window.location.search), this.prepareReferrer(t), i$4 = E$3(), !(n = null == i$4 ? void 0 : i$4.utsTracking)) return [2];
						if (r = c$1(), o = r.liffId, c = r.analytics, "auto" !== n.mode || !c) return [3, 6];
						i.warn("[LIFF Analytics] LIFF Analytics is deprecated and will be removed in a future version. Please migrate to alternative analytics solutions."), i.debug("[LIFFUTS] ".concat((/* @__PURE__ */ new Date()).toUTCString())), e.label = 1;
					case 1: return e.trys.push([
						1,
						3,
						,
						4
					]), p = this, [4, new Promise(function(t, e) {
						var i = window.uts, n = document.createElement("script");
						n.type = "text/javascript", n.src = "https://static.line-scdn.net/uts/edge/4.1.0/uts.js", n.onload = function() {
							var e = window.uts;
							t(e), window.uts = i;
						}, n.onerror = function(t) {
							e(t);
						}, document.getElementsByTagName("head")[0].appendChild(n);
					})];
					case 2: return p.uts = e.sent(), [3, 4];
					case 3: return m = e.sent(), i.debug("[LIFFUTS] cannot load UTS, reason: ".concat(m)), [2];
					case 4: return I = __assign(__assign({}, c.context), {
						utsId: c.context.utsId,
						appName: c.context.appName,
						appEnv: c.context.appEnv || "release"
					}), L = __assign(__assign({ endpoint: "https://uts-front.line-apps.com" }, c.options), {
						sampleRate: this.changeRatioToUTSFormat(n.sendRatio),
						version: "current"
					}), this.uts.init(I, L), [4, b()];
					case 5: (v = e.sent()) && (i.debug("[LIFFUTS][mid] ".concat(v)), this.uts.setMid(v)), null != i$4 && i$4.tid && (i.debug("[LIFFUTS][tid] ".concat(i$4.tid)), this.uts.setTid(i$4.tid)), this.referrer && (i.debug("liff.ref.referrer", this.referrer), this.uts.setSessionParams(this.referrer)), o && this.setLiffId(o), this.setIsLoggedIn(e$3()), this.setVersion(r$1()), y = C(location.href), i.debug("[LIFFUTS][url] ".concat(y)), this.uts.setUrl(y), this.liffCore.analytics = this.createDeprecatedUtsProxy(this.uts), this.injected = !0, e.label = 6;
					case 6: return [2];
				}
			});
		});
	}, p.prototype.beforeInitSuccess = function() {
		return this.injected && (this.setIsLiffSuccessful(!0), this.sendLiffInit()), Promise.resolve();
	}, p.prototype.initError = function() {
		return this.injected && (this.setIsLiffSuccessful(!1), this.sendLiffInit()), Promise.resolve();
	}, p;
}(a), v = function(t) {
	i.warn("[LIFF Analytics] LIFF Analytics is deprecated and will be removed in a future version. Please migrate to alternative analytics solutions. Called function: sendShareTargetPicker"), i.debug("[LIFFUTS][sendCustom] liff.shareTargetPicker"), t.sendCustom({
		type: "liffSdk",
		params: { placeId: "liff.shareTargetPicker" }
	});
};
//#endregion
export { r$1 as S, l$2 as _, U as a, l$3 as b, Je as c, de as d, me as f, h$1 as g, d$1 as h, N as i, Re as l, r as m, v as n, y as o, ue as p, n as r, Ae as s, L as t, ae as u, d$2 as v, p$2 as x, f$3 as y };

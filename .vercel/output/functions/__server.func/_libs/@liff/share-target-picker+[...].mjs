import { $ as F, Ct as T, Ht as i$1, Mt as l, Pt as o, Rt as a$1, X as u$1, Z as B, c as k, dt as m$1, et as I, f as r, ht as w, l as e, pt as s$1, yt as E$1, z as c$1 } from "./activity+[...].mjs";
import { b as l$1, n as v, y as f$1 } from "./analytics+[...].mjs";
import { __awaiter, __extends, __generator, __read, __spreadArray } from "tslib";
//#region node_modules/@liff/window-postmessage/lib/index.es.js
var n = {};
function i() {
	return n;
}
function s(e, r) {
	var o = i(), n = __read(r.split("."), 1)[0], s = o[r];
	s && e.removeEventListener(n, s), o[r] = null;
}
var f = !1, a = !1;
function c(e, r, o, i) {
	f || (a = function() {
		var t = !1;
		try {
			var e = Object.defineProperty({}, "passive", { get: function() {
				return t = !0, !1;
			} });
			window.addEventListener("test", e, e), window.removeEventListener("test", e, e);
		} catch (r) {
			t = !1;
		}
		return t;
	}(), f = !0);
	var c = __read(r.split("."), 1)[0];
	return new Promise(function(t) {
		var f = function(n) {
			t(n), o && o(n), i && i.once && s(e, r);
		};
		(function(t, e) {
			n[t] = e;
		})(r, f), e.addEventListener(c, f, !!a && i);
	});
}
function u(t, o, n, i) {
	if (void 0 === n && (n = {}), "object" != typeof t || !t.postMessage) throw m$1(E$1, "target must be window object");
	if ("string" != typeof o) throw m$1(E$1, "keyname must be string");
	if ("object" != typeof n) throw m$1(E$1, "incorrect body format. It should be Object or Array comprised of Object");
	if (!i) throw m$1(E$1, "serverEndPointUrl isn't passed. please fill up with proper url");
	if ("*" === i) throw new Error("serverEndPointUrl doesn't allow to set '*'");
	var s = {
		name: o,
		body: n
	};
	t.postMessage(s, i);
}
function m(t, e, r, n) {
	c(t, "message.".concat(e), function(t, e, r) {
		return function(n) {
			i$1.debug("messageReceive", n), n.origin === r && n.data.name === t && e(n);
		};
	}(e, r, n));
}
//#endregion
//#region node_modules/@liff/share-target-picker/lib/index.es.js
var R = function() {
	function i() {
		this.payloadToShareTargetPicker = null, this.popupWindow = null, this.doesWaitForSubwindowResult = !1;
	}
	return i.getInstance = function() {
		return i.instance ? i.instance.reset() : i.instance = new i(), i.instance;
	}, i.prototype.init = function(i) {
		return __awaiter(this, void 0, void 0, function() {
			var t, r;
			return __generator(this, function(e) {
				switch (e.label) {
					case 0: return e.trys.push([
						0,
						5,
						,
						6
					]), this.liffId = i.referrer.liffId, this.doesWaitForSubwindowResult = !(!i.options || !i.options.waitForSubwindowResult), this.allowPostMessageOrigin = this.initAllowPostMessageOrigin(), this.payloadToShareTargetPicker = this.buildPayloadToShareTargetPicker(i), window.AbortController && (this.abortController = new window.AbortController()), this.prepareAnotherWindow(), [4, this.initOtt()];
					case 1: return e.sent(), this.initListener(), this.openAnotherWindow(), this.doesWaitForSubwindowResult ? [4, this.pollingShareResult()] : [3, 3];
					case 2: return t = e.sent(), this.finalize(), [2, t];
					case 3:
					case 6: return [2];
					case 4: return [3, 6];
					case 5:
						if (r = e.sent(), this.finalize(), "AbortError" !== r.name) throw r;
						return [3, 6];
				}
			});
		});
	}, i.prototype.resetAllVariables = function() {
		this.liffId = "", this.allowPostMessageOrigin = "", this.payloadToShareTargetPicker = null, this.ott = "", this.popupWindow = null, this.timeoutIDForHealthCheck = null, this.abortController = null, this.internalError = null, this.doesWaitForSubwindowResult = !1;
	}, i.prototype.reset = function() {
		this.finalize(), this.resetAllVariables();
	}, i.prototype.finalize = function() {
		var t, e;
		this.abortController && this.abortController.abort(), u$1() || (t = this.timeoutIDForHealthCheck, e = this.popupWindow, s(window, "message.receivedHealthcheck"), t && clearTimeout(t), e && !e.closed && e.close());
	}, i.prototype.buildPayloadToShareTargetPicker = function(t) {
		return {
			messages: t.messages,
			isMultiple: t.isMultiple,
			referrer: t.referrer
		};
	}, i.prototype.initAllowPostMessageOrigin = function(t) {
		return void 0 === t && (t = l$1("shareTargetPicker")), F(t);
	}, i.prototype.initOtt = function() {
		return __awaiter(this, void 0, void 0, function() {
			var t, i, r;
			return __generator(this, function(e) {
				switch (e.label) {
					case 0: return this.abortController && (t = this.abortController.signal), i = "".concat(l$1("shareTargetPickerOtt"), "/").concat(this.liffId, "/ott"), r = this, [4, f$1(i, {
						method: "GET",
						signal: t
					}).then(function(t) {
						return t.ott;
					})];
					case 1: return r.ott = e.sent(), [2];
				}
			});
		});
	}, i.prototype.prepareAnotherWindow = function() {
		u$1() || ("ios" !== e() || B() ? this.popupWindow = window.open("", "liffpopup", "width=480, height=640, menubar=no, toolbar=no, scrollbars=yes") : this.popupWindow = window.open());
	}, i.prototype.openAnotherWindow = function() {
		if (u$1() && this.payloadToShareTargetPicker) t = this.liffId, e = this.ott, i = this.payloadToShareTargetPicker, r = {
			liffId: t,
			ott: e,
			data: JSON.stringify(i),
			closeModals: !1
		}, location.href = "".concat("line://picker", "?").concat(I.stringify(r));
		else {
			if (this.timeoutIDForHealthCheck = window.setTimeout(this.healthCheck.bind(this), 1e3), !this.popupWindow) throw m$1(l);
			(function(t, e, i) {
				var r = {
					liffId: e,
					ott: i
				};
				t.location.href = "".concat(l$1("shareTargetPicker"), "?").concat(I.stringify(r));
			})(this.popupWindow, this.liffId, this.ott);
		}
		var t, e, i, r;
	}, i.prototype.initListener = function() {
		var t, e;
		u$1() || (t = this.onReceivedHealthcheck.bind(this), e = this.allowPostMessageOrigin, m(window, "receivedHealthcheck", t, e));
	}, i.prototype.healthCheck = function() {
		return __awaiter(this, void 0, void 0, function() {
			var t;
			return __generator(this, function(e) {
				switch (e.label) {
					case 0:
						if (this.popupWindow && !this.popupWindow.closed) return [3, 7];
						if (!this.doesWaitForSubwindowResult) return [3, 5];
						e.label = 1;
					case 1: return e.trys.push([
						1,
						3,
						,
						4
					]), [4, this.onCanceled()];
					case 2: return e.sent(), [3, 4];
					case 3: return t = e.sent(), this.internalError = t, [3, 4];
					case 4: return [3, 6];
					case 5: this.finalize(), e.label = 6;
					case 6: return [3, 8];
					case 7: i = this.popupWindow, r = this.allowPostMessageOrigin, u(i, "healthcheck", void 0, r), this.timeoutIDForHealthCheck = window.setTimeout(this.healthCheck.bind(this), 1e3), e.label = 8;
					case 8: return [2];
				}
				var i, r;
			});
		});
	}, i.prototype.onReceivedHealthcheck = function() {
		if (!this.popupWindow || !this.payloadToShareTargetPicker) throw m$1(l);
		var t = this.popupWindow, e = this.payloadToShareTargetPicker, i = this.allowPostMessageOrigin;
		u(t, "ready", e, i);
	}, i.prototype.onCanceled = function() {
		return __awaiter(this, void 0, void 0, function() {
			var t, i;
			return __generator(this, function(e) {
				switch (e.label) {
					case 0:
						if (u$1() || !this.ott) throw new Error("need to call with ott in client");
						return this.abortController && (t = this.abortController.signal), i = {
							liffId: this.liffId,
							ott: this.ott
						}, [4, f$1("".concat(l$1("shareTargetPickerResult"), "?").concat(I.stringify(i)), {
							method: "POST",
							signal: t,
							headers: {
								Accept: "application/json",
								"Content-Type": "application/x-www-form-urlencoded"
							},
							body: "result=CANCEL"
						})];
					case 1: return [2, "ok" === e.sent().status];
				}
			});
		});
	}, i.prototype.getShareResult = function() {
		return __awaiter(this, void 0, void 0, function() {
			var t, i;
			return __generator(this, function(e) {
				if (!this.ott) throw new Error("need to call with ott in client");
				return this.abortController && (t = this.abortController.signal), i = {
					liffId: this.liffId,
					ott: this.ott
				}, i$1.debug("fetch: getShareResult"), [2, f$1("".concat(l$1("shareTargetPickerResult"), "?").concat(I.stringify(i)), {
					method: "GET",
					headers: { Accept: "application/json" },
					signal: t
				})];
			});
		});
	}, i.isPollingTimeOut = function(t, e) {
		return (e - t) / 6e4 >= 10;
	}, i.prototype.pollingShareResult = function() {
		return __awaiter(this, void 0, void 0, function() {
			var t, r;
			return __generator(this, function(e) {
				switch (e.label) {
					case 0: t = Date.now(), e.label = 1;
					case 1:
						if (i.isPollingTimeOut(t, Date.now())) return [3, 4];
						if (this.internalError) throw this.internalError;
						return [4, this.getShareResult()];
					case 2:
						if ((r = e.sent()) && r.result) switch (r.result) {
							case "SUCCESS": return [2, { status: "success" }];
							case "CANCEL": return [2];
							default: throw new Error(r.resultDescription);
						}
						return [4, new Promise(function(t) {
							setTimeout(t, 500);
						})];
					case 3: return e.sent(), [3, 1];
					case 4: throw new Error("Timeout: not finished within ".concat(10, "min"));
				}
			});
		});
	}, i;
}(), E = new (function(n) {
	function c() {
		var i = n.apply(this, __spreadArray([], __read(arguments), !1)) || this;
		return i.shareTargetPicker = function(n) {
			for (var c = [], u = 1; u < arguments.length; u++) c[u - 1] = arguments[u];
			return __awaiter(i, __spreadArray([n], __read(c), !1), void 0, function(t, i) {
				var r$1, o$1, n, c, u, f, v$1;
				return void 0 === i && (i = {}), __generator(this, function(e) {
					switch (e.label) {
						case 0:
							if (k.shareTargetPicker(), !t || !Array.isArray(t) || 0 === t.length) throw m$1(E$1, "no proper argument");
							if (t.length > 5) throw m$1(E$1, "exceed the limit of num of messages");
							if (!(r$1 = c$1().liffId)) throw m$1(T);
							window.liff && (o$1 = window.liff).analytics && v(o$1.analytics), n = void 0 === i.isMultiple || i.isMultiple, e.label = 1;
						case 1: return e.trys.push([
							1,
							3,
							,
							4
						]), c = R.getInstance(), u = r(), f = { waitForSubwindowResult: !0 }, u$1() && u && s$1(u, "10.11.0") < 0 && (f.waitForSubwindowResult = !1), [4, c.init({
							messages: t,
							isMultiple: n,
							referrer: {
								liffId: r$1,
								url: location.origin
							},
							options: f
						})];
						case 2: return [2, e.sent()];
						case 3: throw (v$1 = e.sent()) instanceof w ? v$1 : m$1(o, v$1.message);
						case 4: return [2];
					}
				});
			});
		}, i;
	}
	return __extends(c, n), Object.defineProperty(c.prototype, "name", {
		get: function() {
			return "shareTargetPicker";
		},
		enumerable: !1,
		configurable: !0
	}), c.prototype.install = function() {
		return this.shareTargetPicker;
	}, c;
}(a$1))();
//#endregion
export { E as t };

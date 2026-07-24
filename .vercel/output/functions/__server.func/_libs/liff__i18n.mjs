import { Rt as a$1, bt as I, dt as m } from "./@liff/activity+[...].mjs";
import { y as f$1 } from "./@liff/analytics+[...].mjs";
import { __awaiter, __extends, __generator } from "tslib";
//#region node_modules/@liff/i18n/lib/index.es.js
var a, u = "undefined" == typeof navigator ? "en" : null !== (a = navigator.language) && void 0 !== a ? a : "en", c = null;
function l(n) {
	return __awaiter(this, void 0, void 0, function() {
		return __generator(this, function(t) {
			switch (t.label) {
				case 0: return u = n, [4, f()];
				case 1: return t.sent(), [2];
			}
		});
	});
}
function f() {
	return __awaiter(this, void 0, void 0, function() {
		var n, t;
		return __generator(this, function(e) {
			switch (e.label) {
				case 0: return [4, f$1("".concat("https://liffsdk.line-scdn.net/xlt/manifest.json"), {
					method: "GET",
					headers: { Accept: "application/json" }
				})];
				case 1: return n = e.sent(), t = "".concat(u), !n.languages[t] && u.includes("-") && (t = u.split("-")[0]), n.languages[t] || (t = "en"), [4, f$1("".concat("https://liffsdk.line-scdn.net/xlt", "/").concat(n.languages[t]), {
					method: "GET",
					headers: { Accept: "application/json" }
				})];
				case 2: return c = e.sent(), [2];
			}
		});
	});
}
function p(n) {
	if (null === c) throw m(I, "please call xlt after liff.init");
	return c[n];
}
var h = new (function(i) {
	function r() {
		return null !== i && i.apply(this, arguments) || this;
	}
	return __extends(r, i), Object.defineProperty(r.prototype, "name", {
		get: function() {
			return "i18n";
		},
		enumerable: !1,
		configurable: !0
	}), r.prototype.install = function(n) {
		return n.internalHooks.init.beforeFinished(this.beforeInitFinished.bind(this)), { setLang: l };
	}, r.prototype.beforeInitFinished = function() {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(n) {
				switch (n.label) {
					case 0: return [4, f()];
					case 1: return n.sent(), [2];
				}
			});
		});
	}, r;
}(a$1))();
//#endregion
export { p as n, h as t };

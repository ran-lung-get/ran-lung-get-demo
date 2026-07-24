import { Ct as T, Lt as t, Pt as o, Rt as a, Tt as _, c as k, dt as m, kt as e, q as x, z as c } from "./@liff/activity+[...].mjs";
import { b as l, l as Re, x as p } from "./@liff/analytics+[...].mjs";
import { __awaiter, __extends, __generator } from "tslib";
//#region node_modules/@liff/request-friendship/lib/index.es.js
var v, w = Re.on, b = Re.off, R = Re.open, E = function() {
	function t$3(t$2, r) {
		var s = this;
		this.onSubmit = function(t) {
			return __awaiter(s, void 0, void 0, function() {
				return __generator(this, function(e) {
					return t.ADD_FRIEND_ERROR ? this.reject(m(o, t.ADD_FRIEND_ERROR_MESSAGE || t.ADD_FRIEND_ERROR)) : this.resolve(), this.teardown(), [2];
				});
			});
		}, this.onClose = function() {
			return __awaiter(s, void 0, void 0, function() {
				return __generator(this, function(t) {
					return this.resolve(), this.teardown(), [2];
				});
			});
		}, this.onCancel = function() {
			return __awaiter(s, void 0, void 0, function() {
				return __generator(this, function(t$1) {
					return this.reject(m(t, "user didn't complete the friend request")), this.teardown(), [2];
				});
			});
		}, this.onError = function(t) {
			return __awaiter(s, void 0, void 0, function() {
				return __generator(this, function(e) {
					return this.reject(t), this.teardown(), [2];
				});
			});
		}, this.resolve = t$2, this.reject = r, this.setup();
	}
	return t$3.prototype.setup = function() {
		w("submit", this.onSubmit), w("close", this.onClose), w("cancel", this.onCancel), w("error", this.onError);
	}, t$3.prototype.teardown = function() {
		b("submit", this.onSubmit), b("close", this.onClose), b("cancel", this.onCancel), b("error", this.onError), v = void 0;
	}, t$3.prototype.open = function(t) {
		var e = c().liffId;
		e ? R({
			url: "".concat("https://liff.line.me/1656032314-CWSCEjzU"),
			appData: {
				liffId: e,
				accessToken: x()
			},
			onBeforeTransition: t
		}).catch(this.reject) : this.reject(m(T, "liffId is required"));
	}, t$3;
}();
function D() {
	return __awaiter(this, void 0, void 0, function() {
		var t, e$1;
		return __generator(this, function(i) {
			switch (i.label) {
				case 0: t = c().liffId, i.label = 1;
				case 1: return i.trys.push([
					1,
					3,
					,
					4
				]), [4, p("".concat(l("oaAddFriendRateLimit"), "?liffId=").concat(t), { method: "POST" })];
				case 2: return e$1 = i.sent(), [3, 4];
				case 3: throw i.sent(), m(e, "Failed to check rate limit");
				case 4:
					if (429 === e$1.status) throw m(_, "Rate limit exceeded for friend request");
					if (!e$1.ok) throw m(e, "Failed to check rate limit");
					return [2];
			}
		});
	});
}
function j() {
	return __awaiter(this, void 0, void 0, function() {
		return __generator(this, function(t) {
			switch (t.label) {
				case 0: return k.requestFriendship(), v && v.teardown(), [4, new Promise(function(t, e) {
					(v = new E(t, e)).open(D);
				})];
				case 1: return t.sent(), [2];
			}
		});
	});
}
var C = new (function(e) {
	function i() {
		return null !== e && e.apply(this, arguments) || this;
	}
	return __extends(i, e), Object.defineProperty(i.prototype, "name", {
		get: function() {
			return "requestFriendship";
		},
		enumerable: !1,
		configurable: !0
	}), i.prototype.install = function() {
		return j;
	}, i;
}(a))();
//#endregion
export { C as t };

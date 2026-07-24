import { Rt as a, Z as B, dt as m$1, f as r, l as e, yt as E } from "./@liff/activity+[...].mjs";
import { b as l$1, i as N, y as f } from "./@liff/analytics+[...].mjs";
import { __extends } from "tslib";
//#region node_modules/@liff/send-messages/lib/index.es.js
var m = function(r) {
	return "object" == typeof r && null !== r && function(r) {
		return "string" == typeof r || r instanceof String;
	}(r.type);
};
function p(r) {
	return Promise.reject(m$1(E, r));
}
function l(r) {
	if (!function(r) {
		return Array.isArray(r) && r.every(m);
	}(r)) return p("Parameter 'messages' must be an array of { type, ... }");
	var e = r.length;
	return e < 1 || e > 5 ? p("Number of messages should be in range 1 to ".concat(5, ".")) : f(l$1("message"), {
		method: "POST",
		body: JSON.stringify({ messages: r })
	}).catch(c);
}
var c = function(r$1) {
	if ("403" === r$1.code) {
		var e$1 = "12.0.0" === r(), o = "ios" === e(), n = B();
		e$1 && (o || n) && window.alert("LINEアプリをLINE 12.0.1以降にアップデートしてください。\nPlease update your LINE app to LINE 12.0.1 or later.");
	}
	throw r$1;
};
(function(e) {
	function t() {
		return null !== e && e.apply(this, arguments) || this;
	}
	return __extends(t, e), Object.defineProperty(t.prototype, "name", {
		get: function() {
			return "sendMessages";
		},
		enumerable: !1,
		configurable: !0
	}), t.prototype.install = function() {
		return N(l, "chat_message.write");
	}, t;
})(a);
//#endregion
export { l as t };

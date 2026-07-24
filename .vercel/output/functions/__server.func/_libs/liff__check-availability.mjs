import { c as k, pt as s } from "./@liff/activity+[...].mjs";
import { S as r$1 } from "./@liff/analytics+[...].mjs";
//#region node_modules/@liff/check-availability/lib/index.es.js
var e = function() {
	function t() {}
	return t.prototype.invoke = function(t) {
		var i = k[t];
		return !!i && (i(), !0);
	}, t;
}(), r = function() {
	function t(t) {
		this.liff = t;
	}
	return t.prototype.invoke = function(t) {
		return this.liff.checkFeature(t);
	}, t;
}(), o = function() {
	function n(o) {
		s(r$1(), n.SDK_VERSION_SUPPORTING_NEW) >= 0 ? this.impl = new e() : this.impl = new r(o);
	}
	return Object.defineProperty(n, "SDK_VERSION_SUPPORTING_NEW", {
		get: function() {
			return "2.11.0";
		},
		enumerable: !1,
		configurable: !0
	}), n.prototype.invoke = function(t) {
		return this.impl.invoke(t);
	}, n;
}();
//#endregion
export { o as t };

import { Rt as a } from "./@liff/activity+[...].mjs";
import { b as l, i as N, y as f$1 } from "./@liff/analytics+[...].mjs";
import { __extends } from "tslib";
//#region node_modules/@liff/get-friendship/lib/index.es.js
function o() {
	return f$1(l("friendship"));
}
(function(t) {
	function e() {
		return null !== t && t.apply(this, arguments) || this;
	}
	return __extends(e, t), Object.defineProperty(e.prototype, "name", {
		get: function() {
			return "getFriendship";
		},
		enumerable: !1,
		configurable: !0
	}), e.prototype.install = function() {
		return N(o, "profile");
	}, e;
})(a);
//#endregion
export { o as t };

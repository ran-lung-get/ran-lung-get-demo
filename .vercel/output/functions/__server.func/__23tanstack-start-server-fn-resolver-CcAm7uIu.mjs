//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-CcAm7uIu.js
var manifest = {
	"6b4488881deae7e3365fe0ebfdea8eed7b8a778b0f25096ab4bc9f62b8e899bf": {
		functionName: "createStripeSession_createServerFn_handler",
		importer: () => import("./_ssr/stripe.functions-B1CLcxsr.mjs")
	},
	"818ca136293094221adfa261da8c10a991ddc9eca4c1f1f6272328657ac214b2": {
		functionName: "verifyStripeSession_createServerFn_handler",
		importer: () => import("./_ssr/stripe.functions-B1CLcxsr.mjs")
	},
	"f1d06da6e6d10d0944451595bd9debcef1876485cd34b7e8e03bb58d51ae47ba": {
		functionName: "translateApi_createServerFn_handler",
		importer: () => import("./_ssr/translation.functions-DSnnX_nF.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };

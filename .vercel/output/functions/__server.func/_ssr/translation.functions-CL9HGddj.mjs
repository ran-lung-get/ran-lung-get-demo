import { i as TSS_SERVER_FUNCTION, l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CcAm7uIu.mjs";
import { a as stringType, i as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/translation.functions-CL9HGddj.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var translateApi = createServerFn({ method: "POST" }).inputValidator(objectType({
	text: stringType().min(1).max(5e3),
	sourceLang: stringType(),
	targetLang: stringType()
})).handler(createSsrRpc("f1d06da6e6d10d0944451595bd9debcef1876485cd34b7e8e03bb58d51ae47ba"));
//#endregion
export { translateApi as n, createSsrRpc as t };

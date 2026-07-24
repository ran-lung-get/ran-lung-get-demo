import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { a as stringType, i as objectType, n as enumType, r as numberType, t as arrayType } from "../_libs/zod.mjs";
import { t as Stripe } from "../_libs/stripe.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stripe.functions-B1CLcxsr.js
function getStripeInstance() {
	const secretKey = process.env.STRIPE_SECRET_KEY;
	if (!secretKey || secretKey === "YOUR_STRIPE_SECRET_KEY" || secretKey.startsWith("sk_test_mock")) return null;
	return new Stripe(secretKey, { apiVersion: "2025-01-27.acacia" });
}
var createStripeSession_createServerFn_handler = createServerRpc({
	id: "6b4488881deae7e3365fe0ebfdea8eed7b8a778b0f25096ab4bc9f62b8e899bf",
	name: "createStripeSession",
	filename: "src/lib/api/stripe.functions.ts"
}, (opts) => createStripeSession.__executeServer(opts));
var createStripeSession = createServerFn({ method: "POST" }).inputValidator(objectType({
	cart: arrayType(objectType({
		name: stringType(),
		price: numberType(),
		qty: numberType(),
		image: stringType().optional().nullable()
	})),
	subtotal: numberType(),
	deliveryFee: numberType(),
	orderType: enumType([
		"dine-in",
		"takeaway",
		"delivery"
	]),
	origin: stringType()
})).handler(createStripeSession_createServerFn_handler, async ({ data }) => {
	const stripe = getStripeInstance();
	const totalAmount = data.subtotal + data.deliveryFee;
	console.log(`[Stripe Server] Creating session for amount: ฿${totalAmount}`);
	if (!stripe) {
		console.warn("[Stripe Server] Stripe secret key not configured. Running in SANDBOX MODE.");
		const mockSessionId = `mock_stripe_sess_${Math.random().toString(36).substring(2, 15)}`;
		return {
			url: `${data.origin}/customer?payment_success=true&session_id=${mockSessionId}`,
			isSandbox: true
		};
	}
	try {
		const lineItems = data.cart.map((item) => ({
			price_data: {
				currency: "thb",
				product_data: {
					name: item.name,
					...item.image ? { images: [item.image.startsWith("/") ? `${data.origin}${item.image}` : item.image] } : {}
				},
				unit_amount: Math.round(item.price * 100)
			},
			quantity: item.qty
		}));
		if (data.deliveryFee > 0) lineItems.push({
			price_data: {
				currency: "thb",
				product_data: { name: "ค่าจัดส่ง (Delivery Fee)" },
				unit_amount: Math.round(data.deliveryFee * 100)
			},
			quantity: 1
		});
		return {
			url: (await stripe.checkout.sessions.create({
				payment_method_types: ["card", "promptpay"],
				line_items: lineItems,
				mode: "payment",
				success_url: `${data.origin}/customer?payment_success=true&session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${data.origin}/customer?payment_cancelled=true`,
				metadata: { orderType: data.orderType }
			})).url,
			isSandbox: false
		};
	} catch (error) {
		console.error("[Stripe Server] Error creating Stripe session:", error);
		throw new Error(error.message || "Failed to create Stripe session");
	}
});
var verifyStripeSession_createServerFn_handler = createServerRpc({
	id: "818ca136293094221adfa261da8c10a991ddc9eca4c1f1f6272328657ac214b2",
	name: "verifyStripeSession",
	filename: "src/lib/api/stripe.functions.ts"
}, (opts) => verifyStripeSession.__executeServer(opts));
var verifyStripeSession = createServerFn({ method: "POST" }).inputValidator(objectType({ sessionId: stringType() })).handler(verifyStripeSession_createServerFn_handler, async ({ data }) => {
	console.log(`[Stripe Server] Verifying session: ${data.sessionId}`);
	if (data.sessionId.startsWith("mock_stripe_sess_")) return {
		success: true,
		isSandbox: true,
		message: "Sandbox payment verified successfully"
	};
	const stripe = getStripeInstance();
	if (!stripe) return {
		success: true,
		isSandbox: true,
		message: "Stripe credentials missing; Sandbox auto-approval"
	};
	try {
		const session = await stripe.checkout.sessions.retrieve(data.sessionId);
		if (session.payment_status === "paid") return {
			success: true,
			isSandbox: false,
			amount: session.amount_total ? session.amount_total / 100 : 0,
			paymentMethodTypes: session.payment_method_types
		};
		else return {
			success: false,
			isSandbox: false,
			message: `Payment status is: ${session.payment_status}`
		};
	} catch (error) {
		console.error("[Stripe Server] Error verifying Stripe session:", error);
		return {
			success: false,
			isSandbox: false,
			message: error.message || "Failed to retrieve checkout session"
		};
	}
});
//#endregion
export { createStripeSession_createServerFn_handler, verifyStripeSession_createServerFn_handler };

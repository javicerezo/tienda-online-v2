import Stripe from "stripe";
import { jsonError } from "./auxiliar/jsonError";
import { verifyTokenAuthentication } from "./auxiliar/verifyTokenAuthentication";

import type { Handler } from "@netlify/functions";

const secret = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(secret || "");

/**
 * función que finaliza el pago si todo es correcto
 * @param event, recibe un evento con la información de la sesión de pago
 * @returns retorna lo necesario para mostrar un resumen del pago
 */
export const handler: Handler = async (event) => {
    if (event.httpMethod !== "GET") {
        return jsonError(405, "error", "metodo inválido");
    }
    const { isAuthenticated, uid } = await verifyTokenAuthentication(event);
    if(!isAuthenticated || !uid) console.log("usuario es invitado") // dejo este console.log solo para comprobar si user es invitado o está autenticado

    if (!secret) {
        return jsonError(500, "error", "configuración Stripe incompleta");
    }

    const session_id = event.queryStringParameters?.session_id;
    if (!session_id) {
        return jsonError(400, "error", "falta session_id");
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items.data.price.product"],
        });

        // Datos útiles para la página de éxito
        const line_items =
            session.line_items?.data.map((li) => {
                const price = li.price as Stripe.Price | null;
                const product = price?.product as Stripe.Product | null;

                return {
                    description: product?.name ?? "Producto",
                    quantity: li.quantity ?? 0,
                    amount_subtotal: li.amount_subtotal ?? 0,
                    amount_total: li.amount_total ?? 0,
                    currency: li.currency ?? session.currency,
                }
            }) ?? [];

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "success",
                payment_status: session.payment_status, // estado del pago
                amount_total: session.amount_total, // importe total
                currency: session.currency, // divisa usada, €
                line_items,
            }),
        };
    } catch (err) {
        console.error("retrieve session error:", err);
        return jsonError(500, "error", "no se pudo recuperar la sesión");
    }
};
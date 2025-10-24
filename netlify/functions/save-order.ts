import { Handler } from "@netlify/functions";
import Stripe from "stripe";
import { jsonError } from "./auxiliar/jsonError";
import { db } from "../lib/firebase/firebase.admin";
import { verifyTokenAuthentication } from "./auxiliar/verifyTokenAuthentication";

import type { orderLineItem } from "@/utils/types/order";

const secret = process.env.STRIPE_SECRET_KEY!;
const stripe = new Stripe(secret);

type newOrder = { session_id: string };

/**
 * guarda en firebase el pedido confirmado para despues poder mostrarlo en el perfil del usuario.
 */
export const handler: Handler = async (event) => {
    if (event.httpMethod !== "POST") return jsonError(405, "error", "metodo inválido");
    if (!event.body) return jsonError(400, "error", "no hay datos");
    if (!secret) return jsonError(500, "error", "configuración Stripe incompleta");

    const { isAuthenticated, uid } = await verifyTokenAuthentication(event);
    if(!isAuthenticated || !uid) return jsonError(400, 'error', 'Usuario no identificado, no se puede guardar el pedido');

    const body: newOrder = JSON.parse(event.body);

    const { session_id } = body;
    if (!session_id) return jsonError(400, "error", "falta session_id");

    try {
        // Recuperamos sesión de Stripe
        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ["line_items.data.price.product"],
        });

        if (session.payment_status !== "paid") {
            return jsonError(400, "error", "el pago no se ha completado");
        }

        // Preparar líneas
        const line_items: orderLineItem[] =
            session.line_items?.data.map((li) => {
                const price = li.price as Stripe.Price | null;
                const product = price?.product as Stripe.Product | null;

                return {
                    description: product?.name ?? "Producto",
                    quantity: li.quantity ?? 0,
                    amount_subtotal: li.amount_subtotal ?? 0, // céntimos
                    amount_total: li.amount_total ?? 0,       // céntimos
                    currency: li.currency ?? session.currency,
                };
        }) ?? [];

        // Guardamos el pedido en una subcolección de ese usuario
        const orderRef = db.collection("users").doc(uid).collection('orders').doc(session_id);
        const exist = await orderRef.get();
        if (!exist.exists) { 
            await orderRef.set({
                session_id,
                payment_status: session.payment_status, // "paid"
                amount_total: session.amount_total ?? 0, // céntimos
                currency: session.currency ?? "eur",
                line_items,
                createdAt: new Date().toISOString(),
            })
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                { 
                    status: "success" 
                }
            ),
        };
    } catch (err) {
        console.error("save-order error:", err);
        return jsonError(500, "error", "no se pudo guardar el pedido");
    }
};
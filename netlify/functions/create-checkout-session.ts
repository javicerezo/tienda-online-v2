import Stripe from "stripe";
import { jsonError } from "./auxiliar/jsonError";

import type { Handler } from "@netlify/functions";
import type { productCart } from "../types/types";

const secret = process.env.STRIPE_SECRET_KEY;

const stripe = new Stripe(secret || "", {});

/**
 * crea la sesión necesaria para la pasarela de pago con strike
 * @param event, recibe la petición
 * @returns devuelve la url que te lleva a la sesión de pago de stripe
 */
export const handler: Handler = async (event) => {
    // Solo POST
    if(event.httpMethod !== "POST") return jsonError(405, 'error', 'metodo inválido');
    
    // Evitar datos vacío
    if(!event.body) return jsonError(400, 'error', 'no hay datos en el formulario');

    try {
        const items: productCart[] = JSON.parse(event.body);
        if (!Array.isArray(items) || items.length === 0) return jsonError(400, 'error', 'carrito no válido');

        // IMPORTANTE: unit_amount en CENTIMOS (integer)
        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
            (it) => ({
                    quantity: it.quantity,
                    price_data: {
                        currency: "eur",
                        unit_amount: Math.round(it.newPrice * 100),
                        product_data: { name: it.name },
                    },
            })
        );

        const siteUrl =
            process.env.SITE_URL ||
            `${event.headers["x-forwarded-proto"] || "http"}://${event.headers.host}`;

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items,
            success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${siteUrl}/`,
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    status: "success",
                    message: "pasarela de pago creada satisfactoriamente",
                    url: session.url 
                }
            )
        }
    } catch {
        return jsonError(500, 'error', 'no se pudo crear la sesión de pago');
    }
};
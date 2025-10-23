import { roundResult } from "@/utils/functions/roundResult";
import { jsonError } from "./auxiliar/jsonError";
import { adminAuth } from "../lib/firebase/firebase.admin";

import type { Handler, HandlerEvent } from "@netlify/functions";
import type { productCart } from "../types/types";

/**
 * 
 * @param event toma datos desde el front
 * @returns retorna el estado de la petición al front
 */
export const handler: Handler = async (event: HandlerEvent)=> {
    // Solo POST
    if(event.httpMethod !== "POST") return jsonError(405, 'error', 'metodo inválido')
    
    // Evitar datos vacío
    if(!event.body) return jsonError(400, 'error', 'el carrito está vacío');

    let data;
    let authHeader;
    try {
        data = JSON.parse(event.body);
        authHeader = event.headers.authorization || "";
    } catch {
        return jsonError(400, 'error', 'JSON inválido');
    }

    let isAuthenticated = false;

    if (authHeader.startsWith("Bearer ")) {
        const idToken = authHeader.slice("Bearer ".length);
        try {
            await adminAuth.verifyIdToken(idToken);
            isAuthenticated = true;
        } catch {
            // token inválido → seguimos como invitado
            isAuthenticated = false;
        }
    }

    // Recalcular SIEMPRE en backend (no confiar en newPrice del front...puede ser manipulable)
    const newData = data.map((product: productCart) => {
        const effectiveDesc = isAuthenticated ? product.desc : 0; 
        const finalPrice = roundResult(product.price * ((100 - effectiveDesc) / 100));

        // RETORNO EL PRODUCTO PERO SOLO CAMBIO DESCUENTO Y PRECIO SI USUARIO ESTÁ AUTENTICADO O NO
        return {
            ...product,
            desc: effectiveDesc,   
            newPrice: finalPrice
        };
    });
    
    // Recalculamos todos los precios para enviar a la cesta de compra
    const totalQuantity = newData.reduce( (total: number, product: productCart) => total += product.quantity, 0);
    const subTotalPrice = roundResult(newData.reduce( (total: number, product: productCart) => total += product.quantity*product.newPrice, 0));
    const sendPrice = subTotalPrice === 0 ? 0 : 5;
    const totalPrice = subTotalPrice + sendPrice;
    const savingPrice = roundResult(newData.reduce( (total: number, product: productCart) => total += (product.price - product.newPrice)*product.quantity, 0));

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                status: "success",
                totalQuantity: totalQuantity,
                subTotalPrice: subTotalPrice,
                sendPrice: sendPrice,
                totalPrice: totalPrice,
                savingPrice: savingPrice,
                items: newData,
            }
        )
    }
}
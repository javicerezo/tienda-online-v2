import { roundResult } from "@/utils/functions/roundResult";
import { jsonError } from "./auxiliar/jsonError";

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

    let data
    try {
        data = JSON.parse(event.body);
    } catch {
        return jsonError(400, 'error', 'JSON inválido');
    }

    const totalQuantity = data.reduce( (total: number, product: productCart) => total += product.quantity, 0);
    const subTotalPrice = roundResult(data.reduce( (total: number, product: productCart) => total += product.quantity*product.newPrice, 0));

    let sendPrice;
    if(subTotalPrice == 0) {
        sendPrice = 0;
    } else {
        sendPrice = 5;
    }
    const totalPrice = subTotalPrice + sendPrice;
    const savingPrice = roundResult(data.reduce( (total: number, product: productCart) => total += (product.price - product.newPrice)*product.quantity, 0));

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
            }
        )
    }
}
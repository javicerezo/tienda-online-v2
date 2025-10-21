import { roundResult } from "@/utils/functions/roundResult";

import type { Handler, HandlerEvent } from "@netlify/functions";
import type { productCart } from "../types/types";

/**
 * 
 * @param message string
 * @returns devuelve el contenido de la petición con un mensaje para mostrar en el frontend y su estado
 */
const jsonError = (statusCode: number, status: string, message: string) => {
    return {
        statusCode: statusCode,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                status: status,
                message
            }
        )
    };
}

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
    const totalPrice = roundResult(data.reduce( (total: number, product: productCart) => total += product.quantity*product.price, 0));


    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                status: "success",
                totalQuantity: totalQuantity,
                totalPrice: totalPrice
            }
        )
    }
}
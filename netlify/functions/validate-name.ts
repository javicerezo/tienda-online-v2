import { jsonError } from "./auxiliar/jsonError";

import type { Handler, HandlerEvent } from "@netlify/functions";

/**
 * 
 * @param event toma un evento de formulario
 * @returns retorna la petición al front
 */
export const handler: Handler = async (event: HandlerEvent)=> {
    // Solo POST
    if(event.httpMethod !== "POST") return jsonError(405, 'error', 'metodo inválido')
    
    // Evitar datos vacío
    if(!event.body) return jsonError(400, 'error', 'Campo de nombre vacío');

    const data: string = JSON.parse(event.body);
    console.log(data)
    const name = data.toString().trim().toLowerCase();
    if(!name) return jsonError(400, 'error', "El nombre es obligatorio.");

    // cambiaos de nombre
    
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                status: "success",
                message: "nombre cambiado",
                name: name
            }
        )
    }
}
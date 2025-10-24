import { jsonError } from "./auxiliar/jsonError";
import { isEmail } from "./auxiliar/isEmail";

import type { Handler, HandlerEvent } from "@netlify/functions";
import type { loginForm } from "../types/types";

/**
 * 
 * @param event toma un evento de formulario
 * @returns retorna la petición al front
 */
export const handler: Handler = async (event: HandlerEvent)=> {
    // Solo POST
    if(event.httpMethod !== "POST") return jsonError(405, 'error', 'metodo inválido')
    
    // Evitar datos vacío
    if(!event.body) return jsonError(400, 'error', 'no hay datos en el formulario');

    const data: loginForm = JSON.parse(event.body);
    
    const email = data.email.toString().trim().toLowerCase();
    if(!email || !isEmail(email))  return jsonError(400, 'error', "El email no es válido.");

    const password = data.password.toString().trim();
    if(!password) return jsonError(400, 'error', "El nombre es obligatorio.");

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                status: "success",
                message: "login correcto",
            }
        )
    }
}
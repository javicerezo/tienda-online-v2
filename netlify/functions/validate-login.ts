import type { Handler, HandlerEvent } from "@netlify/functions";
import type { loginForm } from "../types/types";

// FUNCIONES AUXILIARES PARA VALIDACIÓN
/**
 * 
 * @param s string
 * @returns boolean devuelve si un sstring es un correo válido o no
 */
const isEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s);

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
    if(!event.body) return jsonError(400, 'error', 'no hay datos en el formulario');

    const data: loginForm = JSON.parse(event.body);
    const email = data.email.toString().trim().toLowerCase();
    const name = data.password.toString().trim().toLowerCase();
    if(!name) return jsonError(400, 'error', "El nombre es obligatorio.");
    if(!email || !isEmail(email))  return jsonError(400, 'error', "El email no es válido.");

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
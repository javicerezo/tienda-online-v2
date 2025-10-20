import type { Handler, HandlerEvent } from "@netlify/functions";

import type { signupForm } from "../types/types";

// FUNCIONES AUXILIARES PARA VALIDACIÓN
const isEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s);

const jsonError = (message: string) => {
    return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                status: "error",
                message
            }
        )
    };
}

export const handler: Handler = async (event: HandlerEvent) => {
    // Solo POST
    if(event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    status: 'error',
                    message: ['MÉTODO INVÁLIDO']
                }
            )
        }
    }
    
    // Evitar datos vacío
    if(!event.body) {
        return {
            statusCode: 400,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                        status: 'error',
                        message: ['NO HAY DATOS']
                    }
                )
            }
        }

    const data: signupForm = JSON.parse(event.body);

    const name = data.name.toString().trim();
    const email = data.email.toString().trim().toLowerCase();
    const password = data.password.toString();
    const passwordRepeat = data["passwordRepeat"].toString();

    // --- Validación simple ---
    if (!name) {
        return jsonError("El nombre es obligatorio.");
    }
    if (!email || !isEmail(email)) {
        return jsonError("El email no es válido.");
    }
    if (!password) {
        return jsonError("La contraseña es obligatoria.");
    }
    if (password.length < 6) {
        return jsonError("La contraseña debe tener al menos 6 caracteres.");
    }
    if (password !== passwordRepeat) {
        return jsonError("Las contraseñas no coinciden.");
    }

    // EL NUEVO USUARIO DE LA COLECCIÓN USERS LO HACEMOS EN BACKEND PERO EL NUEVO USUARIO EN AUTH SE HACE
    // EN EL FRONTEND PUES ASÍ RECOMIENDA LA DOCUMENTACIÓN.
    // const newUser = {
    //     name,
    //     email
    // }
    // createUser(newUser);

    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                status: "success",
                message: "Nuevo usuario creado correctamente.",
            }
        )
    }
}
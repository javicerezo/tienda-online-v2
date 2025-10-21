import { db } from "../lib/firebase/firebase.admin";
import admin from 'firebase-admin';
import { jsonError } from "./auxiliar/jsonError";
import { isEmail } from "./auxiliar/isEmail";

import type { Handler, HandlerEvent } from "@netlify/functions";
import type { signupForm } from "../types/types";

/**
 * 
 * @param event un evento de form desde el frontend
 * @returns retorna la petición al frontend
 */
export const handler: Handler = async (event: HandlerEvent) => {
    // Solo POST
    if(event.httpMethod !== "POST") return jsonError(405, 'error', 'metodo inválido')
    
    // Evitar datos vacío
    if(!event.body) return jsonError(400, 'error', 'no hay datos en el formulario');

    // VARIABLES A COMPROBAR
    const data: signupForm = JSON.parse(event.body);
    const name = data.name.toString().trim().toLowerCase();
    const email = data.email.toString().trim().toLowerCase();
    const password = data.password.toString();
    const passwordRepeat = data["passwordRepeat"].toString();
    const userDoc = await db.collection('users').doc(email).get();

    // VALIDACIONES
    if(!name) return jsonError(400, 'error', "El nombre es obligatorio.");
    if(!email || !isEmail(email))  return jsonError(400, 'error', "El email no es válido.");
    if(userDoc.exists) return jsonError(400, 'error', 'Email ya registrado.');
    if(!password)  return jsonError(400, 'error', "La contraseña es obligatoria.");
    if(password.length < 6) return jsonError(400, 'error', "La contraseña debe tener al menos 6 caracteres.");
    if(password !== passwordRepeat) return jsonError(400, 'error', "Las contraseñas no coinciden.");

    // CREAMOS EL NUEVO USUARIO EN LA COLECCION DE USUARIOS
    try {
        await db.collection('users').doc(email).create({
            name,
            email,
            role: "user",
            emailVerified: false,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    } catch {
        return jsonError(500, 'error', "Error al crear el nuevo usuario. Por favor inténtalo de nuevo.");
    }

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
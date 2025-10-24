import { jsonError } from "./auxiliar/jsonError";
import { db } from "../lib/firebase/firebase.admin";
import { verifyTokenAuthentication } from "./auxiliar/verifyTokenAuthentication";
import admin from 'firebase-admin';

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

    // Verificar token
    const { isAuthenticated, uid } = await verifyTokenAuthentication(event);
    if(!isAuthenticated || !uid) return jsonError(400, 'error', 'Usuario no identificado.');

    const name: string  = JSON.parse(event.body);
    if(!name) return jsonError(400, 'error', "El nombre es obligatorio.");

    const cleanedName = (name ?? "").trim();
 
    // modificamos el nombre con credenciales de backend
    await db.collection("users").doc(uid).set(
        {
            name: cleanedName,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
    );
    
    return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                status: "success",
                message: "nombre cambiado",
                name: cleanedName
            }
        )
    }
}
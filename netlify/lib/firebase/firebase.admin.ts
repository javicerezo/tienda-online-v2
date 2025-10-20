import admin from "firebase-admin";

function normalizePrivateKey(raw?: string) {
    if (!raw) return '';
    // 1) Quita comillas envolventes si las hubiera
    const unquoted = raw.replace(/^"|"$/g, '');
    // 2) Convierte \n literales en saltos de línea reales
    return unquoted.replace(/\\n/g, '\n');
}

if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

    // guardas para detectar rápidamente qué falta
    if (!projectId) throw new Error('FIREBASE_PROJECT_ID no está definida');
    if (!clientEmail) throw new Error('FIREBASE_CLIENT_EMAIL no está definida');
    if (!privateKey) throw new Error('FIREBASE_PRIVATE_KEY no está definida');

    admin.initializeApp({
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                privateKey,
        }),
    });
}

export const db = admin.firestore();
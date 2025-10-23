import admin from "firebase-admin";

function normalizePrivateKey(raw?: string) {
    if (!raw) return '';
    const unquoted = raw.replace(/^"|"$/g, ''); // Quita comillas envolventes si las hubiera
    return unquoted.replace(/\\n/g, '\n');      // Convierte \n literales en saltos de línea reales
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

export const adminAuth = admin.auth();
export const db = admin.firestore();
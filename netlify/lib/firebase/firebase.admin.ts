import admin from "firebase-admin";

function normalizePrivateKey(raw?: string) {
    if (!raw) return '';
    // 1) Quita comillas envolventes si las hubiera
    const unquoted = raw.replace(/^"|"$/g, '');
    // 2) Convierte \n literales en saltos de línea reales
    return unquoted.replace(/\\n/g, '\n');
}

// const projectId = "tienda-online-v2-894b2";
// const clientEmail = "firebase-adminsdk-fbsvc@tienda-online-v2-894b2.iam.gserviceaccount.com";
// const privateKey = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDIW6rqdeHW4Khn\n1iLbBfJulOWeFn8ChYQ11UWf/LCYnp4nXCZozOId2nY4UfUh8Q2ivyIFX+P0MhV0\nQaRWX/BicQv/jzBvhu30kWDDaWkrDqQi/PCHVqDmOJxMk249TH/IjmpusogJTkPe\noDIppJVjytE8nWl9TF7LjlYT/LZO9Zn42OEPmDLgImOfZIjDsxHxEtqjt5SOf8pe\nxGwXlBBNmrfkUp3o3020ssmnLFMVDfeF4X1xq53rdD0OfvcrbAIljo8wNq3mxLBJ\n7lKBNmvY7HdjQCG1w+98GO8wgD2biwJYrlS1OioZPV6Nd980Hopmd71MVS8L/aNq\nSSjiXieJAgMBAAECgf9NlRRURCE26iwODNOdDUiHDtA3o1AXz4pZxBuJYIPSKFZb\nQT8ZttTCMYK8mznl9g/sa4Yii+uASD12J6bSn+JHdHalklKX7VyqTpYJR9uNF/I/\nc/g0CiQa3UYDWaZteQpbBbaZRLpgTti8NXL1yTggDHOO29tTChulbwdBh8L8ZU+J\nvxQVvwaU1rRl/u6MBOeAYVYsZjNyPjd5dO6rF4faoOERQy4HlDSGT219uItwCZ0F\n2AAwuXjinEXRYAPXK9icw9enjlUo/Buv1batdc8tJty4rMlgowN8nUKwxpcfa3fr\nsT7y5d9nmDWsJ9tTwrkFcwqK1RdJbBplHHU5tBUCgYEA/JxCEI1F1vXhPamtN+6Q\n+Y1PtdTBtbcXq3Yz9/oy0ePJIkptg14dxBP7LSAzCLuLZ5BmzVPHLcxCbNFgIFqy\nNEl7doRAfGXtVtKNXEj+kJd39fo7qmgXQGI55pLtdSRL5WCR7a0XctYZ+o1ZJknL\nlqi5o5wB6Uy2E9aREc62bQUCgYEAywvq7M1treVuOJesw82EU/i5dymsH1qSNJ5S\nwGC8kXjCvxjoqf19NIqVldVE0ECSXqA8Oxf1PBoXRiRcZOBtLO5Mx1t8IrIgwa6n\n1rw+yUK395WFDCVmVOFnaJbGun8yYJzZ1J6bGPHdkLSqINvRNrUGKVoFA6QaD6Ad\nY2vLN7UCgYEAt6dnRJ9hOkJzKqCUxghVMImzfRAccV+W/tqmN9CYaA6CqcKQ0iR3\n4ZlhUNKLJ/sqA/ZxNzCEq+BIHtMuXvdxfiA6edT3CToVjrzvdzu+kCL/XT87Z83b\nsbx4OhFyQGtOHorSLYlddekA5C8ltHeMY5FxvehrX1GdQtkJiXfPG30CgYEAqytQ\n0HAdlgtj77Fto2MNuvxi3WH0CDqCJnmRqTvju37iLdcBzMw1UKXDlJxFdon42mya\nWfbIdfJIzIi6mw/W+ZmqgCVPcLBZjO1/8Dahd2kXTVBu6N5edg/O7QyuW2n/PhL8\nT5GljlHXRrYG9cxZgpT4rMOGlpswnRuNqtKkbkECgYEAoWKUoT5uQ5m0wLiQU8AF\nS6Q5sATRAwXls17pYzAqwFTmWsqk2a7kRBTk/agDx3lVSR/+7q5wjXSwoGDu2Q1n\nriVwA5ipNlhHOw/6MD3fKURnI7S8bBSqrircuC8tRKgBYKZSKZYLTuQpDxX2vUQu\nHf3E7jCZa8nmTNI1E10hNUM=\n-----END PRIVATE KEY-----\n";
// const projectId = process.env.FIREBASE_PROYECT_ID;
// const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
// const PrivateKey = process.env.FIREBASE_PRIVATE_KEY;

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
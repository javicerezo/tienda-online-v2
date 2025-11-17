import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/firebase.client";
import { collection, query, getDocs, orderBy, limit, where } from "firebase/firestore";

import type { newsDB } from "../types/new";

// helper: convierte doc → objeto plano con createdAt como Date
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function docToNews(d: any): newsDB {
    const data = d.data();
    return {
        id: d.id,
        titulo: data.titulo,
        slug: data.slug,
        imagen: data.imagen,
        categoria: data.categoria,
        desarrollo: data.desarrollo,
        createdAt: data.createdAt.toDate(),
        stats: { commentsCount: data?.stats?.commentsCount ?? 0 },
    };
}

/**
 * este hook retorna las 4 ultimas noticias en un array y 2 escaladas recomendadas en otro
 * @returns retorna dos arrays con noticias con 4 y 2 posiciones para mostrar en el contenido inicial del blog
 */
export function useInitContent() {
    const [latestNews, setLatestNews] = useState<newsDB[]>([]);
    const [recomendedRoutes, setRecomendedRoutes] = useState<newsDB[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        (async () => {
        try {
            const qLatest = query(collection(db, "news"), orderBy("createdAt", "desc"), limit(4));

            const qRoutes = query(collection(db, "news"), where("categoria", "==", "rutas"), orderBy("createdAt", "desc"), limit(4));

            const [snapLatest, snapRoutes] = await Promise.all([
                getDocs(qLatest),
                getDocs(qRoutes),
            ]);

            setLatestNews(snapLatest.docs.map(docToNews));
            setRecomendedRoutes(snapRoutes.docs.map(docToNews));
        } catch (e) {
            console.error("Firestore error:", e);
            setError(e);
        } finally {
            setLoading(false);
        }
        })();
    }, []);

    return { latestNews, recomendedRoutes, loading, error };
}
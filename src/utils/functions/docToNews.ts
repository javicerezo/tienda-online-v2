import type { newsDB } from "../types/new";

// helper: convierte doc → objeto plano con createdAt como Date
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function docToNews(d: any): newsDB {
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
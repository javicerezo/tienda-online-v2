export type newsDB = {
    id: string;
    titulo: string;
    slug: string;
    desarrollo: string;
    imagen: string;
    categoria: 'rutas' | 'noticias' | 'consejos' | 'test' | 'reportajes' | 'preparación física';
    createdAt: Date;
    stats: { commentsCount: number };
};

// es el type de las noticias
export interface articleProps {
    element: newsDB;
}
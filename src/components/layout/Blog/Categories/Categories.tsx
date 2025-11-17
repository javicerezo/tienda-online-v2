'use client'

import { useEffect, useState } from 'react';
import { db } from "@/lib/firebase/firebase.client";
import { collection, getDocs, query, orderBy, where, limit } from "firebase/firestore";
import { docToNews } from '@/utils/functions/docToNews';

import { Paragraph } from '@/components/ui/Paragraph/Paragraph';
import { ArticleCard } from '../Article/ArticleCard';
import { FaChevronRight } from "react-icons/fa";
import Link from 'next/link';

import type { newsDB } from '@/utils/types/new';
import './Categories.scss';

const CATEGORIES = [
    "rutas",
    "noticias",
    "consejos",
    "test",
    "reportajes",
    "preparación física"
];

/**
 * ES EL COMPONENTE PARA MOSTRAR 4 NOTICIAS DE CADA CATEGORÍA
 * @returns 
 */
export const Categories = () => {
    // estado: artículos agrupados por categoría
    const [articlesByCategory, setArticlesByCategory] = useState<Record<string, newsDB[]>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                // para cada categoría, pedimos 4 artículos recientes
                const promises = CATEGORIES.map(async (cat) => {
                const q = query(
                    collection(db, "news"),
                    where("categoria", "==", cat),
                    orderBy("createdAt", "desc"),
                    limit(4)
                );

                const snap = await getDocs(q);
                const items = snap.docs.map(docToNews);

                return [cat, items] as const;
                });

                const results = await Promise.all(promises);

                const map: Record<string, newsDB[]> = {};

                results.forEach(([cat, items]) => {
                    map[cat] = items;
                });

                setArticlesByCategory(map);
            } catch (e) {
                console.error("Firestore error (categories):", e);
                setError(e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (error) return <Paragraph text='ha ocurrido un error' styleGreen={false}/>

    return (
        <>
            { loading && (
                <Paragraph text='cargando contenido' styleGreen={true}/>
            )}

            { CATEGORIES.map( element => {
                const items = articlesByCategory[element] || [];

                return (
                    <div className="Categories-content" key={element}>
                        <div className="Categories-title">
                            <Link 
                                className="Categories-h3"
                                href={`/blog/categories/${element}`}>{element}</Link>
                                <FaChevronRight />
                                <FaChevronRight />
                        </div>
                        <ul className="Categories-ul">
                            {items.map(item => (
                                <ArticleCard 
                                    key={item.id}
                                    element={item}
                                />
                            ))}
                            {items.length === 0 && (
                                <Paragraph text='No hay artículos en esta categoría aún' styleGreen={true}/>
                            )}
                        </ul>
                    </div>
                )
            })}
        </>
    )
}
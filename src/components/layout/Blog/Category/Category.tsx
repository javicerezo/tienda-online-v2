'use client'

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/firebase.client";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { docToNews } from '@/utils/functions/docToNews';

import { CategoryNav } from '../Header/CategoryNav';
import { Paragraph } from '@/components/ui/Paragraph/Paragraph';
import { ArticleCard } from '../Article/ArticleCard';

import type { newsDB } from '@/utils/types/new';
import './Category.scss';

type CategoryProps = {
    categoria: string; // viene de params.categoria
};

export const Category = ({ categoria }: CategoryProps) => {
    const [items, setItems] = useState<newsDB[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    useEffect(() => {
        if (!categoria) {
            setLoading(false);
            setError('Categoría vacía');
        return;
        }

        (async () => {
            try {
                const q = query(collection(db, 'news'),where('categoria', '==', categoria),  orderBy('createdAt', 'desc'));

                const snap = await getDocs(q);
                const result = snap.docs.map(docToNews);
                setItems(result);
            } catch (e) {
                console.error('Firestore error (category):', e);
                setError(e);
            } finally {
                setLoading(false);
            }
            })();
        }, [categoria]);

    if (loading) return <Paragraph text='cargando artículos' styleGreen={true}/>
    if (error) return <Paragraph text={`Ha ocurrido un error cargando ${categoria}`} styleGreen={false}/>;
    
    return (
        <section className='Category'>
            <div className='Category-container'>
                <h1 className="Category-h1">Blog de Montaña</h1>
                <CategoryNav />

                <div className="Category-content">
                    <h2 className="Category-h2">{categoria}</h2>

                    {items.length === 0 && (
                        <Paragraph text='no existen artículos de esta categoría' styleGreen={true}/>
                    )}

                    <ul className="Category-ul">
                        {items.map( item => (
                            <ArticleCard 
                                key={item.id}
                                element={item}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}
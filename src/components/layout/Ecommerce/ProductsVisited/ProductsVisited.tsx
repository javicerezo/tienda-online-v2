'use client'

import { useState } from 'react';

import { ProductCard } from '../Products/ProductCard';
import { ProductModal } from '../Products/ProductModal';
import type { product } from '@/utils/types/product';

import './ProductsVisited.scss';

export const ProductsVisited = () => {
    const [ visitedList, setVisitedList ] = useState<product[] | null>([]);
    const [ cartList, setCartList ] = useState<product[]>([]);
    const [ modal, setModal ] = useState<product | null>(null);

    const stop = () => {
        console.log("NO HAGAS NADA CON ESTE CLIC")
    }

    return (
        <section className="ProductsVisited">
            { visitedList?.length !== 0 && (
                <div className="ProductsVisited-contenedor">
                    <h2 className="ProductsVisited-h2">Últimos productos que has visitado</h2>
                    <ul className="ProductsVisited-grid">
                        { visitedList?.map( element => (
                                <ProductCard 
                                    key={element.id}
                                    marca={element.marca}
                                    nombre={element.nombre}
                                    imagen={element.imagen}
                                    precio={element.precio}
                                    descuento={element.descuento}
                                    id={element.id}
                                    handleModal={ () => setModal(element) }
                                    handleCart={ () => setCartList([element]) }
                                    onclick={() => stop() }
                                />
                            ))
                        }    
                    </ul>
                </div>   
            )}
            
            { modal && (
                <ProductModal 
                    product={modal}
                    onClose={ () => setModal(null) }
                    handleCart={ () => setCartList([modal]) }
                />     
            )}
        </section>
    );
}
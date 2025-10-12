'use client'

import { useState } from 'react';

import { ProductCard } from '../Products/ProductCard';
import { ProductModal } from '../Products/ProductModal';
import type { product } from '@/utils/types/product';

import './ProductsVisited.scss';
import { cargarStorage } from '@/utils/functions/storage';

export const ProductsVisited = () => {
    const [ modal, setModal ] = useState<product | null>(null);
    const visitedList = cargarStorage("visitedList");

    return (
        <section className="ProductsVisited">
            { visitedList?.length !== 0 && (
                <div className="ProductsVisited-contenedor">
                    <h2 className="ProductsVisited-h2">Últimos productos que has visitado</h2>
                    <ul className="ProductsVisited-grid">
                        { visitedList?.map( (element: product) => (
                                <ProductCard 
                                    key={element.id}
                                    marca={element.marca}
                                    nombre={element.nombre}
                                    imagen={element.imagen}
                                    precio={element.precio}
                                    descuento={element.descuento}
                                    id={element.id}
                                    handleModal={ () => setModal(element) }
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
                />     
            )}
        </section>
    );
}
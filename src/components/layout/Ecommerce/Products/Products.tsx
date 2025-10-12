'use client'

import { ProductCard } from './ProductCard';

import { useEffect, useState } from 'react';
import { arrayNumRandom } from '@/utils/functions/arrayNumRandom';
import { arrayProductList } from '@/utils/functions/arrayProductList';

import { materialDeportivo } from '@/bd/baseDatos'
import type { product } from '@/utils/types/product';

import './Products.scss';
import { Paragraph } from '@/components/ui/Paragraph/Paragraph';
import { ProductModal } from './ProductModal';

export const Products = () => {
    const [ productList, setProductList ] = useState<product[]>([]);
    const [ modal, setModal ] = useState<product | null>();
    
    useEffect(() => {
        // la idea es calcular los 8 numeros aleatorios y mostrar solo esos 8 items
        const arrayNum: number[] = arrayNumRandom(8, materialDeportivo.length);
        setProductList(arrayProductList(materialDeportivo, arrayNum));
        
    }, []);

    return (
        <section className="Products" id="Products">
            <div className="Products-contenedor">
                <h1 className="Products-h1">Ropa y material de esquí y montaña</h1>
                <h4 className="Products-h4">Desde 1995, más de 20 años de experiencia en la venta de material técnico de esquí y montaña por internet.</h4>
                <ul className="Products-grid">
                    { productList.length === 0
                        ? (
                            <Paragraph text='Cargando items ...'/>
                        ) : (
                            productList.map( element => (
                                <ProductCard 
                                    key={element.id}
                                    marca={element.marca}
                                    nombre={element.nombre}
                                    imagen={element.imagen}
                                    precio={element.precio}
                                    descuento={element.descuento}
                                    id={element.id}
                                    handleModal={ () => setModal(element) }
                                    handleCart={ () => setProductList([...element]) }
                                    />
                            ))
                        )
                    }    
                </ul>
            </div>   

            <ProductModal 
                product={modal}
                isOpen={!!modal} 
                onClose={ () => setModal(null) }
            />     
        </section>
    );
}
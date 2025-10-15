
import { ProductCard } from './ProductCard';
import { Paragraph } from '@/components/ui/Paragraph/Paragraph';

import { useEffect, useState } from 'react';
import { arrayNumRandom } from '@/utils/hooks/arrayNumRandom';
import { arrayProductList } from '@/utils/hooks/arrayProductList';

import { Data_Base } from '@/data/data';
import type { product, productsProps } from '@/utils/types/product';

import './Products.scss';

export const Products = ({ addToCart, addToVisited }: productsProps) => {
    const [ productList, setProductList ] = useState<product[]>([]);
    
    useEffect(() => {
        // la idea es calcular los 8 numeros aleatorios y mostrar solo esos 8 items
        const arrayNum: number[] = arrayNumRandom(8, Data_Base.length);
        setProductList(arrayProductList(Data_Base, arrayNum));   
    }, []);

    return (
        <section className="Products" id="Products">
            <div className="Products-contenedor">
                <h1 className="Products-h1">Ropa y material de esquí y montaña</h1>
                <h4 className="Products-h4">Desde 1995, más de 20 años de experiencia en la venta de material técnico de esquí y montaña por internet.</h4>
                <ul className="Products-grid">
                    { productList.length === 0
                        ? (
                            <Paragraph text='Cargando items ...' styleGreen={false}/>
                        ) : (
                            productList.map( element => (
                                <ProductCard 
                                    key={element.id}
                                    product={element}
                                    addToCart={addToCart}
                                    addToVisited={addToVisited}
                                />
                            ))
                        )
                    }    
                </ul>
            </div>   
        </section>
    );
}
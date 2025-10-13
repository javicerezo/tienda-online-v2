
import { ProductCard } from '../Products/ProductCard';

import type { productVisitedProps } from '@/utils/types/product';
import './ProductsVisited.scss';
// import { cargarStorage } from '@/utils/functions/storage';

export const ProductsVisited = ( {visited, addToCart, addToVisited }: productVisitedProps ) => {
    const visitedInverse = [...visited].reverse();

    return (
        <section className="ProductsVisited">
            { visited.length !== 0 && (
                <div className="ProductsVisited-contenedor">
                    <h2 className="ProductsVisited-h2">Últimos productos que has visitado</h2>
                    <ul className="ProductsVisited-grid">
                        { visitedInverse.map( element => (
                                <ProductCard 
                                    key={element.id}
                                    product={element}
                                    addToCart={addToCart}
                                    addToVisited={addToVisited}
                                />
                            ))
                        }    
                    </ul>
                </div>   
            )} 
        </section>
    )
}
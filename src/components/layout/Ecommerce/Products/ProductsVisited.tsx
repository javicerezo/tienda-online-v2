import { ProductCard } from './ProductCard';

import type { productVisitedProps } from '@/utils/types/product';
import '../Products/Products.scss';

export const ProductsVisited = ( {visited, addToCart, addToVisited }: productVisitedProps ) => {
    const visitedInverse = [...visited].reverse();

    return (
        <section className="Products">
            { visited.length !== 0 && (
                <>
                    <div className="Products-contenedorTitulos">
                        <h2 className="Products-h2">Últimos productos que has visitado</h2>
                    </div>
                    <ul className="Products-ul">
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
                </>   
            )} 
        </section>
    )
}
import { ProductCard } from './ProductCard';
import { Paragraph } from '@/components/ui/Paragraph/Paragraph';

import { useProducts } from '@/utils/hooks/useProducts';
import type { productsProps } from '@/utils/types/product';

import './Products.scss';

export const Products = ({ addToCart, addToVisited }: productsProps) => {
    const { randomProducts, loading } = useProducts();
    
    return (
        <section className="Products" id="Products">
            <div className='Products-contenedorTitulos'>
                <h1 className="Products-h1">Ropa y material de esquí y montaña</h1>
                <h4 className="Products-h4">Desde 1995, más de 20 años de experiencia en la venta de material técnico de esquí y montaña por internet.</h4>
            </div>
            <ul className="Products-ul">
                { loading === true
                    ? (
                        <Paragraph text='Cargando items ...' styleGreen={false}/>
                    ) : (
                        randomProducts.map( element => (
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
        </section>
    );
}
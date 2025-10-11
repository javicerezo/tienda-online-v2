import { arrayNumRandom } from '@/utils/functions/arrayNumRandom';
import { arrayProductList } from '@/utils/functions/arrayProductList';

import { Product } from './Product';
import { materialDeportivo } from '@/bd/baseDatos'

import './Products.scss';
import { productProps } from '@/utils/types/product';

export const Products = () => {
    // la idea es calcular los 8 numeros aleatorios y mostrar solo esos items
    const arrayNum: number[] = arrayNumRandom(8, materialDeportivo.length);
    const productList: productProps[] = arrayProductList(materialDeportivo, arrayNum);

    return (
        <section className="Products" id="Products">
            <div className="Products-contenedor">
                <h1 className="Products-h1">Ropa y material de esquí y montaña</h1>
                <h4 className="Products-h4">Desde 1995, más de 20 años de experiencia en la venta de material técnico de esquí y montaña por internet.</h4>
                <ul className="Products-grid">
                    { productList.map( element => (
                        <Product 
                            key={element.id}
                            id={element.id}
                            marca={element.marca}    
                            nombre={element.nombre}    
                            tipo={element.tipo}   
                            imagen={element.imagen} 
                            precio={element.precio}    
                            descuento={element.descuento} 
                        />
                    )) }    
                </ul>
            </div>        
        </section>
    );
}
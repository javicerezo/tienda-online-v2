import { roundResult } from '@/utils/functions/roundResult';

import Image from 'next/image';
import type { productCardProps } from '@/utils/types/product';

import './ProductCard.scss';

export const ProductCard = ( { marca, nombre, imagen, precio, descuento, id, handleModal, handleCart }: productCardProps ) => {
    const precioNew: number = roundResult(precio * ((100-descuento)/100));

    const addProduct = () => {
        handleCart();
        console.log("AÑADIENDO PRODUCTO A LA CESTA.")
    }

    return (
        <li className="Product">
            <div className={`Product-descuento ${descuento == 0 ? "Product-descuento--none" : ""} `}>
                <p>{descuento}%</p>
            </div>
            <div className='Product-img' onClick={ handleModal }>
                <Image 
                    width='200' height='300' 
                    src={imagen} 
                    loading="lazy" 
                    alt={`imagen del producto ${id}`} 
                />
            </div>                        
            <div className='Product-contenido'>
                <div className='Product-contenido--mod'>
                    <p className='Product-titulo'><span>{marca}</span></p>
                    <p className='Product-titulo'>{nombre}</p>
                </div>
                <div className ='Product-contenido--mod'>
                    { descuento === 0 
                        ? (
                            <p className='Product-precio'>{precio}€</p>                        
                        ) : (
                            <div className='Product-contenedorPrecios'>
                                <p className='Product-precio Product-precio--color'>{precioNew}€</p>  
                                <p className='Product-precio--old'>{precio}€</p>                        
                            </div>
                        )
                    }
                </div>
                <button className="Product-button Button Button--amarillo" data-id={id} onClick={ addProduct }>Añadir a la cesta</button>                    
            </div>
            <div className="Product-mensaje"></div>
        </li>
    )
}
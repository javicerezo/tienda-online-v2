import { roundResult } from '@/utils/functions/roundResult';
import { Paragraph } from '@/components/ui/Paragraph/Paragraph';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { productCardProps } from '@/utils/types/product';

import './ProductCard.scss';

export const ProductCard = ( { marca, nombre, imagen, precio, descuento, id, handleModal, handleCart }: productCardProps ) => {
    const precioNew: number = roundResult(precio * ((100-descuento)/100));
    const [ showMessage, setShowMessage ] = useState<boolean>(false);

    const addProduct = () => {
        handleCart();
        setShowMessage(true);
    }

    useEffect( () => {
        setTimeout( () => {
            setShowMessage(false);
        }, 3000)
    }, [showMessage]);

    return (
        <li className="ProductCard">
            <div className={`ProductCard-descuento ${descuento == 0 ? "ProductCard-descuento--none" : ""} `}>
                <p>{descuento}%</p>
            </div>
            <div className='ProductCard-img' onClick={ handleModal }>
                <Image 
                    width='200' height='300' 
                    src={imagen} 
                    loading="lazy" 
                    alt={`imagen del producto ${id}`} 
                />
            </div>                        
            <div className='ProductCard-contenido'>
                <div className='ProductCard-contenido--mod'>
                    <p className='ProductCard-titulo'><span>{marca}</span></p>
                    <p className='ProductCard-titulo'>{nombre}</p>
                </div>
                <div className ='ProductCard-contenido--mod'>
                    { descuento === 0 
                        ? (
                            <p className='ProductCard-precio'>{precio}€</p>                        
                        ) : (
                            <div className='ProductCard-contenedorPrecios'>
                                <p className='ProductCard-precio ProductCard-precio--color'>{precioNew}€</p>  
                                <p className='ProductCard-precio--old'>{precio}€</p>                        
                            </div>
                        )
                    }
                </div>
                <button className="ProductCard-button Button Button--amarillo" data-id={id} onClick={ addProduct }>Añadir a la cesta</button>                    
            </div>
            <div className="ProductCard-mensaje">
                {showMessage && (
                    <Paragraph text={"producto añadido al carrito"} styleGreen={true}/>
                )}
            </div>
        </li>
    )
}
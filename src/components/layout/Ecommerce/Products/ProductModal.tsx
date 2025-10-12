import { createPortal } from "react-dom";   // Para el modal se monte encima del body (no solo encima del componente Proyect)

import { roundResult } from "@/utils/functions/roundResult";
import { Paragraph } from "@/components/ui/Paragraph/Paragraph";
import { useEffect, useState, useRef } from 'react';

import Image from 'next/image';
import type { productModalProps } from "@/utils/types/product";

import './ProductModal.scss';

export const ProductModal = ( {product, onClose, handleCart }: productModalProps)  => {
    const precioNew: number = roundResult(product.precio * ((100-product.descuento)/100));
    const [ showMessage, setShowMessage ] = useState<boolean>(false);
    const  refContainerModal = useRef<HTMLDivElement| null>(null);

    const addProduct = () => {
        handleCart();
        setShowMessage(true);
    }

    useEffect( () => {
        setTimeout( () => {
            setShowMessage(false);
        }, 3000)
    }, [showMessage]);

    useEffect( () => {
        const timer = setTimeout( () => {
            if(refContainerModal.current) {
                refContainerModal.current.classList.toggle("ProductModal--show");
            }
        }, 200);

        // Limpiamos el timeOut del useEffect
        return (() => clearTimeout(timer));
    }, []);

    return createPortal (
        <div className="ProductModal" ref={refContainerModal}>
            <div className="ProductModal-screen">
                <div className='ProductModal-li'>
                    <div className={`ProductModal-descuento ${product.descuento === 0 ? "ProductModal-descuento--none" : ""} `}>
                        <p>{product.descuento}%</p>
                    </div>
                    <div className='ProductModal-img'>
                        <Image 
                            width='200' height='300' 
                            src={product.imagen} 
                            loading="lazy" 
                            alt={`imagen del producto ${product.id}`} 
                        />
                    </div>
                    <div className='ProductModal-contenido'>
                        <div className='ProductModal-contenido--mod'>
                            <p className='ProductModal-titulo'><span>{product.marca}</span></p>
                            <p className='ProductModal-titulo'>{product.nombre}</p>
                        </div>

                        { product.descuento === 0 
                            ? (
                                <p className='ProductModal-precio'>{product.precio}€</p>                        
                            ) : (
                                <div>
                                    <p className='ProductModal-precio'>{precioNew} €</p>  
                                    <div className='ProductModal-contenido--mod'>
                                        <p className='ProductModal-precio--old'>{product.precio} €</p>
                                        <p className='ProductModal-precio--descuento'>({product.descuento}%)</p>                        
                                    </div>
                                </div>
                            )
                        }
                        
                        <div className='ProductModal-caracteristicas'>
                            <p className='ProductModal-caracteristicas-p'>¡ENVÍOS Y DEVOLUCIONES GRATIS!</p>
                            <p className='ProductModal-caracteristicas-p ProductModal-caracteristicas-p--mod'>Ver condiciones</p>
                        </div>
                        <div className='ProductModal-contenido--mod ProductModal-button'>
                            <button className='Button Button--amarillo' data-id={product.id} onClick={addProduct}>Añadir a la cesta</button>
                        </div>                   
                    </div>
                    <button className="ProductModal-buttonX" onClick={onClose}>✕</button>
                    <div className='ProductModal-mensaje'>
                        {showMessage && (
                            <Paragraph text={"producto añadido al carrito"} styleGreen={true}/>
                        )}
                    </div> 
                </div>
            </div>
        </div>
        ,
        document.body    // Para el modal se monte encima del body (no solo encima del componente Proyect)
    )
}
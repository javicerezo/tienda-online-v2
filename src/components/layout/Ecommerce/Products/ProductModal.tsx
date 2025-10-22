import { createPortal } from "react-dom";   // Para el modal se monte encima del body (no solo encima del componente Proyect)

import { roundResult } from "@/utils/functions/roundResult";
import { useEffect, useRef, useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";

import { Paragraph } from "@/components/ui/Paragraph/Paragraph";
import Image from 'next/image';

import type { productModalProps, product } from "@/utils/types/product";
import './ProductModal.scss';

export const ProductModal = ( {product, onClose, addToCart }: productModalProps)  => {
    const  refContainerModal = useRef<HTMLDivElement | null>(null);
    const [ showMessage, setShowMessage ] = useState<boolean>(false);
    const { user, loading } = useAuth();

    // Aplicamos descuento si user está autenticado
    const effectiveDesc = user ? product.desc: 0;
    const newPrice: number = roundResult(product.price * ((100-effectiveDesc)/100));

    // MOTRAMOS EL MENSAJE Y AÑADIMOS AL CARRITO
    const handleBuyProduct = (product: product) => {
        setShowMessage(true);
        addToCart(product); 

        setTimeout( () => {
            setShowMessage(false);
        }, 3000)
    }

    useEffect( () => {
        const timer = setTimeout( () => {
            if(refContainerModal.current) refContainerModal.current.classList.add("ProductModal--show");
        }, 300);

        // Limpiamos el timeOut del useEffect
        return (() => clearTimeout(timer));
    }, []);

    const handleClose = () => {
        if(refContainerModal.current) refContainerModal.current.classList.remove("ProductModal--show");
        
        setTimeout( () => {
            onClose();
        }, 300);
    }

    if(loading) return null;

    return createPortal (
        <section className="ProductModal" ref={refContainerModal}>
            <div className="ProductModal-screen">
                <div className='ProductModal-li'>
                    <div className={`ProductModal-descuento ${effectiveDesc === 0 ? "ProductModal-descuento--none" : ""} `}>
                        <p>{effectiveDesc}%</p>
                    </div>
                    <div className='ProductModal-img'>
                        <Image 
                            width='200' height='300' 
                            src={product.image} 
                            loading="lazy" 
                            alt={`imagen del producto ${product.id}`} 
                        />
                    </div>
                    <div className='ProductModal-contenido'>
                        <div className='ProductModal-contenido--mod'>
                            <p className='ProductModal-titulo'><span>{product.brand}</span></p>
                            <p className='ProductModal-titulo'>{product.name}</p>
                        </div>

                        { effectiveDesc === 0 
                            ? (
                                <p className='ProductModal-precio'>{product.price}€</p>                        
                            ) : (
                                <div>
                                    <p className='ProductModal-precio'>{newPrice} €</p>  
                                    <div className='ProductModal-contenido--mod'>
                                        <p className='ProductModal-precio--old'>{product.price} €</p>
                                        <p className='ProductModal-precio--descuento'>({product.desc}%)</p>                        
                                    </div>
                                </div>
                            )
                        }
                        
                        <div className='ProductModal-caracteristicas'>
                            <p className='ProductModal-caracteristicas-p'>¡ENVÍOS Y DEVOLUCIONES GRATIS!</p>
                            <p className='ProductModal-caracteristicas-p ProductModal-caracteristicas-p--mod'>Ver condiciones</p>
                        </div>
                        <div className='ProductModal-contenido--mod ProductModal-button'>
                            <button className='Button Button--amarillo' onClick={() => handleBuyProduct(product)}>Añadir a la cesta</button>
                        </div>                   
                    </div>
                    <button className="ProductModal-buttonX" onClick={handleClose}>✕</button>
                    <div className='ProductModal-mensaje'>
                        {showMessage && (
                            <Paragraph text={"producto añadido al carrito"} styleGreen={true}/>
                        )}
                    </div> 
                </div>
            </div>
        </section>
        ,
        document.body    // Para el modal se monte encima del body (no solo encima del componente Proyect)
    )
}
import { roundResult } from '@/utils/hooks/roundResult';
import { Paragraph } from '@/components/ui/Paragraph/Paragraph';
import { ProductModal } from './ProductModal';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { product, productCardProps } from '@/utils/types/product';

import './ProductCard.scss';

export const ProductCard = ({ product, addToCart, addToVisited }: productCardProps) => {
    const { brand, name, image, price, desc, id } = product;
    const newPrice: number = roundResult(price * ((100-desc)/100));
    
    const [ modal, setModal ] = useState<product | null>(null);
    const [ showMessage, setShowMessage ] = useState<boolean>(false);

    // MOTRAMOS EL MENSAJE Y AÑADIMOS AL CARRITO
    const handleBuyProduct = (product: product) => {
        setShowMessage(true);
        addToCart(product); 
    }

    // MOSTRAMOS EL MODAL Y AGREGAMOS EL PRODUCTO A LOS VISITADOS
    const handleClickProduct = (product: product) => {
        setModal(product);
        addToVisited(product)
    }

    useEffect( () => {
        setTimeout( () => {
            setShowMessage(false);
        }, 3000)
    }, [showMessage]);

    return (
        <li className="ProductCard">
            <div className={`ProductCard-descuento ${desc == 0 ? "ProductCard-descuento--none" : ""} `}>
                <p>{desc}%</p>
            </div>
            <div className='ProductCard-img' onClick={ () => handleClickProduct(product) }>
                <Image 
                    width='200' height='300' 
                    src={image} 
                    loading="lazy" 
                    alt={`imagen del producto ${id}`} 
                />
            </div>                        
            <div className='ProductCard-contenido'>
                <div className='ProductCard-contenido--mod'>
                    <p className='ProductCard-titulo'><span>{brand}</span></p>
                    <p className='ProductCard-titulo'>{name}</p>
                </div>
                <div className ='ProductCard-contenido--mod'>
                    { desc === 0 
                        ? (
                            <p className='ProductCard-precio'>{price}€</p>                        
                        ) : (
                            <div className='ProductCard-contenedorPrecios'>
                                <p className='ProductCard-precio ProductCard-precio--color'> {newPrice}€</p>  
                                <p className='ProductCard-precio--old'>{price}€</p>                        
                            </div>
                        )
                    }
                </div>
                <button className="ProductCard-button Button Button--amarillo" onClick={ () => handleBuyProduct(product) }>Añadir a la cesta</button>                    
            </div>
            <div className="ProductCard-mensaje">
                {showMessage && (
                    <Paragraph text={"producto añadido al carrito"} styleGreen={true}/>
                )}
            </div>

            {/* CADA PRODUCTCARD SERÁ LA ENCARGADA DE LLAMAR AL COMPONENTE PRODUCTMODAL SI EL USUARIO HACE CLIC ENCIMA */}
            {modal && (
                <ProductModal 
                    product={modal}
                    onClose={ () => setModal(null) }
                    addToCart={addToCart}
                />     
            )}
        </li>
    )
}
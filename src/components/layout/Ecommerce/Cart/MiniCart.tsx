import Image from "next/image";

import { roundResult } from "@/utils/functions/roundResult";

import type { miniCartProps } from "@/utils/types/header";
import './MiniCart.scss';

export const MiniCart = ( {product, eliminateToCart}: miniCartProps ) => {
    const { brand, name, image, price, desc, id, quantity } = product;
    const newPrice: number = roundResult(price * ((100-desc)/100));

    return (
        <li className="MiniCart-secciones MiniCart-secciones--mod2">
            <div className="MiniCart-img">
                <Image 
                    width={200} height={300}
                    src={image}
                    alt="logo tienda deportes montaña" 
                    loading="lazy"
                />
            </div>
            <div className="MiniCart-contenido">
                <p><span className="MiniCart-span">{brand}</span> - {name}</p>
                <div className='MiniCart-precios'>
                    <p><span className="MiniCart-span">{newPrice} €</span></p>
                    <p>${desc}%) - <span className="MiniCart-span--old">{price}€</span></p>
                </div>
                <p>Cantidad:{quantity} <a href="#"  className="MiniCart-eliminar" onClick={() => eliminateToCart(id) }>Eliminar</a></p>
            </div>
        </li>
    )
}
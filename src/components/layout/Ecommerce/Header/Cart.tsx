import Image from "next/image";

import { roundResult } from "@/utils/hooks/roundResult";

import type { cartCardProps } from "@/utils/types/header";
import './Cart.scss';

export const Cart = ( {product, eliminateToCart}: cartCardProps ) => {
    const { brand, name, image, price, desc, id, quantity } = product;
    const newPrice: number = roundResult(price * ((100-desc)/100));

    return (
        <li className="Cart-secciones Cart-secciones--mod2">
            <div className="Cart-img">
                <Image 
                    width={200} height={300}
                    src={image}
                    alt="logo tienda deportes montaña" 
                    loading="lazy"
                />
            </div>
            <div className="Cart-contenido">
                <p><span className="Cart-span">{brand}</span> - {name}</p>
                <div className='Cart-precios'>
                    <p><span className="Cart-span">{newPrice} €</span></p>
                    <p>${desc}%) - <span className="Cart-span--old">{price}€</span></p>
                </div>
                <p>Cantidad:{quantity} <a href="#"  className="Cart-eliminar" onClick={() => eliminateToCart(id) }>Eliminar</a></p>
            </div>
        </li>
    )
}
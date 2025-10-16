import Image from "next/image";

import { roundResult } from "@/utils/functions/roundResult";

import type { cartMenuProps } from "@/utils/types/header";
import './CartMenu.scss';

export const CartMenu = ( {product, eliminateToCart}: cartMenuProps ) => {
    const { brand, name, image, price, desc, id, quantity } = product;
    const newPrice: number = roundResult(price * ((100-desc)/100));

    return (
        <li className="CartMenu-secciones CartMenu-secciones--mod2">
            <div className="CartMenu-img">
                <Image 
                    width={200} height={300}
                    src={image}
                    alt="logo tienda deportes montaña" 
                    loading="lazy"
                />
            </div>
            <div className="CartMenu-contenido">
                <p><span className="CartMenu-span">{brand}</span> - {name}</p>
                <div className='CartMenu-precios'>
                    <p><span className="CartMenu-span">{newPrice} €</span></p>
                    <p>${desc}%) - <span className="CartMenu-span--old">{price}€</span></p>
                </div>
                <p>Cantidad:{quantity} <a href="#"  className="CartMenu-eliminar" onClick={() => eliminateToCart(id) }>Eliminar</a></p>
            </div>
        </li>
    )
}
import type { cartElementProps } from "@/utils/types/header";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";

import { roundResult } from "@/utils/functions/roundResult";
import { useAuth } from "@/contexts/AuthContext";

export const CartElement = ( { product, eliminateToCart}: cartElementProps ) => {
    const { brand, name, image, price, desc, id, quantity, newPrice } = product;
    const { user, loading } = useAuth();

    // Aplicamos descuento si user está autenticado
    const effectiveDesc = user ? desc: 0;
    const saveMoney = roundResult(price*((effectiveDesc)/100));

    const effectivePrice = user ? newPrice : price;
    const totalPrice = roundResult(effectivePrice*quantity);

    if(loading) return null;

    return (
        <>
            <tr className="Cart-tr">
                <td className='Cart-td'>
                    <div className="Cart-tbody-picture">
                        <Image 
                            className="Cart-tbody-img"
                            width='200' height='300' 
                            src={image} 
                            loading="lazy" 
                            alt={`imagen del producto ${id}`} 
                        />
                    </div>
                    <div className='Cart-tbody-descripcion'>
                        <p className='Cart-tbody-p'><span>{brand}</span>{name}</p>
                        <p className='Cart-tbody-p'>Color: white/black  |  Talla: M-L</p>
                        <p className='Cart-tbody-p'>Entrega estimada el 5 de marzo con envío urgente</p>
                        <div className='Cart-tbody-iconos'>
                            <FaTrash color="blue"/>
                            <a href='#' className='Cart-tbody-a' onClick={ () => eliminateToCart(id) }>Eliminar</a>
                        </div>
                    </div>
                </td>
                <td className='Cart-td'>
                    <div className='Cart-tbody-precios'>
                        <p className='Cart-tbody-precio'>{price} €</p>                            
                        <p className='Cart-tbody-precio'>Descuento: {effectiveDesc} %</p>
                        <p className='Cart-tbody-precio'>Ahorras: {saveMoney} €</p>
                        <p className='Cart-tbody-precio'>Precio final: {effectivePrice} €</p>
                    </div>
                </td>
                <td className='Cart-td'>21 %</td>
                <td className='Cart-td'>{quantity}</td>
                <td className='Cart-td'>{totalPrice} €</td>
            </tr>
        </>
    )
}
import { roundResult } from "@/utils/functions/roundResult";
import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";

import { FaShoppingCart } from "react-icons/fa";
import { Paragraph } from "@/components/ui/Paragraph/Paragraph";
import Image from "next/image";

import type { cartProps } from "@/utils/types/header"
import './Cart.scss';
import { productCart } from "@/utils/types/product";

export const Cart = ( {cart, eliminateToCart, onClose}: cartProps ) => {
    const refContainerCart = useRef<HTMLDivElement | null>(null);

    const subTotal = roundResult(cart.reduce( (total, product) => total += product.price - product.quantity, 0));
    let gastosEnvio;
    if(subTotal == 0) {
        gastosEnvio = 0;
    } else {
        gastosEnvio = 5;
    }
    const subtotalPedido = subTotal + gastosEnvio;
    const ahorroTotal = roundResult(cart.reduce( (total, product) => total += product.price - (product.price*((100-product.desc)/100)), 0));

    const newPrice = (price: productCart['price'], desc: productCart['desc']): number => {
        return roundResult(price*((100-desc)/100));
    }
    
    const samePriceType = (quantity: productCart['quantity'], price: productCart['price'], desc: productCart['desc']): number => {
        return roundResult(quantity*(price*((100-desc)/100)));
    }
    const saveMoney = (price: productCart['price'], desc: productCart['desc']): number => {
        return roundResult(price*((100-desc)/100));
    } 

    useEffect( () => {
        const timer = setTimeout( () => {
            if(refContainerCart.current) refContainerCart.current.classList.add("ProductModal--show");
        }, 300);

        // Limpiamos el timeOut del useEffect
        return (() => clearTimeout(timer));
    }, []);

    const handleClose = () => {
        if(refContainerCart.current) refContainerCart.current.classList.remove("Cart--show");
        
        setTimeout( () => {
            onClose();
        }, 300);
    }

    return (
        createPortal(

            <section className="Cart" ref={refContainerCart}>
                <div className="Cart-screen">
                    <div className='Cart-contenedor'>
                        <div className='Cart-cabecera'>
                            <h2 className='Cart-h2'>Cesta de la compra</h2>
                            <button className="Cart-buttonX" onClick={handleClose}>✕</button>
                        </div>
                        <p className='Cart-p'>En la cesta de la compra puedes dejar temporalmente los productos que quieras,
                        pero debes tener en cuenta que el precio y la disponibilidad de los productos,
                        mientras no se tramite el pedido, están sujetos a cambio.</p>
                        <div className='Cart-contenedor-table'>
                            <table className='Cart-table'>
                                <thead className='Cart-thead'>
                                    <tr className='Cart-tr'>
                                    <th className='Cart-th'>Descripción del producto</th>
                                    <th className='Cart-th'>Precio por unidad</th>
                                    <th className='Cart-th'>IVA</th>
                                    <th className='Cart-th'>Cantidad</th>
                                    <th className='Cart-th'>Precio total</th>
                                    </tr>
                                </thead>
                                <tbody className='Cart-tbody'>   
                                    {cart.length === 0 ? (
                                        <Paragraph text="no hay productos en la cesta" styleGreen={false} />
                                    ) : (
                                        cart.map( element => (
                                            <>
                                                <tr className="Cart-tr">
                                                    <td className='Cart-td'>
                                                        <div className="Cart-tbody-picture">
                                                            <Image 
                                                                className="Cart-tbody-img"
                                                                width='200' height='300' 
                                                                src={element.image} 
                                                                loading="lazy" 
                                                                alt={`imagen del producto ${element.id}`} 
                                                            />
                                                        </div>
                                                        <div className='Cart-tbody-descripcion'>
                                                            <p className='Cart-tbody-p'><span>{element.brand}</span>{element.name}</p>
                                                            <p className='Cart-tbody-p'>Color: white/black  |  Talla: M-L</p>
                                                            <p className='Cart-tbody-p'>Entrega estimada el 5 de marzo con envío urgente</p>
                                                            <div className='Cart-tbody-iconos'>
                                                                {/* <i className="fa-solid fa-dumpster-fire"></i> */}
                                                                <a href='#' className='Cart-tbody-a' onClick={ () => eliminateToCart(element.id) }>Eliminar</a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='Cart-td'>
                                                        <div className='Cart-tbody-precios'>
                                                            <p className='Cart-tbody-precio'>{ newPrice(element.price, element.desc)} €</p>                            
                                                            <p className='Cart-tbody-precio'>Descuento: {element.desc}%</p>
                                                            <p className='Cart-tbody-precio'>Ahorras: {saveMoney(element.price, element.desc)} €</p>
                                                        </div>
                                                    </td>
                                                    <td className='Cart-td'>21%</td>
                                                    <td className='Cart-td'>{element.quantity}</td>
                                                    <td className='Cart-td'>{ samePriceType(element.quantity, element.price, element.desc) } €</td>
                                                </tr>
                                            </>
                                        ))
                                        
                                    )}                         
                                </tbody>
                            </table>
                        </div>
                        <div className='Cart-resultado'>
                            <div className='Cart-caja-botones'>
                                <button className='Cart-boton Button Button--amarillo' onClick={handleClose}>continuar comprando</button>
                                <div className='Cart-tramitar Button Button--amarillo'>
                                    <button className='Cart-boton' onClick={ () => console.log("PASARELA DE PAGO") }>tramitar</button>
                                    <FaShoppingCart />
                                </div>
                            </div>
                            <div className='Cart-detalle'>
                                <p className='Cart-detalle-p'>Subtotal <span>(IVA incluido):</span> ${subTotal} €</p>
                                <p className='Cart-detalle-p'>Gastos de envío <span>(IVA incluido):</span> ${gastosEnvio} €</p>                    
                                <p className='Cart-detalle-p'>Subtotal del pedido: ${subtotalPedido} €</p>
                                <p className='Cart-detalle-p'>Te has ahorrado <span>(IVA incluido):</span> ${ahorroTotal} €</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            ,
            document.body
        )
    )
}
import { createPortal } from "react-dom";

import { useRef, useEffect, useState } from "react";
import { auth } from "@/lib/firebase/firebase.client";

import { CartElement } from "./CartElement";
import { FaShoppingCart } from "react-icons/fa";
import { Paragraph } from "@/components/ui/Paragraph/Paragraph";

import type { cartProps } from "@/utils/types/header"
import './Cart.scss';

export const Cart = ( {cart, eliminateToCart, onClose}: cartProps ) => {
    const refContainerCart = useRef<HTMLDivElement | null>(null);

    const [ subTotalPrice, setSubtotalPrice ] = useState<number | null>(null);
    const [ sendPrice, setSendPrice ] = useState<number | null>(null);
    const [ totalPrice, setTotalPrice ] = useState<number | null>(null);
    const [ savingPrice, setSavingPrice ] = useState<number | null>(null);

    // Hacemos la petición de cálculo de precio
    useEffect( () => {
        const calcPrices = async () => {
        const token = await auth.currentUser?.getIdToken();
        const request = await fetch("/.netlify/functions/calcFinalPrice", {
            method: 'POST',
            headers: 
                { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            body: JSON.stringify(cart)
        })
    
        // Respuesta reject
        if(!request.ok) {
            setSubtotalPrice(0);
            setSendPrice(0);
            setTotalPrice(0);
            setSavingPrice(0);
            return
        }

        const res = await request.json();
        
        setSubtotalPrice(res.subTotalPrice);
        setSendPrice(res.sendPrice);
        setTotalPrice(res.totalPrice);
        setSavingPrice(res.savingPrice);
        return
    }

        calcPrices();
    }, [cart]);

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
                                        <tr>
                                            <td colSpan={5}>
                                                <Paragraph text="no hay productos en la cesta" styleGreen={false} />
                                            </td>
                                        </tr>
                                    ) : (
                                        cart.map( element => (
                                            <CartElement
                                                key={element.id}
                                                product={element}
                                                eliminateToCart={eliminateToCart}
                                            />
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
                                <p className='Cart-detalle-p'>Subtotal <span>(IVA incluido):</span> ${subTotalPrice} €</p>
                                <p className='Cart-detalle-p'>Gastos de envío <span>(IVA incluido):</span> ${sendPrice} €</p>                    
                                <p className='Cart-detalle-p'>Total del pedido: ${totalPrice} €</p>
                                <p className='Cart-detalle-p'>Te has ahorrado <span>(IVA incluido):</span> ${savingPrice} €</p>
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
import { Button } from "@/components/ui/Button/Button";
import { menuProps } from "@/utils/types/header";
import { CartMenu } from "../Cart/CartMenu";
import { Cart } from "../Cart/Cart";
import { Paragraph } from "@/components/ui/Paragraph/Paragraph";
import { FaCaretDown, FaShoppingCart, FaPhone, FaCommentDots, FaEnvelope } from "react-icons/fa";
import Link from "next/link";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase/firebase.client";

import './Menus.scss';

export const Menus = ( {cart, eliminateToCart, showCart, setShowCart}: menuProps ) => {
    const [ totalQuantity, setTotalQuantity ] = useState<number | null>(null);
    const [ subTotalPrice, setSubtotalPrice ] = useState<number | null>(null);
    const { user, loading } = useAuth();

    useEffect( () => {
        const calcFinalPrices = async () => {
            const token = await auth.currentUser?.getIdToken();
            const request = await fetch("/.netlify/functions/calcFinalPrice", {
                method: 'POST',
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },    
                body: JSON.stringify(cart)
            })
            
            const res = await request.json();

            // Respuesta reject
            if(!request.ok || !res.items) {
                setTotalQuantity(0);
                setSubtotalPrice(0);
                console.error("Error calculando carrito:", res.message);

                return
            }
            
            setTotalQuantity(res.totalQuantity);
            setSubtotalPrice(res.subTotalPrice);
            return
        }

        calcFinalPrices();
    }, [cart]);

    const handleClick = async () => {
        const token = await auth.currentUser?.getIdToken();

        // Petición para calcular precios en el backend
        const request1 = await fetch("/.netlify/functions/calcFinalPrice", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(cart)
        })
        
        const res1 = await request1.json();
        // respuesta reject
        if(!request1.ok || !res1.items) {   
            console.error("Error calculando carrito:", res1.message);
            return
        }

        // petición crear la sesión de pago en Stripe con los precios calculados anteriormente en la petición anterior.
        const request = await fetch("/.netlify/functions/create-checkout-session", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(res1.items)
        })
        
        const res = await request.json();
        // respuesta reject
        if(!request.ok) {   
            console.error("Error no ok:", res.message);
            return
        }
        
        if (res.url) {
            window.location.href = res.url;
        } else {
            console.error("Error al crear sesión de Stripe:", res);
        }
        
    }
    
    if (loading) return null;

    return (
        <div className='Menus'>
            <div className="Menus-cuenta">
                <p>Cuenta</p>
                <FaCaretDown className="Menus-cuenta-iconoFlecha"/>
                <div className="Menus-submenus ">
                    <div className="Submenus-cuenta Submenus-contenedor">
                        {!user ? (
                            <div className="Submenus-cuenta-secciones">
                                <div className="Submenus-cuenta-button">
                                    <Button title="log in" enlace="/user/login"/> 
                                </div>
                                <Link 
                                    className="Submenus-cuenta-p"
                                    href="/user/signup">
                                    <span className="Submenus-cuenta-span">¿Eres nuevo?</span>Crear una cuenta
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="Submenus-cuenta-secciones">
                                    <div className="Submenus-cuenta-div" >
                                        <h4>{ `Hola, ${user.displayName}` }</h4>   
                                        <Link 
                                            href="/user/profile">
                                            <h4 className="Submenus-cuenta-user">{ `${user.displayName?.charAt(0).toUpperCase()}` }</h4>
                                        </Link>                 
                                    </div>
                                </div>
                                <div className="Submenus-cuenta-secciones">
                                    <Link 
                                        className="Submenus-cuenta-h4"
                                        href="/user/profile">
                                        <h4>Mi Perfil</h4>
                                    </Link>
                                    <Link 
                                        href="/user/profile">
                                        <p className="Submenus-cuenta-p">- Datos personales</p>
                                        <p className="Submenus-cuenta-p">- Intereses</p>
                                        <p className="Submenus-cuenta-p">- Comunidad</p>
                                        <p className="Submenus-cuenta-p">- Estado de mis pedidos</p>
                                        <p className="Submenus-cuenta-p">- Devolver productos</p>
                                    </Link>                                
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="Menus-ayuda">
                <p>Ayuda</p>
                <FaCaretDown className="Menus-ayuda-iconoFlecha"/>
                <div className="Menus-submenus">
                    <div className="Submenus-ayuda Submenus-contenedor">
                        <h4 className="Submenus-ayuda-h4">¿Necestias ayuda?</h4>
                        <div className="Submenus-ayuda-secciones Submenus-ayuda-secciones--mod">
                            <FaPhone color="#ffc400" style={{ marginRight: '1rem' }}/>
                            <div>
                                <p>LLama al <span className="Submenus-ayuda-span">987 654 321</span></p>
                                <p>(horario de lunes a viernes de 9h a 19h)</p>
                            </div>
                        </div>
                        <div className="Submenus-ayuda-secciones Submenus-ayuda-secciones--mod">
                            <FaCommentDots color="#ffc400" style={{ marginRight: '1rem' }}/>
                            <div>
                                <p className="js-submenus-boton-chat"><span className="Submenus-ayuda-span">Chat online</span></p>
                                <p>Contacta en directo con uno de nuestros asesores</p>
                            </div>
                        </div>
                        <div className="Submenus-ayuda-secciones Submenus-ayuda-secciones--mod">
                            <FaEnvelope color="#ffc400" style={{ marginRight: '1rem' }}/>
                            <div>
                                <p className="js-submenus-boton-consulta"><span className="Submenus-ayuda-span">Envíanos tu consulta</span></p>
                                <p>Nuestros asesores te responderán en breve</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="Menus-cesta">
                <div className="Menus-cesta-dibujo">
                    <FaShoppingCart/>
                    <div className="Menus-cesta-numero">
                        {cart.length !== 0 ? (
                            <p>{totalQuantity}</p>
                        ) : (
                            <p>0</p>  
                        )}
                    </div>
                </div>
                <p className="Menus-cesta-p">Cesta</p>
                <FaCaretDown className="Menus-cesta-iconoFlecha"/>
                <div className="Menus-submenus">
                    <div className="Submenus-cesta Submenus-contenedor Submenus-contenedor--mod">
                        <ul className="Submenus-ul">
                            {cart.length === 0 ? (
                                <Paragraph 
                                    text={"En este momento no hay productos en tu cesta."}
                                    styleGreen={false}    
                                />
                            ) : (
                                cart.map( product => (
                                    <CartMenu 
                                        key={product.id}
                                        product={product}
                                        eliminateToCart={eliminateToCart}
                                    />
                                ))
                            )}
                        </ul>
                        {cart.length !== 0 && (
                            <div>
                                <div className="Submenus-separador">{`total: ${subTotalPrice}€`}</div>
                                <div className="Submenus-resultado">
                                    <p className="Submenus-verCesta" onClick={ () => setShowCart(true) }>Ver la cesta</p>
                                    <button className="Button Button--amarillo Submenus-resultado-button" onClick={handleClick}>tramitar</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* AL PRESIONAR "VER CESTA SE DESPLIEGA LA CESTA DE LA COMRPA CON LOS PRODCTOS AÑADIDOS" */}
            {showCart && (
                <Cart 
                    cart={cart}
                    eliminateToCart={eliminateToCart}
                    onClose={ () => setShowCart(false) }
                />
            )}
        </div>
    );
}
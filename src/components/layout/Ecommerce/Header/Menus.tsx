import { Button } from "@/components/ui/Button/Button";
import { menuProps } from "@/utils/types/header";
import { Cart } from "./Cart";
import { Paragraph } from "@/components/ui/Paragraph/Paragraph";
import { FaCaretDown, FaShoppingCart, FaPhone, FaCommentDots, FaEnvelope } from "react-icons/fa";

import { roundResult } from "@/utils/functions/roundResult";


import './Menus.scss';

export const Menus = ( {cart, eliminateToCart}: menuProps ) => {
    const totalQuantity = cart.reduce( (total, product) => total += product.quantity, 0);
    const totalPrice = roundResult(cart.reduce( (total, product) => total += product.quantity*product.price, 0));
    
    return (
        <div className='Menus'>
            <div className="Menus-cuenta">
                <p>Cuenta</p>
                <FaCaretDown className="Menus-cuenta-iconoFlecha"/>
                <div className="Menus-submenus ">
                    <div className="Submenus-cuenta Submenus-contenedor">
                        <div className="Submenus-cuenta-secciones">
                            <div className="Submenus-cuenta-button">
                                <Button title="log in" enlace="/login"/> 
                            </div>
                            <p className="Submenus-cuenta-p">
                                <span className="Submenus-cuenta-span">¿Eres nuevo?</span>Crear una cuenta
                            </p>
                        </div>
                        <div className="Submenus-cuenta-secciones">
                            <h4 className="Submenus-cuenta-h4">Mi Cuenta</h4>
                            <p className="Submenus-cuenta-p">- Estado de mis pedidos</p>
                            <p className="Submenus-cuenta-p">- Devolver productos</p>
                        </div>
                        <div className="Submenus-cuenta-secciones">
                            <h4 className="Submenus-cuenta-h4">Mi perfil</h4>
                            <p className="Submenus-cuenta-p">- Datos personales</p>
                            <p className="Submenus-cuenta-p">- Intereses</p>
                            <p className="Submenus-cuenta-p">- Comunidad</p>
                        </div>
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
                                    <Cart 
                                        key={product.id}
                                        product={product}
                                        eliminateToCart={eliminateToCart}
                                    />
                                ))
                            )}
                        </ul>
                        {cart.length !== 0 && (
                            <div>
                                <div className="Submenus-separador">{`total: ${totalPrice}€`}</div>
                                <div className="Submenus-resultado">
                                    <a href="#" className="Submenus-ver-cesta">Ver la cesta</a>
                                    <button className="Button Button--amarillo Submenus-resultado-button">pagar</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
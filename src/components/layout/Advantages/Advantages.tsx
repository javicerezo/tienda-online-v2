import { FaUndoAlt, FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import './Advantages.scss';

export const Advantages = () => {
    return (
        <section className="Advantages">
            <div className="Advantages-contenedor">
                <ul className="Advantages-ul">
                    <li className="Advantages-li">
                        <FaUndoAlt className="Advantages-icon"/>
                        <h4 className="Advantages-h4">Devoluciones gratis</h4>
                        <p className="Advantages-p">
                            Devuelve tus productos de forma <span>gratuita</span> con
                            <span>recogida en tu domicilio</span>, en un <span>punto de entrega</span>
                            o en una de <span>nuestras tiendas.</span>
                        </p>
                    </li>
                    <li className="Advantages-li">
                        <FaTruck className="Advantages-icon"/>
                        <h4 className="Advantages-h4">Envío gratis</h4>
                        <p className="Advantages-p">
                            Consigue <span>portes gratis</span> si tu pedido
                            es igual o superior a 49 € y envías a España península
                            o Baleares.
                        </p>
                    </li>
                    <li className="Advantages-li">
                        <FaMapMarkerAlt className="Advantages-icon"/>
                        <h4 className="Advantages-h4">Recogida gratis en tiendas</h4>
                        <p className="Advantages-p">
                            Recoge tu pedido en una de <span>nuestras tiendas</span> y
                            ahórrate los portes.
                        </p>
                    </li>
                </ul>
            </div>
        </section>
    );
}
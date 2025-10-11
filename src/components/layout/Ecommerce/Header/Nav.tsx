import './Nav.scss';
import { FaCaretDown } from "react-icons/fa";

export const Nav = () => {
    return (
        <nav className="Nav js-nav">
            <ul className="Nav-ul">
                <li className="Nav-li">
                    <div className="Nav-encabezado">
                        <p className="Nav-categoria">Hombre</p>
                        <FaCaretDown className='Nav-icon'/>
                    </div>
                    <ul className="Nav-subnav">
                        <li className="Nav-subnav-li">Chaquetas</li>
                        <li className="Nav-subnav-li">Camisetas</li>
                        <li className="Nav-subnav-li">Pantalones</li>
                        <li className="Nav-subnav-li">Chalecos</li>
                        <li className="Nav-subnav-li">Ropa interior</li>
                    </ul>
                </li>
                <li className="Nav-li">
                    <div className="Nav-encabezado">
                        <p className="Nav-categoria">Mujer</p>
                        <FaCaretDown className='Nav-icon'/>
                    </div>
                    <ul className="Nav-subnav">
                        <li className="Nav-subnav-li">Chaquetas</li>
                        <li className="Nav-subnav-li">Camisetas</li>
                        <li className="Nav-subnav-li">Pantalones</li>
                        <li className="Nav-subnav-li">Chalecos</li>
                        <li className="Nav-subnav-li">Ropa interior</li>
                    </ul>
                </li>
                <li className="Nav-li">
                    <div className="Nav-encabezado">
                        <p className="Nav-categoria">Niños</p>
                        <FaCaretDown className='Nav-icon'/>
                    </div>
                    <ul className="Nav-subnav">
                        <li className="Nav-subnav-li">Chaquetas</li>
                        <li className="Nav-subnav-li">Camisetas</li>
                        <li className="Nav-subnav-li">Pantalones</li>
                        <li className="Nav-subnav-li">Chalecos</li>
                        <li className="Nav-subnav-li">Ropa interior</li>
                    </ul>
                </li>
                <li className="Nav-li">
                    <div className="Nav-encabezado">
                        <p className="Nav-categoria">Calzado</p>
                        <FaCaretDown className='Nav-icon'/>
                    </div>
                    <ul className="Nav-subnav">
                        <li className="Nav-subnav-li">Botas de alta montaña</li>
                        <li className="Nav-subnav-li">Botas trekking</li>
                        <li className="Nav-subnav-li">Zapatillas running</li>
                        <li className="Nav-subnav-li">Pies de gato</li>
                        <li className="Nav-subnav-li">Lifestyles</li>
                    </ul>
                </li>
                <li className="Nav-li">
                    <div className="Nav-encabezado">
                        <p className="Nav-categoria">Esquí</p>
                        <FaCaretDown className='Nav-icon'/>
                    </div>
                    <ul className="Nav-subnav">
                        <li className="Nav-subnav-li">Tablas</li>
                        <li className="Nav-subnav-li">Fijaciones</li>
                        <li className="Nav-subnav-li">Botas</li>
                        <li className="Nav-subnav-li">Pieles de foca</li>
                        <li className="Nav-subnav-li">Bastones</li>
                    </ul>
                </li>
                <li className="Nav-li">
                    <div className="Nav-encabezado">
                        <p className="Nav-categoria">Material</p>
                        <FaCaretDown className='Nav-icon'/>
                    </div>
                    <ul className="Nav-subnav">
                        <li className="Nav-subnav-li">Escalada</li>
                        <li className="Nav-subnav-li">Esquí y raquetas</li>
                        <li className="Nav-subnav-li">Tiendas de campaña</li>
                        <li className="Nav-subnav-li">Material de farmacia</li>
                        <li className="Nav-subnav-li">Mochilas y bolsas</li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}
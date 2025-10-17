import { FaCaretDown } from "react-icons/fa";

import type { navProps } from '@/utils/types/header';
import './Nav.scss';

export const Nav = ( {showMenuBars, openSeeker, searchProductseeker}:navProps ) => {
    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        searchProductseeker(e.currentTarget.textContent);
        console.log(e.currentTarget.textContent)
        openSeeker();
    }

    return (
        <nav className={`Nav ${showMenuBars ? "Nav--show" : ""}`}>
            <ul className="Nav-ul">
                <li className="Nav-li">
                    <div className="Nav-encabezado">
                        <p className="Nav-categoria">Hombre</p>
                        <FaCaretDown className='Nav-icon'/>
                    </div>
                    <ul className="Nav-subnav">
                        <li className="Nav-subnav-li" onClick={handleClick}>Chaquetas</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Camisetas</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Pantalones</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Chalecos</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Ropa interior</li>
                    </ul>
                </li>
                <li className="Nav-li">
                    <div className="Nav-encabezado">
                        <p className="Nav-categoria">Mujer</p>
                        <FaCaretDown className='Nav-icon'/>
                    </div>
                    <ul className="Nav-subnav">
                        <li className="Nav-subnav-li" onClick={handleClick}>Chaquetas</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Camisetas</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Pantalones</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Chalecos</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Ropa interior</li>
                    </ul>
                </li>
                <li className="Nav-li">
                    <div className="Nav-encabezado">
                        <p className="Nav-categoria">Niños</p>
                        <FaCaretDown className='Nav-icon'/>
                    </div>
                    <ul className="Nav-subnav">
                        <li className="Nav-subnav-li" onClick={handleClick}>Chaquetas</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Camisetas</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Pantalones</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Chalecos</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Ropa interior</li>
                    </ul>
                </li>
                <li className="Nav-li">
                    <div className="Nav-encabezado">
                        <p className="Nav-categoria">Calzado</p>
                        <FaCaretDown className='Nav-icon'/>
                    </div>
                    <ul className="Nav-subnav">
                        <li className="Nav-subnav-li" onClick={handleClick}>Botas de alta montaña</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Botas trekking</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Zapatillas running</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Pies de gato</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Lifestyles</li>
                    </ul>
                </li>
                <li className="Nav-li">
                    <div className="Nav-encabezado">
                        <p className="Nav-categoria">Esquí</p>
                        <FaCaretDown className='Nav-icon'/>
                    </div>
                    <ul className="Nav-subnav">
                        <li className="Nav-subnav-li" onClick={handleClick}>Tablas</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Fijaciones</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Botas</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Pieles de foca</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Bastones</li>
                    </ul>
                </li>
                <li className="Nav-li">
                    <div className="Nav-encabezado">
                        <p className="Nav-categoria">Material</p>
                        <FaCaretDown className='Nav-icon'/>
                    </div>
                    <ul className="Nav-subnav">
                        <li className="Nav-subnav-li" onClick={handleClick}>Escalada</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Esquí y raquetas</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Tiendas de campaña</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Material de farmacia</li>
                        <li className="Nav-subnav-li" onClick={handleClick}>Mochilas y bolsas</li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}
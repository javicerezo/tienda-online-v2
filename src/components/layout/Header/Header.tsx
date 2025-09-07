import { Nav } from './Nav';
import { Menus } from './Menus';

import { FaBars, FaSearch, FaTruck, FaBox } from "react-icons/fa";
import './Header.scss';
import Image from 'next/image';

export const Header = () => {
    return (
        <header className="Header">
            <div className="Header-cabecera">
                <div className="Header-burger">
                    <FaBars />
                </div>
                <div className="Header-img">
                    <a href="https://javicerezo.github.io/tienda-online-v2/" target="_blank">
                        <Image 
                            width='140' height='60' 
                            src="/assets/imgs/logo.svg" 
                            alt="logo tienda deportes montaña" 
                            loading="lazy" 
                        />
                    </a>
                </div>
                <div className="Header-contenedorTitulo">
                    <h2 className="Header-h2">Esquí y montaña</h2>
                    <div className="Header-enlaces">
                        <a className="Header-a Header-a--activo" href="/Home">La tienda</a>
                        <a className="Header-a" href="/Blog">Blog escalada</a>
                        <a className="Header-a" href="/Club">Club montaña</a>
                    </div>
                </div>
                <div className="Header-centro">
                    <input className="Header-input" id="buscador" type="text" placeholder="Buscar..." />
                    <FaSearch />
                </div>
                <div className="Header-der">
                    <div className="Header-derArriba">
                        <div className="Header-caja">
                            <FaTruck />
                            <p><span>Portes Gratis</span><br></br> a partir de 49€</p>
                        </div>
                        <div className="Header-caja">
                            <FaBox />
                            <p><span>Devoluciones</span><br></br> gratis hasta 30 días</p>
                        </div>
                    </div>
                    <Menus />
                </div>
            </div>

            <Nav />
        </header>
    );
}
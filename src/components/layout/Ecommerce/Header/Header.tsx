'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


import { Nav } from './Nav';
import { Menus } from './Menus';

import { FaBars, FaSearch, FaTruck, FaBox } from "react-icons/fa";
import './Header.scss';

export const Header = () => {
    const pathName = usePathname();

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
                        <Link 
                            className={`Header-a ${pathName === "/" ? "Header-a--activo" : ""} `}
                            href="/">La tienda</Link>
                        <Link 
                            className={`Header-a ${pathName === "/blog" ? "Header-a--activo" : ""} `} 
                            href="/blog" target='_blank'>Blog escalada</Link>
                        <Link 
                            className={`Header-a ${pathName === "/club" ? "Header-a--activo" : ""} `} 
                            href="/club" target='_blank'>Club montaña</Link>
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
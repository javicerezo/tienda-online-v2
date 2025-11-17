'use client'

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import Link from 'next/link';
import { FaBars } from 'react-icons/fa';

import './Header.scss';

export const Header = () => {
    const pathName = usePathname();
    const [ showMenuBars, setShowMenuBars ] = useState<boolean>(false);

    const openMenuBars = () => {
        setShowMenuBars(!showMenuBars);
    }

    return (
        <section className={`Header ${pathName !== "/blog" ? "Header--mod" : ""} `}>
            <div className="Header-container">
                <div className="Header-burger" >
                    <FaBars onClick={openMenuBars}/>
                </div>
                <h2 className="Header-h2">Esquí y montaña</h2>
                <nav className={`Header-nav ${showMenuBars ? "Header-nav--show" : ""}`}>
                     <Link 
                        className={`Header-link ${pathName === "/blog" ? "Header-link--activo" : ""} `}
                        href="/blog">Inicio</Link>
                     <Link 
                        className={`Header-link ${pathName === "/blog/categories" ? "Header-link--activo" : ""} `}
                        href="/blog/categories">Artículos</Link>
                     <Link 
                        className={`Header-link ${pathName === "/blog/us" ? "Header-link--activo" : ""} `}
                        href="/blog/aboutUs">Nosotros</Link>
                     <Link 
                        className={`Header-link ${pathName === "/club" ? "Header-link--activo" : ""} `}
                        href="/club" target='_blank'>Club de Montaña</Link>
                     <Link 
                        className={`Header-link ${pathName === "/" ? "Header-link--activo" : ""} `}
                        href="/" target='_blank'>Tienda de Montaña</Link>
                </nav>
            </div>
        </section>
    );
}
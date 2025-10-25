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
        <section className='Header'>
            <div className="Header-container">
                <div className="Header-burger" >
                    <FaBars onClick={openMenuBars}/>
                </div>
                <h2 className="Header-h2">Esquí y montaña</h2>
                <nav className={`Header-nav ${showMenuBars ? "Header-nav--show" : ""}`}>
                     <Link 
                        className={`Header-link ${pathName === "/" ? "Header-link--activo" : ""} `}
                        href="/blog">Blog</Link>
                     <Link 
                        className={`Header-link ${pathName === "/blog/entradas" ? "Header-link--activo" : ""} `}
                        href="/blog/entradas">Artículos Blog</Link>
                     <Link 
                        className={`Header-link ${pathName === "/blog/nosotros" ? "Header-link--activo" : ""} `}
                        href="/blog/nosotros">Nosotros</Link>
                     <Link 
                        className={`Header-link ${pathName === "/club" ? "Header-link--activo" : ""} `}
                        href="/blog/club">Club de Montaña</Link>
                     <Link 
                        className={`Header-link ${pathName === "/" ? "Header-link--activo" : ""} `}
                        href="/blog/club">Tienda de Montaña</Link>
                </nav>
            </div>
        </section>
    );
}
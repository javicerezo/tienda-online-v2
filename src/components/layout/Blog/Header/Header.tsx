'use client'

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import Image from 'next/image';
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
                <div className="Header-img">
                    <Image 
                        width='140' height='60' 
                        src="/assets/imgs/blog/logo.svg" 
                        alt="logo tienda deportes montaña" 
                        loading="lazy" 
                    />
                </div>
                <h2 className="Header-h2">Esquí y montaña</h2>
                <nav className={`Header-nav ${showMenuBars ? "Header-nav--show" : ""}`}>
                     <Link 
                        className={`Header-link ${pathName === "/" ? "Header-link--activo" : ""} `}
                        href="/">La tienda</Link>
                     <Link 
                        className={`Header-link ${pathName === "/blog/entradas" ? "Header-link--activo" : ""} `}
                        href="/blog/entradas">Artículos Blog</Link>
                     <Link 
                        className={`Header-link ${pathName === "/blog/nosotros" ? "Header-link--activo" : ""} `}
                        href="/blog/nosotros">Nosotros</Link>
                     <Link 
                        className={`Header-link ${pathName === "/club" ? "Header-link--activo" : ""} `}
                        href="/blog/club">Club Montaña</Link>
                </nav>
            </div>
        </section>
    );
}
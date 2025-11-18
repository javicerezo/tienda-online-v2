'use client'

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { TbLetterX } from "react-icons/tb";

import './HeaderBlog.scss';

export const HeaderBlog = () => {
    const pathName = usePathname();
    const isArticles = pathName.startsWith("/blog/categories");
    const [ showMenuBars, setShowMenuBars ] = useState<boolean>(false);

    const openMenuBars = () => {
        setShowMenuBars(!showMenuBars);
    }

    return (
        <section className={`HeaderBlog ${pathName !== "/blog" ? "HeaderBlog--mod" : ""} `}>
            <div className="HeaderBlog-container">
                <div className="HeaderBlog-burger" onClick={openMenuBars}>
                    <FaBars className={`HeaderBlog-icon ${showMenuBars ? "HeaderBlog-icon--hidden" : "HeaderBlog-icon--visible"}`}/>
                    <TbLetterX className={`HeaderBlog-icon ${showMenuBars ? "HeaderBlog-icon--visible" : "HeaderBlog-icon--hidden"}`}/>  
                </div>
                <h2 className="HeaderBlog-h2">Esquí y montaña</h2>
                <nav className={`HeaderBlog-nav ${showMenuBars ? "HeaderBlog-nav--show" : ""}`}>
                     <Link 
                        className={`HeaderBlog-link ${pathName === "/blog" ? "HeaderBlog-link--activo" : ""} `}
                        href="/blog">Inicio</Link>
                     <Link 
                        className={`HeaderBlog-link ${isArticles  ? "HeaderBlog-link--activo" : ""} `}
                        href="/blog/categories">Artículos</Link>
                     <Link 
                        className={`HeaderBlog-link ${pathName === "/blog/aboutUs" ? "HeaderBlog-link--activo" : ""} `}
                        href="/blog/aboutUs">Nosotros</Link>
                     <Link 
                        className={`HeaderBlog-link ${pathName === "/club" ? "HeaderBlog-link--activo" : ""} `}
                        href="/club">Club de Montaña</Link>
                     <Link 
                        className={`HeaderBlog-link ${pathName === "/" ? "HeaderBlog-link--activo" : ""} `}
                        href="/">Tienda de Montaña</Link>
                </nav>
            </div>
        </section>
    );
}
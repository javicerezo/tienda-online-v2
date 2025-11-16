import { usePathname } from 'next/navigation';

import Link from 'next/link';

import './CategoryNav.scss';

export const CategoryNav = () => {
    const pathName = usePathname();

    return (
        <nav className='CategoryNav'>
            <ul className="CategoryNav-ul">
                <Link 
                    className={`CategoryNav-li ${pathName === `/blog/categories/rutas` ? "CategoryNav-li--mod" : ""} `}
                    href={`/blog/categories/rutas`}>Rutas</Link>
                <Link 
                    className={`CategoryNav-li ${pathName === `/blog/categories/noticias` ? "CategoryNav-li--mod" : ""} `}
                    href={`/blog/categories/noticias`}>Noticias</Link>
                <Link 
                    className={`CategoryNav-li ${pathName === `/blog/categories/consejos` ? "CategoryNav-li--mod" : ""} `}
                    href={`/blog/categories/consejos`}>Consejos</Link>
                <Link 
                    className={`CategoryNav-li ${pathName === `/blog/categories/reportajes` ? "CategoryNav-li--mod" : ""} `}
                    href={`/blog/categories/reportajes`}>Reportajes</Link>
                <Link 
                    className={`CategoryNav-li ${pathName === `/blog/categories/test` ? "CategoryNav-li--mod" : ""} `}
                    href={`/blog/categories/test`}>Test</Link>
                <Link 
                    className={`CategoryNav-li ${pathName === `/blog/categories/preparacion-fisica` ? "CategoryNav-li--mod" : ""} `}
                    href={`/blog/categories/preparacion-fisica`}>Preparación Física</Link>
            </ul>
        </nav>
    )
}
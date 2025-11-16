import { usePathname } from 'next/navigation';

import Link from 'next/link';

import './CategoryNav.scss';

export const CategoryNav = () => {
    const pathName = usePathname();

    return (
        <nav className='CategoryNav'>
            <ul className="CategoryNav-ul">
                <Link 
                    className={`CategoryNav-li ${pathName === "/blog" ? "CategoryNav-li--mod" : ""} `}
                    href={`/blog/categories/rutas`}>Rutas</Link>
                <Link 
                    className={`CategoryNav-li ${pathName === "/" ? "" : ""} `}
                    href={`/blog/categories/noticias`}>Noticias</Link>
                <Link 
                    className={`CategoryNav-li ${pathName === "/" ? "" : ""} `}
                    href={`/blog/categories/consejos`}>Consejos</Link>
                <Link 
                    className={`CategoryNav-li ${pathName === "/" ? "" : ""} `}
                    href={`/blog/categories/reportajes`}>Reportajes</Link>
                <Link 
                    className={`CategoryNav-li ${pathName === "/" ? "" : ""} `}
                    href={`/blog/categories/test`}>Test</Link>
                <Link 
                    className={`CategoryNav-li ${pathName === "/" ? "" : ""} `}
                    href={`/blog/categories/preparación-física`}>Preparación Física</Link>
            </ul>
        </nav>
    )
}
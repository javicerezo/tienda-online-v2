import { usePathname } from 'next/navigation';

import Link from 'next/link';

import './CategoryNav.scss';

export const CategoryNav = () => {
    const pathName = usePathname();

    return (
        <nav className='CategoryNav'>
            <ul className="CategoryNav-ul">
                <Link 
                    className={`CategoryNav-li ${pathName === "/" ? "" : ""} `}
                    href="">Rutas</Link>
                <Link 
                    className={`CategoryNav-li ${pathName === "/" ? "" : ""} `}
                    href="">Noticias</Link>
                <Link 
                    className={`CategoryNav-li ${pathName === "/" ? "" : ""} `}
                    href="">Consejos</Link>
                <Link 
                    className={`CategoryNav-li ${pathName === "/" ? "" : ""} `}
                    href="">Reportajes</Link>
                <Link 
                    className={`CategoryNav-li ${pathName === "/" ? "" : ""} `}
                    href="">Preparación Física</Link>
            </ul>
        </nav>
    )
}
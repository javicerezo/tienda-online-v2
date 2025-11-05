import Image from 'next/image';
import Link from 'next/link';

import './Article.scss';

export const Article = () => {
    return (
        <li className='Article-container'>
            <Link href="">
                <Image 
                    className='Article-img'
                    width='140' height='60' 
                    src="/assets/imgs/blog/portada2.jpg" 
                    alt="logo tienda deportes montaña" 
                    loading="lazy" 
                /> 
            </Link>
            
            <div>
                <Link
                    className='Article-title'
                    href="enlace al artículo">
                    <h5>Nombre del artículo</h5>
                </Link>
                <div className="Article-box">
                    <Link
                        className='Article-category'
                        href="enlace al artículo">
                        categoría del artículo
                    </Link>
                    <Link
                        className='Article-date'
                        href="enlace al artículo">
                        fecha del artículo
                    </Link>
                </div>
                <p className="Article-text">Entrada del artículo</p>
            </div>
        </li>
    )
}
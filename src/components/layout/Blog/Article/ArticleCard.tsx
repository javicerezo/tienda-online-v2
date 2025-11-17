import Image from 'next/image';
import Link from 'next/link';

import type { articleProps } from '@/utils/types/new';

import './ArticleCard.scss';

export const ArticleCard = ( {element}: articleProps) => {
    const { categoria, createdAt, desarrollo, titulo, slug, imagen } = element;

    /**
     * Formatea la fecha para mostrarla 
     */
    const dateLabel = createdAt
    ? createdAt.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

    return (
        <li className='ArticleCard'>
            <div className='ArticleCard-container'>
                <Link href={`/blog/categories/${categoria}/${slug}`}>
                    <Image 
                        className='ArticleCard-img'
                        width={140} height={60}
                        src={`/assets/imgs/blog/${imagen}`} 
                        alt="imagen" 
                        loading="lazy" 
                    /> 
                </Link>
                
                <div>
                    <Link
                        className='ArticleCard-title'
                        href={`/blog/categories/${categoria}/${slug}`}>
                        <h5>{titulo}</h5>
                    </Link>
                    <div className="ArticleCard-box">
                        <Link
                            className='ArticleCard-category'
                            href={`/blog/categories/${categoria}`}>
                            {categoria}
                        </Link>
                        <p className='ArticleCard-date'>{dateLabel}</p>
                    </div>
                    <p className="ArticleCard-text">{desarrollo}</p>
                </div>
            </div>
        </li>
    )
}
import Image from 'next/image';
import type { productProps } from '@/utils/types/product';

import './Product.scss';

export const Product = ({ marca, nombre, imagen, precio, descuento, id }: productProps) => {
    const precioNew: number = 2;

    return (
        <li className="Product">
            <div className='Product-descuento'>
                <p>{descuento}%</p>
            </div>
            <div className='Product-img'>
                <Image 
                    width='200' height='300' 
                    src={imagen} 
                    loading="lazy" 
                    alt={`imagen del producto ${id}`} 
                />
            </div>                        
            <div className='Product-contenido'>
                <div className='Product-contenido--mod'>
                    <p className='Product-titulo'><span>{marca}</span></p>
                    <p className='Product-titulo'>{nombre}</p>
                </div>
                <div className ='Product-contenido--mod'>
                    <p className='Product-precio'>{precioNew} €</p>  
                    <p className='Product-precio--old js-precio--old'>{precio} €</p>                        
                </div>
                <button className="Product-button Button Button--amarillo" data-id={id}>Añadir a la cesta</button>                    
            </div>
            <div className="${componente}__mensaje"></div>
        </li>
    )
}
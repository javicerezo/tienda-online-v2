import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { Paragraph } from '@/components/ui/Paragraph/Paragraph';
import { ProductCard } from '../Products/ProductCard';

import { useEffect, useRef } from 'react';

import type { seekerProps } from '@/utils/types/seeker';
import './Seeker.scss';

export const Seeker = ({ showSeeker, matchArray, onClose, searchProductseeker, addToCart, addToVisited }: seekerProps) => {
    const seekerContainerRef = useRef<HTMLDivElement>(null);

    const onChange = (e: string) => {
        searchProductseeker(e);
    }
    
    const handleClick = (e: string) => {
        searchProductseeker(e);
    }

    useEffect( () => {
        setTimeout(() => {
            if(seekerContainerRef.current) seekerContainerRef.current.classList.add("Seeker--show");
        }, 100);
    }, [showSeeker]);

    const handleClose = () => {
        if(seekerContainerRef.current) seekerContainerRef.current.classList.remove("Seeker--show");
        
        setTimeout( () => {
            onClose();
        }, 500);
    }

    return (
        <section className="Seeker" ref={seekerContainerRef}>
            <div className='Seeker-contenedor'>
                <div className='Seeker-cabecera'>
                    <div className='Seeker-logo'>
                        <a href="https://javicerezo.github.io/tienda-online/">
                            <Image 
                                width='140' height='60' 
                                src="/assets/imgs/logo.svg" 
                                alt="logo tienda deportes montaña" 
                                loading="lazy" 
                            />
                        </a>
                    </div>
                    <div className="Seeker-form">
                        <input className="Seeker-input" id="buscador" type="text" placeholder="Buscar..." onChange={ (e) => onChange(e.target.value) }/>
                        <FaSearch />
                    </div>
                    <button className="Seeker-close" onClick={handleClose}>✕</button>
                </div>
                <div className='Seeker-contenido'>
                    <div className='Seeker-productos-populares'>
                        <p className='Seeker-p'>Búsquedas populares</p>
                        <ul className='Seeker-ul-populares'>
                            <li className='Seeker-li-populares' onClick={ () => handleClick('Pies de gato') }>Pies de gato</li>
                            <li className='Seeker-li-populares' onClick={ () => handleClick('Grifone') }>Grifone</li>
                            <li className='Seeker-li-populares' onClick={ () => handleClick('Sacos de dormir') }>Sacos de dormir</li>
                            <li className='Seeker-li-populares' onClick={ () => handleClick('Petzl') }>Petzl</li>
                            <li className='Seeker-li-populares' onClick={ () => handleClick('La Sportiva') }>La Sportiva</li>
                            <li className='Seeker-li-populares' onClick={ () => handleClick('Cuerdas') }>Cuerdas</li>
                            <li className='Seeker-li-populares' onClick={ () => handleClick('Patagonia') }>Patagonia</li>
                        </ul>
                    </div>
                    <div className='Seeker-productos-buscar'>
                        <p className='Seeker-p'>Productos recomendados</p>
                        <ul className='Seeker-ul-buscar'>
                            {matchArray.length === 0 ? (
                                <Paragraph text={"¿Qué es lo que estás buscando?"} styleGreen={false}/>
                            ) : (
                                matchArray.map( element => (
                                    <ProductCard 
                                        key={element.id}
                                        product={element}
                                        addToCart={addToCart}
                                        addToVisited={addToVisited}
                                    />
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
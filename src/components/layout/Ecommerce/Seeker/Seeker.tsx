
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';

import type { seekerProps } from '@/utils/types/seeker';
import './Seeker.scss';
import { useEffect, useRef } from 'react';

export const Seeker = ({onClose, showSeeker}: seekerProps) => {
    const seekerContainerRef = useRef<HTMLDivElement>(null);

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
                        <input className="Seeker-input" id="buscador" type="text" placeholder="Buscar..." />
                        <FaSearch />
                    </div>
                    <button className="Seeker-close" onClick={handleClose}>✕</button>
                </div>
                <div className='Seeker-contenido'>
                    <div className='Seeker-productos-populares'>
                        <p className='Seeker-p'>Búsquedas populares</p>
                        <ul className='Seeker-ul-populares'>
                            <li className='Seeker-li-populares'>Pies de gato</li>
                            <li className='Seeker-li-populares'>Grifone</li>
                            <li className='Seeker-li-populares'>Sacos de dormir</li>
                            <li className='Seeker-li-populares'>Petzl</li>
                            <li className='Seeker-li-populares'>La Sportiva</li>
                            <li className='Seeker-li-populares'>Cuerdas</li>
                            <li className='Seeker-li-populares'>Patagonia</li>
                        </ul>
                    </div>
                    <div className='Seeker-productos-buscar'>
                        <p className='Seeker-p'>Productos recomendados</p>
                        <ul className='Seeker-ul-buscar js-buscador-ul-buscar'>
                            {/* {   INSERTAR DINÁMICAMENTE LOS PRODUCTOS QUE COINCIDEN CON EL BUSCADOR      } */}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
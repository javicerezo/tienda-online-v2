import { Button } from '@/components/ui/Button/Button';

interface topProps {
    showCart:boolean;
}

import './Top.scss';

export const Top = ( {showCart}: topProps ) => {
    return (
        <section className={`Portada ${showCart ? "Portada--high" : ""}`}>
            <div className="Portada-foto">
            </div>
            <div className='Portada-boton'>
                <Button title={"ver ofertas"} enlace='#Products'/>
            </div>
        </section>
    );
}
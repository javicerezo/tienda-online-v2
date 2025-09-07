import { Button } from '@/components/ui/Button/Button';
import './Portada.scss';

export const Portada = () => {
    return (
        <section className="Portada">
            <div className="Portada-foto">
            </div> 
            <div className="Portada-cesta c-cesta js-cesta">
            </div>
            <div className='Portada-boton'>
                <Button title={"ver ofertas"} enlace='Items'/>
            </div>
        </section>
    );
}
import { Button } from '@/components/ui/Button/Button';
import './Top.scss';

export const Top = () => {
    return (
        <section className="Portada">
            <div className="Portada-foto">
            </div>
            <div className='Portada-boton'>
                <Button title={"ver ofertas"} enlace='Products'/>
            </div>
        </section>
    );
}
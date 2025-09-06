import { Button } from '@/components/ui/Button/Button';
import './Portada.scss';

export const Portada = () => {
    return (
        <section className="Portada">
            <div className="Portada-foto">
            </div> 
            <div className="Portada-cesta c-cesta js-cesta">
            </div>
            <Button title={"ver ofertas"}/>
        </section>
    );
}
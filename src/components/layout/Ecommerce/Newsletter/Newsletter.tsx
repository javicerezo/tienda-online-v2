import { Button } from '@/components/ui/Button/Button';
import './Newsletter.scss';

export const Newsletter = () => {
    return (
        <section className="Newsletter o-container-100">
            <div className="Newsletter-contenedor">
                <h2 className="Newsletter-h2">
                    Únete a nuestra Newsletter
                </h2>
                <h4 className="Newsletter-h4">
                    Recibe nuestras novedades, ofertas y promociones.
                </h4>
                <form className="Newsletter-form js-newsletter-form" action="" method="" >
                    <input className="Newsletter-input js-newsletter-input" type="email" name="emailNewsletter" />
                    <label className="Newsletter-label">Tu dirección de email</label>
                    <div className="Newsletter-form-radio">
                        <div className="Newsletter-radio">
                            <input type="radio" name="sexoHombre" />
                            <label>Hombre</label>
                        </div>
                        <div className="Newsletter-radio">
                            <input type="radio" name="sexoMujer" />
                            <label>Mujer</label>
                        </div>
                    </div>
                    <button className="Newsletter-boton c-button c-button--amarillo 
                    u-cursor--not-allowed u-opacity--50 js-newsletter-enviar" 
                    type="submit">Suscribirme</button>
                    {/* <Button title='Suscribirme' enlace=''/> */}
                </form>
                <div className="js-newsletter-contenedor"></div>
                <div className="Newsletter-spinner u-display--none js-newsletter-spinner">
                    <div className="sk-chase">
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
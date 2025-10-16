import { useState } from 'react';
import './Newsletter.scss';
import { Paragraph } from '@/components/ui/Paragraph/Paragraph';

export const Newsletter = () => {
    const [ email, setEmail ] = useState<string>();    
    const [ statusEmail, setStatusEmail ] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatusEmail("sending");

        const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);

        // Validamos ligéramente y mostramos mensaje con 3 segundos de retraso
        setTimeout( () => {
            if(formData.get('email') == '') {
                setStatusEmail('error');
            } else {
                setStatusEmail('success');
                setEmail(formData.get('email')?.toString());
            }
            setTimeout( () => {
                setStatusEmail('idle');
                form.reset();
            }, 3000);
        }, 4000);
        console.log(email)
    }

    return (
        <section className="Newsletter o-container-100">
            <div className="Newsletter-contenedor">
                <h2 className="Newsletter-h2">
                    Únete a nuestra Newsletter
                </h2>
                <h4 className="Newsletter-h4">
                    Recibe nuestras novedades, ofertas y promociones.
                </h4>
                <form className="Newsletter-form" onSubmit={handleSubmit}>
                    <input 
                        className="Newsletter-input" 
                        type="email" 
                        name="email" 
                        placeholder='Tu dirección de email'
                        required
                    />
                    <button className="Newsletter-boton Button Button--amarillo" type='submit'>Suscribirme</button>
                </form>
                
                <div className={`Newsletter-spinner ${statusEmail === "sending" ? "Newsletter-spinner--show" : ""}`}>
                    <div className="sk-chase">
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                        <div className="sk-chase-dot"></div>
                    </div>
                </div>
                {statusEmail === "success" && (
                    <Paragraph text='suscrito correctamente. gracias' styleGreen={true} />
                )}
                {statusEmail === "error" && (
                    <Paragraph text='revisa el email escrito e inténtalo de nuevo por favor' styleGreen={false} />
                )}
            </div>
        </section>
    );
}
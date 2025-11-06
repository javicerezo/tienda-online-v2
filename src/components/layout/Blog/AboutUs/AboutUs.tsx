import { useState } from 'react';
import Image from 'next/image';
import { Paragraph } from '@/components/ui/Paragraph/Paragraph';

import './AboutUs.scss';
import '@/components/ui/Button/Button.scss';

export const AboutUs = () => {
    const [ mail, setMail ] = useState<string>();    
    const [ status, setStatus ] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");

        const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);

        // Validamos ligéramente y mostramos mensaje con 3 segundos de retraso
        setTimeout( () => {
            if(formData.get('email') == '') {
                setStatus('error');
            } else {
                setStatus('success');
                setMail(formData.get('email')?.toString());
            }
            setTimeout( () => {
                setStatus('idle');
                form.reset();
            }, 3000);
        }, 4000);
        console.log(mail)
    }

    return (
        <section className="AboutUs">
            <h2 className="AboutUs-h2">Sobre Nosotros</h2>
            <h3 className="AboutUs-h3">¿Quién soy?</h3>
            <p className="AboutUs-p">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere voluptatem adipisci sint veniam corrupti. Ea neque nemo dolorem asperiores distinctio totam similique deleniti reprehenderit, molestias fugiat temporibus cupiditate minus ipsa?Asperiores voluptates quas repudiandae iste iure molestiae aut, reprehenderit commodi amet ipsam unde expedita. Culpa soluta, voluptas inventore quidem commodi recusandae quia, quis temporibus nesciunt magni ea esse nemo omnis?Quia ut tempora laborum ab porro alias odio numquam repellat voluptatum sequi quas veniam vel nostrum quam aut molestias, itaque dolore dolorem labore possimus earum? Reiciendis minima labore amet. </p>
            <p className="AboutUs-p">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere voluptatem adipisci sint veniam corrupti. Ea neque nemo dolorem asperiores distinctio totam similique deleniti reprehenderit, molestias fugiat temporibus cupiditate minus ipsa?Asperiores voluptates quas repudiandae iste iure molestiae aut, reprehenderit commodi amet ipsam unde expedita. Culpa soluta, voluptas inventore quidem commodi recusandae quia, quis temporibus nesciunt magni ea esse nemo omnis?Quia ut tempora laborum ab porro alias odio numquam repellat voluptatum sequi quas veniam vel nostrum quam aut molestias, itaque dolore dolorem labore possimus earum? Reiciendis minima labore amet. </p>
            
            <div className='AboutUs-img'>
                <Image 
                    width='850' height='550' 
                    src="/assets/imgs/blog/nosotros1.jpg" 
                    alt="logo tienda deportes montaña" 
                    loading="lazy" 
                />    
            </div>

            <p className="AboutUs-p">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere voluptatem adipisci sint veniam corrupti. Ea neque nemo dolorem asperiores distinctio totam similique deleniti reprehenderit, molestias fugiat temporibus cupiditate minus ipsa?Asperiores voluptates quas repudiandae iste iure molestiae aut, reprehenderit commodi amet ipsam unde expedita. Culpa soluta, voluptas inventore quidem commodi recusandae quia, quis temporibus nesciunt magni ea esse nemo omnis?Quia ut tempora laborum ab porro alias odio numquam repellat voluptatum sequi quas veniam vel nostrum quam aut molestias, itaque dolore dolorem labore possimus earum? Reiciendis minima labore amet. </p>
            
            <form className="AboutUs-form" onSubmit={handleSubmit}>
                <h4 className='AboutUs-h4'>Newsletter</h4>
                <fieldset className='AboutUs-fieldset'>
                    <input 
                        className="AboutUs-input" 
                        type="email" 
                        name="email" 
                        placeholder='Tu dirección de email'
                        required
                    />
                    <button className='AboutUs-button Button Button--amarillo' type='submit'>Enviar</button>
                </fieldset>
            
                {/* MENSAJE DE FEEDBACK */}
                <div className='AboutUs-response'>
                    <div className={`AboutUs-spinner ${status === "sending" ? "AboutUs-spinner--show" : ""}`}>
                        <div className="sk-chase">
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                            <div className="sk-chase-dot"></div>
                        </div>
                    </div>
                    {status === "success" && (
                        <Paragraph text='suscrito correctamente. gracias' styleGreen={true} />
                    )}
                    {status === "error" && (
                        <Paragraph text='revisa el email escrito e inténtalo de nuevo por favor' styleGreen={false} />
                    )}
                </div>
            </form>

        </section>
    )
}
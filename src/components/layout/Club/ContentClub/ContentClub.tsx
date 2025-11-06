import { useState } from 'react';

import Image from 'next/image';
import { Paragraph } from '@/components/ui/Paragraph/Paragraph';

import './ContentClub.scss';
import '@/components/ui/Button/Button.scss';

export const ContentClub = () => {
    const [ status, setStatus ] = useState<"idle" | "sending" | "success" | "error">("idle");
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");

        const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);

        // Validamos ligéramente y mostramos mensaje con 3 segundos de retraso
        setTimeout( () => {
            if((formData.get('name') == '') || ((formData.get('email') == '')) || ((formData.get('textarea') == ''))) {
                setStatus('error');
            } else {
                setStatus('success');
            }
            setTimeout( () => {
                setStatus('idle');
                form.reset();
            }, 3000);
        }, 4000);
    }

    return (
        <section className='ContentClub'>
            <h2 className="ContentClub-h2">Club de montaña</h2>
            <div className="ContentClub-paragraph">
                <p className='ContentClub-paragraph-p'>¿Quieres salir a la montaña y no encuentras compañeros?, ¿Necesitas que alguien con experiencia te enseñe escalada, barranquismo, esquí...? No busques más, nos ha encontrado. Apúntate a nuestro club y comienza a disfrutar de la montaña en todas sus facetas.</p>
            </div>
            <div className="ContentClub-container">
                <div className="ContentClub-images">
                    <p className="ContentClub-images-p">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa delectus dolor nobis ullam quibusdam saepe, commodi, facilis minus dolorum sit voluptates corrupti. Earum fugiat quis voluptatum quia voluptate a fugit?Quo eius, quos quidem exercitationem dolor quod minima esse laboriosam minus velit repellendus illo porro labore odit repudiandae suscipit sit! Impedit explicabo rem aspernatur, voluptatem facere laudantium id delectus obcaecati.Aspernatur nobis veritatis atque ab dolor nesciunt dolorem sit veniam eligendi repellat odio libero, magnam nihil pariatur possimus autem harum voluptas aperiam delectus quam suscipit aut ipsa et?</p>
                    <div className="ContentClub-images-img">
                        <Image 
                            width='350' height='233' 
                            src="/assets/imgs/blog/club1.jpg" 
                            alt="logo tienda deportes montaña" 
                            loading="lazy" 
                        />
                    </div>
                </div>
                <div className="ContentClub-images--mod">
                    <p className="ContentClub-images-p">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa delectus dolor nobis ullam quibusdam saepe, commodi, facilis minus dolorum sit voluptates corrupti. Earum fugiat quis voluptatum quia voluptate a fugit?Quo eius, quos quidem exercitationem dolor quod minima esse laboriosam minus velit repellendus illo porro labore odit repudiandae suscipit sit! Impedit explicabo rem aspernatur, voluptatem facere laudantium id delectus obcaecati.Aspernatur nobis veritatis atque ab dolor nesciunt dolorem sit veniam eligendi repellat odio libero, magnam nihil pariatur possimus autem harum voluptas aperiam delectus quam suscipit aut ipsa et?</p>
                    <div className="ContentClub-images-img">
                        <Image 
                            width='350' height='233' 
                            src="/assets/imgs/blog/club2.jpg" 
                            alt="logo tienda deportes montaña" 
                            loading="lazy" 
                        />
                    </div>
                </div>
                <div className="ContentClub-images">
                    <p className="ContentClub-images-p">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa delectus dolor nobis ullam quibusdam saepe, commodi, facilis minus dolorum sit voluptates corrupti. Earum fugiat quis voluptatum quia voluptate a fugit?Quo eius, quos quidem exercitationem dolor quod minima esse laboriosam minus velit repellendus illo porro labore odit repudiandae suscipit sit! Impedit explicabo rem aspernatur, voluptatem facere laudantium id delectus obcaecati.Aspernatur nobis veritatis atque ab dolor nesciunt dolorem sit veniam eligendi repellat odio libero, magnam nihil pariatur possimus autem harum voluptas aperiam delectus quam suscipit aut ipsa et?</p>
                    <div className="ContentClub-images-img">
                        <Image 
                            width='350' height='233' 
                            src="/assets/imgs/blog/club3.jpg" 
                            alt="logo tienda deportes montaña" 
                            loading="lazy" 
                        />
                    </div>
                </div>
            </div>
            <form className="ContentClub-form" onSubmit={handleSubmit}>
                <h5 className='ContentClub-form-h5'>Inscríbete con nosotros</h5>
                <div className="ContentClub-form-container">
                    <div className="ContentClub-fieldsetContainer">
                        <fieldset className='ContentClub-fieldset'>
                            <p>Tu nombre:</p>
                            <input 
                                className="ContentClub-input" 
                                type="text" 
                                name="name" 
                                required
                            />
                            <p>Tu correo:</p>
                            <input 
                                className="ContentClub-input" 
                                type="email" 
                                name="email" 
                                required
                            />
                            <p>Pregunta tus dudas:</p>
                            <textarea 
                                className="ContentClub-input" 
                                name="textarea" 
                                cols={30}
                                rows={10}
                                required
                            />
                        </fieldset>
                        <div className="ContentClub-fieldsetContainer--mod">
                            <button className='AboutUs-button Button Button--amarillo' type='submit'>Enviar</button>
                        </div>
                    </div>
                </div>
                {/* MENSAJE DE FEEDBACK */}
                <div className='ContentClub-response'>
                    <div className={`ContentClub-spinner ${status === "sending" ? "ContentClub-spinner--show" : ""}`}>
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
                        <Paragraph text='Gracias por enviar tu correo' styleGreen={true} />
                    )}
                    {status === "error" && (
                        <Paragraph text='No se pudo enviar el correo. Inténtalo de nuevo por favor.' styleGreen={false} />
                    )}
                </div>
            </form>
        </section>
    )
}
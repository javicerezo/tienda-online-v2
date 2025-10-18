'use client'

import { useState } from "react";

import Link from 'next/link';
import { Paragraph } from "@/components/ui/Paragraph/Paragraph";
import { FaArrowLeftLong } from 'react-icons/fa6';

import './Signup.scss';

const sleep = (delay: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, delay));
};

export const Signup = () => {
    const [ status, setStatus ] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [ feedback, setFeedback ] = useState<string>("");
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");
        setFeedback("");

        const form = e.currentTarget; // es el formulario completo
        const formData = new FormData(form) // son los datos de los campos del formulario


        // Delay para mostrar spinner para efecto procesando durante 3 segundos
        await sleep(3000);

        try {
            const request = await fetch("/.netlify/functions/sendMail", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(formData))
            })
            
            const res = await request.json();

            // Si la comunicación está correcta, muestra el estado y el feedback
            if(res.status === 'success') {
                setStatus('success');
                setFeedback(res.value.data.status);
                form.reset();
            } else {
                setStatus('error');
                setFeedback(res.value.data.message);
            }

        } catch {
            // Falla la conexión, falla el servidor, falla la conexión con el backend...etc
            setStatus('error');
            setFeedback('Error inesperado. Inténtalo de nuevo.');
            await sleep(3000);
            setStatus('idle');
        }
    }

    return (
        <section className='Signup'>
            <div className='Signup-contenedor'>
                <h2 className="Signup-h2">
                    Signup
                </h2>
                <h4 className="Signup-h4">
                    Por ser usuario recibirás descuentos en muchos de nuestros productos. No pierdas la oportunidad.
                </h4>
                <form className="Signup-form" onSubmit={handleSubmit}>
                    <input 
                        className="Signup-input" 
                        type="name" 
                        name="name" 
                        placeholder='Tu nombre'
                        required
                    />
                    <input 
                        className="Signup-input" 
                        type="email" 
                        name="email" 
                        placeholder='Tu dirección de email'
                        required
                    />
                    <input 
                        className="Signup-input" 
                        type="password" 
                        name="password" 
                        placeholder='Contraseña'
                        required
                    />
                    <input 
                        className="Signup-input" 
                        type="password" 
                        name="password-repeat" 
                        placeholder='Contraseña'
                        required
                    />
                    <div className="Signup-div">
                        <FaArrowLeftLong />
                        <Link 
                            className="Signup-p"
                            href="/login">Volver a login</Link>
                    </div>
                    <button className="Signup-boton" type='submit'>Suscribirme</button>

                    {/* FEEDBACK AL USUARIO */}
                    <div className="Signup-divResponse">
                        {/* MOSTRAR SPINNER */}
                        {status === "sending" &&
                            <div className="sk-chase">
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                                <div className="sk-chase-dot"></div>
                            </div>
                        }

                        {/* MOSTRAR MENSAJE DE FEEDBACK */}
                        {(status === 'success' || status === 'error') && (
                            <Paragraph
                                text={feedback}
                                styleGreen={status === 'success'}
                            />
                        )}
                    </div>
                </form>
            </div>
        </section>
    )
}
import { useState } from "react";
import { auth } from "@/lib/firebase/firebase.client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

import Link from 'next/link';
import { Paragraph } from "@/components/ui/Paragraph/Paragraph";
import { FaArrowLeftLong } from 'react-icons/fa6';

import './Signup.scss';
import '@/components/ui/Button/Button.scss';
import '@/components/ui/Spinner/Spinner.scss';

const sleep = (delay: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, delay));
};

export const Signup = () => {
    const [ status, setStatus ] = useState<"idle" | "spinner" | "success" | "error">("idle");
    const [ feedback, setFeedback ] = useState<string>("");
    const router = useRouter();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("spinner");
        setFeedback("");

        const form = e.currentTarget; // es el formulario completo
        const formData = new FormData(form) // son los datos de los campos del formulario
        const dataObj = Object.fromEntries(formData) // son los datos pasados a objeto


        // Delay para mostrar spinner para efecto procesando durante 1 segundo
        await sleep(1200);

        try {
            const request = await fetch("/.netlify/functions/validate-signup", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataObj)
            })
            
            const res = await request.json();

            // Si la comunicación está correcta, muestra el estado y el feedback
            if(res.status === 'success') {
                // Hacemos login de usuario directamente.
                await signInWithEmailAndPassword(auth, dataObj.email.toString(), dataObj.password.toString());

                // Damos feedback al usuario
                setStatus('success');
                setFeedback(res.message);
                form.reset();
                
                // Quitamos feedback
                await sleep(3000);
                setStatus('idle');

                // Redirigimos usuario a la tienda de compra
                await sleep(500);
                router.push('/');
            } else {
                setStatus('error');
                setFeedback(res.message);
            }
            
        } catch {
            // Falla el servidor, falla la conexión con el backend...etc
            // Damos feddback
            setStatus('error');
            setFeedback('Error inesperado. Inténtalo de nuevo.');

            // Quitamos feedback
            await sleep(3000);
            setStatus('idle');
        }
    }

    return (
        <section className='Signup'>
            <div className='Signup-container'>
                <h2 className="Signup-h2">
                    Signup
                </h2>
                <h4 className="Signup-h4">
                    Por ser usuario recibirás descuentos en muchos de nuestros productos. No pierdas la oportunidad.
                </h4>
                <form className="Signup-form" onSubmit={handleSubmit}>
                    <input 
                        className="Signup-input" 
                        type="text" 
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
                        name="passwordRepeat" 
                        placeholder='Repite la contraseña'
                        required
                    />
                    <div className="Signup-div">
                        <FaArrowLeftLong />
                        <Link 
                            className="Signup-p"
                            href="/user/login">Volver a login</Link>
                    </div>
                    <button className="Signup-boton Button Button--amarillo" type='submit'>Sign up</button>

                    {/* FEEDBACK AL USUARIO */}
                    <div className="Signup-divResponse">
                        {/* MOSTRAR SPINNER */}
                        {status === "spinner" &&
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
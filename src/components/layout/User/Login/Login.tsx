import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase.client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setPersistence, browserLocalPersistence } from "firebase/auth";

import Link from 'next/link';
import { Paragraph } from "@/components/ui/Paragraph/Paragraph";
import { FaArrowRightLong } from 'react-icons/fa6';

import './Login.scss';
import '@/components/ui/Button/Button.scss';
import '@/components/ui/Spinner/Spinner.scss';

const sleep = (delay: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, delay));
};

// manejar los errores de login de firebase
const mapAuthError = (code: string) => {                          
    switch (code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
            return "Email o contraseña incorrectos.";
        case "auth/invalid-email":
            return "El email no es válido.";
        case "auth/too-many-requests":
            return "Demasiados intentos. Prueba más tarde.";
        case "auth/network-request-failed":
            return "Fallo de red. Revisa tu conexión.";
        default:
            return "No se pudo iniciar sesión. Inténtalo de nuevo.";
    }
};

export const Login = () => {
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

        // Delay para mostrar spinner para efecto procesando durante 3 segundos
        await sleep(3000);

        try {
            const request = await fetch("/.netlify/functions/validate-login", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataObj)
            })
            
            const res = await request.json();

            // Si la comunicación está correcta, muestra el estado y el feedback
            if(res.status === 'success') {
                // HACEMOS LOGIN EN FIREBASE Y GUARDAMOS LA SESIÓN EN LOCALSTORAGE PARA SU PERSISTENCIA
                try {
                    await setPersistence(auth, browserLocalPersistence);
                    await signInWithEmailAndPassword(auth, dataObj.email.toString(), dataObj.password.toString());
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (err: any){
                    setStatus('error');     
                    setFeedback(mapAuthError(err?.code ?? 'auth/unknown')); 
                    return;
                }

                // Damos feedback al usuario
                setStatus('success');
                setFeedback(res.message);
                form.reset();
                
                // Quitamos feedback
                await sleep(3000);
                setStatus('idle');

                // Redirigimos usuario a la tienda de compra
                await sleep(1000);
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
        <section className='Login'>
            <div className='Login-container'>
                <h2 className="Login-h2">
                    Login
                </h2>
                <h4 className="Login-h4">
                    Si te autenticas como usuario recibirás descuentos de nuestros productos.
                </h4>
                <form className="Login-form" onSubmit={handleSubmit}>
                    <input 
                        className="Login-input" 
                        type="email" 
                        name="email" 
                        placeholder='Tu dirección de email'
                        required
                    />
                    <input 
                        className="Login-input" 
                        type="password" 
                        name="password" 
                        placeholder='Contraseña'
                        required
                    />
                    <div className="Login-div">
                        <Link 
                            className="Login-p"
                            href="/user/signup">
                                <span className="Login-span">¿Eres nuevo?</span>Crear una cuenta
                        </Link>
                        <FaArrowRightLong />
                    </div>
                    <button className="Login-boton Button Button--amarillo" type='submit'>Suscribirme</button>

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
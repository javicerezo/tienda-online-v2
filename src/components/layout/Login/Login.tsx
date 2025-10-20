// import {  signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/lib/firebase/firebase.client";

import Link from 'next/link';
import { FaArrowRightLong } from 'react-icons/fa6';

import './Login.scss';

export const Login = () => {
    const handleSubmit = () => {
    // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        console.log("has hecho click");
    //     e.preventDefault();

    //     const form = e.currentTarget;
    //     const formData = new FormData(e.currentTarget);

    //     const email = formData.get('email')?.toString();
    //     const password = formData.get('password')?.toString();

    //     if(email && password) {
    //         signInWithEmailAndPassword(auth, email, password)
    //             .then((userCredential) => {
    //                 // Signed in 
    //                 const user = userCredential.user;
    //                 // ...
    //             })
    //             .catch((error) => {
    //                 const errorCode = error.code;
    //                 const errorMessage = error.message;
    //             });
    //     }
    }


    return (
        <section className='Login'>
            <div className='Login-contenedor'>
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
                            href="/login/signup">
                                <span className="Login-span">¿Eres nuevo?</span>Crear una cuenta
                        </Link>
                        <FaArrowRightLong />
                    </div>
                    <button className="Login-boton" type='submit'>Suscribirme</button>
                </form>
            </div>
        </section>
    )
}
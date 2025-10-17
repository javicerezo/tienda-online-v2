import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';

import './Signup.scss';

export const Signup = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("has pulsado")
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
                    <div className="Signup-div">
                        <FaArrowLeftLong />
                        <Link 
                            className="Signup-p"
                            href="/login">Volver a login</Link>
                    </div>
                    <button className="Signup-boton" type='submit'>Suscribirme</button>
                </form>
            </div>
        </section>
    )
}
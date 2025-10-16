import './Login.scss';

export const Login = () => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }


    return (
        <section className='Login'>
            <div className='Login-contenedor'>
                <h2 className="Login-h2">
                    Únete a nuestra Login
                </h2>
                <h4 className="Login-h4">
                    Recibe nuestras novedades, ofertas y promociones.
                </h4>
                <form className="Login-form" onSubmit={handleSubmit}>
                    <input 
                        className="Login-input" 
                        type="email" 
                        name="email" 
                        placeholder='Tu dirección de email'
                        required
                    />
                    <button className="Login-boton Button Button--amarillo" type='submit'>Suscribirme</button>
                </form>
            </div>
        </section>
    )
}
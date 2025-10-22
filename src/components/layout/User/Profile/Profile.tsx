import { useState, useEffect, useRef } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '@/lib/firebase/firebase.client';

import { Paragraph } from '@/components/ui/Paragraph/Paragraph';

import './Profile.scss';
import '@/components/ui/Button/Button.scss';
import '@/components/ui/Spinner/Spinner.scss';
import { collection } from 'firebase/firestore';

const sleep = (delay: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, delay));
};

export const Profile = () => {
    // const { user, logout } = useAuth();
    // const [ form, setForm ] = useState({ name: '', email: '', role: '' });
    const [ defaultValueName, setDefaultValueName ] = useState<string>('');
    const [ nameUser, setNameUser ] = useState<string>(''); 
    const [ emailUser, setEmailUser ] = useState<string>(''); 
    const [ status, setStatus ] = useState<"idle" | "spinner" | "success" | "error">("idle");
    const [ feedback, setFeedback ] = useState<string>("");
    
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect( () => {
        // aquí hago la lectura de la base de datos

        const readDataFirebase = async () => {
            console.log("de momento no hago nada")
            // try {
            //     const auth = getAuth();
            //     const user = auth.currentUser;

            //     if(!user) {
            //         console.warn('no hay usuario autenticado todavía');
            //         return
            //     }

            //     // hago la lectura del user
            // }

        }

        readDataFirebase();
    }, []);
    
    

    const logout = () => {

    }

    const handleClick = async () => {
        setStatus("spinner");
        setFeedback("");

        let newName;
        if(inputRef.current) {
            newName = inputRef.current.value;
        }
        
        // Delay para mostrar spinner para efecto procesando durante 3 segundos
        await sleep(3000);

        try {
            const request = await fetch("/.netlify/functions/validate-name", {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newName)
            })
            
            const res = await request.json();
        
            if(res.status === 'success') {
                setStatus('success');
                setFeedback(res.message);

                setNameUser(res.name);
                setDefaultValueName(''); // NO FUNCIONA BIEN
                
                await sleep(3000);
                setStatus('idle');
            } else {
                setStatus('error');
                setFeedback(res.message);
            }

        } catch {
            setStatus('error');
            setFeedback('Error inesperado. Inténtalo de nuevo.');

            await sleep(3000);
            setStatus('idle');
        }
    }

    return (
        <section className="Profile">
            <div className="Profile-container">
                <h2 className="Profile-h2">Mi perfil</h2>
                <h4 className="Profile-h4">Datos de usuario:</h4>
                <div className="Profile-form">
                    <label>Nombre:</label>
                    <div className='Profile-divInputs'>
                        <input 
                            className="Profile-input" 
                            type="text" 
                            name="name"
                            defaultValue={defaultValueName}
                            placeholder={nameUser}
                            ref={inputRef}
                        />
                        <label 
                            className='Profile-label'
                            onClick={ handleClick }>Modificar</label>
                    </div>

                    <label>Email:</label>
                    <input 
                        className="Profile-input" 
                        type="text" 
                        name="email" 
                        placeholder={emailUser}
                        readOnly
                    />
                    <div className="Profile-divResponse">
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
                </div>

                <h4 className="Profile-h4">Tus pedidos:</h4>
                <div className='Profile-divOrders'>
                    <p className='Profile-p'>- Pedido número 1</p>
                    <p className='Profile-p'>- Pedido número 2</p>
                    <p className='Profile-p'>- Pedido número 3</p>
                    <p className='Profile-p'>- Pedido número 4</p>
                </div>

                <button onClick={logout} className="Button Button--amarillo">Cerrar sesión</button>

            </div>
        </section>
    )
}
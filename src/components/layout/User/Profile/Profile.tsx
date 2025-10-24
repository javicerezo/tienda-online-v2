import { useState, useEffect, useRef } from 'react';
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { auth, db } from '@/lib/firebase/firebase.client';
import { signOut } from 'firebase/auth';
import { useRouter } from "next/navigation";

import { Paragraph } from '@/components/ui/Paragraph/Paragraph';

import type { orderDoc, orderWithId } from '@/utils/types/order';

import './Profile.scss';
import '@/components/ui/Button/Button.scss';
import '@/components/ui/Spinner/Spinner.scss';
import { Order } from '../Order/Order';

const sleep = (delay: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, delay));
};



export const Profile = () => {
    const [ nameUser, setNameUser ] = useState<string>(''); 
    const [ emailUser, setEmailUser ] = useState<string>(''); 
    const [ orders, setOrders ] = useState<orderWithId[]>([]);
    const [ status, setStatus ] = useState<"idle" | "spinner" | "success" | "error">("idle");
    const [ feedback, setFeedback ] = useState<string>("");
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    

    useEffect( () => {
        const readDataFirebase = async () => {
            const user = auth.currentUser;
            if(!user) return console.log("No hay usuario autenticado");

            // Cargamos los datos de perfil
            try {
                const orderRef = doc(db, "users", user.uid);
                const snap = await getDoc(orderRef);
                
                if(snap.exists()) {
                    const data = snap.data() as { name?: string; email?: string };
                    setNameUser(data.name ?? "");
                    setEmailUser(data.email ?? "");
                } else {
                    setStatus("error");
                    setFeedback("El usuario no existe");
                }
            } catch {
                setStatus("error");
                setFeedback("No se pudo cargar tu perfil.");
            }
            
            // Cargamos los datos de pedidos
            try {
                const orderRef2 = collection(db, 'users', user.uid, 'orders');
                const snap2 = await getDocs(orderRef2);

                if(snap2.empty) {
                    setOrders([]);
                } else {
                    const result: orderWithId[] = snap2.docs.map( order => ({ id: order.id, ...order.data() as orderDoc}));
                    setOrders(result);
                }
                
            } catch {
                setOrders([]);
                console.log("ERROR AL CARGAR LOS PEDIDOS");
            }
        }

        readDataFirebase();
    }, []);
    

    const logout = async () => {
        await signOut(auth);
        // Redirigimos usuario a la tienda de compra
        await sleep(500);
        router.push('/');
    }

    const handleClick = async () => {
        setStatus("spinner");
        setFeedback("");

        const newName = (inputRef.current?.value ?? "").trim();
        if(!newName) {
            setStatus('error');
            setFeedback('El nombre no puede estar vacío');
            return; 
        }
        
        // Delay para mostrar spinner para efecto procesando durante 3 segundos
        await sleep(800);

        const user = auth.currentUser;
        if(!user) {
            setStatus('error');
            setFeedback('No hay usuario autenticado');
            return
        }

        try {
            const token = await user.getIdToken(true);
            const request = await fetch("/.netlify/functions/validate-profile", {
                method: 'POST',
                headers: { "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                body: JSON.stringify( newName )
            })
            
            const res = await request.json();
        
            if (!request.ok || res.status !== "success") {
                setStatus("error");
                setFeedback(res?.message ?? "No se pudo cambiar el nombre");
                return;
            }

            // feedBack ok cambio de nombre
            setNameUser(res.name);
            if(inputRef.current) inputRef.current.value = "";
            setStatus('success');
            setFeedback(res.message);
            
            await sleep(1500);
            setStatus('idle');

        } catch {
            setStatus('error');
            setFeedback('Error inesperado. Inténtalo de nuevo.');

            await sleep(1500);
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
                    {orders.length == 0 ? (
                        <Paragraph text='no tienes ningún pedido aún' styleGreen={true} />
                    ) : (
                        <>
                            {orders.map((order) => (
                                <Order 
                                    key={order.id}
                                    session_id = {order.session_id}
                                    payment_status = {order.payment_status} 
                                    amount_total = {order.amount_total} 
                                    currency = {order.currency}
                                    line_items = {order.line_items}
                                    createdAt = {order.createdAt}
                                />
                            ))}
                        </>
                    ) }
                </div>

                <button onClick={logout} className="Button Button--amarillo">Cerrar sesión</button>

            </div>
        </section>
    )
}
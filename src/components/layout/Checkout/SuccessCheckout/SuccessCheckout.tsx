'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { auth } from "@/lib/firebase/firebase.client";
import { onIdTokenChanged } from "firebase/auth";

import './SuccessCheckout.scss';
import '@/components/ui/Button/Button.scss';
import { Paragraph } from '@/components/ui/Paragraph/Paragraph';

type LineItem = {
    description: string;
    quantity: number;
    amount_total: number;   // en céntimos
    currency: string;
};

type SessionSummary = {
    status: 'success';
    payment_status: 'paid' | 'unpaid' | 'no_payment_required';
    amount_total: number;   // en céntimos
    currency: string;
    line_items: LineItem[];
};

function centsToEUR(n: number) {
    return (n / 100).toFixed(2).replace('.', ',') + ' €';
}
/**
 * Limpia el carrito de compra del storage
 */
const clearCart = () => {
    try {
        localStorage.removeItem('cart'); 
    } catch {}
};
export const SuccessCheckout = () => {
    const params = useSearchParams();
    const router = useRouter();
    const sessionId = params.get('session_id');

    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState<string | null>(null);
    const [data, setData] = useState<SessionSummary | null>(null);
    const [error, setError] = useState<string | null>(null);
    
    // HEMOS VUELTO SE LA SESIÓN DE STRIPE
    // PRIMERO ESPERAMOS A QUE SE RECUPERE EL USER QUE HAY GUARDADO EN LA SESION PERSISTENTE (VER EN LOGIN)
    useEffect(() => {
        const unsub = onIdTokenChanged(auth, async (user) => {
            if (!user) {
                setToken(null);
                return;
            }
            const t = await user.getIdToken(true); // fuerza refresh
            setToken(t);
        });
        return () => unsub();
    }, []);


    useEffect(() => {
        if (!sessionId) {
            setError('Falta session_id');
            setLoading(false);
            return;
        }

        if(!token) return

        const run = async () => {
            try {
                const request = await fetch(`/.netlify/functions/retrieve-checkout-session?session_id=${encodeURIComponent(sessionId)}`, {
                    method: 'GET',
                    headers: { 
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                });

                const res = await request.json();
                if (!request.ok) {
                    setError(res?.message || 'No se pudo verificar el pago');
                    setLoading(false);
                    return
                }

                setData(res);

                // GUARDAMOS EL PEDIDO EN FIREBASE
                const request2 = await fetch(`/.netlify/functions/save-order`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ session_id: sessionId })
                });
                
                const res2 = await request2.json();
                if(!request2.ok) {
                    setError(res2?.message || 'No se ha podido guardar el pedido en la base de datos');
                    setLoading(false);
                    return;
                } 
                
                setLoading(false);
                
                // lIMPIAMOS EL CARRITO DE COMPRA
                if (res.payment_status === 'paid') clearCart();

            } catch {
                setError('Error inesperado verificando el pago');
            }
        };

        run();
    }, [sessionId, token]);

    if (loading) return <Paragraph text='Comprobando tu pago' styleGreen={true}/>
    if (error) return <Paragraph text={error} styleGreen={false}/>
    if (!data) return null;

    return (
        <section className="SuccessCheckout">
            <div className="SuccessCheckout-container">
                <h2 className="SuccessCheckout-h2">¡Pago completado!</h2>
                <p className="SuccessCheckout-p">Estado del pago: {data.payment_status}</p>

                <h3 className="SuccessCheckout-h3">Resumen:</h3>
                <ul className="SuccessCheckout-list">
                    {data.line_items.map((li, idx) => (
                        <li key={idx} className="SuccessCheckout-item">
                        <span>{li.description} × {li.quantity}</span>
                        <span>{centsToEUR(li.amount_total)}</span>
                        </li>
                    ))}
                </ul>

                <p className="SuccessCheckout-total">
                    Total pagado: {centsToEUR(data.amount_total)}
                </p>

                <button
                    onClick={ () => { router.push('/') } }
                    className="SuccessCheckout-button Button Button--amarillo"
                    >
                        Volver a la tienda
                </button>
            </div>
        </section>
    );
}
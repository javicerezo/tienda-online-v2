'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/utils/hooks/useCart';

import './SuccessCheckout.scss';
import '@/components/ui/Button/Button.scss';

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

export const SuccessCheckout = () => {
    const params = useSearchParams();
    const router = useRouter();
    const sessionId = params.get('session_id');

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<SessionSummary | null>(null);
    const [error, setError] = useState<string | null>(null);

    const { clearCart } = useCart();
    

    useEffect(() => {
        const run = async () => {
        if (!sessionId) {
            setError('Falta session_id');
            setLoading(false);
            return;
        }

        try {
            const req = await fetch(`/.netlify/functions/retrieve-checkout-session?session_id=${encodeURIComponent(sessionId)}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            const res = await req.json();

            if (!req.ok) {
                setError(res?.message || 'No se pudo verificar el pago');
                setLoading(false);
                return;
            }

            setData(res);

            // Limpia el carrito solo si el pago quedó realizado
            if (res.payment_status === 'paid') clearCart();
            setLoading(false);
        } catch {
            setError('Error inesperado verificando el pago');
        }
    };

        run();
    }, [ sessionId, clearCart ]);

    if (loading) return <p style={{ padding: 16 }}>Comprobando tu pago…</p>;
    if (error) return <p style={{ padding: 16, color: 'crimson' }}>{error}</p>;
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
                    onClick={() => router.push('/')}
                    className="SuccessCheckout-button Button Button--amarillo"
                    >
                        Volver a la tienda
                </button>
            </div>
        </section>
    );
}
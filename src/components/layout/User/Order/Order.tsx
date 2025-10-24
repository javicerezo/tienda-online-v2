import type { orderDoc, orderLineItem } from "@/utils/types/order";

import './Order.scss'

const formatMoney = (cents: number, currency: string = 'eur') =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: currency.toUpperCase() })
    .format((cents || 0) / 100);

export const Order = ({ session_id, payment_status, amount_total, currency, line_items, createdAt  }: orderDoc) => {
    return (
        <section className='Order'>
            <div className="Order-container">
                <div className='Order-orderHeader'>
                    <strong>Pedido #{session_id.slice(-8)}</strong>
                    <span>{createdAt ? new Date(createdAt).toLocaleString() : ''}</span>
                </div>

                <div className='Order-orderBody'>
                    <p>Estado: <strong>{payment_status}</strong></p>
                    <p>Total: <strong>{formatMoney(amount_total, currency)}</strong></p>

                    {Array.isArray(line_items) && line_items.length > 0 && (
                    <ul className='Order-orderList'>
                        {line_items.map((li: orderLineItem, idx: number) => (
                        <li key={idx}>
                            {li.description} × {li.quantity} — {formatMoney(li.amount_total, li.currency)}
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
            </div>
        </section>
    )
}
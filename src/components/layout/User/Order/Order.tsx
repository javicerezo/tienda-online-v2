import type { orderDoc, orderLineItem } from "@/utils/types/order";

import './Order.scss'

const formatMoney = (cents: number, currency: string = 'eur') =>
  new Intl.NumberFormat('es-ES', { style: 'currency', currency: currency.toUpperCase() })
    .format((cents || 0) / 100);

export const Order = ({ session_id, amount_total, currency, line_items, createdAt  }: orderDoc) => {
    return (
        <section className='Order'>
            <div className="Order-container">
                <div className='Order-orderHeader'>
                    <p>Número de pedido<span className="Order-p">{` - ${session_id.slice(-8)}`}</span></p>
                    <span>{createdAt ? new Date(createdAt).toLocaleString() : ''}</span>
                </div>

                <div className='Order-orderBody'>
                    <p className="Order-p">Total: {formatMoney(amount_total, currency)}</p>

                    {Array.isArray(line_items) && line_items.length > 0 && (
                    <ul className='Order-orderList'>
                        {line_items.map((li: orderLineItem, idx: number) => (
                        <li key={idx}>
                            {li.description} × {li.quantity} - {formatMoney(li.amount_total, li.currency)}
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
            </div>
        </section>
    )
}
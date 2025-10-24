export interface orderLineItem {
    description: string;
    quantity: number;
    amount_subtotal: number; // céntimos
    amount_total: number;    // céntimos
    currency: string;        // "eur", etc.
}

export interface orderDoc {
    session_id: string;
    payment_status: "paid" | "unpaid" | "no_payment_required";
    amount_total: number; // céntimos
    currency: string;
    line_items: orderLineItem[];
    createdAt: string; 
}

export type orderWithId = orderDoc & { id: string };
import { SuccessCheckout } from "@/components/layout/Checkout/SuccessCheckout/SuccessCheckout";
import { Suspense } from "react";

// Evita que Next intente prerenderizar esta ruta
export const dynamic = 'force-dynamic';

export default function Page() {
    return (
        <Suspense fallback={ <div>Comprobando tu pago…</div>} >
            <SuccessCheckout />
        </Suspense>
    )
}
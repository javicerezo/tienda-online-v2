import { SuccessCheckout } from "@/components/layout/Checkout/SuccessCheckout/SuccessCheckout";
import { Suspense } from "react";

export default function Page() {
    return (
        <Suspense fallback={ <div>Comprobando tu pago…</div>} >
            <SuccessCheckout />
        </Suspense>
    )
}
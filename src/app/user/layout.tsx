import Link from "next/link";

import '@/components/ui/Button/Button.scss';

export default function Layout (
    { children }: { children: React.ReactNode }
) {
    return (
        <section> 
            <Link 
            className="Button Button--amarillo"
            href="/">volver</Link>

            {children}
        </section>
    );
}
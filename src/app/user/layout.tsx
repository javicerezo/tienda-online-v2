import Link from "next/link";

import '@/components/ui/Container/Container.scss';

import '@/components/ui/Button/Button.scss';

export default function Layout (
    { children }: { children: React.ReactNode }
) {
    return (
        <section> 
            <div className="Container">
                <Link 
                className="Button Button--amarillo"
                href="/">volver</Link>
            </div>
            
            {children}
        </section>
    )
}
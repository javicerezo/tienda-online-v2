
import '@/styles/app.scss';

export default function Layout (
    { children }: { children: React.ReactNode }
) {
    return (
        <section> 
            {children}
        </section>
    );
}
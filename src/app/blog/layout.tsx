export default function Layout (
    { children }: { children: React.ReactNode }
) {
    return (
        <section> 
            ESTO ES EL LAYOUT DEL BLOG

            {children}
        </section>
    );
}
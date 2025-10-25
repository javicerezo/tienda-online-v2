import { Header } from "@/components/layout/Blog/Header/Header";

export default function Layout (
    { children }: { children: React.ReactNode }
) {
    return (
        <section> 
            <Header />

            {children}
        </section>
    );
}
import { CategoryNav } from "@/components/layout/Blog/Header/CategoryNav";

export default function Layout (
    { children }: { children: React.ReactNode }
) {
    return (
        <> 
            <section className='Categories'>
                <div className='Categories-container'>
                    <h1 className="Categories-h1">Blog de Montaña</h1>
                    <CategoryNav />
                    {children}
                </div>
            </section>
        </>
    );
}
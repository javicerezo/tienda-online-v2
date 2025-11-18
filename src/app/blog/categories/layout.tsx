import { CategoryNav } from "@/components/layout/Blog/Header/CategoryNav";
import '@/components/layout/Blog/Categories/Categories.scss';

export default function Layout (
    { children }: { children: React.ReactNode }
) {
    return (
        <> 
            <section className='Categories'>
                <div className='Categories-container'>
                    <h2 className="Categories-h2">Blog de Montaña</h2>
                    <CategoryNav />
                    {children}
                </div>
            </section>
        </>
    );
}
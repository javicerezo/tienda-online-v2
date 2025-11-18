import { HeaderBlog } from "@/components/layout/Blog/HeaderBlog/HeaderBlog";

export default function Layout (
    { children }: { children: React.ReactNode }
) {
    return (
        <section> 
            <HeaderBlog />

            {children}
        </section>
    );
}
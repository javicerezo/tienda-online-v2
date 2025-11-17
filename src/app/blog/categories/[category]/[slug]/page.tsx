import { ArticleDetails } from "@/components/layout/Blog/Article/ArticleDetails";

type Props = { params: { slug: string } };

export default function Page({ params }: Props) {
    const article = decodeURIComponent(params.slug);

    return (
        <ArticleDetails article={article}/>
    )
}
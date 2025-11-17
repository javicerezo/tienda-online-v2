import { Category } from "@/components/layout/Blog/Category/Category";

type Props = { params: { category: string } };

export default function Page({ params }: Props) {
    const category = decodeURIComponent(params.category);

    return (
        <Category categoria={category}/>
    )
}
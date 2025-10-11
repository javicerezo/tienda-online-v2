import { Header } from "@/components/layout/Ecommerce/Header/Header";
import { Top } from "@/components/layout/Top/Top";
import { Products } from "@/components/layout/Products/Products";
import { Advantages } from "@/components/layout/Advantages/Advantages";
import { ProductsVisited } from "@/components/layout/ProductsVisited/ProductsVisited";
import { Newsletter } from "@/components/layout/Newsletter/Newsletter";

export default function Home() {
  return (
    <>
      <Header />
      <Top />
      <Products />
      <Advantages />
      <ProductsVisited />
      <Newsletter />
    </>
  );
}

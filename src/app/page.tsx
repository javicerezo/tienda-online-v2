import { Header } from "@/components/layout/Ecommerce/Header/Header";
import { Top } from "@/components/layout/Ecommerce/Top/Top";
import { Products } from "@/components/layout/Ecommerce/Products/Products";
import { Advantages } from "@/components/layout/Ecommerce/Advantages/Advantages";
import { ProductsVisited } from "@/components/layout/Ecommerce/ProductsVisited/ProductsVisited";
import { Newsletter } from "@/components/layout/Ecommerce/Newsletter/Newsletter";

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

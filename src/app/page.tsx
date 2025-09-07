import { Products } from "@/components/layout/Products/Products";
import { Top } from "../components/layout/Top/Top";
import { Advantages } from "@/components/layout/Advantages/Advantages";
import { ProductsVisited } from "@/components/layout/ProductsVisited/ProductsVisited";

export default function Home() {
  return (
    <>
      <Top />
      <Products />
      <Advantages />
      <ProductsVisited />
    </>
  );
}

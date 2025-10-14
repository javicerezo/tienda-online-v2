'use client'

import { Header } from "@/components/layout/Ecommerce/Header/Header";
import { Top } from "@/components/layout/Ecommerce/Top/Top";
import { Products } from "@/components/layout/Ecommerce/Products/Products";
import { Advantages } from "@/components/layout/Ecommerce/Advantages/Advantages";
import { ProductsVisited } from "@/components/layout/Ecommerce/ProductsVisited/ProductsVisited";
import { Newsletter } from "@/components/layout/Ecommerce/Newsletter/Newsletter";
import { useVisited } from "@/utils/hooks/useVisited";
import { useCart } from "@/utils/hooks/useCart";

export default function Home() {
  const { cart, addToCart, removeToCart } = useCart();
  const { visited, addToVisited} = useVisited();
  
  return (
    <>
      <Header 
        cart={cart}
        eliminateToCart={removeToCart}
      />
      <Top />
      <Products 
        addToCart={addToCart}
        addToVisited={addToVisited}
        />
      <Advantages />
      <ProductsVisited 
        visited={visited}
        addToCart={addToCart}
        addToVisited={addToVisited}
      />
      <Newsletter />
    </>
  );
}

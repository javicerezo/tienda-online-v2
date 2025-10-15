'use client'

import { Header } from "@/components/layout/Ecommerce/Header/Header";
import { Top } from "@/components/layout/Ecommerce/Top/Top";
import { Products } from "@/components/layout/Ecommerce/Products/Products";
import { Advantages } from "@/components/layout/Ecommerce/Advantages/Advantages";
import { ProductsVisited } from "@/components/layout/Ecommerce/Products/ProductsVisited";
import { Newsletter } from "@/components/layout/Ecommerce/Newsletter/Newsletter";
import { Seeker } from "@/components/layout/Ecommerce/Seeker/Seeker";

import { useVisited } from "@/utils/hooks/useVisited";
import { useCart } from "@/utils/hooks/useCart";
import { useSeeker } from "@/utils/hooks/useSeeker";

export default function Home() {
  const { cart, addToCart, removeToCart } = useCart();
  const { visited, addToVisited} = useVisited();
  const { showSeeker, openSeeker, closeSeeker, searchProductseeker } = useSeeker();

  return (
    <>
      <Header 
        cart={cart}
        eliminateToCart={removeToCart}
        openSeeker={openSeeker}
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

      {showSeeker && (
        <Seeker 
          showSeeker={showSeeker}
          onClose={closeSeeker}
          searchProductseeker={searchProductseeker}
          addToCart={addToCart}
          addToVisited={addToVisited}
        />
      )}
    </>
  );
}

'use client'

import { Header } from "@/components/layout/Ecommerce/Header/Header";
import { Top } from "@/components/layout/Ecommerce/Top/Top";
import { Products } from "@/components/layout/Ecommerce/Products/Products";
import { Advantages } from "@/components/layout/Ecommerce/Advantages/Advantages";
import { ProductsVisited } from "@/components/layout/Ecommerce/ProductsVisited/ProductsVisited";
import { Newsletter } from "@/components/layout/Ecommerce/Newsletter/Newsletter";

import { useState } from "react";

import type { product, productCart } from "@/utils/types/product";

export default function Home() {
  const [ cart, setCart ] = useState<productCart[]>([]);

  /**
   * Revisa si un item existe en el carrito (si no existe lo agrega completo, si sí existe agrega +1 en la cantidad)
   * @param item es el item (producto que se agrega en el carrito de compra)
   */
  const addToCart = (item: product) => {
    const itemExist = cart.findIndex( element => element.id === item.id );
    
    if(itemExist < 0) { // no existe...agregamos
      
      const newItem: productCart = {...item, quantity: 1};
      setCart( prevCart => [...prevCart, newItem]);
    } else {
      const updatedCart = [...cart];
      updatedCart[itemExist].quantity++; 
      setCart(updatedCart);
    }
  }

  console.log(cart)
  return (
    <>
      <Header 
        cart={cart}
      />
      <Top />
      <Products 
        addToCart={addToCart}
      />
      <Advantages />
      <ProductsVisited />
      <Newsletter />
    </>
  );
}

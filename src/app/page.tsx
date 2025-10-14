'use client'

import { Header } from "@/components/layout/Ecommerce/Header/Header";
import { Top } from "@/components/layout/Ecommerce/Top/Top";
import { Products } from "@/components/layout/Ecommerce/Products/Products";
import { Advantages } from "@/components/layout/Ecommerce/Advantages/Advantages";
import { ProductsVisited } from "@/components/layout/Ecommerce/ProductsVisited/ProductsVisited";
import { Newsletter } from "@/components/layout/Ecommerce/Newsletter/Newsletter";

import { useEffect, useState } from "react";
import { loadStorage, saveStorage } from "@/utils/hooks/storage";

import type { product, productCart } from "@/utils/types/product";

export default function Home() {
  const [ cart, setCart ] = useState<productCart[]>([]);
  const [ visited, setVisited ] = useState<product[]>([]);
  
  useEffect( () => {
    const localStorageCart = loadStorage('cart');
    const localStorageVisited = loadStorage('visited');
    setCart(localStorageCart);
    setVisited(localStorageVisited);
  }, []);

  // UseEffect se encarga de actualizar los datos del storage cada vez que cambia el state de visited o cart
  useEffect( () => {
    saveStorage('cart', cart);
  }, [cart]);
  
  useEffect( () => {
    saveStorage('visited', visited);
  }, [visited]);

  /**
   * Revisa si un item existe en el carrito (si no existe lo agrega completo, si sí existe agrega +1 en la cantidad)
   * y lo guarda a localStorage
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

  /**
   * Elimina un item del carrito de compra
   * @param number es el numero del id del producto que se quiere eliminar de la cesta
   */
  const eliminateToCart = (number: number) => {
    const updatedCart = cart.filter( element => element.id !== number)
    setCart(updatedCart);
  }

  /**
   * Añade un producto a la lista de visitados (si no lo hemos visitado antes ya). 
   * La longitud máxima del array será de 6 productos, cuando el usuario vea más de 6 artículos,
   * se eliminará el elemento de cola para agregar el nuevo producto.
   * @param item es el producto
   * @returns 
   */
  const addToVisited = (item: product) => {
    const itemExist = visited.some( element => element.id === item.id);
    
    if (itemExist === false) {
        if(visited.length < 6) {
          const updatedVisited = [...visited, item];
          setVisited(updatedVisited);
        }
        else {
          const updatedVisited = [...visited];
          updatedVisited.shift(); // elimina el último elemento
          updatedVisited.push(item);
          setVisited(updatedVisited)
        }
    }
  }
  
  return (
    <>
      <Header 
        cart={cart}
        eliminateToCart={eliminateToCart}
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

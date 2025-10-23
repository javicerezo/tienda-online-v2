import { useEffect, useState } from "react";
import { loadStorage, saveStorage } from "@/utils/functions/storage";
import { roundResult } from "../functions/roundResult";
import { useAuth } from "@/contexts/AuthContext";

import type { product, productCart } from "@/utils/types/product";

export const useCart = () => {
    const [ cart, setCart ] = useState<productCart[]>([]);
    const { user } = useAuth();
    
    useEffect( () => {
        const localStorageCart = loadStorage('cart');
        setCart(localStorageCart);
    }, []);

    // UseEffect se encarga de actualizar los datos del storage cada vez que cambia el state de visited o cart
    useEffect( () => {
        saveStorage('cart', cart);
    }, [cart]);
    
    /**
     * Revisa si un item existe en el carrito (si no existe lo agrega completo, si sí existe agrega +1 en la cantidad)
     * y lo guarda a localStorage
     * @param item es el item (producto que se agrega en el carrito de compra)
     */
    const addToCart = (item: product) => {
        // ARREGLAR EL NUEVO PRECIO Y DESCUENTO.
        const itemExist = cart.findIndex( element => element.id === item.id );
        
        if(itemExist < 0) { // no existe...agregamos
            const newItem: productCart = {...item, quantity: 1, newPrice: ( user ? roundResult(item.price * ((100-item.desc)/100)) : item.price )};
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
    const removeToCart = (number: productCart['id']) => {
        const updatedCart = cart.filter( element => element.id !== number)
        setCart(updatedCart);
    }
 
    return { cart, addToCart, removeToCart }
}
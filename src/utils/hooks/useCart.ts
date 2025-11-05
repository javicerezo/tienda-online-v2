import { useEffect, useState } from "react";
import { loadStorage, saveStorage } from "@/utils/functions/storage";
import { roundResult } from "../functions/roundResult";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase/firebase.client";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";

import type { product, productCart } from "@/utils/types/product";

export const useCart = () => {
    const [ cart, setCart ] = useState<productCart[]>([]);
    const { user, loading } = useAuth();
    
    const [cartLoaded, setCartLoaded] = useState(false);

    // Cargamos base de datos y machacamos localStorage
    useEffect( () => {
        if (loading) return;    // espera a saber si hay usuario

        const run = async () => {
            try {
                if (user) { // carga desde Firestore
                    const ref = doc(db, "users", user.uid, "cart", "list");
                    const snap = await getDoc(ref);

                    if (snap.exists()) {
                        const data = snap.data();
                        const items = Array.isArray(data?.items) ? data.items : [];
                        setCart(items);
                        saveStorage("cart", items); // sincroniza también el localStorage
                        setCartLoaded(true);
                        return;
                    }
                }

                // si no hay usuario o no hay doc en Firestore, carga del localStorage
                const local = loadStorage("cart");
                setCart(local);
                setCartLoaded(true);
            } catch (e) {
                console.error("No se pudo cargar productVisited desde Firestore", e);
                // fallback a localStorage
                const local = loadStorage("cart");
                setCart(local);
                setCartLoaded(true);
            }
        };

        run();
    }, [user, loading]);

    useEffect( () => {
        if (loading || !cartLoaded) return;

        const run = async () => {
            try {
                if(user) {  // user existe, guardamos en la base de datos y en el storage
                    const ref = doc(db, "users", user.uid, "cart", "list");
                    await setDoc(ref, {
                            items: cart, 
                            updatedAt: serverTimestamp(),
                        },
                        { merge: true }
                    );
                } 

                // siempre guardamos en localStorage
                saveStorage('cart', cart);
            } catch (e){
                console.error("No se ha podido guardar en la base de datos", e);
            }

        }

        run();
    }, [cart, user, loading, cartLoaded]);
    
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

    /**
     * Limpia el carrito de compra del storage
     */
    const clearCart = () => {
        try {
            localStorage.removeItem('cart'); 
        } catch {}
    };
 
    return { cart, addToCart, removeToCart, clearCart }
}
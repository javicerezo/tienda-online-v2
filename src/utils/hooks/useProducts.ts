import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/firebase.client";
import { collection, getDocs } from "firebase/firestore";
import { arrayNumRandom } from "../functions/arrayNumRandom";
import { arrayProductList } from "../functions/arrayProductList";

import type { product } from "../types/product";

/**
 * Este hook consulta la base de datos para ver los productos disponibles
 * @returns un array de todos productos de db, el estado el loading (boolean), y el estado del error (si lo hubiera).
 */
export const useProducts = () => {
    const [ allProducts, setAllProducts ] = useState<product[]>([]);
    const [ randomProducts, setRandomProducts ] = useState<product[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<unknown>(null);
        
        useEffect( () => {
            const fetchData = async () => {
                try {
                const colRef = collection(db, "products");
                const snap = await getDocs(colRef)
                const queryResult = snap.docs.map( doc => doc.data() as product );

                // Devuelve TODOS los productos de la base de datos (se usa en el buscador de productos seeker.tsx)
                setAllProducts(queryResult);   
                
                // Devuelve solo 8 productos al azar de todos los que existen en la base de datos. 
                // la idea es calcular los 8 numeros aleatorios y mostrar solo esos 8 items
                const arrayNum: number[] = arrayNumRandom(8, queryResult.length);
                setRandomProducts(arrayProductList(queryResult, arrayNum));  


                setLoading(false);
            } catch (e) {
                setError(e);
                // Enviar el error a lugar seguro para su tratamiento y solución
            }
        }

        fetchData();
    }, []);

    return { allProducts, randomProducts, loading, error };
}
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/firebase.client";
import { collection, getDocs } from "firebase/firestore";
import { arrayNumRandom } from "../functions/arrayNumRandom";
import { arrayProductList } from "../functions/arrayProductList";

import type { product } from "../types/product";

export const useProducts = () => {
    const [ products, setProducts ] = useState<product[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<unknown>(null);
        
        useEffect( () => {
            const fetchData = async () => {
                try {
                const colRef = collection(db, "products");
                const snap = await getDocs(colRef)
                const queryResult = snap.docs.map( doc => doc.data() as product );
                
                    // la idea es calcular los 8 numeros aleatorios y mostrar solo esos 8 items
                const arrayNum: number[] = arrayNumRandom(8, queryResult.length);
                setProducts(arrayProductList(queryResult, arrayNum));   

                setLoading(false);
            } catch (e) {
                setError(e);
                // Enviar el error a lugar seguro para su tratamiento y solución
            }
        }

        fetchData();
    }, []);

    return { products, loading, error };
}
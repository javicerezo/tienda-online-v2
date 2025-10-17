import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/firebase.client";
import { collection, getDocs } from "firebase/firestore";

import type { product } from "../types/product";

export const useProducts = () => {
    const [ products, setProducts ] = useState<product[]>([]);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<unknown>(null);
    
    // AÑADIR QUE SE MUESTREN 8 PRODUCTOS ALEATORIOS
    // useEffect(() => {
    //     // la idea es calcular los 8 numeros aleatorios y mostrar solo esos 8 items
    //     const arrayNum: number[] = arrayNumRandom(8, Data_Base.length);
    //     setProductList(arrayProductList(Data_Base, arrayNum));   
    // }, []);

    useEffect( () => {
        const fetchData = async () => {
            try {
                const colRef = collection(db, "products");
                const snap = await getDocs(colRef)
                setProducts(snap.docs.map( doc => doc.data() as product ));
                setLoading(false);
            } catch (e) {
                setError(e);
            }
        }

        fetchData();
    }, []);

    return { products, loading, error };
}
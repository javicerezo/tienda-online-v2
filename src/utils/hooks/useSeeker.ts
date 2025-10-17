import { useState } from "react";
import { useProducts } from "./useProducts";

import type { product } from "../types/product";

export const useSeeker = () => {
    const [ showSeeker, setShowSeeker ] = useState<boolean>(false);
    const [ matchArray, setMatchArray ] = useState<product[]>([]);
    const { allProducts } = useProducts();

    const openSeeker = () => {
        setShowSeeker(true);
    }

    const closeSeeker = () => {
        setShowSeeker(false);
    }

    /**
     * Busca coincidencias en la base de datos en función de una palabra dada
     * @param string, recibe un string la palabra de coincidencia para buscar en la base de datos,
     * si hay coincidencia modifica el estado de la variable matchArray
     */
    const searchProductseeker = (string: string) => {
        const newArray = new Set<product>();

        allProducts.forEach( element => {
            const match = (`${element.brand} ${element.name} ${element.type}`).toLowerCase();
            if (match.includes(string.toLowerCase())) {
                newArray.add(element);
            } 
        });
        
        setMatchArray(Array.from(newArray));
    }

    return { showSeeker, matchArray, openSeeker, closeSeeker, searchProductseeker };
}
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
        const newSet = new Set<product>();
        const normalizeString = string.toLowerCase().trim();

        if(!normalizeString) {
            setMatchArray([]);
            return;
        }
        if(normalizeString != ''){
            allProducts.forEach( element => {
                const match = (`${element.brand} ${element.name} ${element.type}`).toLowerCase();
                if (match.includes(normalizeString)) {
                    newSet.add(element);
                } 
            });
            
            setMatchArray(Array.from(newSet));
            return;
        }
    }

    return { showSeeker, matchArray, openSeeker, closeSeeker, searchProductseeker };
}
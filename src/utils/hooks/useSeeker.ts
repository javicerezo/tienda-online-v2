import { useState } from "react";
import { useProducts } from "./useProducts";

import type { product } from "../types/product";

export const useSeeker = () => {
    const [ showSeeker, setShowSeeker ] = useState<boolean>(false);
    const { allProducts } = useProducts();

    const openSeeker = () => {
        setShowSeeker(true);
    }

    const closeSeeker = () => {
        setShowSeeker(false);
    }

    /**
     * Busca coincidencias en la base de datos en función de una palabra dada
     * @param string recibe un string la palabra de coincidencia para buscar en la base de datos
     * @returns retorna un array de productos coincidentes a esa palabra
     */
    const searchProductseeker = (string: string) => {
        const newArray = new Set<product>();

        allProducts.forEach( element => {
            const match = (`${element.brand} ${element.name} ${element.type}`).toLowerCase();
            if (match.includes(string.toLowerCase())) {
                newArray.add(element);
            } 
        });
        return Array.from(newArray);
    }

    return { showSeeker, openSeeker, closeSeeker, searchProductseeker };
}
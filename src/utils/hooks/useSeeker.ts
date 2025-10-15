import { useState } from "react";
import { Data_Base } from "@/data/data";

import type { product } from "../types/product";

export const useSeeker = () => {
    const [ showSeeker, setShowSeeker ] = useState<boolean>(false);

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
            const newArray: product[] = [];
            string = string.toLowerCase();
    
            Data_Base.forEach( articulo => {
                const marcador = (`${articulo.brand} ${articulo.name} ${articulo.type}`).toLowerCase();
                const productoRepetido = newArray.some( art => art.id === articulo.id);
    
                if (marcador.includes(string)) {
                    if (productoRepetido == false) { // producto no repetido, lo agrego
                        newArray.push(articulo);
                    }
                } 
            });
            return newArray;
        }

    return { showSeeker, openSeeker, closeSeeker, searchProductseeker };
}
import { useState, useEffect } from "react";
import { loadStorage, saveStorage } from "./storage";

import type { product } from "../types/product";

export const useVisited = () => {
    const [ visited, setVisited ] = useState<product[]>([]);
    
    useEffect( () => {
    const localStorageVisited = loadStorage('visited');
    setVisited(localStorageVisited);
    }, []);

    useEffect( () => {
        saveStorage('visited', visited);
    }, [visited]);

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


    return { visited, addToVisited }
}
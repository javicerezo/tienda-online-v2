import { product } from "../types/product";


// METER LOCALSTORAGE EN ARTICULOS DEL CARRITO Y EN VISITADOS.
export function saveStorage(nombreArray: string, array: product[]){
    localStorage.setItem(nombreArray, JSON.stringify(array));
};

export function loadStorage (nombreArray: string) {
    if(typeof window === "undefined") return [];

    const data = localStorage.getItem(nombreArray);
    if(!data) {
        return [];
    }
    return JSON.parse(data);
};
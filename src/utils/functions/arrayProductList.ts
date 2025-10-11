import { productProps } from "../types/product";

/**
 * función recibe 1 array de BaseDatos y 1 array con ids, y devuelve un nuevo array con los objetos correspodientes a esos ids
 * @param arrayBD array de la base de datos (la que contiene la información con todos los items)
 * @param arrayAleatorio array de números (esos números son aleatorios serán los ids de los items para buscarlos)
 * @returns retorna un array con los items correspondientes a esos números aleatorios
 */
export function arrayProductList (arrayBD: productProps[], arrayAleatorio: number[]) {
    const arrayReturn: productProps[] = [];
    arrayAleatorio.forEach( id => {
        const obj = arrayBD.filter( elemento => elemento.id === id);
        arrayReturn.push(obj[0]);
    })
    return arrayReturn;
}
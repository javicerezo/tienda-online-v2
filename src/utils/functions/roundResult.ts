
/**
 * Función que toma un valor y lo redondea al segundo decimal
 * @param valor numero a redondear
 * @returns retorna el valor ya redondeado al segundo decimal
 */
export function roundResult (valor: number) {
    const resultado = Math.round(valor*100)/100;

    return resultado;
};
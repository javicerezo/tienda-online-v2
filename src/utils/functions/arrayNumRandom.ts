
/**
 * Función que crea un array de números aleatorios
 * @param longArray longitug del array (la cantidad de números aleatorios que queremos)
 * @param limitSup limite superior (el número máximo de esos números)
 * @returns retorna un array de números aleatorios de 'longArray' posiciones
 */
export function arrayNumRandom(longArray: number, limitSup: number): number[] {
  // con set me aseguro que el array no tenga repetidos
  const numeros = new Set<number>();

  while (numeros.size < longArray) {
    const numeroAleatorio = Math.floor(Math.random() * limitSup) + 1;
    numeros.add(numeroAleatorio);
  }

  return Array.from(numeros);
}
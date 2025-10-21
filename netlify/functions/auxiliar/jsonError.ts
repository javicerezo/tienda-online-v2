/**
 * 
 * @param message string
 * @returns devuelve el contenido de la petición con un mensaje para mostrar en el frontend y su estado
 */
export const jsonError = (statusCode: number, status: string, message: string) => {
    return {
        statusCode: statusCode,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                status: status,
                message
            }
        )
    };
}
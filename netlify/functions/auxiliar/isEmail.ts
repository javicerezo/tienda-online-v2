/**
 * 
 * @param s string
 * @returns boolean devuelve si un sstring es un correo válido o no
 */
export const isEmail = (s: string) => /^\S+@\S+\.\S+$/.test(s);
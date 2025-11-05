import { useState, useEffect } from "react";
import { loadStorage, saveStorage } from "../functions/storage";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase/firebase.client";
import { getDoc, doc, setDoc, serverTimestamp } from "firebase/firestore";

import type { product } from "../types/product";

export const useVisited = () => {
    const [ visited, setVisited ] = useState<product[]>([]);
    const { user, loading } = useAuth();

    const [visitedLoaded, setVisitedLoaded] = useState(false);

    // Cargamos base de datos y machacamos localStorage
    useEffect( () => {
        if (loading) return;    // espera a saber si hay usuario

        const run = async () => {
            try {
                if (user) { // carga desde Firestore
                    const ref = doc(db, "users", user.uid, "productVisited", "list");
                    const snap = await getDoc(ref);

                    if (snap.exists()) {
                        const data = snap.data();
                        const items = Array.isArray(data?.items) ? data.items : [];
                        setVisited(items);
                        saveStorage("visited", items); // sincroniza también el localStorage
                        setVisitedLoaded(true);
                        return;
                    }
                }

                // si no hay usuario o no hay doc en Firestore, carga del localStorage
                const local = loadStorage("visited");
                setVisited(local);
                setVisitedLoaded(true);
            } catch (e) {
                console.error("No se pudo cargar productVisited desde Firestore", e);
                // fallback a localStorage
                const local = loadStorage("visited");
                setVisited(local);
                setVisitedLoaded(true);
            }
        };

        run();
    }, [user, loading]);

    useEffect( () => {
        if (loading || !visitedLoaded) return;

        const run = async () => {
            try {
                if(user) {  // user existe, guardamos en la base de datos y en el storage
                    const ref = doc(db, "users", user.uid, "productVisited", "list");
                    await setDoc(ref, {
                            items: visited, // array completo ordenado
                            updatedAt: serverTimestamp(),
                        },
                        { merge: true }
                    );
                } 

                // siempre guardamos en localStorage
                saveStorage('visited', visited);
            } catch (e){
                console.error("No se ha podido guardar en la base de datos", e);
            }

        }

        run();
    }, [visited, user, loading, visitedLoaded]);

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
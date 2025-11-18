'use client'

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase/firebase.client";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs, getDoc, addDoc, orderBy, query, where, serverTimestamp } from "firebase/firestore";
import { docToNews } from '@/utils/functions/docToNews';
import { formatDate } from "@/utils/functions/formatDate";
import { useInitContent } from "@/utils/hooks/useInitContent";

import { Paragraph } from '@/components/ui/Paragraph/Paragraph';
import { FaRegComment } from "react-icons/fa6";
import Image from "next/image";

import type { newsDB, commentDB, ArticleDetailsProps } from '@/utils/types/new';
import './ArticleDetails.scss';
import '@/components/ui/Button/Button.scss';
import { ArticleCard } from "./ArticleCard";

const sleep = (delay: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, delay));
};

export const ArticleDetails = ({ article }: ArticleDetailsProps) => {
    const [ item, setItem ] = useState<newsDB | undefined>(undefined);
    const [ userInfo, setUserInfo ] = useState<{uid: string, name: string, email: string} | null>(null);
    const [commentArticle, setCommentArticle] = useState<commentDB[]>([]);

    const [ status, setStatus ] = useState<"idle" | "spinner" | "success" | "error">("idle");
    const [ feedback, setFeedback ] = useState<string>("");

    const { latestNews, loading } = useInitContent();

    /**
     * Comprueba si existe usuario y artículo, valida el comentario y hace petición al backend para subirlo a la base de datos
     * @param e evento de formulario
     */
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Comprobamos user y artículo por mayor seguridad
        if (!userInfo || !item) {
            setStatus("error");
            setFeedback("Debes iniciar sesión para poder comentar.");
            return;
        }

        const form = e.currentTarget;
        const formData = new FormData(e.currentTarget);
        const commentText = formData.get("comment")?.toString().trim() ?? "";

        // Validamos el comentario
        if (!commentText) {
            setStatus("error");
            setFeedback("Hay que rellenar el comentario para poder enviarlo.");
            return;
        }

        setStatus("spinner");
        await sleep(1000);

        // Subimos comentario a la base de datos
        try {
            const commentsRef = collection(db, "news", item.id, "comments");

            const docRef = await addDoc(commentsRef, {
                text: commentText,
                author: userInfo.name,
                emailAuthor: userInfo.email,
                createdAt: serverTimestamp(),
            });

            // actualizar la lista en el front
            setCommentArticle(prev => [
                ...prev,
                {
                    id: docRef.id,
                    text: commentText,
                    author: userInfo.name,
                    createdAt: new Date(), // para mostrar algo inmediato
                },
            ]);

            setStatus("success");
            setFeedback("Comentario agregado satisfactoriamente");
            form.reset();
        } catch (err) {
            console.error("Error al guardar comentario:", err);
            setStatus("error");
            setFeedback("Error en la base de datos, inténtalo de nuevo por favor");
        } finally {
            await sleep(2500);
            setStatus("idle");
            setFeedback("");
        }
    }

    // Comprobamos si user está logueado
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (!user) {
            setUserInfo(null);
            return;
        }

        try {
            const userRef = doc(db, "users", user.uid);
            const snap = await getDoc(userRef);

            if (snap.exists()) {
                const data = snap.data() as { name?: string; email?: string };
                setUserInfo({
                    uid: user.uid,
                    name: data.name ?? "",
                    email: data.email ?? "",
                });
            } else {
                setUserInfo({
                    uid: user.uid,
                    name: "",
                    email: user.email ?? "",
                });
            }
        } catch {
            setUserInfo(null);
            setStatus("error");
            setFeedback("Error en la base de datos al cargar el usuario");
        }
    });

    // limpiar el listener al desmontar
    return () => unsubscribe();
    }, []);

    // Comprobamos que existe el artículo (article se pasa por Prop gracias a Next)
    useEffect(() => {
        if (!article) return;

        (async () => {
            try {
                const q = query(collection(db, 'news'), where('slug', '==', article));
                const snap = await getDocs(q);

                if (snap.empty) {
                    setItem(undefined);
                    setCommentArticle([]);
                    return;
                }

                const docSnap = snap.docs[0];
                const news = docToNews(docSnap);
                setItem(news);

                // consulta para los comentarios de ese artículo
                const articleId = docSnap.id;
                const q2 = query(collection(db, 'news', articleId, 'comments'), orderBy('createdAt', 'asc'));
                const snapComments = await getDocs(q2);

                const commentsResult: commentDB[] = snapComments.docs.map( comment => {
                    const data = comment.data();

                    return {
                        id: comment.id,
                        text: data.text,
                        author: data.author,
                        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                    };
                });

                setCommentArticle(commentsResult);

            } catch (e) {
                console.error('Firestore error (category):', e);
            }
            })();
    }, [article]);

    if (!item) return <Paragraph text={`artículo no encontrado`} styleGreen={false}/>;

    return (
        <div className="ArticleDetails">
            <div className="ArticleDetails-article">
                <h5 className="ArticleDetails-title">{item.titulo}</h5>
                <div className="ArticleDetails-up">
                    <p className="ArticleDetails-date">{formatDate(item.createdAt)}</p>
                    <a href="#Comments" className="ArticleDetails-blue"><FaRegComment /></a>
                    <a href="#Comments" className="ArticleDetails-blue">Deja tu comentario</a>
                </div>
                <Image
                    className='ArticleDetails-img'
                    width={140} height={60}
                    src={`/assets/imgs/blog/${item.imagen}`}
                    alt="imagen"
                    loading="lazy"
                />
                <p className="ArticleDetails-text">{item.desarrollo}</p>
            </div>
            <div className="ArticleDetails-boxRecomended">
                <h3 className="ArticleDetails-h3">Artículos más recientes</h3>
                <ul className="ArticleDetails-ul">
                    {loading && (
                        <Paragraph text="cargando últimos artículos" styleGreen={true} />
                    )}
                    {latestNews.map( element => (
                        <ArticleCard 
                            key={element.id}
                            element={element}    
                        />
                    ))}
                </ul>
            </div>
            <div className="ArticleDetails-boxComments" id="Comments">
                <h3 className="ArticleDetails-h3--mod">Comentarios</h3>
                <div className="ArticleDetails-listComments">
                    { commentArticle.length == 0 && (
                        <Paragraph text="aún no hay comentarios" styleGreen={true} />
                    )}
                    {commentArticle.map( element => (
                        <li className="ArticleDetails-listComments-comment" key={element.id}>
                            <div className="ArticleDetails-listComments-up">
                                <p className="ArticleDetails-listComments-p">{formatDate(element.createdAt)}</p>
                                <p className="ArticleDetails-listComments-p">{element.author}</p>
                            </div>
                            <div className="ArticleDetails-listComments-down">
                                <p className="ArticleDetails-listComments-text">{element.text}</p>
                            </div>
                        </li>
                    ))}
                </div>

                <form className="ArticleDetails-form" onSubmit={handleSubmit}>
                    <h5 className="ArticleDetails-form-h5">Deja tu comentario</h5>
                    <div className="ArticleDetails-form-container">
                        <div className="ArticleDetails-fieldsetContainer">
                            <fieldset className="ArticleDetails-fieldset">
                                <p className="ArticleDetails-p">Tu alias:</p>
                                <input
                                    className={`ArticleDetails-input ${!userInfo?.name ? 'ArticleDetails-input--disabled' : ''}`}
                                    name="alias"
                                    type="text"
                                    placeholder={userInfo?.name}
                                    readOnly
                                />
                            </fieldset>
                            <fieldset className="ArticleDetails-fieldset">
                                <p className="ArticleDetails-p">Tu comentario:</p>
                                <textarea
                                    className={`ArticleDetails-input ${!userInfo?.name ? 'ArticleDetails-input--disabled' : ''}`}
                                    name="comment"
                                    cols={30}
                                    rows={10}
                                    required
                                    disabled={!userInfo?.name}
                                ></textarea>
                            </fieldset>
                            <fieldset className="ArticleDetails-fieldsetContainer--mod">
                                <button
                                    className={`Button Button--amarillo ${!userInfo?.name ? 'ArticleDetails-button--disabled' : ''}`}
                                    type="submit"
                                    disabled={!userInfo?.name}
                                >Enviar</button>
                            </fieldset>

                            {/* SI NO HAY USER NO SE PUEDE COMENTAR */}
                            <div>
                                <div className={`ArticleDetails-spinner ${status === "spinner" ? "ArticleDetails-spinner--show" : ""}`}>
                                    <div className="sk-chase">
                                        <div className="sk-chase-dot"></div>
                                        <div className="sk-chase-dot"></div>
                                        <div className="sk-chase-dot"></div>
                                        <div className="sk-chase-dot"></div>
                                        <div className="sk-chase-dot"></div>
                                        <div className="sk-chase-dot"></div>
                                    </div>
                                </div>
                                {!userInfo?.name && (
                                    <Paragraph text="Debes iniciar sesión para poder comentar." styleGreen={false} />
                                )}
                                {status === "success" && (
                                    <Paragraph text={feedback} styleGreen={true} />
                                )}
                                {status === "error" && (
                                    <Paragraph text={feedback} styleGreen={false} />
                                )}
                            </div>

                        </div>
                        <ul className="ArticleDetails-norms">
                            <li className="ArticleDetails-li">Normas de uso:</li>
                            <li className="ArticleDetails-li">Se reserva el derecho a eliminar aquellos comentarios que:</li>
                            <li className="ArticleDetails-li">No se ajusten al tema del artículo</li>
                            <li className="ArticleDetails-li">Contengan mensajes ofensivos, discriminatorios, racistas o xenófobos</li>
                            <li className="ArticleDetails-li">Promuevan o apoyen actividades ilegales</li>
                            <li className="ArticleDetails-li">Suministren información acerca de usuarios sin su consentimiento</li>
                            <li className="ArticleDetails-li">Contengan spam</li>
                        </ul>
                    </div>
                </form>
            </div>
        </div>
    )
}
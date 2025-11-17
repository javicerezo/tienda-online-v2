'use client'

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/firebase.client";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { docToNews } from '@/utils/functions/docToNews';

import { Paragraph } from '@/components/ui/Paragraph/Paragraph';
import { FaRegComment } from "react-icons/fa6";
import Image from "next/image";

import type { newsDB, commentDB } from '@/utils/types/new';
import './ArticleDetails.scss';

type ArticleDetailsProps = {
    article: string; // viene de params.categoria
};


export const ArticleDetails = ({ article }: ArticleDetailsProps) => {
    const [item, setItem] = useState<newsDB | undefined>(undefined);
    const [commentArticle, setCommentArticle] = useState<commentDB[]>([]);

    /**
     * Formatea la fecha para mostrarla 
     */
    const dateLabel = item?.createdAt
    ? item?.createdAt.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '';

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('no hagas nada')
    }

    useEffect(() => {
        if (!article) return;

        (async () => {
            try {
                //consulta para el artículo
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
                    <p className="ArticleDetails-date">{dateLabel}</p>
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
                    {/* // todo artículos recomendados */}
                    <p>mostrar </p>
                    <p>mostrar </p>
                    <p>mostrar </p>
                </ul>
            </div>
            <div className="ArticleDetails-boxComments" id="Comments">
                <h3 className="ArticleDetails-h3--mod">Comentarios</h3>
                <div className="ArticleDetails-listComments">
                    { commentArticle.length == 0 && (
                        <Paragraph text="aún no hay comentarios" styleGreen={true} />
                    )}
                    {commentArticle.map( element => (
                        <li className="ArticleDetails-listComment-comment" key={element.id}>
                            <div className="ArticleDetails-listComment-up">
                                <p className="ArticleDetails-listComment-p">{element.author}</p>
                                <p className="ArticleDetails-listComment-p">{element.author}</p>
                            </div>
                            <div className="ArticleDetails-listComment-down">
                                <p className="ArticleDetails-listComment-text">{element.text}</p>
                            </div>
                        </li>
                    ))}

                </div>

                <form className="ArticleDetails-form" onSubmit={handleSubmit}>
                    <h5 className="ArticleDetails-form-h5">Deja tu comentario</h5>
                    <div className="ArticleDetails-form-container">
                        <div className="ArticleDetails-fieldsetContainer">
                            <fieldset className="ArticleDetails-fieldset">
                                <p>Tu alias:</p>
                                <input  
                                    name="alias"
                                    type="text" 
                                    required
                                />
                            </fieldset>
                            <fieldset className="ArticleDetails-fieldset">
                                <textarea name="comment" id="commentId" cols={30} rows={10}></textarea>
                            </fieldset>
                            <fieldset className="ArticleDetails-fieldsetContainer--mod">
                                <button className="Button Button--amarillo">Enviar</button>
                            </fieldset>
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
                    <div className="ArticleDetails-response">
                        {/* FEEDBACK */}
                    </div>
                </form>
            </div>
        </div>
    )
}


// main.c-entradaDetalle     
//         .c-entradaDetalle__contenedor
//             



//             .c-entradaDetalle__boxRecientes 
//                 h3.c-entradaDetalle__recientes Artículos más recientes 
//                 include ./layout/bloque_entradas-recomendadas

//             .c-entradaDetalle__boxComentarios(id="comentarios")
//                 h3.c-entradaDetalle__h3--mod Comentarios
//                 .c-entradaDetalle__listadoComentarios
//                     each entr in entrada
//                         each comentario in listadoComentarios
//                             if(entr.id == comentario.comentarioId)
//                                 .c-entradaDetalle__listadoComentarios-comentario
//                                     .c-entradaDetalle__listadoComentarios-arriba
//                                         p.c-entradaDetalle__listadoComentarios-p #{comentario.alias} -
//                                         p.c-entradaDetalle__listadoComentarios-p.js-entradaDetalle__listadoComentarios-fecha #{comentario.createdAt}
//                                     .c-entradaDetalle__listadoComentarios-abajo 
//                                         p.c-entradaDetalle__listadoComentarios-texto #{comentario.comentario}



//                 each entr in entrada 
//                     each categoria in todasCategorias
//                         if(entr.tipoId == categoria.id)
//                             h3.c-entradaDetalle__h3 Comentarios









//                             form.c-entradaDetalle__form.js-entradaDetalle__form(action=`/entradas/${categoria.categoria}/${entr.titulo}` method="POST")
//                                 h5.c-entradaDetalle__form-h5 Deja tu comentario

//                                 .c-entradaDetalle__form-contenedor
//                                     .c-entradaDetalle__fieldsetContenedor
//                                         fieldset.c-entradaDetalle__fieldset
//                                             p Tu alias:
//                                             input.js-entradaDetalle__fieldset-alias(type="text", name="alias", value=alias) 
//                                             input.c-entradaDetalle__fieldset-id(type="text", name="comentarioId", value=`${entr.id}`) 
//                                         fieldset.c-entradaDetalle__fieldset
//                                             p Deja tu comentario:
//                                             textarea.js-entradaDetalle__fieldset-textarea(name="comentario", cols="30", rows="10")= comentario
//                                         fieldset.c-entradaDetalle__fieldsetContenedor--mod
//                                             input.c-button.c-button--amarillo.js-entradaDetalle__fieldset-boton(type="submit", value="enviar")



//                                     ul.c-entradaDetalle__normas
//                                         li.c-entradaDetalle__normas-li Normas de uso:
//                                         li.c-entradaDetalle__normas-li Se reserva el derecho a eliminar aquellos comentarios que: 
//                                         li.c-entradaDetalle__normas-li No se ajusten al tema del artículo.
//                                         li.c-entradaDetalle__normas-li Contengan mensajes ofensivos, discriminatorios, racistas o xenófobos. 
//                                         li.c-entradaDetalle__normas-li Promuevan o apoyen actividades ilegales. 
//                                         li.c-entradaDetalle__normas-li Suministren información acerca de usuarios sin su consentiento.
//                                         li.c-entradaDetalle__normas-li Contengan spam. 


//                             .js-entradaDetalle__contenedorMensaje                            
//                                 if(mensaje)
//                                     each m in mensaje
//                                         if(m.tipo == 'alerta')
//                                             p.u-mensaje.u-mensaje--alerta= m.contenido
//                                         if(m.tipo == 'exito')
//                                             p.u-mensaje.u-mensaje--exito= m.contenido
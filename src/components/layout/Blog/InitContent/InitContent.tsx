
import Image from 'next/image';

import './InitContent.scss';

export const InitContent = () => {
    return (
        <main className='InitContent'>
            <div className="InitContent-container">
                <h2 className="InitContent-h2">Sobre Nosotros</h2>
                <div className="InitContent-content">
                    <p className="InitContent-content-p">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa delectus dolor nobis ullam quibusdam saepe, commodi, facilis minus dolorum sit voluptates corrupti. Earum fugiat quis voluptatum quia voluptate a fugit?Quo eius, quos quidem exercitationem dolor quod minima esse laboriosam minus velit repellendus illo porro labore odit repudiandae suscipit sit! Impedit explicabo rem aspernatur, voluptatem facere laudantium id delectus obcaecati.Aspernatur nobis veritatis atque ab dolor nesciunt dolorem sit veniam eligendi repellat odio libero, magnam nihil pariatur possimus autem harum voluptas aperiam delectus quam suscipit aut ipsa et?</p>
                    <div className="InitContent-content-img">
                        <Image 
                            width='140' height='60' 
                            src="/assets/imgs/blog/portada2.jpg" 
                            alt="logo tienda deportes montaña" 
                            loading="lazy" 
                        />
                    </div>
                </div>
                <h2 className="InitContent-h2">Últimas entradas del blog</h2>
                <div className="InitContent-content">
                    {/* terminarrrrrrr */}

{/* 
                    .c-entradaDetalle__grid
                        each entrada in entradasRecomendadas 
                            each categoria in todasCategorias
                                if(categoria.id == entrada.tipoId)
                                    li.c-entradaDetalle__noticiasRecientes
                                            .c-entradaDetalle__noticiasRecientes-img--mod
                                                a(href=`/entradas/${categoria.categoria}/${entrada.titulo}`)
                                                    img(src=`/assets/img/${entrada.imagen}` alt=`imagen noticia`)
                                            .c-entradaDetalle__noticiasRecientes-contenido
                                                .c-entradaDetalle__noticiasRecientes-titulo
                                                    a(href=`/entradas/${categoria.categoria}/${entrada.titulo}`)
                                                        h5 #{entrada.titulo}
                                                .c-entradaDetalle__noticiasRecientes-cuadro
                                                    a.c-entradaDetalle__noticiasRecientes-categoria(href=`/entradas/${categoria.categoria}`) #{categoria.categoria}
                                                    span.c-entradaDetalle__noticiasRecientes-fecha #{entrada.updatedAt}
                                                p.c-entradaDetalle__noticiasRecientes-texto--mod #{entrada.desarrollo} */}

                </div>
                <h2 className="InitContent-h2">Rutas y escaladas recomendadas</h2>
                <div className="InitContent-content">

                </div>

            </div>

            {/* TODO hace contenido de la principal del blog */}
            {/* main.c-inicio 
                .c-inicio__contenedor 
                    h2.c-inicio__h2 Sobre Nosotros
                    .c-inicio__sobreNosotros 
                        p.c-inicio__sobreNosotros-p Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa delectus dolor nobis ullam quibusdam saepe, commodi, facilis minus dolorum sit voluptates corrupti. Earum fugiat quis voluptatum quia voluptate a fugit?Quo eius, quos quidem exercitationem dolor quod minima esse laboriosam minus velit repellendus illo porro labore odit repudiandae suscipit sit! Impedit explicabo rem aspernatur, voluptatem facere laudantium id delectus obcaecati.Aspernatur nobis veritatis atque ab dolor nesciunt dolorem sit veniam eligendi repellat odio libero, magnam nihil pariatur possimus autem harum voluptas aperiam delectus quam suscipit aut ipsa et?
                        .c-inicio__sobreNosotros-img
                            img(src="/assets/img/portada2.jpg" alt="imagen sobre nosotros")
                    .c-inicio__ultimasEntradas
                        h2.c-inicio__h2 Últimas entradas de blog

                        include ./layout/bloque_entradas-recomendadas              
                    .c-inicio__entradasVisitadas
                        h2.c-inicio__h2 Rutas y escaladas recomendadas
                        each categoria in todasCategorias 
                            include ./layout/bloque_entradas              
                    
                    h2.c-inicio__h2 Club de escala y montaña
                    .c-inicio__clubMontana 
                        p.c-inicio__clubMontana-p ¿Quieres conocernos?
                        a.c-button.c-button--amarillo.c-inicio__clubMontana-input(href="/club") Conocénos */}
        </main>
    )
}
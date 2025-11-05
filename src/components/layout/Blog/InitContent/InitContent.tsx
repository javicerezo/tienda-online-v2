
import Image from 'next/image';
import Link from 'next/link';

import './InitContent.scss';
import '@/components/ui/Button/Button.scss';
import { Article } from '../Article/Article';

export const InitContent = () => {
    return (
        <main className='InitContent'>
            <div className="InitContent-container">
                <h2 className="InitContent-h2">Sobre Nosotros</h2>
                <div className="InitContent-content">
                    <p className="InitContent-p">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa delectus dolor nobis ullam quibusdam saepe, commodi, facilis minus dolorum sit voluptates corrupti. Earum fugiat quis voluptatum quia voluptate a fugit?Quo eius, quos quidem exercitationem dolor quod minima esse laboriosam minus velit repellendus illo porro labore odit repudiandae suscipit sit! Impedit explicabo rem aspernatur, voluptatem facere laudantium id delectus obcaecati.Aspernatur nobis veritatis atque ab dolor nesciunt dolorem sit veniam eligendi repellat odio libero, magnam nihil pariatur possimus autem harum voluptas aperiam delectus quam suscipit aut ipsa et?</p>
                    <div className="InitContent-img">
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
                    <ul className="InitContent-lastEntries">
                        {/* todo hacer map, solo 4 últimas entradas*/}
                        <Article />
                        <Article />
                        <Article />
                        <Article />
                    </ul>
                </div>
                <h2 className="InitContent-h2">Rutas y escaladas recomendadas</h2>
                <div className="InitContent-content">
                    <ul className="InitContent-recomendedRoutes">
                        {/* todo hacer map solo dos escaladas recomendadas */}
                        <Article />
                        <Article />
                        <Article />
                        <Article />
                    </ul>
                </div>
                <h2 className="InitContent-h2">Club de escalada y montaña</h2>
                <div className="InitContent-content">
                    <div className="InitContent-clubMontana">
                        <p className="InitContent-paragraph">¿Quieres conocernos?</p>
                        <Link 
                            className="InitContent-button Button Button--amarillo"
                            href="/club" target='_blank'>Conócenos</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
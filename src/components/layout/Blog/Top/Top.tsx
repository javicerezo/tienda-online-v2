import './Top.scss';

export const Top = () => {
    const nombreSitio: string = "Blog de Montaña";

    return (
        <section className='Top'>
            <div className="Top-container">
                <h1 className='Top-h1'>{nombreSitio}</h1>
                <h3 className='Top-h3'>aventura</h3>
            </div>
        </section>
    )
}
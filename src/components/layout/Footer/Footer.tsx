import './Footer.scss';
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="Footer o-container-100">
            <div className="Footer-contenedor">
                <ul className="Footer-ul">
                    <a className="Footer-li" href="#" target="_blank"><FaFacebook /></a>
                    <a className="Footer-li" href="#" target="_blank"><FaYoutube /></a>
                    <a className="Footer-li" href="#" target="_blank"><FaInstagram /></a>
                    <a className="Footer-li" href="#" target="_blank"><FaTwitter /></a>
                </ul>
                <div className="Footer-copy">
                    <p>1995-2023 Tienda de Esquí y montaña S.L. Todos los derechos reservados</p>
                </div>
            </div>
        </footer>
    );
}
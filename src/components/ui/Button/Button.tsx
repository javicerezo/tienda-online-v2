import './Button.scss';

interface Props {
    title: string;
}

export const Button = ({ title }: Props ) => {
    return (
        <a className="Button Button--amarillo Portada-boton js-portada-boton" href="#c-item">{title}</a>
    );
}
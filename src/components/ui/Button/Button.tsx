import './Button.scss';

interface Props {
    title: string;
    enlace: string;
}

export const Button = ({ title, enlace }: Props ) => {
    return (
        <a className="Button Button--amarillo" href={`#${enlace}`}>{title}</a>
    );
}
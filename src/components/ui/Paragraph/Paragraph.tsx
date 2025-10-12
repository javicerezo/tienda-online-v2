import type { ParagraphProps } from "@/utils/types/paragraph";

import './Paragraph.scss';

export const Paragraph = ({ text, styleGreen }: ParagraphProps) => {
    return (
        <p className={`Paragraph ${styleGreen ? "Paragraph--green" : "Paragraph--red"}`}>{text}</p>
    );
};
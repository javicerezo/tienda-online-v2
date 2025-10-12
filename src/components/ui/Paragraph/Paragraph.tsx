import type { ParagraphProps } from "@/utils/types/paragraph";

import './Paragraph.scss';

export const Paragraph = ({ text }: ParagraphProps) => {
    return (
        <p className="Paragraph">{text}</p>
    );
};
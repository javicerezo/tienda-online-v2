import { product } from "./product";

export interface seekerProps {
    showSeeker: boolean;
    onClose: () => void;
    searchProductseeker: (query: string) => product[];
    addToCart: (item: product) => void;
    addToVisited: (item: product) => void;
}
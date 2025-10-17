import { product } from "./product";

export interface seekerProps {
    showSeeker: boolean;
    matchArray: product[];
    onClose: () => void;
    searchProductseeker: (query: string) => void;
    addToCart: (item: product) => void;
    addToVisited: (item: product) => void;
}
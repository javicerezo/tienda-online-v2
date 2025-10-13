import { productCart } from "./product";

export interface headerProps {
    cart: productCart[];
    eliminateToCart: (number: number) => void;
}

export interface menuProps {
    cart: productCart[];
    eliminateToCart: (number: number) => void;
}

export interface cartCardProps {
    product: productCart;
    eliminateToCart: (number: number) => void;
}
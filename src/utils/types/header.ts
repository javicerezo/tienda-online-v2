import { productCart } from "./product";

export interface headerProps {
    cart: productCart[];
    eliminateToCart: (number: productCart['id']) => void;
    openSeeker: () => void;
}

export interface menuProps {
    cart: productCart[];
    eliminateToCart: (number: productCart['id']) => void;
}

export interface navProps {
    showMenuBars: boolean;
}

export interface cartCardProps {
    product: productCart;
    eliminateToCart: (number: productCart['id']) => void;
}
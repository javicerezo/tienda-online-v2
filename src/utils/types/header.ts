import { productCart } from "./product";

export interface headerProps {
    cart: productCart[];
}

export interface menuProps {
    cart: productCart[];
}

export interface cartCardProps {
    product: productCart;
}
import { productCart } from "./product";

export interface headerProps {
    cart: productCart[];
    eliminateToCart: (number: productCart['id']) => void;
    openSeeker: () => void;
    searchProductseeker: (query: string) => void; 
    showCart: boolean;
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>; // Así es como se pasa una función setter que modifica un State
}

export interface menuProps {
    cart: productCart[];
    eliminateToCart: (number: productCart['id']) => void;
    showCart: boolean;
    setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface navProps {
    showMenuBars: boolean;
    openSeeker: () => void;
    searchProductseeker: (query: string) => void;
}

export interface cartMenuProps {
    product: productCart;
    eliminateToCart: (number: productCart['id']) => void;
}

export interface cartProps {
    cart: productCart[];
    eliminateToCart: (number: productCart['id']) => void;
    onClose: () => void
}

export interface cartElementProps {
    product: productCart;
    eliminateToCart: (number: productCart['id']) => void;
}
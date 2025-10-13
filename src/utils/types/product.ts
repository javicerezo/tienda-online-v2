// Es el type de cada item de producto
export interface product {
    brand: string;                    
    name: string;            
    type: string;            
    image: string;            
    price: number;           
    desc: number;    
    id: number;
}
export interface productCart extends product {
    quantity: number;
}

export interface productsProps {
    addToCart: (item: product) => void;
}
export interface productCardProps{
    product: product;
    addToCart: (item: product) => void;
}

export interface productModalProps  {
    product: product;
    onClose: () => void;
}



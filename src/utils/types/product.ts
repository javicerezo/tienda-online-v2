// Es el type de cada item de producto
export interface product {
    marca: string;                    
    nombre: string;            
    tipo: string;            
    imagen: string;            
    precio: number;           
    descuento: number;    
    id: number;
}

export interface productCardProps {
    marca: string;                    
    nombre: string;            
    imagen: string;            
    precio: number;           
    descuento: number;    
    id: number;
    handleModal: () => void;
    handleCart: () => void;
}

export interface productModalProps  {
    product: product;
    onClose: () => void;
    handleCart: () => void;
}

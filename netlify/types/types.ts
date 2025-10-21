export interface signupForm {
    email: string;
    name: string;
    password: string;
    passwordRepeat: string;
};

export interface loginForm {
    email: string;
    password: string;
};

// Es el type de cada item de producto
interface product {
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
    newPrice: number;
}
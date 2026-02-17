export interface Product {
    id: string;
    title: string;
    price: number;
    currency: string;
    image: string;
    category: string;
    location: string;
    seller: {
        id: string;
        name: string;
        whatsapp: string;
    };
    isFavorite: boolean;
    specs?: { label: string; value: string }[];
}

export interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    favorites: string[];
}

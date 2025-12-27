import React, {createContext, useContext, useState, useEffect} from "react";

export type CartItem = {
    id: number;
    name: string;
    price: number;
    img: string;
    quantity: number;
};
type cartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem)=> void;
    updateQty: (id: number, qty: number) => void;
    removeFromCart: (id: number) => void;
    toggleCart: () => void;
    isOpen: boolean;

};

const CartContext = createContext<cartContextType | null>(null);
const CART_STORAGE_KEY = 'cart_items';

export const CartProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {

    const [cart, setCart] = useState<CartItem[]>(() => {
        try{
            const stored = localStorage.getItem(CART_STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch{
            return [];
        }
    });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const exists = prev.find(p => p.id === item.id);
            if(exists){
                return prev.map(p => 
                    p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prev, { ...item, quantity:1 }];
        });

        setIsOpen(true);
    };

    const updateQty = ( id: number, qty:number)=>{
        setCart(prev =>
            prev.map(p => (p.id === id ? { ...p, quantity: Math.max(1, qty)} : p))
        );
    };

    const removeFromCart = (id: number) => {
        setCart(prev => prev.filter(p => p.id !== id));
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, toggleCart: () => setIsOpen(!isOpen), isOpen }}>
            {children}
        </CartContext.Provider>
    )
}


export const useCart = () => {
    const context = useContext(CartContext);
    if(!context) throw new Error("use Cart must be used inside CartProvider");
    return context;
};
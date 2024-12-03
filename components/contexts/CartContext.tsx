import React, {createContext, useContext} from 'react';
import {productSchema} from "@/constants/schemas";

interface CartContextType {
    cartItems: productSchema[] | null;
    setCartItems: React.Dispatch<React.SetStateAction<productSchema[]>>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCartContext(): CartContextType {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCartContext must be used within an CartContext.Provider');
    }

    return context;
}
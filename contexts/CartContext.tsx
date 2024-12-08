import React, {createContext, useContext} from 'react';
import {ProductSchema} from "@/constants/schemas";

interface CartContextType {
    cartProducts: ProductSchema[] | null;
    setCartProducts: React.Dispatch<React.SetStateAction<ProductSchema[]>>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCartContext(): CartContextType {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCartContext must be used within an CartContext.Provider');
    }

    return context;
}
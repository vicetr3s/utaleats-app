import {z} from "zod";

export type StoreSchema = {
    storeId: string;
    storeName: string;
    cityName: string;
    category: string;
    imagePath: string;
    rating: string;
    reviews: string;
}

export type CityDropDownSchema = {
    label: string;
    value: string;
}

export type ProductSchema = {
    imagePath: string;
    name: string;
    price: number;
    amount: number;
}

export type ReviewSchema = {
    score: string;
    comment: string;
}

export type ProductOrderSchema = {
    product: string;
    quantity: number;
    price: number;
}

export type PastOrderRawSchema = {
    storeName: string;
    total: number;
    storeImgPath: string;
    id: string;
    storeId: string;
    products: ProductOrderSchema[];
}

export type PastOrderSchema = {
    storeName: string;
    total: number;
    storeImgPath: string;
    id: string;
}

export type CategorySchema = {
    id: string;
    label: string;
}

export const FirstSignUpSchema = z.object({
    email: z.string().email({message: 'Please enter a valid email'}).trim(),
    password: z
        .string()
        .min(6, {message: 'Password must be at least 6 characters'})
        .regex(/[0-9]/, {message: 'Password must contain at least one number'})
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Password must contain at least one special character'
        })
        .trim(),
    firstName: z.string().min(4, {message: 'First name must be at least 4 characters'}).trim(),
    lastName: z.string().min(4, {message: 'Last name must be at least 4 characters'}).trim(),
})

export const SecondSignUpSchema = z.object({
    phoneNumber: z.string().min(8, {message: 'Phone number must be at least 8 characters'}).trim(),
    city: z.string().trim(),
    streetAddress: z.string().min(8, {message: 'Street must be at least 8 characters'}).trim(),
})

export const LogInSchema = z.object({
    email: z.string().email({message: 'Please enter a valid email'}).trim(),
    password: z
        .string()
        .min(6, {message: 'Password must be at least 6 characters'})
        .trim(),
})
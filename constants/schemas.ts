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
    price: string;
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
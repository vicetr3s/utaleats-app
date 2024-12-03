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
    userId: string;
    rating: string;
    comment: string;
}
export type storeSchema = {
    storeId: string;
    storeName: string;
    cityName: string;
    storeCategory: string;
    imagePath: string;
    rating: string;
    reviews: string;
}

export type cityDropDownSchema = {
    label: string;
    value: string;
}

export type productSchema = {
    imagePath: string;
    name: string;
    price: string;
}
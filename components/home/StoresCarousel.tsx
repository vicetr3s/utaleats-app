import {FlatList} from "react-native";
import StoreItem from "@/components/home/StoreItem";

type store = {
    storeId: string;
    storeName: string;
    storeCategory: string;
    imagePath: string;
    rating: string;
    reviews: string;
}

export default function StoresCarousel({storesData}: { storesData: store[] }) {
    const renderStore = ({item, index}: { item: store, index: number }) => (
        <StoreItem id={item.storeId} name={item.storeName} category={item.storeCategory} rating={item.rating}
                   reviews={item.reviews}
                   imageUrl={item.imagePath}/>
    )

    return (
        <FlatList data={storesData} renderItem={renderStore} keyExtractor={item => item.storeId} numColumns={1}/>
    )
}
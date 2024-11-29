import {FlatList} from "react-native";
import StoreItem from "@/components/home/StoreItem";

type store = {
    id: string;
    name: string;
    category: string;
    url: string;
    rating: string;
    reviews: string;
}

export default function StoresCarousel({storesData}: { storesData: store[] }) {
    const renderStore = ({item, index}: { item: store, index: number }) => (
        <StoreItem id={item.id} name={item.name} category={item.category} rating={item.rating} reviews={item.reviews}
                   imageUrl={item.url}/>
    )

    return (
        <FlatList data={storesData} renderItem={renderStore} keyExtractor={item => item.id} numColumns={1}/>
    )
}
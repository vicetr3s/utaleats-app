import {FlatList} from "react-native";
import Store from "@/components/home/Store";
import {StoreSchema} from "@/constants/schemas";

export default function StoresCarousel({storesData}: { storesData: StoreSchema[] }) {
    const renderStore = ({item, index}: { item: StoreSchema, index: number }) => (
        <Store id={item.storeId} name={item.storeName} category={item.category} rating={item.rating}
               reviews={item.reviews}
               imageUrl={item.imagePath}/>
    )

    return (
        <FlatList data={storesData} renderItem={renderStore} keyExtractor={item => item.storeId} numColumns={1}/>
    )
}
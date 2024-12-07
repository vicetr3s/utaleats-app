import {FlatList} from "react-native";
import Store from "@/components/home/Store";
import {StoreSchema} from "@/constants/schemas";

type props = {
    storesData: StoreSchema[];
    category: string;
}

export default function StoresCarousel({storesData, category}: props) {
    const filteredData = storesData.filter((store) => store.category === category || category === 'All');

    const renderStore = ({item}: { item: StoreSchema}) => (
        <Store id={item.storeId} name={item.storeName} category={item.category} rating={item.rating}
               reviews={item.reviews}
               imageUrl={item.imagePath}/>
    )

    return (
        <FlatList data={filteredData} renderItem={renderStore} keyExtractor={item => item.storeId}/>
    )
}
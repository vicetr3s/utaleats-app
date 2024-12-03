import {View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import StoreHeader from "@/components/store/StoreHeader";
import Section from "@/components/home/Section";
import ItemContainer from "@/components/store/ItemContainer";
import {useEffect, useState} from "react";
import {itemStoreSchema} from "@/constants/schemas";
import {fetchUrl} from "@/lib/fetchUrl";

export default function ProfileScreen() {
    const {id, name} = useLocalSearchParams();
    const storeName = Array.isArray(name) ? name[0] : name;
    const [items, setItems] = useState<itemStoreSchema[]>([]);

    useEffect(() => {
        const fetchStoreItems = async () => {
            try {
                const {error, data} = await fetchUrl({
                    endPoint: `api/product?storeId=${id}`,
                    method: 'GET'
                });

                if (data) {
                    const itemsProcessed = data.map((item: any) => ({
                        name: item.dishName,
                        imagePath: item.image,
                        price: item.price
                    }));

                    setItems(itemsProcessed);
                }
            } catch (error) {
            }
        }

        fetchStoreItems();

    }, [id]);

    return (
        <View>
            <StoreHeader name={storeName} onPress={() => {
            }}/>
            <Section label={'Items'} style={{height: '65%'}}>
                <ItemContainer data={items}/>
            </Section>
            <Section label={'Reviews'}>

            </Section>
        </View>

    )
}
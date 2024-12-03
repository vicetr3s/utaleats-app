import {View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import StoreHeader from "@/components/store/StoreHeader";
import Section from "@/components/home/Section";
import ProductContainer from "@/components/store/ProductContainer";
import {useEffect, useState} from "react";
import {productSchema} from "@/constants/schemas";
import {fetchUrl} from "@/lib/fetchUrl";
import {useCartContext} from "@/components/contexts/CartContext";

export default function ProfileScreen() {
    const {id, name} = useLocalSearchParams();
    const storeName = Array.isArray(name) ? name[0] : name;
    const [items, setItems] = useState<productSchema[]>([]);
    const {setCartItems} = useCartContext();

    useEffect(() => {
        setCartItems([]);

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
            <StoreHeader name={storeName}/>
            <Section label={'Items'} style={{height: '65%'}}>
                <ProductContainer data={items}/>
            </Section>
            <Section label={'Reviews'}>

            </Section>
        </View>

    )
}
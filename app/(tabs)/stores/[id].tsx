import {View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import StoreHeader from "@/components/store/StoreHeader";
import Section from "@/components/home/Section";
import ProductContainer from "@/components/store/ProductContainer";
import {useEffect, useState} from "react";
import {ProductSchema, ReviewSchema} from "@/constants/schemas";
import {fetchUrl} from "@/lib/fetchUrl";
import {useCartContext} from "@/contexts/CartContext";
import ReviewsCarousel from "@/components/store/ReviewsCarousel";
import {useIsFocused} from "@react-navigation/native";

export default function StoreScreen() {
    const {id} = useLocalSearchParams();
    const [items, setItems] = useState<ProductSchema[]>([]);
    const [reviews, setReviews] = useState<ReviewSchema[]>([]);
    const {setCartProducts} = useCartContext();
    const isFocused = useIsFocused();

    const fetchReviews = async () => {
        try {
            const {error, data} = await fetchUrl({
                endPoint: `api/rating?storeId=${id}`,
                method: 'GET',
            });

            if (data) {
                setReviews(data.comments);
            }
        } catch (error) {
        }
    };

    useEffect(() => {
        if (!id) return;

        if (isFocused) {
            fetchReviews();
        }
    }, [id, isFocused]);

    useEffect(() => {
        setCartProducts([]);

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
            <StoreHeader/>
            <Section label={'Items'} style={{height: '55%'}}>
                <ProductContainer data={items}/>
            </Section>
            <Section label={'Reviews'} style={{height: '30%'}}>
                <ReviewsCarousel reviews={reviews}/>
            </Section>
        </View>

    )
}
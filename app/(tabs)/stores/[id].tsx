import {View} from "react-native";
import {useLocalSearchParams, useNavigation} from "expo-router";
import StoreHeader from "@/components/store/StoreHeader";
import Section from "@/components/home/Section";
import ProductContainer from "@/components/store/ProductContainer";
import {useEffect, useState} from "react";
import {ProductSchema, ReviewSchema} from "@/constants/schemas";
import {fetchUrl} from "@/lib/fetchUrl";
import {useCartContext} from "@/components/contexts/CartContext";
import ReviewsCarousel from "@/components/store/ReviewsCarousel";

export default function StoreScreen() {
    const {id} = useLocalSearchParams();
    const [items, setItems] = useState<ProductSchema[]>([]);
    const [reviews, setReviews] = useState<ReviewSchema[]>([]);
    const {setCartProducts} = useCartContext();
    const navigation = useNavigation();

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
        return navigation.addListener('focus', () => {
            fetchReviews();
        });
    }, [navigation]);

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

    useEffect(() => {
        if (!id) return;

        fetchReviews();
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
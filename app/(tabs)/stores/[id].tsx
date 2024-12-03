import {View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import StoreHeader from "@/components/store/StoreHeader";
import Section from "@/components/home/Section";
import ProductContainer from "@/components/store/ProductContainer";
import {useEffect, useState} from "react";
import {ProductSchema, ReviewSchema} from "@/constants/schemas";
import {fetchUrl} from "@/lib/fetchUrl";
import {useCartContext} from "@/components/contexts/CartContext";
import ReviewsCarousel from "@/components/store/ReviewsCarousel";

export default function ProfileScreen() {
    const {id, name, rating} = useLocalSearchParams();
    const storeName = Array.isArray(name) ? name[0] : name;
    const [items, setItems] = useState<ProductSchema[]>([]);
    const [reviews, setReviews] = useState<ReviewSchema[]>([]);
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

    useEffect(() => {
        if (!id) return;

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

        fetchReviews();
    }, [id]);

    const dummyData = [
        {
            userId: '1',
            rating: '4.5',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse  laoreet volutpat lorem, eget hendrerit odio mollis id. Phasellus ac  dapibus enim. Ut fringilla sodales aliq....'
        },
        {
            userId: '2',
            rating: '3.5',
            comment: 'Mmamabuebo eget hendrerit odio mollis id. Phasellus ac  dapibus enim. Ut fringilla sodales aliq....'
        },
        {userId: '3', rating: '4.7', comment: 'Ta weno el local si'},
    ]

    return (
        <View>
            <StoreHeader name={storeName}/>
            <Section label={'Items'} style={{height: '55%'}}>
                <ProductContainer data={items}/>
            </Section>
            <Section label={'Reviews'} style={{height: '30%'}}>
                <ReviewsCarousel reviews={dummyData}/>
            </Section>
        </View>

    )
}
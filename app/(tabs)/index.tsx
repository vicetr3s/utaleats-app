import {View} from "react-native";
import HomeHeader from "@/components/home/HomeHeader";
import CategoriesCarousel from "@/components/home/CategoriesCarousel";
import Section from "@/components/home/Section";
import {useAuthContext} from "@/contexts/AuthContext";
import {fetchUrl} from "@/lib/fetchUrl";
import {useEffect, useState} from "react";
import StoresCarousel from "@/components/home/StoresCarousel";
import {CategorySchema, StoreSchema} from "@/constants/schemas";
import {useIsFocused} from '@react-navigation/native';

export default function Index() {
    const {userCity} = useAuthContext();
    const [error, setError] = useState<boolean>(false);
    const [storesRaw, setStoresRaw] = useState<StoreSchema[]>([]);
    const [stores, setStores] = useState<StoreSchema[]>([]);
    const [category, setCategory] = useState<string>('All');
    const [categories, setCategories] = useState<CategorySchema[]>([]);

    const isFocused = useIsFocused();

    const fetchStores = async () => {
        if (!userCity) return;

        try {
            const {error, data} = await fetchUrl({
                endPoint: `api/store?cityName=${userCity}`,
                method: 'GET'
            });

            setError(error);

            if (data) {
                setStoresRaw(data);

                const availableCategories: string[] = Array.from(
                    new Set(
                        data.map((store: StoreSchema) =>
                            store.category
                        )
                    )
                );

                const categoriesWithIds = availableCategories.map((category, index) => ({
                    id: (index + 1).toString(),
                    label: category,
                }));

                const finalCategories = [{id: '0', label: 'All'}, ...categoriesWithIds];

                setCategories(finalCategories);
            }

        } catch (error) {
            setError(true);
        }
    };

    useEffect(() => {
        if (isFocused || userCity) {
            fetchStores();
        }
    }, [isFocused, userCity]);

    useEffect(() => {
        if (!storesRaw) return;

        const fetchRatingAndReviews = async () => {
            try {
                const fetchPromises = storesRaw.map(async (store: StoreSchema) => {
                    const {error, data} = await fetchUrl({
                        endPoint: `api/rating?storeId=${store.storeId}`,
                        method: 'GET',
                    });

                    if (error) {
                        return store;
                    }

                    return {
                        ...store,
                        rating: data?.averageRating || '0',
                        reviews: data?.comments.length || '0',
                    };
                });

                const updatedStores = await Promise.all(fetchPromises);

                setStores(updatedStores);
            } catch (error) {
                setError(true);
            }
        };

        fetchRatingAndReviews();
    }, [storesRaw]);

    return (
        <View>
            <HomeHeader city={userCity}/>
            <Section label={'Categories'}>
                <CategoriesCarousel setCategory={setCategory} categories={categories}/>
            </Section>
            <Section label={'Stores'} style={{height: '65%'}}>
                <StoresCarousel storesData={stores} category={category}/>
            </Section>
        </View>
    );
}
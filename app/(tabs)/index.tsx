import {View} from "react-native";
import HomeHeader from "@/components/home/HomeHeader";
import CategoriesCarousel from "@/components/home/CategoriesCarousel";
import Section from "@/components/home/Section";
import {useAuthContext} from "@/components/contexts/AuthContext";
import {fetchUrl} from "@/lib/fetchUrl";
import {useEffect, useState} from "react";
import StoresCarousel from "@/components/home/StoresCarousel";
import {StoreSchema} from "@/constants/schemas";

export default function Index() {
    const {userCity} = useAuthContext();
    const [error, setError] = useState<boolean>(false);
    const [storesRaw, setStoresRaw] = useState<StoreSchema[]>([]);
    const [stores, setStores] = useState<StoreSchema[]>([]);
    const [category, setCategory] = useState<string>('All');

    useEffect(() => {
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
                }

            } catch (error) {
                setError(true);
            }
        };

        fetchStores();
    }, [userCity]);

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
                <CategoriesCarousel setCategory={setCategory}/>
            </Section>
            <Section label={'Stores'} style={{height: '65%'}}>
                <StoresCarousel storesData={stores} category={category}/>
            </Section>
        </View>
    );
}
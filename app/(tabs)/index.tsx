import {View} from "react-native";
import HomeHeader from "@/components/home/HomeHeader";
import CategoriesCarousel from "@/components/home/CategoriesCarousel";
import Section from "@/components/home/Section";
import {useAuthContext} from "@/components/AuthContext";
import {fetchUrl} from "@/lib/fetchUrl";
import {useEffect, useState} from "react";
import StoresCarousel from "@/components/home/StoresCarousel";
import {storeSchema} from "@/constants/schemas";

export default function Index() {
    const {userCity} = useAuthContext();
    const [error, setError] = useState<boolean>(false);
    const [storesRaw, setStoresRaw] = useState<storeSchema[]>([]);
    const [stores, setStores] = useState<storeSchema[]>([]);

    useEffect(() => {
        const fetchStores = async () => {
            if (!userCity) return;

            try {
                const {error, data} = await fetchUrl({
                    endPoint: `store?cityName=${userCity}`,
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
                const fetchPromises = storesRaw.map(async (store: storeSchema) => {
                    const {error, data} = await fetchUrl({
                        endPoint: `rating?storeId=${store.storeId}`,
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
                <CategoriesCarousel/>
            </Section>
            <Section label={'Stores'} style={{height: '65%'}}>
                <StoresCarousel storesData={stores}/>
            </Section>
        </View>
    );
}
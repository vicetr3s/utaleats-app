import {View} from "react-native";
import HomeHeader from "@/components/home/HomeHeader";
import CategoriesCarousel from "@/components/home/CategoriesCarousel";
import Section from "@/components/home/Section";
import {useAuthContext} from "@/components/AuthContext";
import {fetchUrl} from "@/lib/fetchUrl";
import {useEffect, useState} from "react";
import StoresCarousel from "@/components/home/StoresCarousel";

type store = {
    id: string;
    name: string;
    category: string;
    url: string;
    rating: string;
    reviews: string;
}

export default function Index() {
    const {userId, setUserId} = useAuthContext();
    const [error, setError] = useState<boolean>(false);
    const [userCity, setUserCity] = useState<string>('');
    const [stores, setStores] = useState<store[]>([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const {error, errorMsg, data} = await fetchUrl({
                    endPoint: `profile?accountId=${userId}`,
                    method: 'GET'
                });

                setError(error);

                if (data.city) {
                    setUserCity(data.city);
                }

            } catch (error) {
                setError(true);
            }
        };

        fetchProfile();
    }, [userId]);

    useEffect(() => {
        const fetchStores = async () => {
            if (!userCity) return;

            try {
                const {error, errorMsg, data} = await fetchUrl({
                    endPoint: `store?city=${userCity}`,
                    method: 'GET'
                });

                setError(error);

                if (data.stores) {
                    setStores(data.stores);
                }

            } catch (error) {
                setError(true);
            }
        };

        fetchStores();
    }, [userCity]);


    const storesData = [
        {
            id: '1',
            name: 'macdonal',
            category: 'FastFood',
            url: 'https://pbs.twimg.com/profile_images/1840790946826354689/yLfoJJt6_400x400.png',
            rating: '4.0',
            reviews: '200'
        },
        {
            id: '2',
            name: 'macdonaaal',
            category: 'FastFood',
            url: 'https://pbs.twimg.com/profile_images/1840790946826354689/yLfoJJt6_400x400.png',
            rating: '4.0',
            reviews: '200'
        },
        {
            id: '3',
            name: 'macdonasdal',
            category: 'FastFood',
            url: 'https://pbs.twimg.com/profile_images/1840790946826354689/yLfoJJt6_400x400.png',
            rating: '4.0',
            reviews: '200'
        },

        {
            id: '4',
            name: 'macdonasdal',
            category: 'FastFood',
            url: 'https://pbs.twimg.com/profile_images/1840790946826354689/yLfoJJt6_400x400.png',
            rating: '4.0',
            reviews: '200'
        },
        {
            id: '5',
            name: 'macdonasdal',
            category: 'FastFood',
            url: 'https://pbs.twimg.com/profile_images/1840790946826354689/yLfoJJt6_400x400.png',
            rating: '4.0',
            reviews: '200'
        },
        {
            id: '6',
            name: 'macdonasdal',
            category: 'FastFood',
            url: 'https://pbs.twimg.com/profile_images/1840790946826354689/yLfoJJt6_400x400.png',
            rating: '4.0',
            reviews: '200'
        },
    ]


    return (
        <View>
            <HomeHeader city={userCity}/>
            <Section label={'Categories'}>
                <CategoriesCarousel/>
            </Section>
            <Section label={'Stores'} style={{height:'65%'}}>
                <StoresCarousel storesData={storesData}/>
            </Section>
        </View>
    );
}
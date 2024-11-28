import {Text, View} from "react-native";
import HomeHeader from "@/components/home/HomeHeader";
import CategoriesCarousel from "@/components/home/CategoriesCarousel";
import Section from "@/components/home/Section";
import Store from "@/components/home/Store";
import {useAuthContext} from "@/components/AuthContext";

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

    const storesData = [
        {
            id: '1',
            name: 'macdonal',
            category: 'FastFood',
            url: 'https://pbs.twimg.com/profile_images/1840790946826354689/yLfoJJt6_400x400.png',
            rating: '4.0',
            reviews: '200'
        },
    ]

    const renderStore = (item: store, _index: number) => (
        <Store id={item.name} name={item.name} category={item.category} rating={item.rating} reviews={item.reviews}
               imageUrl={item.url}/>
    )

    return (
        <View>
            <HomeHeader/>
            {userId && <Text>{userId}</Text>}
            <Section label={'Categories'}>
                <CategoriesCarousel/>
            </Section>
        </View>
    );
}
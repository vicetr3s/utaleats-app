import {View} from "react-native";
import HomeHeader from "@/components/home/HomeHeader";
import CategoriesCarousel from "@/components/home/CategoriesCarousel";
import Section from "@/components/home/Section";

export default function Index() {
    return (
        <View>
            <HomeHeader/>
            <Section label={'Categories'}>
                <CategoriesCarousel/>
            </Section>
        </View>
    );
}
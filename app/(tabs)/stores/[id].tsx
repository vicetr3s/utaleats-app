import {View} from "react-native";
import {useLocalSearchParams} from "expo-router";
import StoreHeader from "@/components/store/StoreHeader";
import Section from "@/components/home/Section";

export default function ProfileScreen() {
    const {id, name} = useLocalSearchParams();
    const storeName = Array.isArray(name) ? name[0] : name;

    return (
        <View>
            <StoreHeader name={storeName} onPress={() => {
            }}/>
            <Section label={'Items'}>

            </Section>
            <Section label={'Reviews'}>

            </Section>
        </View>

    )
}
import {View} from "react-native";
import {useRouter} from "expo-router";
import {useAuthContext} from "@/components/contexts/AuthContext";
import {useEffect} from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Section from "@/components/home/Section";

export default function ProfileScreen() {
    const {userId} = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!userId) {
            router.replace('/login');
        }
    }, [userId]);


    return (
        <View>
            <ProfileHeader/>
            <Section label={'My orders'}>

            </Section>
        </View>

    )
}
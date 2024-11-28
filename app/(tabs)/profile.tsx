import {Text, View} from "react-native";
import {useRouter} from "expo-router";
import IconButton from "@/components/IconButton";
import {useAuthContext} from "@/components/AuthContext";
import {useEffect} from "react";

export default function ProfileScreen() {
    const {userId, setUserId} = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (!userId) {
            router.replace('/login');
        }
    }, [userId]);

    function handleClick() {
        setUserId(null);
    }

    return (
        <View>
            <Text>Profile Screen</Text>
            <IconButton label={'Log out'} onPress={handleClick}/>
        </View>

    )
}
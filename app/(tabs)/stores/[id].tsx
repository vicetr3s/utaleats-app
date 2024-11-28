import {Text, View} from "react-native";
import {useLocalSearchParams} from "expo-router";

export default function ProfileScreen() {
    const {id} = useLocalSearchParams();

    return (
        <View>
            <Text>Store {id}</Text>
        </View>

    )
}
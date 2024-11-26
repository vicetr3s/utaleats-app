import {Text, View} from "react-native";
import {Link} from "expo-router";

export default function ProfileScreen() {
    return (
        <View>
            <Text>Profile Screen</Text>
            <Link href={"/login"}>Go to login</Link>
        </View>
    )
}
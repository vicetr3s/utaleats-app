import {COLORS, MISC} from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import {Text, View} from "react-native";

type props = {
    rating: string;
    reviews?: string;
}

export default function RatingView({rating, reviews}: props) {
    return (
        <View>
            <Ionicons
                name={'star'}
                color={COLORS.fntOverPrimary}
                size={MISC.midIconSize}
            />
            <Text>{rating}</Text>
            {reviews && <Text>{reviews} reviews</Text>}
        </View>
    )
}
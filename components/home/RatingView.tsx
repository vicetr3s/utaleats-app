import {MISC} from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import {StyleSheet, Text, View} from "react-native";

type props = {
    rating: string;
    reviews?: string;
    small?: boolean;
}

export default function RatingView({rating, reviews, small}: props) {
    const size = small ? MISC.smallIconSize : MISC.midIconSize;

    return (
        <View style={styles.container}>
            <View style={styles.starContainer}>
                <Ionicons
                    name={'star'}
                    color={'#000000'}
                    size={size}
                />
                <Text style={styles.text}>{rating}</Text>
            </View>
            {reviews && <Text>{reviews} reviews</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
    },
    text: {
        fontSize: MISC.smallFontSize,
        fontWeight: 500,
    },
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
    }
})
import {MISC} from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import {StyleSheet, Text, View} from "react-native";

type props = {
    rating: string;
    reviews?: string;
}

export default function RatingView({rating, reviews}: props) {
    return (
        <View style={styles.container}>
            <View style={styles.starContainer}>
                <Ionicons
                    name={'star'}
                    color={'#000000'}
                    size={MISC.midIconSize}
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
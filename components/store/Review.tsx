import {ReviewSchema} from "@/constants/schemas";
import {StyleSheet, Text, View} from "react-native";
import RatingView from "@/components/home/RatingView";
import {COLORS, MISC} from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Review({rating, comment, userId}: ReviewSchema) {

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.userImg}>
                    <Ionicons
                        name={'person'}
                        color={COLORS.fntOverPrimary}
                        size={MISC.midIconSize}
                    />
                </View>
                <RatingView rating={rating} small={true}/>
            </View>
            <Text style={styles.comment}>{comment}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    userImg: {
        flexDirection: 'row',
        backgroundColor: COLORS.baseDks,
        width: 45,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
    },
    container: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.baseDkrr,
        gap: 15,
    },
    comment: {
        width: '80%',
    }
})
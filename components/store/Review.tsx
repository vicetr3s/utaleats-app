import {ReviewSchema} from "@/constants/schemas";
import {StyleSheet, Text, View} from "react-native";
import RatingView from "@/components/home/RatingView";
import {COLORS, MISC} from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Review({score, comment}: ReviewSchema) {
    const review = comment ? comment : 'This user didn\'t leave a review';

    return (
        <View style={styles.container}>
            <View style={styles.userImgAndRating}>
                <View style={styles.userImg}>
                    <Ionicons
                        name={'person'}
                        color={COLORS.fntOverPrimary}
                        size={MISC.midIconSize}
                    />
                </View>
                <RatingView rating={score} small={true}/>
            </View>
            <Text style={styles.comment}>{review}</Text>
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
        alignItems: 'center',
    },
    comment: {
        width: '80%',
        height: '85%',
    },
    userImgAndRating: {
        alignItems:'center'
    }
})
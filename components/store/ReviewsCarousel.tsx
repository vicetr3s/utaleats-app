import {FlatList, StyleSheet} from "react-native";
import {ReviewSchema} from "@/constants/schemas";
import Review from "@/components/store/Review";
import {COLORS, MISC} from "@/constants/styles";

export default function ReviewsCarousel({reviews}: { reviews: ReviewSchema[] }) {
    const renderReview = ({item, index}: { item: ReviewSchema, index: number }) => (
        <Review rating={item.rating} comment={item.comment} userId={item.userId}/>
    )

    return (
        <FlatList data={reviews} renderItem={renderReview} keyExtractor={item => item.userId} style={styles.container}
                  contentContainerStyle={styles.content}/>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: MISC.borderRadius,
        borderColor: COLORS.baseDkrr,
        borderWidth: 1,
    },
    content: {
        gap: 10,
        paddingHorizontal: 10,
    }
})
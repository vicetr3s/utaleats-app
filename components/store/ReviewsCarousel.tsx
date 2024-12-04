import {FlatList, StyleSheet} from "react-native";
import {ReviewSchema} from "@/constants/schemas";
import Review from "@/components/store/Review";
import {COLORS, MISC} from "@/constants/styles";

export default function ReviewsCarousel({reviews}: { reviews: ReviewSchema[] }) {
    const renderReview = ({item, index}: { item: ReviewSchema, index: number }) => (
        <Review score={item.score} comment={item.comment}/>
    )

    return (
        <FlatList data={reviews} renderItem={renderReview} keyExtractor={item => item.comment + item.score}
                  style={styles.container}
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
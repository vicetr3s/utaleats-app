import {FlatList, StyleSheet} from "react-native";
import {ReviewSchema} from "@/constants/schemas";
import Review from "@/components/store/Review";
import {COLORS, MISC} from "@/constants/styles";

export default function ReviewsCarousel({reviews}: { reviews: ReviewSchema[] }) {
    const renderReview = ({item}: { item: ReviewSchema }) => (
        <Review score={item.score} comment={item.comment}/>
    )

    return (
        <FlatList data={reviews} renderItem={renderReview}
                  keyExtractor={item => (item.comment + item.score + Math.random().toString(36).slice(2, 8))}
                  style={styles.container}
                  contentContainerStyle={styles.content} inverted={true}/>
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
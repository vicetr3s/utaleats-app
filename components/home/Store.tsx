import {Link} from "expo-router";
import {Image} from "expo-image";
import {StyleSheet, Text, View} from "react-native";
import RatingView from "@/components/home/RatingView";

type props = {
    id: string;
    name: string;
    category: string;
    rating: string;
    reviews: string;
    imageUrl: string;
}

export default function Store({id, name, category, imageUrl, rating, reviews}: props) {
    return (
        <View>
            <Link href={`/store/${id}`}>
                <Image style={styles.image} source={{uri: imageUrl}}/>
                <Text>{name}</Text>
                <Text>{category}</Text>
                <RatingView rating={rating} reviews={reviews}/>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {}
})
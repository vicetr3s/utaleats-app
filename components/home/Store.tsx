import {Image} from "expo-image";
import {StyleSheet, Text, View} from "react-native";
import RatingView from "@/components/home/RatingView";
import {COLORS, LIB, MISC} from "@/constants/styles";
import {PlatformPressable} from "@react-navigation/elements";
import {useRouter} from "expo-router";

type props = {
    id: string;
    name: string;
    category: string;
    rating: string;
    reviews: string;
    imageUrl: string;
}

export default function Store({id, name, category, imageUrl, rating, reviews}: props) {
    const router = useRouter();

    const handleClick = () => {
        router.replace(
            {
                pathname: `/(tabs)/stores/[id]`,
                params: {id}
            });
    }

    return (
        <PlatformPressable onPress={handleClick} style={[styles.link, LIB.shadow]} android_ripple={{
            foreground: true,
            borderless: false,
        }}>
            <View style={[styles.shadowContainer]}>
                <View style={[styles.container]}>
                    <View style={styles.logo}>
                        <Image style={styles.image} source={{uri: imageUrl}}/>
                        <View style={styles.label}>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={styles.category}>{category}</Text>
                        </View>
                    </View>
                    <View style={styles.rating}>
                        <RatingView rating={rating} reviews={reviews}/>
                    </View>
                </View>
            </View>
        </PlatformPressable>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        borderRadius: MISC.borderInnerRadius,
    },
    label: {
        flexDirection: "column",
    },
    name: {
        fontSize: MISC.largeFontSize,
        fontWeight: "500",
        textTransform: "capitalize",
    },
    category: {
        fontSize: MISC.smallFontSize,
    },
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: MISC.borderRadius,
        backgroundColor: COLORS.base,

    },
    shadowContainer: {},
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    rating: {
        height: '100%',
        justifyContent: 'flex-end',
    },
    link: {
        borderRadius: MISC.borderRadius,
        overflow: 'hidden',
        marginVertical: 10,
        transform: [
            {translateY: -10},
        ],
    },
});

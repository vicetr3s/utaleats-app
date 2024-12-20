import {StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";
import IconButton from "@/components/ui/IconButton";
import {COLORS, LIB, MISC} from "@/constants/styles";
import {getCurrency} from "@/lib/getCurrency";

type props = {
    imagePath: string;
    name: string;
    price: number;
    onPress: () => void;
}

export default function Product({imagePath, name, price, onPress}: props) {
    const currency = getCurrency();

    return (
        <View style={[styles.item, LIB.shadow]}>
            <Image source={imagePath} style={styles.image}/>
            <Text style={styles.text}>{name}</Text>
            <View style={styles.price}>
                <Text style={styles.text}>{currency} </Text>
                <Text style={[styles.text, styles.priceText]}>${price}</Text>
            </View>
            <IconButton icon={'add'} onPress={onPress} btnStyle={[styles.btn, LIB.shadow]}/>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.base,
        width: 125,
        height: 'auto',
        minHeight: 130,
        borderRadius: MISC.borderRounderRadius,
        padding: 10,
    },
    btn: {
        position: 'absolute',
        gap: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        minWidth: 35,
        maxWidth: 35,
        minHeight: 35,
        maxHeight: 35,
        bottom: -15,
    },
    price: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    text: {
        fontSize: MISC.smallFontSize,
        textAlign: 'center',
    },
    priceText: {
        fontWeight: 700,
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: MISC.borderInnerRadius,
        marginBottom: 5,
        backgroundColor: COLORS.baseDkr,
    }
})
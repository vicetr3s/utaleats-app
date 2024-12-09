import {StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";
import {COLORS, MISC} from "@/constants/styles";
import {getCurrency} from "@/lib/getCurrency";

type props = {
    storeName: string;
    total: number;
    storeImgPath: string;
}

export default function Order({storeName, storeImgPath, total}: props) {
    const currency = getCurrency();

    return (
        <View style={styles.container}>
            <Image source={storeImgPath} style={styles.img}/>
            <View>
                <Text style={styles.storeName}>{storeName}</Text>
                <View style={styles.priceText}>
                    <Text style={styles.currency}>Total: {currency} </Text>
                    <Text style={styles.priceTotal}>${total.toFixed(2)}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        gap: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.baseDkrr,
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: MISC.borderInnerRadius,
        backgroundColor: COLORS.baseDkr,
    },
    priceText: {
        flexDirection: 'row',
    },
    storeName: {
        fontSize: MISC.midFontSize,
    },
    currency: {
        fontSize: MISC.smallFontSize,
    },
    priceTotal: {
        fontSize: MISC.smallFontSize,
        fontWeight: 600,
    }
})
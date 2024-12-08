import {StyleSheet, Text, View} from "react-native";
import {Image} from "expo-image";
import {COLORS, MISC} from "@/constants/styles";
import {getPlatformUrl} from "@/lib/getPlatformUrl";
import {getCurrency} from "@/lib/getCurrency";

type props = {
    imagePath: string,
    name: string,
    quantity: number,
    price: number,
}

export default function OrderDetail({imagePath, name, quantity, price}: props) {
    const BASE_URL = getPlatformUrl();
    const currency = getCurrency();
    const subTotal = (price * quantity).toFixed(2);

    return (
        <View style={styles.container}>
            <View style={styles.product}>
                <Image source={BASE_URL + imagePath} style={styles.img}></Image>
                <View>
                    <Text style={styles.nameText}>{name}</Text>
                    <Text style={styles.text}>{currency} ${price} x {quantity}</Text>
                </View>
            </View>
            <View style={styles.subTotal}>
                <Text style={styles.priceText}>{currency} ${subTotal}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    amountText: {
        fontSize: MISC.largeFontSize,
        fontWeight: 600,
    },
    price: {
        flexDirection: 'row',
    },
    priceText: {
        fontWeight: 500,
        fontSize: MISC.midFontSize
    },
    text: {
        fontSize: MISC.midFontSize
    },
    nameText: {
        fontWeight: 500,
        fontSize: MISC.largeFontSize,
        width:'auto',
        maxWidth:180,
    },
    container: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.baseDkrr,
    },
    img: {
        height: 55,
        width: 55,
        borderRadius: MISC.borderRadius,
    },
    product: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-end',
    },
    subTotal: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: '100%',
    }
})
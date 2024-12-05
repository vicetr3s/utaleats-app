import {StyleSheet, Text, View} from "react-native";
import {ProductSchema} from "@/constants/schemas";
import {Image} from "expo-image";
import {getPlatformUrl} from "@/lib/getPlatformUrl";
import IconButton from "@/components/ui/IconButton";
import {COLORS, MISC} from "@/constants/styles";
import {useCartContext} from "@/components/contexts/CartContext";
import {getCurrency} from "@/lib/getCurrency";

export default function CartProduct({imagePath, name, price, amount}: ProductSchema) {
    const BASE_URL = getPlatformUrl();
    const currency = getCurrency();
    const {setCartProducts} = useCartContext();

    const modifyProduct = (increment: number) => {
        setCartProducts((prevItems) =>
            prevItems
                .map((item) =>
                    item.name === name
                        ? {...item, amount: item.amount + increment}
                        : item
                )
                .filter((item) => item.amount > 0)
        );
    }

    const removeProduct = () => {
        modifyProduct(-1);
    }

    const addProduct = () => {
        modifyProduct(1);
    }

    return (
        <View style={styles.container}>
            <View style={styles.product}>
                <Image source={BASE_URL + imagePath} style={styles.img}></Image>
                <View>
                    <Text style={styles.nameText}>{name}</Text>
                    <View style={styles.price}>
                        <Text style={{
                            fontSize: MISC.midFontSize

                        }}>{currency} </Text>
                        <Text style={styles.priceText}>${price}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.actions}>
                <IconButton onPress={removeProduct} icon={'remove'} btnStyle={styles.btn} iconColor={'#000000'}
                            shadow={false}/>
                <Text style={styles.amountText}>{amount}</Text>
                <IconButton onPress={addProduct} icon={'add'} btnStyle={styles.btn} iconColor={'#000000'}
                            shadow={false}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        gap: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        minWidth: 30,
        maxWidth: 30,
        minHeight: 30,
        maxHeight: 30,
        backgroundColor: COLORS.baseDkr,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        backgroundColor: COLORS.baseDkrr,
        minHeight: 40,
        height: 40,
        padding: 5,
        borderRadius: MISC.borderRounderRadius,
    },
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
    nameText: {
        fontWeight: 500,
        fontSize: MISC.largeFontSize
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
        alignItems:'center',
    }
})
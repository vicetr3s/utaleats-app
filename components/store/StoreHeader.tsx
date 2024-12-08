import {StyleSheet, Text, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {MISC} from "@/constants/styles";
import IconButton from "@/components/ui/IconButton";
import {router, useLocalSearchParams} from "expo-router";
import {useCartContext} from "@/contexts/CartContext";

export default function StoreHeader() {
    const {id, name, rating} = useLocalSearchParams();
    const {cartProducts} = useCartContext();
    const productsAmount = cartProducts ? cartProducts.reduce((total, item) => total + item.amount, 0) : 0;

    const handleClick = () => {
        router.replace(
            {
                pathname: `/cart`,
                params: {id, name, rating}
            });
    }

    return (
        <View style={styles.nav}>
            <View style={styles.store}>
                <Ionicons
                    name={'basket'}
                    color={'#000000'}
                    size={MISC.largeIconSize}
                />
                <Text style={styles.storeName}>{name}</Text>
            </View>
            <View style={styles.cart}>
                <IconButton label={String(productsAmount)} icon={'cart'} onPress={handleClick}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 25,
    },
    store: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    storeName: {
        color: '#000000',
        fontSize: MISC.largeFontSize,
        fontWeight: 500,
        textTransform: 'capitalize',
    },
    cart: {
        width: 'auto',
    },
})
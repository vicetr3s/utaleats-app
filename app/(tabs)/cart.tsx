import {StyleSheet, Text, View} from "react-native";
import IconButton from "@/components/ui/IconButton";
import {router, useLocalSearchParams} from "expo-router";
import {useCartContext} from "@/components/contexts/CartContext";
import {MISC} from "@/constants/styles";
import CartProductCarousel from "@/components/cart/CartProductCarousel";
import Section from "@/components/home/Section";

export default function CartScreen() {
    const {id, name, rating} = useLocalSearchParams();
    const {cartProducts, setCartProducts} = useCartContext();

    const goBack = () => {
        router.replace(
            {
                pathname: `/(tabs)/stores/[id]`,
                params: {id, name, rating}
            });
    }

    const clearCart = () => {
        setCartProducts([]);
    }

    const checkoutCart = () => {

    }

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.cartTitle}>Your cart</Text>
                <IconButton onPress={goBack} icon={'arrow-back'} btnStyle={styles.btn}/>
            </View>
            <Section style={{height: '50%'}}>
                <CartProductCarousel data={cartProducts}/>
            </Section>
            <Section style={{height: '35%'}}>
                <View style={styles.actions}>
                    <IconButton label={'Clear'} primary={false} onPress={clearCart}/>
                    <IconButton label={'Checkout'} onPress={checkoutCart}/>
                </View>
            </Section>

        </View>

    )
}

const styles = StyleSheet.create({
    btn: {
        gap: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        minWidth: 35,
        maxWidth: 35,
        minHeight: 35,
        maxHeight: 35,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 25,
    },
    cartTitle: {
        fontSize: MISC.largerFontSize,
        fontWeight: 600,
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 30,
    }
})
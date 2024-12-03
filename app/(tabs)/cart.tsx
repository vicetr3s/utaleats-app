import {StyleSheet, Text, View} from "react-native";
import IconButton from "@/components/ui/IconButton";
import {router, useLocalSearchParams} from "expo-router";
import {useCartContext} from "@/components/contexts/CartContext";
import {MISC} from "@/constants/styles";
import CartProductCarousel from "@/components/cart/CartProductCarousel";
import Section from "@/components/home/Section";

export default function CartScreen() {
    const {id, name, rating} = useLocalSearchParams();
    const {cartProducts} = useCartContext();

    const goBack = () => {
        router.replace(
            {
                pathname: `/(tabs)/stores/[id]`,
                params: {id, name, rating}
            });
    }

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.cartTitle}>Your cart</Text>
                <IconButton onPress={goBack} icon={'arrow-back'} btnStyle={styles.btn}/>
            </View>
            <Section style={{height: '65%'}}>
                <CartProductCarousel data={cartProducts}/>
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
    }
})
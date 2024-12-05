import {StyleSheet, Text, View} from "react-native";
import IconButton from "@/components/ui/IconButton";
import {router, useLocalSearchParams} from "expo-router";
import {useCartContext} from "@/components/contexts/CartContext";
import {MISC} from "@/constants/styles";
import CartProductCarousel from "@/components/cart/CartProductCarousel";
import Section from "@/components/home/Section";
import {fetchUrl} from "@/lib/fetchUrl";
import {useState} from "react";
import {useAuthContext} from "@/components/contexts/AuthContext";
import {ProductSchema} from "@/constants/schemas";
import CartAndCheckoutHeader from "@/components/ui/CartAndCheckoutHeader";

export default function CartScreen() {
    const {id, name, rating} = useLocalSearchParams();
    const {cartProducts, setCartProducts} = useCartContext();
    const {userId} = useAuthContext();
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('Could not checkout');

    const goBack = () => {
        setError(false);

        router.replace(
            {
                pathname: `/(tabs)/stores/[id]`,
                params: {id, name, rating}
            });
    }

    const clearCart = () => {
        setError(false);

        setCartProducts([]);
    }

    const checkoutCart = () => {
        setError(true);

        if (cartProducts && cartProducts.length <= 0) return;

        (async () => {
            const products = cartProducts?.map((item: ProductSchema) => ({
                product: item.name,
                quantity: item.amount,
                price: item.price,
            }))

            const bodyData = {
                accountId: userId,
                storeId: id,
                products: products,
            }

            try {
                const {error} = await fetchUrl({
                    endPoint: 'api/order',
                    body: bodyData,
                    method: 'POST'
                })

                setError(error);

            } catch (error) {
                setError(true);
                setErrorMsg('Could not checkout');
            }
        })();

        if (!error) {
            router.replace(
                {
                    pathname: `/(tabs)/checkout`,
                    params: {id}
                });
        }
    }

    return (
        <View>
            <CartAndCheckoutHeader label={'Your cart'} onPress={goBack}/>
            <Section style={{height: '50%'}}>
                <CartProductCarousel data={cartProducts}/>
            </Section>
            {error && <Text style={styles.errorText}>{errorMsg}</Text>}
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
    actions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        gap: 30,
    },
    errorText: {
        flex: 1,
        textAlign: 'center',
        fontSize: MISC.midFontSize,
        fontWeight: 500,
    }
})
import {StyleSheet, View} from "react-native";
import IconButton from "@/components/ui/IconButton";
import {router, useLocalSearchParams} from "expo-router";
import {useCartContext} from "@/contexts/CartContext";
import {MISC} from "@/constants/styles";
import CartProductCarousel from "@/components/cart/CartProductCarousel";
import Section from "@/components/home/Section";
import {fetchUrl} from "@/lib/fetchUrl";
import {useState} from "react";
import {useAuthContext} from "@/contexts/AuthContext";
import {ProductSchema} from "@/constants/schemas";
import CartHeader from "@/components/cart/CartHeader";
import ErrorText from "@/components/ui/ErrorText";

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
                // @ts-ignore
                params: {id, name, rating}
            });
    }

    const clearCart = () => {
        setError(false);

        setCartProducts([]);
    }

    const checkoutCart = () => {
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
                const {error, data} = await fetchUrl({
                    endPoint: 'api/order',
                    body: bodyData,
                    method: 'POST'
                })

                setError(error);

                if (data && !error) {
                    router.replace(
                        {
                            pathname: `/(tabs)/checkout`,
                            params: {id, orderId: data.orderId}
                        });
                }

            } catch (error) {
                setError(true);
                setErrorMsg('Could not checkout');
            }
        })();

    }

    return (
        <View>
            <CartHeader label={'Your cart'} onPress={goBack}/>
            <Section style={{height: '50%'}}>
                <CartProductCarousel data={cartProducts}/>
            </Section>

            {error && <ErrorText message={errorMsg}/>}

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
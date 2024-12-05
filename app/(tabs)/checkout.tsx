import {View} from "react-native";
import CartAndCheckoutHeader from "@/components/ui/CartAndCheckoutHeader";
import {router, useLocalSearchParams} from "expo-router";
import {useCartContext} from "@/components/contexts/CartContext";
import OrderDetailCarousel from "@/components/checkout/OrderDetailCarousel";
import Section from "@/components/home/Section";

export default function CheckoutScreen() {
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
            <CartAndCheckoutHeader label={'Order details'} onPress={goBack}/>
            <Section style={{height: '60%'}}>
                <OrderDetailCarousel data={cartProducts}/>
            </Section>
        </View>

    )
}
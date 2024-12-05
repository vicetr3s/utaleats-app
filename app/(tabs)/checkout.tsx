import {View} from "react-native";
import CartAndCheckoutHeader from "@/components/ui/CartAndCheckoutHeader";
import {router, useLocalSearchParams} from "expo-router";
import OrderDetail from "@/components/checkout/OrderDetail";
import {useCartContext} from "@/components/contexts/CartContext";

export default function CheckoutScreen() {
    const {id, name, rating} = useLocalSearchParams();
    const {cartProducts, setCartProducts} = useCartContext();

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
            <OrderDetail imagePath={'/api/store/images/polloBravos.jpeg'} name={'hamrubeuses cheese'} quantity={3}
                         price={5700}/>
        </View>

    )
}
import {StyleSheet, Text, View} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import {useCartContext} from "@/components/contexts/CartContext";
import OrderDetailCarousel from "@/components/checkout/OrderDetailCarousel";
import Section from "@/components/home/Section";
import RatingInput from "@/components/checkout/RatingInput";
import {useState} from "react";
import TextAreaInputField from "@/components/ui/TextAreaInputField";
import IconButton from "@/components/ui/IconButton";
import {fetchUrl} from "@/lib/fetchUrl";
import {MISC} from "@/constants/styles";

export default function CheckoutScreen() {
    const {id, orderId} = useLocalSearchParams();
    const {cartProducts, setCartProducts} = useCartContext();
    const [userRating, setUserRating] = useState<number>(0);
    const [userReview, setUserReview] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('Could not send your review');

    const goHome = () => {
        router.replace(
            {
                pathname: `/(tabs)`,
            });

        setUserRating(0);
        setUserReview('');
        setCartProducts([]);
        setError(false);
    }

    const sendRatingAndReview = () => {
        setError(false);

        if (!userRating) {
            setError(true);
            setErrorMsg('Please provide a rating');
            return;
        }

        (async () => {

            const bodyData = {
                orderId: orderId,
                storeId: id,
                score: userRating,
                comment: userReview,
            }

            try {
                const {error} = await fetchUrl({
                    endPoint: 'api/rating',
                    body: bodyData,
                    method: 'POST'
                })

                setError(error);
                setErrorMsg('Could not send your review');

                if (!error) {
                    goHome();
                }

            } catch (error) {
                setError(true);
                setErrorMsg('Could not send your review');
            }
        })();
    }

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.label}>Order details</Text>
            </View>
            <Section style={{height: '45%'}}>
                <OrderDetailCarousel data={cartProducts}/>
            </Section>
            <Section label={'Rate the store and leave a review'} style={{height: '35%'}}>
                <View style={styles.rating}>
                    <RatingInput rating={userRating} onChange={setUserRating}/>
                    <TextAreaInputField review={userReview} setReview={setUserReview}/>
                    <View style={styles.actions}>

                        <IconButton onPress={goHome} label={'Maybe later'} primary={false}/>
                        <IconButton onPress={sendRatingAndReview} label={'Send'}/>
                    </View>

                </View>
                {error && <Text style={styles.errorMsg}>{errorMsg}</Text>}
            </Section>
        </View>

    )
}

const styles = StyleSheet.create({
    rating: {
        gap: 15,
    },
    errorMsg: {
        textAlign: 'center',
        fontSize: MISC.midFontSize,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 25,
    },
    label: {
        fontSize: MISC.largerFontSize,
        fontWeight: 600,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
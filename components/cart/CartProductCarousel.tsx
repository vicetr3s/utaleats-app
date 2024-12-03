import {ProductSchema} from "@/constants/schemas";
import React from "react";
import {COLORS, MISC} from "@/constants/styles";
import {FlatList, StyleSheet, View} from "react-native";
import CartProduct from "@/components/cart/CartProduct";

type props = {
    data: ProductSchema[] | null;
}

export default function CartProductCarousel({data}: props) {
    const renderItem = ({item, index}: { item: ProductSchema, index: number }) => (
        <CartProduct imagePath={item.imagePath} name={item.name} price={item.price} amount={item.amount}/>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                contentContainerStyle={styles.contentContainer}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: MISC.borderRadius,
        flex: 1,
        borderColor: COLORS.baseDkrr,
        borderWidth: 1,
    },
    contentContainer: {
        justifyContent: 'center',
        gap: 20,
        padding: 20,
    }
})



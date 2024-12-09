import {ProductSchema} from "@/constants/schemas";
import React from "react";
import {COLORS, MISC} from "@/constants/styles";
import {FlatList, StyleSheet, View} from "react-native";
import OrderDetail from "@/components/checkout/OrderDetail";
import TotalProductsPrice from "@/components/checkout/TotalProductsPrice";

type props = {
    data: ProductSchema[] | null;
}

export default function OrderDetailCarousel({data}: props) {
    const total = data ? data.reduce((acc, item) => acc + (item.price * item.amount), 0) : 0;

    const renderItem = ({item}: { item: ProductSchema}) => (
        <OrderDetail imagePath={item.imagePath} name={item.name} price={item.price} quantity={item.amount}/>
    )

    const renderFooter = () => (
        <TotalProductsPrice total={total}/>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                contentContainerStyle={styles.contentContainer}
                ListFooterComponent={renderFooter}
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
        gap: 10,
        padding: 10,
    }
})



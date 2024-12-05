import {ProductSchema} from "@/constants/schemas";
import React from "react";
import {COLORS, MISC} from "@/constants/styles";
import {FlatList, StyleSheet, Text, View} from "react-native";
import OrderDetail from "@/components/checkout/OrderDetail";
import {getCurrency} from "@/lib/getCurrency";

type props = {
    data: ProductSchema[] | null;
}

export default function OrderDetailCarousel({data}: props) {
    const total = data ? data.reduce((acc, item) => acc + (item.price * item.amount), 0).toFixed(2) : 0;
    const currency = getCurrency();

    const renderItem = ({item, index}: { item: ProductSchema, index: number }) => (
        <OrderDetail imagePath={item.imagePath} name={item.name} price={item.price} quantity={item.amount}/>
    )

    const renderFooter = () => (
        <View>
            <Text style={styles.footerText}>Total: {currency} ${total}</Text>
        </View>
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
    },
    footerText: {
        textAlign: 'right',
        fontSize: MISC.largeFontSize,
        fontWeight: 600,
        padding: 10,
    }
})



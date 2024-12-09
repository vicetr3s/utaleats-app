import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {MISC} from "@/constants/styles";
import {getCurrency} from "@/lib/getCurrency";

type props = {
    total: number;
}

export default function TotalProductsPrice({total}: props) {
    const currency = getCurrency();

    return (
        <View>
            <Text style={styles.footerText}>Total: {currency} ${total.toFixed(2)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    footerText: {
        textAlign: 'right',
        fontSize: MISC.largeFontSize,
        fontWeight: 600,
        padding: 10,
    }
})
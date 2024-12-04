import {PastOrderSchema} from "@/constants/schemas";
import React from "react";
import {COLORS, MISC} from "@/constants/styles";
import {FlatList, StyleSheet, View} from "react-native";
import Order from "@/components/profile/Order";

type props = {
    data: PastOrderSchema[] | null;
}

export default function OrderCarousel({data}: props) {
    const renderItem = ({item, index}: { item: PastOrderSchema, index: number }) => (
        <Order storeName={item.storeName} total={item.total} storeImgPath={item.storeImgPath}/>
    )

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
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
        paddingHorizontal: 20,
        paddingVertical: 5,
    }
})



import {FlatList, StyleSheet, useWindowDimensions, View} from "react-native";
import React from "react";
import {COLORS, MISC} from "@/constants/styles";
import {itemStoreSchema} from "@/constants/schemas";
import Item from "@/components/store/Item";

type props = {
    data: itemStoreSchema[];
}

export default function ItemContainer({data}: props) {
    const {width} = useWindowDimensions();
    const itemColumns = Math.floor((width / 125) - 0.5);
    const columnGap = 40 / itemColumns;

    const renderItem = ({item, index}: { item: itemStoreSchema, index: number }) => (
        <Item imagePath={item.imagePath} name={item.name} price={item.price} onPress={() => {
        }}/>
    )

    if (itemColumns === 1) {
        return (
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                    horizontal={false}
                    contentContainerStyle={styles.contentContainer}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.name}
                horizontal={false}
                numColumns={itemColumns}
                contentContainerStyle={styles.contentContainer}
                columnWrapperStyle={{
                    gap: columnGap
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.baseDkr,
        borderRadius: MISC.borderRadius,
        flex: 1,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        padding: 20,
    }
})



import {FlatList, StyleSheet, useWindowDimensions, View} from "react-native";
import React from "react";
import {COLORS, LIB, MISC} from "@/constants/styles";
import {ProductSchema} from "@/constants/schemas";
import Product from "@/components/store/Product";
import {useCartContext} from "@/components/contexts/CartContext";

type props = {
    data: ProductSchema[];
}

export default function ProductContainer({data}: props) {
    const {width} = useWindowDimensions();
    const itemColumns = Math.floor((width / 125) - 0.5);
    const columnGap = 60 / itemColumns;
    const {setCartProducts} = useCartContext();

    const handleClick = (item: ProductSchema) => {
        setCartProducts((prevItems) => {
            const itemIndex = prevItems.findIndex((product) => product.name === item.name);

            if (itemIndex !== -1) {
                return prevItems.map((product, index) =>
                    index === itemIndex
                        ? {...product, amount: product.amount + 1}
                        : product
                );
            } else {
                return [...prevItems, {...item, amount: 1}];
            }
        });
    }

    const renderItem = ({item}: { item: ProductSchema }) => (
        <Product imagePath={item.imagePath} name={item.name} price={item.price} onPress={() => handleClick(item)}/>
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
        <View style={[styles.container, LIB.insetShadow]}>
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
        paddingBottom: 30,
    }
})



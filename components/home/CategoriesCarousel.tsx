import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import IconButton from "@/components/IconButton";
import {COLORS} from "@/constants/styles";

export default function CategoriesCarousel() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    //Fetch categories maybe
    const data = [
        {id: '1', label: 'All'},
        {id: '2', label: 'Healthy'},
        {id: '3', label: 'Vegan'},
        {id: '4', label: 'Comfortable'},
        {id: '5', label: 'FastFood'},
    ];

    const renderItem = ({item, index}: { item: { id: string; label: string }; index: number }) => (
        <IconButton label={item.label} onPress={() => setSelectedIndex(index)}
                    btnStyle={[selectedIndex === index && styles.selectedBtn, styles.categoryBtn]} primary={false}/>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContent}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    flatListContent: {
        paddingVertical: 5,
        gap: 10,
    },
    selectedBtn: {
        backgroundColor: COLORS.primary,
    },
    categoryBtn: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 0,
    }
});


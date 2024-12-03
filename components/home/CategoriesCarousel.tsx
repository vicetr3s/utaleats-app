import React, {useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import IconButton from "@/components/ui/IconButton";
import {COLORS} from "@/constants/styles";

type props = {
    setCategory: (newCategory: string) => void;
}

type category = {
    id: string;
    label: string;
}

export default function CategoriesCarousel({setCategory}: props) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    //Fetch categories maybe
    const data = [
        {id: '1', label: 'All'},
        {id: '2', label: 'Healthy'},
        {id: '3', label: 'Vegan'},
        {id: '4', label: 'Comfortable'},
        {id: '5', label: 'FastFood'},
    ];

    const handleClick = (index: number) => {
        setSelectedIndex(index);
        const selectedCategory : category = data[index];
        setCategory(selectedCategory.label);
    }

    const renderItem = ({item, index}: { item: { id: string; label: string }; index: number }) => (
        <IconButton label={item.label} onPress={() => handleClick(index)}
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
        alignItems: 'flex-start',
        transform: [
            {translateY: -5},
        ],
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


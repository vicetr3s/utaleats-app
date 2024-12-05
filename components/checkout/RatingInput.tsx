import {useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Star from "@/components/checkout/Star";
import {COLORS, MISC} from "@/constants/styles";

type RatingInputProps = {
    rating: number;
    onChange?: (newRating: number) => void;
};

export default function RatingInput({rating, onChange}: RatingInputProps) {
    const [hover, setHover] = useState(0);
    const ratingValues = [1, 2, 3, 4, 5];

    const handlePress = (value: number) => {
        const newValue = value !== rating ? value : 0;
        onChange?.(newValue);
    };

    return (
        <View style={styles.container}>
            {ratingValues.map((star) => (
                <TouchableOpacity
                    key={star}
                    onPress={() => handlePress(star)}
                    onPressIn={() => setHover(star)}
                    onPressOut={() => setHover(0)}
                >
                    <Star fill={star <= (hover || rating)}/>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderColor: COLORS.baseDkrr,
        borderWidth: 1,
        borderRadius: MISC.borderRadius,
        width: '60%',
        justifyContent: 'center',
    },
});
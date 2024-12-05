import {StyleSheet, TextInput, View} from "react-native";
import {COLORS, MISC} from "@/constants/styles";

type props = {
    review: string;
    setReview: (review: string) => void;
}

export default function TextAreaInputField({review, setReview}: props) {
    return (
        <View style={styles.container}>
            <TextInput placeholder='Share your experience with this order...' value={review} onChangeText={setReview}
                       style={styles.input} multiline={true}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: COLORS.baseDkrr,
        borderWidth: 1,
        borderRadius: MISC.borderRadius,
        minHeight: 115,
    },
    input: {
        fontSize: MISC.midFontSize,
        paddingHorizontal: 10,
    }
})
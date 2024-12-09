import {StyleSheet, Text, View} from "react-native";
import {COLORS, MISC} from "@/constants/styles";

type props = {
    message: string,
}

export default function ErrorText({message}: props) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{message}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '65%',
        padding: 10,
    },
    text: {
        height: 'auto',
        fontSize: MISC.smallFontSize,
        color: COLORS.red,
        textAlign: 'center',
    }
})
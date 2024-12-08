import {StyleSheet, Text} from 'react-native';
import {PlatformPressable} from "@react-navigation/elements";
import {MISC} from "@/constants/styles";

type props = {
    label: string;
    onPress: () => void;
};

export default function UnderlineTextButton({label, onPress}: props) {

    return (
        <PlatformPressable android_ripple={{
            foreground: true,
            borderless: false,
        }} onPress={onPress}>
            <Text style={styles.text}>{label}</Text>
        </PlatformPressable>
    )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        textDecorationLine: 'underline',
        fontSize: MISC.midFontSize
    },
    btn: {
        textAlign: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 26,
        minWidth: 90,
        overflow: 'hidden',
        gap: 12,
    }
})
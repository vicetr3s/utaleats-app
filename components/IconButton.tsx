import {StyleSheet, Text} from 'react-native';
import {COLORS, LIB, MISC} from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import {PlatformPressable} from "@react-navigation/elements";

type Props = {
    icon?: any;
    label: string;
    onPress: () => void;
    primary?: boolean;
    btnStyle?: object
};

export default function IconButton({icon, label, onPress, btnStyle, primary = true}: Props) {
    const colorStyle = primary ? styles.primary : styles.secondary;

    return (
        <PlatformPressable style={[styles.btn, colorStyle, LIB.shadow, btnStyle]} android_ripple={{
            foreground: true,
            borderless: false,
        }} onPress={onPress}>
            {icon && <Ionicons
                name={icon}
                color={COLORS.fntOverPrimary}
                size={MISC.midIconSize}
            />}
            <Text style={colorStyle}>{label}</Text>
        </PlatformPressable>
    )
}

const styles = StyleSheet.create({
    primary: {
        backgroundColor: COLORS.primary,
        color: COLORS.fntOverPrimary,
        textAlign: 'center'

    },
    secondary: {
        backgroundColor: COLORS.secondary,
        textAlign: 'center'
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 26,
        minWidth: 90,
        overflow: 'hidden',
    }
})
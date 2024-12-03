import {StyleSheet, Text} from 'react-native';
import {COLORS, LIB, MISC} from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import {PlatformPressable} from "@react-navigation/elements";

type Props = {
    icon?: string;
    label?: string;
    onPress: () => void;
    primary?: boolean;
    btnStyle?: any;
    iconColor?: any;
    shadow?: boolean;
};

export default function IconButton({icon, label, onPress, btnStyle, primary = true, iconColor, shadow = true}: Props) {
    const colorStyle = primary ? styles.primary : styles.secondary;
    const colorTextStyle = primary ? styles.primaryText : styles.secondaryText;
    const colorIcon = iconColor ? iconColor : COLORS.fntOverPrimary;
    const definitiveStyle = shadow ? [styles.btn, colorStyle, LIB.shadow, btnStyle] : [styles.btn, colorStyle, btnStyle];

    return (
        <PlatformPressable style={definitiveStyle} android_ripple={{
            foreground: true,
            borderless: false,
        }} onPress={onPress}>
            {icon && <Ionicons
                name={icon}
                color={colorIcon}
                size={MISC.midIconSize}
            />}
            {label && <Text style={[colorTextStyle, {fontSize: MISC.largeFontSize}]}>{label}</Text>}

        </PlatformPressable>
    )
}

const styles = StyleSheet.create({
    primary: {
        backgroundColor: COLORS.primary,
    },
    secondary: {
        backgroundColor: COLORS.secondary,
    },
    primaryText: {
        color: COLORS.fntOverPrimary,
        textAlign: 'center',
    },
    secondaryText: {
        textAlign: 'center',
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
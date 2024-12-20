import {StyleSheet, Text, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {COLORS, MISC} from "@/constants/styles";

type props = {
    city?: string | null;
}

export default function HomeHeader({city}: props) {
    return (
        <View style={styles.nav}>
            <View style={styles.city}>
                <Ionicons
                    name={'navigate-circle'}
                    color={'#000000'}
                    size={MISC.largeIconSize}
                />
                <Text style={styles.cityText}>{city ? city : 'Unknown city'}</Text>
            </View>
            <View style={styles.utalEats}>
                <Text style={styles.utalEatsText}>UtalEats</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 25,
    },
    city: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    cityText: {
        color: '#000000',
        fontSize: MISC.largeFontSize,
        fontWeight: 500,
        textTransform: 'capitalize',
    },
    utalEats: {
        width: 'auto',
    },
    utalEatsText: {
        color: COLORS.primary,
        fontSize: MISC.largerFontSize,
        fontWeight: 700,
    }
})
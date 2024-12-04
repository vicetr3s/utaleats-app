import {StyleSheet, Text, View} from "react-native";
import IconButton from "@/components/ui/IconButton";
import {MISC} from "@/constants/styles";

type props = {
    label: string;
    onPress: () => void;
}

export default function CartAndCheckoutHeader({label, onPress}: props) {
    return (
        <View style={styles.header}>
            <Text style={styles.label}>{label}</Text>
            <IconButton onPress={onPress} icon={'arrow-back'} btnStyle={styles.btn}/>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        gap: 0,
        paddingVertical: 0,
        paddingHorizontal: 0,
        minWidth: 35,
        maxWidth: 35,
        minHeight: 35,
        maxHeight: 35,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 25,
    },
    label: {
        fontSize: MISC.largerFontSize,
        fontWeight: 600,
    }
})
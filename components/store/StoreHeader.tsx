import {StyleSheet, Text, View} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {MISC} from "@/constants/styles";
import IconButton from "@/components/ui/IconButton";

type props = {
    name: string;
    onPress: () => void;
}

export default function StoreHeader({name, onPress}: props) {
    return (
        <View style={styles.nav}>
            <View style={styles.store}>
                <Ionicons
                    name={'basket'}
                    color={'#000000'}
                    size={MISC.largeIconSize}
                />
                <Text style={styles.storeName}>{name}</Text>
            </View>
            <View style={styles.cart}>
                <IconButton label={'0'} icon={'cart'} onPress={onPress}/>
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
    store: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    storeName: {
        color: '#000000',
        fontSize: MISC.largeFontSize,
        fontWeight: 500,
        textTransform: 'capitalize',
    },
    cart: {
        width: 'auto',
    },
})
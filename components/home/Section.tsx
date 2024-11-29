import {ReactNode} from "react";
import {StyleSheet, Text, View} from "react-native";

type props = {
    label: string,
    children: ReactNode,
    style?: any,
}

export default function Section({label, children, style}: props) {
    return (
        <View style={[styles.container,style]}>
            <Text style={styles.sectionLabel}>{label}</Text>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    sectionLabel: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 10,
    }
})
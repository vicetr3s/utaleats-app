import {ReactNode} from "react";
import {StyleSheet, Text, View} from "react-native";

type props = {
    label: string,
    children: ReactNode,
}

export default function Section({label, children}: props) {
    return (
        <View style={styles.container}>
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
        fontWeight: 700,
        marginBottom: 10,
    }
})
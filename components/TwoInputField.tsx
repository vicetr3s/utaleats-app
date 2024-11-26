import {StyleSheet, Text, TextInput, View} from "react-native";
import {COLORS, MISC} from "@/constants/styles";

type InputField = {
    label: string,
    placeholders: string[],
    isSecure?: boolean,
    inputMode?: string
}

export default function TwoInputField({label, placeholders, inputMode, isSecure = false}: InputField) {
    const inputModeText = inputMode === undefined ? 'text' : inputMode;

    return (
        <View>
            <Text style={{
                fontSize: MISC.midFontSize,
            }}>{label}</Text>
            <View style={styles.twoInputs}>
                <TextInput placeholder={placeholders[0]} inputMode={inputModeText} style={styles.textField}
                           maxLength={20}
                           secureTextEntry={isSecure}/>
                <TextInput placeholder={placeholders[1]} inputMode={inputModeText} style={styles.textField}
                           maxLength={20}
                           secureTextEntry={isSecure}/>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    textField: {
        width: 100,
        backgroundColor: COLORS.baseDk,
        borderRadius: MISC.borderInnerRadius,
        borderColor: COLORS.baseDkr,
        borderWidth: 1,
        height: 35,
        fontSize: MISC.smallFontSize,
        lineHeight: MISC.smallFontSize,
        paddingVertical: 0,
        paddingLeft: 10,

    },
    twoInputs: {
        width: 'auto',
        gap: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
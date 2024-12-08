import {InputModeOptions, StyleSheet, Text, TextInput, View} from "react-native";
import {COLORS, MISC} from "@/constants/styles";
import React from "react";

type InputField = {
    label: string,
    placeholders: string[],
    isSecure?: boolean,
    inputMode?: string,
    values: string[],
    setValues: React.Dispatch<React.SetStateAction<string>>[],
}

export default function TwoInputField({
                                          label,
                                          placeholders,
                                          inputMode,
                                          isSecure = false,
                                          values,
                                          setValues
                                      }: InputField) {
    const inputModeText = (inputMode ?? 'text') as InputModeOptions;

    return (
        <View>
            <Text style={{
                fontSize: MISC.midFontSize,
            }}>{label}</Text>
            <View style={styles.twoInputs}>
                <TextInput placeholder={placeholders[0]} inputMode={inputModeText} style={styles.textField}
                           maxLength={18}
                           secureTextEntry={isSecure} value={values[0]} onChangeText={setValues[0]}/>
                <TextInput placeholder={placeholders[1]} inputMode={inputModeText} style={styles.textField}
                           maxLength={18}
                           secureTextEntry={isSecure} value={values[1]} onChangeText={setValues[1]}/>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    textField: {
        width: 115,
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
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
import {StyleSheet, Text, TextInput, View} from "react-native";
import {COLORS, MISC} from "@/constants/styles";
import React from "react";

type InputField = {
    label: string,
    placeholder: string,
    isSecure?: boolean,
    inputMode?: string,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
}

export default function InputField({label, placeholder, inputMode, isSecure = false, value, setValue}: InputField) {
    const inputModeText = inputMode === undefined ? 'text' : inputMode;

    return (
        <View>
            <Text style={
                {
                    fontSize: MISC.midFontSize,
                }
            }>{label}</Text>
            <TextInput placeholder={placeholder} inputMode={inputModeText} style={styles.textField} maxLength={40}
                       secureTextEntry={isSecure} value={value} onChangeText={setValue}/>
        </View>
    )
}

const styles = StyleSheet.create({
    textField: {
        width: 250,
        backgroundColor: COLORS.baseDk,
        borderRadius: MISC.borderInnerRadius,
        borderColor: COLORS.baseDkr,
        borderWidth: 1,
        height: 35,
        fontSize: MISC.smallFontSize,
        lineHeight: MISC.smallFontSize,
        paddingLeft: 10,
        paddingTop: 0,
        paddingBottom: 0,
    }
})
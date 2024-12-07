import {StyleSheet, Text, TextInput, View} from "react-native";
import {COLORS, MISC} from "@/constants/styles";
import React from "react";

type InputField = {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
}

export default function PhoneNumberInputField({value, setValue}: InputField) {
    return (
        <View>
            <Text style={
                {
                    fontSize: MISC.midFontSize,
                }
            }>Phone number</Text>
            <View style={styles.container}>
                <View style={styles.prefix}>
                    <Text style={styles.textPrefix}>+569</Text>
                </View>
                <TextInput placeholder={'12345678'} inputMode={'text'} style={styles.textField} maxLength={8}
                           value={value} onChangeText={setValue}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    textField: {
        width: 200,
        backgroundColor: COLORS.baseDk,
        borderTopRightRadius: MISC.borderInnerRadius,
        borderBottomRightRadius: MISC.borderInnerRadius,
        borderColor: COLORS.baseDkr,
        borderWidth: 1,
        height: 35,
        fontSize: MISC.smallFontSize,
        lineHeight: MISC.smallFontSize,
        paddingLeft: 10,
        paddingTop: 0,
        paddingBottom: 0,
    },
    container: {
        flexDirection: 'row',
        height: 'auto',
    },
    prefix: {
        height: 35.5,
        width: 50,
        backgroundColor: COLORS.baseDk,
        borderBottomLeftRadius: MISC.borderInnerRadius,
        borderTopLeftRadius: MISC.borderInnerRadius,
        borderColor: COLORS.baseDkr,
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: MISC.smallFontSize,
    },
    textPrefix: {
        textAlign: 'center',
    }
})
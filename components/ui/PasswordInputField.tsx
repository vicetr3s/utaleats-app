import {StyleSheet, Text, TextInput, View} from "react-native";
import {COLORS, MISC} from "@/constants/styles";
import React from "react";

type InputField = {
    password: string,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    confirmPassword: string,
    setConfirmPassword: React.Dispatch<React.SetStateAction<string>>,
}

export default function PasswordInputField({password, setPassword, confirmPassword, setConfirmPassword}: InputField) {

    return (
        <View>
            <Text style={
                {
                    fontSize: MISC.midFontSize,
                }
            }>Password</Text>
            <View style={styles.twoInput}>

                <TextInput placeholder={'Password'} inputMode={'text'} style={styles.textField} maxLength={40}
                           secureTextEntry={true} value={password} onChangeText={setPassword}/>
                <TextInput placeholder={'Confirm your password'} inputMode={'text'} style={styles.textField}
                           maxLength={40}
                           secureTextEntry={true} value={confirmPassword} onChangeText={setConfirmPassword}/>
            </View>

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
    },
    twoInput: {
        gap: 15,
    }
})
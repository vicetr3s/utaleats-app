import {Keyboard, StyleSheet, Text, View} from "react-native";
import {COLORS, MISC} from "@/constants/styles";
import DropDownPicker from "react-native-dropdown-picker";
import React from "react";

type InputField = {
    label: string,
    placeholder: string,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    items: any,
    setItems: React.Dispatch<React.SetStateAction<any>>,
}

export default function DropDownInputField({
                                               label,
                                               placeholder,
                                               open,
                                               setOpen,
                                               value,
                                               items,
                                               setValue,
                                               setItems
                                           }: InputField) {

    const handleOpen = () => {
        Keyboard.dismiss();

        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <View>
            <Text style={{
                fontSize: MISC.midFontSize
            }}>{label}</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={handleOpen}
                onClose={handleClose}
                setValue={setValue}
                setItems={setItems}
                placeholder={placeholder}
                placeholderStyle={
                    {color: COLORS.placeHolderText}
                }
                containerStyle={styles.pickerContainer}
                dropDownContainerStyle={styles.dropDown}
                style={styles.picker}
            />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        pickerContainer: {
            width: 250,
            fontSize: MISC.smallFontSize,
            lineHeight: MISC.smallFontSize,
        },
        dropDown: {
            backgroundColor: COLORS.baseDk,
            borderColor: COLORS.baseDkr,
        },
        picker: {
            minHeight: 35,
            backgroundColor: COLORS.baseDk,
            borderRadius: MISC.borderInnerRadius,
            borderColor: COLORS.baseDkr,
            borderWidth: 1,
            fontSize: MISC.smallFontSize,
            lineHeight: MISC.smallFontSize,
            paddingLeft: 10,
            paddingTop: 0,
            paddingBottom: 0,
        }
    }
)
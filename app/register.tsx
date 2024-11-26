import {Alert, StyleSheet, Text, View} from "react-native";
import {COLORS, LIB} from "@/constants/styles";
import InputField from "@/components/InputField";
import IconButton from "@/components/IconButton";
import TwoInputField from "@/components/TwoInputField";
import {useState} from "react";
import DropDownInputField from "@/components/DropDownInputField";

export default function RegisterScreen() {
    const [secondRegisterStep, setSecondRegisterStep] = useState<boolean>(false);

    const [selectedCity, setSelectedCity] = useState<string>('');
    const [cities, setCities] = useState([
        {label: 'Curicó', value: 'curico'},
        {label: 'Talca', value: 'talca'},
    ]);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const handleClick = () => {
        setSecondRegisterStep(true);
    }

    if (!secondRegisterStep) {
        return (
            <View style={styles.registerPage}>
                <Text style={[LIB.h2]}>Let's create an
                    <Text style={{color: COLORS.primary}}> account</Text>
                </Text>

                <Text style={LIB.h3}>We need some information about you</Text>

                <View style={[styles.registerContainer, LIB.container, LIB.shadow]}>
                    <InputField label={'Email'} placeholder={'Email'} inputMode={'email'}/>
                    <InputField label={'Password'} placeholder={'Password'} isSecure={true}/>
                    <TwoInputField label={'Full name'} placeholders={['First Name', 'Last Name']}/>
                    <IconButton label={'Continue'} onPress={handleClick} btnStyle={styles.continueBtn}/>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.registerPage}>
            <Text style={[LIB.h2]}>You're almost ready</Text>

            <Text style={LIB.h3}>Local shops are waiting</Text>

            <View style={[styles.registerContainer, LIB.container, LIB.shadow]}>
                <InputField label={'Phone number'} placeholder={'Eg: +569XXXXXXXX'}/>

                <DropDownInputField
                    open={dropdownOpen}
                    value={selectedCity}
                    items={cities}
                    setOpen={setDropdownOpen}
                    setValue={setSelectedCity}
                    setItems={setCities}
                    placeholder={'Select your city'}
                    label={'City'}/>

                <InputField label={'Street Address'} placeholder={'Eg: Mulberry Street 147'}/>
                <IconButton label={'Create'} onPress={() => Alert.alert('hola')} btnStyle={styles.continueBtn}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    registerPage: {
        flex: 1,
        marginTop: -60,
        justifyContent: "center",
        alignItems: "center",
    },
    registerContainer: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    continueBtn: {
        marginTop: 30
    }
})
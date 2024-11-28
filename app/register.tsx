import {StyleSheet, Text, View} from "react-native";
import {COLORS, LIB, MISC} from "@/constants/styles";
import InputField from "@/components/InputField";
import IconButton from "@/components/IconButton";
import TwoInputField from "@/components/TwoInputField";
import {useState} from "react";
import DropDownInputField from "@/components/DropDownInputField";
import {fetchUrl} from "@/lib/fetchUrl";
import {useAuthContext} from "@/components/AuthContext";

export default function RegisterScreen() {
    const [secondRegisterStep, setSecondRegisterStep] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [cities, setCities] = useState([
        {label: 'Curicó', value: 'curico'},
        {label: 'Talca', value: 'talca'},
    ]);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const {userId, setUserId} = useAuthContext();

    const handleFirstClick = () => {
        setErrorMsg('');
        setError(false);

        if (!email || email.length <= 0) {
            setErrorMsg('Please enter a valid email address');
            setError(true);
            return;
        }

        if (!password || password.length <= 0) {
            setErrorMsg('Please enter a password');
            setError(true);
            return;
        }

        if ((!firstName || firstName.length <= 0) || (!lastName || lastName.length <= 0)) {
            setErrorMsg('Please enter a valid name');
            setError(true);
            return;
        }

        setSecondRegisterStep(true);
    }

    const handleSecondClick = () => {
        setErrorMsg('');
        setError(false);

        if (!phoneNumber || phoneNumber.length <= 0) {
            setErrorMsg('Please enter a valid phone number');
            setError(true);
            return;
        }

        if (!selectedCity || selectedCity.length <= 0) {
            setErrorMsg('Please enter a valid city');
            setError(true);
            return;
        }

        if (!address || address.length <= 0) {
            setErrorMsg('Please enter a valid street address');
            setError(true);
            return;
        }

        const bodyData = JSON.stringify({
            email: email,
            password: password,
            name: firstName + ' ' + lastName,
            phone: phoneNumber,
            city: selectedCity,
            streetAddress: address,
        });

        (async () => {
            try {
                const {error, errorMsg, data} = await fetchUrl({
                    endPoint: 'account/register',
                    body: bodyData,
                    method: 'POST'
                })

                setError(error);
                setErrorMsg(errorMsg);
                setUserId(data.id);
            } catch (error) {
                setError(true);
                setErrorMsg('Something happened');
            }
        })();
    }

    if (!secondRegisterStep) {
        return (
            <View style={styles.registerPage}>
                <Text style={LIB.h2}>Let's create an
                    <Text style={{color: COLORS.primary}}> account</Text>
                </Text>

                <Text style={LIB.h3}>We need some information about you</Text>

                <View style={[styles.registerContainer, LIB.container, LIB.shadow]}>
                    <InputField label={'Email'} placeholder={'Email'} inputMode={'email'} value={email}
                                setValue={setEmail}/>
                    <InputField label={'Password'} placeholder={'Password'} isSecure={true} value={password}
                                setValue={setPassword}/>
                    <TwoInputField label={'Full name'} placeholders={['First Name', 'Last Name']}
                                   values={[firstName, lastName]} setValues={[setFirstName, setLastName]}/>
                    {error &&
                        <Text style={{
                            fontSize: MISC.smallFontSize
                        }}>{errorMsg}</Text>}

                    <IconButton label={'Continue'} onPress={handleFirstClick} btnStyle={styles.continueBtn}/>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.registerPage}>
            <Text style={LIB.h2}>You're almost ready</Text>

            <Text style={LIB.h3}>Local shops are waiting</Text>

            <View style={[styles.registerContainer, LIB.container, LIB.shadow]}>
                <InputField label={'Phone number'} placeholder={'Eg: +569XXXXXXXX'} value={phoneNumber}
                            setValue={setPhoneNumber}/>

                <DropDownInputField
                    open={dropdownOpen}
                    value={selectedCity}
                    items={cities}
                    setOpen={setDropdownOpen}
                    setValue={setSelectedCity}
                    setItems={setCities}
                    placeholder={'Select your city'}
                    label={'City'}/>

                <InputField label={'Street Address'} placeholder={'Eg: Mulberry Street 147'} value={address}
                            setValue={setAddress}/>
                {error &&
                    <Text style={{
                        fontSize: MISC.smallFontSize
                    }}>{errorMsg}</Text>}
                <IconButton label={'Create'} onPress={handleSecondClick} btnStyle={styles.continueBtn}/>
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
import {StyleSheet, Text, View} from "react-native";
import {COLORS, LIB, MISC} from "@/constants/styles";
import InputField from "@/components/ui/InputField";
import IconButton from "@/components/ui/IconButton";
import TwoInputField from "@/components/ui/TwoInputField";
import {useEffect, useState} from "react";
import DropDownInputField from "@/components/ui/DropDownInputField";
import {fetchUrl} from "@/lib/fetchUrl";
import {useAuthContext} from "@/components/contexts/AuthContext";
import {Link} from "expo-router";
import {CityDropDownSchema, FirstSignUpSchema, SecondSignUpSchema, StoreSchema} from "@/constants/schemas";
import PhoneNumberInputField from "@/components/ui/PhoneNumberInputField";
import ErrorText from "@/components/ui/ErrorText";
import UnderlineTextButton from "@/components/ui/UnderlineTextButton";
import PasswordInputField from "@/components/ui/PasswordInputField";

export default function RegisterScreen() {
    const [secondRegisterStep, setSecondRegisterStep] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [cities, setCities] = useState<CityDropDownSchema[]>([]);
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const {setUserId} = useAuthContext();

    useEffect(() => {
        const fetchStores = async () => {

            try {
                const {error, data} = await fetchUrl({
                    endPoint: `api/store?cityName=`,
                    method: 'GET'
                });

                setError(error);

                if (data) {
                    const availableCities: string[] = Array.from(new Set(data
                        .map((store: StoreSchema) => (store.cityName))
                    ));

                    const availableCitiesFinal = availableCities
                        .map((category: string) => ({
                            label: category,
                            value: category,
                        }));

                    setCities(availableCitiesFinal);
                }

            } catch (error) {
                setError(true);
            }
        };

        fetchStores();
    }, []);

    const handleFirstClick = () => {
        setErrorMsg('');
        setError(false);

        const validateFields = FirstSignUpSchema.safeParse({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        })

        if (!validateFields.success) {
            const errors = validateFields.error.flatten().fieldErrors;

            setError(true);

            if (errors.lastName) setErrorMsg(errors.lastName[0]);
            if (errors.firstName) setErrorMsg(errors.firstName[0]);
            if (errors.password) setErrorMsg(errors.password[0]);
            if (errors.email) setErrorMsg(errors.email[0]);

            return;
        }

        if (password !== confirmPassword) {
            setError(true);

            setErrorMsg('Passwords do not match');

            return;
        }

        setSecondRegisterStep(true);
    }

    const handleSecondClick = () => {
        setErrorMsg('');
        setError(false);

        const validateFields = SecondSignUpSchema.safeParse({
            phoneNumber: phoneNumber,
            city: selectedCity,
            streetAddress: address,
        })

        if (!validateFields.success) {
            const errors = validateFields.error.flatten().fieldErrors;

            setError(true);

            if (errors.streetAddress) setErrorMsg(errors.streetAddress[0]);
            if (errors.phoneNumber) setErrorMsg(errors.phoneNumber[0]);
            if (errors.city) setErrorMsg(errors.city[0]);

            return;
        }

        const bodyData = {
            email: email,
            password: password,
            name: firstName + ' ' + lastName,
            phone: phoneNumber,
            address: address,
            city: selectedCity,
        };

        (async () => {
            try {
                const {error, data} = await fetchUrl({
                    endPoint: 'api/account/register',
                    body: bodyData,
                    method: 'POST'
                })

                setError(error);

                if (error) setErrorMsg(data);

                if (!error && data.id) setUserId(String(data.id));

            } catch (error) {
                setError(true);
                setErrorMsg('Unexpected error occurred');
            }
        })();
    }

    const goToFirstStep = () => {
        setSecondRegisterStep(false);
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
                    <PasswordInputField password={password} setPassword={setPassword} confirmPassword={confirmPassword}
                                        setConfirmPassword={setConfirmPassword}/>
                    <TwoInputField label={'Full name'} placeholders={['First Name', 'Last Name']}
                                   values={[firstName, lastName]} setValues={[setFirstName, setLastName]}/>

                    {error && <ErrorText message={errorMsg}/>}

                    <IconButton label={'Continue'} onPress={handleFirstClick} btnStyle={styles.continueBtn}/>
                    <Link href={'/login'} style={styles.login}>I have an account</Link>

                </View>
            </View>
        )
    }

    return (
        <View style={styles.registerPage}>
            <Text style={LIB.h2}>You're almost ready</Text>

            <Text style={LIB.h3}>Local shops are waiting</Text>

            <View style={[styles.registerContainer, LIB.container, LIB.shadow]}>
                <PhoneNumberInputField value={phoneNumber} setValue={setPhoneNumber}/>

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
                {error && <ErrorText message={errorMsg}/>}
                <IconButton label={'Create'} onPress={handleSecondClick} btnStyle={styles.continueBtn}/>

                <UnderlineTextButton label={'Go back'} onPress={goToFirstStep}/>
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
    },
    login: {
        textDecorationLine: 'underline',
        fontSize: MISC.midFontSize
    }
})
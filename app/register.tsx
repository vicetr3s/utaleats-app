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
                    const availableCities = data
                        .map((store: StoreSchema) => ({
                            label: store.cityName,
                            value: store.cityName,
                        }))
                        .filter((city: CityDropDownSchema) => city.label);

                    setCities(availableCities);
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
                setErrorMsg(errorMsg);
                setUserId(String(data.id));
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
                <Link href={'/login'} style={styles.login}>I have an account</Link>

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
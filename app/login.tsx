import {StyleSheet, Text, View} from "react-native";
import {COLORS, LIB, MISC} from "@/constants/styles";
import InputField from "@/components/ui/InputField";
import {Link, useRouter} from "expo-router";
import IconButton from "@/components/ui/IconButton";
import {useEffect, useState} from "react";
import {fetchUrl} from "@/lib/fetchUrl";
import {useAuthContext} from "@/components/contexts/AuthContext";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const router = useRouter();
    const {userId, setUserId} = useAuthContext();

    useEffect(() => {
        if (userId) {
            router.replace('/');
        }
    }, [userId]);

    const handleClick = () => {
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

        const bodyData = {
            email: email,
            password: password,
        };

        (async () => {
            try {
                const {error, data} = await fetchUrl({
                    endPoint: 'api/account/login',
                    body: bodyData,
                    method: 'POST'
                })

                setError(error);

                if (!error && Object.keys(data).length === 0) {
                    setError(true);
                    setErrorMsg('Incorrect email or password. Please try again.');
                }

                if (data.accountId) {
                    setUserId(String(data.accountId));
                }

            } catch (error) {
                setError(true);
                setErrorMsg('Something happened');
            }
        })();
    }

    return (
        <View style={styles.loginPage}>
            <Text style={LIB.h1}>Welcome to
                <Text style={{color: COLORS.primary}}> UtalEats</Text>
            </Text>

            <Text style={LIB.h3}>Your local shop delivery app</Text>

            <View style={styles.loginSection}>
                <Text style={[LIB.h2, {
                    marginBottom: 10,
                }]}>Login</Text>

                <View style={[styles.loginContainer, LIB.container, LIB.shadow]}>
                    <InputField label={'Email'} placeholder={'Email'} inputMode={'email'} value={email}
                                setValue={setEmail}/>
                    <InputField label={'Password'} placeholder={'Password'} isSecure={true} value={password}
                                setValue={setPassword}/>
                    {error &&
                        <Text style={{
                            fontSize: MISC.smallFontSize
                        }}>{errorMsg}</Text>
                    }
                    <IconButton label={'Log in'} onPress={handleClick} btnStyle={styles.loginBtn}/>
                    <Link href={'/register'} style={styles.register}>No account?, Create one!</Link>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loginSection: {
        marginTop: 30,
    },
    loginPage: {
        flex: 1,
        marginTop: -60,
        justifyContent: "center",
        alignItems: "center",
    },
    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
    },
    loginBtn: {
        marginTop: 60
    },
    register: {
        textDecorationLine: 'underline',
        fontSize: MISC.midFontSize
    }
})
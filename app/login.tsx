import {Alert, StyleSheet, Text, View} from "react-native";
import {COLORS, LIB} from "@/constants/styles";
import InputField from "@/components/InputField";
import {Link} from "expo-router";
import IconButton from "@/components/IconButton";

export default function LoginScreen() {
    return (
        <View style={styles.loginPage}>
            <Text style={[LIB.h1]}>Welcome to
                <Text style={{color: COLORS.primary}}> UtalEats</Text>
            </Text>

            <Text style={LIB.h3}>Your local shop delivery app</Text>

            <View style={styles.loginSection}>
                <Text style={[LIB.h2, {
                    marginBottom: 10,
                }]}>Login</Text>

                <View style={[styles.loginContainer, LIB.container, LIB.shadow]}>
                    <InputField label={'Email'} placeholder={'Email'} inputMode={'email'}/>
                    <InputField label={'Password'} placeholder={'Password'} isSecure={true}/>
                    <IconButton label={'Log in'} onPress={() => Alert.alert('hola')} btnStyle={styles.loginBtn}/>
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
        textDecorationLine: 'underline'
    }
})
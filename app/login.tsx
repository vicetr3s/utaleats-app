import {StyleSheet, Text, TextInput, View} from "react-native";
import {LIB} from "@/constants/styles";

export default function LoginScreen() {
    return (
        <View style={styles.loginContainer}>
            <Text style={styles.h1}>Welcome to UtalEats</Text>
            <Text style={styles.h2}>Your local shop delivery app</Text>
            <Text style={styles.h1}>Login</Text>

            <View style={LIB.container}>
                <Text>Email</Text>
                <TextInput placeholder={"Email"} inputMode={"email"} style={LIB.textField}/>
                <Text>Password</Text>
                <TextInput placeholder={"Password"} secureTextEntry={true} style={LIB.textField}/>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    h1: {
        fontSize: 26,
        fontWeight: 500,
        textAlign: "center",
    },
    h2: {
        fontSize: 20,
        textAlign: "center",
    },

})
import {Alert, StyleSheet, Text, View} from "react-native";
import {COLORS, LIB} from "@/constants/styles";
import InputField from "@/components/InputField";
import IconButton from "@/components/IconButton";

export default function RegisterScreen() {
    return (
        <View style={styles.registerPage}>
            <Text style={[LIB.h2]}>Let's create an
                <Text style={{color: COLORS.primary}}> account</Text>
            </Text>

            <Text style={LIB.h3}>We need some information about you</Text>

            <View style={[styles.registerContainer, LIB.container, LIB.shadow]}>
                <InputField label={'Email'} placeholder={'Email'} inputMode={'email'}/>
                <InputField label={'Password'} placeholder={'Password'} isSecure={true}/>
                <IconButton label={'Continue'} onPress={() => Alert.alert('hola')} btnStyle={styles.continueBtn}/>
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
})
import {StyleSheet, Text, View} from "react-native";
import {MISC} from "@/constants/styles";
import IconButton from "@/components/ui/IconButton";
import {useAuthContext} from "@/components/AuthContext";

export default function ProfileHeader() {
    const {userName, setUserId} = useAuthContext();

    const handleClick = () => {
        setUserId(null);
    }

    return (
        <View style={styles.nav}>
            <View>
                <Text style={styles.userName}>{userName ? userName : 'Unknown username'} profile</Text>
            </View>
            <View style={styles.logout}>
                <IconButton label={'Log out'} onPress={handleClick} primary={false}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 25,
    },
    userName: {
        color: '#000000',
        fontSize: MISC.largeFontSize,
        fontWeight: 600,
        textTransform: 'capitalize',
    },
    logout: {
        width: 'auto',
    },
})
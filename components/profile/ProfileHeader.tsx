import {StyleSheet, Text, View} from "react-native";
import {MISC} from "@/constants/styles";
import IconButton from "@/components/ui/IconButton";
import {useAuthContext} from "@/contexts/AuthContext";

export default function ProfileHeader() {
    const {userName, setUserId} = useAuthContext();
    const userNameText = userName ? userName : 'Unknown username';
    const navText = userNameText + ' profile';

    const handleClick = () => {
        setUserId(null);
    }

    return (
        <View style={styles.nav}>
            <View style={styles.headerText}>
                <Text style={styles.text}>{navText}</Text>
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
    text: {
        textTransform: 'capitalize',
        color: '#000000',
        fontSize: MISC.largeFontSize,
        fontWeight: 600,
    },
    logout: {
        width: 'auto',
    },
    headerText: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        gap: 5,
        width: '70%',
    }
})
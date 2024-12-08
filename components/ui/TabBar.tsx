import {StyleSheet, Text, View} from "react-native";
import {COLORS, MISC} from "@/constants/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import {PlatformPressable} from '@react-navigation/elements';
import {useAuthContext} from "@/contexts/AuthContext";

type TapBar = {
    state: any,
    navigation: any,
}

export default function TabBar({state, navigation}: TapBar) {
    const {userName} = useAuthContext();

    return (
        <View style={styles.tabBar}>
            {state.routes.map((route: any, index: any) => {
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                if (route.name === 'profile') {
                    return (
                        <PlatformPressable
                            key={route.key}
                            onPress={onPress}
                            style={styles.profileTab}
                        >
                            <Ionicons
                                name={'person-sharp'}
                                color={COLORS.fntOverPrimary}
                                size={MISC.midIconSize}
                            />
                            <Text style={{
                                color: COLORS.fntOverPrimary,
                                fontSize: MISC.midFontSize,
                                width: 110,
                                textTransform:'capitalize'
                            }}>
                                {userName ? userName.split(' ')[0] : 'Profile'}
                            </Text>
                        </PlatformPressable>
                    );
                }

                if (route.name === 'index') {
                    return (

                        <PlatformPressable
                            key={route.key}
                            onPress={onPress}
                            android_ripple={{
                                borderless: true,
                                radius: styles.homeTab.borderRadius
                            }}
                            style={[styles.homeTab,]}
                        >
                            <Ionicons
                                name={'home-sharp'}
                                color={COLORS.fntOverPrimary}
                                size={MISC.largeIconSize}
                            />
                        </PlatformPressable>
                    );
                }
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'relative',
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        backgroundColor: COLORS.primary,
    },
    profileTab: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingHorizontal: 15,
    },
    homeTab: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: 55,
        height: 55,
        backgroundColor: COLORS.primary,
        borderRadius: 55 / 2,
        transform: [
            {translateX: '-50%'},
            {translateY: '-65%'},
        ],
    }
})

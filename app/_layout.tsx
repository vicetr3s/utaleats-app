import {Stack} from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="login"/>
            <Stack.Screen name="register"/>
            <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
            <Stack.Screen name="+not-found"/>
        </Stack>
    );
}

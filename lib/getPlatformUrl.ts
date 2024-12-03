import {Platform} from "react-native";

const BASE_URL = Platform.select({
    ios: process.env.EXPO_PUBLIC_IOS_API_URL,
    android: process.env.EXPO_PUBLIC_ANDROID_API_URL,
    default: process.env.EXPO_PUBLIC_DEFAULT_API_URL,
});

export const getPlatformUrl = () => BASE_URL;
import {Platform} from "react-native";

const BASE_URL = Platform.select({
    ios: 'http://localhost/',
    android: 'http://10.0.2.2/',
    default: 'http://localhost/',
});

export const getPlatformUrl = () => BASE_URL;
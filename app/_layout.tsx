import {Stack, useRouter} from "expo-router";
import {AuthContext} from "@/components/AuthContext";
import {useEffect, useState} from "react";
import {deleteUserId, getUserId, saveUserId} from "@/lib/handleUserId";


export default function RootLayout() {
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const id = await getUserId();

            if (id) {
                setCurrentUserId(id);
            } else {
                router.replace('/login');
            }
        })();
    }, []);


    const handleSetUserId = async (id: string | null) => {
        if (id) {
            await saveUserId(id);
        } else {
            await deleteUserId();
        }
        setCurrentUserId(id);
    };

    return (
        <AuthContext.Provider value={{userId: currentUserId, setUserId: handleSetUserId}}>
            <Stack>
                <Stack.Screen name="login"/>
                <Stack.Screen name="register"/>
                <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                <Stack.Screen name="+not-found"/>
            </Stack>
        </AuthContext.Provider>
    );
}

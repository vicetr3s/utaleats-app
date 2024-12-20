import {Stack, useRouter} from "expo-router";
import {AuthContext} from "@/contexts/AuthContext";
import {useEffect, useState} from "react";
import {deleteUserId, getUserId, saveUserId} from "@/lib/handleUserId";
import {fetchUrl} from "@/lib/fetchUrl";
import {ProductSchema} from "@/constants/schemas";
import {CartContext} from "@/contexts/CartContext";

export default function RootLayout() {
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [userCity, setUserCity] = useState<string | null>(null);
    const [cartProducts, setCartProducts] = useState<ProductSchema[]>([]);
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfileData = async () => {
            const id = await getUserId();

            if (id) {
                setCurrentUserId(id);
                try {
                    const {error, data} = await fetchUrl({
                        endPoint: `api/profile?accountId=${id}`,
                        method: 'GET'
                    });

                    if (data) {
                        setUserCity(data.city);
                        setUserName(data.name);
                    }
                } catch (error) {
                    setCurrentUserId(null);
                    setUserCity(null);
                    setUserName(null);
                    router.replace('/login');
                }
            } else {
                setCurrentUserId(null);
                setUserCity(null);
                setUserName(null);
                router.replace('/login');
            }
        };

        fetchUserProfileData();
    }, [currentUserId]);

    const handleSetUserId = async (id: string | null) => {
        if (id) {
            await saveUserId(id);
        } else {
            await deleteUserId();
        }
        setCurrentUserId(id);
    };

    return (
        <AuthContext.Provider
            value={{
                userId: currentUserId,
                setUserId: handleSetUserId,
                userName: userName,
                setUserName: setUserName,
                userCity: userCity,
                setUserCity: setUserCity
            }}>
            <CartContext.Provider
                value={{
                    cartProducts: cartProducts,
                    setCartProducts: setCartProducts,
                }}>
                <Stack>
                    <Stack.Screen name="login" options={{headerShown: false}}/>
                    <Stack.Screen name="register" options={{headerShown: false}}/>
                    <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
                    <Stack.Screen name="+not-found" options={{headerShown: false}}/>
                </Stack>
            </CartContext.Provider>
        </AuthContext.Provider>
    );
}

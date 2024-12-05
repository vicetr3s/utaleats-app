import {View} from "react-native";
import {useNavigation, useRouter} from "expo-router";
import {useAuthContext} from "@/components/contexts/AuthContext";
import {useEffect, useState} from "react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import Section from "@/components/home/Section";
import OrderCarousel from "@/components/profile/OrderCarousel";
import {fetchUrl} from "@/lib/fetchUrl";
import {PastOrderRawSchema, PastOrderSchema, ProductOrderSchema, StoreSchema} from "@/constants/schemas";

export default function ProfileScreen() {
    const {userId} = useAuthContext();
    const router = useRouter();
    const [pastOrdersRaw, setPastOrdersRaw] = useState<PastOrderRawSchema[]>([]);
    const [pastOrders, setPastOrders] = useState<PastOrderSchema[]>([]);
    const navigation = useNavigation();

    const fetchOrdersRaw = async () => {
        try {
            const {error, data} = await fetchUrl({
                endPoint: `api/order?accountId=${userId}`,
                method: 'GET',
            });

            if (data) {

                const orders = data.map((item: any) => {
                    const total = item.products.reduce((total: number, item: ProductOrderSchema) => total + (item.price * item.quantity), 0);

                    return (
                        {
                            id: item._id,
                            storeId: item.storeId,
                            total: total,
                            products: item.products,
                        }
                    )
                });

                setPastOrdersRaw(orders);
            }

        } catch (error) {
        }
    };

    useEffect(() => {
        return navigation.addListener('focus', () => {
            fetchOrdersRaw();
        });
    }, [navigation]);

    useEffect(() => {
        if (!userId) {
            router.replace('/login');
        }
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        fetchOrdersRaw();
    }, [userId]);

    useEffect(() => {
        if (!pastOrdersRaw) return;

        const fetchOrders = async () => {
            try {
                const {error, data} = await fetchUrl({
                    endPoint: `api/store?cityName=`,
                    method: 'GET',
                });

                const orders = pastOrdersRaw.map((item: PastOrderRawSchema) => {
                    const store = data.find((store: StoreSchema) => store.storeId == item.storeId);

                    return (
                        {
                            id: item.id,
                            storeName: store.storeName,
                            storeImgPath: store.imagePath,
                            total: item.total,
                        }
                    )
                });

                setPastOrders(orders);
            } catch (error) {
            }
        };

        fetchOrders();
    }, [pastOrdersRaw]);

    return (
        <View>
            <ProfileHeader/>
            <Section label={'My orders'} style={{height: '65%'}}>
                <OrderCarousel data={pastOrders}/>
            </Section>
        </View>

    )
}
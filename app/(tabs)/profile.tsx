import {View} from "react-native";
import {useRouter} from "expo-router";
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

    useEffect(() => {
        if (!userId) {
            router.replace('/login');
        }
    }, [userId]);

    useEffect(() => {
        if (!userId) return;

        const fetchOrdersRaw = async () => {
            try {
                const {error, data} = await fetchUrl({
                    endPoint: `api/order?accountId=${userId}`,
                    method: 'GET',
                });

                if (data) {
                    const orders = data.map((item: any) => {
                        const total = data.products.reduce((total: number, item: ProductOrderSchema) => total + (item.price * item.quantity), 0);

                        return (
                            {
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
                    const store = data.find((store: StoreSchema) => store.storeId === item.storeId);
                    const id = String(item.storeName + item.total + item.products);

                    return (
                        {
                            id: id,
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

    const dummyValues = [
        {id: '1', storeName: 'Pollo bravoss', total: 25000, storeImgPath: '/api/store/images/polloBravos.jpeg'},
        {id: '2', storeName: 'Pollo bravoss', total: 25000, storeImgPath: '/api/store/images/polloBravos.jpeg'},
        {id: '3', storeName: 'Pollo bravoss', total: 25000, storeImgPath: '/api/store/images/polloBravos.jpeg'},
        {id: '4', storeName: 'Pollo bravoss', total: 25000, storeImgPath: '/api/store/images/polloBravos.jpeg'},
        {id: '5', storeName: 'Pollo bravoss', total: 25000, storeImgPath: '/api/store/images/polloBravos.jpeg'},
        {id: '6', storeName: 'Pollo bravoss', total: 25000, storeImgPath: '/api/store/images/polloBravos.jpeg'},
    ]

    return (
        <View>
            <ProfileHeader/>
            <Section label={'My orders'} style={{height: '65%'}}>
                <OrderCarousel data={dummyValues}/>
            </Section>
        </View>

    )
}
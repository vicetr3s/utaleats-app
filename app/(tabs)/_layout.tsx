import {Tabs} from 'expo-router';
import TabBar from '@/components/TabBar';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={
                {
                    headerShown: false,
                }
            }
            tabBar={(props) => <TabBar {...props} />}
        >
            <Tabs.Screen name="profile" options={{
                title: 'Profile',
            }}/>
            <Tabs.Screen name="index"
                         options={{
                             title: 'Home',
                         }}
            />

        </Tabs>
    );
}


import * as SecureStore from 'expo-secure-store';

export async function saveUserId(id: string) {
    try {
        await SecureStore.setItemAsync('id', id);

    } catch (error) {
        console.log(error);
    }
}

export async function getUserId() {
    try {
        return SecureStore.getItemAsync('id');
    } catch (error) {
        console.log(error);
    }
}

export async function deleteUserId() {
    try {
        await SecureStore.deleteItemAsync('id');
    } catch (error) {
        console.log(error);
    }
}
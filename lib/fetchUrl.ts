import {Platform} from "react-native";

type props = {
    endPoint: string,
    method: 'GET' | 'POST';
    body?: any;
}

type fetchUrl = {
    error: boolean;
    errorMsg: string;
    data: any;
}

export async function fetchUrl({endPoint, body, method}: props): Promise<fetchUrl> {
    const BASE_URL = Platform.select({
        ios: 'http://localhost/api/',
        android: 'http://10.0.2.2/api/',
        default: 'http://localhost/api/',
    });

    try {
        let response;

        switch (method) {
            case 'POST':
                response = await fetch(BASE_URL + endPoint, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: body
                });
                break;
            case 'GET':
                response = await fetch(BASE_URL + endPoint, {
                    method: method,
                    headers: {
                        'Accept': 'application/json',
                    }
                });
                break;

        }

        if (!response.ok) {
            return {error: true, errorMsg: 'Something happened', data: null};
        }

        const json = await response.json();

        return {error: false, errorMsg: '', data: json};
    } catch (error) {
        return {error: true, errorMsg: 'Something happened', data: null};
    }
}
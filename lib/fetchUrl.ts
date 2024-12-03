import {getPlatformUrl} from "@/lib/getPlatformUrl";

type props = {
    endPoint: string,
    method: 'GET' | 'POST';
    body?: any;
}

type fetchUrl = {
    error: boolean;
    data: any;
}

export async function fetchUrl({endPoint, body, method}: props): Promise<fetchUrl> {
    const BASE_URL = getPlatformUrl();

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
            return {error: true, data: null};
        }

        const json = await response.json();

        return {error: false, data: json};
    } catch (error) {
        return {error: true, data: null};
    }
}
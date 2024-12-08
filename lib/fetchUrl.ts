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
                    body: JSON.stringify(body),
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
            const contentType = response.headers.get('Content-Type') || '';
            const errorMessage = contentType.includes('application/json')
                ? (await response.json()).message || JSON.stringify(await response.json())
                : await response.text();

            return {error: true, data: errorMessage};
        }

        const contentType = response.headers.get('Content-Type') || '';
        const data = contentType.includes('application/json')
            ? await response.json()
            : await response.text();

        return {error: false, data};
    } catch (error) {
        return {error: true, data: 'Unexpected error occurred'};
    }
}
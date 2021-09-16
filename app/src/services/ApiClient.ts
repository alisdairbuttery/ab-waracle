
import axios, { AxiosRequestConfig, Method } from 'axios';

export type ApiResponseBase = {
    status: number;
    data: any;
}

export interface IApiClient {
    request({path, method, headers, body, query}: {path: string; method: string; headers?: any; body?: any; query?: any;}) : Promise<ApiResponseBase>;
}

export default class ApiClient implements IApiClient {
    async request({
        path,
        method,
        headers,
        body,
        query,
    }: {
        path: string;
        method: Method;
        headers?: any;
        body?: any;
        query?: any;
    }) : Promise<ApiResponseBase> {

        if(!path) {
            throw Error('API path not provided');
        }

        
        const config: AxiosRequestConfig = {
            method: method,
            url: path,
            data: body,
            headers: {
                'Accept': 'application/json',
                ...headers,
            },
            params: query,
        };

        const result = axios(config);

        let apiResponse;
        try {
            apiResponse = await result.then((res) => {
                return res;
            });
        } catch(err) {
            throw Error('Error converting API response to JSON');
        }

        return apiResponse;
    }
}
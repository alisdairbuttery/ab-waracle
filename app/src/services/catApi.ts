import { FavouriteImageResponse, ImageVote, SingleCatImageVoteResponse } from "../models";
import { SingleCatResponse } from "../models/response/singleCatResponse";
import ApiClient, { IApiClient } from "./ApiClient";

export class CatApiClient{
    private apiClient: IApiClient;
    private API_TOKEN: string;

    constructor(client: ApiClient){
        this.apiClient = client;

        if(!process.env.REACT_APP_CAT_API_KEY) {
            throw Error("Unable to retrieve Cat API key from environment variables")
        }
        this.API_TOKEN = process.env.REACT_APP_CAT_API_KEY;
    }

    public async uploadCatImage(imageData: FormData): Promise<boolean> {
        let res = await this.apiClient.request({
            path: 'https://api.thecatapi.com/v1/images/upload',
            method: 'POST',
            body: imageData,
            headers: {
                'x-api-key': this.API_TOKEN,
                'Content-Type': 'multipart/form-data',
            },
        });

        if(res.status === 201) {
            return true;
        }

        return false;
    }

    public async listMyCats(): Promise<SingleCatResponse[]> {
        let res =  await this.apiClient.request({
            path: 'https://api.thecatapi.com/v1/images',
            method: 'GET',
            headers: {
                'x-api-key': this.API_TOKEN,
            },
            query: {
                limit: 100,
            }
        });

        if(res.status === 200) {
            return res.data as SingleCatResponse[];
        }

        return [] as SingleCatResponse[];
    }

    public async saveFavourite(id: string): Promise<FavouriteImageResponse> {
        let res =  await this.apiClient.request({
            path: 'https://api.thecatapi.com/v1/favourites',
            method: 'POST',
            headers: {
                'x-api-key': this.API_TOKEN,
            },
            body: {
                "image_id": id,
            },
        });

        if(res.status === 200) {
            return res.data as FavouriteImageResponse;
        } else {
            throw Error("Unable to save favourite image")
        }
    }

    public async removeFavourite(id: string): Promise<FavouriteImageResponse> {
        let res =  await this.apiClient.request({
            path: 'https://api.thecatapi.com/v1/favourites',
            method: 'DELETE',
            headers: {
                'x-api-key': this.API_TOKEN,
            },
            body: {
                "favourite_id": id,
            },
        });

        if(res.status === 200) {
            return res.data as FavouriteImageResponse;
        } else {
            throw Error("Unable to save favourite image")
        }
    }

    public async voteImage(imageId: string, vote: ImageVote): Promise<boolean> {
        let res =  await this.apiClient.request({
            path: 'https://api.thecatapi.com/v1/votes',
            method: 'POST',
            headers: {
                'x-api-key': this.API_TOKEN,
            },
            body: {
                "image_id": imageId,
                "value": vote
            },
        });

        if(res.status === 200) {
            return true;
        } else {
            throw Error("Unable to vote on given image")
        } 
    }

    public async getAllImageVotes(): Promise<SingleCatImageVoteResponse[]> {
        let res =  await this.apiClient.request({
            path: 'https://api.thecatapi.com/v1/votes',
            method: 'GET',
            headers: {
                'x-api-key': this.API_TOKEN,
            }
        });

        if(res.status === 200) {
            return res.data as SingleCatImageVoteResponse[];
        }

        return [] as SingleCatImageVoteResponse[];
    }
}
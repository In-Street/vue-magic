import type { AxiosResponse } from "axios";

export interface AxiosResult extends AxiosResponse<UserResult> { }

export interface UserResult {
    info: {
        page: number,
        results: number
    }
    results: UserInfo[]
}

export interface UserInfo {
    name: {
        first: string,
        last: string
    },
    location: {
        country: string
    },
    picture: {
        medium: string
    }
}

export interface AxiosStringResult extends AxiosResponse{
    code:number,
    msg:string
}
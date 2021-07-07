import { Result } from "../entity/result.entity";

export interface FetchResultResponse {
    status: number;
    message: string
    data: Result
}

export interface FetchResultListResponse {
    status: number;
    message: string
    data: Result[]
}

export interface CreateResultBody {
    stageId: string;
    value: number;
}

export interface UpdateResultBody {
    id: string;
    stageId: string;
    value: number;
}

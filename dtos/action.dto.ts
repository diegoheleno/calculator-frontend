import { Action } from "../entity/action.entity";

export interface FetchActionResponse {
    status: number;
    message: string
    data: Action
}

export interface FetchActionListResponse {
    status: number;
    message: string
    data: Action[]
}

export interface CreateActionBody {
    operationId: string;
    resultId: string;
}

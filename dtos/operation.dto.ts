import { Operation } from "../entity/operation.entity";

export interface FetchOperationResponse {
    status: number;
    message: string
    data: Operation
}

export interface FetchOperationListResponse {
    status: number;
    message: string
    data: Operation[]
}

export interface CreateOperationBody {
    stageId: string;
    type: number;
    value: number;
}

export interface UpdateOperationBody {
    id: string;
    stageId?: string;
    type?: number;
    value?: number;
}
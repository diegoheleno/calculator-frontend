import { Result } from "../entity/result.entity";
import { Operation } from "../entity/operation.entity";

export interface ResultDto extends Result {
    operations: Operation[]
}

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

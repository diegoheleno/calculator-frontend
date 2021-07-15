import { ResultDto } from "./result.dto";
import { Stage, StageNullable } from "../entity/stage.entity";
import { Operation } from "../entity/operation.entity";

export interface StageDto extends Stage {
    results: ResultDto[]
    operations: Operation[]
}

export interface StageDtoNullable extends StageNullable {
    results?: ResultDto[]
    operations?: Operation[]
}

export interface FetchStageResponse {
    status: number;
    message: string
    data: StageDto
}

export interface CreateStageBody {
    level: number;
    start: number;
    end: number;
    moves: number;
    state: number;
}

export interface UpdateStageBody {
    id: string;
    level?: number;
    start?: number;
    end?: number;
    moves?: number;
    state?: number;
}
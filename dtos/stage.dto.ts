import { Stage } from "../entity/stage.entity";

export interface FetchStageResponse {
    status: number;
    message: string
    data: Stage
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
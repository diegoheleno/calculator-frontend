export interface Stage {
    id: string;
    level: number
    start: number;
    end: number;
    moves: number;
    state: number;
}

export interface StageNullable {
    id?: string;
    level?: number
    start?: number;
    end?: number;
    moves?: number;
    state?: number;
}

export const defaultStage: Stage = {
    id: '',
    level: 1,
    start: 0,
    end: 0,
    moves: 1,
    state: 1,
}
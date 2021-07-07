export interface Result {
    id: string;
    stageId: string;
    value: number;
}

export const defaultResult: Result = {
    id: '',
    stageId: '',
    value: 0
}
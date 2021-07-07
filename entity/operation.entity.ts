export interface Operation {
    id: string;
    stageId: string;
    type: number;
    value: number;
}

export const defaultOperation: Operation = {
    id: '',
    stageId: '',
    type: 0,
    value: 0,
}
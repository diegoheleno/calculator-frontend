export interface Action {
    id: string;
    operationId: string;
    resultId: string;
    order: number;
}

export const defaultAction: Action = {
    id: '',
    operationId: '',
    resultId: '',
    order: 0,
} 
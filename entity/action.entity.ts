export interface Action {
    id: string;
    operationId: string;
    resultId: string;
}

export const defaultAction: Action = {
    id: '',
    operationId: '',
    resultId: '',
} 
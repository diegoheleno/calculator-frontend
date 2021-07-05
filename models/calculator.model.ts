import { CalculatorDto } from "../dtos/calculator.dto";
import { defaultStage, Stage } from "../entity/stage.entity";


export interface CalculatorState extends CalculatorDto {}

export interface CalculatorModel {
    namespace: string;
    state: CalculatorState;
    reducers: {
        save: (state: CalculatorState, body: { payload: CalculatorState }) => CalculatorState;
    }
}

const model: CalculatorModel = {
    namespace: 'CalculatorModel',
    state: {
        ...defaultStage,
        operations: [],
        results: []
    },
    reducers: {
        save(state, { payload }) {
            return { ...state, ...payload }
        },
    },
};

export default model;

export const injectCalculatorModel = (dispatch: any) => {
    return {
        save: (stage: Stage) => {
            dispatch({
                type: 'save',
                payload: stage,
            });
        }
    }
}
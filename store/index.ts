import { createStore } from 'redux'
import { StageDto, StageDtoNullable } from '../dtos/stage.dto';
import { Operation } from '../entity/operation.entity';
import { Result } from '../entity/result.entity';
import { defaultStage, StageNullable } from '../entity/stage.entity';

const initialState: StageDto = { ...defaultStage, operations: [], results: [] }

function reducer(state = initialState, action: any) {
    return { ...state, ...action.payload }
}

export function createReducers(dispatch: any) {
    return {
        saveStage: (stage: StageNullable) => {
            dispatch({
                type: 'SAVE_STAGE',
                payload: stage
            })
        },
        saveOperation: (operations: Operation[]) => {
            dispatch({
                type: 'SAVE_OPERATIONS',
                payload: { operations }
            })
        },
        saveResult: (results: Result[]) => {
            dispatch({
                type: 'SAVE_RESULTS',
                payload: { results }
            })
        },
    }
}

const store = createStore(reducer);

export default store
import { StageDto } from "../../dtos/stage.dto";
import OperationType from "../../entity/type.enum";
import { Action } from "../../entity/action.entity";
import { Result } from "../../entity/result.entity";
import { Operation } from "../../entity/operation.entity";

export class StageCalculate {

    constructor(
        public readonly stage: StageDto,
        public readonly indexes: number[],
    ) { }

    calculateNext(result: Result) {
        const operations: Operation[] = this.indexes.map(index => this.stage.operations[index])
        const actions: Action[] = operations.map(operation => ({ id: '', operationId: operation.id, resultId: result.id }))
        result.value = this.calculate(operations);
        return { result, actions }
    }

    private calculate(operations: Operation[]): number {
        let value = this.stage.start;

        operations.map(operation => {
            switch(operation.type) {
                case OperationType.Addition:
                    value += operation.value;
                    break;
                
                case OperationType.Subtraction:
                    value -= operation.value;
                    break;
                
                case OperationType.Multiplication:
                    value *= operation.value;
                    break;
                
                case OperationType.Division:
                    if (!operation.value) return NaN
                    value /= operation.value;
                    break;
                    
                case OperationType.Insert:
                    value *= 10;
                    value += operation.value;
                    break;
                
                case OperationType.Remove:
                    value -= value % 10;
                    value /= 10;
                    break;
            }
        })

        return value;
    }
}
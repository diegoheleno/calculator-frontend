import { Stage } from "../../entity/stage.entity";
import { Operation } from "../../entity/operation.entity";
import { Action } from "../../entity/action.entity";
import { Result } from "../../entity/result.entity";
import OperationType from "../../entity/type.enum";

export class StageCalculate {
    
    private size: number;
    private indexes: number [];
    public posibilities: number;

    public finished: boolean;

    constructor(
        public readonly stage: Stage,
        public readonly operations: Operation[],
    ) {
        this.size = operations.length
        this.finished = false;
        this.indexes = [ ...Array(stage.moves).fill(0) ];
        this.posibilities = this.size ** stage.moves;
    }

    calculateNext(result: Result) {
        const operations: Operation[] = this.indexes.map(index => this.operations[index])
        const actions: Action[] = operations.map(operation => ({ id: '', operationId: operation.id, resultId: result.id }))
        result.value = this.calculate(operations);
        this.next();
        return { result, actions }
    }

    private calculate(operations: Operation[]): number {
        const { start, end } = this.stage
        let value = start;

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

    private next() {
        for (let i = 0; i < this.stage.moves; i++) {
            this.indexes[i]++;

            if (this.indexes[i] < this.size)
                return;
            
            this.indexes[i] = 0;
        }

        this.finished = true;
    }
}
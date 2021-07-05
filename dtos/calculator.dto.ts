import { Operation } from "../entity/operation.entity";
import { Result } from "../entity/result.entity";
import { Stage } from "../entity/stage.entity";

export interface CalculatorDto extends Stage {
    operations: Operation[]
    results: Result[]
}
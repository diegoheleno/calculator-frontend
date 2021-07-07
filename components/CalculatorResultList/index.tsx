import styles from './calculator-result.module.css'
import { Stage } from '../../entity/stage.entity'
import { StageCalculate } from '../../pages/stage/stage.calculate'
import { Operation } from '../../entity/operation.entity'
import services from '../../services'
import React, { useState } from 'react'
import { Result } from '../../entity/result.entity'
import { Action } from '../../entity/action.entity'
import CalculatorButton from '../CalculatorButton'

interface CalculatorOperationListProps {
    stage: Stage;
    operations: Operation[]
}

interface ResultDto extends Result {
    actions: Action[]
}

const CalculatorOperationList: React.FunctionComponent<CalculatorOperationListProps> = props => {
    const { stage, operations } = props
    const calculator = new StageCalculate(stage, operations)

    const [loading, setLoading] = useState<boolean>(false)
    const [results, setResults] = useState<ResultDto[]>([])
    const [corrects, setCorrects] = useState<ResultDto[]>([])
    const [progress, setProgress] = useState<number>(0)

    const saveResult = (result: Result) => {
        const { id, stageId, value } = result
        return services.result.updateResult({ id, stageId, value })
    }

    const saveActions = (actions: Action[]) => {
        return services.action.createAction(
            actions.map(({ operationId, resultId }) => ({ operationId, resultId }))
        )
    }

    const execute = async () => {
        const newResult = await services.result.createResult({ stageId: stage.id, value: 0 })
        const { actions, result } = calculator.calculateNext(newResult);

        const promises: Promise<any>[] = [ saveResult(result), saveActions(actions) ]

        if (result.value == stage.end) {
            corrects.unshift({ ...result, actions })
            setCorrects(corrects)
        } else {
            results.unshift({ ...result, actions })
            setResults(results)
        }

        await Promise.all(promises)
        setProgress(progress + 1)
    }

    const clickHandler = async () => {
        setLoading(true)

        // while (!calculator.finished)
            await execute()

        setLoading(false)
    }

    return <div style={{ width: '100%', padding: '10px', marginTop: '40px' }}>

        <div style={{ display: 'flex', width: '100%', padding: '10px' }}>
            <CalculatorButton text="Calculate" onClickHandler={clickHandler} />

            <div style={{ width: '50%', padding: '10px' }}>
                <progress
                    id="file"
                    value={progress}
                    style={{ width: '100%', height: '100%' }}
                    max={calculator.posibilities}
                    children={progress / calculator.posibilities}
                />
            </div>
        </div>

        <div style={{ display: 'flex', width: '100%', padding: '10px' }}>
            <div style={{ width: '50%', padding: '10px' }}>
                <label className={styles.label} children="results" />

            </div>

            <div style={{ width: '50%', padding: '10px' }}>
                <label className={styles.label} children="corrects" />

            </div>
        </div>
    </div>
}

export default CalculatorOperationList
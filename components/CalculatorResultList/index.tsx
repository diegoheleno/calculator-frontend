import services from '../../services'
import React, { useEffect, useState } from 'react'
import { Stage } from '../../entity/stage.entity'
import CalculatorButton from '../CalculatorButton'
import CalculatorResult from '../CalculatorResult'
import styles from './calculator-result.module.css'
import { Result } from '../../entity/result.entity'
import { Action } from '../../entity/action.entity'
import { StageCalculate } from '../../pages/stage/stage.calculate'
import { defaultOperation, Operation } from '../../entity/operation.entity'

interface CalculatorOperationListProps {
    stage: Stage;
    operations: Operation[]
}

interface ResultDto extends Result {
    operations: Operation[]
}

const CalculatorOperationList: React.FunctionComponent<CalculatorOperationListProps> = props => {
    const { stage, operations } = props

    const [indexes, setIndexes] = useState<number[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [results, setResults] = useState<ResultDto[]>([])
    const [corrects, setCorrects] = useState<ResultDto[]>([])
    const [progress, setProgress] = useState<number>(0)
    const [possibilities, setPossibilities] = useState<number>(0)
    const calculator = new StageCalculate(stage, operations, indexes)

    useEffect(() => {
        if (stage.id) {
            services.result.fetchResultByStage(stage.id).then(async results => {
                if (!results || !results.length) {
                    setCorrects([])
                    setResults([])
                    return
                }

                const promises = results.map(result => services.action.fetchActionByResult(result.id))
                const actions = await Promise.all(promises)

                const dtos: ResultDto[] = results.map((result, index) => ({
                    ...result,
                    operations: actions[index].map(action => props.operations.find(operation => operation.id == action.operationId) ?? defaultOperation)
                }))

                setCorrects(dtos.filter(dto => dto.value == stage.end))
                setResults(dtos.filter(dto => dto.value != stage.end))
            })
        } else {
            setCorrects([])
            setResults([])
        }
    }, [stage.id])

    useEffect(() => {
        setProgress(0)
        setPossibilities(stage.moves ** operations.length)
        setIndexes(Array(stage.moves).fill(0))
    }, [stage.moves, operations.length])

    useEffect(() => {
        if (progress > 0 && progress < possibilities)
            execute();
    }, [progress])

    const saveResult = (result: Result) => {
        const { id, stageId, value } = result
        return services.result.updateResult({ id, stageId, value })
    }

    const saveActions = (actions: Action[]) => {
        return services.action.createAction(
            actions.map(({ operationId, resultId }) => ({ operationId, resultId }))
        )
    }

    const nextIndex = () => {
        for (let i = 0; i < indexes.length; i++) {
            indexes[i]++;

            if (indexes[i] < operations.length)
                return setIndexes(indexes);

            indexes[i] = 0;
        }
    }

    const execute = async () => {
        const newResult = await services.result.createResult({ stageId: stage.id, value: 0 })
        const { actions, result } = calculator.calculateNext(newResult);

        const promises: Promise<any>[] = [saveResult(result), saveActions(actions)]

        const operations: Operation[] = actions
            .map(action => props.operations.find(operation => action.operationId == operation.id))
            .map(operation => operation ?? defaultOperation)

        if (result.value == stage.end) {
            corrects.unshift({ ...result, operations })
            setCorrects(corrects)
        } else {
            results.unshift({ ...result, operations })
            setResults(results)
        }
        nextIndex();
        await Promise.all(promises)
        setProgress(progress + 1)
    }

    const clickHandler = async () => {
        await execute()
    }

    return <div style={{ width: '100%', padding: '10px', marginTop: '40px' }}>

        <div style={{ display: 'flex', width: '100%', padding: '10px' }}>
            <CalculatorButton text="Calculate" onClickHandler={clickHandler} />

            <div style={{ width: '50%', padding: '10px' }}>
                <progress
                    id="file"
                    value={progress}
                    style={{ width: '100%', height: '100%' }}
                    max={possibilities}
                    children={(progress / possibilities) * 100}
                />
            </div>
        </div>

        <div style={{ display: 'flex', width: '100%', padding: '10px' }}>
            <div style={{ width: '50%', padding: '10px' }}>
                <label className={styles.label} children="results" />
                <CalculatorResult color='#eb5a46' results={results} />
            </div>

            <div style={{ width: '50%', padding: '10px' }}>
                <label className={styles.label} children="corrects" />
                <CalculatorResult color='#61bd4f' results={corrects} />
            </div>
        </div>
    </div>
}

export default CalculatorOperationList
import services from '../../services'
import React, { useEffect, useState } from 'react'
import CalculatorButton from '../CalculatorButton'
import CalculatorResult from '../CalculatorResult'
import styles from './calculator-result.module.css'
import { Result } from '../../entity/result.entity'
import { Action } from '../../entity/action.entity'
import { StageCalculate } from '../../pages/stage/stage.calculate'
import { defaultOperation, Operation } from '../../entity/operation.entity'
import { StageDto } from '../../dtos/stage.dto'
import { ResultDto } from '../../dtos/result.dto'
import { createReducers } from '../../store'
import { connect } from 'react-redux'

interface CalculatorResultListProps {
    stage: StageDto;
    dispatch: any;
}

const CalculatorResultList: React.FunctionComponent<CalculatorResultListProps> = (props: CalculatorResultListProps) => {
    const { stage } = props
    const state = createReducers(props.dispatch)

    const [indexes, setIndexes] = useState<number[]>([])
    const [results, setResults] = useState<ResultDto[]>([])
    const [corrects, setCorrects] = useState<ResultDto[]>([])
    const [progress, setProgress] = useState<number>(0)
    const [possibilities, setPossibilities] = useState<number>(0)

    const calculator = new StageCalculate(stage, indexes)

    useEffect(() => {
        if (stage.results && stage.results.length) {
            const _corrects = stage.results.filter(result => result.value == stage.end)
            const _results = stage.results.filter(result => result.value != stage.end)

            setCorrects(_corrects);
            setResults(_results);
        } else {
            setCorrects([])
            setResults([])
        }
    }, [stage.results])

    useEffect(() => {
        setProgress(stage.results.length ?? 0)
        setPossibilities(stage.operations.length ** stage.moves)
        setIndexes(Array(stage.moves).fill(0))
    }, [stage.moves, stage.operations.length, stage.results.length])

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

            if (indexes[i] < stage.operations.length)
                return setIndexes(indexes);

            indexes[i] = 0;
        }
    }

    const execute = async () => {
        const newResult = await services.result.createResult({ stageId: stage.id, value: 0 })
        const { actions, result } = calculator.calculateNext(newResult);

        const promises: Promise<any>[] = [
            saveResult(result),
            saveActions(actions)
        ]

        const operations: Operation[] = actions
            .map(action => props.stage.operations.find(operation => action.operationId == operation.id))
            .map(operation => operation ?? defaultOperation)

        if (result.value == stage.end) {
            corrects.unshift({ ...result, operations })
            setCorrects(corrects)
        } else {
            if (results.length >= 20)
                results.pop();
                
            results.unshift({ ...result, operations })
            setResults(results)
        }
        nextIndex();
        setProgress(progress + 1)

        await Promise.all(promises)
    }

    const clickCalculateHandler = async () => {
        await execute()
    }

    const clickClearHandler = async () => {
        await services.stage.clear(stage.id);
        const _stage = await services.stage.fetchStageByLevel(stage.level);
        state.saveStage({ ..._stage })
    }

    return <div style={{ width: '100%', marginTop: '40px' }}>

        <div style={{ display: 'flex', width: '100%' }}>
            <CalculatorButton text="Calculate" onClickHandler={clickCalculateHandler} />
            <CalculatorButton text="Clear" onClickHandler={clickClearHandler} />
        </div>

        
        <div style={{ width: '100%', padding: '10px', height: '50px' }}>
                
            <progress
                value={progress}
                style={{ width: '100%', height: '100%' }}
                max={possibilities}
            />

            <div
                style={{ display: 'flex', justifyContent: 'flex-end' }}
                children={
                    <label children={`${progress} of ${possibilities} - ${Math.floor(possibilities ? (progress / possibilities) * 100: 0)}%`} />
                }
            />
        </div>

        <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ width: '50%', padding: '10px' }}>
                <label className={styles.label} children="results" />
                <CalculatorResult color='#eb5a46' results={results} start={stage.start} />
            </div>

            <div style={{ width: '50%', padding: '10px' }}>
                <label className={styles.label} children="corrects" />
                <CalculatorResult color='#61bd4f' results={corrects} start={stage.start} />
            </div>
        </div>
    </div>
}

export default connect((store: any) => ({ stage: store }))(CalculatorResultList);
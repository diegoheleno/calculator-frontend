import styles from '../../styles/Stage.module.css'
import React, { useEffect, useState } from 'react'
import { Result } from '../../entity/result.entity'
import service from '../../services/calculator.service'
import { Operation } from '../../entity/operation.entity'
import { defaultStage, Stage, StageNullable } from '../../entity/stage.entity'
import CalculatorInput from '../../components/CalculatorInput'
import { CreateStageBody, UpdateStageBody } from '../../dtos/stage.dto'
import CalculatorButton from '../../components/CalculatorButton'
import { message } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';

interface Loadings {
    stage: boolean
}

const StageComponent: React.FunctionComponent = () => {
    const [ results, setResults ] = useState<Result[]>()
    const [ mode, setMode ] = useState<"new"|"edit">("edit");
    const [ operations, setOperations ] = useState<Operation[]>([])
    const [ loadings, setLoadings ] = useState<Loadings>({ stage: false })
    const [ stage, setStage ] = useState<Stage>({ ...defaultStage, level: 1 })
    
    const createStage = async () => {
        const { end, level, moves, start }: CreateStageBody = stage

        if ((end || end == 0) && level && moves && (start || start == 0))
            setStage(await service.createStage({ end, level, moves, start, state: 1 }))
        else
            message.error('Parametros inválidos')
    }
    
    const updateStage = async () => {
        const { id, end, level, moves, start, state }: UpdateStageBody = stage
        setStage(await service.updateStage({ id, end, level, moves, start, state }))
    }

    const getStageByLevel = async (id: number) => {
        setStage(await service.fetchStageByLevel(id))
    }

    const saveStage = (payload: StageNullable) => {
        setStage({ ...stage, ...payload })
    }

    useEffect(() => console.log(loadings.stage), [loadings.stage]);
    useEffect(() => { setMode(stage.id ? 'edit' : 'new') }, [stage.id]);
    useEffect(() => { 
        setLoadings({ stage: true })
        saveStage({ id: undefined })
        getStageByLevel(stage.level).finally(() => setTimeout(() => setLoadings({ stage: false }), 2000) )
     }, [stage.level]);

    return (
        <div className={styles.main}>
            <div className={styles.body}>
                <h1 style={{ margin: '10px' }} children={<>Stage {loadings.stage ? <LoadingOutlined /> : `${stage?.level}` } </> } />
                <div style={{ display: 'flex' }}>
                    <CalculatorInput
                        min={1}
                        name="level"
                        value={stage.level}
                        setValue={(level: number) => saveStage({ level })}
                    />
                    <CalculatorInput
                        name="start"
                        value={stage.start}
                        setValue={(start: number) => saveStage({ start })}
                    />
                    <CalculatorInput
                        name="end"
                        value={stage.end}
                        setValue={(end: number) => saveStage({ end })}
                    />
                    <CalculatorInput
                        min={1}
                        name="moves"
                        value={stage.moves}
                        setValue={(moves: number) => saveStage({ moves })}
                    />
                </div>

                <div style={{ display: 'flex' }}>
                    <CalculatorButton text="Salvar" onClickHandler={mode == "new" ? createStage : updateStage} />
                    <CalculatorButton text="Novo" onClickHandler={createStage} />
                </div>

                <div style={{ display: 'flex' }}>
                    <CalculatorInput name="operation" value={1} setValue={() => {}} />
                    <CalculatorInput name="value" value={1} setValue={() => {}} />
                </div>

                <div style={{ display: 'flex' }}>
                    <CalculatorButton text="Adicionar" onClickHandler={mode == "new" ? createStage : updateStage} />
                    <CalculatorButton text="Calcular" onClickHandler={createStage} />
                </div>

                <div style={{ display: 'flex' }}>
                    <div style={{ width: '50%', padding: '10px' }}>Results</div>
                    <div style={{ width: '50%', padding: '10px' }}>Corrects</div>
                </div>
            </div>
        </div>
    );
}

export default StageComponent;

import { message } from 'antd'
import services from '../../services'
import styles from '../../styles/Stage.module.css'
import React, { useEffect, useState } from 'react'
import OperationType from '../../entity/type.enum';
import { LoadingOutlined } from '@ant-design/icons';
import CalculatorInput from '../../components/CalculatorInput'
import { CreateOperationBody } from '../../dtos/operation.dto';
import CalculatorButton from '../../components/CalculatorButton'
import CalculatorResultList from '../../components/CalculatorResultList'
import { defaultStage, Stage, StageNullable } from '../../entity/stage.entity'
import CalculatorOperationList from '../../components/CalculatorOperationList';
import { CreateStageBody, StageDto, UpdateStageBody } from '../../dtos/stage.dto'
import CalculatorOperationSelection from '../../components/CalculatorOperationSelection';

const StageComponent: React.FunctionComponent = () => {

    const [ stage, setStage ] = useState<StageDto>({ ...defaultStage, level: 1, state: 0, operations: [], results: [] })
    
    const [ mode, setMode ] = useState<"new"|"edit">("edit");
    const [ operationType, setOperationType ] = useState<OperationType>(0);
    const [ operationValue, setOperationValue ] = useState<number>(0);

    const [ stageLoading, setStageLoading ] = useState<boolean>(false);
    
    const createStage = async () => {
        const { end, level, moves, start }: CreateStageBody = stage

        if ((end || end == 0) && level && moves && (start || start == 0)) {
            const _stage = await services.stage.createStage({ end, level, moves, start, state: 1 })
            setStage({ ...stage, ..._stage })
        }
        else
            message.error('Parametros inválidos')
    }
    
    const updateStage = async () => {
        const { id, end, level, moves, start, state }: UpdateStageBody = stage
        const _stage = await services.stage.updateStage({ id, end, level, moves, start, state })
        setStage({ ...stage, ..._stage })
    }

    const fetchStageByLevel = async (id: number) => {
        setStage(await services.stage.fetchStageByLevel(id))
    }

    const saveStage = (payload: StageNullable) => {
        setStage({ ...stage, ...payload })
    }

    const addOperation = async () => {
        const newOperation: CreateOperationBody = {
            stageId: stage.id,
            type: operationType,
            value: operationValue,
        }

        const savedOperation = await services.operation.createOperation(newOperation);
        
        setStage({ ...stage, operations: [ ...stage.operations, savedOperation ] })
    }

    useEffect(() => stage.id ? setMode('edit') : setMode('new'), [stage.id]);

    useEffect(() => { 
        setStageLoading(true)
        saveStage({ id: undefined })
        fetchStageByLevel(stage.level).finally(() => setTimeout(() => setStageLoading(false), 2000) )
     }, [stage.level]);

    return (
        <div className={styles.main}>
            <div className={styles.body}>
                <h1 style={{ margin: '10px' }} children={<>Stage {stageLoading ? <LoadingOutlined /> : `${stage?.level}` } </> } />
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
                    <CalculatorButton text="Save" onClickHandler={mode == "new" ? createStage : updateStage} />
                    <CalculatorButton text="New" onClickHandler={() => {}} />
                </div>
                
                <div style={{ display: 'flex' }}>
                    <CalculatorOperationList operations={stage.operations} />
                </div>

                <div style={{ display: 'flex' }}>
                    <CalculatorOperationSelection value={operationType} setValue={setOperationType} />
                    <CalculatorInput name="value" value={operationValue} setValue={setOperationValue} />
                    <CalculatorButton text="Add" onClickHandler={addOperation} margin />
                </div>

                <CalculatorResultList stage={stage} setStage={setStage} />
            </div>
        </div>
    );
}

export default StageComponent;

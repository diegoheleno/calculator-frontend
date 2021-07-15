import { message } from 'antd'
import services from '../../services'
import styles from '../../styles/Stage.module.css'
import React, { useEffect, useState } from 'react'
import OperationType from '../../entity/type.enum';
import { LoadingOutlined } from '@ant-design/icons';
import CalculatorInput from '../CalculatorInput'
import { CreateOperationBody } from '../../dtos/operation.dto';
import CalculatorButton from '../CalculatorButton'
import CalculatorResultList from '../CalculatorResultList'
import CalculatorOperationList from '../CalculatorOperationList';
import { CreateStageBody, StageDto, StageDtoNullable, UpdateStageBody } from '../../dtos/stage.dto'
import CalculatorOperationSelection from '../CalculatorOperationSelection';
import { connect } from 'react-redux'
import { createReducers } from '../../store';

interface StageComponentProps {
    stage: StageDto
    dispatch: any
} 

const StageComponent: React.FunctionComponent<StageComponentProps> = (props: StageComponentProps) => {

    const { stage } = props
    const stateHandler = createReducers(props.dispatch)

    const [ mode, setMode ] = useState<"new"|"edit">("edit");
    const [ operationType, setOperationType ] = useState<OperationType>(0);
    const [ operationValue, setOperationValue ] = useState<number>(0);

    const [ stageLoading, setStageLoading ] = useState<boolean>(false);
    
    const createStage = async () => {
        const { end, level, moves, start }: CreateStageBody = stage

        if ((end || end == 0) && level && moves && (start || start == 0)) {
            const _stage = await services.stage.createStage({ end, level, moves, start, state: 1 })
            stateHandler.saveStage({ ...stage, ..._stage })
        }
        else
            message.error('Parametros inválidos')
    }
    
    const updateStage = async () => {
        const { id, end, level, moves, start, state }: UpdateStageBody = stage
        const _stage = await services.stage.updateStage({ id, end, level, moves, start, state })
        stateHandler.saveStage({ ...stage, ..._stage })
    }

    const fetchStageByLevel = async (id: number) => {
        stateHandler.saveStage(await services.stage.fetchStageByLevel(id))
    }

    const addOperation = async () => {
        const newOperation: CreateOperationBody = {
            stageId: stage.id,
            type: operationType,
            value: operationValue,
        }

        const savedOperation = await services.operation.createOperation(newOperation);
        
        stateHandler.saveOperation([ ...stage.operations, savedOperation ])
    }

    useEffect(() => stage.id ? setMode('edit') : setMode('new'), [stage.id]);

    useEffect(() => { 
        setStageLoading(true)
        stateHandler.saveStage({ id: undefined })
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
                        setValue={(level: number) => stateHandler.saveStage({ level })}
                    />
                    <CalculatorInput
                        name="start"
                        value={stage.start}
                        setValue={(start: number) => stateHandler.saveStage({ start })}
                    />
                    <CalculatorInput
                        name="end"
                        value={stage.end}
                        setValue={(end: number) => stateHandler.saveStage({ end })}
                    />
                    <CalculatorInput
                        min={1}
                        name="moves"
                        value={stage.moves}
                        setValue={(moves: number) => stateHandler.saveStage({ moves })}
                    />
                </div>

                <div style={{ display: 'flex' }}>
                    <CalculatorButton text="Save" onClickHandler={mode == "new" ? createStage : updateStage} />
                    <CalculatorButton text="New" onClickHandler={() => {}} />
                </div>
                
                <CalculatorOperationList />

                <div style={{ display: 'flex' }}>
                    <CalculatorOperationSelection value={operationType} setValue={setOperationType} />
                    <CalculatorInput name="value" value={operationValue} setValue={setOperationValue} />
                    <CalculatorButton text="Add" onClickHandler={addOperation} margin />
                </div>

                <CalculatorResultList />
            </div>
        </div>
    );
}

export default connect((store: any) => ({ stage: store }))(StageComponent);

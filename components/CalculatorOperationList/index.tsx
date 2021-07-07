import CalculatorResult from '../CalculatorResult'
import styles from './calculator-operation.module.css'
import CalculatorOperation from '../CalculatorOperation'
import { Operation } from '../../entity/operation.entity'

interface CalculatorOperationListProps {
    operations: Operation[]
    result?: number
}

const CalculatorOperationList: React.FunctionComponent<CalculatorOperationListProps> = props => {
    
    const getOperationElements = () => {
        return props.operations && props.operations.length 
            ? props.operations.map(operation => <CalculatorOperation operation={operation} />)
            : []
    }

    const label = <label className={styles.label} children="operations list"/>

    return <div className={styles.layout}>
        {label}
        <div
            className={styles.divOperation}
            children={<>
                {getOperationElements()}
                <CalculatorResult value={props.result} />
            </>}
        />
    </div>
}

export default CalculatorOperationList
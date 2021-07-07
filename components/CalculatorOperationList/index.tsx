import { Operation } from '../../entity/operation.entity'
import CalculatorOperation from '../CalculatorOperation'
import styles from './calculator-operation.module.css'

interface CalculatorOperationListProps {
    operations: Operation[]
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
            children={<>{getOperationElements()}</>}
        />
    </div>
}

export default CalculatorOperationList
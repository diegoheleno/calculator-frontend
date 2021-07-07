import { Operation } from '../../entity/operation.entity'
import styles from './calculator-operation.module.css'

interface CalculatorOperationProps {
    operation: Operation;
}

const CalculatorOperation: React.FunctionComponent<CalculatorOperationProps> = props => {
    
    const icons = [ '+', '-', '/', 'x', '<<', '<' ]

    const operationToString = () => {
        const icon = icons[props.operation.type]

        if (icon == '<<')
            return icon

        return icon + props.operation.value
    }
    
    return <div
        className={styles.divOperation}
        children={<div className={styles.operation} children={operationToString()} />}
    />
}

export default CalculatorOperation
import styles from './calculator-operation.module.css'
import CalculatorOperation from '../CalculatorOperation'
import { Operation } from '../../entity/operation.entity'
import { connect } from 'react-redux'

interface CalculatorOperationListProps {
    operations: Operation[];
    dispatch: any
}

const CalculatorOperationList: React.FunctionComponent<CalculatorOperationListProps> = (props: CalculatorOperationListProps) => {
    const { operations } = props

    const getOperationElements = () => {
        return operations && operations.length
            ? operations.map(operation => <CalculatorOperation operation={operation} />)
            : []
    }

    const label = <label className={styles.label} children="operations list" />

    return <div style={{ display: 'flex' }}>
        <div className={styles.layout}>
            {label}
            <div
                className={styles.divOperation}
                children={<>{getOperationElements()}</>}
            />
        </div>
    </div>
}

export default connect((store: any) => ({ operations: store.operations }))(CalculatorOperationList);
import OperationType from '../../entity/type.enum';
import styles from './calculator-operation-selection.module.css'

interface CalculatorOperationSelectionProps {
    value: number
    setValue: (type: number) => void
}

const CalculatorOperationSelection: React.FunctionComponent<CalculatorOperationSelectionProps> = props => {
    
    const onChangeHandler = (event: any) => {
        const { value } = event.target;
        props.setValue(parseInt(value))
    }

    const label = <label children="operation"/>
    const selects = <div className={styles.divSelection}>
        {label}
        <select
            className={styles.select}
            onChange={onChangeHandler}
        >{
            Object.keys(OperationType)
                .filter(type => !(parseInt(type) >= 0))
                .map((type, index) => <option className={styles.option} value={index}>{type}</option>)
        }</select>
    </div>

    return selects
}

export default CalculatorOperationSelection
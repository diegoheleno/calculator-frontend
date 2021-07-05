import { Input } from 'antd'
import styles from './calculator-input.module.css'

interface CalculatorInputProps {
    min?: number,
    name: string,
    value: number,
    setValue: (value: number) => void
}

const CalculatorInput: React.FunctionComponent<CalculatorInputProps> = props => {

    const onChangeHandler = (event: any) => {
        const number: number = parseInt(event.target.value)

        if (number)
            props.setValue(number)
        else
            props.setValue(props.min ?? 0)
    }

    const label = <label children={props.name}/>
    const input = <Input min={props.min} type="number" className={styles.input} value={props.value} />

    return <div
        children={<>{label}{input}</>}
        onChange={onChangeHandler}
        className={styles.divInput}
    />
}

export default CalculatorInput
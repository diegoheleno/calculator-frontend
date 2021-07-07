import styles from './calculator-result.module.css'

interface CalculatorResultProps {
    value?: number;
}

const CalculatorResult: React.FunctionComponent<CalculatorResultProps> = props => {
    return props.value || props.value === 0 ? <div
        className={styles.divResult}
        children={<div className={styles.result} children={`=${props.value}`} />}
    /> : <></>
}

export default CalculatorResult
import { Button } from 'antd'
import styles from './calculator-button.module.css'

interface CalculatorButtonProps {
    onClickHandler: () => void
    text: string
    loading?: boolean
}

const CalculatorButton: React.FunctionComponent<CalculatorButtonProps> = props => {
    
    const button = <Button loading={props.loading} color="blue" children={props.text} className={styles.button} onClick={props.onClickHandler} />

    return <div
        children={button}
        className={styles.divButton}
    />
}

export default CalculatorButton
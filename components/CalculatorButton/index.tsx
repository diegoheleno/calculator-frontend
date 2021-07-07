import { Button } from 'antd'
import styles from './calculator-button.module.css'

interface CalculatorButtonProps {
    onClickHandler: () => void
    text: string
    loading?: boolean
    margin?: boolean
}

const CalculatorButton: React.FunctionComponent<CalculatorButtonProps> = props => {

    const button = <Button
        loading={props.loading}
        children={props.text}
        className={styles.button}
        onClick={props.onClickHandler}
        style={{ marginTop: props.margin ? '21px' : undefined }}
    />

    return <div
        children={button}
        className={styles.divButton}
    />
}

export default CalculatorButton
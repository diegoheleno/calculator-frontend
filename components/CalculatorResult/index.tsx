import { Operation } from '../../entity/operation.entity'
import { Result } from '../../entity/result.entity'
import styles from './calculator-result.module.css'
interface ResultDto extends Result {
    operations: Operation[]
}
interface CalculatorResultProps {
    results: ResultDto[];
    color: string;
}

const CalculatorResult: React.FunctionComponent<CalculatorResultProps> = props => {

    const icons = ['+', '-', '/', 'x', '<<', '<']

    const operationToString = (operation: Operation) => {
        const icon = icons[operation.type]

        if (icon == '<<')
            return icon

        return icon + operation.value
    }

    const getOperationElement = (operation: Operation) => {
        return <div className={styles.result} style={{ backgroundColor: props.color }} children={operationToString(operation)} />
    }

    const getResultElement = () => {
        if (!props.results)
            return []

        return props.results.map(result =>
            <div
                className={styles.divRowResult}
                children={[
                    <div className={styles.result} children={"0"} />,
                    ...result.operations.map(operation => getOperationElement(operation)),
                    <div className={styles.result} style={{ backgroundColor: props.color }} children={"=" + result.value} />
                ]}
            />
        )
    }

    return <div className={styles.divResult} children={getResultElement()} />
}

export default CalculatorResult
import store from '../../store'
import { Provider } from 'react-redux'
import StageComponent from '../../components/CalculatorStage'

const Home: React.FunctionComponent = () => {

    return <Provider store={store}>
        <StageComponent />
    </Provider>
}

export default Home;

// Styles
import '../styles/index.css';
// Router
import AppRouter from './AppRouter'
// Components
import Header from '../components/header/header';

const App = () => {
    return (
        <>
            <Header />
            <AppRouter />
        </>
    );
}

export default App;
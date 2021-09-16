import { Router, Location } from '@reach/router';

// Styles
import '../styles/index.css';
// Constants
import { ROUTES } from '../constants';
// Screens
import { HomeScreen } from '../screens/home';
import { UploadScreen } from '../screens/upload';

const AppRouter = () => {

    return (
        <div className="relative top-12 pb-12 px-4">
        <Location>
            { ({ location }) => {
                return (
                    <Router location={location}>
                        <HomeScreen path={ROUTES.HOME} default /> 
                        <UploadScreen path={ROUTES.UPLOAD} />
                    </Router>
                );
            }}
        </Location>
        </div>
    )
}

export default AppRouter;
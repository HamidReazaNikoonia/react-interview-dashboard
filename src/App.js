import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme

// project imports
import NavigationScroll from 'layout/NavigationScroll';

// ==============================|| APP ||============================== //

const App = () => {
    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            <NavigationScroll>
                <Routes />
            </NavigationScroll>
        </StyledEngineProvider>
    );
};

export default App;

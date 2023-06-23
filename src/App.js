import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// ==============================|| APP ||============================== //

const themeCustom = {
    fontWeightBold: 400
};

const App = () => {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(themeCustom)}>
                <CssBaseline />
                <NavigationScroll>
                    <ToastContainer />
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;

import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Drawer,
    Fab,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    Radio,
    RadioGroup,
    Slider,
    Tooltip,
    Typography
} from '@mui/material';
import { IconSettings } from '@tabler/icons';
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| LIVE CUSTOMIZATION ||============================== //

const Customization = () => {
    const theme = useTheme();

    // drawer on/off
    const [open, setOpen] = useState(false);
    const handleToggle = () => {
        setOpen(!open);
    };

    return (
        <>
            {/* toggle button */}
            <Tooltip title="Live Customize">
                <Fab
                    component="div"
                    onClick={handleToggle}
                    size="medium"
                    variant="circular"
                    color="secondary"
                    sx={{
                        borderRadius: 0,
                        borderTopLeftRadius: '50%',
                        borderBottomLeftRadius: '50%',
                        borderTopRightRadius: '50%',
                        borderBottomRightRadius: '4px',
                        top: '25%',
                        position: 'fixed',
                        right: 10,
                        zIndex: theme.zIndex.speedDial
                    }}
                >
                    <AnimateButton type="rotate">
                        <IconButton color="inherit" size="large" disableRipple>
                            <IconSettings />
                        </IconButton>
                    </AnimateButton>
                </Fab>
            </Tooltip>

            <Drawer
                anchor="right"
                onClose={handleToggle}
                open={open}
                PaperProps={{
                    sx: {
                        width: 280
                    }
                }}
            >
                <PerfectScrollbar component="div">
                    <Grid container spacing={2} sx={{ p: 3 }}>
                        <Grid item xs={12}>
                            Custom
                        </Grid>
                    </Grid>
                </PerfectScrollbar>
            </Drawer>
        </>
    );
};

export default Customization;

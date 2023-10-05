// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://practice-interview.ir" target="_blank" underline="hover">
            practice-interview.ir
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://practice-interview.ir" target="_blank" underline="hover">
            &copy; practice-interview.ir
        </Typography>
    </Stack>
);

export default AuthFooter;

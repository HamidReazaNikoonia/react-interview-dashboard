import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

// material-ui
import { Typography, Grid, Button, Alert } from '@mui/material';

import FailVector from 'assets/images/vector/fail.webp';
import PaymentSuccessVector from 'assets/images/vector/payment_success.webp';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const PaymentResult = () => {
    const navigate = useNavigate();
    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();

    React.useEffect(() => {
        if (!query.get('status')) {
            alert('Error');
        }
    }, [query]);

    React.useEffect(() => {
        setTimeout(() => {
            navigate(`/interview-list`);
        }, [3000]);
    }, []);

    const paymentStatus = query.get('status');
    const paymentInvoiceNumber = query.get('number');

    console.log('query');
    console.log(paymentStatus);

    return (
        <Grid pt={6} sx={{ flexDirection: 'column' }} container justifyContent="center" alignItems="center" p={4}>
            <Grid item xs={12}>
                <Typography variant="h3">
                    Your Payment
                    {paymentStatus === 'true' ? <span> Successfully Done !</span> : <span> F**k Some Problems Happen, Try Again</span>}
                </Typography>
            </Grid>

            {paymentStatus !== 'true' && (
                <Grid item xs={12} pt={4}>
                    <Alert severity="error" pt={4}>
                        <Typography variant="h6">
                            We will follow the problems and if an amount reduce from your account it will be return after 72 hours and you
                            can call with us to follow your transaction code <span style={{ color: 'gray' }}>{paymentInvoiceNumber}</span>
                        </Typography>
                    </Alert>
                </Grid>
            )}

            <Grid py={6} item xs={12}>
                <img alt="" className="img-fluid m-auto" src={paymentStatus === 'true' ? PaymentSuccessVector : FailVector} />
            </Grid>

            {paymentStatus && (
                <Grid item xs={12}>
                    <Typography align="center" variant="h5">
                        <Link to="/">You will be Navigate to your dashboard automaticlly after a few seconds</Link>
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default PaymentResult;

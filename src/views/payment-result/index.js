/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

// material-ui
import { Typography, Grid, Button, Alert, CircularProgress, Box } from '@mui/material';

import { useGetMeQuery } from '../../store/api/userApi';

import FailVector from 'assets/images/vector/fail.webp';
import PaymentSuccessVector from 'assets/images/vector/payment_success.webp';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const paymentErrorThrow = (msg, des) => {
    toast.error({
        title: msg || 'Some Error Happen For Your Payment',
        description: des || ' try again!',
        status: 'error',
        closeButton: true,
        autoClose: 7000,
        // duration: 2000,
        isClosable: true
    });
};

const CircularIndeterminate = () => {
    return (
        <Box flexDirection="column" width="100%" height="100vh" justifyContent="center" alignItems="center" sx={{ display: 'flex' }}>
            <Typography align="center" variant="h5" pb={9}>
                We Are Check Your Payment From Bank, Please Wait
            </Typography>
            <CircularProgress size={100} />
        </Box>
    );
};

const PaymentResult = () => {
    const [paymentVerifyResponse, setpaymentVerifyResponse] = useState(null);
    const [allCheckPaymentLoading, setallCheckPaymentLoading] = useState(true);
    const [paymentStatus, setpaymentStatus] = useState(false);

    const [factorNumber, setfactorNumber] = useState('');

    const navigate = useNavigate();
    const { data: userFromServer, isLoading, isFetching } = useGetMeQuery();

    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();

    React.useEffect(() => {
        if (!query.get('Status')) {
            paymentErrorThrow('This Page Not Redirected Correctly From Banck Gateway');
        }

        if (query.get('Status') !== 'OK') {
            paymentErrorThrow('Your Pament Unsuccessfull');
            setallCheckPaymentLoading(false);
            setpaymentStatus(false);
        }

        if (query.get('Status') === 'OK') {
            verifyPayment();
        }
    }, [query]);

    // React.useEffect(() => {
    //     setTimeout(() => {
    //         navigate(`/interview-list`);
    //     }, [3000]);
    // }, []);

    const verifyPayment = async () => {
        const paymentOnQueue = JSON.parse(localStorage.getItem('paymentOnQueue'));
        if (!paymentOnQueue) {
            return false;
        }

        if (paymentOnQueue.length !== 3) {
            return false;
        }

        const [interviewId, interviewAamount, factorNumber] = paymentOnQueue;

        await axios
            .post(`http://localhost:3000/v1/interview/${userFromServer.id}/verify-transaction-record/${interviewId}`, {
                amount: interviewAamount,
                authority: query.get('Authority'),
                factor_number: factorNumber
            })
            .then((res) => {
                if (res.status === 200 && res.data) {
                    if (res.data?.verifyResponse) {
                        if (res.data.verifyResponse.Status === 101 || res.data.verifyResponse.Status === 100) {
                            setpaymentStatus(true);
                            setallCheckPaymentLoading(false);
                            setfactorNumber(res?.data?.transation.factorNumber);
                            console.log({ response: res });
                        } else {
                            // Bank Give us error, status not 100 or 101
                            setpaymentStatus(false);
                            setallCheckPaymentLoading(false);
                            paymentErrorThrow(
                                'We Get Bad Payment Transfer From Bank Gateway',
                                'We check the prosess and notify you or you can talk with support with Ticket'
                            );
                        }
                    } else {
                        // We Get Response With 200 code But In response
                        // We Have Not [data] correctly
                        setpaymentStatus(false);
                        setallCheckPaymentLoading(false);
                        paymentErrorThrow(
                            'Some thing work wrong',
                            'We check the prosess and notify you or you can talk with support with Ticket'
                        );
                    }
                } else {
                    // We Have Not 200 Status Code
                    setpaymentStatus(false);
                    setallCheckPaymentLoading(false);
                    paymentErrorThrow(
                        'Some thing work wrong',
                        'We check the prosess and notify you or you can talk with support with Ticket'
                    );
                }
            })
            .catch((err) => {
                setpaymentStatus(false);
                setallCheckPaymentLoading(false);
                console.log({ error: err.response });
            });
    };

    // const paymentStatus = query.get('Status');
    const paymentInvoiceNumber = query.get('Authority');

    // console.log('query');
    // console.log(paymentStatus);

    return (
        <React.Fragment>
            {allCheckPaymentLoading ? (
                <CircularIndeterminate />
            ) : (
                <Grid pt={6} sx={{ flexDirection: 'column' }} container justifyContent="center" alignItems="center" p={4}>
                    <Grid item xs={12}>
                        <Typography variant="h3">
                            Your Payment
                            {paymentStatus ? <span> Successfully Done !</span> : <span> F**k Some Problems Happen, Try Again</span>}
                        </Typography>
                    </Grid>

                    {!paymentStatus && (
                        <Grid item xs={12} pt={4}>
                            <Alert severity="error" pt={4}>
                                <Typography variant="h6">
                                    We will follow the problems and if an amount reduce from your account it will be return after 72 hours
                                    and you can call with us to follow your transaction code{' '}
                                    <span style={{ color: 'gray' }}>{paymentInvoiceNumber}</span>
                                </Typography>
                            </Alert>
                        </Grid>
                    )}

                    <Grid py={6} item xs={12}>
                        <img alt="" className="img-fluid m-auto" src={paymentStatus ? PaymentSuccessVector : FailVector} />
                    </Grid>

                    {paymentStatus && (
                        <Grid item xs={12}>
                            <Typography align="center" variant="h5">
                                <Link to="/">You will be Navigate to your dashboard automaticlly after a few seconds</Link>
                            </Typography>
                        </Grid>
                    )}
                </Grid>
            )}
        </React.Fragment>
    );
};

export default PaymentResult;

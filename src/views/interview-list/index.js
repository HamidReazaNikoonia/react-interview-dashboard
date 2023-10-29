/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
// material-ui
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// UI Comp
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTheme } from '@mui/material/styles';
import { Typography, useMediaQuery, Button, Alert, CircularProgress } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LoadingButton from '@mui/lab/LoadingButton';
import EventBusyIcon from '@mui/icons-material/EventBusy';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// Interview API
import { useLazyGetAllInterviewsQuery, useUpdateInterviewMutation } from '../../store/api/interviewApi';
import { useGetMeQuery } from '../../store/api/userApi';

// ==============================|| SAMPLE PAGE ||============================== //

const mockData = [
    {
        _id: '2334',
        selectedTime: '2020/03/22',
        interviewUserId: '22',
        paymentStatus: 'PAYED',
        created_at: '2020/03/11',
        stack: 'WEB - Front-End',
        level: 'Junior',
        status: 'SELECTED_BY_USER',
        amount: 100000,
        transaction: {
            amount: 300,
            tax: 20
        },
        result: {
            accessToNextRound: 'YES',
            scores: {
                technical_skill: 3,
                problem_solving: 1,
                communication: 4
            },
            description: {
                context:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sequi neque quia mollitia ipsum ut quod incidunt ab animi rem atque, debitis velit, sunt nostrum vitae a. Ipsam, ipsum architecto?',
                summary:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sequi neque quia mollitia ipsum ut quod incidunt ab animi rem atque, debitis velit, sunt nostrum vitae a. Ipsam, ipsum architecto?',
                technical_evaluation:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sequi neque quia mollitia ipsum ut quod incidunt ab animi rem atque, debitis velit, sunt nostrum vitae a. Ipsam, ipsum architecto?',
                improvement_suggest:
                    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sequi neque quia mollitia ipsum ut quod incidunt ab animi rem atque, debitis velit, sunt nostrum vitae a. Ipsam, ipsum architecto?'
            }
        }
        // payment: {

        // }
    }
];

function createData(id, selectedTime, created_at, stack, status, amount, interviewUserId, paymentStatus, data) {
    const subjectStackMap = {
        FRONT_END: 'Front-End',
        BACK_END: 'Back-End',
        FULL_STACK: 'Full-Stack',
        IOS: 'Mobile - IOS',
        ANDROID: 'Mobile - Android',
        DEVOPS: 'DevOps'
    };

    const interviewStatusMap = {
        SELECTED_BY_USER: 'Wait For Cordinate',
        ACCEPTED_BY_INTERVIEWER: 'Accepted By Coach',
        FINISHED: 'Finished',
        CANCELED: 'Canceled'
    };

    const paymentStatusMap = {
        PROGRESS: 'Waiting For Pay',
        CANCELED: 'Canceled',
        PAYED: 'Paid'
    };

    // {Math.round(historyRow.amount * historyRow.total_price * 100) / 100}

    // Format time function
    const formatTimeStamp = (date) => {
        const _date = new Date(date);
        return _date.toLocaleString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return {
        data: data,
        id,
        created_at: formatTimeStamp(created_at),
        stack: subjectStackMap[stack],
        status: interviewStatusMap[status],
        history: [
            {
                payment_status: paymentStatusMap[paymentStatus],
                coach_id: interviewUserId,
                amount: `${amount} Rials`,
                total_price: `${amount} Rials`
            }
        ],
        ...(selectedTime ? { selectedTime: formatTimeStamp(selectedTime) } : { selectedTime: 'Not Defined' })
    };
}

function MobileRow(props) {
    const { row, fetchNewList, userId } = props;
    const [open, setOpen] = React.useState(false);
    // selectedTime, created_at, stack, status

    const [updateInterviewCanceling, { isLoading: loadingUpdateMutation, isSuccess, isError, data }] = useUpdateInterviewMutation();

    const [selectedInterviewForCanceling, setselectedInterviewForCanceling] = React.useState(null);
    const [openCancelDialog, setopenCancelDialog] = React.useState(false);
    // selectedTime, created_at, stack, status

    React.useEffect(() => {
        if (isSuccess) {
            if (data.updatedRecord?.status === 'CANCELED') {
                toast.success('Your Session Will Be Cancel Successfully ');
                fetchNewList();
            }
            console.log(data.updatedRecord);
            handleClose();
        }
    }, [isSuccess, data]);

    const handleClickOpen = (id) => {
        console.log(id);
        setselectedInterviewForCanceling(id);
        setopenCancelDialog(true);
    };

    const handleClose = () => {
        setopenCancelDialog(false);
    };

    const cancelInterviewHandler = async () => {
        // console.log({ in: selectedInterviewForCanceling });
        if (!selectedInterviewForCanceling) {
            handleClose();
            toast.error('We Can Not Cancel This Session, Something Wrong', {
                position: 'top-right'
            });
            return false;
        }
        try {
            await updateInterviewCanceling({
                id: selectedInterviewForCanceling,
                userId: userId,
                body: {}
            });
        } catch (e) {
            console.log(e);
            toast.error('We Can Not Cancel This Session, Please Try Again', {
                position: 'top-right'
            });
        }
    };

    return (
        <React.Fragment>
            <Dialog
                open={openCancelDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Do You Want Cancel This Session?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="error" pb={1}>
                            <Typography pb={2} variant="body2" color="error">
                                By Canceling your interview, your money pass to you before 12 hours , but after 12 hours 80% of your amont
                                will be pass
                            </Typography>
                            <LoadingButton
                                size="large"
                                mt={4}
                                color="error"
                                loading={loadingUpdateMutation}
                                px={12}
                                type="button"
                                onClick={cancelInterviewHandler}
                                variant="outlined"
                                startIcon={<EventBusyIcon />}
                            >
                                Cancel Interview
                            </LoadingButton>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                </DialogActions>
            </Dialog>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' }, ...(row.status === 'Canceled' && { opacity: '0.4' }) }}>
                <TableCell>
                    {row.status === 'Finished' ? (
                        <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                            <Link state={{ interview: row }} to="/interview-result/99">
                                <KeyboardArrowUpIcon />
                            </Link>
                        </IconButton>
                    ) : (
                        <React.Fragment>
                            {row.status !== 'Canceled' && (
                                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                    <Box onClick={() => handleClickOpen(row.id)} style={{ cursor: 'pointer' }} color="red">
                                        <EventBusyIcon color="red" />
                                    </Box>
                                </IconButton>
                            )}
                        </React.Fragment>
                    )}
                </TableCell>

                {/* <TableCell component="th" scope="row">
                    row.name
                </TableCell> */}
                <TableCell style={{ fontSize: '12px', padding: 0 }} align="left">
                    {row.selectedTime}
                </TableCell>
                {/* <TableCell style={{ fontSize: '12px', padding: 0 }} align="left">
                    {row.stack}
                </TableCell> */}
                <TableCell align="center">{row.status}</TableCell>
                {/* <TableCell align="right">{row.created_at}</TableCell> */}

                {/* <TableCell align="right">
                    
                </TableCell> */}
            </TableRow>
        </React.Fragment>
    );
}

function Row(props) {
    const { row, userId, fetchNewList } = props;
    const [open, setOpen] = React.useState(false);
    const [openCancelDialog, setopenCancelDialog] = React.useState(false);
    const [selectedInterviewForCanceling, setselectedInterviewForCanceling] = React.useState(null);
    // selectedTime, created_at, stack, status

    const [updateInterviewCanceling, { isLoading: loadingUpdateMutation, isSuccess, isError, data }] = useUpdateInterviewMutation();

    React.useEffect(() => {
        if (isSuccess) {
            if (data.updatedRecord?.status === 'CANCELED') {
                toast.success('Your Session Will Be Cancel Successfully ');
                fetchNewList();
            }
            console.log(data.updatedRecord);
            handleClose();
        }
    }, [isSuccess, data]);

    const handleClickOpen = (id) => {
        console.log(id);
        setselectedInterviewForCanceling(id);
        setopenCancelDialog(true);
    };

    const handleClose = () => {
        setopenCancelDialog(false);
    };

    const cancelInterviewHandler = async () => {
        // console.log({ in: selectedInterviewForCanceling });
        if (!selectedInterviewForCanceling) {
            handleClose();
            toast.error('We Can Not Cancel This Session, Something Wrong', {
                position: 'top-right'
            });
            return false;
        }
        try {
            await updateInterviewCanceling({
                id: selectedInterviewForCanceling,
                userId: userId,
                body: {}
            });
        } catch (e) {
            console.log(e);
            toast.error('We Can Not Cancel This Session, Please Try Again', {
                position: 'top-right'
            });
        }
    };

    return (
        <React.Fragment>
            <Dialog
                open={openCancelDialog}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Do You Want Cancel This Session?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="error" pb={1}>
                            <Typography pb={2} variant="body2" color="error">
                                By Canceling your interview, your money pass to you before 12 hours , but after 12 hours 80% of your amont
                                will be pass
                            </Typography>
                            <LoadingButton
                                size="large"
                                mt={4}
                                color="error"
                                loading={loadingUpdateMutation}
                                px={12}
                                type="button"
                                onClick={cancelInterviewHandler}
                                variant="outlined"
                                startIcon={<EventBusyIcon />}
                            >
                                Cancel Interview
                            </LoadingButton>
                        </Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                </DialogActions>
            </Dialog>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' }, ...(row.status === 'Canceled' && { opacity: '0.4' }) }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                {/* <TableCell component="th" scope="row">
                    row.name
                </TableCell> */}
                <TableCell align="left">{row.selectedTime}</TableCell>
                <TableCell align="right">{row.stack}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.created_at}</TableCell>

                <TableCell align="right">
                    {row.status === 'Finished' ? (
                        <Link state={{ interview: row }} to="/interview-result/99">
                            SEE RESULT
                        </Link>
                    ) : (
                        <React.Fragment>
                            {/* <h1>{row.status}</h1> */}
                            {row.status !== 'Canceled' && (
                                <Box onClick={() => handleClickOpen(row.id)} style={{ cursor: 'pointer' }} color="red">
                                    Cancel Interview
                                </Box>
                            )}
                        </React.Fragment>
                    )}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography color="gray" variant="h6" gutterBottom component="div">
                                More Informations
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Payment Status</TableCell>
                                        <TableCell>Coach</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.coach_id}>
                                            <TableCell>{historyRow.payment_status}</TableCell>
                                            <TableCell component="th" scope="row">
                                                {historyRow.coach_id}
                                            </TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">{historyRow.total_price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

// selectedTime, created_at, stack, status
// selectedTime, created_at, stack, status, amount, interviewUserId, paymentStatus, id

// const rows = mockData.map((data) => {
//     return createData('1400/03/20', '159/ff/dd', 'Front-End (React)', 'pending', 1000, 111, 'PAID');
// });

// const rows = [
//     createData('1400/03/20', '159/ff/dd', 'Front-End (React)', 'pending'),
//     createData('1400/03/20', '159/ff/dd', 'Back-End (Node)', 'started'),
//     createData('1400/03/20', '159/ff/dd', 'Front-End (React)', 'finished'),
//     createData('1400/03/20', '159/ff/dd', 'Front-End (React)', 'cancel'),
//     createData('1400/03/20', '159/ff/dd', 'Front-End (React)', 'pending'),
//     createData('1400/03/20', '159/ff/dd', 'Front-End (React)', 'pending')
// ];

const SamplePage = () => {
    // const isMobile = true;
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    // State
    const [data, setdata] = React.useState(null);

    const { data: userFromServer, isLoading, isFetching } = useGetMeQuery();
    const [
        getInterviews,
        { data: interviewsData, isFetching: interviewsIsLoading, error: interviewsError, isSuccess: interviewsIsSuccess }
    ] = useLazyGetAllInterviewsQuery();

    const getInterviewFetcher = async (id) => {
        try {
            await getInterviews(id);
        } catch (e) {
            console.log(e);
        }
    };

    React.useEffect(() => {
        if (userFromServer?.id) {
            console.log(interviewsData);
            getInterviewFetcher({ id: userFromServer.id });
        }
    }, [userFromServer]);

    React.useEffect(() => {
        if (interviewsIsSuccess && interviewsData) {
            console.log('interviews^^^^');
            console.log(interviewsData);

            const filteredRecords = interviewsData.filter((i) => i.paymentStatus === 'PAYED');

            const rows = filteredRecords.map((data) => {
                const interviewUserId = data?.interviewUserId?.name || 'Not Defined';
                return createData(
                    data._id,
                    data.selectedTime,
                    data.createdAt,
                    data.stack,
                    data.status,
                    data.amount,
                    interviewUserId,
                    data.paymentStatus,
                    data
                );
            });
            setdata(rows);
        }
    }, [interviewsIsSuccess, interviewsData]);

    console.log(interviewsData);

    const refetch = () => {
        getInterviewFetcher({ id: userFromServer.id });
    };

    const DesktopTable = () => (
        <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell>Interview Date</TableCell>
                    <TableCell align="right">Subject</TableCell>
                    <TableCell align="right">Interview Status</TableCell>
                    <TableCell align="right">Created Date</TableCell>
                    <TableCell align="right">MORE Info</TableCell>
                    {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
            </TableHead>

            {data ? (
                <TableBody>
                    {matchesXs
                        ? data.map((row) => <MobileRow fetchNewList={refetch} userId={userFromServer.id} key={row.name} row={row} />)
                        : data.map((row) => <Row fetchNewList={refetch} userId={userFromServer.id} key={row.name} row={row} />)}
                </TableBody>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '300px', width: '100%' }}>
                    <CircularProgress />
                </Box>
            )}
        </Table>
    );

    const MobileTable = () => (
        <Table aria-label="collapsible table">
            <TableHead>
                <TableRow>
                    <TableCell />
                    <TableCell style={{ fontSize: '12px', padding: 0 }} align="left">
                        Interview Date
                    </TableCell>
                    <TableCell style={{ fontSize: '12px', padding: 0 }} align="center">
                        Status
                    </TableCell>
                    {/* <TableCell align="center">Interview Status</TableCell> */}
                    {/* <TableCell align="right">MORE Info</TableCell> */}
                    {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
            </TableHead>

            {data && (
                <TableBody>
                    {data.map((row) => (
                        <MobileRow fetchNewList={refetch} userId={userFromServer.id} key={row.name} row={row} />
                    ))}
                </TableBody>
            )}
        </Table>
    );

    return (
        <MainCard title="List of your interview sessions">
            <TableContainer component={Paper}>{matchesXs ? <MobileTable /> : <DesktopTable />}</TableContainer>
        </MainCard>
    );
};

export default SamplePage;

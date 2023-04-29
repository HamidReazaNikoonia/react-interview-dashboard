/* eslint-disable react/prop-types */
// material-ui
import React from 'react';
import { Link } from 'react-router-dom';
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
import { Typography, useMediaQuery } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const mockData = [
    {
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

function createData(selectedTime, created_at, stack, status, amount, interviewUserId, paymentStatus) {
    return {
        selectedTime,
        created_at,
        stack,
        status,
        history: [
            {
                payment_status: paymentStatus,
                coach_id: interviewUserId,
                amount,
                total_price: amount
            }
        ]
    };
}

function MobileRow(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    // selectedTime, created_at, stack, status

    return (
        <React.Fragment>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        <Link to="/interview-result/99">
                            <KeyboardArrowUpIcon />
                        </Link>
                    </IconButton>
                </TableCell>

                {/* <TableCell component="th" scope="row">
                    row.name
                </TableCell> */}
                <TableCell style={{ fontSize: '12px', padding: 0 }} align="left">
                    {row.selectedTime}
                </TableCell>
                <TableCell style={{ fontSize: '12px', padding: 0 }} align="left">
                    {row.stack}
                </TableCell>
                {/* <TableCell align="center">{row.status}</TableCell> */}
                {/* <TableCell align="right">{row.created_at}</TableCell> */}

                {/* <TableCell align="right">
                    
                </TableCell> */}
            </TableRow>
        </React.Fragment>
    );
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    // selectedTime, created_at, stack, status

    return (
        <React.Fragment>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                    <Link to="/interview-result/99">SEE RESULT</Link>
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
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * historyRow.total_price * 100) / 100}
                                            </TableCell>
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
// selectedTime, created_at, stack, status, amount, interviewUserId, paymentStatus

const rows = mockData.map((data) => {
    return createData('1400/03/20', '159/ff/dd', 'Front-End (React)', 'pending', 1000, 111, 'PAID');
});

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

            <TableBody>
                {matchesXs
                    ? rows.map((row) => <MobileRow key={row.name} row={row} />)
                    : rows.map((row) => <Row key={row.name} row={row} />)}
            </TableBody>
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
                    <TableCell style={{ fontSize: '12px', padding: 0 }} align="left">
                        Subject
                    </TableCell>
                    {/* <TableCell align="center">Interview Status</TableCell> */}
                    {/* <TableCell align="right">MORE Info</TableCell> */}
                    {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map((row) => (
                    <MobileRow key={row.name} row={row} />
                ))}
            </TableBody>
        </Table>
    );

    return (
        <MainCard title="List of your interview sessions">
            <TableContainer component={Paper}>{matchesXs ? <MobileTable /> : <DesktopTable />}</TableContainer>
        </MainCard>
    );
};

export default SamplePage;

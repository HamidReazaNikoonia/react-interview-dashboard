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
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

function createData(interview_date, created_at, interview_type, interview_status) {
    return {
        interview_date,
        created_at,
        interview_type,
        interview_status,
        history: [
            {
                payment_status: 'paied',
                coach_id: 'coach id',
                amount: 3
            }
            // {
            //     payment_status: 'paied',
            //     coach_id: 'coach id',
            //     amount: 3
            // }
        ]
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    // interview_date, created_at, interview_type, interview_status

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
                <TableCell align="left">{row.interview_date}</TableCell>
                <TableCell align="right">{row.interview_type}</TableCell>
                <TableCell align="right">{row.interview_status}</TableCell>
                <TableCell align="right">{row.created_at}</TableCell>

                <TableCell align="right">
                    <Link to="interview-list/99">SEE MORE</Link>
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
                                            <TableCell align="right">{Math.round(historyRow.amount * row.price * 100) / 100}</TableCell>
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

// interview_date, created_at, interview_type, interview_status
const rows = [
    createData('1400/03/20', '159/ff/dd', 'Front-End (React)', 'pending'),
    createData('1400/03/20', '159/ff/dd', 'Back-End (Node)', 'started'),
    createData('1400/03/20', '159/ff/dd', 'Front-End (React)', 'finished'),
    createData('1400/03/20', '159/ff/dd', 'Front-End (React)', 'cancel'),
    createData('1400/03/20', '159/ff/dd', 'Front-End (React)', 'pending'),
    createData('1400/03/20', '159/ff/dd', 'Front-End (React)', 'pending')
];

const SamplePage = () => (
    <MainCard title="List of your interview sessions">
        <TableContainer component={Paper}>
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
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </MainCard>
);

export default SamplePage;

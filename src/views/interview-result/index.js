/* eslint-disable react/prop-types */
// material-ui
import { Typography, Grid, List, ListItem, Divider, Box, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// Icons
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import GppBadIcon from '@mui/icons-material/GppBad';
import StarIcon from '@mui/icons-material/Star';

import { useParams } from 'react-router-dom';

// ==============================|| SAMPLE PAGE ||============================== //

const mockData = {
    selectedTime: '2020/03/22',
    interviewUserId: '22',
    paymentStatus: 'PAYED',
    created_at: '2020/03/11',
    stack: 'WEB - Front-End',
    level: 'Junior',
    status: 'SELECTED_BY_USER',
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
};

const ScoreListRow = ({ leftSide, nextRound, starScore }) => {
    const NexRoundSide = () => (
        <Typography align="center" variant="h5">
            {nextRound === 'YES' ? <ThumbUpOffAltIcon /> : <GppBadIcon />}
            <span> {nextRound} </span>
        </Typography>
    );

    const StarIconScore = ({ starScore }) => {
        const maxScore = new Array(4).fill(1);
        // const score = new Array(starScore).fill(1);

        return (
            <div style={{ textAlign: 'center' }}>
                {maxScore.map((s, index) => {
                    return index < starScore ? <StarIcon sx={{ color: 'black' }} /> : <StarIcon sx={{ color: 'gray' }} />;
                })}
            </div>
        );
    };

    return (
        <Grid pt={4} alignItems="center" container display="flex" justifyContent="center">
            <Grid item xs={6}>
                <Typography align="left" sx={{ typography: { sm: 'h6', md: 'h5' } }} pl={{ xs: 0, md: 6 }}>
                    {leftSide}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                {nextRound && <NexRoundSide />}
                {starScore !== null && <StarIconScore starScore={starScore} />}
            </Grid>
            <Divider sx={{ marginLeft: 0, width: '100%', paddingTop: '20px', listStyle: 'none' }} variant="inset" component="li" />
        </Grid>
    );
};

const InterviewResult = () => {
    let { id } = useParams();

    return (
        <MainCard title={`${mockData.stack} Interview Result`} backIcon="/interview-list">
            <Grid sx={{ width: '100%', flexDirection: 'column' }} alignItems="center" container display="flex" justifyContent="center">
                <Grid item xs={12}>
                    <Typography sx={{ typography: { xs: 'h6', sm: 'h5', md: 'h3' }, pb: 3 }}>
                        Feedback About {mockData.stack} - ( {mockData.level} )
                    </Typography>
                </Grid>

                <Grid sx={{ width: '100%', flexDirection: 'column' }} item display="flex" xs={12}>
                    <ScoreListRow
                        leftSide="Advanced this person to the next round ?"
                        nextRound={mockData.result.accessToNextRound}
                        starScore={null}
                    />
                    <ScoreListRow leftSide="How were their technical skills ?" starScore={mockData.result.scores.technical_skill} />
                    <ScoreListRow leftSide="How were their problem solving ability ?" starScore={mockData.result.scores.problem_solving} />
                    <ScoreListRow leftSide="What about their communication ability ?" starScore={mockData.result.scores.communication} />
                </Grid>
            </Grid>

            <Grid
                pt={12}
                px={{ xs: 1, md: 5 }}
                sx={{ width: '100%', flexDirection: 'column' }}
                alignItems="center"
                container
                display="flex"
                justifyContent="center"
            >
                <Grid item xs={12}>
                    <Typography sx={{ pb: 3 }} variant="h4">
                        Context
                    </Typography>

                    <Typography variant="body">{mockData.result.description.context}</Typography>
                    <Divider sx={{ marginLeft: 0, width: '100%', paddingTop: '20px', listStyle: 'none' }} variant="inset" component="li" />
                </Grid>

                {/* Summary */}

                <Grid item pt={4} xs={12}>
                    <Typography sx={{ pb: 3 }} variant="h4">
                        Summary
                    </Typography>

                    <Typography variant="body">{mockData.result.description.summary}</Typography>
                    <Divider sx={{ marginLeft: 0, width: '100%', paddingTop: '20px', listStyle: 'none' }} variant="inset" component="li" />
                </Grid>

                {/* Technical Evaluation */}

                <Grid item pt={4} xs={12}>
                    <Typography sx={{ pb: 3 }} variant="h4">
                        Technical Evaluation
                    </Typography>

                    <Typography variant="body">{mockData.result.description.technical_evaluation}</Typography>
                    <Divider sx={{ marginLeft: 0, width: '100%', paddingTop: '20px', listStyle: 'none' }} variant="inset" component="li" />
                </Grid>

                {/* Suggestions for Improvement */}

                <Grid item pt={4} pb={12} xs={12}>
                    <Typography sx={{ pb: 3 }} variant="h4">
                        Suggestions for Improvement
                    </Typography>

                    <Typography variant="body">{mockData.result.description.improvement_suggest}</Typography>
                </Grid>

                <Grid pb={6} item xs={12}>
                    {/* <Alert severity="error" pb={6}>
                        <Typography pb={2} variant="body2" color="error">
                            By Canceling your interview, your money pass to you before 12 hours , but after 12 hours 80% of your amont will
                            be pass
                        </Typography>
                        <LoadingButton
                            size="large"
                            mt={4}
                            color="error"
                            loading={false}
                            px={12}
                            type="button"
                            onClick={() => {
                                console.log('');
                            }}
                            variant="outlined"
                            startIcon={<EventBusyIcon />}
                        >
                            Cancel Interview
                        </LoadingButton>
                    </Alert> */}
                </Grid>
            </Grid>
        </MainCard>
    );
};

export default InterviewResult;

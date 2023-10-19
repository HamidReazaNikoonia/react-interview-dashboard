/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';

import { useGetMeQuery } from '../../store/api/userApi';
import { useCreateInterviewMutation, useLazyGetCoachByCodeQuery } from '../../store/api/interviewApi';

// material-ui
import {
    Grid,
    Typography,
    InputLabel,
    MenuItem,
    FormHelperText,
    FormControl,
    TextField,
    Box,
    Button,
    Divider,
    ButtonBase
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CircularProgressWithLabel from '../../ui-component/circularProgressWithLabel';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// Content
import content from '../../content/create-interview-form';

// ==============================|| CREATE INTERVIEW ||============================== //

// data we need
/*
   1- Stack [WEB - FRONT-END]
   2- Level [MiLlevel]
   3- Prefer hours from - to
   4- Upload Your Resume
   5- Linkdin Profile
   6- Github Profile

 */

const validationSchema = yup.object({
    stack: yup.string('Enter your Stack').required('Email is required'),
    level: yup.string('Enter your Level').required('Select Stack is required'),
    linkdinProfile: yup
        .string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required('Select Stack is required'),
    githubProfile: yup
        .string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
});

const CreateInterview = () => {
    const [selectedFile, setselectedFile] = React.useState(null);
    const [disableForm, setDisableForm] = React.useState(false);
    const [resumeFile, setResumeFile] = React.useState(false);
    const [uploadProgress, setUploadProgress] = React.useState(0);
    const [savedResumeFile, setSavedResumeFile] = React.useState('');

    // Upload button state
    const [uploadbuttonDisable, setuploadbuttonDisable] = React.useState(false);

    // UI STATE
    // Toggle Coach Id Form
    const [toggleCoachIdForm, settoggleCoachIdForm] = useState(false);

    // Coach State
    const [coachIdInputError, setcoachIdInputError] = useState(null);
    const [coachIdInput, setcoachIdInput] = useState(null);
    const [selectedCoach, setselectedCoach] = useState(null);
    const [disableStackSlectInput, setdisableStackSlectInput] = useState(false);
    const [disableLanguageSelectInput, setdisableLanguageSelectInput] = useState(false);

    const navigate = useNavigate();

    const { data: userFromServer, isLoading, isFetching } = useGetMeQuery({ refetchOnMountOrArgChange: true });
    const [
        getCoachByCode,
        { data: coachByCodeData, isFetching: coachByCodeIsLoading, error: coachByCodeError, isSuccess: coachByCodeIsSuccess }
    ] = useLazyGetCoachByCodeQuery();

    const [createInterviewMutation, { isLoading: loadingCreateMutation, isSuccess, isError, data }] = useCreateInterviewMutation();

    const leftDrawerOpened = useSelector((state) => state.ui.opened);

    const handleAddInterview = async (data) => {
        try {
            await createInterviewMutation(data);
        } catch {
            toast.error({
                title: 'An error occurred',
                description: "We couldn't save your post, try again!",
                status: 'error',
                duration: 2000,
                isClosable: true
            });
        }
    };

    const handleSubmitCoachCode = async () => {
        if (!coachIdInput || coachIdInput === ' ' || coachIdInput.length < 6) {
            setselectedCoach(null);
            setcoachIdInputError('please enter code corectly');
            return false;
        }
        setcoachIdInputError(null);
        try {
            await getCoachByCode(coachIdInput);
        } catch (e) {
            console.error('Coach Code Submit Handler');
            console.log(e);
            toast.error({
                title: 'An error occurred',
                description: "We couldn't save your post, try again!",
                status: 'error',
                duration: 2000,
                isClosable: true
            });
        }
    };

    const paymentErrorThrow = () => {
        toast.error('We have ISSUE from Bank API, please wait a few seccond', {
            position: 'top-right'
        });
    };

    const findCoachErrorThrow = (msg) => {
        toast.error(msg, {
            position: 'top-right'
        });

        setcoachIdInputError(msg);
    };

    useEffect(() => {
        localStorage.setItem('paymentOnQueue', null);
    }, []);

    // Effect

    useEffect(() => {
        if (coachByCodeIsSuccess) {
            if (!coachByCodeData?.coach[0]) {
                findCoachErrorThrow('Coach with this code not existed');
            }

            if (coachByCodeData?.coach[0]?.status === false) {
                findCoachErrorThrow('This coach could not have session');
            }
            setselectedCoach(coachByCodeData?.coach[0]);

            // Language field logic
            setdisableLanguageSelectInput(false);
            const coachLanguages = coachByCodeData?.coach[0]?.lang[0];

            if (coachLanguages) {
                if (!coachLanguages.english || !coachLanguages.persian) {
                    console.log('kire--khar');
                    console.log(coachLanguages);
                    console.log({ en: coachLanguages.english, pr: coachLanguages.persian });
                    !!coachLanguages.english && formik.setFieldValue('origin', 'ENG');
                    !!coachLanguages.persian && formik.setFieldValue('origin', 'PR');
                    setdisableLanguageSelectInput(true);
                }
            }

            setdisableStackSlectInput(true);

            formik.setFieldValue('stack', coachByCodeData?.coach[0].stack);
        }

        console.log(coachByCodeData?.coach);
        console.log(`coachByCodeData.coach[0]`);
    }, [coachByCodeIsSuccess, coachByCodeData]);

    useEffect(() => {
        if (isSuccess) {
            console.log({ data });
            // toast.success('Your Interview Will be Set', {
            //     autoClose: 1000,
            //     hideProgressBar: false
            // });
            if (data) {
                if (data.payment) {
                    toast.info('Please wait untill migrate to Banks page', {
                        autoClose: false,
                        position: 'top-center',
                        hideProgressBar: true
                    });
                    // Interview_id, interview_amount, factorNumber
                    localStorage.setItem('paymentOnQueue', JSON.stringify([data.record._id, data.record.amount, data.factorNumber]));
                    window.location.href = data.payment.url;
                } else {
                    paymentErrorThrow();
                }
            } else {
                toast.error('Some mistake happen, please reload the page and try again', {
                    position: 'top-right'
                });
            }
            // navigate('/interview-list');
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error('Some mistake happen, please reload the page and try again', {
                position: 'top-right'
            });
        }
    }, [isError]);

    const formik = useFormik({
        initialValues: {
            stack: 'FULL_STACK',
            level: 'JUNIOR',
            linkdinProfile: '',
            githubProfile: '',
            origin: 'ENG'
        },
        validationSchema: validationSchema,
        // validadeOnMount: true,
        isInitialValid: false,
        onSubmit: (values) => {
            // Check upload resume
            if (!resumeFile || resumeFile?.id === ' ') {
                if (!confirm('Do you Want Apply with Resume')) {
                    return false;
                }
                toast.info('you apply without reume file', {
                    position: 'bottom-right'
                });
            }

            // SEND TO API
            handleAddInterview({
                userId: userFromServer.id,
                stack: values.stack,
                level: values.level,
                coachId: values.coachId,
                social: {
                    linkedinProfile: values.linkdinProfile,
                    githubProfile: values.githubProfile
                },
                origin: values.origin,
                ...(resumeFile.id && { resumeFile: resumeFile.id })
            });

            // alert(JSON.stringify(values, null, 2));
            //     toast.success('Your Interview Session Created');
            //     toast.error('some error', {
            //         position: 'top-right'
            //     });
        }
    });

    React.useEffect(() => {
        // If youse have resume
        if (savedResumeFile) {
            setResumeFile(savedResumeFile);
        }
    }, [savedResumeFile]);

    const onFileChange = (event) => {
        // Update the state

        console.log({ kir1: event.target.files[0] });
        setselectedFile(event.target.files[0]);
        console.log({ kir2: selectedFile });
    };

    /**
     * ***** UPLOAD RESUME FILE SECTION *****
     */

    const onFileUpload = () => {
        // Avoid Upload same file
        setUploadProgress(0);

        console.log({ prev: resumeFile?.name, next: selectedFile?.name });
        if (resumeFile?.name === selectedFile?.name) {
            toast.error('This File uploaded, Please Try Another File', {
                position: 'top-right'
            });
            return false;
        }

        setuploadbuttonDisable(true);

        // Create an object of formData
        event.preventDefault();
        const formData = new FormData();

        // Update the formData object
        formData.append('interview-kit-File', selectedFile, selectedFile?.name);

        // Request made to the backend api
        // Send formData object

        const onUploadProgress = (progressEvent) => {
            const { loaded, total } = progressEvent;
            let precentage = Math.floor((loaded * 100) / total);
            setUploadProgress(precentage === 100 ? 0 : precentage);
        };

        axios
            .post('http://localhost:3000/v1/upload', formData, {
                onUploadProgress
            })
            .then((data) => {
                // check if file upload successfully
                if (data?.status === 200 && data?.data?.uploadedFile) {
                    if (data.data.uploadedFile._id) {
                        toast.success('Your Resume successfully Uploaded');
                        setResumeFile({ id: data.data.uploadedFile._id, name: data.data.uploadedFile.original_name });
                    }
                } else {
                    toast.error('You File Could Not Upload, Please Try Again', {
                        position: 'top-right'
                    });
                }
                console.log(data);
            })
            .catch((err) => {
                if (err.response) {
                    console.log('API error');
                    toast.error('You File Could Not Upload, Please Try Again', {
                        position: 'top-right'
                    });

                    if (err.response?.data) {
                        if (err.response.data.code === 500) {
                            toast.error(err.response.data?.message, {
                                position: 'top-right'
                            });
                        }
                        console.log(err.response.data);
                    }
                    console.log(err.response);
                }
            })
            .finally(() => {
                setuploadbuttonDisable(false);
            });

        // Details of the uploaded file
    };

    const formValidation = (formik__) => {
        if (!!formik__.errors.linkdinProfile || !!formik__.errors.stack) {
            setDisableForm(true);
        } else {
            setDisableForm(false);
        }
    };

    React.useEffect(() => {
        formValidation(formik);
        // console.log(formik);
    }, [formik, formValidation]);

    // file upload is complete
    const FileData = () => {
        if (selectedFile) {
            return (
                <div>
                    <Typography pb={2} variant="h5">
                        File Details
                    </Typography>
                    {uploadProgress !== 0 && uploadProgress !== 100 && (
                        <Box py={3} sx={{ display: 'flex' }}>
                            <CircularProgressWithLabel variant="determinate" value={uploadProgress} />
                        </Box>
                    )}
                    <Typography variant="body2"> File Name: {selectedFile?.name} </Typography>
                    <Typography variant="body2"> File Type: {selectedFile?.type} </Typography>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                </div>
            );
        }
    };

    // helper function
    const defineCoachStackLabel = (stack) => {
        if (!stack || stack === '') return '';
        switch (stack) {
            case 'FRONT_END':
                return 'Front-End developer';
                break;
            case 'BACK_END':
                return 'Back-End developer';
                break;
            case 'FULL_STACK':
                return 'Fullstack developer';
                break;
            case 'IOS':
                return 'Mobile - IOS developer';
                break;
            case 'ANDROID':
                return ' Mobile - Android developer';
                break;
            case 'DEVOPS':
                return 'DevOps developer';
                break;
        }
    };

    const cancelCoachByCodeForm = () => {
        settoggleCoachIdForm(false);
        setselectedCoach(null);
        setdisableStackSlectInput(false);
        setdisableLanguageSelectInput(false);

        // formik.setFieldValue('stack', 'ANDROID');
    };

    return (
        <MainCard title="Create New Interview Session">
            <Typography sx={{ whiteSpace: 'pre-line' }} variant="body2">
                {content.formDescription || ''}
            </Typography>
            <form>
                <Grid py={10} container spacing={5} justifyContent="center" alignItems="center">
                    {/* Select Your Coach  */}
                    <Grid item xs={12}>
                        <Box p={6} style={{ width: '100%', borderRadius: 20, backgroundColor: '#f3f3f3' }}>
                            {toggleCoachIdForm ? (
                                <React.Fragment>
                                    <Grid item xs={12} pb={4}>
                                        <Typography component="div" mt={1} variant="body" color="gray">
                                            If you want have interview with specific coach you shoul enter coach code here or leave this
                                            section
                                        </Typography>
                                    </Grid>

                                    {selectedCoach && (
                                        <Grid pb={4} item xs={12}>
                                            <Typography pb={1} variant="h4" color="green">
                                                Selected Coach
                                            </Typography>
                                            <Typography>
                                                <span style={{ fontWeight: 'bold' }}>Name:</span> {selectedCoach.name}
                                            </Typography>
                                            <Typography>
                                                <span style={{ fontWeight: 'bold' }}>Amount:</span> {selectedCoach.amount} toman
                                            </Typography>
                                            <Typography>
                                                <span style={{ fontWeight: 'bold' }}>Stack:</span>{' '}
                                                {defineCoachStackLabel(selectedCoach.stack)}
                                            </Typography>
                                            <Typography>
                                                <span style={{ fontWeight: 'bold' }}>Status:</span>{' '}
                                                {selectedCoach.status ? (
                                                    'active'
                                                ) : (
                                                    <span style={{ color: 'red', fontWeight: 'bolder' }}>NOT ACTVE</span>
                                                )}
                                            </Typography>
                                            {!selectedCoach.status && (
                                                <Typography color="red" pt={1}>
                                                    This coach not selected for you and you can define a session with one of the best coach
                                                    in the team or use another coch code
                                                </Typography>
                                            )}
                                        </Grid>
                                    )}

                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            id="coach_id"
                                            name="coach_id"
                                            label="Enter Coach Code"
                                            value={coachIdInput}
                                            onChange={(e) => setcoachIdInput(e.target.value)}
                                            error={coachIdInputError}
                                            helperText={coachIdInputError && coachIdInputError}
                                        />
                                        <Box display="flex" justifyContent="space-between" mt={2}>
                                            <LoadingButton
                                                loading={coachByCodeIsLoading}
                                                type="button"
                                                variant="contained"
                                                onClick={handleSubmitCoachCode}
                                            >
                                                Submit
                                            </LoadingButton>
                                            <Button color="error" type="button" variant="contained" onClick={cancelCoachByCodeForm}>
                                                Cancel
                                            </Button>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} pt={2}>
                                        <Typography href={`${process.env.rootDomain}/coach-list`} component="a" variant="body" color="blue">
                                            or you can find in the list
                                        </Typography>
                                    </Grid>
                                </React.Fragment>
                            ) : (
                                <Grid item xs={12} p={2}>
                                    <Button
                                        onClick={() => settoggleCoachIdForm(true)}
                                        fullWidth
                                        p={4}
                                        component="label"
                                        type="button"
                                        variant="contained"
                                    >
                                        Select Specific Coach
                                    </Button>
                                    <Typography align="center" component="div" mt={1} variant="body" color="gray">
                                        Or Get an appointment with one of our senior team member
                                    </Typography>

                                    <Typography align="center" component="div" variant="body" color="gray">
                                        In this case please skip here and fill below form
                                    </Typography>
                                </Grid>
                            )}
                        </Box>
                        <Divider sx={{ marginLeft: 0, width: '100%', paddingTop: '20px', listStyle: 'none' }} variant="inset" />
                    </Grid>

                    {/* English/Persian Interview */}
                    <Grid item xs={12}>
                        <InputLabel id="demo-simple-select-helper-label">Select Your Interview For</InputLabel>
                        <Select
                            fullWidth
                            disabled={disableLanguageSelectInput}
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            name="origin"
                            label="origin"
                            value={formik.values.origin}
                            onChange={formik.handleChange}
                            error={formik.touched.origin && Boolean(formik.errors.origin)}
                        >
                            <MenuItem value="ENG">English Company</MenuItem>
                            <MenuItem value="PR">Persian Company</MenuItem>
                        </Select>
                        <FormHelperText>Select Your Interview for Iraninan comapny or English company</FormHelperText>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InputLabel id="demo-simple-select-helper-label">Your Stack</InputLabel>
                        <Select
                            fullWidth
                            disabled={disableStackSlectInput}
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            name="stack"
                            label="stack"
                            value={formik.values.stack}
                            onChange={formik.handleChange}
                            error={formik.touched.stack && Boolean(formik.errors.stack)}
                        >
                            <MenuItem value="FRONT_END">WEB - Front-End</MenuItem>
                            <MenuItem value="BACK_END">WEB - Back-End</MenuItem>
                            <MenuItem value="FULL_STACK">Web - Full-Stack</MenuItem>
                            <MenuItem value="ANDROID">Mobile - Android</MenuItem>
                            <MenuItem value="IOS">Mobile - IOS</MenuItem>
                            <MenuItem value="DEVOPS">DevOps</MenuItem>
                        </Select>
                        <FormHelperText>Select Your Stack</FormHelperText>
                    </Grid>
                    {/* [Level] Input */}
                    <Grid item xs={12} md={6}>
                        <InputLabel id="level-input">Select Your Development experiance level</InputLabel>
                        <Select
                            fullWidth
                            labelId="level-input"
                            id="level-input-select"
                            name="level"
                            label="level"
                            value={formik.values.level}
                            onChange={formik.handleChange}
                            error={formik.touched.level && Boolean(formik.errors.level)}
                        >
                            <MenuItem value="JUNIOR">Junior</MenuItem>
                            <MenuItem value="MID_LEVEL">Mid-Level</MenuItem>
                            <MenuItem value="SENIOR">Senior</MenuItem>
                        </Select>
                        <FormHelperText>Select Your level</FormHelperText>
                    </Grid>

                    {/* Upload Resume Section */}

                    <Grid item xs={12} py="6">
                        {/* CASE: 2 - When user Have Resume (Change Resume / Watch Resume) */}

                        {savedResumeFile ? (
                            <Box p={6} style={{ width: '100%', borderRadius: 20, backgroundColor: '#f3f3f3' }}>
                                <Typography variant="h4">Upload Or Change Your Resume</Typography>
                                <Typography pt={3} variant="h5" color="gray">
                                    The selected file will be consider for this interview if you want, you can change your resume and upload
                                    again
                                </Typography>
                                <Box pb={1} pt={5}>
                                    {FileData()}
                                </Box>

                                <a style={{ color: '#364152', textDecoration: 'none' }} href="#">
                                    <Box
                                        p={3}
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            border: '1px solid #364152',
                                            borderRadius: '20px',
                                            width: { xs: '100%', sm: 'calc(50% - 20px)', md: 'calc(33% - 20px)' }
                                        }}
                                    >
                                        <InsertDriveFileIcon style={{ fontSize: '3rem' }} />

                                        <Typography pt={1} variant="body1">
                                            Watch Your Resume
                                        </Typography>
                                    </Box>
                                </a>

                                <Box style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '80%' }} pt={3}>
                                    <Button mr={4} component="label" type="button" variant="contained" endIcon={<ChangeCircleIcon />}>
                                        <input hidden type="file" onChange={onFileChange} /> Change Resume
                                    </Button>

                                    <Button
                                        disabled={!selectedFile}
                                        ml={6}
                                        type="button"
                                        onClick={onFileUpload}
                                        variant="contained"
                                        endIcon={<CloudUploadIcon />}
                                    >
                                        Upload
                                    </Button>
                                </Box>
                            </Box>
                        ) : (
                            <Box p={6} style={{ width: '100%', borderRadius: 20, backgroundColor: '#f3f3f3' }}>
                                <Typography variant="h4">Please Upload Your Resume</Typography>
                                <Typography pt={3} variant="h5" color="gray">
                                    you should upload your resume for get feedback after interview session and we give you best advice to
                                    improve your resume
                                </Typography>
                                <Box pb={1} pt={5}>
                                    {FileData()}
                                </Box>
                                <Box style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '80%' }} pt={3}>
                                    <Button mr={4} component="label" type="button" variant="contained" endIcon={<AddIcon />}>
                                        <input hidden type="file" onChange={onFileChange} /> Select Resume
                                    </Button>

                                    <Button
                                        disabled={!selectedFile || uploadbuttonDisable}
                                        ml={6}
                                        type="button"
                                        onClick={onFileUpload}
                                        variant="contained"
                                        endIcon={<CloudUploadIcon />}
                                    >
                                        Upload
                                    </Button>
                                </Box>
                            </Box>
                        )}

                        {/* CASE: 1 - When User Not Have Resume In Profile and should upload */}
                    </Grid>

                    {/* Github Profile Input */}

                    <Grid item xs={12} pt={4}>
                        <Divider sx={{ marginLeft: 0, width: '100%', paddingTop: '20px', listStyle: 'none' }} variant="inset" />
                        <Typography pt={4} variant="h4">
                            Social Media
                        </Typography>

                        <Typography component="div" mt={3} variant="body" color="gray">
                            If you have github or Linkedin Account, You can send it for us and we will give you some improvement on it
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="github_profile"
                            name="githubProfile"
                            label="Github profile url"
                            value={formik.values.githubProfile}
                            onChange={formik.handleChange}
                            error={formik.touched.githubProfile && Boolean(formik.errors.githubProfile)}
                            helperText={formik.touched.githubProfile && formik.errors.githubProfile}
                        />
                    </Grid>

                    {/* Linkdin Profile input */}

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            id="linkedin_profile"
                            name="linkdinProfile"
                            label="Linkedin profile url"
                            value={formik.values.linkdinProfile}
                            onChange={formik.handleChange}
                            error={formik.touched.linkdinProfile && Boolean(formik.errors.linkdinProfile)}
                            helperText={formik.touched.linkdinProfile && formik.errors.linkdinProfile}
                        />
                    </Grid>

                    <Grid display="flex" justifyContent="center" item xs={12} pt={10}>
                        <LoadingButton
                            size="large"
                            loading={loadingCreateMutation}
                            px={12}
                            type="button"
                            onClick={formik.handleSubmit}
                            variant="contained"
                        >
                            Apply
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default CreateInterview;

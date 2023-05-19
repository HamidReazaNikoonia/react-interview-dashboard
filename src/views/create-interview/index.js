/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';

// material-ui
import { Grid, Typography, InputLabel, MenuItem, FormHelperText, FormControl, TextField, Box, Button, Divider } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

// project imports
import MainCard from 'ui-component/cards/MainCard';

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
    const [savedResumeFile, setSavedResumeFile] = React.useState('867678');

    const formik = useFormik({
        initialValues: {
            stack: 'FULL_STACK',
            level: 'JUNIOR',
            linkdinProfile: '',
            githubProfile: ''
        },
        validationSchema: validationSchema,
        // validadeOnMount: true,
        isInitialValid: false,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
            toast.success('Your Interview Session Created');
            toast.error('some error', {
                position: 'top-right'
            });
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
        setselectedFile(event.target.files[0]);
        console.log(selectedFile);
    };

    const onFileUpload = () => {
        // Create an object of formData
        event.preventDefault();
        const formData = new FormData();

        // Update the formData object
        formData.append('upload', selectedFile, selectedFile?.name);

        // Details of the uploaded file
        setResumeFile('87897');
        toast.success('Your Resume successfully Uploaded');

        // Request made to the backend api
        // Send formData object
        // axios.post("api/uploadfile", formData);
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
        console.log(formik);
    }, [formik, formValidation]);

    // file upload is complete
    const FileData = () => {
        if (selectedFile) {
            return (
                <div>
                    <Typography pb={2} variant="h5">
                        {' '}
                        File Details{' '}
                    </Typography>
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

    return (
        <MainCard title="Create New Interview Session">
            <Typography variant="body2">
                Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut
                enif ad minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue
                dolor in reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president,
                sunk in culpa qui officiate descent molls anim id est labours.
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid py={10} container spacing={5} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <InputLabel id="demo-simple-select-helper-label">Your Stack</InputLabel>
                        <Select
                            fullWidth
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
                            loading
                            px={12}
                            type="button"
                            onClick={() => {
                                console.log('');
                            }}
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

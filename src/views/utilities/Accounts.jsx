import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Grid, Stepper, Step, StepLabel, StepIcon, Button, TextField, Typography, MenuItem, Box
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import ReviewIcon from '@mui/icons-material/AssignmentTurnedIn';

const NewAccountForm = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [accountType, setAccountType] = useState('');
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });
    const [kycType, setKycType] = useState('');
    const [kycNumber, setKycNumber] = useState('');

    const [accountTypes, setAccountTypes] = useState([]);
    const [KYCOptions, setKYCOptions] = useState([]);

    useEffect(() => {
        // Fetch account types
        axios.get('http://localhost:8080/api/account-types')
            .then(response => {
                setAccountTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching account types:', error);
            });

        // Fetch KYC options
        axios.get('http://localhost:8080/api/kyc-options')
            .then(response => {
                setKYCOptions(response.data);
            })
            .catch(error => {
                console.error('Error fetching KYC options:', error);
            });
    }, []);

    const steps = [
        { label: 'Choose Account Type', icon: <AccountCircleIcon /> },
        { label: 'User Information', icon: <PersonIcon /> },
        { label: 'KYC Details', icon: <SecurityIcon /> },
        { label: 'Review & Submit', icon: <ReviewIcon /> },
    ];

    const handleNext = () => {
        if (canProceedToNextStep()) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const canProceedToNextStep = () => {
        switch (activeStep) {
            case 0:
                return accountType !== '';
            case 1:
                return userInfo.name && userInfo.email && userInfo.phone && userInfo.address;
            case 2:
                return kycType !== '' && kycNumber !== '';
            default:
                return true;
        }
    };

    const handleInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleKYCChange = (e) => {
        setKycType(e.target.value);
    };

    const handleSubmit = () => {
        // Handle final form submission here
        console.log('Account Type:', accountType);
        console.log('User Info:', userInfo);
        console.log('KYC Type:', kycType);
        console.log('KYC Number:', kycNumber);
    };

    return (
        <MainCard title="Open New Account">
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel StepIconComponent={() => <StepIcon>{step.icon}</StepIcon>}>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <SubCard>
                {activeStep === 0 && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Account Type"
                                value={accountType}
                                onChange={(e) => setAccountType(e.target.value)}
                                fullWidth
                                variant="outlined"
                            >
                                {accountTypes.map((option) => (
                                    <MenuItem key={option.accountTypeID} value={option.accountTypeID}>
                                        {option.accountTypeLabel}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                )}

                {activeStep === 1 && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Full Name"
                                name="name"
                                value={userInfo.name}
                                onChange={handleInputChange}
                                fullWidth
                                variant="outlined"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email Address"
                                name="email"
                                value={userInfo.email}
                                onChange={handleInputChange}
                                fullWidth
                                variant="outlined"
                                type="email"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone Number"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleInputChange}
                                fullWidth
                                variant="outlined"
                                type="tel"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Address"
                                name="address"
                                value={userInfo.address}
                                onChange={handleInputChange}
                                fullWidth
                                variant="outlined"
                                multiline
                                required
                            />
                        </Grid>
                    </Grid>
                )}

                {activeStep === 2 && (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="KYC Document Type"
                                value={kycType}
                                onChange={handleKYCChange}
                                fullWidth
                                variant="outlined"
                                required
                            >
                                {KYCOptions.map((option) => (
                                    <MenuItem key={option.kycOptionID} value={option.kycOptionID}>
                                        {option.kycOptionLabel}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="KYC Document Number"
                                value={kycNumber}
                                onChange={(e) => setKycNumber(e.target.value)}
                                fullWidth
                                variant="outlined"
                                required
                            />
                        </Grid>
                    </Grid>
                )}

                {activeStep === 3 && (
                    <Box>
                        <Typography variant="h6">Review Details</Typography>
                        <Typography variant="body1"><strong>Account Type:</strong> {accountTypes.find(type => type.accountTypeID === accountType).accountTypeLabel}</Typography>
                        <Typography variant="body1"><strong>Name:</strong> {userInfo.name}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {userInfo.email}</Typography>
                        <Typography variant="body1"><strong>Phone:</strong> {userInfo.phone}</Typography>
                        <Typography variant="body1"><strong>Address:</strong> {userInfo.address}</Typography>
                        <Typography variant="body1"><strong>KYC Type:</strong> {KYCOptions.find(op => op.kycOptionID === kycType).kycOptionLabel}</Typography>
                        <Typography variant="body1"><strong>KYC Number:</strong> {kycNumber}</Typography>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Box>
                )}

                <Box mt={2}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="outlined"
                        color="secondary"
                    >
                        Back
                    </Button>
                    {activeStep < steps.length - 1 && (
                        <Button
                            disabled={!canProceedToNextStep()}
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            style={{ marginLeft: '10px' }}
                        >
                            Next
                        </Button>
                    )}
                </Box>
            </SubCard>
        </MainCard>
    );
};

export default NewAccountForm;

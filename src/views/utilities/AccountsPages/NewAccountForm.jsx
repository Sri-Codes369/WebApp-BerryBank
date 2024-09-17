import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    Grid, Stepper, Step, StepLabel, Button, TextField, Typography, MenuItem, Box
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import ReviewIcon from '@mui/icons-material/AssignmentTurnedIn';
import AuthService from 'services/AuthService';
import { Toast } from 'primereact/toast';

const NewAccountForm = ({_accountTypeID}) => {
   
    const [activeStep, setActiveStep] = useState(0);
    const [accountTypeId, setAccountTypeId] = useState('');  // DTO: AccountTypeId
    const [userInfo, setUserInfo] = useState({
        fullName: '',  // DTO: FullName
        email: '',     // DTO: Email
        phone: '',     // DTO: Phone
        address: '',   // DTO: Address
    });
    const [kycDocumentTypeId, setKycDocumentTypeId] = useState('');  // DTO: KycDocumentTypeId
    const [kycDocumentNumber, setKycDocumentNumber] = useState('');  // DTO: KycDocumentNumber

    const [accountTypes, setAccountTypes] = useState([]);
    const [KYCOptions, setKYCOptions] = useState([]);

    const toast = useRef(null)

    useEffect(() => {
        if (_accountTypeID ===1 || _accountTypeID ===2 || _accountTypeID ===3) {
            setAccountTypeId(_accountTypeID)
        }
        // Fetch account types
        axios.get('http://localhost:8080/api/account-types', { withCredentials: true })
            .then(response => {
                setAccountTypes(response.data);
            })
            .catch(error => {
                console.error('Error fetching account types:', error);
            });

        // Fetch KYC options
        axios.get('http://localhost:8080/api/kyc-options', { withCredentials: true })
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
                return accountTypeId !== '';
            case 1:
                return userInfo.fullName && userInfo.email && userInfo.phone && userInfo.address;
            case 2:
                return kycDocumentTypeId !== '' && kycDocumentNumber !== '';
            default:
                return true;
        }
    };

    const handleInputChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        console.log(AuthService.getUserFromToken()?.userId);
        
        // Prepare the DTO object
        const accountData = {
            userID: AuthService.getUserFromToken().userId,  // Assuming you will fetch this from the authenticated user
            accountTypeId, 
            fullName: userInfo.fullName,
            email: userInfo.email,
            phone: userInfo.phone,
            address: userInfo.address,
            kycDocumentTypeId,
            kycDocumentNumber
        };

        // Log the data
        console.log('Submitting the following data:', accountData);

        // Call the API
        axios.post('http://localhost:8080/api/acc-insert', accountData, { withCredentials: true })
            .then(response => {
              
                
                if (response.data.Code === 0) {
                    toast.current.show({ severity: 'success', summary: 'Success', detail: 'Request for new account is successful !', life: 3000 });
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                } else if (response.data.Code === 1) {
                    toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'Account already exists', life: 3000 });
                }else if (response.data.Code === 500) {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Account creation failed. Please try again.', life: 3000 });
                }

            })
            .catch(error => {
                console.error('Error creating account:', error);
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Account creation failed. Please try again.', life: 3000 });
            });
    };

    return (
       
        <MainCard title="Open New Account">
             <Toast ref={toast} position='top-center' />
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepLabel>{step.label}</StepLabel>
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
                                value={accountTypeId}
                                onChange={(e) => setAccountTypeId(e.target.value)}
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
                                name="fullName"
                                value={userInfo.fullName}
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
                                value={kycDocumentTypeId}
                                onChange={(e) => setKycDocumentTypeId(e.target.value)}
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
                                value={kycDocumentNumber}
                                onChange={(e) => setKycDocumentNumber(e.target.value)}
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
                        <Typography variant="body1"><strong>Account Type:</strong> {accountTypes.find(type => type.accountTypeID === accountTypeId)?.accountTypeLabel}</Typography>
                        <Typography variant="body1"><strong>Name:</strong> {userInfo.fullName}</Typography>
                        <Typography variant="body1"><strong>Email:</strong> {userInfo.email}</Typography>
                        <Typography variant="body1"><strong>Phone:</strong> {userInfo.phone}</Typography>
                        <Typography variant="body1"><strong>Address:</strong> {userInfo.address}</Typography>
                        <Typography variant="body1"><strong>KYC Type:</strong> {KYCOptions.find(op => op.kycOptionID === kycDocumentTypeId)?.kycOptionLabel}</Typography>
                        <Typography variant="body1"><strong>KYC Number:</strong> {kycDocumentNumber}</Typography>
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

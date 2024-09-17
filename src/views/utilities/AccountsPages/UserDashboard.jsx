import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import axios from 'axios';
import { TabView, TabPanel } from 'primereact/tabview';
import NewAccountForm from './NewAccountForm'; // Import the NewAccountForm component
import AuthService from 'services/AuthService';
import {  Card, CardContent, Divider } from '@mui/material';
import { styled } from '@mui/system';

const UserDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [accountTypeId, setAccountTypeId] = useState(1);
  const [accountTypes, setAccountTypes] = useState([]);
 

  const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: theme.shadows[3],
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
}));

  useEffect(() => {
     // Define account types with id and type
//   setAccountTypes([
//     { id: 1, type: 'Savings Account' },
//     { id: 2, type: 'Current Account' },
//     { id: 3, type: 'Salary Account' },
//   ]);
     // Fetch account types
     axios.get('http://localhost:8080/api/account-types', { withCredentials: true })
     .then(response => {
         setAccountTypes(response.data);
     })
     .catch(error => {
         console.error('Error fetching account types:', error);
     });

    // Fetch user accounts
    axios.get('http://localhost:8080/api/account-details', {
      params: {
        userId: AuthService.getUserFromToken().userId
      },
      withCredentials: true
    })
      .then(response => {
        // Ensure response data is an array
        if (Array.isArray(response.data)) {
          setAccounts(response.data);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      })
      .catch(error => {
        console.error('Error fetching accounts:', error);
      });
  }, []);

  const handleTabChange = (e) => {
    const selectedType = accountTypes[e.index];
    setActiveTab(e.index);
    setAccountTypeId(selectedType.accountTypeID); // Set the account type ID based on the selected tab
  };

  const renderAccountTabs = () => (
    <TabView activeIndex={activeTab} onTabChange={handleTabChange}>
      {accountTypes.map((type) => (
        <TabPanel header={type.accountTypeLabel} key={type.accountTypeID}>
          {accounts
            .filter(account => account.accountTypeId === type.accountTypeID)
            .map(account => (
                <StyledCard>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Account Number: {account.accountNumber}
                    </Typography>
                    <Divider />
                    <Box mt={2}>
                        <Typography variant="body1" color="textSecondary">
                            <strong>Balance:</strong> ₹ {account.balanceAmount}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            <strong>Status:</strong> {account.accountStatus}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            <strong>IFSC:</strong> {account.ifsc}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            <strong>Created At:</strong> {new Date(account.createdAt).toLocaleDateString()}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            <strong>Remarks:</strong> {account.remarks}
                        </Typography>
                    </Box>
                </CardContent>
            </StyledCard>
            ))}
          {/* Show the NewAccountForm if no accounts are present under this tab */}
          {accounts.filter(account => account.accountTypeId === type.accountTypeID).length === 0 && (
            <Box padding={2}>
              <Typography variant="body1">No accounts of this type. Please create a new one.</Typography>
              <NewAccountForm _accountTypeID={accountTypeId} />
            </Box>
          )}
        </TabPanel>
      ))}
    </TabView>
  );

  return (
    <Box>
      <Typography variant="h5">Your Accounts</Typography>
      {renderAccountTabs()}
    </Box>
  );
};

export default UserDashboard;

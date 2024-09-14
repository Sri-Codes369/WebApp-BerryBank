import React, { useState, useEffect } from 'react';
import NewAccountForm from './NewAccountForm';
import { Button, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import axios from 'axios';

const UserDashboard = () => {
    const [accounts, setAccounts] = useState([]);
    const [showNewAccountForm, setShowNewAccountForm] = useState(false);

    useEffect(() => {
        // Fetch user accounts
        axios.get('http://localhost:8080/api/user-accounts', { withCredentials: true })
            .then(response => {
                setAccounts(response.data);
            })
            .catch(error => {
                console.error('Error fetching accounts:', error);
            });
    }, []);

    return (
        <Box>
            {accounts.length > 0 ? (
                <>
                    <Typography variant="h5">Your Accounts</Typography>
                    <List>
                        {accounts.map((account) => (
                            <ListItem key={account.accountID}>
                                <ListItemText
                                    primary={`Account Number: ${account.accountNumber}`}
                                    secondary={`Balance: $${account.balance}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </>
            ) : (
                <Box>
                    <Typography variant="h6">You don't have any accounts yet.</Typography>
                    <Button variant="contained" color="primary" onClick={() => setShowNewAccountForm(true)}>
                        Create New Account
                    </Button>
                    {showNewAccountForm && <NewAccountForm />}
                </Box>
            )}
        </Box>
    );
};

export default UserDashboard;

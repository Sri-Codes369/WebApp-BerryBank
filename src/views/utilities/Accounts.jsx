import React, { useState, useEffect } from 'react';
import UserDashboard from './AccountsPages/UserDashboard';
import AdminDashboard from './AccountsPages/AdminDashboard';
import { Typography, Box, AppBar, Toolbar, Button, MenuItem, Select } from '@mui/material';
import AuthService from 'services/AuthService';

const MainPage = () => {
    const [userRoleId, setUserRoleId] = useState(null);

    useEffect(() => {
        // Fetch user role from an API or local storage
        const roleID = AuthService.getUserFromToken().roleId; // Assuming role is stored locally for now
        console.log("get user roles");
        console.log(roleID);
        
        console.log();
        
        setUserRoleId(roleID);
    }, []);

    const handleRoleChange = (event) => {
        setUserRoleId(event.target.value);
    };

    return (
        <div>

            <Box m={3}>
                {userRoleId === 1 && <AdminDashboard />}
                {userRoleId === 2 && <UserDashboard />}
            </Box>
        </div>
    );
};

export default MainPage;

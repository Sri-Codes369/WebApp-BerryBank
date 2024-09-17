import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import axios from 'axios';

// PrimeReact components
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';

import { gridSpacing } from 'store/constant';

// ===============================|| SHADOW BOX ||=============================== //

const ShadowBox = ({ shadow }) => {
  return (
    <Card sx={{ mb: 3, boxShadow: shadow }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: 4.5,
          bgcolor: 'primary.light',
          color: 'grey.800'
        }}
      >
        <Box sx={{ color: 'inherit' }}>boxShadow: {shadow}</Box>
      </Box>
    </Card>
  );
};

ShadowBox.propTypes = {
  shadow: PropTypes.string.isRequired
};

// ============================|| USERS PAGE ||============================ //

const Users = () => {
  const theme = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = React.useRef(null);

  useEffect(() => {
    // Fetch users from the API
    axios.get('http://localhost:8080/api/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
        setLoading(false);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch users' });
      });
  }, []);

  return (
    <MainCard title="User List" secondary={<SecondaryAction link="https://next.material-ui.com/system/shadows/" />}>
      <Toast ref={toast} />
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard title="User Details">
            <DataTable value={users} loading={loading} paginator rows={10} responsiveLayout="scroll">
              <Column field="userId" header="User ID" sortable />
              <Column field="userName" header="Username" sortable />
              <Column field="firstName" header="First Name" sortable />
              <Column field="lastName" header="Last Name" sortable />
              <Column field="email" header="Email" sortable />
              <Column field="phone" header="Phone" sortable />
              <Column field="address" header="Address" sortable body={(rowData) => <span>{rowData.address ? 'Address Available' : 'No Address'}</span>} />
            </DataTable>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Users;

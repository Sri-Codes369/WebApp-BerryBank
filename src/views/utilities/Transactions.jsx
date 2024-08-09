import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { gridSpacing } from 'store/constant';
import ConfigurableTransactionTable from 'ui-component/ConfigurableTransactionTable';

const columns = [
  { id: 'description', label: 'Description' },
  { id: 'id', label: 'Transaction ID' },
  { id: 'type', label: 'Type' },
  { id: 'card', label: 'Card' },
  { id: 'date', label: 'Date' },
  { id: 'amount', label: 'Amount' },
  { id: 'receipt', label: 'Receipt' },
];

const transactionData = [
  { id: 1, date: '28 Jan, 12:30 AM', description: 'Spotify Subscription', type: 'Shopping', card: '1234 ****', amount: '-$2,500', income: false },
  { id: 2, date: '25 Jan, 10:40 PM', description: 'Freepik Sales', type: 'Transfer', card: '1234 ****', amount: '+$750', income: true },
  { id: 3, date: '20 Jan, 10:40 PM', description: 'Mobile Service', type: 'Service', card: '1234 ****', amount: '-$150', income: false },
  { id: 4, date: '15 Jan, 03:29 PM', description: 'Wilson', type: 'Transfer', card: '1234 ****', amount: '-$1,050', income: false },
  { id: 5, date: '14 Jan, 10:40 PM', description: 'Emilly', type: 'Transfer', card: '1234 ****', amount: '+$840', income: true },
];

const Transactions = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredTransactions = transactionData.filter((transaction) => {
    if (tabValue === 1) return transaction.income;
    if (tabValue === 2) return !transaction.income;
    return true;
  });

  return (
    <MainCard title="Recent Transactions">
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Tabs value={tabValue} onChange={handleChange} indicatorColor="primary" textColor="primary">
            <Tab label="All Transactions" />
            <Tab label="Income" />
            <Tab label="Expense" />
          </Tabs>
          <SubCard>
            <ConfigurableTransactionTable
              rows={filteredTransactions}
              columns={columns}
              rowsPerPageOptions={[3,5, 10, 25]}
              defaultRowsPerPage={10}
              showRowsPerPageOptions={true} // Hide the dropdown for rows per page
              sortable={true} // Enable sorting
            />
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Transactions;

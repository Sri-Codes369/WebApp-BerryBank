import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { TabView, TabPanel } from 'primereact/tabview';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import axios from 'axios';
import AuthService from 'services/AuthService'; // Assuming you have AuthService
import 'primereact/resources/themes/saga-blue/theme.css';  // PrimeReact theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

// Columns based on the actual DTO from your API
const Transactions = () => {
  const [tabValue, setTabValue] = useState(0);
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const user = AuthService.getUserFromToken();
      const queryType = user.roleId === 1 ? 1 : 2;
      const userId = user.userId;

      const response = await axios.get('http://localhost:8080/api/transactions', {
        params: {
          queryType: queryType,
          userId: userId,
        },
      });

      // Set transactions based on the API response
      setTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [tabValue]);

  // Filtering the transactions based on tab selection (Income/Expense)
  const filteredTransactions = transactions.filter((transaction) => {
    if (tabValue === 1) return transaction.transactionType === 'Credit';
    if (tabValue === 2) return transaction.transactionType === 'Debit';
    return true;
  });

  // Template for Amount column to style positive (green) and negative (red) amounts
  const amountBodyTemplate = (rowData) => {
    const amount = rowData.amount;
    const color = amount < 0 ? 'red' : 'green';
    return <span style={{ color: color }}>{amount < 0 ? '-' : '+'}${Math.abs(amount)}</span>;
  };

  // Template for Transaction Type column to style based on Credit/Debit
  const transactionTypeTemplate = (rowData) => {
    const type = rowData.transactionType;
    const color = type === 'Credit' ? 'green' : 'red';
    return <span style={{ color: color }}>{type}</span>;
  };

  return (
    <MainCard title="Transactions">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TabView activeIndex={tabValue} onTabChange={(e) => setTabValue(e.index)}>
            <TabPanel header="All Transactions">
              <DataTable value={filteredTransactions} paginator rows={10} rowsPerPageOptions={[3, 5, 10, 25]}>
                <Column field="transactionId" header="Transaction ID" sortable />
                <Column field="senderName" header="Sender" sortable />
                <Column field="recipientName" header="Recipient" sortable />
                <Column field="amount" header="Amount" body={amountBodyTemplate} sortable />
                <Column field="transactionDate" header="Transaction Date" sortable />
                <Column field="status" header="Status" sortable />
                <Column field="transactionType" header="Transaction Type" body={transactionTypeTemplate} sortable />
                <Column field="referenceNumber" header="Reference Number" sortable />
              </DataTable>
            </TabPanel>
            <TabPanel header="Income">
              <DataTable value={filteredTransactions} paginator rows={10} rowsPerPageOptions={[3, 5, 10, 25]}>
                <Column field="transactionId" header="Transaction ID" sortable />
                <Column field="senderAccountId" header="Sender Account ID" sortable />
                <Column field="recipientFullName" header="Recipient Full Name" sortable />
                <Column field="amount" header="Amount" body={amountBodyTemplate} sortable />
                <Column field="transactionDate" header="Transaction Date" sortable />
                <Column field="status" header="Status" sortable />
                <Column field="transactionType" header="Transaction Type" body={transactionTypeTemplate} sortable />
                <Column field="referenceNumber" header="Reference Number" sortable />
              </DataTable>
            </TabPanel>
            <TabPanel header="Expense">
              <DataTable value={filteredTransactions} paginator rows={10} rowsPerPageOptions={[3, 5, 10, 25]}>
                <Column field="transactionId" header="Transaction ID" sortable />
                <Column field="senderAccountId" header="Sender Account ID" sortable />
                <Column field="recipientFullName" header="Recipient Full Name" sortable />
                <Column field="amount" header="Amount" body={amountBodyTemplate} sortable />
                <Column field="transactionDate" header="Transaction Date" sortable />
                <Column field="status" header="Status" sortable />
                <Column field="transactionType" header="Transaction Type" body={transactionTypeTemplate} sortable />
                <Column field="referenceNumber" header="Reference Number" sortable />
              </DataTable>
            </TabPanel>
          </TabView>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Transactions;

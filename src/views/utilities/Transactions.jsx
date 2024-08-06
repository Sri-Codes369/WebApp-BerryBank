// material-ui
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import MuiTypography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

// Sample data for transactions
const transactionData = [
  { id: 1, date: '2024-08-01', description: 'Payment Received', amount: '$200.00' },
  { id: 2, date: '2024-08-02', description: 'Purchase at Store', amount: '-$50.00' },
  { id: 3, date: '2024-08-03', description: 'Transfer to Account', amount: '-$100.00' },
  { id: 4, date: '2024-08-04', description: 'Refund Issued', amount: '$30.00' }
];

const Transactions = () => (
  <MainCard title="Transactions" secondary={<SecondaryAction link="#" />}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <SubCard>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactionData.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </SubCard>
      </Grid>
    </Grid>
  </MainCard>
);

export default Transactions;

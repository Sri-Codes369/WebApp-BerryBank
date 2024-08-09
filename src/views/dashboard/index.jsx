import { useEffect, useState } from 'react';

// material-ui
import Grid from '@mui/material/Grid';

// project imports
import EarningCard from './EarningCard';
import PopularCard from './PopularCard';
import TotalOrderLineChartCard from './TotalOrderLineChartCard';
import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import TotalIncomeLightCard from './TotalIncomeLightCard';
import TotalGrowthBarChart from './TotalGrowthBarChart';
import TotalDepositedCard from './TotalDepositedCard'

import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import WalletIcon from '@mui/icons-material/Wallet';
import SavingsIcon from '@mui/icons-material/Savings';
import DebitCard from 'ui-component/DebitCard';
import CreditCard from 'ui-component/CreditCard';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import SubCard from 'ui-component/cards/SubCard';
import ConfigurableTransactionTable from 'ui-component/ConfigurableTransactionTable';
const cardData = [
  {
    id: 1,
    type: 'Credit Card',
    cardNumber: '**** **** **** 1234',
    cardHolder: 'John Doe',
    expiryDate: '08/25',
    balance: '$5,000.00',
  },
  {
    id: 2,
    type: 'Debit Card',
    cardNumber: '**** **** **** 5678',
    cardHolder: 'Jane Smith',
    expiryDate: '11/24',
    balance: '$1,200.00',
  },
  {
    id: 3,
    type: 'Credit Card',
    cardNumber: '**** **** **** 9078',
    cardHolder: 'Mark Polo',
    expiryDate: '11/24',
    balance: '$11,200.00',
  }
];


const columns = [

  { id: 'id', label: 'Transaction ID' },
  { id: 'type', label: 'Type' },
  { id: 'card', label: 'Card' },
  { id: 'date', label: 'Date' },
  { id: 'amount', label: 'Amount' },
 
];

const transactionData = [
  { id: 1, date: '28 Jan, 12:30 AM', description: 'Spotify Subscription', type: 'Shopping', card: '1234 ****', amount: '-$2,500', income: false },
  { id: 2, date: '25 Jan, 10:40 PM', description: 'Freepik Sales', type: 'Transfer', card: '1234 ****', amount: '+$750', income: true },
  { id: 3, date: '20 Jan, 10:40 PM', description: 'Mobile Service', type: 'Service', card: '1234 ****', amount: '-$150', income: false },
  { id: 4, date: '15 Jan, 03:29 PM', description: 'Wilson', type: 'Transfer', card: '1234 ****', amount: '-$1,050', income: false },
  { id: 5, date: '14 Jan, 10:40 PM', description: 'Emilly', type: 'Transfer', card: '1234 ****', amount: '+$840', income: true },
];


// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing} direction="row" alignItems="flex-start">
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalIncomeDarkCard
              {...{
                isLoading: isLoading,
                total: 203,
                label: 'Total Balance',
                icon: <SavingsIcon fontSize="inherit" />
              }}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalDepositedCard
              {...{
                isLoading: isLoading,
                total: 203,
                label: 'Deposit',
                icon: <WalletIcon fontSize="inherit" />
              }}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalIncomeLightCard
              {...{
                isLoading: isLoading,
                total: 203,
                label: 'Total Spending',
                icon: <WalletIcon fontSize="inherit" />
              }}
            />
          </Grid>
          
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Carousel
              showThumbs={true}
              showStatus={true}
              infiniteLoop
              useKeyboardArrows
              autoPlay
              dynamicHeight
            >
              {cardData.map((card) => (
                <div key={card.id}>
                  {card.type === 'Credit Card' ? (
                    <CreditCard
                      cardHolder={card.cardHolder}
                      cardNumber={card.cardNumber}
                      expiryDate={card.expiryDate}
                      balance={card.balance}
                    />
                  ) : (
                    <DebitCard
                      cardHolder={card.cardHolder}
                      cardNumber={card.cardNumber}
                      expiryDate={card.expiryDate}
                      balance={card.balance}
                    />
                  )}
                </div>
              ))}
            </Carousel>
          </Grid>
          {/* <Grid>
          <SubCard title="sub title">
            <ConfigurableTransactionTable
              rows={transactionData}
              columns={columns}
              rowsPerPageOptions={[3,5, 10, 25]}
              defaultRowsPerPage={3}
              showRowsPerPageOptions={false} // Hide the dropdown for rows per page
              sortable={true} // Enable sorting
            />
          </SubCard>
          </Grid> */}
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <PopularCard isLoading={isLoading} />
      </Grid> */}
    </Grid>
  );
};

export default Dashboard;

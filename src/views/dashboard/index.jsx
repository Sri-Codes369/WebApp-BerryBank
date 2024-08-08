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

import { gridSpacing } from 'store/constant';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import DebitCard from 'ui-component/DebitCard';
import CreditCard from 'ui-component/CreditCard';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

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
                icon: <StorefrontTwoToneIcon fontSize="inherit" />
              }}
            />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotalIncomeLightCard
              {...{
                isLoading: isLoading,
                total: 203,
                label: 'Total Spending',
                icon: <StorefrontTwoToneIcon fontSize="inherit" />
              }}
            />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Carousel
              showThumbs={false}
              showStatus={false}
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
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <PopularCard isLoading={isLoading} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

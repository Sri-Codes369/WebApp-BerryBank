import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import CreditCard from 'ui-component/CreditCard'
import DebitCard from 'ui-component/DebitCard';
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
    id: 2,
    type: 'Credit Card',
    cardNumber: '**** **** **** 9078',
    cardHolder: 'Mark Polo',
    expiryDate: '11/24',
    balance: '$11,200.00',
  }
];

const MoneyCards = () => {
  const theme = useTheme();

  return (
    <MainCard title="Card Details" secondary={<SecondaryAction link="#" />}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <SubCard title="Cards Overview">
          <Grid container spacing={gridSpacing}>
              {cardData.map((card) => (
                <Grid item xs={12} sm={6} md={5} key={card.id}>
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
                </Grid>
              ))}
            </Grid>
          </SubCard>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default MoneyCards;

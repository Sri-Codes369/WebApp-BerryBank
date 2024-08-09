import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

// ===========================|| CREDIT CARD COMPONENT ||=========================== //

const CreditCard = ({ cardHolder, cardNumber, expiryDate, balance }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: 'secondary.200',
        color: '#fff',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: '10px',
        p: 2.25,
        boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
        '&:after': {
          content: '""',
          position: 'absolute',
          width: 210,
          height: 210,
          background: theme.palette.secondary[800],
          borderRadius: '50%',
          top: { xs: -105, sm: -85 },
          right: { xs: -140, sm: -95 }
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          width: 210,
          height: 210,
          background: theme.palette.secondary[800],
          borderRadius: '50%',
          top: { xs: -155, sm: -125 },
          right: { xs: -70, sm: -15 },
          opacity: 0.5
        }
      }}
    >
      <Grid container direction="column">
        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="h6">Balance</Typography>
              <Typography
                variant="h3"
                sx={{ fontWeight: 'bold', mt: 0.5, mb: 2 }}
              >
                {balance}
              </Typography>
            </Grid>
            <Grid item>
              <Avatar
                variant="rounded"
                sx={{
                  ...theme.typography.commonAvatar,
                  ...theme.typography.mediumAvatar,
                  bgcolor: 'secondary.dark',
                  color: 'secondary.200',
                  zIndex: 1
                }}
              >
                <MoreHorizIcon fontSize="inherit" />
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">{cardHolder}</Typography>
          <Typography variant="body2">VALID THRU</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {expiryDate}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {cardNumber}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

CreditCard.propTypes = {
  cardHolder: PropTypes.string.isRequired,
  cardNumber: PropTypes.string.isRequired,
  expiryDate: PropTypes.string.isRequired,
  balance: PropTypes.string.isRequired
};

export default CreditCard;

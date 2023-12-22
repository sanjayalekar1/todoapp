import React from 'react';
import { Card, CardContent,Typography} from '@mui/material';
import { styled } from "@mui/system";

const useStyles = styled(({ theme }) => ({
  card: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  cardContent: {
    flex: '1 0 auto',
  },

}));

const DashboardCard = ({ count, description }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent} >
        <Typography variant="h6" textAlign="center">{count}</Typography>
        <Typography variant="body2" color="textSecondary" textAlign="center">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;

import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const DashboardCard = ({ count, description }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" textAlign="center">
          {count}
        </Typography>
        <Typography variant="body2" color="textSecondary" textAlign="center">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;

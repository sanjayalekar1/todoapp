import React from "react";
import { Container, Grid } from "@mui/material";
import DashboardCard from "../UI/DashboardCard";

const DashboardComponent = (props) => {
  const cardsData = [
    {
      count: 2,
      description: "Total Tasks",
    },
    {
      count: 2,
      description: "Task Completed",
    },
    {
      count: 2,
      description: "Task Pending",
    },
  ];

  return (
    <>
      <Container>
        <Grid container spacing={2} mt={2}>
          {cardsData.map((card, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <DashboardCard {...card} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default DashboardComponent;

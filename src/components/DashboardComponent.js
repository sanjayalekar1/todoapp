import React,{useContext} from "react";
import { Container, Grid } from "@mui/material";
import DashboardCard from "../UI/DashboardCard";
import { TaskContext } from "../context/task-context";


const DashboardComponent = (props) => {

  const taskCtx = useContext(TaskContext);
  const cardsData = [
    {
      count: taskCtx.count.total,
      description: "Total Tasks",
    },
    {
      count: taskCtx.count.pending,
      description: "Task Completed",
    },
    {
      count: taskCtx.count.completed,
      description: "Task Pending",
    },
  ];

  return (
    <>
      <Container>
        <h2>Dashboard</h2>
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

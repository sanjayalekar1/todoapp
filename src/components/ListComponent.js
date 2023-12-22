import { Grid } from "@mui/material";
import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Card, CardHeader, CardContent } from "@mui/material";
import TaskModelComponent from "./TaskModelComponent";
import { dummyData } from "../util/data";


const backlogTasks = dummyData.filter((task) => task.stage === 0 && task);
const todoTasks = dummyData.filter((task) => task.stage === 1 && task);
const onGoingTasks = dummyData.filter((task) => task.stage === 2 && task);
const doneTasks = dummyData.filter((task) => task.stage === 3 && task);


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.3),
  borderRadius:10,
  paddingLeft: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  marginBottom: 10,
}));

const ListComponent = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={{ xs: 1, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid xs={4} sm={4} md={3} mt={10}>
          <Card style={{ backgroundColor: "#f0f0f0", padding: 0 }}>
            <CardHeader title="Backlog"></CardHeader>
            <CardContent>
              {backlogTasks.map((task) => {
                return (
                  <Item key={task.name}>
                    <h4>{task.name}</h4>
                  </Item>
                );
              })}
            </CardContent>
            <TaskModelComponent stage="0" />
          </Card>
        </Grid>
        <Grid xs={4} sm={4} md={3} mt={10}>
          <Card
            style={{
              backgroundColor: "#f0f0f0",
              padding: 0,
              marginLeft: "16px",
            }}
          >
            <CardHeader title="Todo"></CardHeader>
            <CardContent>
              {todoTasks.map((task) => {
                return (
                  <Item key={task.name}>
                    <h4>{task.name}</h4>
                  </Item>
                );
              })}
            </CardContent>

            <TaskModelComponent stage="1" />
          </Card>
        </Grid>
        <Grid xs={4} sm={4} md={3} mt={10}>
          <Card
            style={{
              backgroundColor: "#f0f0f0",
              padding: 0,
              marginLeft: "16px",
            }}
          >
            <CardHeader
              title="OnGoing"
             
            ></CardHeader>
            <CardContent>
              {onGoingTasks.map((task) => {
                return (
                  <Item key={task.name}>
                    <h4>{task.name}</h4>
                  </Item>
                );
              })}
            </CardContent>
            <TaskModelComponent stage="2" />
          </Card>
        </Grid>
        <Grid xs={4} sm={4} md={3} mt={10}>
          <Card
            style={{
              backgroundColor: "#f0f0f0",
              padding: 0,
              marginLeft: "16px",
            }}
          >
            <CardHeader
              title="Done"
            ></CardHeader>
            <CardContent>
              {doneTasks.map((task) => {
                return (
                  <Item key={task.name}>
                    <h4>{task.name}</h4>
                  </Item>
                );
              })}
            </CardContent>
            <TaskModelComponent stage="3" />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListComponent;

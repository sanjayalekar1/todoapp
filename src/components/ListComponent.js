import { Grid } from "@mui/material";
import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Card, CardHeader, CardContent } from "@mui/material";
import { Button } from "@mui/material";

const DUMMY_TASKS = [
  {
    id: 1,
    name: "task 1",
    description: "Task 1 description text goes here",
    stage: 0,
    created_by: "30",
    created_at: "2018-05-29T09:12:57.752Z",
    updated_at: "2018-05-29T09:12:57.752Z",
  },
  {
    id: 2,
    name: "task 2",
    description: "Task 2 description text goes here",
    stage: 3,
    created_by: "33",
    created_at: "2018-05-29T09:12:57.752Z",
    updated_at: "2018-05-29T09:12:57.752Z",
  },
  {
    id: 2,
    name: "task 3",
    description: "Task 3 description text goes here",
    stage: 1,
    created_by: "33",
    created_at: "2018-05-29T09:12:57.752Z",
    updated_at: "2018-05-29T09:12:57.752Z",
  },
  {
    id: 2,
    name: "task 4",
    description: "Task 4 description text goes here",
    stage: 2,
    created_by: "33",
    created_at: "2018-05-29T09:12:57.752Z",
    updated_at: "2018-05-29T09:12:57.752Z",
  },
  {
    id: 2,
    name: "task 5",
    description: "Task 5 description text goes here",
    stage: 2,
    created_by: "33",
    created_at: "2018-05-29T09:12:57.752Z",
    updated_at: "2018-05-29T09:12:57.752Z",
  },
  {
    id: 2,
    name: "task 6",
    description: "Task 6 description text goes here",
    stage: 3,
    created_by: "33",
    created_at: "2018-05-29T09:12:57.752Z",
    updated_at: "2018-05-29T09:12:57.752Z",
  },
];

const backlogTasks = DUMMY_TASKS.filter((task) => task.stage === 0 && task);
const todoTasks = DUMMY_TASKS.filter((task) => task.stage === 1 && task);
const onGoingTasks = DUMMY_TASKS.filter((task) => task.stage === 2 && task);
const doneTasks = DUMMY_TASKS.filter((task) => task.stage === 3 && task);

const addTaskHandler = (stage) => {
  console.log(stage);
};
console.log(backlogTasks);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginTop: 20,
  marginRight: 10,
  marginLeft: 10,
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
          <Card>
            <CardHeader
              title="Backlog"
              style={{ textAlign: "center", backgroundColor: "gray" }}
            ></CardHeader>
            <CardContent>
              {backlogTasks.map((task) => {
                return (
                  <Item key={task.name}>
                    <h2>{task.name}</h2>
                    <p>{task.description}</p>
                  </Item>
                );
              })}
            </CardContent>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={(stage) => addTaskHandler(0)}
            >
              + Add Task
            </Button>
          </Card>
        </Grid>
        <Grid xs={4} sm={4} md={3} mt={10}>
          <Card style={{ marginLeft: "16px" }}>
            <CardHeader
              title="Todo"
              style={{ textAlign: "center", backgroundColor: "gray" }}
            ></CardHeader>
            <CardContent>
              {todoTasks.map((task) => {
                return (
                  <Item key={task.name}>
                    <h2>{task.name}</h2>
                    <p>{task.description}</p>
                  </Item>
                );
              })}
            </CardContent>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={(stage) => addTaskHandler(1)}
            >
              + Add Task
            </Button>
          </Card>
        </Grid>
        <Grid xs={4} sm={4} md={3} mt={10}>
          <Card style={{ marginLeft: "16px" }}>
            <CardHeader
              title="OnGoing"
              style={{ textAlign: "center", backgroundColor: "gray" }}
            ></CardHeader>
            <CardContent>
              {onGoingTasks.map((task) => {
                return (
                  <Item key={task.name}>
                    <h2>{task.name}</h2>
                    <p>{task.description}</p>
                  </Item>
                );
              })}
            </CardContent>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={(stage) => addTaskHandler(2)}
            >
              + Add Task
            </Button>
          </Card>
        </Grid>
        <Grid xs={4} sm={4} md={3} mt={10}>
          <Card style={{ marginLeft: "16px" }}>
            <CardHeader
              title="Done"
              style={{ textAlign: "center", backgroundColor: "gray" }}
            ></CardHeader>
            <CardContent>
              {doneTasks.map((task) => {
                return (
                  <Item key={task.name}>
                    <h2>{task.name}</h2>
                    <p>{task.description}</p>
                  </Item>
                );
              })}
            </CardContent>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={(stage) => addTaskHandler(3)}
            >
              + Add Task
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListComponent;

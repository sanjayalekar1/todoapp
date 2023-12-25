import { Grid } from "@mui/material";
import React, { useState } from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Card, CardHeader, CardContent } from "@mui/material";
import TaskModelComponent from "./TaskModelComponent";
import { dummyData } from "../util/data";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditTaskModelComponent from "./EditTaskModelComponent";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.3),
  borderRadius: 10,
  paddingLeft: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
  marginBottom: 10,
}));

const ListComponent = (props) => {
  const [data, setData] = useState(dummyData);

  const backlogTasks = data.filter((task) => +task.stage === 0 && task);
  const todoTasks = data.filter((task) => +task.stage === 1 && task);
  const onGoingTasks = data.filter((task) => +task.stage === 2 && task);
  const doneTasks = data.filter((task) => +task.stage === 3 && task);

  const taskHandler = (newTask) => {
    setData((prevTask) => [...prevTask, newTask]);
  };

  const deleteTaskHandler = (taskTitle) => {
    const index = data.findIndex((task) => task.title === taskTitle);
    const updatedTasks = [...data.slice(0, index), ...data.slice(index + 1)];
    setData(updatedTasks);
  };

  const updateTaskHandler = (taskToUpdate) => {
    const index = data.findIndex((task) => task.id === taskToUpdate.id);
    const updatedTasks = [...data];
    updatedTasks.splice(index, 1, taskToUpdate);
    setData(updatedTasks);
  };

  const moveTaskStageForward = (taskToMove) => {
    taskToMove.stage = taskToMove.stage + 1;
    const index = data.findIndex((task) => task.id === taskToMove.id);
    const updatedTasks = [...data];
    updatedTasks.splice(index, 1, taskToMove);
    setData(updatedTasks);
  };

  const moveTaskStageBack = (taskToMove) => {
    taskToMove.stage = taskToMove.stage - 1;
    const index = data.findIndex((task) => task.id === taskToMove.id);
    const updatedTasks = [...data];
    updatedTasks.splice(index, 1, taskToMove);
    setData(updatedTasks);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <h2>Teams Board</h2>
      <Grid
        container
        spacing={{ xs: 1, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={4} md={3}>
          <Card style={{ backgroundColor: "#f0f0f0", padding: 0 }}>
            <CardHeader
              title="Backlog"
              style={{ backgroundColor: "#8CBAE8" }}
            ></CardHeader>
            <CardContent style={{ padding: 8 }}>
              {backlogTasks.map((task, index) => {
                return (
                  <Item key={task.title}>
                    <h4>{task.title}</h4>
                    <div style={{ textAlign: "right" }}>
                      <ChevronRightIcon
                        onClick={() => moveTaskStageForward(task)}
                      />
                      <EditTaskModelComponent
                        task={task}
                        onUpdateTask={(newTask) => updateTaskHandler(newTask)}
                      />
                      <DeleteForeverIcon
                        onClick={() => deleteTaskHandler(task.title)}
                      />
                    </div>
                  </Item>
                );
              })}
            </CardContent>
            <TaskModelComponent
              stage="0"
              onaddTask={(newTask) => taskHandler(newTask)}
            />
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={3}>
          <Card
            style={{
              backgroundColor: "#f0f0f0",
              padding: 0,
              marginLeft: "16px",
            }}
          >
            <CardHeader
              title="Todo"
              style={{ backgroundColor: "#8CBAE8" }}
            ></CardHeader>
            <CardContent style={{ padding: 8 }}>
              {todoTasks.map((task) => {
                return (
                  <Item key={task.title}>
                    <h4>{task.title}</h4>
                    <div style={{ textAlign: "right" }}>
                      <ChevronLeftIcon
                        onClick={() => moveTaskStageBack(task)}
                      />
                      <ChevronRightIcon
                        onClick={() => moveTaskStageForward(task)}
                      />
                      <EditTaskModelComponent
                        task={task}
                        onUpdateTask={(newTask) => updateTaskHandler(newTask)}
                      />
                      <DeleteForeverIcon
                        onClick={() => deleteTaskHandler(task.title)}
                      />
                    </div>
                  </Item>
                );
              })}
            </CardContent>

            <TaskModelComponent
              stage="1"
              onaddTask={(newTask) => taskHandler(newTask)}
            />
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={3}>
          <Card
            style={{
              backgroundColor: "#f0f0f0",
              padding: 0,
              marginLeft: "16px",
            }}
          >
            <CardHeader
              title="OnGoing"
              style={{ backgroundColor: "#8CBAE8" }}
            ></CardHeader>
            <CardContent style={{ padding: 8 }}>
              {onGoingTasks.map((task) => {
                return (
                  <Item key={task.title}>
                    <h4>{task.title}</h4>
                    <div style={{ textAlign: "right" }}>
                      <ChevronLeftIcon
                        onClick={() => moveTaskStageBack(task)}
                      />
                      <ChevronRightIcon
                        onClick={() => moveTaskStageForward(task)}
                      />
                      <EditTaskModelComponent
                        task={task}
                        onUpdateTask={(newTask) => updateTaskHandler(newTask)}
                      />
                      <DeleteForeverIcon
                        onClick={() => deleteTaskHandler(task.title)}
                      />
                    </div>
                  </Item>
                );
              })}
            </CardContent>
            <TaskModelComponent
              stage="2"
              onaddTask={(newTask) => taskHandler(newTask)}
            />
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={3}>
          <Card
            style={{
              backgroundColor: "#f0f0f0",
              padding: 0,
              marginLeft: "16px",
            }}
          >
            <CardHeader
              title="Done"
              style={{ backgroundColor: "#8CBAE8" }}
            ></CardHeader>
            <CardContent style={{ padding: 8 }}>
              {doneTasks.map((task) => {
                return (
                  <Item key={task.title}>
                    <h4>{task.title}</h4>
                    <div style={{ textAlign: "right" }}>
                      <ChevronLeftIcon
                        onClick={() => moveTaskStageBack(task)}
                      />
                      <EditTaskModelComponent
                        task={task}
                        onUpdateTask={(newTask) => updateTaskHandler(newTask)}
                      />
                      <DeleteForeverIcon
                        onClick={() => deleteTaskHandler(task.title)}
                      />
                    </div>
                  </Item>
                );
              })}
            </CardContent>
            <TaskModelComponent
              stage="3"
              onaddTask={(newTask) => taskHandler(newTask)}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListComponent;

import { Grid } from "@mui/material";
import React, { useState, useContext } from "react";
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
import { TaskContext } from "../context/task-context";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../reducers/authSlice";

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
const MyIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#8CBAE8",
  },
}));

let userId = 0;
const ListComponent = (props) => {
  const user = useSelector(selectUser);

  if (typeof user == "string") {
    userId = JSON.parse(user).id;
  } else {
    userId = user.id;
  }

  const userData = dummyData.filter((task) => +task.created_by === userId);

  //const {count} = useContext(TaskContext);


  const [data, setData] = useState(userData);
  const [error, setError] = useState(false);

  const backlogTasks = data.filter(
    (task) => +task.stage === 0 && task.created_by === userId && task
  );
  const todoTasks = data.filter(
    (task) => +task.stage === 1 && task.created_by === userId && task
  );
  const onGoingTasks = data.filter(
    (task) => +task.stage === 2 && task.created_by === userId && task
  );
  const doneTasks = data.filter(
    (task) => +task.stage === 3 && task.created_by === userId && task
  );

  const [taskCount, setTaskCount] = useState({
    count:{
      total: userData.length,
      pending: todoTasks.length + onGoingTasks.length,
      completed: doneTasks.length,
    }
  });

  const taskHandler = (newTask) => {
    const result = data.filter((task) => task.title.includes(newTask.title));
    if (result.length > 0) {
      setError("Entered task title already exist !");
      return;
    }
    setData((prevTask) => [...prevTask, newTask]);
    setTaskCount((prevTaskCount) => ({
        ...prevTaskCount,
        count: {
          ...prevTaskCount.count,
          total: prevTaskCount.count.total + 1,
          pending: prevTaskCount.count.pending + 1,
        }
      }))};

  const clearErrorHandler = () => {
    setError(false);
  };

  const deleteTaskHandler = (taskTitle) => {
    const index = data.findIndex((task) => task.title === taskTitle);
    const updatedTasks = [...data.slice(0, index), ...data.slice(index + 1)];
    setData(updatedTasks);
  };

  const updateTaskHandler = (taskToUpdate) => {
    const result = data.filter((task) =>
      task.title.includes(taskToUpdate.title)
    );
    if (result.length > 0) {
      setError("Entered task title already exist !");
      return;
    } else {
      const index = data.findIndex((task) => task.id === taskToUpdate.id);
      const updatedTasks = [...data];
      updatedTasks.splice(index, 1, taskToUpdate);
      setData(updatedTasks);
    }
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
  console.log(taskCount);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <h2>Teams Board</h2>
      <Grid
        container
        spacing={{ xs: 1, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={4} sm={4} md={3}>
          <Card
            style={{
              backgroundColor: "#f0f0f0",
              padding: 0,
              margin: 1,
            }}
          >
            <CardHeader
              title="Backlog"
              style={{ backgroundColor: "#8CBAE8" }}
            ></CardHeader>
            <CardContent style={{ padding: 8 }}>
              {backlogTasks.map((task, index) => {
                return (
                  <Item key={task.title}>
                    <h4>{task.title}</h4>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "center",
                      }}
                    >
                      <MyIconButton onClick={() => moveTaskStageForward(task)}>
                        <ChevronRightIcon />
                      </MyIconButton>

                      <EditTaskModelComponent
                        task={task}
                        onUpdateTask={(newTask) => updateTaskHandler(newTask)}
                        error={error}
                        clearError={clearErrorHandler}
                      />

                      <MyIconButton>
                        <DeleteForeverIcon
                          fontSize="small"
                          onClick={() => deleteTaskHandler(task.title)}
                        />
                      </MyIconButton>
                    </div>
                  </Item>
                );
              })}
            </CardContent>
            <TaskModelComponent
              stage={0}
              onaddTask={(newTask) => taskHandler(newTask)}
              error={error}
              clearError={clearErrorHandler}
            />
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={3}>
          <Card
            style={{
              backgroundColor: "#f0f0f0",
              padding: 0,
              margin: 1,
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "center",
                      }}
                    >
                      <MyIconButton onClick={() => moveTaskStageBack(task)}>
                        <ChevronLeftIcon />
                      </MyIconButton>

                      <MyIconButton onClick={() => moveTaskStageForward(task)}>
                        <ChevronRightIcon />
                      </MyIconButton>
                      <EditTaskModelComponent
                        task={task}
                        onUpdateTask={(newTask) => updateTaskHandler(newTask)}
                        error={error}
                        clearError={clearErrorHandler}
                      />
                      <MyIconButton>
                        <DeleteForeverIcon
                          fontSize="small"
                          onClick={() => deleteTaskHandler(task.title)}
                        />
                      </MyIconButton>
                    </div>
                  </Item>
                );
              })}
            </CardContent>

            <TaskModelComponent
              stage={1}
              onaddTask={(newTask) => taskHandler(newTask)}
              error={error}
              clearError={clearErrorHandler}
            />
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={3}>
          <Card
            style={{
              backgroundColor: "#f0f0f0",
              padding: 0,
              margin: 1,
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "center",
                      }}
                    >
                      <MyIconButton onClick={() => moveTaskStageBack(task)}>
                        <ChevronLeftIcon />
                      </MyIconButton>

                      <MyIconButton onClick={() => moveTaskStageForward(task)}>
                        <ChevronRightIcon />
                      </MyIconButton>
                      <EditTaskModelComponent
                        task={task}
                        onUpdateTask={(newTask) => updateTaskHandler(newTask)}
                        error={error}
                        clearError={clearErrorHandler}
                      />
                      <MyIconButton>
                        <DeleteForeverIcon
                          fontSize="small"
                          onClick={() => deleteTaskHandler(task.title)}
                        />
                      </MyIconButton>
                    </div>
                  </Item>
                );
              })}
            </CardContent>
            <TaskModelComponent
              stage={2}
              onaddTask={(newTask) => taskHandler(newTask)}
              error={error}
              clearError={clearErrorHandler}
            />
          </Card>
        </Grid>
        <Grid item xs={4} sm={4} md={3}>
          <Card
            style={{
              backgroundColor: "#f0f0f0",
              padding: 0,
              margin: 1,
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        alignItems: "center",
                      }}
                    >
                      <MyIconButton onClick={() => moveTaskStageBack(task)}>
                        <ChevronLeftIcon />
                      </MyIconButton>
                      <EditTaskModelComponent
                        task={task}
                        onUpdateTask={(newTask) => updateTaskHandler(newTask)}
                        error={error}
                        clearError={clearErrorHandler}
                      />
                      <MyIconButton>
                        <DeleteForeverIcon
                          fontSize="small"
                          onClick={() => deleteTaskHandler(task.title)}
                        />
                      </MyIconButton>
                    </div>
                  </Item>
                );
              })}
            </CardContent>
            <TaskModelComponent
              stage={3}
              onaddTask={(newTask) => taskHandler(newTask)}
              error={error}
              clearError={clearErrorHandler}
            />
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ListComponent;

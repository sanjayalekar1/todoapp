import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Button, styled, Grid ,Typography} from "@mui/material";
import { useSelector } from "react-redux";
import { selectUser } from "../reducers/authSlice";

const StyledGridItem = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  width: 400,
}));

const TaskModelComponent = (props) => {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    stage: props.stage,
    created_by: "",
    created_at: null,
    updated_by: null,
  });

  const user = useSelector(selectUser);;
  const userId = user.id; 
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
      created_by: userId,
      created_at: new Date().toISOString(),
      updated_by: new Date().toISOString(),
      id: Math.random(),
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.clearError();
  };

  const addTaskHandler = (e) => {
    e.preventDefault();
    props.onaddTask(newTask);
  };

  return (
    <div style={{ margin: 20 }}>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        + Add Task
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Task</DialogTitle>
        <DialogContent>
          <form>
            <StyledGridItem>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                type="text"
                className="field-top-margin"
                onChange={inputChangeHandler}
              />
            </StyledGridItem>
            <TextField
              id="stage"
              name="stage"
              type="hidden"
              value={props.stage}
              onChange={inputChangeHandler}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addTaskHandler}
            >
              Save
            </Button>
            {props.error &&  <Typography variant="body1" color="error" align="center">
            Entered task title aleady exist !
        </Typography>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskModelComponent;

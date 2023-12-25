import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Button, styled, Grid } from "@mui/material";
import { EditNoteOutlined} from "@mui/icons-material";

const StyledGridItem = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  width: 400,
}));

const EditTaskModelComponent = (props) => {
  const [open, setOpen] = useState(false);
  const [updatedTask,setUpdatedTask] = useState(props.task);

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTaskHandler = (e) => {
    e.preventDefault();
    props.onUpdateTask(updatedTask);
    setOpen(false);
  };

  return (
    <div >
      <EditNoteOutlined onClick={handleOpen} />

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
                value={updatedTask.title}
               
              />
            </StyledGridItem>
        
            <Button
              variant="contained"
              color="primary"
              onClick={updateTaskHandler}
            >
              Save
            </Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditTaskModelComponent;

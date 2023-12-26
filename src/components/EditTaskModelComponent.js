import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Button, styled, Grid ,IconButton,Typography} from "@mui/material";
import { EditNoteOutlined } from "@mui/icons-material";


const StyledGridItem = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  width: 400,
}));

const MyIconButton = styled(IconButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: '#8CBAE8',
  },
}))
const EditTaskModelComponent = (props) => {
  const [open, setOpen] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(props.task);

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
    props.clearError();
    setOpen(false);
  };

  const updateTaskHandler = (e) => {
    e.preventDefault();
    props.onUpdateTask(updatedTask);
  };

  return (
    <div>
      <MyIconButton>
      <EditNoteOutlined  onClick={handleOpen} />
      </MyIconButton>
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
            {props.error &&  <Typography variant="body1" color="error" align="center">
            Entered task title aleady exist !</Typography>}
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

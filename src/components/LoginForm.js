import React from "react";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import {
  Container,
  TextField,
  Typography,
  Grid,
  Input,
  Button,
} from "@mui/material";

const StyledGridItem = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const LoginForm = (props) => {
  const loginHandler = (e) => {
    e.preventDefault();
    console.log("in Signup handler");
  };

  return (
    <Container maxWidth="xs" className="container">
      <Typography variant="h5" align="center">
        Sign Up
      </Typography>
      <form onSubmit={loginHandler}>
        <Grid>
          <StyledGridItem item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              className="field-top-margin"
            />
          </StyledGridItem>
        </Grid>
        <Grid>
          <StyledGridItem item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              className="field-top-margin"
            />
          </StyledGridItem>
        </Grid>

        <Button type="submit" fullWidth variant="contained" color="primary">
          Login
        </Button>
      </form>
      <Typography varient="h6" mt={5}>
        Don't have Account?
        <Link to="/signup">Sign Up</Link>
      </Typography>
    </Container>
  );
};
export default LoginForm;

import {
  Container,
  TextField,
  Typography,
  Grid,
  Input,
  Button,
} from "@mui/material";
import React from "react";
import { styled } from "@mui/system";

const StyledGridItem = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2, 0), // Adjust the margin as needed
}));

const SignUpForm = (props) => {

  const submitHandler = (e) =>{
    e.preventDefault();
    console.log("in Signup handler");
  }

  return (
    <Container maxWidth="xs" className="container">
      <Typography variant="h5" align="center">
        Sign Up
      </Typography>
      <form onSubmit={submitHandler}>
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
              id="email"
              label="Email"
              name="email"
              type="email"
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
              id="contact"
              label="Contact"
              name="contact"
              type="number"
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
        <Grid>
          <StyledGridItem item xs={12}>
            <Input
              required
              fullWidth
              id="profileImage"
              accept="image/*"
              name="profileImage"
              type="file"
              className="field-top-margin"
            />
          </StyledGridItem>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUpForm;

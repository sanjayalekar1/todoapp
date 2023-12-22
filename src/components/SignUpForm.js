import {
  Container,
  TextField,
  Typography,
  Grid,
  Input,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/system";
import { ErrorSharp } from "@mui/icons-material";

const StyledGridItem = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2, 0), // Adjust the margin as needed
}));

const SignUpForm = (props) => {
  const initialState = {
    userName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  };
  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState(initialState);

  //console.log(formData);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.userName.trim()) {
      errors.userName = "Username is required";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = "Valid emial is Required";
      isValid = false;
    }

    const contactRegex = /^\d{10}$/;
    if (formData.contact.trim() !== "") {
      if (!contactRegex.test(formData.contact)) {
        errors.contact = "Valid 10 digit number is required ";
        isValid = false;
      }
    }

    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Password do not match";
      isValid = false;
    }

    if (formData.profileImage !== "") {
      const allowedImageTypes = ["image/jpeg", "image/png"];

      if (!allowedImageTypes.includes(formData.profileImage.type)) {
        errors.profileImage = "Please Upload Valid Image (jpeg/png)";
        isValid = false;
      }
    }

    setErrors(errors);
    return isValid;
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(JSON.stringify(formData));
    if (validateForm()) {
      const response = fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        console.log("registration Successful");
      } else {
        console.log("Error in user registration");
      }
    } else {
      console.log("validation error occured");
    }
  };

  const inputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
              onChange={inputChangeHandler}
            />
          </StyledGridItem>
        </Grid>
        <Typography variant="body1" color="error">
          {errors.userName}
        </Typography>
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
              onChange={inputChangeHandler}
            />
          </StyledGridItem>
        </Grid>
        <Typography variant="body1" color="error">
          {errors.email}
        </Typography>
        <Grid>
          <StyledGridItem item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="contact"
              label="Contact"
              name="contact"
              type="number"
              className="field-top-margin"
              onChange={inputChangeHandler}
            />
          </StyledGridItem>
        </Grid>
        <Typography variant="body1" color="error">
          {errors.contact}
        </Typography>
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
              onChange={inputChangeHandler}
            />
          </StyledGridItem>
        </Grid>
        <Typography variant="body1" color="error">
          {errors.password}
        </Typography>
        <Grid>
          <StyledGridItem item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              className="field-top-margin"
              onChange={inputChangeHandler}
            />
          </StyledGridItem>
        </Grid>
        <Typography variant="body1" color="error">
          {errors.confirmPassword}
        </Typography>
        <Grid>
          <StyledGridItem item xs={12}>
            <Input
              fullWidth
              id="profileImage"
              accept="image/*"
              name="profileImage"
              type="file"
              className="field-top-margin"
              onChange={inputChangeHandler}
            />
          </StyledGridItem>
          <Typography variant="body1" color="error">
            {errors.profileImage}
          </Typography>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default SignUpForm;

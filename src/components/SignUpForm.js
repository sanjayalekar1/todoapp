import {
  Container,
  TextField,
  Typography,
  Grid,
  Input,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";

const StyledGridItem = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const SignUpForm = (props) => {
  const apiUrl = process.env.REACT_APP_BACKEND_API_URL;
  const navigate = useNavigate();
  const initialState = {
    userName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  };
  const [formData, setFormData] = useState(initialState);
  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const [isSignupFail, setIsSignupFail] = useState(false);
  const [errors, setErrors] = useState(initialState);

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.userName.trim()) {
      errors.userName = "Username is required";
      isValid = false;
    }

    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
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
    if (validateForm()) {
      const response = await fetch(apiUrl + "/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const result = await response.json();
        setIsSignupSuccess(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);

        console.log("registration Successful");
      } else {
        setIsSignupFail(true);
        console.log("Error in user registration");
      }
    } else {
      console.log("validation error occured");
    }
  };

  const inputChangeHandler = (e) => {
    setIsSignupFail(false);
    const { name, value, type, files } = e.target;
    const file = type === "file" ? files[0] : null;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? file : value,
    }));
  };

  return (
    <Container maxWidth="xs" className="container">
      <Typography variant="h5" align="center">
        Sign Up
      </Typography>
      {isSignupSuccess && (
        <Typography variant="body1" style={{ color: "#4CAF50" }} align="center">
          Sign up Successful ! Please Login.
        </Typography>
      )}
      {isSignupFail && (
        <Typography variant="body1" color="error" align="center">
          User Already Exist !
        </Typography>
      )}
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
          <Typography variant="body1" color="success">
            {errors.profileImage}
          </Typography>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign Up
        </Button>
      </form>
      <br /> <br />
    </Container>
  );
};

export default SignUpForm;

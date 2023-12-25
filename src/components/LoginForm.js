import React, { useState } from "react";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setUser,
  setLoading,
  setError,
  selectIsAuthenticated,
  selectError,
  selectUser,
  selectLoading,
  setToken,
  selectToken,
  setAuthenticated,
} from "../reducers/authSlice";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.auth.loading);
  const error = useSelector((state) => state.auth.auth.error);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const initialState = {
    userName: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState(initialState);

  const inputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.userName.trim()) {
      errors.userName = "Username is required";
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const fetchLoginData = async () => {
    try {
      dispatch(setLoading(true));
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        dispatch(setLoading(false));
        const result = await response.json();
        dispatch(setUser(result.user));
        dispatch(setToken(result.token));
        dispatch(setAuthenticated(true));

        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        navigate("/dashboard");
      } else {
        // localStorage.removeItem('isAuthenticated');
        // localStorage.removeItem('token');
        // localStorage.removeItem('user');
        dispatch(setError("Invalid username or password"));
        navigate("/login");
      }
    } catch (error) {
      dispatch(setError("Error in fetching API"));
    }
  };
  const loginHandler = (e) => {
    e.preventDefault();
    if (validateForm()) {
      fetchLoginData();
    }
  };

  return (
    <Container maxWidth="xs" className="container">
      <Typography variant="h5" align="center">
        Login
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
              onChange={inputChangeHandler}
            />
          </StyledGridItem>
          <Typography variant="body1" color="error">
            {errors.userName}
          </Typography>
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
              onChange={inputChangeHandler}
            />
          </StyledGridItem>
          <Typography variant="body1" color="error">
            {errors.password}
          </Typography>
        </Grid>

        <Button type="submit" fullWidth variant="contained" color="primary">
          {loading ? "loading..." : "Login"}
        </Button>
        <Typography variant="body1" color="error" align="center">
          {error}
        </Typography>
      </form>
      <Typography varient="h6" mt={5}>
        Don't have Account?
        <Link to="/signup">Sign Up</Link>
      </Typography>
    </Container>
  );
};
export default LoginForm;

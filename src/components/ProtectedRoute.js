import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import React from "react";

import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const ProtectedRoute = (props) => {
  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="50vh"
      >
        <h1>403 - Unauthorized access !</h1>
        <p>You are not authorized to view this page</p>
        <Link to="/login" variant="outlined" color="primary" className="">
          Click here to login
        </Link>
      </Box>
    </Container>
  );
};

export default ProtectedRoute;

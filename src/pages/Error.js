import Button from '@mui/material/Button';
import { Container } from "@mui/material";
import React from "react"
import MainNavigation from "../components/MainNavigation";
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';

const ErrorPage = (props) => {
  return (<>
    <MainNavigation />
    <Container >
      <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="50vh" 
       >
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" variant="outlined" color="primary" className=''>Home</Link>
      </Box>
    </Container>
  </>
   
  )
};

export default ErrorPage;

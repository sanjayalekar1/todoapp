import { DensityMediumSharp } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar,Button } from "@mui/material";
import { Container } from "@mui/system";
import Box from '@mui/material/Box';
import {NavLink,Link} from 'react-router-dom'

const MainNavigation = () =>{

    return(
        <>
         <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" >
            <Container >
                <Toolbar  >  
                    <h1><Link className="nav-header" to="/">ToDo</Link></h1> 
                    <div style={{ flexGrow: 1, textAlign: 'right' }}>        
                    <NavLink to="/login" className="nav-item"  >Login </NavLink>
                    <NavLink to="/signup" className="nav-item" >Signup </NavLink>
                   </div>
                </Toolbar>
            </Container>
        </AppBar>
        </Box>
        
        </>
        
    );
}
export default MainNavigation;
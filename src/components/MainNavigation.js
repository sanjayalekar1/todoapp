import { AppBar, Toolbar, Button } from "@mui/material";
import { Container } from "@mui/system";
import Box from "@mui/material/Box";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectIsAuthenticated } from "../reducers/authSlice";
import { useNavigate, useLocation } from "react-router-dom";

const MainNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const logoutHandler = () => {
    if (isAuthenticated) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container>
            <Toolbar>
              <h1>
                <Link className="nav-header" to="/dashboard">
                  ToDo
                </Link>
              </h1>
              <div style={{ flexGrow: 1, textAlign: "right" }}>
                {isAuthenticated && (
                  <>
                    {location.pathname !== "/board" && (
                      <NavLink to="/board" className="nav-item">
                        Teams Board
                      </NavLink>
                    )}
                    {location.pathname === "/board" && (
                      <NavLink to="/dashboard" className="nav-item">
                        Dashboard
                      </NavLink>
                    )}

                    <Button
                      type="button"
                      onClick={logoutHandler}
                      variant="contained"
                      color="warning"
                    >
                      Logout
                    </Button>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <NavLink to="/login" className="nav-item">
                      Login
                    </NavLink>
                    <NavLink to="/signup" className="nav-item">
                      Signup
                    </NavLink>
                  </>
                )}
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};
export default MainNavigation;

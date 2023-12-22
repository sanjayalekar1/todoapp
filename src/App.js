import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import SiginUpPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import RootLayout from "./pages/RootLayout";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/Error";
import { selectIsAuthenticated } from "./reducers/authSlice";
import {useSelector} from 'react-redux';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  const PrivateRoute = ({ element}) => {
    const isAuthenticated= useSelector(selectIsAuthenticated);
    
    return isAuthenticated ? element : <ProtectedRoute />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "signup",
          element: <SiginUpPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "dashboard",
          element: <PrivateRoute element = {<Dashboard />} />,
        },
     
      ],
    },
  ]);
  return (
      <RouterProvider router={router}></RouterProvider>
  );
}

export default App;

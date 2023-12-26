import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import SiginUpPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import RootLayout from "./pages/RootLayout";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/Error";
import { selectIsAuthenticated } from "./reducers/authSlice";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import Board from "./pages/Board";
import { TaskContext } from "./context/task-context";
import { dummyData } from "./util/data";

function App() {
  const todoTasks = dummyData.filter((task) => +task.stage === 1 && task);
  const onGoingTasks = dummyData.filter((task) => +task.stage === 2 && task);
  const doneTasks = dummyData.filter((task) => +task.stage === 3 && task);

  const count = {
    'total':dummyData.length,
    'pending':todoTasks.length+onGoingTasks.length,
    'completed':doneTasks.length
  };  
 
  const PrivateRoute = ({ element }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);

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
          element: <PrivateRoute element={<Dashboard />} />,
        },
        {
          path: "board",
          element: <PrivateRoute element={<Board />} />,
        },
      ],
    },
  ]);
  return(<TaskContext.Provider value={{ count}}>
    <RouterProvider router={router}></RouterProvider>;
  </TaskContext.Provider>);
}

export default App;

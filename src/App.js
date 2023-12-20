import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import HomePage from './pages/Home';
import ErrorPage from './pages/Error';
import SiginUpPage from './pages/Signup';
import LoginPage from './pages/Login';
import RootLayout from './pages/RootLayout';
import Dashboard from './pages/Dashboard';
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout />,
      errorElement:<ErrorPage />,
      children:[
        {
          path:'/',
          element:<HomePage />
        },
        {
          path:'signup',
          element:<SiginUpPage />
        },
        {
          path:'login',
          element:<LoginPage />
        },
        {
          path:'dashboard',
          element:<Dashboard />
        }
      ]
    },
  ]);
  return (
   <RouterProvider router={router} >

   </RouterProvider>
  );
}

export default App;

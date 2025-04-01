import { createBrowserRouter } from 'react-router-dom';
import Login from './screens/Authentication/Login/Login';
import SignUp from './screens/Authentication/SignUp/SignUp';
import Home from './screens/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/login',
    element:<Login />
  }
]);

export default router;
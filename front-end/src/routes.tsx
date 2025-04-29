import { createBrowserRouter } from 'react-router-dom';
import Login from './screens/Authentication/Login/Login';
import SignUp from './screens/Authentication/SignUp/SignUp';
import Home from './screens/Home/Home';
import EditProfile from './screens/EditProfile/EditProfile';

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/',
    element:<Login />
  },{

    path: '/edit-profile',
    element: <EditProfile />
  }
]);

export default router;
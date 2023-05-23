//import logo from './logo.svg';
import './App.css';
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
function App() {
  const router = createBrowserRouter([
    {
      path : '/',
      element : <Username></Username>
  },
  {
      path : '/register',
      element : <Register></Register>
  },
  {
      path : '/password',
      element : <Password />
  },
  {
      path : '/profile',
      element : <Profile />
  },
  {
      path : '/recovery',
      element : <Recovery></Recovery>
  },
  {
      path : '/reset',
      element : <Reset></Reset>
  },
  {
      path : '*',
      element : <PageNotFound></PageNotFound>
  },
  ])
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;

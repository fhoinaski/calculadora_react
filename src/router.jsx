import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Calculator from './components/calculadora';
import { Home } from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/calculadora', element: <PrivateRoute><Calculator/></PrivateRoute>},
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
]);

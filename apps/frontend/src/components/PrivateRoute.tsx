import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
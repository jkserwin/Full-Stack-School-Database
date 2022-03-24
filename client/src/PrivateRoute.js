import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Context } from './Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticatedUser } = useContext(Context);
  const location = useLocation();
  return (
    authenticatedUser ?
    
    <Outlet />
    
    :

    <Navigate to='/signin' replace state={{from: location}}/>
  );
};

export default PrivateRoute;
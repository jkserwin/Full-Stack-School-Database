import React, { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from './Context';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authenticatedUser } = useContext(Context);
  
  return (
    authenticatedUser ?
    
    <Outlet />
    
    :

    <Navigate to='/signin' />
  );
};

export default PrivateRoute;
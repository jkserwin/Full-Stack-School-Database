import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../Context';

export default function UserSignOut() {

  const context = useContext(Context);
  context.actions.signOut();

  return (
    <Navigate to='/'/>
  );
}
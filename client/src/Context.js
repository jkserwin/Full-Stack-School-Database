import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import config from './config';

export const Context = createContext();

const apiHandler = (path, method = 'GET', body = null, requiresAuth = false, credentials = null) => {
  const url = config.apiBaseUrl + path;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body)
  }

  if (requiresAuth) {
    const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
    options.headers['Authorization'] = `Basic ${encodedCredentials}`;
  }
  return fetch(url, options)
}

export const Provider = (props) => {

  const [currentUser, setCurrentUser] = useState();
  const [authenticatedUser, setAuthenticatedUser] = useState();
  const [data, setData] = useState();

  const navigate = useNavigate();
    
  const getUser = async (emailAddress, password) => {
    await apiHandler('/users', 'GET', null, true, {emailAddress, password})
      .then(res => res.json())


  }

  const signIn = async (emailAddress, password) => {
    const response = await this.apiHandler(`/users`, 'GET', null, true, {emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  const signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }

  // createCourse function
  // createUser function
  const cancelHandler = (e) => {
    e.preventDefault();
    navigate('/');
  }

  const value = {
    currentUser,
    authenticatedUser,
    data,
    actions: {
      getUser: getUser,
      signIn: signIn,
      signOut: signOut,
      // createCourse: createCourse,
      // createUser: createUser,
      cancelHandler: cancelHandler,
    },
  };

  return (
    <Context.Provider value={this.value}>
      {props.children}
    </Context.Provider>
  );

}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}
import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const Context = createContext();

const apiHandler = (path, method = 'GET', body = null, authRequired = false, credentials = null) => {
  const url = 'http://localhost:5000/api/' + path;

  const options = {
    method,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  };

  if (body !== null) {
    options.body = JSON.stringify(body);
  }

  if (authRequired) {
    const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
    options.headers['Authorization'] = `Basic ${encodedCredentials}`;
  }
  return fetch(url, options);
}

export const Provider = (props) => {

  const [authenticatedUser, setAuthenticatedUser] = useState();
  const [data, setData] = useState();

  const navigate = useNavigate();
    
  const getUser = async (emailAddress, password) => {
    const response = await apiHandler(`/users`, 'GET', null, true, {emailAddress, password});
    if (response.status === 200) {
      return response.json();
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  const signIn = async (emailAddress, password) => {
    const user = await getUser(emailAddress, password);
    if (user !== null) {
      setAuthenticatedUser({ ...user, password });
    } else if (user === null) {

    }
    return user;
  }

  const signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
  }

  const createCourse = async (course) => {
    const response = await apiHandler('/courses', 'POST', course);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
  
  const createUser = async (user) => {
    const response = await apiHandler('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  const cancelHandler = (e) => {
    e.preventDefault();
    navigate('/');
  }

  const value = {
    authenticatedUser,
    data,
    actions: {
      getUser: getUser,
      signIn: signIn,
      signOut: signOut,
      createCourse: createCourse,
      createUser: createUser,
      cancelHandler: cancelHandler,
    },
  };

  return (
    <Context.Provider value={value}>
      {props.children}
    </Context.Provider>
  );

}

export const Consumer = Context.Consumer;

// export default function withContext(Component) {
//   return function ContextComponent(props) {
//     return (
//       <Context.Consumer>
//         {context => <Component {...props} context={context} />}
//       </Context.Consumer>
//     );
//   }
// }
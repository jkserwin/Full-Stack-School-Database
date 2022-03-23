import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export const Context = createContext();

// configures fetch requests
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

  const cookie = Cookies.get('authenticatedUser');

  // If an 'authenticatedUser' cookie exists, sets its value as authenticatedUser
  const [authenticatedUser, setAuthenticatedUser] = useState(
    cookie ? 
    JSON.parse(cookie) 
    : 
    null
  );

  const navigate = useNavigate();
  
  // Makes a GET request for information about a specific user
  const getUser = async (emailAddress, password) => {
    const response = await apiHandler('users', 'GET', null, true, {emailAddress, password});
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

  // Makes a GET request for information about all courses
  const getCourses = async () => {
    const response = await apiHandler('courses');
    return response;
  }

  // Makes a GET request for information about a specific course
  const getCourse = async (id) => {
    const response = await apiHandler(`courses/${id}`);
    return response;
  }

  // Checks if supplied user credentials match a known user and, if so, sets that user as authenticatedUser
  const signIn = async (emailAddress, password) => {
    const response = await getUser(emailAddress, password);
    if (response !== null) {
      setAuthenticatedUser({ ...response, password });
      const cookieOptions = {
        expires: 1,
        SameSite: 'Lax'
      };
      Cookies.set('authenticatedUser', JSON.stringify({...response, password}), cookieOptions);
      console.log('true');
      return true;
    } else {
      console.log('false');
      return false;
    }
  }

  // Removes current authenticatedUser from state and cookies
  const signOut = () => {
    setAuthenticatedUser(null);
    Cookies.remove('authenticatedUser');
  }

  // Makes a POST request to create a new course
  const createCourse = async (course, emailAddress, password) => {
    const response = await apiHandler('courses', 'POST', course, true, {emailAddress, password});
    return response;
  }
  
  // Makes a POST request to create a new user
  const createUser = async (user) => {
    const response = await apiHandler('users', 'POST', user);
    return response;
  }

  // Makes a PUT request to update an existing course
  const updateCourse = async (id, body, emailAddress, password) => {
    const response = await apiHandler(`courses/${id}`, 'PUT', body, true, {emailAddress, password});
    return response;
  }

  // Makes a DELETE request to delete an existing course
  const deleteCourse = async (id, emailAddress, password) => {
    const response = await apiHandler(`courses/${id}`, 'DELETE', null, true, {emailAddress, password});
    if (response.status === 204) {
      return console.log('Course deleted');
    } else {
      return console.log('Error deleting course');
    }
  }
  
  const cancelHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  const value = {
    authenticatedUser,
    actions: {
      getUser: getUser,
      getCourses: getCourses,
      getCourse: getCourse,
      signIn: signIn,
      signOut: signOut,
      createCourse: createCourse,
      createUser: createUser,
      updateCourse: updateCourse,
      deleteCourse: deleteCourse,
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
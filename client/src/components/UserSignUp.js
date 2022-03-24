import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../Context';
import ValidationErrors from './ValidationErrors';

function UserSignUp() {

  const context = useContext(Context);
  const navigate = useNavigate();

  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ emailAddress, setEmailAddress ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState([])
  
  const cancel = (e) => {
    context.actions.cancelHandler(e);
  }

  // On submit, collects form data into user object and sends it to server via createUser method from context. If successful, signs in as new user and navigates to previous route. If unsuccessful, renders validation errors.
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      emailAddress,
      password
    };
    context.actions.createUser(user)
      .then(response => {
        if (response.status === 201) {
          context.actions.signIn(user.emailAddress, user.password);
          navigate(-1);
        } else if (response.status === 400) {
          response.json().then(data => {
            setErrors(data.errors)
          })
        }
      })
      .catch(error => {
        navigate('/error')
      });
  }

  return(
    <main>
      <div className='form--centered'>
        <h2>Sign Up</h2>
        {
          (errors.length > 0)
          ? (<ValidationErrors errors={errors}/>)
          : null
        }
        <form onSubmit={handleSubmit}>
          <label htmlFor='firstName'>First Name</label>
          <input id='firstName' name='firstName' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          <label htmlFor='lastName'>Last Name</label>
          <input id='lastName' name='lastName' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          <label htmlFor='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>
          <label htmlFor='password'>Password</label>
          <input id='password' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className='button' type='submit'>Sign Up</button>
          <button className='button button-secondary' onClick={cancel}>Cancel</button>
        </form>
        <p>Already have a user account? Click here to <Link to='/signin'>sign in</Link>!</p>          
      </div>    
    </main>
  );
}

export default UserSignUp;
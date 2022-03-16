import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../Context';

function UserSignIn() {
  
  const context = useContext(Context);
  const navigate = useNavigate();

  const [ emailAddress, setEmailAddress ] = useState();
  const [ password, setPassword ] = useState();

  const cancel = (e) => {
    context.actions.cancelHandler(e);
  }

  const handleSubmit = e => {
    e.preventDefault();
    context.actions.signIn(emailAddress, password);
    navigate('/');
  };

  return(
    <main>
      <div className='form--centered'>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label for='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' defaultValue='' onChange={(e) => setEmailAddress(e.target.value)}/>
          <label for='password'>Password</label>
          <input id='password' name='password' type='password' defaultValue='' onChange={(e) => setPassword(e.target.value)}/>
          <button className='button' type='submit'>Sign In</button>
          <button className='button button-secondary' onClick={cancel}>Cancel</button>
        </form>
        <p>Don't have a user account? Click here to <Link to='/signup'>sign up</Link>!</p>          
      </div>    
    </main>
  );
}

export default UserSignIn;
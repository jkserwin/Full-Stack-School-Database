import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../Context';

function UserSignIn() {
  
  const context = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  const [ emailAddress, setEmailAddress ] = useState();
  const [ password, setPassword ] = useState();

  const cancel = (e) => {
    context.actions.cancelHandler(e);
  }

  // On submit, places a signIn request via context. If successful, navigates back to previous page. If unsuccessful, reloads /signin route.
  const handleSubmit = async e => {
    e.preventDefault();
    const signedIn = await context.actions.signIn(emailAddress, password);
    if (signedIn && location.state?.from) {
      navigate(location.state.from.pathname);
    } 
    else {
      navigate('/signin');
    }
  };

  return(
    <main>
      <div className='form--centered'>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' defaultValue='' onChange={(e) => setEmailAddress(e.target.value)}/>
          <label htmlFor='password'>Password</label>
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
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

function UserSignIn() {
  
  const context = useContext(Context);

  const [ emailAddress, setEmailAddress ] = useState();
  const [ password, setPassword ] = useState();

  const cancel = (e) => {
    context.actions.cancelHandler(e);
  }
  
  return(
    <main>
      <div className='form--centered'>
        <h2>Sign In</h2>
        <form onSubmit={context.actions.signIn}>
          <label for='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>
          <label for='password'>Password</label>
          <input id='password' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <button className='button' type='submit'>Sign In</button>
          <button className='button button-secondary' onClick={cancel}>Cancel</button>
        </form>
        <p>Don't have a user account? Click here to <Link to='/signup'>sign up</Link>!</p>          
      </div>    
    </main>
  );
}

export default UserSignIn;
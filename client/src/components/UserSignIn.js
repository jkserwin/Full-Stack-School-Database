import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function UserSignIn() {
  
  const [ user, setUser ] = useState({
    emailAddress: '',
    password: '',
    errors: [],
  });
  
  // add onSubmit={signIn} to Sign In button
  // fix cancel button 
  return(
    <main>
      <div className='form--centered'>
        <h2>Sign In</h2>
        <form>
          <label for='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' value={user.emailAddress}/>
          <label for='password'>Password</label>
          <input id='password' name='password' type='password' value={user.password}/>
          <button className='button' type='submit'>Sign In</button>
          <button className='button button-secondary' onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
        </form>
        <p>Don't have a user account? Click here to <Link to='/signup'>sign up</Link>!</p>          
      </div>    
    </main>
  );
}

export default UserSignIn;
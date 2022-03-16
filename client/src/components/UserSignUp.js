import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../Context';

function UserSignUp() {

  const context = useContext(Context);

  const [ firstName, setFirstName ] = useState();
  const [ lastName, setLastName ] = useState();
  const [ emailAddress, setEmailAddress ] = useState();
  const [ password, setPassword ] = useState();
  
  const cancel = (e) => {
    context.actions.cancelHandler(e);
  }

  return(
    <main>
      <div className='form--centered'>
        <h2>Sign Up</h2>
        <form>
          <label for='firstName'>First Name</label>
          <input id='firstName' name='firstName' type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
          <label for='lastName'>Last Name</label>
          <input id='lastName' name='lastName' type='text' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
          <label for='emailAddress'>Email Address</label>
          <input id='emailAddress' name='emailAddress' type='email' value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)}/>
          <label for='password'>Password</label>
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
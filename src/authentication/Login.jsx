import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

/**
 * Login component handles user login using Firebase authentication.
 *
 * @returns {JSX.Element} The Login component.
 */
const Login = () => {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Handle form submission for login
   * 
   * @param {Object} e - event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error('Error logging in: ', error);
      setError(error.message);
    }
  };

  return (
    <div className='form-container'>
      <h1>Login</h1>
      {error && <Message severity='error' text={error} />}
      <form onSubmit={handleSubmit}>
        <div className='p-field'>
          <label htmlFor='email'>Email:</label>
          <InputText
            id='email'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='p-field'>
          <label htmlFor='password'>Password:</label>
          <Password
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            feedback={false}
            required
          />
        </div>
        <Button label='Login' icon='pi pi-sign-in' type='submit' />
      </form>
      <div className='form-footer'>
        <span>Don't have an account? </span>
        <Button label='Sign Up' className='p-button-link' onClick={() => navigate('/signup')} />
      </div>
    </div>
  );
};

export default Login;


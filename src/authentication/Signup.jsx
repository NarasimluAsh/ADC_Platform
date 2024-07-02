import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

/**
 * Signup component handles user registration using Firebase authentication.
 *
 * @returns {JSX.Element} The Signup component.
 */
const Signup = () => {
  // State variables for email, password, and error message
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  /**
   * Handle form submission for signup
   * 
   * @param {Object} e - event object
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await addUserDetail(userCredential.user.uid);
      console.log('User signed up and details stored:', userCredential.user);
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('This email is already in use. Please try logging in.');
      } else {
        console.error('Error signing up: ', error);
        setError('An error occurred during signup. Please try again.');
      }
    }
  };

  /**
   * Store user detail in Firestore
   * 
   * @param {string} userId - Firebase user ID
   */
  const addUserDetail = async (userId) => {
    try {
      await setDoc(doc(db, 'Users', userId), {
        email,
        created_date: new Date().toISOString(),
      });
      console.log('User detail added to Firestore with user ID: ', userId);
    } catch (error) {
      console.error('Error adding user detail: ', error);
      setError('Failed to store user detail.');
    }
  };

  return (
    <div className='form-container'>
      <h1>Sign Up</h1>
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
        <Button label='Sign Up' icon='pi pi-user-plus' type='submit' />
      </form>
      <div className='form-footer'>
        <span>Already have an account? </span>
        <Button label='Login' className='p-button-link' onClick={() => navigate('/login')} />
      </div>
    </div>
  );
};

export default Signup;

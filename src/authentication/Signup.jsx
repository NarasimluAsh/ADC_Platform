import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

const Signup = () => {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      addUserDetail();
      navigate('/');
    } catch (error) {
      console.error('Error signing up: ', error);
      setError(error.message);
    }
  };

  // Store user detail
  const addUserDetail = async (e) => {
    try {
      const docRef = await addDoc(collection(db, 'Users'), {
        email,
        created_date: "",
      })
      console.log(docRef);
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className='form-container'>
      <h1>Sign Up</h1>
      {error && <Message severity="error" text={error} />}
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="email">Email:</label>
          <InputText
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="p-field">
          <label htmlFor="password">Password:</label>
          <Password
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            feedback={false}
            required
          />
        </div>
        <Button label="Sign Up" icon="pi pi-user-plus" type="submit" />
      </form>
      <div className="form-footer">
        <span>Already have an account? </span>
        <Button label="Login" className="p-button-link" onClick={() => navigate('/login')} />
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Signup = () => {
  // State variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle form submission for signup
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      addUserDetail();
      navigate('/');
    } catch (error) {
      console.error('Error signing up: ', error);
      alert(error.message);
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <div className="form-footer">
        <span>Already have an account? </span>
        <a onClick={() => navigate('/login')}>Login</a>
      </div>
    </div>
  );
};

export default Signup;

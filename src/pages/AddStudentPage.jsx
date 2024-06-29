import React, { useState } from 'react';

const AddStudentPage = () => {
  const [formData, setFormData] = useState({
    learnerName: '',
    age: '',
    dob: '',
    gender: '',
    reviewDate: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <form className='IEP-form' onSubmit={handleSubmit}>
      <h1>Create IEP</h1>

      <h2>Student Information</h2>
      <div>
        <label>Learner’s Name</label>
        <input type="text" name="learnerName" value={formData.learnerName} onChange={handleChange} required />
        {errors.learnerName && <span className="error">{errors.learnerName}</span>}
      </div>
      <div>
        <label>Age</label>
        <input type="number" name="age" value={formData.age} onChange={handleChange} required />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>
      <div>
        <label>Date of Birth</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        {errors.dob && <span className="error">{errors.dob}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddStudentPage;
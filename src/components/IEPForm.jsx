import React, { useState } from 'react';
import './IEPForm.css';

const IEPForm = () => {
  const [formData, setFormData] = useState({
    learnerName: '',
    age: '',
    dob: '',
    sex: '',
    school: '',
    grade: '',
    address: '',
    guardianName: '',
    contactNumber: '',
    disabilities: [],
    medication: '',
    allergies: '',
    interests: '',
    preferences: '',
    hobbies: '',
    skills: '',
    intellectualFunctioning: '',
    classPerformance: '',
    learningEnvironment: '',
    externalFactors: '',
    academicSkills: '',
    socialEmotionalDevelopment: '',
    functionalSkills: '',
    specialFactors: [],
    annualGoals: '',
    termGoals: '',
    shortTermGoals: '',
    resourcesRequired: '',
    staffResponsible: '',
    iepTeam: '',
    reviewDate: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData((prev) => {
      const updatedDisabilities = checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value);
      return { ...prev, [name]: updatedDisabilities };
    });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.learnerName) formErrors.learnerName = 'Learner’s Name is required';
    if (!formData.age) formErrors.age = 'Age is required';
    if (!formData.dob) formErrors.dob = 'Date of Birth is required';
    if (!formData.sex) formErrors.sex = 'Sex is required';
    if (!formData.school) formErrors.school = 'School is required';
    if (!formData.grade) formErrors.grade = 'Grade/Class/Level is required';
    if (!formData.address) formErrors.address = 'Residential Address is required';
    if (!formData.guardianName) formErrors.guardianName = 'Guardian’s Name is required';
    if (!formData.contactNumber) formErrors.contactNumber = 'Contact Number is required';
    if (!formData.reviewDate) formErrors.reviewDate = 'Proposed date of review is required';
    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // Submit form data to the server or database
      console.log(formData);
    } else {
      setErrors(formErrors);
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
      <div>
        <label>Sex</label>
        <select name="sex" value={formData.sex} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.sex && <span className="error">{errors.sex}</span>}
      </div>
      <div>
        <label>School</label>
        <input type="text" name="school" value={formData.school} onChange={handleChange} required />
        {errors.school && <span className="error">{errors.school}</span>}
      </div>
      <div>
        <label>Grade/Class/Level</label>
        <input type="text" name="grade" value={formData.grade} onChange={handleChange} required />
        {errors.grade && <span className="error">{errors.grade}</span>}
      </div>
      <div>
        <label>Residential Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        {errors.address && <span className="error">{errors.address}</span>}
      </div>
      <div>
        <label>Name of Responsible Party/Guardian</label>
        <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} required />
        {errors.guardianName && <span className="error">{errors.guardianName}</span>}
      </div>
      <div>
        <label>Contact Number</label>
        <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
        {errors.contactNumber && <span className="error">{errors.contactNumber}</span>}
      </div>

      <h2>Type(s) of Disability/Disabilities</h2>
      {[
        'Autism',
        'Deaf-Blindness',
        'Emotional & Behavioural Disorders (ADHD)',
        'Hearing Impairment',
        'Intellectual Disability',
        'Visual Impairment',
        'Other Health Impairment',
        'Orthopaedics Impairment',
        'Speech and Language impairment',
        'Learning Disabilities (Dyslexia & Dysgraphia)',
        'Multiple Disabilities'
      ].map((disability) => (
        <div className='checkbox-container' key={disability}>
          <input
            type="checkbox"
            name="disabilities"
            value={disability}
            checked={formData.disabilities.includes(disability)}
            onChange={handleCheckboxChange}
          />
          <label>{disability}</label>
        </div>
      ))}

      <h2>Current Medication</h2>
      <div>
        <label>Current Medication</label>
        <textarea name="medication" value={formData.medication} onChange={handleChange}></textarea>
      </div>
      <h2>Allergies</h2>
      <div>
        <label>Allergies</label>
        <textarea name="allergies" value={formData.allergies} onChange={handleChange}></textarea>
      </div>

      <h2>Learner's Preferences and Interests</h2>
      <div>
        <label>Learner’s Interests</label>
        <textarea name="interests" value={formData.interests} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Learner’s Preferences</label>
        <textarea name="preferences" value={formData.preferences} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Learner’s Hobbies</label>
        <textarea name="hobbies" value={formData.hobbies} onChange={handleChange}></textarea>
      </div>

      <h2>Independent Skills</h2>
      <div>
        <label>Independent Skills</label>
        <textarea name="skills" value={formData.skills} onChange={handleChange}></textarea>
      </div>

      <h2>Personal Qualities of the Learner</h2>
      <div>
        <label>Level of Intellectual Functioning</label>
        <textarea name="intellectualFunctioning" value={formData.intellectualFunctioning} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Performance in class</label>
        <textarea name="classPerformance" value={formData.classPerformance} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Learning environment requirements</label>
        <textarea name="learningEnvironment" value={formData.learningEnvironment} onChange={handleChange}></textarea>
      </div>

      <h2>Factors Affecting Educational Progress</h2>
      <div>
        <label>External factors</label>
        <textarea name="externalFactors" value={formData.externalFactors} onChange={handleChange}></textarea>
      </div>

      <h2>Present Level of Performance and Functioning</h2>
      <div>
        <label>Academic skills</label>
        <textarea name="academicSkills" value={formData.academicSkills} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Social/Emotional Development</label>
        <textarea name="socialEmotionalDevelopment" value={formData.socialEmotionalDevelopment} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Functional Skills</label>
        <textarea name="functionalSkills" value={formData.functionalSkills} onChange={handleChange}></textarea>
      </div>

      <h2>Special Factors Consideration</h2>
      {[
        'Special transportation needs',
        'Behavioral impact on learning',
        'Language needs',
        'Communication needs',
        'Assistive technology needs',
        'Other factors'
      ].map((factor) => (
        <div className='checkbox-container' key={factor}>
          <input
            type="checkbox"
            name="specialFactors"
            value={factor}
            checked={formData.specialFactors.includes(factor)}
            onChange={handleCheckboxChange}
          />
          <label>{factor}</label>
        </div>
      ))}

      <h2>Annual Goals</h2>
      <div>
        <label>Annual Goals</label>
        <textarea name="annualGoals" value={formData.annualGoals} onChange={handleChange}></textarea>
      </div>

      <h2>Term Goals</h2>
      <div>
        <label>Term Goals</label>
        <textarea name="termGoals" value={formData.termGoals} onChange={handleChange}></textarea>
      </div>

      <h2>Short-term SMART Goals</h2>
      <div>
        <label>Short-term SMART Goals</label>
        <textarea name="shortTermGoals" value={formData.shortTermGoals} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Resources required</label>
        <textarea name="resourcesRequired" value={formData.resourcesRequired} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Person/Staff responsible</label>
        <textarea name="staffResponsible" value={formData.staffResponsible} onChange={handleChange}></textarea>
      </div>

      <h2>IEP Team</h2>
      <div>
        <label>IEP Team</label>
        <textarea name="iepTeam" value={formData.iepTeam} onChange={handleChange}></textarea>
      </div>
      <div>
        <label>Proposed date of review</label>
        <input type="date" name="reviewDate" value={formData.reviewDate} onChange={handleChange} required />
        {errors.reviewDate && <span className="error">{errors.reviewDate}</span>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default IEPForm;

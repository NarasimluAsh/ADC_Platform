import React from 'react';
import { useNavigate } from 'react-router-dom';

const ClassroomPage = () => {
    const navigate = useNavigate();
    return (
        <div className="Classroom-container">
            <h1>Classrooms</h1>
            <button
                className="add-student-page"
                onClick={() => navigate('/add-student')}
            >Add Student IEP</button>
        </div>
    );
};

export default ClassroomPage;

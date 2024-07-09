import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';


const ClassroomPage = () => {

    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch students from Firestore
        const fetchStudents = async () => {
            const studentsRef = db.collection('IEPs');
            const snapshot = await studentsRef.get();
            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }

            let studentsList = [];
            snapshot.forEach(doc => {
                studentsList.push(doc.data().name); // Assuming 'name' is a field in your student documents
            });

            setStudents(studentsList);
        };

        fetchStudents();
    }, []);

    return (
        <div className="Classroom-container">
            <h1>Classrooms</h1>
            <ul>
                {students.map((student, index) => (
                    <li key={index}>{student}</li>
                ))}
            </ul>
            <button
                className="add-student-page"
                onClick={() => navigate('/add-student')}
            >Add Student IEP</button>
        </div>
    );
};

export default ClassroomPage;

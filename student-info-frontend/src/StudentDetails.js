import React from 'react';
import './StudentDetails.css';

const StudentDetails = ({ students, onEdit, onDelete }) => {
  return (
    <div className="details-section">
      <h2>Student Details</h2>
      {students.length > 0 ? (
        students.map((student) => (
          <div key={student._id} className="details">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>DOB:</strong> {new Date(student.dob).toLocaleDateString()}</p>
            <p><strong>Math:</strong> {student.math}</p>
            <p><strong>Physics:</strong> {student.physics}</p>
            <p><strong>Chemistry:</strong> {student.chemistry}</p>
            <p><strong>Cutoff:</strong> {student.cutoff}</p>
            <button onClick={() => onEdit(student)}>Edit</button>
            <button onClick={() => onDelete(student._id)}>Delete</button>
            <hr />
          </div>
        ))
      ) : (
        <p>No student details to display. Submit the form to see details here.</p>
      )}
    </div>
  );
};

export default StudentDetails;

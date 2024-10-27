import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentDetails from './StudentDetails';
import './StudentForm.css';

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    dob: '',
    math: '',
    physics: '',
    chemistry: ''
  });
  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { math, physics, chemistry } = student;
    if (math < 0 || math > 100 || physics < 0 || physics > 100 || chemistry < 0 || chemistry > 100) {
      alert('Marks must be between 0 and 100.');
      return;
    }

    try {
      if (isEditing) {
        // Update student
        const response = await axios.put(`http://localhost:5000/api/students/${editId}`, student);
        setStudents(students.map((s) => (s._id === editId ? response.data.student : s)));
        alert('Student data updated successfully!');
        setIsEditing(false);
        setEditId(null);
      } else {
        // Add new student
        const response = await axios.post('http://localhost:5000/api/students', student);
        setStudents([...students, response.data.student]);
        alert('Student data submitted successfully!');
      }
      setStudent({ name: '', email: '', dob: '', math: '', physics: '', chemistry: '' });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleEdit = (student) => {
    setStudent(student);
    setIsEditing(true);
    setEditId(student._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`);
      setStudents(students.filter((s) => s._id !== id));
      alert('Student data deleted successfully!');
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="container">
      <div className="form-section">
        <h2>{isEditing ? 'Edit Student Data' : 'Submit Student Data'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={student.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={student.email} onChange={handleChange} required />
          <input type="date" name="dob" value={student.dob} onChange={handleChange} required />
          <input type="number" name="math" placeholder="Math Marks" value={student.math} onChange={handleChange} required />
          <input type="number" name="physics" placeholder="Physics Marks" value={student.physics} onChange={handleChange} required />
          <input type="number" name="chemistry" placeholder="Chemistry Marks" value={student.chemistry} onChange={handleChange} required />
          <button type="submit">{isEditing ? 'Update' : 'Submit'}</button>
        </form>
      </div>
      <StudentDetails students={students} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default StudentForm;

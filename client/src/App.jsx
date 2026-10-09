import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/students";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [age, setAge] = useState("");
  const [editingId, setEditingId] = useState(null);


  const getStudents = async () => {
    const response = await axios.get(API_URL);
    setStudents(response.data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  
  const handleSubmit = async () => {
    const studentData = { name, course, age };

    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, studentData);
    } else {
      await axios.post(API_URL, studentData);
    }

    setName("");
    setCourse("");
    setAge("");
    setEditingId(null);
    getStudents();
  };

 
  const handleEdit = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setCourse(student.course);
    setAge(student.age);
  };

 
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    getStudents();
  };

  return (
    <div>
      <h1>Student Management System</h1>

      <h2>{editingId ? "Edit Student" : "Add Student"}</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /> <br />
      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <br /> <br />
      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <br /> <br />

      <button onClick={handleSubmit}>
        {editingId ? "Update Student" : "Add Student"}
      </button>

      <h2>Students</h2>
 
      {students.length === 0 && <p>No students yet.</p>}

      {students.map((student) => (
        <div key={student._id}>
          <p>{student.name}</p>
          <p>{student.course}</p>
          <p>{student.age}</p>
          <button onClick={() => handleEdit(student)}>Edit</button>
          <button onClick={() => handleDelete(student._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;
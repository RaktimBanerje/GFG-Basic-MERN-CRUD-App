// CreateStudent Component for add new student

// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import StudentForm from "./StudentForm";

// CreateStudent Component
const CreateStudent = () => {
 
  const [formValues, setFormValues] = useState({ name: '', email: '', rollno: '' })
 
  // onSubmit handler
  const onSubmit = studentObject => {
    const form = new FormData()
    for(const [key, value] of Object.entries(studentObject)){
      form.append(key, value)
    }
    axios.post('http://localhost:4000/students/create-student', form)
      .then(res => {
        if (res.status === 200)
          alert('Student successfully created')
        else
          Promise.reject()
      })
      .catch(err => alert('Something went wrong'))
  }
  // Retuern student form
  return(
    <StudentForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
      Create Student
    </StudentForm>
  )
}
// Export CreateStudent Component
export default CreateStudent
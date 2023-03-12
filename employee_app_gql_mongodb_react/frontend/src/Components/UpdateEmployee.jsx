import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { UPDATE_EMPLOYEE } from './Mutations/employeeMutation';

const UpdateEmployee = () => {

    const [formData, setFormData] = useState({});
    const [updateEmployee, { loading, error }] = useMutation(UPDATE_EMPLOYEE);

    const handleSubmit = (event) => {
        event.preventDefault();
        updateEmployee({ variables: { _id: formData._id, updatedEmployee: formData } });
      };
  
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

        if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
  }
      };
  return (
    <div>
          <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
      </label>
      <label>
        Salary:
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} />
      </label>
      <label>
        Department:
        <input type="text" name="department" value={formData.department} onChange={handleChange} />
      </label>
      <label>
        Image:
        <input type="text" name="image" value={formData.image} onChange={handleChange} />
      </label>
      <label>
        Age:
        <input type="number" name="age" value={formData.age} onChange={handleChange} />
      </label>
      <label>
        Hobbies:
        <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} />
      </label>
      <button type="submit">Update Employee</button>
    </form>
    </div>
  )
}

export default UpdateEmployee

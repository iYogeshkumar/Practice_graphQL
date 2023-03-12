import React, { useEffect, useState } from "react";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { client } from "./Client";
import gql from "graphql-tag";
import { GET_ALL_EMPLOYEE } from "./Queries/Getallquery";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_EMPLOYEE, UPDATE_EMPLOYEE } from "./Mutations/employeeMutation";
import { Link } from "react-router-dom";

const GetAllEmployees = () => {
  //get
  const { loading, error, data } = useQuery(GET_ALL_EMPLOYEE)
    //delete
    const [deleteEmployee]= useMutation(DELETE_EMPLOYEE)
    const deleteData = (id)=>{
      deleteEmployee({
        variables:{
          id
        },refetchQueries:[
          {query: GET_ALL_EMPLOYEE},
          'getAllEmployees'
        ]
      })
     
    }

    //update
    const [id, setid] = useState(0);
    const [formData, setFormData] = useState({});
    const [updateEmployee, { load, err }] = useMutation(UPDATE_EMPLOYEE,{
      refetchQueries:[
        {query: GET_ALL_EMPLOYEE},
        'getAllEmployees'
      ]
    });
    const handleClickOpen = (id) => {
      console.log(id)
      setid(id);
      
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      updateEmployee({ variables: { _id:id, updatedEmployee: formData } });
    };
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

      if (load) return <p>Loading...</p>;
if (err) {
  console.log(error);
}
    };

  const newArr = data?.getemployees.map((v,index)=> ({...v, SNO: index+1}))

  console.log(newArr)


  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
  }


 
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>mongo ID</TableCell>

              <TableCell align="center">FIRSTNAME</TableCell>
              <TableCell align="center">LASTNAME</TableCell>
              <TableCell align="center">SALARY</TableCell>
              <TableCell align="center">DEPARTMENT</TableCell>
              <TableCell align="center">IMAGE</TableCell>
              <TableCell align="center">AGE</TableCell>
              <TableCell align="center">HOBBIES</TableCell>
              <TableCell align="center">DELETE</TableCell>
              <TableCell align="center">UPDATE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
            {newArr?.map((e) => (

              <TableRow
                key={e._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {e.SNO}
                </TableCell>
                <TableCell align="center">{e._id}</TableCell>
                <TableCell align="center">{e.firstName}</TableCell>
                <TableCell align="center">{e.lastName}</TableCell>
                <TableCell align="center">{e.salary}</TableCell>
                <TableCell align="center">{e.department}</TableCell>
                <TableCell align="center">{e.image}</TableCell>
                <TableCell align="center">{e.age}</TableCell>
                <TableCell align="center">{e.hobbies}</TableCell>

                <TableCell 
                align="center" 
                onClick={() => deleteData(e._id)}
                >
                <Tooltip title="Delete">
                <IconButton>
                  <DeleteIcon />
                 </IconButton>
                  </Tooltip>
                </TableCell>
                
                <TableCell
                  align="center"
                  onClick={() => handleClickOpen(e._id)}
                >
                  <EditIcon />
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>


      {/* //update */}
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
    </>
  );
};

export default GetAllEmployees;

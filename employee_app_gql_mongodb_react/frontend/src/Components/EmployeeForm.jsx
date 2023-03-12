import { useMutation } from "@apollo/client";
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useState } from "react";
import { ADD_EMPLOYEE } from "./Mutations/employeeMutation";
import { GET_ALL_EMPLOYEE } from "./Queries/Getallquery";

const EmployeeForm = () => {

  const [formData, setformData] = useState({});
  const [addemployee,{data,loading,error}]=useMutation(ADD_EMPLOYEE,{
    refetchQueries:[
      {query: GET_ALL_EMPLOYEE},
      'getAllEmployees'
    ]
  })

  if (loading) return <h1>Loading</h1>;
 


    const handleChange = (e) => {
      let type = e.target.name
   
      if(type=='salary' || type=='age') {
        setformData({
          ...formData,
          [e.target.name]: +e.target.value,
        }); 
      }else{
        setformData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      }
    
      };
      
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(typeof(+formData.salary))
        addemployee({
          variables:{ 
            new:formData,
          }
        });
      };
  return (
    <div>
      <Box
        width={{ base: "90%", sm: "90%", md: "30%", lg: "30%" }}
        margin="auto"
        margin-top="200px"
        padding="30px"
        borderRadius="20px"
        textAlign="center"
        boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
      >
        <form action="" onSubmit={handleSubmit}>
          {error && <Alert severity="error">{error.message}</Alert>}

          {data && data.newEmployee && (
            <Alert severity="success">
              {data.newEmployee.firstName} is SignedUp successfully.
            </Alert>
          )}

          <h2 style={{ fontSize: "30px", fontWeight: "600" }}>
            Add Details of Employee 
          </h2>
          <TextField
          
            onChange={handleChange}
            type="text"
            name="firstName"
            id="outlined-basic"
            label="Enter First Name"
            margin="dense"
            fullWidth
            variant="filled"
          />
          <TextField
           
            onChange={handleChange}
            type="text"
            name="lastName"
            id="outlined-basic"
            label="Enter Last Name"
            margin="dense"
            fullWidth
            variant="filled"
          />
          <TextField
          
            
            onChange={handleChange}
            name="salary"
            type="number"
            id="filled-basic"
            label="Enter salary"
            margin="dense"
            fullWidth
            variant="filled"
          />
          <TextField
           
           onChange={handleChange}
           name="department"
           type="text"
           id="outlined-basic"
           label="department"
           margin="dense"
           fullWidth
           variant="filled"
         />

          
          <TextField
           
            onChange={handleChange}
            name="image"
            type="url"
            id="outlined-basic"
            label="Enter image url"
            margin="dense"
            fullWidth
            variant="filled"
          />
          <TextField
            
            onChange={handleChange}
            name="age"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            type="number"
            id="outlined-basic"
            label="Enter age"
            margin="dense"
            fullWidth
            variant="filled"
          />
            <TextField
            name="hobbies"
             required
             onChange={handleChange}
          id="filled-multiline-flexible"
          label="Multiline hobbies"
          multiline
          fullWidth
          maxRows={4}
          variant="filled"
        />


          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
};

export default EmployeeForm;

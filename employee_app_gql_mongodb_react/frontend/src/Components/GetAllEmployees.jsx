import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { client } from "./Client";
import gql from "graphql-tag";
import { GET_ALL_EMPLOYEE } from "./Queries/Getallquery";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_EMPLOYEE, UPDATE_EMPLOYEE } from "./Mutations/employeeMutation";
import { Link, useNavigate } from "react-router-dom";

const GetAllEmployees = () => {
  //get
  const { loading, error, data } = useQuery(GET_ALL_EMPLOYEE);
  //delete
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
  const deleteData = (id) => {
    deleteEmployee({
      variables: {
        id,
      },
      refetchQueries: [{ query: GET_ALL_EMPLOYEE }, "getAllEmployees"],
    });
  };

  //update
  const [id, setid] = useState(0);
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();

  const [updateEmployee, { load, err }] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_ALL_EMPLOYEE }, "getAllEmployees"],
  });
  const handleClickOpen = (id) => {
    console.log(id);
    setid(id);
    setOpen(true);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    updateEmployee({ variables: { _id: id, updatedEmployee: formData } });
    setOpen(false);
  };
  const handleChange = (e) => {
    let type = e.target.name;

    if (type == "salary" || type == "age") {
      setFormData({
        ...formData,
        [e.target.name]: +e.target.value,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }

    if (load) return <p>Loading...</p>;
    if (err) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  const newArr = data?.getemployees.map((v, index) => ({
    ...v,
    SNO: index + 1,
  }));

  console.log("new", newArr);

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
              {/* <TableCell>mongo ID</TableCell> */}

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
                {/* <TableCell align="center">{e._id}</TableCell> */}
                <TableCell align="center"><Link to={`/getallemployees/${e._id}` } style={{textDecoration:"none",color:"white"}}>
                  <TableRow>
                    <TableCell align="center">{e.firstName}
                    <OpenInNewIcon style={{fontSize :"small"}}/>
                    </TableCell>
                  </TableRow>
                </Link></TableCell>
                
                <TableCell align="center">{e.lastName}</TableCell>
                <TableCell align="center">{e.salary}</TableCell>
                <TableCell align="center">{e.department}</TableCell>
                <TableCell align="center">{e.image}</TableCell>
                <TableCell align="center">{e.age}</TableCell>
                <TableCell align="center">{e.hobbies}</TableCell>

                <TableCell align="center" onClick={() => deleteData(e._id)}>
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
                   <Tooltip title="Edit">
                   <IconButton>
                  <EditIcon />
                  </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* //update */}
      {/* <div>
      <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input type="text" name="firstName"  onChange={handleChange} />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName"  onChange={handleChange} />
      </label>
      <label>
        Salary:
        <input type="number" name="salary"  onChange={handleChange} />
      </label>
      <label>
        Department:
        <input type="text" name="department"  onChange={handleChange} />
      </label>
      <label>
        Image:
        <input type="text" name="image"  onChange={handleChange} />
      </label>
      <label>
        Age:
        <input type="number" name="age"  onChange={handleChange} />
      </label>
      <label>
        Hobbies:
        <input type="text" name="hobbies"  onChange={handleChange} />
      </label>
      <button type="submit">Update Employee</button>
    </form>
    </div> */}

      {/* update data */}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <DialogContentText>Update your data</DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              name="firstName"
              onChange={handleChange}
              id="outlined-basic"
              label="First Name"
              margin="dense"
              fullWidth
              variant="filled"
            />

            <TextField
              type="text"
              name="lastName"
              onChange={handleChange}
              id="outlined-basic"
              label="Last Name"
              margin="dense"
              fullWidth
              variant="filled"
            />

            <TextField
              type="number"
              name="salary"
              onChange={handleChange}
              id="outlined-basic"
              label="Salary"
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
              type="number"
              id="outlined-basic"
              label="Enter age"
              margin="dense"
              fullWidth
              variant="filled"
            />
            <TextField
              name="hobbies"
              
              onChange={handleChange}
              id="filled-multiline-flexible"
              label="Multiline hobbies"
              multiline
              fullWidth
              maxRows={4}
              variant="filled"
            />
            <Button type="submit" variant="contained">
              Update Employee
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GetAllEmployees;

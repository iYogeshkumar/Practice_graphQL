import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { client } from "./Client";
import gql from "graphql-tag";
import { GET_EMPLOYEE_BY_ID } from "./Queries/Getallquery";
import { useQuery } from "@apollo/client";

export default function SingleEmployee() {
  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: {
      userid: "640acf403ee6f7c1892d5b03",
    },
  });

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
  }

  const { _id, firstName, lastName,salary,department, image,age,hobbies} = data.getemployeebyid;

  return (
    <Box
      width={{ base: "60%", sm: "30%", md: "60%", lg: "90%" }}
      margin="auto"
      margin-top="200px"
      padding="100px"
      borderRadius="20px"
      textAlign="center"
      boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
    >
      {/* <h2>ID:{_id}</h2><br />
     <h2>FIRSTNAME:{firstName}</h2><br />
     <h2>LASTNAME:{lastName}</h2><br />
     <h2>SALARY:{salary}</h2><br />
     <h2>DEPARTMENT:{department}</h2><br />
     <h2>IMAGE URL:{image}</h2><br />
     <h2>AGE:{age}</h2><br />
     <h2>HOBBIES:{hobbies}</h2> */}


     <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
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
            
              <TableRow
               
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {_id}
                </TableCell>
                <TableCell align="center">{firstName}</TableCell>
                <TableCell align="center">{lastName}</TableCell>
                <TableCell align="center">{salary}</TableCell>
                <TableCell align="center">{department}</TableCell>
                <TableCell align="center">{image}</TableCell>
                <TableCell align="center">{age}</TableCell>
                <TableCell align="center">{hobbies}</TableCell>

                

                <TableCell
                  align="center"
                  // onClick={() => handleClickOpen(e.id)}
                >
                  <EditIcon />
                </TableCell>
              </TableRow>
          
          </TableBody>
        </Table>
      </TableContainer>
     
     
    </Box>


  );
}

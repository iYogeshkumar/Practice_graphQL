import { gql } from "@apollo/client";

export const GET_ALL_EMPLOYEE= gql`
query getAllEmployees{
    getemployees{
      _id
      firstName
      lastName
      salary
      department
      image
      age
      hobbies
    }
  }


`
export const GET_EMPLOYEE_BY_ID= gql`
query getuser($userid:ID!){
    getemployeebyid(_id:$userid){
    _id
      firstName
      lastName
      salary
      department
      image
      age
      hobbies
    }
    }

`
import { gql } from "@apollo/client";

export const ADD_EMPLOYEE= gql`
mutation employee($new:employeeInput) {
  newEmployee:addEmployee(newEmployee:$new) {
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

export const DELETE_EMPLOYEE = gql`
mutation deleteEmployee($id:ID!){
  deleteEmployee(_id:$id)
 }
`

export const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee($_id: ID!, $updatedEmployee: employeeInput!) {
    updateEmployee(_id: $_id, updatedEmployee: $updatedEmployee) {
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
`;
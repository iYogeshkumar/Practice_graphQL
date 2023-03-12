import { gql } from "@apollo/client";


export const ADD_LOGIN_EMPLOYEE=gql`
mutation login($new:employeeLoginInput) {
    newLogin:addLogin(newLogin:$new) {
      _id
      email
      password
      }
    }

`
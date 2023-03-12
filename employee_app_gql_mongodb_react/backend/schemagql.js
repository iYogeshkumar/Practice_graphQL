const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    getemployees:[employee]
    getemployeebyid(_id:ID!):employee
    
  }

  type employee {
    _id:ID!
    firstName:String
    lastName:String
    salary:Int
    department:String
    image:String
    age:Int
    hobbies:[String]
  }

 

  input employeeInput{
    firstName:String
    lastName:String
    salary:Int
    department:String
    image:String
    age:Int
    hobbies:[String]
  }

  type Mutation{
    addEmployee(newEmployee:employeeInput):employee
    deleteEmployee(_id:ID!):String
    updateEmployee(_id: ID!, updatedEmployee: employeeInput): employee
  }

  `;

  module.exports = typeDefs;
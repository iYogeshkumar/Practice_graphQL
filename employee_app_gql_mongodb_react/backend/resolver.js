const EmployeeModel = require("./models/employeeform.js");
const LoginModel = require("./models/loginModel.js");


const resolvers = {
  Query: {
    getemployees: async () => {
      const employee = await EmployeeModel.find();
      return employee;
    },
    getemployeebyid:async (_,args)=>{
      const employee = await EmployeeModel.findById({ _id: args._id })
      return employee;
    },
    

  },
  Mutation: {
    addEmployee: async (_, args) => {
      console.log("hey", args);
      const employee = await new EmployeeModel({
        firstName: args.newEmployee.firstName,
        lastName: args.newEmployee.lastName,
        salary: args.newEmployee.salary,
        department: args.newEmployee.department,
        image:args.newEmployee.image,
        age:args.newEmployee.age,
        hobbies:args.newEmployee.hobbies
      });
     await employee.save();
     if(employee){
        return employee;
     }
    },
    deleteEmployee: async (_, args) => {
      const employee = await EmployeeModel.findByIdAndDelete({
        _id: args._id,
      });
      if (employee) return "Deleted successfully";
    },
    updateEmployee: async (_, { _id, updatedEmployee }) => {
      const { firstName, lastName, salary, department, image, age, hobbies } = updatedEmployee;
      const filter = { _id };
      const update = { firstName, lastName, salary, department, image, age, hobbies };
      const options = { new: true };

      const updatedEmp = await EmployeeModel.findOneAndUpdate(filter, update, options);
      return updatedEmp;
    },
    addLogin: async(_,args)=>{
      console.log("log",args)
      const loginEmployee= await new LoginModel({
        email:args.newLogin.email,
        password:args.newLogin.password
      })
      await loginEmployee.save();
      if(loginEmployee)
      return loginEmployee
    }
  },
};

module.exports = resolvers;

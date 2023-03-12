const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName :{type:String,required:true},
    lastName :{type:String,required:true},
    salary :{type:Number,required:true,},
    department:{type:String,required:true},
    image:{type:String,required:true},
    age:{type:Number,required:true},
    hobbies:{type:[String],required:true}
    

  
});

employeeSchema.set('versionKey', false);

const EmployeeModel= mongoose.model('employee', employeeSchema);

module.exports = EmployeeModel;

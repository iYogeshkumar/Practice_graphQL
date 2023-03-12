const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    email :{type:String,required:true},
    password :{type:String,required:true},
});

loginSchema.set('versionKey', false);

const LoginModel= mongoose.model('login', loginSchema);

module.exports = LoginModel;
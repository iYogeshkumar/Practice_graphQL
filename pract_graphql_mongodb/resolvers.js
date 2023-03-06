import mongoose from 'mongoose';
import {users,quotes} from './db.js';
import {randomBytes} from 'crypto'
const User = mongoose.model("User")
import bcrypt from 'bcryptjs';
//resolver
const resolvers ={
    Query:{
        users:()=>{
            return users
        },
        quotes:()=>{
            return quotes
        },
        user:(_,args)=>{
            return users.find(user=>user._id == args._id)
        },
        iquote:(_,args)=>{
        return quotes.filter(quote=>quote.by == args.by)
        }

    },
    User:{
        quotes:(ur)=>{
            return quotes.filter(quote=>quote.by==ur._id)}
    },

    Mutation:{
        signupUser:async(_,{userNew})=>{
             //if user is already exist
          const user= await User.findOne({email:userNew.email})          
          if(user){
            throw new Error("user already exist with that email")
          }
          const hashedPassword= await bcrypt.hash(userNew.password,12)
          const newUser= new User({
            ...userNew,
            password:hashedPassword
          })
          return await newUser.save()
        }
    }
}

export default resolvers
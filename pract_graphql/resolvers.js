import {users,quotes} from './db.js';
import {randomBytes} from 'crypto'

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
            return users.find(user=>user.id == args.id)
        },
        iquote:(_,args)=>{
        return quotes.filter(quote=>quote.by == args.by)
        }

    },
    User:{
        quotes:(ur)=>{
            return quotes.filter(quote=>quote.by==ur.id)}
    },

    Mutation:{
        signupUserDummy:(_,{firstName,lastName,email,password})=>{
            const id = randomBytes(5).toString("hex")
            users.push({
                id,
                firstName,
                lastName,
                email,
                password
            })
            return users.find(user => user.id==id)
        }
    }
}

export default resolvers
import { ApolloServer,gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import {users,quotes} from './db.js';

//schema
const typeDefs= gql`
type Query{
    users:[User]
    quotes:[Quote]
    user(id:ID!):User
}

type User{
    id:ID
    firstName:String
    lastName:String
    email:String
    password:String
    quotes:[Quote]
}

type Quote{
    name:String
    by:ID
}
`

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
        }

    },
    User:{
        quotes:(ur)=>{
            return quotes.filter(quote=>quote.by==ur.id)}
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
})

server.listen().then(({url})=>{
    console.log(`server run at ${url}`);
})
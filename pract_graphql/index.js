import { ApolloServer,gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import {users,quotes} from './db.js';

//schema
const typeDefs= gql`
type Query{
    users:[User]
    quotes:[Quote]
}

type User{
    id:ID
    firstName:String
    lastName:String
    email:String
    password:String
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
        }

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
import { gql } from "apollo-server";


//schema
const typeDefs= gql`
type Query{
    users:[User]
    quotes:[Quote]
    user(id:ID!):User
    iquote(by:ID!):[Quote]
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

type Mutation{
    signupUserDummy( firstName:String!,lastName:String!,email:String!,password:String!):User
        
}
`

export default typeDefs
import { ApolloServer,gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";


//schema
const typeDefs= gql`
type Query{
    greet:String
}
`

//resolver
const resolvers ={
    Query:{
        greet:()=>{
            return "Hello world"
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
import { ApolloServer,gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from './schemaGql.js'

import mongoose from "mongoose";
import { MONGO_URL } from "./config.js";

mongoose.connect(MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on("connection",()=>{
    console.log("connected to mongodb")
})
mongoose.connection.on("error",(err)=>{
    console.log("error connecting",err)
})


//import models
import './models/User.js'
import './models/Quotes.js'


import resolvers from "./resolvers.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
})

server.listen().then(({url})=>{
    console.log(`server run at ${url}`);
})
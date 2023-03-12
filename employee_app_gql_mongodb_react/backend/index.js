const { ApolloServer, gql } = require('apollo-server')
const mongoose = require("mongoose");
const {ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const typeDefs = require("./schemagql.js");
const resolvers= require('./resolver.js')

mongoose.set("strictQuery", false)

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
})




mongoose.connect('mongodb+srv://yogesh:yogesh123@cluster0.bn8sdsa.mongodb.net/employee_app?retryWrites=true&w=majority').then(
    result=>{
        server.listen(8000)
    }
).catch(err=>{
    console.log(err)
})
 
mongoose.connection.on("connected",()=>{
    console.log("connected")
})
const {ApolloServer} = require('apollo-server');
const {Pool,Client} = require('pg')

const pool = new Pool({
    user: "student_data_yl8w_user",
    host: "dpg-cfpghrirrk0fd9tf8e70-a.oregon-postgres.render.com",
    database: "student_data_yl8w",
    password: "RKY1yVloQNbxJSYJEVADughQEqmXnNgX",
    port: 5432,
    ssl: true,
  });

  const typeDefs = `
  type Query {
    getStudent: [Student]

  }
  type Student {
    id: Int
    name: String
    roll_no: Int
    class_name:String
  }
`;

const resolvers = {
//     Query: {
//       // crud of students
//       //get
//       getStudent: (root, args, cont) => {
//         return new Promise((res, rej) => {
//           pool.query("SELECT * FROM student", (error, results) => {
//             if (error) {
//               throw error;
//             }
//             res(results.rows);
//           });
//         });
//       },
//   },

    Query:{
        getStudent: async ()=>{
            const student = await pool.query()
            return student
        }
    }
  };

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  server.listen(8080).then(({ url }) => console.log(`Server is running on ${url}`));
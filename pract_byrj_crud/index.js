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
    postStudents(name: String, roll_no: Int, class_name: String): [Student]
    updateStudents(id:Int, name: String, roll_no: Int, class_name: String): [Student]
    deleteStudents (id: Int) : [Student]


  }
  type Student {
    id: Int
    name: String
    roll_no: Int
    class_name:String
  }
`;

const resolvers = {
    Query: {
      // crud of students
      //get---------------------------------------
      getStudent: (root, args, cont) => {
        return new Promise((res, rej) => {
          pool.query("SELECT * FROM student", (error, results) => {
            if (error) {
              throw error;
            }
            res(results.rows);
          });
        });
      },
      // MONGODB SYNTAX-------------------------
    // Query:{
    //     getStudent: async ()=>{
    //         const student = await MODAL_NAME.find()
    //         return student
    //     }
    // }
    //--------------------------------------
      //get---------------------------------------

      //---------------------------post---------------------------
      postStudents: (root, args, cont) =>{
        return new Promise((res, rej)=>{
          pool.query(
            `INSERT INTO student(name, roll_no, class_name) VALUES ($1, $2, $3)`,
            [args.name, args.roll_no, args.class_name],
            (error, results)=>{
              if (error) {
                throw error;
              }
              res([
                {
                  name: args.name,
                  roll_no: args.roll_no,
                  class_name: args.class_name,
                },
              ]);
            }
          );
        });
      },
      //---------------------------post---------------------------
 //---------------------------update---------------------------
      //update
      updateStudents: (root, args, cont) => {
        //console.log(args)
        return new Promise((res, rej) => {
          pool.query(
            "UPDATE student SET name=($1), roll_no=($2), class_name=($3) WHERE id=($4)",
            [
              args.name,
              args.roll_no,
              args.class_name,
              args.id,
            ],
            (error, results) => {
              if (error) {
                throw error;
              }
              res([
                {
                  name: args.name,
                  roll_no: args.roll_no,
                  class_name: args.class,
                },
              ]);
            }
          );
        });
      },
      ///////////////////////update------------------------------------------------

      //---------------detele----------------------------------------------------------
      deleteStudents: (root, args, cont) => {
        return new Promise((res, rej) => {
          const id = args.id;
          //console.log(id);
          pool.query(
            'DELETE FROM "student" WHERE id= ($1)',
            [id],
            (error, results) => {
              if (error) {
                throw error;
              }
              res([
                {
                  id,
                },
              ]);
            }
          );
        });
      },

  },

  


 

  };

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  
  server.listen(8080).then(({ url }) => console.log(`Server is running on ${url}`));
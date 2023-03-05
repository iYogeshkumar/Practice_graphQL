import React, { useState, useEffect } from "react";
import { Client } from "./Client";
import gql from "graphql-tag";

const AllStudents = () => {
    const [data, setdata] = useState([]);
    useEffect(() => {
        getData()
    },[])
    const getData=()=>{
        Client
      .query({
        query: gql`
          query getStudent {
            getStudent {
              id
              name
              roll_no
              class_name
            }
          }
        `,
      })
      .then((r) => {
        console.log(data)
        setdata(r.data.getStudent);
      });
    }


  return (
    <div>
      <button onClick={getData}>All students</button>
      <div>
      {data.map((e)=>(
        <div key={e.id}>
            <h1>{e.id}</h1>
            <h1>{e.name}</h1>
            <h1>{e.roll_no}</h1>
            <h1>{e.class_name}</h1>
        </div>
      ))}
        
       
      </div>
      
    </div>
  )
}

export default AllStudents

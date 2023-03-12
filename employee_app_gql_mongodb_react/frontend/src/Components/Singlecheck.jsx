import React from 'react'
import { gql } from 'graphql';
import { useQuery } from '@apollo/client';
import { GET_ALL_EMPLOYEE } from './Queries/Getallquery';

const Singlecheck = () => {
  const { loading, error, data } = useQuery(GET_ALL_EMPLOYEE)

  console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    
  }


  return (
    <div>
 
      {
        data?.getemployees.map((e) => 
         (
            <div key={e._id}>
              <h1>{e.firstName}</h1>
              <p>{e.salary}</p>
              <p>{e.age}</p>
            </div>
          )
        )
      }
     
    </div>
  )
}

export default Singlecheck
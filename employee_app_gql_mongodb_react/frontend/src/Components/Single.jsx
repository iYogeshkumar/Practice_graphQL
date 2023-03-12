import React from 'react'
import { GET_EMPLOYEE_BY_ID } from './Queries/Getallquery';
import { useQuery } from '@apollo/client';


const Single = () => {
  // console.log(id)
    const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID,{
        variables:{
          "userid": "640968ca215f47cd3557bfac"
        }
    })

  console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
  }

  const {_id,firstName,lastName,} = data.getemployeebyid;
  return (
    <div>
      <p>{_id}</p>
      <p>{firstName}</p>
    </div>
  )
}

export default Single
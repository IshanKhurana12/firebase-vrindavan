import React from 'react'
import Login from '../Components/Login'
function page() {
console.log(process.env.API_KEY);
  return (
    <div>
        <h1>welcome to Login Page</h1>
      <Login />
    </div>
  )
}

export default page

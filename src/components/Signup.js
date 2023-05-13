import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Signup(props) {
  const {showAlert} = props;
  const [credentials, setCredentials] =  useState({name : "", email: "", password : "", cpassword : ""});
  let navigate =  useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const {name, email,password} = credentials;
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name,email,password})
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        // save the auth token & redirect
        localStorage.setItem('token', json.authtoken);
        navigate("/home");
        showAlert("Account created successfully", "success");
      } else{
        showAlert("Invalid credentials", "danger");
      }
  }

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className='conainer my-3' >
      <h2>Create an account to keep your note on the cloud</h2>
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' onChange={onchange} aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' onChange={onchange}  aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' onChange={onchange} required minLength={5} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onchange} required minLength={5} />
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

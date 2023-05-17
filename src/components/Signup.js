import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';

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
      console.log(json + "this is true json");
      if(json.success){
        // save the auth token & redirect
        localStorage.setItem('token', json.authToken);
        console.log(json.authToken + "authtoken sumit fnx");
        showAlert("Account created successfully", "success");
        // delay the navigation to allow time for local storage to update
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else{
        showAlert("Invalid credentials", "danger");
      }
  }

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <> 
    <h2 className='text-center'>Create an account to keep your note on the cloud</h2>
    <div className='conainer d-flex justify-content-center my-4' >
      <form className='boxStyle' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="lightWhite form-label">Name</label>
            <input type="text" className="inputField form-control" id="name" name='name' onChange={onchange} aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="lightWhite form-label">Email address</label>
            <input type="email" className="inputField form-control" id="email" name='email' onChange={onchange}  aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="lightWhite form-label">Password</label>
            <input type="password" className="inputField form-control" id="password" name='password' onChange={onchange} required minLength={5} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="lightWhite form-label">Confirm Password</label>
            <input type="password" className="inputField form-control" id="cpassword" name='cpassword' onChange={onchange} required minLength={5} />
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
    <h6 className='text-center'>Already have an account ? <Link to="/login">Login </Link> </h6>  
    </>
  )
}

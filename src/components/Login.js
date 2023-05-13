import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Login(props) {
  const {showAlert} = props;
  const [credentials, setCredentials] =  useState({email: "", password : ""});
  let history =  useNavigate();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    // http://localhost:5000/api/auth/login
      // TODO : API call
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email : credentials.email, password : credentials.password}),
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        // save the auth token & redirect
        localStorage.setItem('token', json.authToken);
        console.log(localStorage.getItem('token')+ " check");
        console.log( json.authToken + " this is-------------");

        history("/home");
        showAlert("Loggedin successfully", "success");
      }else{
        showAlert("Invalid Details", "danger");
      }
  }

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className='conainer my-3' >
      <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onchange} aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name='password' value={credentials.password} onChange={onchange} />
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

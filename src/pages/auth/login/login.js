import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './login.css'
import GoogleLogin from "../../../components/GoogleLogin";

const Login = ({ token, setToken }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({email: '', password: ''});

  const handleChange = (e) => {
    setUserData((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
     if (userData.email === "") {
       alert("Email is required");;
       return;
     }
    if (userData.password === "") {
      alert("Password is required");
      return; 
    }
    if (userData.email.trim() !== "" && userData.password.trim() !== "") {
      const data = {
        email: userData.email,
        password: userData.password,
      };

      try {
        const result = await axios.post(`https://challenge6-backend.herokuapp.com/api/v1/auth/login`, data);

      
          if (result.data.token) {
            // Set token from backend to local storage
            // {"data": { "token": "ini token" }}
            localStorage.setItem("token", result.data.token);
            setToken(result.data.token);
            navigate('/')
          }
        
      } catch (error) {
        // If there are any error it will show the error message from backend
        // { "message": "Password salah" }
        alert(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    console.log(userData);
  }, [userData])

   useEffect(() => {
     if (token) {
       navigate("/");
     }
   }, []);

  return (
    <div className="login-page">
      <h3>Login In to Your Account</h3>
      <form className="login-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input 
           id="email"
           type="email"
           name='email'
           placeholder="Email Address" 
           onChange={handleChange} 
           value={userData.email} 
           />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
          id="password" 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          value={userData.password} 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login
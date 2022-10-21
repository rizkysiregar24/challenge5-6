import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './register.css'
import GoogleLogin from '../../../components/GoogleLogin';

const Register = ({token, setToken}) => {
  const navigate = useNavigate()
    const [userData, setUserData] = useState({name: '', email: "", password: ""});

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

      if (userData.name === "") {
        alert("Username is required");
        return;
      }

      if (userData.email === "") {
        alert("Email is required");
        return;
      }

      if (userData.password === "") {
        alert("Password is required");
        return;
      }

        if (userData.email.trim() !== "" && userData.password.trim() !== "" && userData.name.trim() !== '') {

            const data = {
                name: userData.name,
                email: userData.email,
                password: userData.password
            };
        
            try {
                const result = await axios.post(`https://challenge6-backend.herokuapp.com/api/v1/auth/register`, data);
                //     method: 'POST', body: JSON.stringify(data)
                // });
                
                // console.log(result);

                if (result.status === 201) {
                    if (result.data.token) {
                        // Set token from backend to local storage
                        // {"data": { "token": "ini token" }}
                        localStorage.setItem("token", result.data.token);
                        setToken(result.data.token);
                        navigate('/')
                      }
                }
            } catch (error) {
                // If there are any error it will show the error message from backend
                // { "message": "Password salah" }
                alert(error.response.data.message);
            }
        }
    };

     useEffect(() => {
       if (token) {
         navigate("/");
       }
     }, []);

  return (
    <div className="register-page">
      <h3>Create Account</h3>
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
        <label htmlFor='name'>Username</label>
        <input id="name"
         type="text" 
         name="name"
         placeholder="Username" 
         onChange={handleChange} 
         value={userData.name} />
        </div>
        <div>
        <label htmlFor='email'>Email</label>
        <input 
        id="email" 
        type="email" 
        name="email" 
        placeholder="Email Address" 
        onChange={handleChange} 
        value={userData.email} />
        </div>
        <div>
        <label htmlFor='password'>Password</label>
        <input 
        id="password" 
        type="password" 
        name="password" 
        placeholder="Password" 
        onChange={handleChange} 
        value={userData.password} />
        </div>
        <button type='submit'>Register Now</button> 
      </form>
    </div>
  );
}

export default Register
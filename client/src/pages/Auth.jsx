import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Auth = () => {
    const [isLogin, setIsLogin]=useState(true);
    const [formData, setFormData]=useState({
        name: '',
        email:'',
        password:'',
        userType:'',
    });

    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=isLogin ? await axios.post('/api/users/login',formData): await axios.post('/api/users/register',formData);
            localStorage.setItem('token',response.data.token);
            localStorage.setItem('userType',response.data.userType);
            navigate('/');
        }
        catch(error){
            console.log("Error during authentication");
        }
    }

  return (
    <div>
      
    </div>
  )
}

export default Auth

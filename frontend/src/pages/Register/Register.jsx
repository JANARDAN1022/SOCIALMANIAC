import React, { useState } from 'react';
import './Register.scss';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

const Register = () => {
  const Navigate = useNavigate();
  const [inputs,setinputs]= useState({
    username:"",
    email:"",
    password:"",
    name:""
  })

   const[err,seterr]=useState("");

   const handleinputchange = (e)=>{
    setinputs(prev=>({...prev,[e.target.name]:e.target.value}));
   }

   const handleregisterclick = async(e)=>{
    e.preventDefault();

    try{
      if(!Object.values(inputs).some((value) => value === '')){
    await axios.post(" http://localhost:5000/api/auth/register",inputs)
    setinputs({
      username:"",
      email:"",
      password:"",
      name:""
    })

      Navigate('/Login');
  }else{
    let Empty = "Please fill in all fields";
      
    if (Object.values(inputs).some((value) => value === ''))
    {
      seterr(Empty);
      setTimeout(() => {
        seterr(null);
        }, 5000); // set timeout to 5 seconds
      }   
   else{
  seterr(err.response.data);
  setinputs({
    username:"",
    email:"",
    password:"",
    name:""
  })
} 
 }
    
  }catch(err){
      let Empty = "Please fill in all fields";
      
      if (Object.values(inputs).some((value) => value === ''))
      {
        seterr(Empty);
        setTimeout(() => {
          seterr(null);
          }, 5000); // set timeout to 5 seconds
        }   
     else{
    seterr(err.response.data);
    setinputs({
      username:"",
      email:"",
      password:"",
      name:""
    })
  }
    setTimeout(() => {
      seterr(null);
      }, 5000); // set timeout to 5 seconds
    }
   }


  return (
 <div className='RegisterPage'>
      
   <div className='RegisterCard'>

   <div className='Left'>
      <h1>Register</h1>
        <form >
       <input value={inputs.username} type='text' placeholder='UserName' name='username' onChange={handleinputchange} autoComplete='off' required />
       <input value={inputs.email} type='email' placeholder='Email' name='email' onChange={handleinputchange} autoComplete='off' required/>
       <input value={inputs.password} type='password' placeholder='Password'  name='password' onChange={handleinputchange} autoComplete='off' required/>
       <input value={inputs.name} type='text' placeholder='Name' name='name' onChange={handleinputchange} autoComplete='off' required/>
      {err && err}
       <button onClick={handleregisterclick}>Register</button>
       </form>
        </div>  

     <div className='Right'>
     <h2>Hello World</h2>
     <p>Keep Connections With ur Friends And Talk To Them Through This App And Get Ready to Explore The World With Your Friends Through SOCIALMANIAC!</p>
      <span>Already Have an Account?</span>
      <Link to='/Login'>
      <button>Login</button>
      </Link>
      </div>   

    </div>
    
  </div>
  )
}

export default Register;
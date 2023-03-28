import React,{useContext, useState} from 'react';
import './Login.scss';
import {Link,useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context/authContext';

const Login = () => {
    const Navigate = useNavigate();
  const [inputs,setinputs]= useState({
    username:"",
    password:"",
  })

   const[err,seterr]=useState("");

   const handleinputchange=(e)=>{
    setinputs(prev=>({...prev,[e.target.name]:e.target.value}));
   }

   const { login } = useContext(AuthContext);

   const handleloginclick = async(e)=>{
    e.preventDefault();
    try {
      if (!Object.values(inputs).some((value) => value === '')){
      await login(inputs);
      setinputs({
        username:"",
        password:""
      })
      Navigate('/');  
      }else{
        let nameEmty = "UserName cannot be Empty"
        let passwordEmpty = "password cannot be Empty";
        let Empty = "Please fill in all fields";
        
        if ((inputs.username==="" || null) && (inputs.password==="" ||null)) {
          seterr(Empty);
          setTimeout(() => {
            seterr(null);
            }, 5000); // set timeout to 5 seconds
          
        }
        else if (inputs.username==="" || null) {
          seterr(nameEmty);
          setTimeout(() => {
            seterr(null);
            }, 5000); // set timeout to 5 seconds
          
        }else if(inputs.password==="" ||null){
          seterr(passwordEmpty);
          setTimeout(() => {
            seterr(null);
            }, 5000); // set timeout to 5 seconds
          
        }
        else{
        seterr(err.response.data);
        setinputs({
          username:"",
          password:""
        })}
      }
        
      
    } catch (err) {
      let nameEmty = "UserName cannot be Empty"
      let passwordEmpty = "password cannot be Empty";
      let Empty = "Please fill in all fields";
      
      if ((inputs.username==="" || null) && (inputs.password==="" ||null)) {
        seterr(Empty);
        setTimeout(() => {
          seterr(null);
          }, 5000); // set timeout to 5 seconds
        
      }
      else if (inputs.username==="" || null) {
        seterr(nameEmty);
        setTimeout(() => {
          seterr(null);
          }, 5000); // set timeout to 5 seconds
        
      }else if(inputs.password==="" ||null){
        seterr(passwordEmpty);
        setTimeout(() => {
          seterr(null);
          }, 5000); // set timeout to 5 seconds
        
      }
      else{
      seterr(err.response.data);
      setinputs({
        username:"",
        password:""
      })}
      setTimeout(() => {
      seterr(null);
      }, 5000); // set timeout to 5 seconds
    }
   }

  return (
 <div className='LoginPage'>
      
   <div className='LoginCard'>

     <div className='Left'>
     <h2>Welcome Back</h2>
     <p>Welcome Back To SOCIALMANIAC! Hope You Are Loving The Experience And Features</p>
      <span>Don't Have an Account?</span>
      <Link to='/Register'><button>Register</button></Link>
      </div>

      <div className='Right'>
      <h1>Login</h1>
        <form >
       <input type='text'   required placeholder='Username' value={inputs.username} name="username" onChange={handleinputchange}   autoComplete='off'/>
       <input type='password' placeholder='Password' value={inputs.password} name="password" onChange={handleinputchange}   autoComplete='off'/>
       {err && err}
       <button onClick={handleloginclick}>Login</button>
       </form>
        </div>     

    </div>
    
  </div>
  )
}

export default Login
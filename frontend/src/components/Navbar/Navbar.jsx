import React, { useContext, useState } from 'react'
import './Navbar.scss';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Link,useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';
import { AuthContext } from '../../context/authContext.js';
import { makeRequest } from '../../axios';
import {useQuery } from 'react-query';



const Navbar = () => {
  const Navigate = useNavigate();
  const {toggle,DarkMode}=useContext(DarkModeContext);
  const [loading,setloading]=useState(false);
  const {currentuser} = useContext(AuthContext);

  const userId = currentuser.id;
   const {isLoading,error,data } = useQuery(['user'],async ()=>{
    const res = await makeRequest.get(`/users/find/${userId}`);
  return res.data;
  
});


  const handleLogout = async ()=>{
  try {
    await makeRequest.post('/auth/logout');
    Navigate('/Login');
    localStorage.removeItem('user')
  } catch (error) {
    return error;
  }finally{
    setloading(false);
  }
  }
  
  
  return (
    isLoading?"loading..."
    :error?"something went wrong pls wait"
    
    :<div className="Navbar">  
      <div className="left">
     <Link to='/' style={{textDecoration:'none'}}>
      <span>SOCIALMANIAC</span>
      </Link>
      <HomeOutlinedIcon />
      {DarkMode?<WbSunnyOutlinedIcon style={{cursor:"pointer"}} onClick={toggle} />:
      <DarkModeOutlinedIcon style={{cursor:"pointer"}} onClick={toggle} />}
      <GridViewOutlinedIcon />
      <div className="search">
        <SearchOutlinedIcon />
        <input type='text' placeholder='Search...' />
      </div>
     
      </div>
  
     <div className="right">
        <button onClick={handleLogout} className='LogoutNavbarbtn' disabled={loading}>Logout</button>
     <PersonOutlineOutlinedIcon onClick={()=>Navigate(`/Profile/${currentuser.id}`)}/>
     <EmailOutlinedIcon />
     <NotificationsOutlinedIcon  />
     <div className="user">
      <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}} src={`/uploads/${data.profilepicture}`} alt='pic'/>
      <span>{currentuser.name}</span>
     </div>
     </div>

    </div>
  )
}

export default Navbar
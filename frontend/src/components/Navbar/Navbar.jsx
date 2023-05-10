import React, { useContext, useState } from 'react'
import './Navbar.scss';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {MdOutlineCancel} from 'react-icons/md'
import { Link,useNavigate } from 'react-router-dom';
import { DarkModeContext } from '../../context/DarkModeContext';
import { AuthContext } from '../../context/authContext.js';
import { makeRequest } from '../../axios';
import {useQuery } from 'react-query';
import ALTprofile from '../../Assets/ALTprofile.jpg';



const Navbar = () => {
  const Navigate = useNavigate();
  const {toggle,DarkMode}=useContext(DarkModeContext);
  const [loading,setloading]=useState(false);
  const {currentuser} = useContext(AuthContext);
  const [searchQuery,setsearchQuery]=useState('');
  const [ShowSearch,setShowSearch]=useState(false);
  const [searchresult,setsearchresult]=useState(null);

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

  const handleSearch = async (e) => {
    setsearchQuery(e.target.value);
    if(e.target.value !==''||null){
    setShowSearch(true);
    }
    
    
    try {
    const {data:SearchedUsers} = await makeRequest.get(`/users/search?q=${searchQuery}`);
      setsearchresult(SearchedUsers);
     
      // Do something with the response
    } catch (error) {
      console.error(error);
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
      {DarkMode?<WbSunnyOutlinedIcon style={{cursor:"pointer"}} onClick={toggle} />:
      <DarkModeOutlinedIcon style={{cursor:"pointer"}} onClick={toggle} />}
     
      <div className="search">
        <input type='text' placeholder='Search...' value={searchQuery} onChange={handleSearch}/>
      <div className='SearchedUsers' style={{display:ShowSearch?'':'none'}}>
      
       <div className='cancelIcon' onClick={()=>setShowSearch(false)}>
       <MdOutlineCancel size={35}/>
      </div>
      
      <div className='SearchResults'>
        {searchresult && searchresult.map((user)=>(
       <div className='SearchResultwrapper'>
       <div className='searchresultIMG' key={user?._id}>
        <img onClick={()=>{
          Navigate(`/profile/${user?.userId}`);
          setShowSearch(false);
          
          }} src={user.profilepicture? `/uploads/${user?.profilepicture}`:ALTprofile} alt='ProfileImg'/>
       </div>
       <div className='searchresultUserName'>
        <p onClick={()=>{
          Navigate(`/profile/${user?.userId}`);
          setShowSearch(false);
    
          }} >{user?.username}</p>
       </div>
       </div>

              ))}
      </div>
      
      </div>
      </div>
     
      </div>
  
     <div className="right">
        <button onClick={handleLogout} className='LogoutNavbarbtn' disabled={loading}>Logout</button>
      <SendRoundedIcon className='MESSAGEICON' onClick={()=>Navigate(`/chat`)}/>
     <div className="user">
      <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}} src={data.profilepicture? `/uploads/${ data.profilepicture}`:ALTprofile}  alt='img'/>
      <span  onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}}>{data.name}</span>
     </div>
     </div>

    </div>
  )
}

export default Navbar
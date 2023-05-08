import React, { useContext} from 'react'
import './LeftBar.scss';
import { AuthContext } from '../../context/authContext';
import {useQuery } from 'react-query';
import {makeRequest} from '../../axios';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ALTprofile from '../../Assets/ALTprofile.jpg';






const LeftBar = () => {
 
    const Navigate = useNavigate();
   const {currentuser} = useContext(AuthContext);
   
   
   /*const user = JSON.parse(localStorage.getItem("user"));
const userId = user.id;*/
  const userId = currentuser.id;
   const {isLoading,error,data } = useQuery(['user'],async ()=>{
    const res = await makeRequest.get(`/users/find/${userId}`);
  return res.data;
   });



 

  return (
    isLoading? "Loading..."
    :error?"something went wrong try later"
    :(<div className="main">
  <div className="leftbar">

    <div className="container">
      
      <div className="menu">  
      
      <div className="user">
      <Link to={`/profile/${userId}`}> <img style={{cursor:'pointer'}} src={ data.profilepicture? `/uploads/${ data.profilepicture}`:ALTprofile} alt='Profile'/> </Link>
      <span onClick={()=>Navigate(`/profile/${userId}`)}>Profile</span>
      </div> 

        <div className="item">
         < HomeIcon className='HomeIcon' /> 
          <Link to={'/'} className='HOMELINK'>HOME</Link>
        </div>

        <div className="item">
         < FavoriteBorderOutlinedIcon className='FavoriteBorderOutlinedIcon' /> 
          <Link to={'/'} className='NOTIFICATIONLINK'>Notifications</Link>
        </div>

        </div>
    
    </div>
    <div className="white-space-below-leftbar"></div>
 </div>
 </div>
  )
  )
}

export default LeftBar;
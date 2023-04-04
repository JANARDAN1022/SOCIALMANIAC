import React, { useContext} from 'react'
import './LeftBar.scss';
import Friends from '../../Assets/Friends.png';
import Groups from '../../Assets/Groups.png';
import MarketPlace from '../../Assets/MarketPlace.png';
import Watch from '../../Assets/Watch.png';
import Memories from '../../Assets/Memories.png';
import Events   from '../../Assets/Events.png';
import Gaming   from '../../Assets/Gaming.png';
import Gallery  from '../../Assets/Gallery.png';
import Videos   from '../../Assets/Videos.png';
import Messages from '../../Assets/Messages.png';
import Fundraiser from '../../Assets/Fundraiser.png';
import tutorials  from '../../Assets/tutorials.png';
import  courses   from '../../Assets/courses.png';
import { AuthContext } from '../../context/authContext';
import {useQuery } from 'react-query';
import {makeRequest} from '../../axios';
import { Link } from 'react-router-dom';






const LeftBar = () => {
 
    
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
      <Link to={`/profile/${userId}`}> <img style={{cursor:'pointer'}} src={`/uploads/${ data.profilepicture}`} alt="pic"/> </Link>
      <span>{data.name}</span>
      </div> 
        <div className="item">
          <img src={Friends} alt='Pic' />
          <span>Friends</span>
        </div>

        <div className="item">
          <img src={Groups} alt='Pic' />
          <span>Groups</span>
        </div>

        <div className="item">
          <img src={MarketPlace} alt='Pic' />
          <span>MarketPlace</span>
        </div>

        <div className="item">
          <img src={Watch} alt='Pic' />
          <span>Watch</span>
        </div>

        <div className="item">
          <img src={Memories} alt='Pic' />
          <span>Memories</span>
        </div>

      </div>
        <hr/>
        <div className="menu">
          <span>Your Shortcuts</span>
          <div className="item">
          <img src={Events} alt='Pic' />
          <span>Events</span>
        </div>

        <div className="item">
          <img src={Gaming} alt='Pic' />
          <span>Gaming</span>
        </div>

        <div className="item">
          <img src={Gallery} alt='Pic' />
          <span>Gallery</span>
        </div>

        <div className="item">
          <img src={Videos} alt='Pic' />
          <span>Videos</span>
        </div>

        <div className="item">
          <img src={Messages} alt='Pic' />
          <span>Messages</span>
        </div>
        </div>
        
        <hr/>
        <div className="menu">
          <span>Others</span>
          
          <div className="item">
          <img src={Fundraiser} alt='Pic' />
          <span>Fundraiser</span>
        </div>

        <div className="item">
          <img src={tutorials} alt='Pic' />
          <span>tutorials</span>
        </div>

        <div className="item">
          <img src={courses} alt='Pic' />
          <span>courses</span>
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
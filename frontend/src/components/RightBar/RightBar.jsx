import React,{useContext} from 'react'
import './RightBar.scss';
import { AuthContext } from '../../context/authContext.js';
import { makeRequest } from '../../axios';
import {useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';


const RightBar = () => {
  const Navigate = useNavigate();

  const {currentuser} = useContext(AuthContext);

  const userId = currentuser.id;
   const {isLoading,error,data } = useQuery(['user'],async ()=>{
    const res = await makeRequest.get(`/users/find/${userId}`);
  return res.data;
  
});


/*const {data: RelationshipData } = useQuery(['relationship'],async ()=>{
  const res = await makeRequest.get(`/relationships/?followeduserId=${userId}`);
return res.data;
})*/

  return (
    isLoading?"loading" 
    : error?"something went wrong try later"
    :<div className="rightbarwrapper">
    <div className='Rightbar'>
      <div className="container">
        <div className="item SuggestionsForYou<">
          <span>Suggestions For You</span>
          <div className="user">

            <div className="userinfo">
               <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}} src={`/uploads/${data.profilepicture}`} alt='pic'/>
     
              <span>John Doe</span>
            </div>

            <div className="buttons">
            <button>Follow</button>
            <button>Dismiss</button>
            </div>
           </div>
            <div className="user">
            
            <div className="userinfo">
               <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}} src={`/uploads/${data.profilepicture}`} alt='pic'/>
     
              <span>John Doe</span>
            </div>

            <div className="buttons">
            <button>Follow</button>
            <button>Dismiss</button>
            </div>

          </div>
        </div>
        <div className="item LatestAcitivites">
          <span>Latest Acitivites</span>

          <div className="user">
            
            <div className="userinfo">
               <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}} src={`/uploads/${data.profilepicture}`} alt='pic'/>
     
              <span>John Doe</span> 
              <p>
              Changed their cover Picture
             </p>
            </div>
            <span>1 min ago</span>
          </div>

          <div className="user">
            
            <div className="userinfo">
               <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}} src={`/uploads/${data.profilepicture}`} alt='pic'/>
     
              <span>John Doe</span>
              <p>Changed their cover Picture</p>
            </div>
            <span>1 min ago</span>
          </div>

          <div className="user">
            
            <div className="userinfo">
               <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}} src={`/uploads/${data.profilepicture}`} alt='pic'/>
     
              <span>John Doe</span>
              <p> Changed their cover Picture</p>
            </div>
            <span>1 min ago</span>
          </div>

          <div className="user">
            
            <div className="userinfo">
               <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}} src={`/uploads/${data.profilepicture}`} alt='pic'/>
     
              <span>John Doe</span>
              <p> Changed their cover Picture</p>
            </div>
            <span>1 min ago</span>
          </div>

        </div>
        <div className="item onlinefriends">
          <span>Online Friends</span>
          <div className="user">
            
            <div className="userinfo">
               <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}} src={`/uploads/${data.profilepicture}`} alt='pic'/>
     
              <div className='online' />
              <span>John Doe</span>
            </div>
          </div>

          <div className="user">
            
            <div className="userinfo">
               <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}} src={`/uploads/${data.profilepicture}`} alt='pic'/>
     
              <div className='online' />
              <span>John Doe</span>
            </div>
          </div>

          <div className="user">
            
            <div className="userinfo">
               <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}} src={`/uploads/${data.profilepicture}`} alt='pic'/>
     
              <div className='online' />
              <span>John Doe</span>
            </div>
          </div>

          <div className="user">
            
            <div className="userinfo">
               <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}} src={`/uploads/${data.profilepicture}`} alt='pic'/>
     
              <div className='online' />
              <span>John Doe</span>
            </div>
          </div>

          <div className="user">
            
            <div className="userinfo">
               <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}} src={`/uploads/${data.profilepicture}`} alt='pic'/>
     
              <div className='online' />
              <span>John Doe</span>
            </div>
          </div>

          <div className="user">
            
            <div className="userinfo">
               <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} style={{cursor:'pointer'}} src={`/uploads/${data.profilepicture}`} alt='pic'/>
     
              <div className='online' />
              <span>John Doe</span>
            </div>
          </div>

        </div>
      </div>
    </div>
    </div>
  
  )
}

export default RightBar
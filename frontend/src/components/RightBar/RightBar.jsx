import React,{useContext} from 'react'
import './RightBar.scss';
import { AuthContext } from '../../context/authContext.js';
import { makeRequest } from '../../axios';
import {useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import ALTprofile from '../../Assets/ALTprofile.jpg';

const RightBar = () => {
  const Navigate = useNavigate();

  const {currentuser} = useContext(AuthContext);

  const userId = currentuser.id;
 

const {isLoading,error,data:SuggestedData}= useQuery(['Suggested',userId],async ()=>{
  const res = await makeRequest.get(`/users/Suggested/${userId}`);
  return res.data;
});

console.log(SuggestedData);


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
        <div className="item SuggestionsForYou">
          <span className='SuggestionHead'>Suggestions For You</span>
          <div className="user">

            {SuggestedData && SuggestedData.map((Suggested)=>(
              <div className='userinfoContainer'>
            <div className="userinfo" onClick={()=>Navigate(`/profile/${Suggested?.id}`)}>
               <img onClick={()=>Navigate(`/profile/${Suggested?.id}`)} style={{cursor:'pointer'}} 
               src={Suggested.profilepicture?`/uploads/${Suggested.profilepicture}`:ALTprofile} alt='pic'/>
     
              <span>{Suggested?.username}</span>
            </div>
           </div>
             ))}
           </div> 
            
        </div>
        
      </div>
    </div>
    </div>
  
  )
}

export default RightBar;
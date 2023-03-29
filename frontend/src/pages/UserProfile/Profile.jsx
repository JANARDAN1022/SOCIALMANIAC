import React,{useContext, useState} from 'react';
import './Profile.scss';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Posts from '../../components/Posts/Posts';
import {useQuery,useMutation,useQueryClient } from 'react-query';
import {makeRequest} from '../../axios';
import {AuthContext} from '../../context/authContext';
import { useLocation } from 'react-router-dom';
import Update from '../../components/update/update';



const Profile = () => {
  const [openUpdate,setopenUpdate] = useState(false);
   const userId = parseInt(useLocation().pathname.split("/")[2]);
   const {currentuser} = useContext(AuthContext);
 
   const {isLoading,error,data } = useQuery(['user',userId],async ()=>{
    const res = await makeRequest.get(`/users/find/${userId}`);
  return res.data;
  
},{
  staleTime: 0,
})

const {isLoading: isLoadingRelationship,data: RelationshipData } = useQuery(['relationship'],async ()=>{
  const res = await makeRequest.get(`/relationships/?followeduserId=${userId}`);
return res.data;
})

const queryClient = useQueryClient();

  const mutation = useMutation((following) => {
    if(following) return makeRequest.delete(`/relationships/?userId=${userId}`);
   return  makeRequest.post('/relationships', {userId})
 
  }, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['relationship'])

    },
  })

const handlefollow =()=>{
   mutation.mutate(RelationshipData.includes(currentuser.id))
}






  return (
    isLoading?"loading...":error?"error":
    (
   <div className='ProfilePage'>
      <div className="images">
     <img src={`/uploads/${data.coverpicture}`} alt="pic" className='cover'/>
      <img src={`/uploads/${data.profilepicture}`} alt='pic' className='profilepic'/>
        </div>
      <div className="profilecontainer">
        <div className="userinfo">
          <div className="left"> 
           <a href='http://facebook.com'>
            <FacebookTwoToneIcon fontSize='large' />
           </a>

           <a href='http://instagram.com'>
            <InstagramIcon fontSize='large' />
           </a>

           <a href='http://LinkedIn.com'>
            <LinkedInIcon fontSize='large' />
           </a>

           <a href='http://twitter.com'>
            <TwitterIcon fontSize='large' />
           </a>

           <a href='http://pinterest.com'>
            <PinterestIcon fontSize='large' />
           </a>
          </div>

            <div className="center"> 
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon className='Place'/>
                <span>{data.location}</span>
              </div>
              <div className="item">
                <LanguageIcon className='Language'/>
                <span>{data.website}</span>
              </div>
            </div>
            {userId===currentuser.id ? (<button onClick={()=>setopenUpdate(true)}>Update</button>) :
            <button onClick={handlefollow}>{isLoadingRelationship?"Loading...":RelationshipData.includes(currentuser.id)? "Following":"Follow"}</button>}
            </div>

            <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
            </div>
        </div>
      </div>
      <div className="userposts">
          <Posts userId={userId} />
        </div>
        {openUpdate&& <Update setopenUpdate={setopenUpdate} user={data}/>}
    </div>
  ))

}


export default Profile;

































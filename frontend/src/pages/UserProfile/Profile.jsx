import React,{useContext,useEffect,useState} from 'react';
import './Profile.scss';
import './profile.css';
import Posts from '../../components/Posts/Posts';
import {useQuery,useMutation,useQueryClient } from 'react-query';
import {makeRequest} from '../../axios';
import {AuthContext} from '../../context/authContext';
import { useLocation} from 'react-router-dom';
import Update from '../../components/update/update';
import ALTprofile from '../../Assets/ALTprofile.jpg';
import DefaultCover from '../../Assets/DefaultCover.png';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {MdOutlineCancel} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../context/ChatContext';




const Profile = () => {
  const Navigate = useNavigate();
  const {chats,setchats,setcurrentChat} = useContext(ChatContext);
  const queryClient = useQueryClient();
  const [openUpdate,setopenUpdate] = useState(false);
  const [ShowFollowing,setShowFollowing]=useState(false);
  const [ShowFollowers,setShowFollowers]=useState(false);
  const [showFollowInfo,setshowFollowInfo]=useState(false); 
  const [Id, setId] = useState(null);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const {currentuser} = useContext(AuthContext);
  
  useEffect(()=>{
 setId(userId);
  },[userId]);


  const createChatMutation = useMutation(async ({ senderId, receiverId }) => {
    const res = await makeRequest.post('/chat', { senderId, receiverId });
   // console.log('PostData',res.data)
    return res.data;
  }, {
    onSuccess: (data, { senderId, receiverId }) => {
      Navigate('/chat');
      const chatIndex = chats.findIndex(chat => chat.members.includes(receiverId));
      let updatedChats;
      // if the chat exists, update the lastMessage field and set it as the current chat
      if (chatIndex !== -1) {
        updatedChats = [...chats];
        updatedChats[chatIndex] = {
          ...updatedChats[chatIndex],
          lastMessage: data,
        };
        setchats(updatedChats);
        setcurrentChat(updatedChats[chatIndex]);
      } else {
        // if the chat doesn't exist, add it to the chats array and set it as the current chat
        setchats(prevChats => [data,...prevChats]);
        setcurrentChat(data);
      }
    },
  });

   



  

   const {isLoading,error,data } = useQuery(['user',userId],async ()=>{
    const res = await makeRequest.get(`/users/find/${userId}`);
  return res.data;
  
},{
  staleTime: 0,
});

const {isLoading:FollowingUserLoading,data:FollowingUserData } = useQuery(['Followingusers',Id],async ()=>{
  const res = await makeRequest.get(`/users/following?followeruserId=${Id}`);

 // console.log('Following:-',FollowingUserLoading?'loading':FollowingUserData)
return res.data;
},{
  staleTime:0,
});

const {isLoading:FollowersUserLoading,data:FollowersUserData } = useQuery(['Followerusers',Id],async ()=>{
  const res = await makeRequest.get(`/users/followers?followeduserId=${Id}`);

 // console.log('Followers:-',FollowersUserLoading?'loading':FollowersUserData.map(Followers=>Followers.username))
return res.data;

},{
  staleTime: 0,
});

const {isLoading: isLoadingRelationship,data: RelationshipData } = useQuery(['relationship',userId],async ()=>{
  const res = await makeRequest.get(`/relationships/followers?followeduserId=${userId}`);
return res.data;
});

const {isLoading: isLoadingFollowers,data: FollowersData } = useQuery(['following',Id],async ()=>{
  const res = await makeRequest.get(`/relationships/followers?followeduserId=${Id}`)
  return res.data;
});

const {isLoading: isLoadingFollowing,data: FollowingData } = useQuery(['followers',Id],async ()=>{
  const res = await makeRequest.get(`/relationships/following?followeruserId=${Id}`);

  return res.data;
});

const {isLoading:PostLoading,data:postsData } = useQuery(['posts',userId],async ()=>{
  const res = await makeRequest.get(userId?`/posts/?userId=${userId}`:`/posts`);
  return res.data;
});



  const mutation = useMutation((following) => {
    if(following) return makeRequest.delete(`/relationships/?userId=${userId}`);
    return  makeRequest.post('/relationships', {userId})

 
  }, {
    onSuccess: () => {
      
      // Invalidate and refetch
      queryClient.invalidateQueries(['relationship'])

      // Invalidate and refetch followers count query
    queryClient.invalidateQueries(['followers']);
    queryClient.refetchQueries(['followers']);

    // Invalidate and refetch following count query
    queryClient.invalidateQueries(['following']);
    queryClient.refetchQueries(['following']);

    //Invalidate and refetch postCount query
    queryClient.invalidateQueries(['posts']);
    queryClient.refetchQueries(['posts']);

        //Invalidate and refetch postCount query
        queryClient.invalidateQueries(['Followingusers']);
        queryClient.refetchQueries(['Followingusers']);

         //Invalidate and refetch postCount query
         queryClient.invalidateQueries(['Followerusers']);
         queryClient.refetchQueries(['Followerusers']);

         



    },
  });



  



const handlefollow =()=>{
   mutation.mutate(RelationshipData.includes(currentuser.id))
}


const handleCreateChat = () => {
  const senderId = currentuser?.mongoDbId;
  const receiverId = data?.mongoDbId;
  createChatMutation.mutate({ senderId, receiverId });
};




  return (
    isLoading?"loading...":error?"error":
    (
   <div className='ProfilePage'>
      <div className="images">
     <img src={data?.coverpicture?`/uploads/${data?.coverpicture}`:DefaultCover} alt="" className='cover'/>
      <img src={data?.profilepicture? `/uploads/${data?.profilepicture}`:ALTprofile} alt='pic' className='profilepic'/>
        </div>
      <div className="profilecontainer">
        <div className="userinfo">
            <div className='UserInfoContainer'>
          <div className="left"> 
          <div className='Followers' onClick={()=>{
              setShowFollowers(true);
              setshowFollowInfo(true);
            }}>
            <div className='FollowersHead' onClick={()=>{
              setShowFollowers(true);
              setshowFollowInfo(true);
            }}>
            <h3>Followers</h3>
            </div>
            
            <div className='FollowersCount'>
              <span>{isLoadingFollowers?'0':FollowersData?.length}</span>
            </div>
         
          </div>
          </div>

            <div className="center"> 
            <span>{data?.name}</span>

           <div className='Following' onClick={()=>{
              setShowFollowing(true);
              setshowFollowInfo(true);
            }}>
            
            <div className='FollowingHead' onClick={()=>{
              setShowFollowing(true);
              setshowFollowInfo(true);
            }}>
            <h3>Following</h3>
            </div>
            <div className='FollowingCount'>
              <p>{isLoadingFollowing?'0':FollowingData?.length}</p>
            </div>
           </div>

            {userId===currentuser.id ? (<button onClick={()=>setopenUpdate(true)}>Update Profile</button>) :
            <button onClick={handlefollow}>{isLoadingRelationship?"Loading...":RelationshipData.includes(currentuser.id)? "Following":"Follow"}</button>}
            </div>

          { userId===currentuser.id?
            <div className="right">
             
            <span>Posts</span>
            <span>{PostLoading?'0':postsData?.length}</span>
              
            </div>:
              <div className="rightMessage" onClick={handleCreateChat}>
             
              <span>message</span>
              <SendRoundedIcon className='SendMessageIcon' onClick={handleCreateChat}/>
                
              </div>
            }
            </div>
        </div>
      </div>
      <div className="userposts">
          <Posts userId={userId} />
        </div>
        {openUpdate&& <Update setopenUpdate={setopenUpdate} user={data}/>}
 
        {showFollowInfo && ShowFollowers?
  
    <div className='FollowInfoCard'>
      <div className='FollowInfoCardHead' >
        <h3>Followers</h3>
        <MdOutlineCancel size={35} className='FollowinfoCancelIcon' onClick={()=>{
      setshowFollowInfo(false);
      setShowFollowers(false);
      setShowFollowing(false);
      }}/>
      </div>
      {FollowersUserLoading?'Loading':
    FollowersUserData && FollowersUserData.map((Followers)=>(
      <div className='FollowInfoCardData' key={Followers.id} onClick={()=>{
        Navigate(`/profile/${Followers?.followeruserId}`)
        setshowFollowInfo(false);
        setShowFollowers(false);
      setShowFollowing(false);
        }}>
        <div className='Followerprofilepic'>
        <img src={Followers.profilepicture?`/uploads/${Followers.profilepicture}`:ALTprofile} alt='img' />
         </div>
        <div className='FollowerName'>
        <span>{Followers?.username}</span>
      </div>
      </div>
      ))}
    </div>
    :showFollowInfo && ShowFollowing?
     <div className='FollowInfoCard'>
    
     
       <div className='FollowInfoCardHead' >
         <h3>Following</h3>
         <MdOutlineCancel size={35} className='FollowinfoCancelIcon' onClick={()=>{setshowFollowInfo(false)
        setShowFollowers(false);
        setShowFollowing(false);
        }}/>
       </div>

       <div className='FollowInfoCardContainer'>
       {FollowingUserLoading?'Loading':
    FollowingUserData && FollowingUserData.map((following)=>(
     
    <div className='FollowInfoCardData' key={following.id} onClick={()=>{
      Navigate(`/profile/${following?.followeduserId}`)
      setshowFollowInfo(false);
      setShowFollowers(false);
      setShowFollowing(false);
      }}>
      
        <div className='FollowersProfilepic'>
       
       <img src={following.profilepicture?`/uploads/${following.profilepicture}`:ALTprofile} alt='img' />
         </div>
         <div className='FollowerName'>
         <span>{following?.username}</span>
          </div>
       </div>
      
                 ))}
                 </div>           
     </div>
   
     :<div style={{display:'none'}}></div>
     }
                 
    </div>
      
  ))

}


export default Profile;

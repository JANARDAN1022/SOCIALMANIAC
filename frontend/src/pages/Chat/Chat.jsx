import React, { useContext ,useEffect, useRef, useState} from 'react';
import './Chat.css';
import { AuthContext } from '../../context/authContext';
import { userChats } from '../../API/ChatApi';
import { Link ,useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Conversations from '../../components/Conversations/Conversations';
import MessageBox from '../../components/MessageBox/MessageBox';
import SendIcon from '@mui/icons-material/Send';
import {io} from 'socket.io-client';
import {MdOutlineCancel} from 'react-icons/md';
import {useQuery,useMutation} from 'react-query';
import {makeRequest} from '../../axios';
import ALTprofile from '../../Assets/ALTprofile.jpg';


const Chat = () => {

    const Navigate = useNavigate();
    const socket = useRef();
    const {currentuser} = useContext(AuthContext);
    const [chats,setchats]=useState([]);
    const [currentChat,setcurrentChat]=useState(null);
    const [OnlineUsers,setOnlineUsers]=useState([]);
    const [sendMessage,setSendMessage]=useState(null);
    const [recieveMessage,setrecieveMessage]=useState(null);
    const [ShowSend,setShowSend]=useState(false);
    const id = currentuser.mongoDbId;
    const userId=currentuser.id


    useEffect(() => {
      const fetchChats = async () => {
        try {
          const { data } = await userChats(id);
          setchats(data);
        } catch (error) {
          console.log(error);
        }
      };
      if(chats.length===0){
    fetchChats();
      }
    }, [id,chats]);
    

  console.log(chats);
    useEffect(()=>{
     socket.current = io('http://localhost:8800');
     socket.current.emit("new-user-add",currentuser.mongoDbId)
     socket.current.on('get-users',(users)=>{
      setOnlineUsers(users);
    
     })
    },[currentuser])
    console.log(OnlineUsers);
 //send message to socket server
 useEffect(()=>{
  if(sendMessage !==null){
    socket.current.emit('send-message',sendMessage)
}
},[sendMessage]);


     //recieve message from socket server
  useEffect(()=>{
    socket.current.on("recieve-message",(data)=>{
      setrecieveMessage(data);
    });
  },[]);

 
  const {isLoading:FollowingUserLoading,data:FollowingUserData } = useQuery(['Followingusers',userId],async ()=>{
    const res = await makeRequest.get(`/users/following?followeruserId=${userId}`);
  
   // console.log('Following:-',FollowingUserLoading?'loading':FollowingUserData)
  return res.data;
  },{
    staleTime:0,
  });


  const createChatMutation = useMutation(async ({ senderId, receiverId }) => {
    const res = await makeRequest.post('/chat', { senderId, receiverId });
    console.log('PostData',res.data)
    return res.data;
  }, {
    onSuccess: (data, { senderId, receiverId }) => {
      // find the index of the chat in the chats array with the same receiverId
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
        setchats(prevChats => [...prevChats, data]);
        setcurrentChat(data);
      }
    },
  });
  
  

const handleSuggestedUserClick = (receiverId) => {
  const fetchChats = async () => {
    try {
      const { data } = await userChats(id);
      setchats(data);
    } catch (error) {
      console.log(error);
    }
  };
  if(chats.length===0){
fetchChats();
  }
  // call the create chat mutation with senderId and receiverId
  createChatMutation.mutate({ senderId: currentuser?.mongoDbId, receiverId });
};



    
  
  return (
    <div className='ChatMainDiv'>

      <div className='LeftBARChat'>
        <div className='LEFTBARCHATCONTAINER'>
         
          <div className='LEFTBARCHATHEAD'>
         <h2 className='CHATLEFTBARHEAD'>SOCIALMANIAC</h2>
         </div>

         <div className='CHatLeftBarItems'>
           <div className="Chatuser">
      <Link className='PROFILEIMGLEFTCHATBAR' to={`/profile/${userId}`}> <img className='PROFILEIMGLEFTCHATBAR'  src={currentuser.profilepicture?`/uploads/${ currentuser.profilepicture}`:ALTprofile} alt="pic"/> </Link>
      <span onClick={()=>Navigate(`/profile/${userId}`)}>Profile</span>
      </div> 

        <div className="Chatitem">
         <HomeIcon  style={{height:'35px',width:'35px',cursor:'pointer'}}/> 
          <Link to={'/'} className='HOMELINKChat'>HOME</Link>
        </div>

        <div className="Chatitem">
         < FavoriteBorderOutlinedIcon  style={{height:'30px',width:'30px',cursor:'pointer'}}/> 
          <Link to={'/'} className='NOTIFICATIONLINKChat'>Notifications</Link>
        </div>

         </div>
        </div>
       </div>
      
     
     
      <div className='CHATSIDE'>
       
        <div className='CHATSIDECONTAINER'>
      
      <div className='ChatLeftSide'>
        
        <div className='LeftChatContainer'>
      
       <div className='LeftMessageHead'>
       <nav>{currentuser.username}</nav>
       </div>
       
       <div className='MessagesUsersLeft'>
        
        <div className='MessagesLeftHead'>
          <span>Messages</span>
        </div>

        <div className='MessagesLeftUsersInfo'>
          {chats && chats.map((chat)=>(
        <div className='MessageUserInfoDiv' onClick={()=>setcurrentChat(chat)} key={chat._id} >
        <Conversations Data={chat} currentuserId={id}  />
        </div>
          )
          )}
         
         </div>
       </div>

       </div>
      </div>

      <div className='ChatRightSide'>
        <div className='RightChatContainer'>
          {currentChat===null?
          <div className='NoChatsDiv'>
            <div className='NoChatsSendIcon'>
             <SendIcon className='SENDICONNOCHAT' />
            </div>
            <div className='NoChatsMessage'>
           <h2>Your Messages</h2>
           <span>Send private photos and messages to a friend or group.</span>
           <button onClick={()=>setShowSend(true)}>Send Message</button>
           </div>
           {FollowingUserLoading?'Loading':
           <div className='SendMessageTo' style={{display:ShowSend?'':'none'}}>
            <div onClick={()=>setShowSend(false)}>
            <MdOutlineCancel size={30} className='CancelSendMessageTo' />
            </div>
            <div className='SendMessageToHead'>
            <p>Select From People You Follow</p>
            </div>
            <div className='SendMessagecontainer'>
           { FollowingUserData && FollowingUserData.map((Following)=>(
          
           <div className='SendMessageToSuggested' key={Following?.id}>

            <div className='SendMessageUserInfo'>
          
            <div className='SendUser'  onClick={() => {
              handleSuggestedUserClick(Following?.mongoDbId)
              setShowSend(false);

          
              }}>
           <img src={Following.profilepicture? `/uploads/${Following?.profilepicture}`:ALTprofile} alt='Img' />
            <p>{Following?.username}</p>
            </div>
               
           </div>
           
           </div>
             ) )}
             </div>
          </div>
           }
          </div>
          :
       <MessageBox chat={currentChat} currentuserId={id} key={userId} setsendMessage={setSendMessage} recieveMessage={recieveMessage}/>
          }
       </div>
      </div>
      
      
      </div>

      </div>
    </div>
  )
}

export default Chat
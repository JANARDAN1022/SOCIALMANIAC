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
import {io} from 'socket.io-client'

const Chat = () => {

    const Navigate = useNavigate();
    const socket = useRef();
    const {currentuser} = useContext(AuthContext);
    const [chats,setchats]=useState([]);
    const [currentChat,setcurrentChat]=useState(null);
    const [OnlineUsers,setOnlineUsers]=useState([]);
    const [sendMessage,setSendMessage]=useState(null);
    const [recieveMessage,setrecieveMessage]=useState(null);
    const id = currentuser.mongoDbId;
    const userId=currentuser.id


    useEffect(()=>{
      const getchats = async()=>{
        try {
          const {data} = await userChats(id);
          setchats(data)

        } catch (error) {
          console.log(error);
        }

      }
      getchats();
    },[id]);
    
console.log(OnlineUsers)
  
    useEffect(()=>{
     socket.current = io('http://localhost:8800');
     socket.current.emit("new-user-add",currentuser.mongoDbId)
     socket.current.on('get-users',(users)=>{
      setOnlineUsers(users);
    
     })
    },[currentuser])

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

 
   
   
 

    
  
  return (
    <div className='ChatMainDiv'>

      <div className='LeftBARChat'>
        <div className='LEFTBARCHATCONTAINER'>
         
          <div className='LEFTBARCHATHEAD'>
         <h2 className='CHATLEFTBARHEAD'>SOCIALMANIAC</h2>
         </div>

         <div className='CHatLeftBarItems'>
           <div className="Chatuser">
      <Link className='PROFILEIMGLEFTCHATBAR' to={`/profile/${userId}`}> <img className='PROFILEIMGLEFTCHATBAR'  src={`/uploads/${ currentuser.profilepicture}`} alt="pic"/> </Link>
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
           <button>Send Message</button>
           </div>
          {/* <div className='SendMessageTo'>
          
           <div className='SendMessageToHead'>
            
           </div>
           
           <div className='SendMessageToSuggested'>
            
           </div>

          </div>*/}
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
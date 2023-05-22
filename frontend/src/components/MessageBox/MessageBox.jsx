import React,{useContext, useEffect, useRef, useState} from 'react';
import { getUser ,getMessages} from '../../API/ChatApi';
import './MessageBox.css';
import { Link } from 'react-router-dom';
import CallSharpIcon from '@mui/icons-material/CallSharp';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
//import ReactTimeAgo from 'react-time-ago';
import LastSeen from '../../LastSeen';
import InputEmoji from "react-input-emoji";
import AddIcon from '@mui/icons-material/Add';
import  {AuthContext}  from '../../context/authContext';
import { addMessages } from '../../API/ChatApi';   
import ALTprofile from '../../Assets/ALTprofile.jpg';

const MessageBox = ({chat,currentuserId,setsendMessage,recieveMessage}) => {
    const [userData,setuserData]=useState(null);
   const [messages,setMessages]=useState([]);
   const [sendnewMessage,setSendnewMessage]=useState("");

   const scroll = useRef();
   
   const{currentuser}=useContext(AuthContext);
 


   useEffect(()=>{
    const RecieverUserId = chat?.members?.find((id)=>id!==currentuserId);
    console.log('RecieverUserId', RecieverUserId);

    const getUserData = async()=>{
        try{
        const {data}= await getUser(RecieverUserId)
        setuserData(data);
        }catch(err){
        console.log(err);
        }
     }
    if(chat!==null) {
        getUserData();
    }
},[chat,currentuserId]);




useEffect(()=>{
    const fetchMessages = async ()=>{
       try {
           const {data} = await getMessages(chat?._id)
           setMessages(data)
       } catch (error) {
           console.log(error);
       }
    }
    if(chat !==null) fetchMessages();
   },[chat]);

const HandleChange=(sendnewMessage)=>{
  setSendnewMessage(sendnewMessage);
}
function handleOnEnter(sendnewMessage) {
    console.log("enter", sendnewMessage);
  }

  const handleSend = async(e)=>{
    e.preventDefault();
    const message = {
        senderId: currentuserId,
        text: sendnewMessage,
        chatId: chat._id,
    }

    //send msg to mongodbdatabase
    try {
        const {data} =await addMessages(message);
        setMessages([...messages, data])
        setSendnewMessage("");
        
    } catch (error) {
        console.log(error)
    }

    //send messages to socket server
    const recieverUserId = chat?.members?.find((id)=>id!==currentuserId);
  
    setsendMessage({...message,recieverUserId})
  }

  useEffect(()=>{
    if(recieveMessage!==null && recieveMessage.chatId===chat._id){
        //setMessages([...messages,recieveMessage])
        setMessages(prevMessages => [...prevMessages, recieveMessage]);
      

      
    }
  },[recieveMessage,chat._id]);

  useEffect(()=>{
  scroll.current?.scrollIntoView({behavior:"smooth"})
  },[messages])

 
  const currentUserImg = `${currentuser?.profilepicture!==null&&currentuser?.profilepicture!==''? `/uploads/${currentuser?.profilepicture}`:ALTprofile}`;
  const userDataImg = `${userData?.profilepicture!==null&&userData?.profilepicture!==''?`/uploads/${userData?.profilepicture}`: ALTprofile  }`;


  return (
    <div className='RightSideChatContent'>
        
        <div className='RightSideChatHead'>
            <nav className='MessageNav'>
                <div className='MessageHeaduserInfo'>
                <Link to={`/profile/${userData?.userId}`}>
                    <img className='MessageNavProfileImg' src={userDataImg} alt='ProfPic' />
                </Link>
                <h3>{userData?.username}</h3>

                </div>

                <div className='MessageNavFeatures'>
               <CallSharpIcon />
               <VideocamOutlinedIcon />

                </div>
            </nav>
        </div>

        <div className='ChatContent'>
           <div className='MessagedivContainer' >
            {messages.map((messages)=>(
         <div ref={scroll} className={messages.senderId===currentuserId?'ChatContentConatainerMe':'ChatContentConatainersender'} key={messages._id}>
           
           <div className='MessageTextinfo'>
            <div className='TEXTWITHIMG'>
            <Link to={`/profile/${messages.senderId!==currentuserId? userData?.userId : currentuser?.userId}`}>
                    <img className='MessageNavTEXTImg' src={messages.senderId!==currentuserId?userDataImg:currentUserImg}
                         
                         
                         
                         alt='ProfPic' />
                </Link>
           <p>{messages.text}</p>
           </div>
           <span> 
        {<LastSeen date={messages?.createdAt}/>}
           </span>
           </div>
           </div>
                  ))}
                  </div>
                    <div className='SendMessageInput'>
                    <div className='PlusIconMessage'>
                        <AddIcon />
                    </div>
                     <InputEmoji 
                      value={sendnewMessage}
                      onChange={HandleChange}
                      cleanOnEnter
                      onEnter={handleOnEnter}
                      placeholder="Type a message"
                      
                     />
                     <button onClick={handleSend}>Send</button>
                  </div>
                  
          </div>
               
        </div>
  )
}

export default MessageBox
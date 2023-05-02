import React, {  useContext, useEffect, useState } from 'react';
import '../../pages/Chat/Chat.css';
import { Link } from 'react-router-dom';
import {getUser,getMessages} from '../../API/ChatApi';
import { AuthContext } from '../../context/authContext';


const Conversations = ({Data,currentuserId}) => {
    const [userData,setuserData]=useState(null);
    const [messages,setMessages]=useState([]);
    const {currentuser}=useContext(AuthContext);
   
   

 
   useEffect(()=>{
     const RecieverUserId = Data.members.find((id)=>id!==currentuserId)
    
     const getUserData = async()=>{
        try{
        const {data}= await getUser(RecieverUserId)
        setuserData(data);
       
        }catch(err){
        console.log(err);
        }
     }
     getUserData();

   },[currentuserId,Data,userData]);

   useEffect(()=>{
    const fetchMessages = async ()=>{
       try {
           const {data} = await getMessages(Data._id)
           setMessages(data);
           } catch (error) {
           console.log(error);
       }
       
    }
    if(Data !==null) fetchMessages();
   },[Data]);


    const lastmessage =  messages?.[messages.length-1]?.text.slice(0,26);
    const lastmessageUser = messages?.[messages.length-1]?.senderId===currentuser.mongoDbId?'you:':userData?.username;
   

  return (
        <>
        <div className='Online'></div>
        <Link to={`/profile/${userData?.userId}`}> <img className='PROFILEIMGLEFTCHATBARUsers' style={{cursor:'pointer'}} src={`/uploads/${ userData?.profilepicture}`} alt="pic"/> </Link>
        <div className='MessgaeUserInfoDetails'>
         <span>{userData?.username}</span>
         <span className='Active' style={{display:'none'}}>Active</span>
         <span className='LASTMESSAGEINFO'>{ `${lastmessageUser}:${lastmessage}...`}</span>
             
         </div>
         </>
         
  )
}

export default Conversations
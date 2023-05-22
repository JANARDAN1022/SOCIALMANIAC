import React from 'react';
import Post from './Post';
import './Posts.scss';
import {useQuery } from 'react-query';
import {makeRequest} from '../../axios';
import { useNavigate } from 'react-router-dom';
//import { AuthContext } from '../../context/authContext';
//import { useContext } from 'react';


const Posts = ({userId}) => {
  const Navigate = useNavigate();
//  const {currentuser} = useContext(AuthContext);

    const {isLoading,data } = useQuery(['posts'],async ()=>{
        const res = await makeRequest.get(userId?`/posts/?userId=${userId}`:`/posts`);
      return res.data;
      },{
        onError: ()=>{
          Navigate('/login');
        }
      })



  return (
    <div className='Posts'> 
    { isLoading? "loading Posts"
      : data && data.map((post,index)=>(
        <Post post={post} key={index} />
       ))}
       </div>
    
  
   )
}


export default Posts
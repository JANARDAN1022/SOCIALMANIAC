import React from 'react';
import Post from './Post';
import './Posts.scss';
import {useQuery } from 'react-query';
import {makeRequest} from '../../axios';
import { useNavigate } from 'react-router-dom';


const Posts = ({userId}) => {
  const Navigate = useNavigate();

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
      : data && data.map((post)=>(
        <Post post={post} key={post.id} />
       ))}
       </div>
    
  
   )
}


export default Posts
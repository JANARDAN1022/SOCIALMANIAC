import React from 'react';
import Post from './Post';
import './Posts.scss';
import {useQuery } from 'react-query';
import {makeRequest} from '../../axios';


const Posts = ({userId}) => {
    const {isLoading,error,data } = useQuery(['posts'],async ()=>{
        const res = await makeRequest.get(userId?`/posts/?userId=${userId}`:`/posts`);
      return res.data;
      
})


  
  return (
    <div className='Posts'> 
    {error ? "Something went wrong" : isLoading? "loading Posts"
      : data && data.map((post)=>(
        <Post post={post} key={post.id} />
       ))}
       </div>
    
  
   )
}


export default Posts
import React, { useContext, useState } from 'react';
import './Comments.scss';
import {AuthContext} from '../../context/authContext';
import {useQuery, useMutation, useQueryClient } from 'react-query';
import {makeRequest} from '../../axios';
import moment from 'moment';

const Comments = ({postid}) => {
   const {currentuser} = useContext(AuthContext);
   const [description,setdescription]=useState("");

   const {isLoading,error,data } = useQuery(['comments'],async ()=>{
    const res = await makeRequest.get(`/comments/?postid=${postid}`);
  return res.data;
  
})

const queryClient = useQueryClient();

 const mutation = useMutation((newComment) => {
    return makeRequest.post('/comments', newComment)
  }, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['comments']);
     

    },
  })

  const handleClick = (e) => {
    e.preventDefault();
   mutation.mutate({ description, postid});
    setdescription("");
  }

 
  return (
    <div className='Comments'>
        <div className="write">
            <img src={currentuser.profilepicture} alt="ProfilePic" />
            <input type="text" value={description} onChange={(e)=>setdescription(e.target.value)} placeholder='write a comment' />
            <button onClick={handleClick}>Send</button>
        </div>
        {isLoading?"loading comments please wait":error?"Something went wrong try later":
        data && data.length > 0 && data.map((comments)=>(
            <div className="comment" key={comments.id}>
                <img src={comments.profilepicture} alt='pic'/>

             <div className="info">
                <span>{comments.name}</span>
                <p>{comments.description}</p>
             </div>
             <span className='date'>{moment(comments.createdAt).fromNow()}</span>

            </div>
        ))}
    </div>
  )
}

export default Comments
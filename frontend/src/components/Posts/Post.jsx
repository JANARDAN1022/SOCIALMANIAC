import React, { useState,useContext } from 'react';
import './Post.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom'
import Comments from '../Comments/Comments';
import moment from 'moment';
import {useQuery,useMutation,useQueryClient } from 'react-query';
import {makeRequest} from '../../axios';
import {AuthContext} from '../../context/authContext';
import ALTprofile from '../../Assets/ALTprofile.jpg'


const Post = ({post}) => {
const [showComment,setshowComment]=useState(false);
const [showMore,setshowMore]=useState(false);
const {currentuser} = useContext(AuthContext);

/*const userId = currentuser.id;
const {data:userData } = useQuery(['user'],async ()=>{
 const res = await makeRequest.get(`/users/find/${userId}`);
return res.data;
});*/

const {isLoading,error,data } = useQuery(['likes', post.id],async ()=>{
    const res = await makeRequest.get(`/likes/?postId=${post.id}`);
  return res.data;
  
})

const {data:commentsdata } = useQuery(['comments',post.id],async ()=>{
  const res = await makeRequest.get(`/comments/?postid=${post.id}`);
return res.data;

})


const queryClient = useQueryClient();

  const mutation = useMutation((liked) => {
    if(liked) return makeRequest.delete(`/likes/?postId=${post.id}`);

   return  makeRequest.post('/likes', {postId: post.id})
 
  }, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['likes'])

    },
  })

const handleLike =()=>{
   mutation.mutate(data.includes(currentuser.id))
}
const Deletemutation = useMutation((postId) => { 
  return makeRequest.delete(`/posts/${postId}`);

}, {
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries(['posts'])

  },
})

const handleDelete = ()=>{
   if(post?.userId===currentuser?.id){
Deletemutation.mutate(post.id)
   }else{
    setshowMore(false);
   }
}



  return (
    <div className='Post'>
        <div className="container">
        <div className="user">
            <div className="userinfo">
          <Link to={`/profile/${post?.userId}`}><img src={post.profilepicture? `/uploads/${post?.profilepicture}`:ALTprofile} alt='' /> </Link>

           <div className="details">
            <Link to={`/profile/${post?.userId}`} style={{textDecoration:'none', color:'inherit'}}>
                <span className='name'>{post?.name}</span>
            </Link>
            <span className='date'>{moment(post?.createdat).fromNow()}</span>
           </div>
            </div>
            <div className='PostSettings' onClick={()=>setshowMore(!showMore)}>
            <MoreHorizOutlinedIcon  onClick={()=>setshowMore(!showMore)} style={{cursor:'pointer',display: post?.userId===currentuser?.id && !showMore?'':'none'}}/>
           <div className='SettingsContent' style={{display:showMore?'':'none'}}>
            <CloseIcon  className='CloseSettingsIcon' onClick={()=>setshowMore(false)} style={{cursor:'pointer'}}/>
            <div className='SettingsType'>
            <button className='DeletePost' onClick={handleDelete}>Delete</button>
            <button className='UpdatePost'>Update</button>
          </div>
          </div>
          </div>
        </div>

        <div className="content">
            {post.img&& <img src={`/uploads/${post?.img}`} alt='' />}
            
            <p className='PostDescription' style={{display:post?.description===null||post?.description===''?'none':''}}>{post?.name}: {post?.description}</p>
            
            </div>
        <div className="info">
            <div className="item">
                {isLoading?"":error?"":
                data.includes(currentuser.id)?<FavoriteOutlinedIcon style={{color:'red'}} onClick={handleLike} />:< FavoriteBorderOutlinedIcon  onClick={handleLike} />}
                {data && data.length} Likes
            </div>

            <div className="item" onClick={()=>setshowComment(!showComment)}>
            <TextsmsOutlinedIcon />
                {commentsdata && commentsdata.length} Comments
            </div>

            <div className="item">
                <ShareOutlinedIcon />
                Share
            </div>

        </div>
        {showComment && <Comments postid={post?.id}/>}
        </div>
    </div>
  )
}

export default Post
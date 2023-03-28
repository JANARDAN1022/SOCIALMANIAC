import './update.scss';
import { makeRequest } from '../../axios';
import { useState } from "react";
import { useMutation, useQueryClient } from 'react-query';


const Update = ({setopenUpdate,user}) => {

    const[cover,setcover]=useState(null);
    const[profile,setprofile]=useState(null);
    const[update,setupdate]=useState({
        name:"",
        city:"",
        website:""
    });

    const upload = async (file)=>{
        try {
           const formData = new FormData();
           formData.append("file",file)
           const res = await makeRequest.post("/upload",formData);
           return res.data;     
        } catch (error) {
          console.log(error)
        }
      }
    
    
    const handlechange = (e)=>{
       setupdate((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const handlesubmit=async (e)=>{
        e.preventDefault();
        let coverUrl;
        let profileUrl;
   
        coverUrl= cover ? await upload(cover):user.coverpicture;
        profileUrl = profile ? await upload(profile):user.profilepicture;
    
    mutation.mutate({...update, coverpicture:coverUrl, profilepicture:profileUrl});
    setopenUpdate(false);
 }

 const queryClient = useQueryClient();

  const mutation = useMutation((userInfo) => {
    return makeRequest.put('/users', userInfo)
  }, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries(['user'])
    

    },
  })
  
 
   
  return (
    <div className='update'>
        Update UserInfo
        <button className='cancel' onClick={()=>setopenUpdate(false)}>X</button>
   
        <form >
            <input type="file" onChange={(e)=>setcover(e.target.files[0])}/>
            <input type="file" onChange={(e)=>setprofile(e.target.files[0])}/>
            <input type="text" placeholder='name'  name='name' onChange={handlechange} />
            <input type="text" placeholder='city' name='city' onChange={handlechange}/>
            <input type="text" placeholder='website' name='website' onChange={handlechange}/>
            <button className='cancel' onClick={handlesubmit}>Update</button>
        </form>
      </div>
  )
}

export default Update
import './update.scss';
import { makeRequest } from '../../axios';
import { useState } from "react";
import { useMutation, useQueryClient } from 'react-query';


const Update = ({setopenUpdate,user}) => {

    const[cover,setcover]=useState(null);
    const[profile,setprofile]=useState(null);
    const[update,setupdate]=useState({
        name:"",
        location:"",
        website:""
    });

    const upload =async (file)=>{
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
       <button className='cancel' onClick={()=>setopenUpdate(false)}>X</button>
       <h4 className='Accountdetailsh4'> UPDATE  ACCOUNT  DETAILS </h4>
       <br />
       <hr />
        <div className="form">
        <form >
         <h4>NEW COVER-PICTURE:</h4>   <input  className='inputfile' type="file" onChange={(e)=>setcover(e.target.files[0])}/>
         <h4>NEW PROFILE-PICTURE :</h4>   <input  className='inputfile' type="file" onChange={(e)=>setprofile(e.target.files[0])}/>
         <h4 className='h4newname'> NEW NAME : </h4> <input autoComplete='off' type="text" placeholder='NAME'  name='name' onChange={handlechange} />
         <h4 className='h4location'> NEW LOCATION : </h4> <input autoComplete='off' type="text" placeholder='LOCATION' name='location' onChange={handlechange}/>
         <h4 className='h4website'> NEW WEBSITE/PROMOTION : </h4> <input autoComplete='off' type="text" placeholder='WEBSITE/PROMOTION' name='website' onChange={handlechange}/>
            <button className='updatebtn' onClick={handlesubmit}>Update</button>
        </form>
        </div>
      </div>
  )
}

export default Update
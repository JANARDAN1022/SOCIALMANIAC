import "./Share.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery,useMutation, useQueryClient } from 'react-query';
import { makeRequest } from '../../axios';
import { useNavigate } from "react-router-dom";
import ALTprofile from '../../Assets/ALTprofile.jpg';
import {AiOutlinePlus} from 'react-icons/ai';


const Share = () => {
  const Navigate = useNavigate();
  const [file, setfile] = useState(null);
  const [description, setdescription] = useState("");
  const { currentuser } = useContext(AuthContext);
  const userId = currentuser.id;


  const { isLoading,error,data: userdata } = useQuery(['user'],async ()=>{
    const res = await makeRequest.get(`/users/find/${userId}`);
  return res.data;
  
});


  

  const upload = async ()=>{
    try {
       const formData = new FormData();
       formData.append("file",file)
       const res = await makeRequest.post("/upload",formData);
       return res.data;     
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = async(e) => {
    e.preventDefault();
    if(description==="" && file===null){
      return;
    }

    let imgUrl = "";
    if(file) imgUrl = await upload();
    mutation.mutate({ description, img:imgUrl})
  }

  const queryClient = useQueryClient();

  const mutation = useMutation((newPost) => {
    return makeRequest.post('/posts', newPost)
  }, {
    onSuccess: () => {
      // Invalidate and refetch
      setdescription("");
      setfile(null);
      queryClient.invalidateQueries(['posts'])

    },
  })

  
  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            {isLoading?"loading":error?"try later":
          <img onClick={()=>Navigate(`/profile/${currentuser.id}`)} src={userdata?.profilepicture? `/uploads/${userdata?.profilepicture}`:ALTprofile} style={{cursor:"pointer"}} alt="pic"/>
            }
          <input type="text" value={description} placeholder={`What's on your mind ${currentuser.name}?`} onChange={(e) => setdescription(e.target.value)} />
        </div>
        <div className="right">
        {file && <img className="file" alt="img" src={URL.createObjectURL(file)} />}
        </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setfile(e.target.files[0])} />
            <label htmlFor="file">
              <div className="item">
                <span>Post New</span>
                <AiOutlinePlus className="AddIcon"/>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handleClick}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
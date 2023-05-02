import { useContext, useState } from 'react';
import STORIES from 'react-insta-stories';
import './Stories.scss';
import { AuthContext } from '../../context/authContext.js';



const Stories = ()=>{
    const {currentuser} = useContext(AuthContext);
    const [Loop,setLoop]=useState(false);
    const stories = [
        {
        url:"https://images.pexels.com/photos/9898727/pexels-photo-9898727.jpeg?auto=compress&cs=tinysrgb&w=600",
        duration:2000,
      },
      {
        url:"https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=600",
        duration:2000,
      }
    ]
    
    return(
        <div className='stories' onClick={()=>setLoop(!Loop)}>
        <div className='story' >
            <img src={`uploads/${currentuser.profilepicture}`} alt='profilepic'/>
            <span>{currentuser.name}</span>
            <button>+</button>
        </div>
            <STORIES 
            stories={stories}
            defaultInterval={5000}
            keyboardNavigation={true}
            loop={Loop? true:false}
            width={150}
			height={220}
            />
            </div>
         )
}

export default Stories;




  /*return (
    <div className='stories'>
        <div className='story'>
            <img src="https://images.pexels.com/photos/6146931/pexels-photo-6146931.jpeg?auto=compress&cs=tinysrgb&w=600" alt='profilepic'/>
            <span>John Doe</span>
            <button>+</button>
        </div>
        {stories.map(stories=>(
            <div className="story" key={stories.id}>
                <img src={stories.img} alt="img" />
                <span>{stories.name}</span>
            </div>
        ))}
    </div>
  )
}

export default Stories*/
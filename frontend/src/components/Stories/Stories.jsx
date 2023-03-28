import React from 'react';
import './Stories.scss';

const Stories = () => {
//Temp Data
const stories = [
    {
    id: 1,
    name:"John Doe",
    img:"https://images.pexels.com/photos/9898727/pexels-photo-9898727.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 2,
        name:"John Doe",
        img:"https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 3,
        name:"John Doe",
        img:"https://images.pexels.com/photos/5409715/pexels-photo-5409715.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 4,
        name:"John Doe",
        img:"https://images.pexels.com/photos/6146931/pexels-photo-6146931.jpeg?auto=compress&cs=tinysrgb&w=600"
    }
]
  return (
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

export default Stories
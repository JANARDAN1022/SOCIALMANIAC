import { useState } from 'react';
import STORIES from 'react-insta-stories';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';


const useStory = (stories, width, height) => {
    const {currentuser} = useContext(AuthContext);
  const [loop, setLoop] = useState(false);
console.log(typeof stories);
const formattedStories = Object.keys(stories).map((story) => {
    return {
      url: story.url,
      duration: story.duration,
      /*header: {
        heading: story.user.name,
        subheading: story.user.username,
        profileImage: `uploads/${story.user.profilepicture}`,
      },*/
    };
  });

  return (
    <>
      <div className='story'>
        <img src={`uploads/${currentuser.profilepicture}`} alt='profilepic' />
        <span>{currentuser.name}</span>
      </div>
      <STORIES
        stories={formattedStories}
        defaultInterval={5000}
        keyboardNavigation={true}
        loop={loop ? true : false}
        width={width}
        height={height}
        onAllStoriesEnd={() => setLoop(false)}
      />
    </>
  );
};

export default useStory;

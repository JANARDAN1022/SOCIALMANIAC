import React from 'react';
import Posts from '../../components/Posts/Posts';
import Share from '../../components/Share/Share';
import Stories from '../../components/Stories/Stories';
import './Home.scss';

const Home = () => {
  return (
    
    <div className='HomePage'>
    <Stories />
    <Share />
    <Posts />

    

    </div>
    
  )
}

export default Home
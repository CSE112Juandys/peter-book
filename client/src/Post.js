import React from 'react';
import './post.css';
import PostText from './PostText';
import PostOptions from './PostOptions';


const Post = () => {
    return (
        <div className = "post">

            <PostOptions/>

            <PostText/>
        </div>
    )
}

export default Post
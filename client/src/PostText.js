import React from 'react';
import './post.css';

const PostText = () => {
    return (
        <div className="form-area">  
            <form role="form">
              <div className="form-group">
              <textarea className="posttext" type="textarea" id="posttext" placeholder="Write a message here" maxlength="140" rows="7"></textarea>
              </div>
                 
            <button className = "submitpost" type="button" id="submit" name="submit">Post</button>
            </form>
        </div>
    )
}

export default PostText
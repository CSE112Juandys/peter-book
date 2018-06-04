import React from 'react';
import { List, Grid } from '@material-ui/core';
import { PostCard, AdCard } from 'components';

const EmptyView = ({ ...props }) => {

    const posts = props.posts;
    const postList = posts.map((post, key) => {
        return (
            <PostCard post={post} user={props.user}/>
        );
    });
    const adList = [<AdCard/>, <AdCard/>, <AdCard/>];

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={12} md={7}>
                    <div style={{textAlign:'center'}}>
                        <List>{postList}</List>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={5}>
                    <div style={{textAlign:'center'}}>
                        <List>{adList}</List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default EmptyView;

function generateUsers() {
    const users = [];
    const firstNames = ["Luis", "Tiffany", "Patrick", "Crystal", "Jed", "Sherman", "Vanessa", "Katie", "Jeremy", "Arvind", "Jonathan"];
    const lastNames  = ["Llobrera", "Huang", "Hu", "Yung", "Tadios", "Lee", "Chou", "Lau", "Siocon", "Kalithil", "Perapalanunt"];
  
    for (var i = 0; i < firstNames.length; i++) {
        const user =  { id : 0,
                      firstName : firstNames[i],
                      lastName  : lastNames[i],
                      friends   : [],
                      email     : `${lastNames[i]}@ucsd.edu`,
                      phone     : "1111111111",
                      newsFeed  : []
                    };
  
        users.push(user);
    }
    return users;
}
  
function generateUser() {
    const firstNames = ["Luis", "Tiffany", "Patrick", "Crystal", "Jed", "Sherman", "Vanessa", "Katie", "Jeremy", "Arvind", "Jonathan"];
    const lastNames  = ["Llobrera", "Huang", "Hu", "Yung", "Tadios", "Lee", "Chou", "Lau", "Siocon", "Kalithil", "Perapalanunt"];
  
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName  = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  
    const user =  { id : 0,
                    firstName : firstName,
                    lastName  : lastName,
                    friends   : [],
                    email     : `${lastName}@ucsd.edu`,
                    phone     : "1111111111",
                    newsFeed  : []
                  };
  
    return user;
}

function generatePosts(forUser, byUsers, numPosts) {
    const posts = [];
  
    for (var i = 0; i < numPosts; i++) {
        posts.push(generatePost(forUser, byUsers[Math.floor(Math.random() * byUsers.length)]))
    }
  
    return posts;
}
  
function generatePost(forUser, byUser) {
    const date = new Date()
    const postDate = `${date.getUTCMonth()}-${date.getUTCDate()}-${date.getUTCFullYear()}`
  
    const post    = { id : 0,
                      author    : byUser,
                      recipient : forUser,
                      content   : "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.",
                      edited    : true,
                      created   : postDate,
                      updated   : postDate,
                      comments  : []
                    }
    return post;
}
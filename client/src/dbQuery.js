import firebase from "./dbInitializer.js";

export function getLikesFromPost(userId, postId){

  var postLikeListRef = firebase.database().ref('posts/' + userId + '/' + postId );
  var likeCount;
  postLikeListRef.child('like_list').once("value").then(snapshot=>{
    likeCount = snapshot.numChildren();
    console.log(snapshot.numChildren());
  });
  return likeCount;
}

export function checkIfUserLikePost(op_id, postId, liker_id){
  var postLikeListRef = firebase.database().ref('posts/' + op_id + '/' + postId );
  postLikeListRef.child('like_list').once("value").then(snapshot=>{
    snapshot.forEach( e => {
      if(e.key == liker_id) console.log(true);
    });
    //console.log(false);
  });
}

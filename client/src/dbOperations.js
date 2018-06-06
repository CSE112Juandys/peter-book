import firebase from "./dbInitializer.js";
import {deleteAllImagesUnderPost} from "./Storage.js"

export function writeNewUser(userId, name, email) {
  var userRef = firebase.database().ref('users/' + userId);

  userRef.once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);

    if(exists) {
      alert( userId + " already exists!" );
    } else {
      userRef.set({
        username: name,
        email: email
      });
    }

  });
}

export function writeNewPost(postId, op_id, date) {
  firebase.database().ref('posts/' + op_id + '/' + postId).set({
    post_date : date
  });

  // var likeRef = firebase.database().ref('posts/' + op_id + '/' + postId +'/like_list');
  // likeRef.on('value', function(snapshot) {
  //   console.log(snapshot.val());
  // });
}

export function deletePost(op_id, postId){
  var postRef = firebase.database().ref('posts/' + op_id + '/' + postId);

  deleteAllImagesUnderPost(op_id, postId);

  postRef.delete();
}

export function likePost(liker_id, op_id, post_id){
  var likeListRef = firebase.database().ref('posts/' + op_id + '/' + post_id + '/like_list/');
  var flag = false;

  likeListRef.once('value').then((snapshot)=>{
    console.log(snapshot);
    snapshot.forEach( e => {
      console.log(e);
      if(e.key == liker_id) flag = true;
    });


    if(flag) {
      alert("exists");
      likeListRef.child(liker_id).remove();
    } else {
      likeListRef.child(liker_id).set(liker_id);
    }
  });
}

export function findAllPostsByUser(userId){
  var postsRef = firebase.database().ref('posts/' + userId);
  return postsRef;
}

export function updateUserName(userId, newName){
  var userRef = firebase.database().ref('users/' + userId);
  userRef.set({
    username : newName
  });
}

export function updateUserEmail(userId, newEmail){
  var userRef = firebase.database().ref('users/' + userId);
  userRef.set({
    email : newEmail
  });
}


export function addNewComment(op_id, post_id, commentId, commenter_id, content, time){
  var postRef = firebase.database().ref('posts/' + op_id + '/' + post_id + '/comments');
  var pushed;
  if(commentId == 0){
    pushed = postRef.push();

    pushed.set({
      commenter_id : commenter_id,
      comment_content : content,
      comment_time : time
    });

  } else {
    pushed = postRef.push();

    pushed.set({
      commenter_id : commenter_id,
      comment_content : content,
      comment_time : time
    });

    var newCommentId = pushed.getKey();

    pushed = postRef.child(commentId).child('sub_comments');

    pushed.child(newCommentId).set(newCommentId);
  }
}

export function readCommentContent(op_id, post_id, commentId){
  var commentRef = firebase.database().ref('posts/' + op_id + '/' + post_id +'/'+commentId);
  commentRef.ref('/comment_content').once("value", content=>{
    return content;
  });
}

export function readCommentTime(op_id, post_id, commentId){
  var commentRef = firebase.database().ref('posts/' + op_id + '/' + post_id +'/'+commentId);
  commentRef.ref('/comment_time').once("value", content=>{
    return content;
  });
}

export function readCommenterId(op_id, post_id, commentId){
  var commentRef = firebase.database().ref('posts/' + op_id + '/' + post_id +'/'+commentId);
  commentRef.ref('/commenter_id').once("value", content=>{
    return content;
  });
}

export function deleteComment(op_id, post_id, commentId){
  var commentRef = firebase.database().ref('posts/' + op_id + '/' + post_id +'/' +commentId);

  commentRef.child('sub_comments').once("value", snapshot=>{
    snapshot.forEach(childSnap=>{
      var sub_comment_id = childSnap.value;
      deleteComment(op_id, post_id, sub_comment_id);
    });
  });

  commentRef.delete();
}

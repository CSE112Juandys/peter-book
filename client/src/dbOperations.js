import firebase from "./dbInitializer.js";


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
    post_date : date,
    like_list : null
  });

  // var likeRef = firebase.database().ref('posts/' + op_id + '/' + postId +'/like_list');
  // likeRef.on('value', function(snapshot) {
  //   console.log(snapshot.val());
  // });
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

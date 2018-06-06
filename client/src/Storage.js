import firebase from "./dbInitializer.js";

var storage = firebase.app().storage("gs://cse112-e7734.appspot.com");

export function storeNewImage(userId, postId, image, uploader, imgElement){

  var storageRef = storage.ref(userId + '/' + postId + '/' + image.name);
  var task = storageRef.put(image);

  task.on('state_changed',
    function progress(snapshot){
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = percentage;
    },

    function error(err){
      console.log(err);
    },

    function complete(){
      console.log("image uploaded!");
      //console.log(ReactDOM.render(<App />, document.getElementById('myImg') ));
      //console.log(App.getElementById('myImg').react);
      updateTheImage(imgElement , storageRef);
    }
  );
}

export function deleteAllImagesUnderPost(userId, postId){
  var storageRef = storage.ref(userId + '/' + postId + '/');
  storageRef.delete();
}

export function deleteImage(userId, postId, imageName){
  var storageRef = storage.ref(userId + '/' + postId + '/' + imageName);

  storageRef.delete().then(function() {
    // File deleted successfully
    console.log("img successfully deleted");
  }).catch(function(err) {
    // Uh-oh, an error occurred!
    console.log(err);
  });
}

export function uploadNewProfilePic(userId, image, uploader, imgElement){
  var storageRef = storage.ref(userId + '/profile_pic');
  var task = storageRef.put(image);

  console.log("profile pic uploaded!");
  task.on('state_changed',
    function progress(snapshot){
      var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      uploader.value = percentage;
    },

    function error(err){
      console.log(err);
    },

    function complete(){
      console.log("profile picture uploaded!");
      //console.log(ReactDOM.render(<App />, document.getElementById('myImg') ));
      //console.log(App.getElementById('myImg').react);
      updateTheImage(imgElement , storageRef);
    }
  );
}

function updateTheImage(element, storageRef){
  storageRef.getDownloadURL().then(url => {
    element.src = url;
  }).catch (function(err){
    console.log(err);
  });
}

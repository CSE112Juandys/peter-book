module.exports = {
  addFd: function(idA, idB, keycipher) {
    var firebase = require('firebase');

    if (idA === idB) {
      return false;
    }

    var refA = idA + "/Friends/" + idB;
    var refB = idB + "/Friends/" + idA;
    var dbrfA = firebase.database().ref(refA);
    var dbrfB = firebase.database().ref(refB);

    var payload = {
      "Datakey": keycipher
    };

    dbrfA.set(payload).then(
      success => {
        console.log('success',success);
      },
      error => {
        console.log('error',error);
      }
    );

    dbrfB.set(payload).then(
      success => {
        console.log('success',success);
      },
      error => {
        console.log('error',error);
      }
    );

    return true;
  },
  deleteFd: function(idA, idB){
    var firebase = require('firebase');

    if (idA === idB) {
      return false;
    }

    var refA = idA + "/Friends/" + idB;
    var refB = idB + "/Friends/" + idA;
    var dbrfA = firebase.database().ref(refA);
    var dbrfB = firebase.database().ref(refB);

    dbrfA.remove().then(
      success => {
        console.log('success',success);
      },
      error => {
        console.log('error',error);
      }
    );

    dbrfB.remove().then(
      success => {
        console.log('success',success);
      },
      error => {
        console.log('error',error);
      }
    );

    return true;
  }
}

function create_user()
{
  var signup_first_name = document.getElementById('signup_first_name').value;
  var signup_last_name = document.getElementById('signup_last_name').value;
  var email = document.getElementById('signup_email').value;
  var phone_number = document.getElementById('signup_number').value;
  var password = document.getElementById('signup_password').value;
  var confirm_password = document.getElementById('signup_password_confirm').value;

  /*if (verify_first_name(signup_first_name) == -1 || verify_last_name(signup_last_name)
    || verify_email(email) == -1 || verify_password(password, confirm_password) == -1)
    return;
*/

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
    var user = firebase.auth().currentUser;
    if (user)
    {
      console.log(user.uid);
      user.updateProfile({
        displayName: signup_first_name + " " + signup_last_name
      }).then(function() {
        user.sendEmailVerification().then(function() {
        }).catch(function(error) {
        });
        //TODO: DO STUFF HERE UPON SUCCESSFUL USER CREATION, SUCH AS REDIRECT
        // TO PROFILE PAGE.
      }).catch(function(error) {
        console.log(error.code);
        console.log(error.message);
      });
    }
  }).catch(function(error) {
    console.log(error.code);
    console.log(error.message);
    // ...
  });
}

function login_user()
{
  var email = document.getElementById('login_email').value;
  var password = document.getElementById('login_password').value;
  firebase.auth().signInWithEmailAndPassword(email, password).then(function(){
    var user = firebase.auth().currentUser;

    console.log(user.email);
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
  });
}

function verify_first_name(first_name)
{
  if (first_name === "")
  {
    alert_empty_first_name();
    return -1;
  }
}

function verify_last_name(last_name)
{
  if (last_name === "")
  {
    alert_empty_last_name();
    return -1;
  }
}

function verify_email(email)
{
  return -1;
}

function verify_password(password, confirm_password)
{
  if (password !== confirm_password)
  {
    alert_different_password();
    return -1;
  }
  if (1 == 1)
  {
    return -1;
  }
}

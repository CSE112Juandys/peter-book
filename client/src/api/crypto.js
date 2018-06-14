module.exports = {
  generate: function() {
    var randomstring = require('randomstring');
    var g = randomstring.generate(16);
    return g;
  },

  encrypt: function(data, password) {
    var crypto = require('crypto');
    var cipher = crypto.createCipher('aes-256-ctr',password)
    var crypted = cipher.update(data,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  },

  decrypt: function(data, password) {
    var crypto = require('crypto');
    var decipher = crypto.createDecipher('aes-256-ctr',password)
    var dec = decipher.update(data,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  },

  authGAPI: function(pri_key) {
    var crypto = require('crypto');
    var base64url = require('base64url');
    var header = {
      "alg":"RS256",
      "typ":"JWT"
    };
    var b64header = base64url.encode(JSON.stringify(header));

    var iat = Date.now()/1000;
    var exp = iat+3600;
    var claimSet = {
      "iss":"firebase-adminsdk-fbuvy@helloworld-b7e91.iam.gserviceaccount.com",
      "scope":"https://www.googleapis.com/auth/cloud-platform",
      "aud":"https://www.googleapis.com/oauth2/v4/token",
      "exp":exp,
      "iat":iat
    };
    var b64claimSet = base64url.encode(JSON.stringify(claimSet));

    var b64Str = b64header + "." + b64claimSet;

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(b64Str);
    const signature = signer.sign(pri_key);
    var b64signature = base64url.encode(signature);

    var jwt = b64Str + "." + b64signature;

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://www.googleapis.com/oauth2/v4/token");
    //Send the proper header information along with the request
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        //Call a function when the state changes.
        if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            // Request finished. Do processing here.
            var access_token = JSON.parse(xhr.responseText).access_token;
            sessionStorage.setItem('atok', access_token);
        }
    };
    var postData = "grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=" + jwt
    xhr.send(postData);
  },

  kmsEncrypt: function(access_token, password){
    var xhttp = new XMLHttpRequest();
    var url = "https://cloudkms.googleapis.com/v1/projects/helloworld-b7e91/locations/global/keyRings/master_secret/cryptoKeys/v0:encrypt?access_token=" + access_token;

    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
           // Action to be performed when the document is read;
           var ciphertext = JSON.parse(xhttp.responseText).ciphertext;
           sessionStorage.setItem('cipher', ciphertext);
        } else {
          console.log(xhttp.response);
        }
    }
    var b64password = btoa(password);

    var postData = {
      "plaintext": b64password
    };
    xhttp.send(JSON.stringify(postData));
  },

  kmsDecrypt: function(access_token, ciphertext) {
    var xhttp = new XMLHttpRequest();
    var url = "https://cloudkms.googleapis.com/v1/projects/helloworld-b7e91/locations/global/keyRings/master_secret/cryptoKeys/v0:decrypt?access_token=" + access_token;

    xhttp.open("POST", url);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
          var b64plaintext = JSON.parse(xhttp.responseText).plaintext;
          sessionStorage.setItem("plain", atob(b64plaintext));
        } else {
          console.log(xhttp.response);
        }
    }

    var postData = {
      "ciphertext": ciphertext
    };
    xhttp.send(JSON.stringify(postData));
  }
}

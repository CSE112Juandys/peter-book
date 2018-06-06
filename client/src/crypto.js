module.exports = {
  password: 'gTeeLaZt5sU3DbjD',
  pri_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgzDex/0+uKT5Z\nrMAfil5pWrP3j4T94StyYusyB82llh80FxjZyz7w/g0x2clPXpV6zuYSszEmRLyB\nCogDijcMOcWWtUqLkzfPkYeZ71IkoxZ5gHWdkxKm1WeDiJQ39h3EVTmSXqssZc4f\n3pHejPFGVYZPqohx63XtG6HeIxm65Ey+zZVOPB5IVyX0/iUPkV7lk7ApbIWqW0Po\nauwkUpCWIFcqTdPjhFzoP8PknofsHMGbjx5Aa2yUBDYBzdFXyzDZlICK1M4q2tUb\nKte5FIVRLvo1oX4vusU+2S+NRm5LFmJKcF48fXkIaqhflMlxb/p6h/bMDWn+yA7f\nn3UFHeuZAgMBAAECggEAF2H1vBZxRarCtzNLUZWDVX+2nvU0X4owZrcNa5494JVG\n3qzN1NIHn5ovXK9GZRp50zzQsSnJ/RN5dAG44LGR1V8gpWH3P/poXxtTDuasg8kM\nL3P85oKoxNul7LczkpBhfheZ7SKDcsvadcDzEQa0M/L45TnaaJ0sbg6ayHJDP217\naWFXY+bMQy21Mjg29QISuPqFejrgdrYdlQf0MRfXHZEIF1LpgeMRfOnIJMoEI2ss\nfmI9bQHoRhfja/Fa6E30/Nf2YsTVY9O7YAF8Spm/hgtm8N7IYa4FqkF1+/woofpJ\nsxvbZJ7uC+BOOOW7xZ6BL5QjKl48X6FQRDnwbdhtLwKBgQDYHMzSO5fKULqpdt6L\nb+430VOOoCJL7PjaNcPFDROZCybwhivOSez5M83aCIeJMNGrOYlSX5yTS0RA3AvF\nBuDi5ME+1o5DYfVlh5cXoeyuE021+uB9sjyLKv98IP0sWmexcXwzMOdARLLwC4DK\ncCLOSJuC2fw7dibvuqEgF6rnqwKBgQC+edLuueJzeiFhfBx2INodfhAG1UcXRfwg\nrs0+/y07fjOrY7jX73Q1P1ZGgCi3jajiGCZwXam0U5EAlz4ozIwOOhqVLST92mJ4\nCBl/YJ4rWjivXtm8MJ7y8+dN9kE+uyBDay0KIYCGsAlFSBy8M/y6/vrhV1lF6EVv\na7TzCNWlywKBgQCQDdqFxI1woZFbRs4fOhQbht/gsWNLIwHaSn5dilLm8CUbrQPk\nNSjOEDcGQCtASpdoQCkGDI+NK12qskLyKZycAYnCvjgEOHbgH5qaeSgP/PQO+tTL\nVJTA23+DmWXJO9Xk1NXKNa3gDCsOkUxfJJI+2O04Mt/MLvzTTZ77ims0kwKBgDuC\n3IBx22qw8dT/bfUKdptYU7GO2VNQLmIXu1C/cWZxG7ukwI/W5LvuOgp06EPRIr7h\nRME+wlLw+RDyMB2XKvsW9E8/d5tIrBNMlIrTqRdqbON+AxFlL4RA6DfXhLMQzBfE\nWKIdrYZnYb4ftbqnk4LpP4FARUguNeOGB1cXn4jZAoGAa/oGsBktZgpK0f31n0ml\n7FIwxMSWFqxZhFWpRxNEsnRWCLEwtzPrvXym1emEvXg0IjZLuBbKwZ/vxuBicn/0\nGH6z6fz82/aF1CVRbf+yOsyST1FqsOagtao90p9s5Dge7JmbZBV6z+C597Qc7uTm\nZdM79HWHNdwD1d0YUdHeiS4=\n-----END PRIVATE KEY-----\n",

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
          sessionStorage.setItem('demo', atob(b64plaintext));
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

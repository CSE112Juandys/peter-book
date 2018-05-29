module.exports = {

  encrypt: function(crypto, data, password) {
    var cipher = crypto.createCipher('aes-256-ctr',password)
    var crypted = cipher.update(data,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  },

  decrypt: function(crypto, data, password) {
    var decipher = crypto.createDecipher('aes-256-ctr',password)
    var dec = decipher.update(data,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
  }
}

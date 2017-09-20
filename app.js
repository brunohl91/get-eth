
var os = require('os');

var Eth = function () {

  var self = this;
  self.interfaces = [];

  /**
   * Method to get data and parse
   * @return {interfaces} [description]
   */
  self.get = function () {
    var ifaces = os.networkInterfaces();
    for (var e in ifaces) {
      var eth = ifaces[e];
      for (var i in eth) {
        eth[i]['name'] = e;
        eth[i] = self.validate (eth[i]);
        if (eth[i]) {
          self.interfaces.push( eth[i] );
        }
      }
    }
    return self.interfaces;
  }

  /**
   * Validar ETH para endereço válido
   * @param  {obj} eth {
   *   address: '192.168.20.66',
   *   netmask: '255.255.255.0',
   *   family: 'IPv4',
   *   mac: '74:d0:2b:b9:dc:29',
   *   internal: false,
   *   name: 'Ethernet'
   * }
   * @return {obj} || null
   */
  self.validate = function ( eth ) {
    // 192.168, 172.16, 10
    var exp = /(^192\.168\.\d{1,3}\.\d{1,3})|(^172\.16\.\d{1,3}\.\d{1,3})|(^10\.\d{1,3}\.\d{1,3}\.\d{1,3})/;
    if (eth) { // check if isset eth
      if (eth.family && eth.family == 'IPv4') { // check only if IPV4
        if (exp.test(eth.address)) { // match against local network
          var n = 0;
          var mask = eth.netmask.split('.');
          for (var i = 0; i < mask.length; i++) {
            if (mask[i] != '.' && mask[i] < 255) {
              n += 8;
            }
          }
          eth.n = n;
          return eth;
        }
      }
    }
    return null;
  }

  return self;

}

module.exports = Eth ();
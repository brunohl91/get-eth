
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
    var exp = /(^192\.168\.\d{1,3}\.\d{1,3})|(^172\.16\.\d{1,3}\.\d{1,3})|(^10\.\d{1,3}\.\d{1,3}\.\d{1,3})/;
    if (eth) {
      if (eth.family && eth.family == 'IPv4') {
        if (exp.test(eth.address)) {
          var ini = eth.address.split('.');
          ini[ ini.length - 1 ] = 0;
          eth.ini = ini.join('.');
          eth.n = self.getNetworkClass( eth.netmask );
          return eth;
        }
      }
    }
    return null;
  }

  self.getNetworkClass = function ( mask ) {
    var obj = {
      "128.0.0.0" : "1",
      "192.0.0.0" : "2",
      "224.0.0.0" : "3",
      "240.0.0.0" : "4",
      "248.0.0.0" : "5",
      "252.0.0.0" : "6",
      "254.0.0.0" : "7",
      "255.0.0.0" : "8",
      "255.128.0.0" : "9",
      "255.192.0.0" : "10",
      "255.224.0.0" : "11",
      "255.240.0.0" : "12",
      "255.248.0.0" : "13",
      "255.252.0.0" : "14",
      "255.254.0.0" : "15",
      "255.255.0.0" : "16",
      "255.255.128.0" : "17",
      "255.255.192.0" : "18",
      "255.255.224.0" : "19",
      "255.255.240.0" : "20",
      "255.255.248.0" : "21",
      "255.255.252.0" : "22",
      "255.255.254.0" : "23",
      "255.255.255.0" : "24",
      "255.255.255.128" : "25",
      "255.255.255.192" : "26",
      "255.255.255.224" : "27",
      "255.255.255.240" : "28",
      "255.255.255.248" : "29",
      "255.255.255.252" : "30",
      "255.255.255.254" : "31",
      "255.255.255.255" : "32",
    }
    if (obj[mask]) {
      return obj[mask];
    }
    else {
      return "24";
    }
  }

  return self;

}

module.exports = Eth ();
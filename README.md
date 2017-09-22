# get-eth

This module was designed to retrieve client network interfaces.

## Installing

The module is installed by npm

```
npm install --save get-eth
```

## Example usage

Example usage can be found on test.js

```
'use strict';

const eth = require('get-eth');
let eths = eth.get();
console.log(eths);
```
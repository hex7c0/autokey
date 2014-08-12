# [autokey](http://supergiovane.tk/#/autokey)

[![NPM version](https://badge.fury.io/js/autokey.svg)](http://badge.fury.io/js/autokey)
[![Build Status](https://travis-ci.org/hex7c0/autokey.svg?branch=master)](https://travis-ci.org/hex7c0/autokey)
[![devDependency Status](https://david-dm.org/hex7c0/autokey/dev-status.svg)](https://david-dm.org/hex7c0/autokey#info=devDependencies)

[Autokey](http://en.wikipedia.org/wiki/Autokey_cipher) stream cipher

my original [python code](https://github.com/hex7c0/EncryptoPy/blob/master/modules/autokey.py)

## Installation

Install through NPM

```bash
npm install autokey
```
or
```bash
git clone git://github.com/hex7c0/autokey.git
```

## API

inside nodejs project
```js
var autokey = require('autokey')('secret_key');

autokey.encodeString('foo');
```

### Methods

change your key (warning)
```js
autokey.change('foo');
```

encode string data
```js
autokey.encodeString('string');
```

encode array
```js
autokey.encodeArray([49,50,51]);
```

encode buffer
```js
autokey.codeBuffer(new Buffer('ciao'));
```

encode string, byte or buffer
```js
autokey.encode(your_data);
```

for decoding, change "encode*" to "decode*"
```js
autokey.decode('string');
```

### autokey(key,[lodash])

#### key

 - `key` - **String | Array | Buffer** Your key *(default "throw Error")*

#### [lodash]

 - `lodash` - **Boolean** Use lodash library (check [benchmark](https://github.com/hex7c0/autokey/tree/master/test/benchmark.js) test for right decision) *(default "disabled")*

## Examples

Take a look at my [examples](https://github.com/hex7c0/autokey/tree/master/examples)

### [License GPLv3](http://opensource.org/licenses/GPL-3.0)

# [autokey](http://supergiovane.tk/#/autokey)

[![NPM version](https://badge.fury.io/js/autokey.svg)](http://badge.fury.io/js/autokey)
[![Build Status](https://travis-ci.org/hex7c0/autokey.svg?branch=master)](https://travis-ci.org/hex7c0/autokey)
[![Dependency Status](https://david-dm.org/hex7c0/autokey/status.svg)](https://david-dm.org/hex7c0/autokey)

[Autokey](http://en.wikipedia.org/wiki/Autokey_cipher) stream cipher.
You can encode/decode with different [encodings](http://nodejs.org/api/buffer.html#apicontent) for *String only.

My original [python code](https://github.com/hex7c0/EncryptoPy/blob/master/modules/autokey.py)

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
var rc4 = require('autokey');

var cipher = rc4('secret_key');
var d = cipher.encodeString('ciao');
var e = cipher.decodeString(d);
```

### Methods

change your key (warning)
```js
cipher.change('foo');
```

encode string data
```js
cipher.encodeString('string','utf8','base64);
```

encode array data
```js
cipher.encodeArray([49,50,51]);
```

encode buffer data
```js
cipher.encodeBuffer(new Buffer('ciao'));
```

encode string or byte or buffer (switch type)
```js
cipher.encode(your_data);
```

for decoding, change "encode*" to "decode*"
```js
cipher.decode(your_data);
```

### autokey(password,[lodash])

#### password

 - `password` - **String | Array | Buffer** Your key *(default "throw Error")*

#### [lodash]

 - `lodash` - **Boolean** Use [lodash](http://lodash.com/) library (check [benchmark](https://github.com/hex7c0/autokey/tree/master/test/benchmark.js) test for right decision) *(default "disabled")*

## Examples

Take a look at my [examples](https://github.com/hex7c0/autokey/tree/master/examples)

### [License GPLv3](http://opensource.org/licenses/GPL-3.0)

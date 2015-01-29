'use strict';
/**
 * @file benchmark test
 * @module autokey
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
var autokey = require('..');
var _ = require('lodash'); // cache
var assert = require('assert');
// load
var a = 'very_long_key_SuPeR_s1cu73';
var b = 'Loremipsumdolorsitamet,consecteturadipiscingelit.Integerluctusarcuvitaeplaceratinterdum.Fuscenecconvallisleo.Vivamusacconsequatfelis,euultriciesquam.Nullapretiumdiamquisviverratincidunt.Nuncidanteultrices,auctorauguein,rhoncusdui.Maurisvulputateaorcieufacilisis.Quisquepharetraporttitornisi,necdapibusrisusfeugiatvitae.Proinegeturnasitametmagnasempertempussedeuaugue.Maecenasetlectusegetmetusmolestieconsecteturetsitametmauris.Praesentaanteinligulainterdumcommodo.Sedconsequatlacusvitaepharetravolutpat.Praesentvelaugueactortorsollicitudinposuereeusitamet.';
var aa = [ 112, 105, 112, 112, 111, 112, 105, 112, 112, 111, 112, 105, 112,
  112, 111 ];
var bb = [ 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97,
  111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111,
  99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99,
  105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105,
  97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97,
  111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111,
  99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99,
  105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105,
  97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97, 111, 99, 105, 97,
  111, 99, 105, 97, 111 ];
var aaa = new Buffer('very_long_key_SuPeR_s1cu73');
var bbb = new Buffer(
  'Loremipsumdolorsitamet,consecteturadipiscingelit.Integerluctusarcuvitaeplaceratinterdum.Fuscenecconvallisleo.Vivamusacconsequatfelis,euultriciesquam.Nullapretiumdiamquisviverratincidunt.Nuncidanteultrices,auctorauguein,rhoncusdui.Maurisvulputateaorcieufacilisis.Quisquepharetraporttitornisi,necdapibusrisusfeugiatvitae.Proinegeturnasitametmagnasempertempussedeuaugue.Maecenasetlectusegetmetusmolestieconsecteturetsitametmauris.Praesentaanteinligulainterdumcommodo.Sedconsequatlacusvitaepharetravolutpat.Praesentvelaugueactortorsollicitudinposuereeusitamet.');

/*
 * test module
 */
describe('benchmark', function() {

  describe('autokey', function() {

    describe('string', function() {

      it('normal - should return same string', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = autokey(a);
          var d = cipher.encodeString(b); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(b, e, 'clear');
          assert.notDeepEqual(b, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = autokey(b);
          var d = cipher.encodeString(a); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(a, e, 'clear');
          assert.notDeepEqual(a, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tstring normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same string', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = autokey(a, true);
          var d = cipher.encodeString(b); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(b, e, 'clear');
          assert.notDeepEqual(b, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = autokey(b, true);
          var d = cipher.encodeString(a); // encrypt
          var e = cipher.decodeString(d); // decrypt
          assert.deepEqual(a, e, 'clear');
          assert.notDeepEqual(a, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tstring lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });

    describe('array', function() {

      it('normal - should return same array', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = autokey(aa);
          var d = cipher.encodeArray(bb); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(bb, e, 'clear');
          assert.notDeepEqual(bb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = autokey(bb);
          var d = cipher.encodeArray(aa); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(aa, e, 'clear');
          assert.notDeepEqual(aa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tarray normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same array', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = autokey(aa, true);
          var d = cipher.encodeArray(bb); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(bb, e, 'clear');
          assert.notDeepEqual(bb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = autokey(bb, true);
          var d = cipher.encodeArray(aa); // encrypt
          var e = cipher.decodeArray(d); // decrypt
          assert.deepEqual(aa, e, 'clear');
          assert.notDeepEqual(aa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tarray lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });

    describe('buffer', function() {

      it('normal - should return same buffer', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = autokey(aaa);
          var d = cipher.encodeBuffer(bbb); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(bbb, e, 'clear');
          assert.notDeepEqual(bbb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = autokey(bbb);
          var d = cipher.encodeBuffer(aaa); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(aaa, e, 'clear');
          assert.notDeepEqual(aaa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tbuffer normal took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });

      it('lodash - should return same buffer', function(done) {

        var start = process.hrtime();
        for (var i = 0; i < 10; i++) {

          var cipher = autokey(aaa, true);
          var d = cipher.encodeBuffer(bbb); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(bbb, e, 'clear');
          assert.notDeepEqual(bbb, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
          // reverse
          var cipher = autokey(bbb, true);
          var d = cipher.encodeBuffer(aaa); // encrypt
          var e = cipher.decodeBuffer(d); // decrypt
          assert.deepEqual(aaa, e, 'clear');
          assert.notDeepEqual(aaa, d, 'orig - encrypt');
          assert.notDeepEqual(e, d, 'encrypt - decrypt');
        }
        var diff = process.hrtime(start);
        console.log('\tbuffer lodash took %d ms',
          ((diff[0] * 1e9 + diff[1]) / 1000000).toFixed(3));
        done();
      });
    });
  });
});

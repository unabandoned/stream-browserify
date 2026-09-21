'use strict';

var test = require('node:test');
var assert = require('node:assert');
var inherits = require('inherits');

var Writable = require('..').Writable;

inherits(TestWritable, Writable);

function TestWritable(opt) {
    if (!(this instanceof TestWritable))
        return new TestWritable(opt);
    Writable.call(this, opt);
    this._written = [];
}

TestWritable.prototype._write = function(chunk, encoding, cb) {
    this._written.push(chunk);
    cb();
};

var buf = Buffer.from([ 88 ]);

test('.writable writing ArrayBuffer', function() {
    var writable = new TestWritable();

    writable.write(buf);
    writable.end();

    assert.equal(writable._written.length, 1);
    assert.equal(writable._written[0].toString(), 'X');
});

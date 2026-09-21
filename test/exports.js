'use strict';

var test = require('node:test');
var assert = require('node:assert');

var Stream = require('..');

// The 3.x layout reached into readable-stream's `lib/_stream_*.js` internals,
// which 4.x removed. Pin the public surface so a future bump can't silently
// drop one.
test('re-exports the stream classes', function() {
    ['Readable', 'Writable', 'Duplex', 'Transform', 'PassThrough', 'finished', 'pipeline']
        .forEach(function (name) {
            assert.equal(typeof Stream[name], 'function', name + ' is exported');
        });
    assert.equal(Stream.Stream, Stream, 'Stream.Stream self-reference kept for node 0.4 compat');
});

test('old-style Stream#pipe still works', function(t, done) {
    var EE = require('events').EventEmitter;
    var source = new Stream();
    var chunks = [];
    var dest = new EE();
    dest.writable = true;
    dest.write = function (chunk) { chunks.push(String(chunk)); return true; };
    dest.end = function () {
        assert.deepEqual(chunks, ['a', 'b']);
        done();
    };

    source.pipe(dest);
    source.emit('data', 'a');
    source.emit('data', 'b');
    source.emit('end');
});

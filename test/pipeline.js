'use strict';

var test = require('node:test');
var assert = require('node:assert');

var stream = require('..');
var pipeline = stream.pipeline;

test('supports pipeline', function(t, done) {
    var closed = { transform2: false, writable: false };

    var readable = new stream.Readable({
        read: function () {
            this.push(Buffer.from('chunk', 'ascii'));
        }
    });
    var transform1 = new stream.Transform({
        transform: function (chunk, enc, cb) {
            cb(new Error('fail'));
        }
    });
    var transform2 = new stream.PassThrough();
    transform2.on('close', function () {
        closed.transform2 = true;
    });
    var writable = new stream.Writable({
        write: function (chunk, enc, cb) { cb(); }
    });
    writable.on('close', function () {
        closed.writable = true;
    });

    pipeline(
        readable,
        transform1,
        transform2,
        writable,
        function(err) {
            assert.ok(err, 'pipeline reports the transform error');
            assert.equal(err.message, 'fail');
            // The destroy/close propagation happens on the next ticks after the
            // pipeline callback, so assert it once the microtask queue drains.
            setImmediate(function () {
                assert.ok(closed.transform2, 'transform2 emitted close');
                assert.ok(closed.writable, 'writable emitted close');
                done();
            });
        });
});

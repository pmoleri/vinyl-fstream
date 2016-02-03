"use strict";

import fstream from 'fstream';
import through2 from 'through2';
import streamBuffers from 'stream-buffers';
import cloneStats from 'clone-stats';
import File from 'vinyl';

/*  A vinyl adatper must return a objectMode stream on which vinyl Files are pushed.
    When consumers subscribe to on('data', ...) they receive vinyl files.
*/
module.exports = {
    src: function(fStreams, options) {
        const opts = options || {};
        if (typeof opts.buffer === "undefined") {
            opts.buffer = true;
        }
        if (typeof opts.read === "undefined") {
            opts.read = true;
        }

        const _fStreams = Array.isArray(fStreams) ? fStreams : [fStreams];

        // Create a passthrough stream in objectMode
        const outputStream = through2.obj();

        let count = _fStreams.length;

        _fStreams.forEach(function(fStream) {
            const root = fStream.path.split("\\").join("/");
            fStream.on('child', entry => {
                // Use .props to cope with "fstream-npm" that adds a "/package" to the path
                const entryPath = entry.props.path.split("\\").join("/");

                if (opts.read && opts.buffer) {
                    // .collect() Overwrites the pipe method so it will pump all the
                    // stream at once. Otherwise when a new child comes in the
                    // previous stream gets closed.
                    fstream.collect(entry);

                    const bufferStream = new streamBuffers.WritableStreamBuffer({
                    	initialSize: 1024,
                    	incrementAmount: 1024
                    });
                    entry
                        .pipe(bufferStream)
                        .on('finish', () => {
                            outputStream.push(new File({contents: bufferStream.getContents(), path: entryPath, base: root, stat: cloneStats(entry.props)}));
                        });
                } else {
                    const contents = opts.read ? entry : null;
                    outputStream.push(new File({contents: contents, path: entryPath, base: root, stat: cloneStats(entry.props)}));
                }
            });
            fStream.on('end', () => {
                count -=1;
                if (count === 0) {
                    outputStream.end();
                }
            });
        });
        return outputStream;
    }
};

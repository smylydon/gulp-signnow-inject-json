var Stream = require('stream');

function gulpInjectJSON(options) {
    var stream = new Stream.Transform({
        objectMode: true
    });

    stream._transform = function (file, unused, callback) {

        var type = typeof options;

        if (type === 'object' && options !== undefined && options !== null) {
            var contents = file.contents.toString('utf8');
            var contentsJSON = JSON.parse(contents);

            for (var prop in options) {
                contentsJSON[prop] = options[prop];
            }
            file.contents = new Buffer(JSON.stringify(contentsJSON));

        } else {
            callback(new Error('Error configuring Swagger paths!'), undefined);
            return;
        }
        callback(null, file);
    };

    return stream;
}

module.exports = gulpInjectJSON;

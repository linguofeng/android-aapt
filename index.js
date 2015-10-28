var os = require("os");
var exec = require("child_process").execFile;

var aapt = module.exports = {}

aapt.badging = function(apk_file, callback) {
    exec(__dirname + "/tools/aapt", ["d", "badging", apk_file], { maxBuffer: 1024 * 1024}, function(err, out) {
        if (err) {
            console.error(err);
            return;
        }

        callback(null, out);
    });
}
